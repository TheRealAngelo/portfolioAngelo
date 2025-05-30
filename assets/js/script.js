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
    });
}

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

    // Optional: Close menu when clicking outside
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
    const wrapper = document.querySelector('.certificates-wrapper');
    const images = document.querySelectorAll('.certificate-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100; // Move by 100% for each image
        wrapper.style.transform = `translateX(${offset}%)`;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            updateCarousel();
        });

        nextBtn.addEventListener('click', function () {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
    }

    updateCarousel();
});