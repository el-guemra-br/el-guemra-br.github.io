

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

