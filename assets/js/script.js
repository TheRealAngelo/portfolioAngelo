// Toggle Dark Mode
const toggleBtn = document.getElementById('toggle-mode');
const body = document.body;

// Load mode from localStorage
if (localStorage.getItem('mode') === 'dark') {
    body.classList.add('dark-mode');
    if (toggleBtn) toggleBtn.textContent = 'DARK';
} else {
    if (toggleBtn) toggleBtn.textContent = 'LIGHT';
}

// Add event listener for toggle button
if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            toggleBtn.textContent = 'DARK';
            localStorage.setItem('mode', 'dark');
        } else {
            toggleBtn.textContent = 'LIGHT';
            localStorage.setItem('mode', 'light');
        }
        updateButtonIcons();
        updateProjectLinkIcons();
    });
}

// Update Resume Button Icons Based on Dark Mode
function updateButtonIcons() {
    const isDarkMode = body.classList.contains('dark-mode');
    const externalIcon = document.querySelector('.resume-btn img[alt="External Link Icon"]');
    const downloadIcon = document.querySelector('.resume-btn img[alt="Download Icon"]');

    if (externalIcon) {
        externalIcon.src = isDarkMode
            ? 'assets/pictures/External-Icon-Light.svg'
            : 'assets/pictures/External-Icon-Dark.svg';
    }

    if (downloadIcon) {
        downloadIcon.src = isDarkMode
            ? 'assets/pictures/Download-Icon-Light.svg'
            : 'assets/pictures/Download-Icon-Dark.svg';
    }
}

// Update Project Link Icons Based on Dark Mode
function updateProjectLinkIcons() {
    const isDarkMode = body.classList.contains('dark-mode');
    document.querySelectorAll('.project-link-icon').forEach(icon => {
        icon.src = isDarkMode
            ? 'assets/pictures/Link-Icon-Dark.svg'
            : 'assets/pictures/Link-Icon-Light.svg';
    });
}

// Update icons on page load
document.addEventListener('DOMContentLoaded', function () {
    updateButtonIcons();
    updateProjectLinkIcons();
});

// Mouse Spotlight Effect for Dark Mode
const spotlight = document.getElementById('spotlight-cursor');
if (spotlight) {
    document.addEventListener('mousemove', function (e) {
        // Disable spotlight for mobile view
        if (window.innerWidth >= 769 && body.classList.contains('dark-mode')) {
            spotlight.style.left = e.clientX + 'px';
            spotlight.style.top = e.clientY + 'px';
            spotlight.style.opacity = 0.7;
        } else {
            spotlight.style.opacity = 0; // Hide spotlight in mobile view
        }
    });

    document.addEventListener('mouseleave', function () {
        if (window.innerWidth >= 769) {
            spotlight.style.opacity = 0;
        }
    });

    document.addEventListener('mouseenter', function () {
        if (window.innerWidth >= 769 && body.classList.contains('dark-mode')) {
            spotlight.style.opacity = 0.7;
        }
    });

    // Disable Spotlight Effect When Hovering Over PDF Viewer
    const pdfIframe = document.querySelector('#resume-pdf-viewer iframe');
    if (pdfIframe) {
        pdfIframe.addEventListener('mouseenter', function () {
            spotlight.style.opacity = 0;
        });

        pdfIframe.addEventListener('mouseleave', function () {
            if (window.innerWidth >= 769 && body.classList.contains('dark-mode')) {
                spotlight.style.opacity = 0.7;
            }
        });
    }
}

// Mobile Navbar Hamburger Toggle
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links-wrapper');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (
            navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            navLinks.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
        }
    });
}

// Auto-Close Mobile Nav After Clicking a Link
const navLinksWrapper = document.getElementById('nav-links-wrapper');
if (navLinksWrapper) {
    navLinksWrapper.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && navLinksWrapper.classList.contains('open')) {
            navLinksWrapper.classList.remove('open');
            const hamburger = document.getElementById('nav-hamburger');
            if (hamburger) hamburger.setAttribute('aria-expanded', false);
        }
    });
}

// Certificates Carousel Functionality
document.addEventListener('DOMContentLoaded', function () {
    function setupCarousel(wrapperId, prevBtnId, nextBtnId) {
        const wrapper = document.getElementById(wrapperId);
        const images = wrapper ? wrapper.querySelectorAll('.certificate-image') : [];
        let currentIndex = 0;

        function updateCarousel() {
            images.forEach((img, idx) => {
                img.style.display = (idx === currentIndex) ? 'block' : 'none';
            });
        }

        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        if (prevBtn && nextBtn && images.length > 0) {
            prevBtn.addEventListener('click', function () {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
                updateCarousel();
            });

            nextBtn.addEventListener('click', function () {
                currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });
            updateCarousel();
        }
    }

    // Setup carousels with new IDs
    setupCarousel('cert-wrapper', 'cert-prev-btn', 'cert-next-btn');
    setupCarousel('badge-wrapper', 'badge-prev-btn', 'badge-next-btn');
});

document.addEventListener('DOMContentLoaded', function () {
    const certWrapper = document.getElementById('cert-wrapper');
    const certImages = certWrapper ? certWrapper.querySelectorAll('.certificate-image') : [];

    const badgeWrapper = document.getElementById('badge-wrapper');
    const badgeImages = badgeWrapper ? badgeWrapper.querySelectorAll('.certificate-image') : [];

    function updateCertificationsDisplay() {
        if (window.innerWidth <= 768) {
            // Mobile view: Show only the first certification
            certImages.forEach((img, index) => {
                img.style.display = index === 0 ? 'block' : 'none';
            });
        } else {
            // Web view: Show all certifications
            certImages.forEach(img => {
                img.style.display = 'block';
            });
        }
    }

    function updateBadgesDisplay() {
        if (window.innerWidth <= 768) {
            // Mobile view: Show only the first badge
            badgeImages.forEach((img, index) => {
                img.style.display = index === 0 ? 'block' : 'none';
            });
        } else {
            // Web view: Show all badges
            badgeImages.forEach(img => {
                img.style.display = 'block';
            });
        }
    }

    // Update display on page load and when resizing the window
    updateCertificationsDisplay();
    updateBadgesDisplay();
    window.addEventListener('resize', () => {
        updateCertificationsDisplay();
        updateBadgesDisplay();
    });
});

// Smooth Scrolling for Navbar Links
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                if (targetId === 'login' || window.location.hash === '#login') {
                    targetElement.scrollIntoView({ behavior: 'auto' });
                } else {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Highlight Active Navbar Link
document.addEventListener('DOMContentLoaded', function () {
    const sections = ['about', 'resume', 'certification', 'projects', 'contact'];
    const navLinks = document.querySelectorAll('.nav-links a');

    function setActiveNav() {
        let current = '';
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        if (scrollY < 10) {
            current = 'about';
        } else if (scrollY + windowHeight >= docHeight - 10) {
            current = 'contact';
        } else {
            let minDiff = Infinity;
            sections.forEach(id => {
                const section = document.getElementById(id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const diff = Math.abs(rect.top);
                    if (rect.top <= windowHeight / 2 && diff < minDiff) {
                        minDiff = diff;
                        current = id;
                    }
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener('scroll', setActiveNav);
    window.addEventListener('resize', setActiveNav);
    setActiveNav();
});

document.addEventListener('DOMContentLoaded', function () {
    const btnUp = document.getElementById('btn-up');
    const btnHome = document.getElementById('btn-home');
    const btnDown = document.getElementById('btn-down');

    // Define the sections to navigate between
    const sections = ['about', 'resume', 'certification', 'projects', 'contact'];

    // Helper function to get the current section
    function getCurrentSection() {
        let current = '';
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                    current = id;
                }
            }
        });

        return current;
    }

    // Scroll Up Button
    if (btnUp) {
        btnUp.addEventListener('click', function () {
            const currentSection = getCurrentSection();
            const currentIndex = sections.indexOf(currentSection);

            if (currentIndex > 0) {
                const previousSection = document.getElementById(sections[currentIndex - 1]);
                if (previousSection) {
                    previousSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Go Home Button
    if (btnHome) {
        btnHome.addEventListener('click', function () {
            const homeSection = document.getElementById('about');
            if (homeSection) {
                homeSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Scroll Down Button
    if (btnDown) {
        btnDown.addEventListener('click', function () {
            const currentSection = getCurrentSection();
            const currentIndex = sections.indexOf(currentSection);

            if (currentIndex < sections.length - 1) {
                const nextSection = document.getElementById(sections[currentIndex + 1]);
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
});
