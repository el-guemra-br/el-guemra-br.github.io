const STORAGE_KEY = 'cyber-roadmap-progress-v1';
const NOTES_KEY = 'cyber-roadmap-notes-v1';
const CHECKPOINTS_KEY = 'cyber-roadmap-checkpoints-v1';
const UI_STATE_KEY = 'cyber-roadmap-ui-v1';
const ANALYTICS_KEY = 'cyber-roadmap-analytics-v1';
const AUTO_CHECKPOINT_KEY = 'cyber-roadmap-auto-checkpoint-v1';
const SOURCE_FILES = ['./README.md', './readme.md'];
const PROJECT_NAME = 'Cybersecurity Roadmap';
const CREATOR_NAME = 'el-guemra-br';
const MAX_CHECKPOINTS = 20;

const state = loadState();
const notesState = loadNotes();
const checkpoints = loadCheckpoints();
const uiState = loadUIState();
const analytics = loadAnalytics();
const autoCheckpointState = loadAutoCheckpointState();
let pauseDetailPersistence = false;
let activeTaskFilter = uiState.taskFilter || 'all';
let lastKnownCompletedCount = null;
let currentPhaseFilterId = uiState.currentPhaseId || null;
let hasShownCongratsThisSession = false;

const elements = {
  title: document.getElementById('roadmap-title'),
  subtitle: document.getElementById('roadmap-subtitle'),
  completedCount: document.getElementById('completed-count'),
  totalCount: document.getElementById('total-count'),
  progressPercent: document.getElementById('progress-percent'),
  progressFill: document.getElementById('progress-fill'),
  progressCopy: document.getElementById('progress-copy'),
  progressMessage: document.getElementById('progress-message'),
  completionBanner: document.getElementById('completion-banner'),
  storageStatus: document.getElementById('storage-status'),
  analyticsStreak: document.getElementById('analytics-streak'),
  analyticsVelocity: document.getElementById('analytics-velocity'),
  analyticsCheckpoint: document.getElementById('analytics-checkpoint'),
  analyticsHeatmap: document.getElementById('analytics-heatmap'),
  roadmapRoot: document.getElementById('roadmap-root'),
  resetButton: document.getElementById('reset-progress'),
  saveCheckpointButton: document.getElementById('save-checkpoint'),
  restoreCheckpointButton: document.getElementById('restore-checkpoint'),
  exportBackupButton: document.getElementById('export-backup'),
  exportEncryptedBackupButton: document.getElementById('export-backup-encrypted'),
  exportReportButton: document.getElementById('export-report'),
  importBackupButton: document.getElementById('import-backup'),
  importBackupFile: document.getElementById('import-backup-file'),
  contactName: document.getElementById('contact-name'),
  contactForm: document.getElementById('contact-form'),
  contactEmail: document.getElementById('contact-email'),
  contactSubject: document.getElementById('contact-subject'),
  contactMessage: document.getElementById('contact-message'),
  contactTimestamp: document.getElementById('contact-ts'),
  contactNameError: document.getElementById('contact-name-error'),
  contactEmailError: document.getElementById('contact-email-error'),
  contactSubjectError: document.getElementById('contact-subject-error'),
  contactMessageError: document.getElementById('contact-message-error'),
  contactCounter: document.getElementById('contact-counter'),
  contactStatus: document.getElementById('contact-status'),
  contactSubmit: document.getElementById('contact-submit'),
  expandAllButton: document.getElementById('expand-all'),
  collapseAllButton: document.getElementById('collapse-all'),
  backToTopButton: document.getElementById('back-to-top'),
  taskSearch: document.getElementById('task-search'),
  filterAllButton: document.getElementById('filter-all'),
  filterOpenButton: document.getElementById('filter-open'),
  filterDoneButton: document.getElementById('filter-done'),
  filterCurrentPhaseButton: document.getElementById('filter-current-phase'),
  filterPriorityButton: document.getElementById('filter-priority'),
  quickNav: document.getElementById('quick-nav'),
  dialogRoot: document.getElementById('app-dialog'),
  dialogTitle: document.getElementById('app-dialog-title'),
  dialogMessage: document.getElementById('app-dialog-message'),
  dialogInputWrap: document.getElementById('app-dialog-input-wrap'),
  dialogInput: document.getElementById('app-dialog-input'),
  dialogOk: document.getElementById('app-dialog-ok'),
  dialogCancel: document.getElementById('app-dialog-cancel'),
  congratsScreen: document.getElementById('congrats-screen'),
  congratsMatrix: document.getElementById('congrats-matrix'),
  congratsClose: document.getElementById('congrats-close'),
  congratsReview: document.getElementById('congrats-review'),
  congratsReset: document.getElementById('congrats-reset'),
};

let matrixAnimationFrameId = null;
let matrixColumns = [];
let matrixFontSize = 18;
let matrixGlyphs = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
let matrixFrameTick = 0;

elements.resetButton.addEventListener('click', async () => {
  const confirmed = await showConfirm('Reset Progress', 'Reset all roadmap progress in this browser?');
  if (!confirmed) {
    return;
  }

  createAutoCheckpoint('Auto safety before reset');

  Object.keys(state).forEach((key) => delete state[key]);
  Object.keys(notesState).forEach((key) => delete notesState[key]);
  saveState();
  saveNotes();
  renderFromModel(window.__roadmapModel);
  updateOverview(window.__roadmapModel);
  elements.progressMessage.textContent = 'Progress reset. Fresh start unlocked.';
});

elements.expandAllButton?.addEventListener('click', () => {
  setAllDetailsOpen(true);
  elements.progressMessage.textContent = 'All sections expanded.';
});

elements.collapseAllButton?.addEventListener('click', () => {
  setAllDetailsOpen(false);
  elements.progressMessage.textContent = 'All sections collapsed.';
});

elements.backToTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

elements.taskSearch?.addEventListener('input', () => {
  applySearchFilter(elements.taskSearch.value);
});

elements.filterAllButton?.addEventListener('click', () => {
  setActiveTaskFilter('all');
});

elements.filterOpenButton?.addEventListener('click', () => {
  setActiveTaskFilter('open');
});

elements.filterDoneButton?.addEventListener('click', () => {
  setActiveTaskFilter('done');
});

elements.filterCurrentPhaseButton?.addEventListener('click', () => {
  setActiveTaskFilter('current-phase');
});

elements.filterPriorityButton?.addEventListener('click', () => {
  setActiveTaskFilter('priority');
});

elements.saveCheckpointButton?.addEventListener('click', async () => {
  if (!window.__roadmapModel) {
    return;
  }

  const defaultName = `Checkpoint ${new Date().toLocaleString()}`;
  const enteredName = await showPrompt('Save Checkpoint', 'Checkpoint name (optional):', defaultName);
  const label = (enteredName || defaultName).trim() || defaultName;

  checkpoints.unshift({
    id: `cp-${Date.now()}`,
    label,
    createdAt: new Date().toISOString(),
    state: snapshotState(),
  });

  if (checkpoints.length > MAX_CHECKPOINTS) {
    checkpoints.length = MAX_CHECKPOINTS;
  }

  saveCheckpoints();
  refreshStorageStatus();
  elements.progressMessage.textContent = `Checkpoint saved: ${label}`;
});

elements.restoreCheckpointButton?.addEventListener('click', async () => {
  if (!window.__roadmapModel) {
    return;
  }

  if (!checkpoints.length) {
    await showAlert('Restore Checkpoint', 'No checkpoints found yet. Save one first.');
    return;
  }

  const listText = checkpoints
    .map((checkpoint, index) => `${index + 1}. ${checkpoint.label} (${new Date(checkpoint.createdAt).toLocaleString()})`)
    .join('\n');

  const rawChoice = await showPrompt('Restore Checkpoint', `Choose a checkpoint number to restore:\n\n${listText}`, '1');
  if (!rawChoice) {
    return;
  }

  const index = Number.parseInt(rawChoice, 10) - 1;
  const chosen = Number.isNaN(index) ? null : checkpoints[index];
  if (!chosen) {
    await showAlert('Restore Checkpoint', 'Invalid selection.');
    return;
  }

  const shouldRestore = await showConfirm('Restore Checkpoint', `Restore checkpoint "${chosen.label}"?\n\nCurrent progress will be replaced.`);
  if (!shouldRestore) {
    return;
  }

  applyState(chosen.state, window.__roadmapModel);
  elements.progressMessage.textContent = `Restored checkpoint: ${chosen.label}`;
});

elements.exportBackupButton?.addEventListener('click', () => {
  const payload = {
    version: 1,
    project: PROJECT_NAME,
    exportedAt: new Date().toISOString(),
    progress: snapshotState(),
    checkpoints,
    notes: notesState,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  link.href = url;
  link.download = `cyber-roadmap-backup-${stamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);

  elements.progressMessage.textContent = 'Backup exported as JSON.';
});

elements.exportEncryptedBackupButton?.addEventListener('click', async () => {
  const passcode = await showPrompt('Encrypted Backup', 'Enter a passcode to encrypt this backup:', '');
  if (!passcode) {
    return;
  }

  const payload = {
    version: 1,
    project: PROJECT_NAME,
    exportedAt: new Date().toISOString(),
    progress: snapshotState(),
    checkpoints,
    notes: notesState,
  };

  const encryptedPayload = await encryptBackupPayload(payload, passcode);
  const blob = new Blob([JSON.stringify(encryptedPayload, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  link.href = url;
  link.download = `cyber-roadmap-backup-encrypted-${stamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);

  elements.progressMessage.textContent = 'Encrypted backup exported.';
});

elements.exportReportButton?.addEventListener('click', () => {
  exportProgressReportImage();
});

elements.importBackupButton?.addEventListener('click', () => {
  elements.importBackupFile?.click();
});

elements.importBackupFile?.addEventListener('change', async () => {
  const file = elements.importBackupFile.files && elements.importBackupFile.files[0];
  if (!file) {
    return;
  }

  try {
    const raw = await file.text();
    const parsed = JSON.parse(raw);
    let parsedBackup = parsed;

    if (parsed?.encrypted === true) {
      const passcode = await showPrompt('Encrypted Backup', 'Enter passcode to decrypt this backup:', '');
      if (!passcode) {
        return;
      }

      parsedBackup = await decryptBackupPayload(parsed, passcode);
    }

    const backupProgress = parsedBackup && typeof parsedBackup === 'object' && parsedBackup.progress && typeof parsedBackup.progress === 'object'
      ? parsedBackup.progress
      : parsedBackup;

    if (!backupProgress || typeof backupProgress !== 'object') {
      throw new Error('Invalid backup format.');
    }

    const shouldImport = await showConfirm('Import Backup', 'Import backup and replace current progress?');
    if (!shouldImport) {
      return;
    }

    createAutoCheckpoint('Auto safety before import');

    if (Array.isArray(parsedBackup?.checkpoints)) {
      checkpoints.length = 0;
      parsedBackup.checkpoints.slice(0, MAX_CHECKPOINTS).forEach((checkpoint, index) => {
        if (!checkpoint || typeof checkpoint !== 'object' || typeof checkpoint.state !== 'object') {
          return;
        }

        checkpoints.push({
          id: typeof checkpoint.id === 'string' ? checkpoint.id : `cp-import-${Date.now()}-${index}`,
          label: typeof checkpoint.label === 'string' ? checkpoint.label : `Imported checkpoint ${index + 1}`,
          createdAt: typeof checkpoint.createdAt === 'string' ? checkpoint.createdAt : new Date().toISOString(),
          state: checkpoint.state,
        });
      });
      saveCheckpoints();
    }

    if (parsedBackup?.notes && typeof parsedBackup.notes === 'object') {
      Object.keys(notesState).forEach((key) => delete notesState[key]);
      Object.keys(parsedBackup.notes).forEach((key) => {
        const value = parsedBackup.notes[key];
        if (typeof value === 'string') {
          notesState[key] = value;
        }
      });
      saveNotes();
    }

    if (window.__roadmapModel) {
      applyState(backupProgress, window.__roadmapModel);
    }

    refreshStorageStatus();
    elements.progressMessage.textContent = 'Backup imported successfully.';
  } catch (error) {
    await showAlert('Import Backup', `Import failed: ${error?.message || error}`);
  } finally {
    elements.importBackupFile.value = '';
  }
});

elements.contactMessage?.addEventListener('input', updateContactCounter);
elements.contactName?.addEventListener('input', () => validateContactField('name'));
elements.contactEmail?.addEventListener('input', () => validateContactField('email'));
elements.contactSubject?.addEventListener('change', () => validateContactField('subject'));
elements.contactMessage?.addEventListener('input', () => validateContactField('message'));
elements.contactForm?.addEventListener('submit', handleContactSubmit);
elements.congratsClose?.addEventListener('click', closeCongratsScreen);
elements.congratsReview?.addEventListener('click', () => {
  closeCongratsScreen();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
elements.congratsReset?.addEventListener('click', () => {
  closeCongratsScreen();
  elements.resetButton?.click();
});
elements.congratsScreen?.addEventListener('click', (event) => {
  const closeTrigger = event.target?.getAttribute?.('data-congrats-close');
  if (closeTrigger) {
    closeCongratsScreen();
  }
});

window.addEventListener('resize', () => {
  if (elements.congratsScreen?.classList.contains('is-open')) {
    resizeMatrixCanvas();
  }
});

document.addEventListener('keydown', handleGlobalShortcuts);

boot().catch((error) => {
  console.error(error);
  elements.roadmapRoot.innerHTML = `
    <div class="empty-state">
      <strong>Unable to load the markdown roadmap.</strong>
      <p>The app expects the roadmap file to be available as <code>README.md</code> or <code>readme.md</code> next to this page.</p>
      <p><strong>Runtime error:</strong> ${escapeHTML(String(error && error.message ? error.message : error))}</p>
    </div>
  `;
  elements.progressMessage.textContent = 'Failed to load roadmap content.';
});

async function boot() {
  const markdown = await loadMarkdown();
  const model = parseMarkdown(markdown);
  window.__roadmapModel = model;

  document.title = PROJECT_NAME;
  elements.title.textContent = PROJECT_NAME;
  elements.subtitle.textContent = 'A comprehensive, step-by-step guide to mastering cybersecurity from beginner to expert level with curated resources, tools, and career guidance';

  renderFromModel(model);
  updateOverview(model);
  refreshStorageStatus();
  syncFilterButtonState();
  updateAnalyticsPanel(0, 0, model);
  updateContactCounter();
  stampContactStartTime();
  registerServiceWorker();
  updateCurrentPhaseByViewport();
  window.addEventListener('scroll', updateCurrentPhaseByViewport, { passive: true });
}

function stampContactStartTime() {
  if (elements.contactTimestamp) {
    elements.contactTimestamp.value = String(Date.now());
  }
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.register('./service-worker.js').catch(() => {
    // Service worker registration can fail on file:// usage; ignore silently.
  });
}

function handleGlobalShortcuts(event) {
  if (elements.dialogRoot?.classList.contains('is-open')) {
    return;
  }

  if (elements.congratsScreen?.classList.contains('is-open')) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeCongratsScreen();
    }
    return;
  }

  const target = event.target;
  const tag = target?.tagName?.toLowerCase();
  const isTyping = tag === 'input' || tag === 'textarea' || tag === 'select' || target?.isContentEditable;
  if (isTyping) {
    return;
  }

  if (event.key === '/') {
    event.preventDefault();
    elements.taskSearch?.focus();
    return;
  }

  const key = event.key.toLowerCase();
  if (key === 'e') {
    setAllDetailsOpen(true);
    elements.progressMessage.textContent = 'All sections expanded.';
    return;
  }

  if (key === 'c') {
    setAllDetailsOpen(false);
    elements.progressMessage.textContent = 'All sections collapsed.';
    return;
  }

  if (key === 'n') {
    jumpToNextUncheckedTask();
  }
}

function jumpToNextUncheckedTask() {
  const unchecked = Array.from(document.querySelectorAll('.task-checkbox')).find((checkbox) => !checkbox.checked);
  if (!unchecked) {
    elements.progressMessage.textContent = 'No open tasks left.';
    return;
  }

  const topicCard = unchecked.closest('.topic-card');
  const phaseCard = unchecked.closest('.phase-card');
  if (topicCard) {
    topicCard.open = true;
  }
  if (phaseCard) {
    phaseCard.open = true;
  }

  unchecked.scrollIntoView({ behavior: 'smooth', block: 'center' });
  unchecked.focus({ preventScroll: true });
  elements.progressMessage.textContent = 'Jumped to next open task.';
}

function updateCurrentPhaseByViewport() {
  const phaseCards = Array.from(document.querySelectorAll('.phase-card'));
  if (!phaseCards.length) {
    return;
  }

  let closest = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  phaseCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const distance = Math.abs(rect.top - 140);
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = card;
    }
  });

  const phaseId = closest?.dataset?.phaseId;
  if (phaseId && phaseId !== currentPhaseFilterId) {
    currentPhaseFilterId = phaseId;
    uiState.currentPhaseId = phaseId;
    saveUIState();

    if (activeTaskFilter === 'current-phase') {
      applySearchFilter(elements.taskSearch?.value || '');
    }
  }
}

function updateContactCounter() {
  if (!elements.contactCounter || !elements.contactMessage) {
    return;
  }

  const max = Number(elements.contactMessage.getAttribute('maxlength')) || 1200;
  const count = elements.contactMessage.value.length;
  elements.contactCounter.textContent = `${count}/${max}`;
}

async function handleContactSubmit(event) {
  event.preventDefault();

  const form = elements.contactForm;
  if (!form) {
    return;
  }

  const honeypot = form.querySelector('#contact-company');
  if (honeypot && honeypot.value.trim()) {
    return;
  }

  const submittedTooFast = isContactSubmittedTooFast();
  if (submittedTooFast) {
    setContactStatus('Submission blocked. Please wait a few seconds and try again.', 'error');
    return;
  }

  const validName = validateContactField('name');
  const validEmail = validateContactField('email');
  const validSubject = validateContactField('subject');
  const validMessage = validateContactField('message');

  if (!validName || !validEmail || !validSubject || !validMessage) {
    setContactStatus('Please fix the highlighted fields and try again.', 'error');
    return;
  }

  if (!form.reportValidity()) {
    setContactStatus('Please fill all required fields correctly.', 'error');
    return;
  }

  const messageValue = elements.contactMessage?.value.trim() || '';

  const submitButton = elements.contactSubmit;
  const originalLabel = submitButton?.textContent || 'Send Message';

  setContactStatus('Sending message...', 'info');

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add('is-loading');
    submitButton.textContent = 'Sending...';
  }

  try {
    const formData = new FormData(form);
    const emailValue = elements.contactEmail?.value?.trim() || '';
    formData.set('_replyto', emailValue);

    const response = await fetch(form.action, {
      method: form.method || 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      let errorMessage = 'Unable to send message right now. Please try again.';
      try {
        const payload = await response.json();
        if (payload?.errors?.length) {
          errorMessage = payload.errors.map((item) => item.message).join(' ');
        }
      } catch {
        // Keep default error message if response is not JSON.
      }
      throw new Error(errorMessage);
    }

    form.reset();
    updateContactCounter();
    setContactStatus('Message sent successfully. Thank you, I will get back to you soon.', 'success');
    elements.progressMessage.textContent = 'Contact message sent successfully.';
  } catch (error) {
    setContactStatus(error?.message || 'Unable to send message right now. Please try again.', 'error');
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.classList.remove('is-loading');
      submitButton.textContent = originalLabel;
    }
  }
}

function isContactSubmittedTooFast() {
  if (!elements.contactTimestamp?.value) {
    return false;
  }

  const startedAt = Number(elements.contactTimestamp.value);
  if (!Number.isFinite(startedAt)) {
    return false;
  }

  return Date.now() - startedAt < 3000;
}

function validateContactField(fieldName) {
  const configMap = {
    name: {
      input: elements.contactName,
      error: elements.contactNameError,
      validator: (value) => value.length >= 2 && value.length <= 80,
      message: 'Name must be between 2 and 80 characters.',
    },
    email: {
      input: elements.contactEmail,
      error: elements.contactEmailError,
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email address.',
    },
    subject: {
      input: elements.contactSubject,
      error: elements.contactSubjectError,
      validator: (value) => value.trim().length > 0,
      message: 'Please select a subject.',
    },
    message: {
      input: elements.contactMessage,
      error: elements.contactMessageError,
      validator: (value) => value.trim().length >= 10,
      message: 'Message must be at least 10 characters.',
    },
  };

  const config = configMap[fieldName];
  if (!config || !config.input) {
    return true;
  }

  const value = String(config.input.value || '');
  const isValid = config.validator(value);

  const fieldWrap = config.input.closest('.contact-field');
  if (fieldWrap) {
    fieldWrap.classList.toggle('has-error', !isValid);
  }

  if (config.error) {
    config.error.textContent = isValid ? '' : config.message;
  }

  return isValid;
}

function setContactStatus(message, type) {
  if (!elements.contactStatus) {
    return;
  }

  const status = elements.contactStatus;
  status.textContent = message || '';
  status.classList.remove('is-visible', 'is-success', 'is-error');

  if (!message) {
    return;
  }

  status.classList.add('is-visible');

  if (type === 'success') {
    status.classList.add('is-success');
    return;
  }

  if (type === 'error') {
    status.classList.add('is-error');
  }
}

async function loadMarkdown() {
  let lastError = null;

  for (const path of SOURCE_FILES) {
    try {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${path}`);
      }

      return await response.text();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Unable to load markdown file.');
}

function parseMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const titleLine = lines.find((line) => /^#\s+/.test(line));
  const title = titleLine ? titleLine.replace(/^#\s+/, '').replace(/\s+/g, ' ').trim() : PROJECT_NAME;

  const phases = [];
  let currentPhase = null;
  let currentTopic = null;
  let phaseCounter = 0;
  let topicCounter = 0;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    const phaseMatch = /^##\s+(.*)/.exec(trimmed);
    if (phaseMatch) {
      currentPhase = {
        id: `phase-${phaseCounter += 1}`,
        title: cleanInline(phaseMatch[1]),
        topics: [],
        contentLines: [],
      };
      phases.push(currentPhase);
      currentTopic = null;
      continue;
    }

    const topicMatch = /^###\s+(.*)/.exec(trimmed);
    if (topicMatch && currentPhase) {
      currentTopic = {
        id: `topic-${phaseCounter}-${topicCounter += 1}`,
        title: cleanInline(topicMatch[1]),
        rawTitle: topicMatch[1],
        nodes: [],
        contentLines: [],
      };
      currentPhase.topics.push(currentTopic);
      continue;
    }

    if (currentTopic) {
      currentTopic.nodes.push(line);
      currentTopic.contentLines.push(line);
    } else if (currentPhase) {
      currentPhase.contentLines.push(line);
    }
  }

  phases.forEach((phase) => {
    phase.topics.forEach((topic) => {
      topic.tree = parseBulletTree(topic.nodes, `${phase.id}-${topic.id}`);
      topic.stats = countTasks(topic.tree);
    });

    phase.stats = phase.topics.reduce(
      (accumulator, topic) => {
        accumulator.total += topic.stats.total;
        accumulator.completed += topic.stats.completed;
        return accumulator;
      },
      { total: 0, completed: 0 }
    );
  });

  return {
    title,
    phases,
  };
}

function parseBulletTree(lines, prefix) {
  const root = [];
  const stack = [{ indent: -1, children: root }];
  let nodeCounter = 0;

  for (const line of lines) {
    const bulletMatch = /^(\s*)[-*]\s+(.*)$/.exec(line);
    if (!bulletMatch) {
      continue;
    }

    const indent = bulletMatch[1].length;
    const text = bulletMatch[2].trim();
    const node = {
      id: `${prefix}-node-${nodeCounter += 1}`,
      text,
      kind: isCategoryLabel(text) ? 'category' : 'task',
      children: [],
    };

    while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    stack[stack.length - 1].children.push(node);
    stack.push({ indent, children: node.children });
  }

  return root;
}

function isCategoryLabel(text) {
  return /^\*\*[^*]+\*\*:\s*$/.test(text) || /^[A-Za-z][A-Za-z0-9 &/().,'-]+:\s*$/.test(text);
}

function countTasks(nodes) {
  return nodes.reduce(
    (accumulator, node) => {
      if (node.kind === 'task') {
        accumulator.total += 1;
        if (state[node.id]) {
          accumulator.completed += 1;
        }
      }

      if (node.children.length) {
        const childCounts = countTasks(node.children);
        accumulator.total += childCounts.total;
        accumulator.completed += childCounts.completed;
      }

      return accumulator;
    },
    { total: 0, completed: 0 }
  );
}

function renderFromModel(model) {
  const { roadmapRoot } = elements;
  roadmapRoot.innerHTML = '';

  if (!model.phases.length) {
    roadmapRoot.innerHTML = `
      <div class="empty-state">
        <strong>No roadmap sections were found.</strong>
        <p>Make sure the markdown contains <code>##</code> and <code>###</code> headings with bullet lists underneath.</p>
      </div>
    `;
    return;
  }

  model.phases.forEach((phase) => {
    const phaseCard = document.createElement('details');
    phaseCard.className = 'phase-card';
    phaseCard.dataset.phaseId = phase.id;
    phaseCard.dataset.detailKey = `phase:${phase.id}`;
    phaseCard.id = `phase-anchor-${phase.id}`;
    phaseCard.open = getSavedDetailOpenState(`phase:${phase.id}`, true);

    const phaseSummary = document.createElement('summary');
    const hasPhaseInfoContent = hasRenderableContent(phase.contentLines) || phase.topics.some((topic) => hasRenderableContent(topic.contentLines));
    const isInfoOnlyPhase = phase.stats.total === 0 && hasPhaseInfoContent;
    phaseSummary.innerHTML = isInfoOnlyPhase
      ? `
      <div class="phase-summary phase-summary--info">
        <div>
          <span class="info-kicker">Information</span>
          <h3 class="phase-title">${escapeHTML(phase.title)}</h3>
          <span class="phase-meta">Important context and guidance</span>
        </div>
      </div>
    `
      : `
      <div class="phase-summary">
        <div>
          <h3 class="phase-title">${escapeHTML(phase.title)}</h3>
          <span class="phase-meta">
            ${phase.topics.length} topics ·
            <span class="js-phase-completed">${phase.stats.completed}</span>/<span class="js-phase-total">${phase.stats.total}</span> completed
          </span>
        </div>
        <div class="phase-meta js-phase-percent">${phase.stats.total ? Math.round((phase.stats.completed / phase.stats.total) * 100) : 0}%</div>
      </div>
    `;
    phaseCard.appendChild(phaseSummary);

    const phaseContent = document.createElement('div');
    phaseContent.className = 'phase-content';

    if (hasRenderableContent(phase.contentLines)) {
      const infoCard = document.createElement('div');
      infoCard.className = 'info-card';
      infoCard.appendChild(renderRichContent(phase.contentLines));
      phaseContent.appendChild(infoCard);
    }

    phase.topics.forEach((topic) => {
      const hasTaskTree = topic.stats.total > 0;
      const hasInfoContent = hasRenderableContent(topic.contentLines);

      if (!hasTaskTree && hasInfoContent) {
        const infoTopic = document.createElement('section');
        infoTopic.className = 'info-card info-card--topic';
        infoTopic.innerHTML = `<span class="info-kicker">Information</span><h4 class="topic-title">${escapeHTML(topic.title)}</h4>`;
        infoTopic.appendChild(renderRichContent(topic.contentLines));
        phaseContent.appendChild(infoTopic);
        return;
      }

      const topicCard = document.createElement('details');
      topicCard.className = 'topic-card';
      topicCard.dataset.topicId = topic.id;
      topicCard.dataset.detailKey = `topic:${topic.id}`;
      topicCard.open = getSavedDetailOpenState(`topic:${topic.id}`, true);

      const topicSummary = document.createElement('summary');
      topicSummary.innerHTML = `
        <div class="topic-summary">
          <div>
            <h4 class="topic-title">${escapeHTML(topic.title)}</h4>
            <span class="topic-meta">
              <span class="js-topic-completed">${topic.stats.completed}</span>/<span class="js-topic-total">${topic.stats.total}</span> tasks completed
            </span>
          </div>
          <div class="topic-meta js-topic-percent">${topic.stats.total ? Math.round((topic.stats.completed / topic.stats.total) * 100) : 0}%</div>
        </div>
      `;
      topicCard.appendChild(topicSummary);

      const topicBody = document.createElement('div');
      topicBody.className = 'topic-body';
      topicBody.appendChild(renderTaskTree(topic.tree, 0));
      topicCard.appendChild(topicBody);

      phaseContent.appendChild(topicCard);
    });

    phaseCard.appendChild(phaseContent);
    roadmapRoot.appendChild(phaseCard);
  });

  if (!currentPhaseFilterId && model.phases.length) {
    currentPhaseFilterId = model.phases[0].id;
    uiState.currentPhaseId = currentPhaseFilterId;
    saveUIState();
  }

  renderQuickNav(model);
  wireTaskInteractions();
  wireTaskNotes();
  wireDetailPersistence();
  applySearchFilter(elements.taskSearch?.value || '');
}

function renderQuickNav(model) {
  if (!elements.quickNav) {
    return;
  }

  elements.quickNav.innerHTML = '';

  model.phases.forEach((phase) => {
    const link = document.createElement('a');
    const targetId = `phase-anchor-${phase.id}`;
    link.href = `#${targetId}`;
    link.className = 'quick-nav-link';
    link.dataset.phaseTarget = phase.id;
    link.textContent = phase.title;

    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      currentPhaseFilterId = phase.id;
      uiState.currentPhaseId = currentPhaseFilterId;
      saveUIState();

      target.open = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (activeTaskFilter === 'current-phase') {
        applySearchFilter(elements.taskSearch?.value || '');
      }
    });

    elements.quickNav.appendChild(link);
  });
}

function setAllDetailsOpen(open) {
  document.querySelectorAll('.phase-card, .topic-card').forEach((detail) => {
    detail.open = open;
  });
}

function applySearchFilter(rawQuery) {
  const query = (rawQuery || '').trim().toLowerCase();
  const hasQuery = query.length > 0;

  const taskItems = Array.from(document.querySelectorAll('.task-item'));
  taskItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    const isSearchMatch = !hasQuery || text.includes(query);
    const taskCheckbox = item.querySelector(':scope > .task-row .task-checkbox');
    const isTaskNode = Boolean(taskCheckbox);
    const isChecked = isTaskNode ? taskCheckbox.checked : false;
    const belongsToCurrentPhase = Boolean(item.closest(`.phase-card[data-phase-id="${currentPhaseFilterId}"]`));
    const isPriorityTask = item.dataset.priority === 'high' || item.dataset.difficulty === 'hard';

    let isFilterMatch = true;
    if (isTaskNode) {
      if (activeTaskFilter === 'open') {
        isFilterMatch = !isChecked;
      } else if (activeTaskFilter === 'done') {
        isFilterMatch = isChecked;
      } else if (activeTaskFilter === 'current-phase') {
        isFilterMatch = belongsToCurrentPhase;
      } else if (activeTaskFilter === 'priority') {
        isFilterMatch = isPriorityTask;
      }
    }

    const shouldShow = isSearchMatch && isFilterMatch;
    item.classList.toggle('is-hidden-by-search', !shouldShow);
  });

  // Keep parent tasks visible if any of their child tasks match the query.
  taskItems.reverse().forEach((item) => {
    if (!item.classList.contains('is-hidden-by-search')) {
      let parentTask = item.parentElement?.closest('.task-item');
      while (parentTask) {
        parentTask.classList.remove('is-hidden-by-search');
        parentTask = parentTask.parentElement?.closest('.task-item');
      }
    }
  });

  const topicCards = Array.from(document.querySelectorAll('.topic-card'));
  topicCards.forEach((topicCard) => {
    const visibleTask = topicCard.querySelector('.task-item:not(.is-hidden-by-search)');
    topicCard.classList.toggle('is-hidden-by-search', hasQuery && !visibleTask);
    if (hasQuery && visibleTask) {
      withDetailPersistencePaused(() => {
        topicCard.open = true;
      });
    }
  });

  const phaseCards = Array.from(document.querySelectorAll('.phase-card'));
  phaseCards.forEach((phaseCard) => {
    const visibleTopic = phaseCard.querySelector('.topic-card:not(.is-hidden-by-search)');
    const visibleInfo = phaseCard.querySelector('.info-card:not(.is-hidden-by-search)');
    phaseCard.classList.toggle('is-hidden-by-search', hasQuery && !visibleTopic && !visibleInfo);
    if (hasQuery && visibleTopic) {
      withDetailPersistencePaused(() => {
        phaseCard.open = true;
      });
    }

    const phaseId = phaseCard.dataset.phaseId;
    const quickLink = elements.quickNav?.querySelector(`.quick-nav-link[data-phase-target="${phaseId}"]`);
    if (quickLink) {
      quickLink.classList.toggle('is-hidden-by-search', hasQuery && !visibleTopic);
    }
  });

  elements.progressMessage.textContent = hasQuery ? `Filtered by: ${rawQuery}` : `${elements.completedCount.textContent} of ${elements.totalCount.textContent} items completed.`;
}

function setActiveTaskFilter(filter) {
  if (filter === 'current-phase' && !currentPhaseFilterId) {
    const firstPhase = document.querySelector('.phase-card');
    currentPhaseFilterId = firstPhase?.dataset?.phaseId || null;
    uiState.currentPhaseId = currentPhaseFilterId;
    saveUIState();
  }

  activeTaskFilter = filter;
  uiState.taskFilter = filter;
  saveUIState();
  syncFilterButtonState();
  applySearchFilter(elements.taskSearch?.value || '');

  if (filter === 'all') {
    elements.progressMessage.textContent = `${elements.completedCount.textContent} of ${elements.totalCount.textContent} items completed.`;
  } else if (filter === 'open') {
    elements.progressMessage.textContent = 'Showing only open tasks.';
  } else if (filter === 'done') {
    elements.progressMessage.textContent = 'Showing only completed tasks.';
  } else if (filter === 'current-phase') {
    elements.progressMessage.textContent = 'Showing tasks from current phase.';
  } else if (filter === 'priority') {
    elements.progressMessage.textContent = 'Showing high-priority tasks.';
  }
}

function syncFilterButtonState() {
  elements.filterAllButton?.classList.toggle('is-active', activeTaskFilter === 'all');
  elements.filterOpenButton?.classList.toggle('is-active', activeTaskFilter === 'open');
  elements.filterDoneButton?.classList.toggle('is-active', activeTaskFilter === 'done');
  elements.filterCurrentPhaseButton?.classList.toggle('is-active', activeTaskFilter === 'current-phase');
  elements.filterPriorityButton?.classList.toggle('is-active', activeTaskFilter === 'priority');
}

function wireDetailPersistence() {
  document.querySelectorAll('.phase-card, .topic-card').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (pauseDetailPersistence) {
        return;
      }

      const detailKey = detail.dataset.detailKey;
      if (!detailKey) {
        return;
      }

      if (!uiState.details) {
        uiState.details = {};
      }

      uiState.details[detailKey] = Boolean(detail.open);
      saveUIState();
    });
  });
}

function withDetailPersistencePaused(action) {
  pauseDetailPersistence = true;
  try {
    action();
  } finally {
    pauseDetailPersistence = false;
  }
}

function getSavedDetailOpenState(detailKey, fallback = true) {
  if (!detailKey || !uiState.details || typeof uiState.details[detailKey] !== 'boolean') {
    return fallback;
  }

  return uiState.details[detailKey];
}

function renderTaskTree(nodes, depth = 0) {
  const list = document.createElement('ul');
  list.className = 'task-tree';

  nodes.forEach((node) => {
    const item = document.createElement('li');
    item.className = 'task-item';
    item.dataset.nodeId = node.id;

    if (node.kind === 'category') {
      const label = document.createElement('div');
      label.className = 'category-label';
      label.appendChild(renderInline(node.text));
      item.appendChild(label);
    } else {
      const taskMeta = deriveTaskMetadata(node.text, depth, node.children.length);
      const row = document.createElement('div');
      row.className = 'task-row';

      const checkbox = document.createElement('input');
      checkbox.className = 'task-checkbox';
      checkbox.type = 'checkbox';
      checkbox.id = node.id;
      checkbox.checked = Boolean(state[node.id]);
      checkbox.dataset.nodeId = node.id;

      const label = document.createElement('div');
      label.className = 'task-label';
      label.appendChild(renderInline(node.text));

      item.dataset.difficulty = taskMeta.difficulty;
      item.dataset.priority = taskMeta.priority;

      if (checkbox.checked) {
        item.classList.add('is-checked');
      }

      row.appendChild(checkbox);
      row.appendChild(label);
      item.appendChild(row);

      const metaRow = document.createElement('div');
      metaRow.className = 'task-meta';

      const difficultyBadge = document.createElement('span');
      difficultyBadge.className = `task-badge ${taskMeta.difficulty === 'hard' ? 'is-hard' : taskMeta.difficulty === 'medium' ? 'is-medium' : 'is-easy'}`;
      difficultyBadge.textContent = taskMeta.difficulty;

      const timeBadge = document.createElement('span');
      timeBadge.className = 'task-badge';
      timeBadge.textContent = taskMeta.estimate;

      const noteToggle = document.createElement('button');
      noteToggle.className = 'task-note-toggle';
      noteToggle.type = 'button';
      noteToggle.dataset.nodeId = node.id;
      noteToggle.textContent = notesState[node.id]?.trim() ? 'Edit note' : 'Add note';

      metaRow.appendChild(difficultyBadge);
      metaRow.appendChild(timeBadge);
      if (taskMeta.priority === 'high') {
        const priorityBadge = document.createElement('span');
        priorityBadge.className = 'task-badge is-hard';
        priorityBadge.textContent = 'high-priority';
        metaRow.appendChild(priorityBadge);
      }
      metaRow.appendChild(noteToggle);
      item.appendChild(metaRow);

      const noteWrap = document.createElement('div');
      noteWrap.className = 'task-note-area';
      noteWrap.dataset.nodeId = node.id;
      if (notesState[node.id]?.trim()) {
        noteWrap.classList.add('is-open');
      }

      const noteInput = document.createElement('textarea');
      noteInput.className = 'task-note-input';
      noteInput.placeholder = 'Add your note, lab findings, links, or reminders...';
      noteInput.dataset.nodeId = node.id;
      noteInput.value = notesState[node.id] || '';

      noteWrap.appendChild(noteInput);
      item.appendChild(noteWrap);
    }

    if (node.children.length) {
      const childrenWrap = document.createElement('div');
      childrenWrap.className = 'task-children';
      childrenWrap.appendChild(renderTaskTree(node.children, depth + 1));
      item.appendChild(childrenWrap);
    }

    list.appendChild(item);
  });

  return list;
}

function hasRenderableContent(lines) {
  return Array.isArray(lines) && lines.some((line) => line.trim().length > 0);
}

function renderRichContent(lines) {
  const container = document.createElement('div');
  container.className = 'info-prose';

  const blocks = [];
  let currentBlock = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      currentBlock = null;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      blocks.push({ type: 'separator' });
      currentBlock = null;
      continue;
    }

    const isQuoteLine = /^>\s?/.test(trimmed);
    if (isQuoteLine) {
      if (!currentBlock || currentBlock.type !== 'quote') {
        currentBlock = { type: 'quote', lines: [] };
        blocks.push(currentBlock);
      }

      currentBlock.lines.push(trimmed.replace(/^>\s?/, ''));
      continue;
    }

    const isListItem = /^([-*]|\d+\.)\s+/.test(trimmed);
    if (isListItem) {
      if (!currentBlock || currentBlock.type !== 'list') {
        currentBlock = { type: 'list', items: [] };
        blocks.push(currentBlock);
      }

      currentBlock.items.push(trimmed.replace(/^([-*]|\d+\.)\s+/, ''));
      continue;
    }

    if (!currentBlock || currentBlock.type !== 'paragraph') {
      currentBlock = { type: 'paragraph', text: [] };
      blocks.push(currentBlock);
    }

    currentBlock.text.push(trimmed);
  }

  blocks.forEach((block) => {
    if (block.type === 'separator') {
      const separator = document.createElement('hr');
      separator.className = 'info-separator';
      container.appendChild(separator);
      return;
    }

    if (block.type === 'list') {
      const list = document.createElement('ul');
      list.className = 'info-list';
      block.items.forEach((itemText) => {
        const li = document.createElement('li');
        li.appendChild(renderInline(itemText));
        list.appendChild(li);
      });
      container.appendChild(list);
      return;
    }

    if (block.type === 'quote') {
      const quote = document.createElement('blockquote');
      quote.className = 'info-quote';

      const quoteLines = Array.isArray(block.lines) ? block.lines : [];
      let paragraphParts = [];

      const flushParagraph = () => {
        if (!paragraphParts.length) {
          return;
        }

        const paragraphText = paragraphParts.join(' ').trim();
        const paragraph = document.createElement('p');
        paragraph.appendChild(renderInline(paragraphText));
        if (/^Made with\b/i.test(paragraphText)) {
          paragraph.classList.add('info-signoff');
        }
        quote.appendChild(paragraph);
        paragraphParts = [];
      };

      quoteLines.forEach((quoteLine) => {
        if (!quoteLine.trim()) {
          flushParagraph();
          return;
        }

        paragraphParts.push(quoteLine.trim());
      });

      flushParagraph();

      if (quote.childElementCount > 0) {
        container.appendChild(quote);
      }
      return;
    }

    const paragraph = document.createElement('p');
    paragraph.appendChild(renderInline(block.text.join(' ')));
    container.appendChild(paragraph);
  });

  return container;
}

function wireTaskInteractions() {
  document.querySelectorAll('.task-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const item = checkbox.closest('.task-item');
      const nodeId = checkbox.dataset.nodeId;
      state[nodeId] = checkbox.checked;

      if (item) {
        setTaskVisualState(item, checkbox.checked);

        // When a parent task is toggled, apply the same state to all nested subtasks.
        item.querySelectorAll('.task-children .task-checkbox').forEach((childCheckbox) => {
          childCheckbox.checked = checkbox.checked;
          state[childCheckbox.dataset.nodeId] = checkbox.checked;

          const childItem = childCheckbox.closest('.task-item');
          if (childItem) {
            setTaskVisualState(childItem, checkbox.checked);
          }
        });

        if (checkbox.checked) {
          celebrate(item);
          elements.progressMessage.textContent = 'Nice. One more step completed.';
        } else {
          elements.progressMessage.textContent = 'Progress updated.';
        }
      }

      saveState();
      updateOverview(window.__roadmapModel);
    });
  });
}

function wireTaskNotes() {
  document.querySelectorAll('.task-note-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const nodeId = button.dataset.nodeId;
      const noteArea = document.querySelector(`.task-note-area[data-node-id="${nodeId}"]`);
      if (!noteArea) {
        return;
      }

      noteArea.classList.toggle('is-open');
      if (noteArea.classList.contains('is-open')) {
        const input = noteArea.querySelector('.task-note-input');
        input?.focus();
      }
    });
  });

  document.querySelectorAll('.task-note-input').forEach((input) => {
    input.addEventListener('input', () => {
      const nodeId = input.dataset.nodeId;
      if (!nodeId) {
        return;
      }

      const text = input.value;
      if (text.trim()) {
        notesState[nodeId] = text;
      } else {
        delete notesState[nodeId];
      }

      const toggle = document.querySelector(`.task-note-toggle[data-node-id="${nodeId}"]`);
      if (toggle) {
        toggle.textContent = text.trim() ? 'Edit note' : 'Add note';
      }

      saveNotes();
    });
  });
}

function deriveTaskMetadata(text, depth, childCount) {
  const lower = String(text || '').toLowerCase();
  const hardSignals = /(advanced|forensics|malware|exploit|reverse|apt|kernel|red team|incident response)/.test(lower);
  const mediumSignals = /(security|network|cloud|web|pentest|monitor|analysis)/.test(lower);

  let difficulty = 'easy';
  if (hardSignals || depth >= 2 || childCount >= 3) {
    difficulty = 'hard';
  } else if (mediumSignals || depth >= 1 || childCount >= 1) {
    difficulty = 'medium';
  }

  // Estimate effort from task semantics plus structure so durations feel closer to real workloads.
  let effortScore = difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1;

  if (/(read|watch|intro|overview|basics|fundamentals|learn|understand)/.test(lower)) {
    effortScore -= 1;
  }

  if (/(lab|hands-on|practice|configure|setup|install|try|exercise|ctf)/.test(lower)) {
    effortScore += 1;
  }

  if (/(build|project|create|develop|deploy|implement|pipeline|automation|script)/.test(lower)) {
    effortScore += 2;
  }

  if (/(exam|certification|capstone|portfolio|research|threat hunt|incident response plan|red team operation)/.test(lower)) {
    effortScore += 3;
  }

  if (/(deep dive|end-to-end|full|comprehensive|master)/.test(lower)) {
    effortScore += 1;
  }

  if (childCount >= 2) {
    effortScore += 1;
  }

  if (depth >= 2) {
    effortScore += 1;
  }

  effortScore = Math.max(0, Math.min(8, effortScore));

  let estimate = '15-30m';
  if (effortScore <= 1) {
    estimate = '10-25m';
  } else if (effortScore === 2) {
    estimate = '20-45m';
  } else if (effortScore === 3) {
    estimate = '35-75m';
  } else if (effortScore === 4) {
    estimate = '1-2h';
  } else if (effortScore === 5) {
    estimate = '2-3h';
  } else if (effortScore === 6) {
    estimate = '3-5h';
  } else {
    estimate = '5-8h';
  }

  const priority = difficulty === 'hard' || /(critical|must|important|priority|urgent)/.test(lower) ? 'high' : 'normal';

  return { difficulty, estimate, priority };
}

function setTaskVisualState(item, checked) {
  item.classList.toggle('is-checked', checked);
}

function celebrate(item) {
  const burst = document.createElement('span');
  burst.className = 'task-burst';

  for (let index = 0; index < 8; index += 1) {
    const dot = document.createElement('span');
    const angle = (index / 8) * Math.PI * 2;
    const distance = 26 + (index % 3) * 8;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    dot.style.setProperty('--burst-x', `${x}px`);
    dot.style.setProperty('--burst-y', `${y}px`);
    dot.style.left = '18px';
    dot.style.top = '18px';
    dot.style.transform = `translate(${x}px, ${y}px) scale(${0.7 + (index % 3) * 0.12})`;
    burst.appendChild(dot);
  }

  item.appendChild(burst);
  window.setTimeout(() => burst.remove(), 800);
}

function updateOverview(model) {
  const counts = model.phases.reduce(
    (accumulator, phase) => {
      phase.topics.forEach((topic) => {
        const stats = countTasks(topic.tree);
        accumulator.total += stats.total;
        accumulator.completed += stats.completed;
      });
      return accumulator;
    },
    { total: 0, completed: 0 }
  );

  const percent = counts.total ? Math.round((counts.completed / counts.total) * 100) : 0;

  const didCompletionChange = lastKnownCompletedCount !== null && counts.completed !== lastKnownCompletedCount;
  const isFirstOverviewPass = lastKnownCompletedCount === null;
  lastKnownCompletedCount = counts.completed;

  elements.completedCount.textContent = String(counts.completed);
  elements.totalCount.textContent = String(counts.total);
  elements.progressPercent.textContent = `${percent}%`;
  elements.progressFill.style.width = `${percent}%`;
  elements.progressCopy.textContent = counts.total
    ? `You have completed ${counts.completed} of ${counts.total} roadmap items.`
    : 'No checklist items were detected in the markdown file.';

  model.phases.forEach((phase) => {
    const phaseStats = phase.topics.reduce(
      (accumulator, topic) => {
        const stats = countTasks(topic.tree);
        accumulator.total += stats.total;
        accumulator.completed += stats.completed;
        return accumulator;
      },
      { total: 0, completed: 0 }
    );

    phase.stats = phaseStats;

    const phaseCard = document.querySelector(`.phase-card[data-phase-id="${phase.id}"]`);
    if (phaseCard) {
      const completedNode = phaseCard.querySelector('.js-phase-completed');
      const totalNode = phaseCard.querySelector('.js-phase-total');
      const percentNode = phaseCard.querySelector('.js-phase-percent');
      if (completedNode) completedNode.textContent = String(phaseStats.completed);
      if (totalNode) totalNode.textContent = String(phaseStats.total);
      if (percentNode) {
        percentNode.textContent = `${phaseStats.total ? Math.round((phaseStats.completed / phaseStats.total) * 100) : 0}%`;
      }
    }

    phase.topics.forEach((topic) => {
      const topicStats = countTasks(topic.tree);
      topic.stats = topicStats;

      const topicCard = document.querySelector(`.topic-card[data-topic-id="${topic.id}"]`);
      if (topicCard) {
        const completedNode = topicCard.querySelector('.js-topic-completed');
        const totalNode = topicCard.querySelector('.js-topic-total');
        const percentNode = topicCard.querySelector('.js-topic-percent');
        if (completedNode) completedNode.textContent = String(topicStats.completed);
        if (totalNode) totalNode.textContent = String(topicStats.total);
        if (percentNode) {
          percentNode.textContent = `${topicStats.total ? Math.round((topicStats.completed / topicStats.total) * 100) : 0}%`;
        }
      }
    });
  });

  if (counts.total && percent === 100) {
    elements.progressMessage.textContent = 'Everything is complete. That is a serious accomplishment.';
  } else if (counts.total) {
    elements.progressMessage.textContent = `${counts.completed} of ${counts.total} items completed.`;
  }

  maybeHandleCompletionCelebration(counts.total, percent);

  if (!isFirstOverviewPass) {
    recordAnalyticsDailySnapshot(counts.completed);
    saveAnalytics();

    if (didCompletionChange) {
      maybeCreateAutoCheckpoints(counts.completed, counts.total, percent);
    }
  }

  updateAnalyticsPanel(counts.completed, counts.total, model);

  refreshStorageStatus();
}

function maybeHandleCompletionCelebration(total, percent) {
  if (!elements.congratsScreen) {
    return;
  }

  if (total > 0 && percent === 100) {
    showCompletionBanner(true);
    if (!hasShownCongratsThisSession) {
      hasShownCongratsThisSession = true;
      window.requestAnimationFrame(() => {
        openCongratsScreen();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    return;
  }

  showCompletionBanner(false);
  if (hasShownCongratsThisSession) {
    hasShownCongratsThisSession = false;
  }

  closeCongratsScreen();
}

function openCongratsScreen() {
  if (!elements.congratsScreen) {
    return;
  }

  elements.congratsScreen.classList.add('is-open');
  elements.congratsScreen.setAttribute('aria-hidden', 'false');
  document.body.classList.add('congrats-open');
  startMatrixEffect();
  elements.congratsReview?.focus();
}

function showCompletionBanner(isVisible) {
  if (!elements.completionBanner) {
    return;
  }

  elements.completionBanner.hidden = !isVisible;
}

function closeCongratsScreen() {
  if (!elements.congratsScreen) {
    return;
  }

  elements.congratsScreen.classList.remove('is-open');
  elements.congratsScreen.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('congrats-open');
  stopMatrixEffect();
}

function startMatrixEffect() {
  const canvas = elements.congratsMatrix;
  if (!canvas) {
    return;
  }

  stopMatrixEffect();

  resizeMatrixCanvas();
  matrixFrameTick = 0;

  const drawFrame = () => {
    const context = canvas.getContext('2d');
    if (!context || !elements.congratsScreen?.classList.contains('is-open')) {
      stopMatrixEffect();
      return;
    }

    const width = canvas.width;
    const height = canvas.height;

    context.fillStyle = 'rgba(2, 8, 5, 0.08)';
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#68ffb1';
    context.font = `${matrixFontSize}px var(--font-mono)`;

    matrixColumns.forEach((dropY, columnIndex) => {
      const glyph = matrixGlyphs.charAt(Math.floor(Math.random() * matrixGlyphs.length));
      const x = columnIndex * matrixFontSize;
      const y = dropY * matrixFontSize;

      context.globalAlpha = 0.75;
      context.fillText(glyph, x, y);

      const isHead = matrixFrameTick % 12 === 0 && columnIndex % 7 === 0;
      if (isHead) {
        context.fillStyle = '#eafff4';
        context.globalAlpha = 1;
        context.fillText(glyph, x, y);
        context.fillStyle = '#68ffb1';
      }

      if (y > height && Math.random() > 0.975) {
        matrixColumns[columnIndex] = 0;
      } else {
        matrixColumns[columnIndex] = dropY + 0.45 + Math.random() * 0.35;
      }
    });

    matrixFrameTick += 1;
    matrixAnimationFrameId = window.requestAnimationFrame(drawFrame);
  };

  matrixAnimationFrameId = window.requestAnimationFrame(drawFrame);
}

function stopMatrixEffect() {
  if (matrixAnimationFrameId !== null) {
    window.cancelAnimationFrame(matrixAnimationFrameId);
    matrixAnimationFrameId = null;
  }

  const canvas = elements.congratsMatrix;
  if (!canvas) {
    return;
  }

  const context = canvas.getContext('2d');
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function resizeMatrixCanvas() {
  const canvas = elements.congratsMatrix;
  if (!canvas) {
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, window.innerWidth);
  const height = Math.max(1, window.innerHeight);

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext('2d');
  if (context) {
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  matrixFontSize = Math.max(14, Math.round(Math.min(width, height) / 55));
  const columnCount = Math.ceil(width / matrixFontSize);
  matrixColumns = Array.from({ length: columnCount }, () => Math.floor(Math.random() * height / matrixFontSize));
}

function maybeCreateAutoCheckpoints(completed, total, percent) {
  if (!total) {
    return;
  }

  const todayKey = getDateKey();
  if (autoCheckpointState.lastDailyDate !== todayKey) {
    createAutoCheckpoint(`Auto daily ${todayKey}`);
    autoCheckpointState.lastDailyDate = todayKey;
  }

  const milestone = Math.floor(percent / 25) * 25;
  if (milestone >= 25 && milestone > (autoCheckpointState.lastMilestonePercent || 0)) {
    createAutoCheckpoint(`Auto milestone ${milestone}% (${completed}/${total})`);
    autoCheckpointState.lastMilestonePercent = milestone;
  }

  saveAutoCheckpointState();
  refreshStorageStatus();
}

function createAutoCheckpoint(label) {
  checkpoints.unshift({
    id: `cp-auto-${Date.now()}`,
    label,
    createdAt: new Date().toISOString(),
    state: snapshotState(),
  });

  if (checkpoints.length > MAX_CHECKPOINTS) {
    checkpoints.length = MAX_CHECKPOINTS;
  }

  saveCheckpoints();
}

function recordAnalyticsDailySnapshot(completedCount) {
  const day = getDateKey();
  if (!analytics.daily) {
    analytics.daily = {};
  }

  const existing = Number(analytics.daily[day] || 0);
  analytics.daily[day] = Math.max(existing, completedCount);
}

function updateAnalyticsPanel(completedCount, totalCount, model = window.__roadmapModel) {
  const streak = calculateWeeklyStreak();
  const velocity = calculateVelocity7Days();
  const lastCheckpoint = checkpoints[0]
    ? `${checkpoints[0].label} (${new Date(checkpoints[0].createdAt).toLocaleDateString()})`
    : 'None';

  if (elements.analyticsStreak) {
    elements.analyticsStreak.textContent = `${streak} week${streak === 1 ? '' : 's'}`;
  }

  if (elements.analyticsVelocity) {
    elements.analyticsVelocity.textContent = `${velocity} task${velocity === 1 ? '' : 's'}`;
  }

  if (elements.analyticsCheckpoint) {
    elements.analyticsCheckpoint.textContent = lastCheckpoint;
  }

  if (!totalCount && elements.analyticsVelocity) {
    elements.analyticsVelocity.textContent = '0 tasks';
  }

  if (completedCount === 0 && !checkpoints.length && elements.analyticsCheckpoint) {
    elements.analyticsCheckpoint.textContent = 'None';
  }

  renderPhaseHeatmap(model);
}

function renderPhaseHeatmap(model) {
  if (!elements.analyticsHeatmap || !model?.phases?.length) {
    return;
  }

  elements.analyticsHeatmap.innerHTML = '';

  const taskPhases = model.phases.filter((phase) => Number(phase.stats?.total || 0) > 0);
  if (!taskPhases.length) {
    const empty = document.createElement('div');
    empty.className = 'phase-heatmap-row';
    empty.textContent = 'No task-based phases to analyze yet.';
    elements.analyticsHeatmap.appendChild(empty);
    return;
  }

  taskPhases.forEach((phase) => {
    const total = Number(phase.stats?.total || 0);
    const completed = Number(phase.stats?.completed || 0);
    const percent = total ? Math.round((completed / total) * 100) : 0;

    const row = document.createElement('div');
    row.className = 'phase-heatmap-row';

    const label = document.createElement('span');
    label.className = 'phase-heatmap-label';
    label.textContent = phase.title;

    const track = document.createElement('div');
    track.className = 'phase-heatmap-track';

    const fill = document.createElement('div');
    fill.className = 'phase-heatmap-fill';
    fill.style.width = `${percent}%`;
    track.appendChild(fill);

    const stat = document.createElement('span');
    stat.className = 'phase-heatmap-percent';
    stat.textContent = `${completed}/${total}`;

    row.appendChild(label);
    row.appendChild(track);
    row.appendChild(stat);
    elements.analyticsHeatmap.appendChild(row);
  });
}

function calculateWeeklyStreak() {
  const daily = analytics.daily || {};
  let streak = 0;

  for (let offset = 0; offset < 104; offset += 1) {
    const { weekStart, weekEnd } = getWeekRange(offset);
    if (!hasWeekActivity(weekStart, weekEnd, daily)) {
      break;
    }
    streak += 1;
  }

  return streak;
}

function hasWeekActivity(weekStart, weekEnd, dailyMap) {
  const beforeWeek = new Date(weekStart);
  beforeWeek.setDate(beforeWeek.getDate() - 1);

  const beforeValue = getSnapshotAtOrBefore(beforeWeek, dailyMap);
  const endValue = getSnapshotAtOrBefore(weekEnd, dailyMap);

  return endValue - beforeValue > 0;
}

function getWeekRange(weekOffset = 0) {
  const now = new Date();
  const current = new Date(now);
  current.setDate(now.getDate() - weekOffset * 7);

  const day = current.getDay();
  const diffToMonday = (day + 6) % 7;
  const weekStart = new Date(current);
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(current.getDate() - diffToMonday);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  return { weekStart, weekEnd };
}

function calculateStreak() {
  const daily = analytics.daily || {};
  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = toDateKey(cursor);
    const value = Number(daily[key] || 0);
    if (value <= 0) {
      break;
    }

    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function calculateVelocity7Days() {
  const daily = analytics.daily || {};
  const today = new Date();
  const baselineDate = new Date(today);
  baselineDate.setDate(today.getDate() - 7);

  const nowValue = getSnapshotAtOrBefore(today, daily);
  const baselineValue = getSnapshotAtOrBefore(baselineDate, daily);
  const velocity = nowValue - baselineValue;

  return velocity > 0 ? velocity : 0;
}

function getSnapshotAtOrBefore(targetDate, dailyMap) {
  const keys = Object.keys(dailyMap || {}).sort();
  const targetKey = toDateKey(targetDate);

  let latestKey = null;
  for (const key of keys) {
    if (key <= targetKey) {
      latestKey = key;
    } else {
      break;
    }
  }

  if (!latestKey) {
    return 0;
  }

  return Number(dailyMap[latestKey] || 0);
}

function getDateKey() {
  return toDateKey(new Date());
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function refreshStorageStatus() {
  if (!elements.storageStatus) {
    return;
  }

  if (!checkpoints.length) {
    elements.storageStatus.textContent = 'Saved locally';
    return;
  }

  elements.storageStatus.textContent = `Saved locally · ${checkpoints.length} checkpoints`;
}

function snapshotState() {
  return Object.keys(state).reduce((accumulator, key) => {
    if (state[key]) {
      accumulator[key] = true;
    }
    return accumulator;
  }, {});
}

function applyState(incomingState, model) {
  const sanitized = sanitizeStateForModel(incomingState, model);

  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, sanitized);

  saveState();
  renderFromModel(model);
  updateOverview(model);
}

function sanitizeStateForModel(incomingState, model) {
  if (!incomingState || typeof incomingState !== 'object') {
    return {};
  }

  const validTaskIds = collectTaskIds(model);
  const nextState = {};

  validTaskIds.forEach((id) => {
    if (incomingState[id]) {
      nextState[id] = true;
    }
  });

  return nextState;
}

function collectTaskIds(model) {
  const ids = new Set();

  const visit = (nodes) => {
    nodes.forEach((node) => {
      if (node.kind === 'task') {
        ids.add(node.id);
      }
      if (Array.isArray(node.children) && node.children.length) {
        visit(node.children);
      }
    });
  };

  model.phases.forEach((phase) => {
    phase.topics.forEach((topic) => {
      visit(topic.tree || []);
    });
  });

  return ids;
}

function renderInline(text) {
  const fragment = document.createDocumentFragment();
  const tokenPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;
  let match;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > cursor) {
      fragment.appendChild(document.createTextNode(text.slice(cursor, match.index)));
    }

    const token = match[0];

    if (token.startsWith('**')) {
      const strong = document.createElement('strong');
      strong.textContent = token.slice(2, -2);
      fragment.appendChild(strong);
    } else {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const link = document.createElement('a');
        link.className = 'resource-link';
        link.href = linkMatch[2];
        link.target = '_blank';
        link.rel = 'noreferrer noopener';
        link.textContent = linkMatch[1];
        fragment.appendChild(link);
      } else {
        fragment.appendChild(document.createTextNode(token));
      }
    }

    cursor = match.index + token.length;
  }

  if (cursor < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(cursor)));
  }

  return fragment;
}

function cleanInline(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .trim();
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function encryptBackupPayload(payload, passcode) {
  const cryptoApi = window.crypto?.subtle;
  if (!cryptoApi) {
    throw new Error('Web Crypto is not available in this browser.');
  }

  const encoder = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await cryptoApi.importKey('raw', encoder.encode(passcode), { name: 'PBKDF2' }, false, ['deriveKey']);
  const key = await cryptoApi.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 250000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const plaintext = encoder.encode(JSON.stringify(payload));
  const cipherBuffer = await cryptoApi.encrypt({ name: 'AES-GCM', iv }, key, plaintext);

  return {
    encrypted: true,
    version: 1,
    algorithm: 'AES-GCM',
    kdf: 'PBKDF2-SHA256',
    iterations: 250000,
    salt: bytesToBase64(new Uint8Array(salt)),
    iv: bytesToBase64(new Uint8Array(iv)),
    data: bytesToBase64(new Uint8Array(cipherBuffer)),
  };
}

async function decryptBackupPayload(encryptedPayload, passcode) {
  const cryptoApi = window.crypto?.subtle;
  if (!cryptoApi) {
    throw new Error('Web Crypto is not available in this browser.');
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const salt = base64ToBytes(encryptedPayload.salt);
  const iv = base64ToBytes(encryptedPayload.iv);
  const data = base64ToBytes(encryptedPayload.data);

  const keyMaterial = await cryptoApi.importKey('raw', encoder.encode(passcode), { name: 'PBKDF2' }, false, ['deriveKey']);
  const key = await cryptoApi.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: Number(encryptedPayload.iterations || 250000),
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  try {
    const plainBuffer = await cryptoApi.decrypt({ name: 'AES-GCM', iv }, key, data);
    const text = decoder.decode(plainBuffer);
    return JSON.parse(text);
  } catch {
    throw new Error('Wrong passcode or corrupted encrypted backup.');
  }
}

function bytesToBase64(bytes) {
  let binary = '';
  bytes.forEach((value) => {
    binary += String.fromCharCode(value);
  });
  return window.btoa(binary);
}

function base64ToBytes(value) {
  const binary = window.atob(String(value || ''));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function exportProgressReportImage() {
  const model = window.__roadmapModel;
  if (!model) {
    return;
  }

  const completed = Number(elements.completedCount?.textContent || 0);
  const total = Number(elements.totalCount?.textContent || 0);
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  ctx.fillStyle = '#04100a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#d8ffeb';
  ctx.font = '700 46px Space Grotesk, sans-serif';
  ctx.fillText('Cybersecurity Roadmap Progress', 64, 90);

  ctx.fillStyle = '#8bbca4';
  ctx.font = '500 24px JetBrains Mono, monospace';
  ctx.fillText(`Completed ${completed}/${total} (${percent}%)`, 64, 132);
  ctx.fillText(`Generated ${new Date().toLocaleString()}`, 64, 166);

  ctx.fillStyle = '#0a2216';
  ctx.fillRect(64, 206, 1072, 36);
  ctx.fillStyle = '#3dfcad';
  ctx.fillRect(64, 206, Math.round((1072 * percent) / 100), 36);

  const phaseRows = (model.phases || []).slice(0, 10);
  let y = 290;

  phaseRows.forEach((phase) => {
    const pTotal = Number(phase.stats?.total || 0);
    const pDone = Number(phase.stats?.completed || 0);
    const pPercent = pTotal ? Math.round((pDone / pTotal) * 100) : 0;

    ctx.fillStyle = '#bfe9d2';
    ctx.font = '600 22px Inter, sans-serif';
    ctx.fillText(phase.title.slice(0, 50), 64, y);

    ctx.fillStyle = '#0b2618';
    ctx.fillRect(64, y + 12, 880, 18);
    ctx.fillStyle = '#53ff98';
    ctx.fillRect(64, y + 12, Math.round((880 * pPercent) / 100), 18);

    ctx.fillStyle = '#9fdabf';
    ctx.font = '500 18px JetBrains Mono, monospace';
    ctx.fillText(`${pDone}/${pTotal} (${pPercent}%)`, 970, y + 28);

    y += 52;
  });

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  link.href = dataUrl;
  link.download = `cyber-roadmap-report-${stamp}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  elements.progressMessage.textContent = 'Progress report exported as PNG.';
}

function showAlert(title, message) {
  return openDialog({ title, message, mode: 'alert' }).then(() => undefined);
}

function showConfirm(title, message) {
  return openDialog({ title, message, mode: 'confirm' }).then((result) => result.confirmed);
}

function showPrompt(title, message, defaultValue = '') {
  return openDialog({ title, message, mode: 'prompt', defaultValue }).then((result) => {
    if (!result.confirmed) {
      return null;
    }
    return result.value;
  });
}

function openDialog({ title, message, mode, defaultValue = '' }) {
  return new Promise((resolve) => {
    const root = elements.dialogRoot;
    if (!root) {
      resolve({ confirmed: false, value: '' });
      return;
    }

    const inputWrap = elements.dialogInputWrap;
    const input = elements.dialogInput;
    const okButton = elements.dialogOk;
    const cancelButton = elements.dialogCancel;

    elements.dialogTitle.textContent = title;
    elements.dialogMessage.textContent = message;

    const isPrompt = mode === 'prompt';
    const isAlert = mode === 'alert';

    if (inputWrap) {
      inputWrap.hidden = !isPrompt;
    }

    if (input) {
      input.value = defaultValue;
    }

    if (cancelButton) {
      cancelButton.hidden = isAlert;
    }

    if (okButton) {
      okButton.textContent = isAlert ? 'Close' : 'OK';
    }

    let settled = false;
    const finish = (confirmed) => {
      if (settled) {
        return;
      }
      settled = true;
      root.classList.remove('is-open');
      root.setAttribute('aria-hidden', 'true');
      document.removeEventListener('keydown', onKeydown);
      root.removeEventListener('click', onRootClick);
      okButton?.removeEventListener('click', onOk);
      cancelButton?.removeEventListener('click', onCancel);

      resolve({ confirmed, value: input ? input.value : '' });
    };

    const onOk = () => finish(true);
    const onCancel = () => finish(false);
    const onRootClick = (event) => {
      const closeMode = event.target?.getAttribute?.('data-dialog-close');
      if (!closeMode) {
        return;
      }

      if (isAlert) {
        finish(true);
      } else {
        finish(false);
      }
    };

    const onKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (isAlert) {
          finish(true);
        } else {
          finish(false);
        }
        return;
      }

      if (event.key === 'Enter' && mode === 'prompt') {
        event.preventDefault();
        finish(true);
      }
    };

    okButton?.addEventListener('click', onOk);
    cancelButton?.addEventListener('click', onCancel);
    root.addEventListener('click', onRootClick);
    document.addEventListener('keydown', onKeydown);

    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');

    if (isPrompt && input) {
      window.setTimeout(() => {
        input.focus();
        input.select();
      }, 0);
    } else {
      window.setTimeout(() => {
        okButton?.focus();
      }, 0);
    }
  });
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadNotes() {
  try {
    const raw = window.localStorage.getItem(NOTES_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveNotes() {
  window.localStorage.setItem(NOTES_KEY, JSON.stringify(notesState));
}

function loadCheckpoints() {
  try {
    const raw = window.localStorage.getItem(CHECKPOINTS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCheckpoints() {
  window.localStorage.setItem(CHECKPOINTS_KEY, JSON.stringify(checkpoints));
}

function loadUIState() {
  try {
    const raw = window.localStorage.getItem(UI_STATE_KEY);
    if (!raw) {
      return { details: {}, taskFilter: 'all', currentPhaseId: null, completionCelebrated: false };
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { details: {}, taskFilter: 'all', currentPhaseId: null, completionCelebrated: false };
    }

    return {
      details: parsed.details && typeof parsed.details === 'object' ? parsed.details : {},
      taskFilter: ['all', 'open', 'done', 'current-phase', 'priority'].includes(parsed.taskFilter) ? parsed.taskFilter : 'all',
      currentPhaseId: typeof parsed.currentPhaseId === 'string' ? parsed.currentPhaseId : null,
    };
  } catch {
    return { details: {}, taskFilter: 'all', currentPhaseId: null, completionCelebrated: false };
  }
}

function saveUIState() {
  window.localStorage.setItem(UI_STATE_KEY, JSON.stringify(uiState));
}

function loadAnalytics() {
  try {
    const raw = window.localStorage.getItem(ANALYTICS_KEY);
    if (!raw) {
      return { daily: {} };
    }

    const parsed = JSON.parse(raw);
    return {
      daily: parsed && parsed.daily && typeof parsed.daily === 'object' ? parsed.daily : {},
    };
  } catch {
    return { daily: {} };
  }
}

function saveAnalytics() {
  window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
}

function loadAutoCheckpointState() {
  try {
    const raw = window.localStorage.getItem(AUTO_CHECKPOINT_KEY);
    if (!raw) {
      return { lastDailyDate: '', lastMilestonePercent: 0 };
    }

    const parsed = JSON.parse(raw);
    return {
      lastDailyDate: typeof parsed?.lastDailyDate === 'string' ? parsed.lastDailyDate : '',
      lastMilestonePercent: Number(parsed?.lastMilestonePercent || 0),
    };
  } catch {
    return { lastDailyDate: '', lastMilestonePercent: 0 };
  }
}

function saveAutoCheckpointState() {
  window.localStorage.setItem(AUTO_CHECKPOINT_KEY, JSON.stringify(autoCheckpointState));
}