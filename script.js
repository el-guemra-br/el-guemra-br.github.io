

window.addEventListener("load", () => {

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

    // ===== HIDE INTRO =====
    setTimeout(() => {
        const intro = document.getElementById("intro");
        const site = document.getElementById("real-site");

        intro.classList.add("smooth-out");

        setTimeout(() => {
            intro.style.display = "none";
            site.style.display = "block";
            initScrollAnimations(); 
            loadGitHubData();
        }, 1000);
    }, 3000);
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
const githubUsername = "el-guemra-br";
const displayedRepos = 3;
const REPO_FETCH_LIMIT = 100;
let repoDisplayExpanded = false;

async function loadGitHubData() {
    const profileCard = document.getElementById("github-profile");
    const repoList = document.getElementById("github-repo-list");
    const repoToggle = document.getElementById("github-repo-toggle");

    if (!profileCard || !repoList) return;

    const profileName = profileCard.querySelector(".github-name");
    const profileUsername = profileCard.querySelector(".github-username");
    const profileBio = profileCard.querySelector(".github-bio");
    const avatar = profileCard.querySelector(".github-avatar");
    const locationEl = document.getElementById("github-location");
    const updatedEl = document.getElementById("github-updated");
    const achievementsEl = document.getElementById("github-achievements");
    const orgsEl = document.getElementById("github-orgs");

    try {
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

        renderGitHubRepos(repoList, repos, repoDisplayExpanded);
        setupRepoToggle(repoToggle, repoList, repos);
    } catch (error) {
        console.error("GitHub data load failed", error);
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
    }
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

    const languageMap = new Map();
    nonForkRepos.forEach(repo => {
        if (!repo.language) return;
        const current = languageMap.get(repo.language) || 0;
        languageMap.set(repo.language, current + 1);
    });

    const topLanguage = [...languageMap.entries()].sort((a, b) => b[1] - a[1])[0];
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
        menuToggle.classList.toggle("active");
        divList.classList.toggle("active");
        menuOverlay.classList.toggle("active");
    });
}

if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        divList.classList.remove("active");
        menuOverlay.classList.remove("active");
    });
}

// Close menu when clicking a nav link
const navLinks = document.querySelectorAll(".ul-list li a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        divList.classList.remove("active");
        menuOverlay.classList.remove("active");
    });
});
