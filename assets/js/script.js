document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-mode');
    const body = document.body;
    // Load mode from localStorage
    if (localStorage.getItem('mode') === 'dark') {
        body.classList.add('dark-mode');
        if (toggleBtn) toggleBtn.textContent = 'DARK';
    } else {
        if (toggleBtn) toggleBtn.textContent = 'LIGHT';
    }
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                toggleBtn.textContent = 'DARK';
                localStorage.setItem('mode', 'dark');
            } else {
                toggleBtn.textContent = 'LIGHT';
                localStorage.setItem('mode', 'light');
            }
        });
    }

    // Mouse spotlight effect for dark mode
    const spotlight = document.getElementById('spotlight-cursor');
    document.addEventListener('mousemove', function(e) {
        if (body.classList.contains('dark-mode')) {
            spotlight.style.left = e.clientX + 'px';
            spotlight.style.top = e.clientY + 'px';
            spotlight.style.opacity = 0.7;
        }
    });
    document.addEventListener('mouseleave', function() {
        spotlight.style.opacity = 0;
    });
    document.addEventListener('mouseenter', function() {
        if (body.classList.contains('dark-mode')) {
            spotlight.style.opacity = 0.7;
        }
    });
    const pdfIframe = document.querySelector('#resume-pdf-viewer iframe');
    if (pdfIframe) {
        pdfIframe.addEventListener('mouseenter', function() {
            spotlight.style.opacity = 0;
        });
        pdfIframe.addEventListener('mouseleave', function() {
            if (body.classList.contains('dark-mode')) {
                spotlight.style.opacity = 0.7;
            }
        });
    }

    // Mobile navbar hamburger toggle
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links-wrapper');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });
        // Optional: close menu when clicking outside
        document.addEventListener('click', function(e) {
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

    // Auto-close mobile nav after clicking a link
    const navLinksWrapper = document.getElementById('nav-links-wrapper');
    if (navLinksWrapper) {
        navLinksWrapper.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && navLinksWrapper.classList.contains('open')) {
                navLinksWrapper.classList.remove('open');
                const hamburger = document.getElementById('nav-hamburger');
                if (hamburger) hamburger.setAttribute('aria-expanded', false);
            }
        });
    }
});