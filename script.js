
const INTRO_SEEN_KEY = "intro-seen";
const LAST_SCROLL_KEY = "last-scroll-y";
const INTRO_AUTO_HIDE_MS = 1500;
const INTRO_EXIT_MS = 450;

function setSessionValue(key, value) {
    try {
        sessionStorage.setItem(key, value);
    } catch (error) {
        // Ignore storage errors (private mode/restricted storage)
    }
}

function getSessionValue(key) {
    try {
        return sessionStorage.getItem(key);
    } catch (error) {
        return null;
    }
}

function saveScrollPosition() {
    setSessionValue(LAST_SCROLL_KEY, String(window.scrollY || 0));
}

function restoreScrollPosition() {
    const savedValue = Number(getSessionValue(LAST_SCROLL_KEY));

    if (!Number.isFinite(savedValue) || savedValue < 0) return;

    window.scrollTo({
        top: savedValue,
        left: 0,
        behavior: "auto"
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro");
    const site = document.getElementById("real-site");

    if (!intro || !site) return;

    const showSite = () => {
        intro.style.display = "none";
        document.body.classList.remove("intro-lock");
        site.style.display = "block";
        initScrollAnimations();
        scheduleGitHubLoad();

        requestAnimationFrame(() => {
            restoreScrollPosition();
        });
    };

    const introSeen = getSessionValue(INTRO_SEEN_KEY) === "1";

    if (introSeen) {
        showSite();
        return;
    }

    document.body.classList.add("intro-lock");

    const animations = [
        { selector: ".top-tags", class: "from-top", delay: 0 },
        { selector: ".left h1", class: "from-left", delay: 0.3 },
        { selector: ".desc", class: "from-left", delay: 0.6 },
        { selector: ".live-line", class: "from-bottom", delay: 0.9 },
        { selector: ".buttons", class: "zoom-in", delay: 1.2 },
        { selector: ".site-link", class: "from-bottom", delay: 1.5 },
        { selector: ".right", class: "from-right", delay: 0.6 },
        { selector: ".stats", class: "from-bottom", delay: 1.8 },
    ];

    animations.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
            el.style.animationDelay = `${item.delay}s`;
            el.classList.add(item.class);
        }
    });

    let introDismissed = false;
    let autoHideTimer = null;

    const finishIntro = () => {
        if (introDismissed) return;
        introDismissed = true;

        if (autoHideTimer) {
            clearTimeout(autoHideTimer);
        }
        intro.removeEventListener("pointerdown", skipIntro);
        document.removeEventListener("keydown", skipOnKeydown);
        setSessionValue(INTRO_SEEN_KEY, "1");

        intro.classList.add("smooth-out");

        setTimeout(() => {
            showSite();
        }, INTRO_EXIT_MS);
    };

    const skipIntro = () => {
        finishIntro();
    };

    const skipOnKeydown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            skipIntro();
        }
    };

    intro.addEventListener("pointerdown", skipIntro);
    document.addEventListener("keydown", skipOnKeydown);

    // ===== AUTO HIDE INTRO =====
    autoHideTimer = setTimeout(() => {
        finishIntro();
    }, INTRO_AUTO_HIDE_MS);
});


// ===============================
// SCROLL REVEAL (SECTIONS)
// ===============================
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        ".slide-in-left, .slide-in-right, .slide-in-up"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translate(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
}


// ===============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".ul-list li");

window.addEventListener("scroll", () => {
    saveScrollPosition();

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");

        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

window.addEventListener("pagehide", saveScrollPosition);
window.addEventListener("beforeunload", saveScrollPosition);
window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;

    requestAnimationFrame(() => {
        restoreScrollPosition();
    });
});

// ===============================
// FORMSPREE FORM HANDLING
// ===============================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://formspree.io/f/mojkapkp", {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success popup
                showPopup("success");
                contactForm.reset();
            } else {
                showPopup("error");
            }
        } catch (error) {
            showPopup("error");
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Popup function
function showPopup(type) {
    // Remove existing popup if any
    const existingPopup = document.querySelector(".popup-message");
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement("div");
    popup.className = "popup-message";
    
    if (type === "success") {
        popup.innerHTML = `
            <div class="popup-content popup-success">
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
                <button onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
    } else {
        popup.innerHTML = `
            <div class="popup-content popup-error">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Oops!</h3>
                <p>Something went wrong. Please try again.</p>
                <button onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
    }

    document.body.appendChild(popup);
    
    // Add popup styles dynamically
    const style = document.createElement("style");
    style.textContent = `
        .popup-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .popup-content {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 80, 120, 0.3);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            max-width: 400px;
            animation: scaleIn 0.3s ease;
        }
        .popup-success {
            border-color: rgba(124, 255, 178, 0.5);
        }
        .popup-error {
            border-color: rgba(255, 77, 109, 0.5);
        }
        .popup-content i {
            font-size: 60px;
            margin-bottom: 20px;
        }
        .popup-success i {
            color: #7cffb2;
            text-shadow: 0 0 30px rgba(124, 255, 178, 0.6);
        }
        .popup-error i {
            color: #ff4d6d;
            text-shadow: 0 0 30px rgba(255, 77, 109, 0.6);
        }
        .popup-content h3 {
            color: #fff;
            margin-bottom: 10px;
            font-size: 24px;
        }
        .popup-content p {
            color: #b8b8b8;
            margin-bottom: 25px;
        }
        .popup-content button {
            background: linear-gradient(135deg, #ff4d6d, #7a0c2e);
            color: #fff;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: 0.3s;
        }
        .popup-content button:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 20px rgba(255, 80, 120, 0.6);
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        popup.remove();
    }, 5000);
}

// ===============================
// GITHUB DATA
// ===============================
let githubDataStarted = false;

function startGitHubDataOnce() {
    if (githubDataStarted) return;
    githubDataStarted = true;
    loadGitHubData();
}

function scheduleGitHubLoad() {
    const githubSection = document.getElementById("github");

    if (!githubSection) {
        startGitHubDataOnce();
        return;
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                startGitHubDataOnce();
            });
        }, {
            rootMargin: "200px 0px",
            threshold: 0.15
        });

        observer.observe(githubSection);
    }

    if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
            startGitHubDataOnce();
        }, { timeout: 3000 });
    } else {
        setTimeout(() => {
            startGitHubDataOnce();
        }, 3000);
    }
}

const githubUsername = "el-guemra-br";
const displayedRepos = 3;
const REPO_FETCH_LIMIT = 100;
const GITHUB_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const GITHUB_CACHE_KEY = `github-data-cache-${githubUsername}`;
let repoDisplayExpanded = false;
let githubLanguagesChart = null;

async function loadGitHubData(forceRefresh = false) {
    const profileCard = document.getElementById("github-profile");
    const repoList = document.getElementById("github-repo-list");
    const repoToggle = document.getElementById("github-repo-toggle");
    const languagesEmpty = document.getElementById("github-languages-empty");
    const languagesSync = document.getElementById("github-languages-sync");
    const languagesRefreshBtn = document.getElementById("github-languages-refresh");

    if (!profileCard || !repoList) return;

    const profileName = profileCard.querySelector(".github-name");
    const profileUsername = profileCard.querySelector(".github-username");
    const profileBio = profileCard.querySelector(".github-bio");
    const avatar = profileCard.querySelector(".github-avatar");
    const locationEl = document.getElementById("github-location");
    const updatedEl = document.getElementById("github-updated");
    const achievementsEl = document.getElementById("github-achievements");
    const orgsEl = document.getElementById("github-orgs");
    const cachedData = readGitHubCache();

    if (languagesRefreshBtn && languagesRefreshBtn.dataset.bound !== "true") {
        languagesRefreshBtn.dataset.bound = "true";
        languagesRefreshBtn.addEventListener("click", async () => {
            const originalText = languagesRefreshBtn.textContent;
            languagesRefreshBtn.disabled = true;
            languagesRefreshBtn.textContent = "Refreshing...";
            try {
                await loadGitHubData(true);
            } finally {
                languagesRefreshBtn.disabled = false;
                languagesRefreshBtn.textContent = originalText;
            }
        });
    }

    const applyGitHubData = (user, repos, orgs, detailedLanguageSummary, source = "live", syncedAt = Date.now()) => {
        if (!user || !Array.isArray(repos) || !Array.isArray(orgs)) {
            throw new Error("Invalid GitHub payload");
        }

        if (avatar && user.avatar_url) {
            avatar.src = user.avatar_url;
            avatar.alt = `${user.login} GitHub avatar`;
        }

        if (profileName) profileName.textContent = user.name || user.login;
        if (profileUsername) {
            profileUsername.textContent = `@${user.login}`;
            profileUsername.href = user.html_url;
        }

        if (profileBio) {
            profileBio.textContent =
                user.bio || "Frontend developer sharing experiments and client work.";
        }

        const reposCount = document.getElementById("github-repos-count");
        const followers = document.getElementById("github-followers");
        const following = document.getElementById("github-following");
        const gists = document.getElementById("github-gists");

        if (reposCount) reposCount.textContent = user.public_repos ?? "0";
        if (followers) followers.textContent = user.followers ?? "0";
        if (following) following.textContent = user.following ?? "0";
        if (gists) gists.textContent = user.public_gists ?? "0";

        if (locationEl) {
            locationEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${
                user.location || "Worldwide"
            }`;
        }

        if (updatedEl) {
            updatedEl.innerHTML = `<i class="fa-regular fa-clock"></i> Active ${formatRelativeDate(
                user.updated_at
            )}`;
        }

        renderGitHubAchievements(achievementsEl, user, repos);
        renderGitHubOrganizations(orgsEl, orgs);

        const hasDetailedData =
            detailedLanguageSummary &&
            detailedLanguageSummary.totals &&
            Object.keys(detailedLanguageSummary.totals).length > 0;

        const languageStats = hasDetailedData
            ? detailedLanguageSummary.totals
            : aggregateLanguageStatsFromRepos(repos);

        if (languagesEmpty) {
            const languageCount = Object.keys(languageStats).length;
            if (!languageCount) {
                languagesEmpty.textContent = "No language data found in public repositories.";
            } else if (hasDetailedData) {
                const sourceText = source === "cache" ? "cached" : "fresh";
                languagesEmpty.textContent = `Showing top 6 languages from ${detailedLanguageSummary.successfulRepos}/${detailedLanguageSummary.totalRepos} repositories (${sourceText}, updates every 24h).`;
            } else {
                languagesEmpty.textContent = "Showing top 6 languages from repository primary language metadata (updates every 24h).";
            }
        }

        if (languagesSync) {
            const syncSource = source === "cache" ? "cache" : "live";
            languagesSync.textContent = `Last synced: ${formatSyncDate(syncedAt)} (${syncSource})`;
        }

        renderGitHubLanguagesChart(languageStats, hasDetailedData ? "Code bytes" : "Repositories");
        renderGitHubRepos(repoList, repos, repoDisplayExpanded);
        setupRepoToggle(repoToggle, repoList, repos);
    };

    try {
        const hasFreshCache = !forceRefresh && isGitHubCacheFresh(cachedData && cachedData.cachedAt);

        if (hasFreshCache) {
            applyGitHubData(
                cachedData.user,
                cachedData.repos,
                cachedData.orgs,
                cachedData.detailedLanguageSummary || { totals: {}, successfulRepos: 0, totalRepos: 0 },
                "cache",
                cachedData.cachedAt
            );
            return;
        }

        const [userRes, reposRes, orgsRes] = await Promise.all([
            fetch(`https://api.github.com/users/${githubUsername}`),
            fetch(
                `https://api.github.com/users/${githubUsername}/repos?per_page=${REPO_FETCH_LIMIT}&sort=updated`
            ),
            fetch(`https://api.github.com/users/${githubUsername}/orgs?per_page=20`)
        ]);

        if (!userRes.ok || !reposRes.ok || !orgsRes.ok) {
            const failedResponse = !userRes.ok ? userRes : (!reposRes.ok ? reposRes : orgsRes);
            throw new Error(
                `GitHub API request failed: ${failedResponse.status} ${failedResponse.statusText}`
            );
        }

        const user = await userRes.json();
        const repos = await reposRes.json();
        const orgs = await orgsRes.json();
        const detailedLanguageSummary = await aggregateDetailedLanguageStatsFromRepos(repos);

        const syncedAt = Date.now();

        writeGitHubCache({
            cachedAt: syncedAt,
            user,
            repos,
            orgs,
            detailedLanguageSummary
        });

        applyGitHubData(user, repos, orgs, detailedLanguageSummary, "live", syncedAt);
    } catch (error) {
        console.error("GitHub data load failed", error);

        if (cachedData && cachedData.user && cachedData.repos && cachedData.orgs) {
            if (profileBio) {
                profileBio.textContent = "Live fetch failed. Showing cached GitHub data.";
            }

            applyGitHubData(
                cachedData.user,
                cachedData.repos,
                cachedData.orgs,
                cachedData.detailedLanguageSummary || { totals: {}, successfulRepos: 0, totalRepos: 0 },
                "cache",
                cachedData.cachedAt
            );
            return;
        }

        if (profileBio) {
            profileBio.textContent = "Unable to load GitHub info right now.";
        }
        if (achievementsEl) {
            achievementsEl.innerHTML =
                '<span class="achievement-chip">Achievements unavailable right now</span>';
        }
        if (orgsEl) {
            orgsEl.innerHTML = '<span class="org-empty">Organizations unavailable right now.</span>';
        }
        repoList.innerHTML =
            '<p class="repo-error">Unable to load GitHub repositories right now. Please refresh or check your connection.</p>';
        if (repoToggle) {
            repoToggle.style.display = "none";
        }
        if (languagesEmpty) {
            languagesEmpty.textContent = "Language data unavailable right now.";
        }
        if (languagesSync) {
            languagesSync.textContent = "Last synced: unavailable";
        }
        renderGitHubLanguagesChart({});
    }
}

function formatSyncDate(timestamp) {
    const date = new Date(Number(timestamp));
    if (Number.isNaN(date.getTime())) return "unknown";
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

function readGitHubCache() {
    try {
        const cachedRaw = localStorage.getItem(GITHUB_CACHE_KEY);
        if (!cachedRaw) return null;
        return JSON.parse(cachedRaw);
    } catch (error) {
        return null;
    }
}

function writeGitHubCache(payload) {
    try {
        localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify(payload));
    } catch (error) {
        // Ignore cache write failures (private mode/storage limits)
    }
}

function isGitHubCacheFresh(cachedAt) {
    if (!cachedAt || Number.isNaN(Number(cachedAt))) return false;
    return Date.now() - Number(cachedAt) < GITHUB_CACHE_TTL_MS;
}

function aggregateLanguageStatsFromRepos(repos) {
    if (!Array.isArray(repos) || repos.length === 0) return {};

    return repos
        .filter(repo => repo.language)
        .reduce((acc, repo) => {
            const language = repo.language.trim();
            if (!language) return acc;
            acc[language] = (acc[language] || 0) + 1;
            return acc;
        }, {});
}

async function aggregateDetailedLanguageStatsFromRepos(repos) {
    const repoList = Array.isArray(repos)
        ? repos.filter(repo => repo && repo.languages_url)
        : [];

    if (!repoList.length) {
        return {
            totals: {},
            successfulRepos: 0,
            totalRepos: 0
        };
    }

    const responses = await Promise.allSettled(
        repoList.map(repo => fetch(repo.languages_url))
    );

    const totals = {};
    let successfulRepos = 0;

    for (const response of responses) {
        if (response.status !== "fulfilled" || !response.value.ok) continue;

        const payload = await response.value.json();
        if (!payload || typeof payload !== "object") continue;

        successfulRepos += 1;
        Object.entries(payload).forEach(([language, bytes]) => {
            if (!language) return;
            totals[language] = (totals[language] || 0) + Number(bytes || 0);
        });
    }

    return {
        totals,
        successfulRepos,
        totalRepos: repoList.length
    };
}

function renderGitHubLanguagesChart(languageStats, yAxisLabel = "Usage") {
    const canvas = document.getElementById("github-languages-chart");
    const languagesEmpty = document.getElementById("github-languages-empty");
    const maxLanguagesToDisplay = 6;

    if (!canvas) return;

    const entries = Object.entries(languageStats || {}).sort((a, b) => b[1] - a[1]);

    if (!entries.length || typeof Chart === "undefined") {
        if (githubLanguagesChart) {
            githubLanguagesChart.destroy();
            githubLanguagesChart = null;
        }
        if (languagesEmpty && !entries.length) {
            languagesEmpty.textContent = "No language data available for chart.";
        }
        return;
    }

    const maxDirectLanguages = maxLanguagesToDisplay - 1;
    const topEntries = entries.length > maxLanguagesToDisplay
        ? entries.slice(0, maxDirectLanguages)
        : entries.slice(0, maxLanguagesToDisplay);

    if (entries.length > maxLanguagesToDisplay) {
        const otherValue = entries
            .slice(maxDirectLanguages)
            .reduce((sum, [, count]) => sum + Number(count || 0), 0);
        topEntries.push(["Other", otherValue]);
    }

    const labels = topEntries.map(([language]) => language);
    const values = topEntries.map(([, count]) => count);
    const totalValue = values.reduce((sum, value) => sum + Number(value || 0), 0);

    const percentageLabelPlugin = {
        id: "percentageLabelPlugin",
        afterDatasetsDraw(chart) {
            if (!totalValue) return;

            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0);
            const dataset = chart.data.datasets[0];

            ctx.save();
            ctx.fillStyle = "#E7E9EC";
            ctx.font = "12px Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";

            meta.data.forEach((bar, index) => {
                const value = Number(dataset.data[index] || 0);
                const percent = totalValue ? (value / totalValue) * 100 : 0;
                const label = `${percent.toFixed(1)}%`;
                ctx.fillText(label, bar.x, bar.y - 6);
            });

            ctx.restore();
        }
    };

    if (githubLanguagesChart) {
        githubLanguagesChart.destroy();
    }

    githubLanguagesChart = new Chart(canvas, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Repositories",
                    data: values,
                    borderWidth: 1,
                    backgroundColor: "rgba(255, 77, 109, 0.45)",
                    borderColor: "rgba(255, 77, 109, 0.95)"
                }
            ]
        },
        plugins: [percentageLabelPlugin],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: yAxisLabel
                    },
                    ticks: {
                        precision: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label(context) {
                            const rawValue = Number(context.raw || 0);
                            const percent = totalValue ? ((rawValue / totalValue) * 100) : 0;
                            return `${rawValue.toLocaleString()} (${percent.toFixed(1)}%)`;
                        }
                    }
                }
            }
        }
    });

}

function renderGitHubAchievements(target, user, repos) {
    if (!target) return;

    if (!Array.isArray(repos) || repos.length === 0) {
        target.innerHTML = '<span class="achievement-chip">New profile, more to come</span>';
        return;
    }

    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
    const activeSince = user && user.created_at ? new Date(user.created_at).getFullYear() : null;
    const nonForkRepos = repos.filter(repo => !repo.fork);

    const languageMap = aggregateLanguageStatsFromRepos(nonForkRepos);
    const topLanguage = Object.entries(languageMap).sort((a, b) => b[1] - a[1])[0];
    const achievementItems = [
        `${nonForkRepos.length} Public Projects`,
        `${totalStars} Total Stars`,
        `${totalForks} Total Forks`
    ];

    if (activeSince) {
        achievementItems.push(`Active Since ${activeSince}`);
    }

    if (topLanguage && topLanguage[0]) {
        achievementItems.push(`Top Stack: ${topLanguage[0]}`);
    }

    target.innerHTML = "";
    achievementItems.slice(0, 5).forEach(item => {
        const chip = document.createElement("span");
        chip.className = "achievement-chip";
        chip.textContent = item;
        target.appendChild(chip);
    });
}

function renderGitHubOrganizations(target, orgs) {
    if (!target) return;

    if (!Array.isArray(orgs) || orgs.length === 0) {
        target.innerHTML = '<span class="org-empty">No public organizations yet.</span>';
        return;
    }

    target.innerHTML = "";

    orgs.slice(0, 6).forEach(org => {
        const item = document.createElement("a");
        item.className = "org-item";
        item.href = org.html_url;
        item.target = "_blank";
        item.rel = "noreferrer noopener";
        item.innerHTML = `
            <img src="${org.avatar_url}" alt="${org.login} logo">
            <span>${org.login}</span>
        `;
        target.appendChild(item);
    });
}

function getSortedNonForkRepos(repos) {
    if (!Array.isArray(repos)) return [];

    return repos
        .filter(repo => !repo.fork)
        .sort((a, b) => {
            if (a.stargazers_count === b.stargazers_count) {
                return new Date(b.pushed_at) - new Date(a.pushed_at);
            }
            return (b.stargazers_count || 0) - (a.stargazers_count || 0);
        });
}

function renderGitHubRepos(target, repos, showAll = false) {
    if (!Array.isArray(repos) || repos.length === 0) {
        target.innerHTML = '<p class="repo-empty">No public repositories yet.</p>';
        return;
    }

    const sortedRepos = getSortedNonForkRepos(repos);
    const visibleRepos = showAll ? sortedRepos : sortedRepos.slice(0, displayedRepos);

    if (!visibleRepos.length) {
        target.innerHTML = '<p class="repo-empty">No standalone repositories yet.</p>';
        return;
    }

    target.innerHTML = "";

    visibleRepos.forEach(repo => {
        const repoCard = document.createElement("a");
        repoCard.className = "repo-card";
        repoCard.href = repo.html_url;
        repoCard.target = "_blank";
        repoCard.rel = "noreferrer noopener";

        const description = repo.description || "No description provided.";
        const language = repo.language || "Not set";

        repoCard.innerHTML = `
            <div class="repo-title">
                <h4>${repo.name}</h4>
                <span class="repo-stars"><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
            </div>
            <p>${description}</p>
            <div class="repo-meta">
                <span><i class="fa-solid fa-circle"></i> ${language}</span>
                <span><i class="fa-regular fa-clock"></i> Updated ${formatRelativeDate(repo.pushed_at)}</span>
            </div>
        `;

        target.appendChild(repoCard);
    });
}

function setupRepoToggle(button, repoList, repos) {
    if (!button || !repoList) return;

    const sortedRepos = getSortedNonForkRepos(repos);

    if (sortedRepos.length <= displayedRepos) {
        button.style.display = "none";
        return;
    }

    button.style.display = "inline-flex";
    button.textContent = repoDisplayExpanded
        ? "See less"
        : `See more (${sortedRepos.length - displayedRepos})`;

    button.onclick = () => {
        repoDisplayExpanded = !repoDisplayExpanded;
        renderGitHubRepos(repoList, repos, repoDisplayExpanded);
        button.textContent = repoDisplayExpanded
            ? "See less"
            : `See more (${sortedRepos.length - displayedRepos})`;
    };
}

function formatRelativeDate(isoDate) {
    if (!isoDate) return "recently";

    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs < 0) return "in the future";
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;

    let months =
        (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());

    // Adjust for partial months so we don't over-count across month boundaries.
    if (now.getDate() < date.getDate()) {
        months -= 1;
    }

    months = Math.max(months, 1);

    if (months < 12) {
        return `${months} month${months !== 1 ? "s" : ""} ago`;
    }

    let years = now.getFullYear() - date.getFullYear();
    const monthDiff = now.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) {
        years -= 1;
    }

    return `${years} year${years !== 1 ? "s" : ""} ago`;
}

// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 120,
                behavior: "smooth"
            });
        }
    });
});

// ===============================
// MOBILE MENU TOGGLE
// ===============================
const menuToggle = document.getElementById("menu-toggle");
const divList = document.getElementById("div-list");
const menuOverlay = document.getElementById("menu-overlay");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        if (!divList || !menuOverlay) return;
        menuToggle.classList.toggle("active");
        divList.classList.toggle("active");
        menuOverlay.classList.toggle("active");
    });
}

if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
        if (!menuToggle || !divList) return;
        menuToggle.classList.remove("active");
        divList.classList.remove("active");
        menuOverlay.classList.remove("active");
    });
}

const navItemsClickable = document.querySelectorAll(".ul-list li");
navItemsClickable.forEach(item => {
    item.addEventListener("click", (event) => {
        if (event.target.closest("a")) return;
        const link = item.querySelector('a[href^="#"]');
        if (!link) return;
        link.click();
    });
});

// Close menu when clicking a nav link
const navLinks = document.querySelectorAll(".ul-list li a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (!menuToggle || !divList || !menuOverlay) return;
        menuToggle.classList.remove("active");
        divList.classList.remove("active");
        menuOverlay.classList.remove("active");
    });
});
