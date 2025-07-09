// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - script running');
    
    // Mobile Navbar Toggle
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('nav-mobile-menu');
    
    if (hamburger && mobileMenu) {
        console.log('Found hamburger and mobile menu');
        hamburger.addEventListener('click', function() {
            console.log('Hamburger clicked');
            mobileMenu.classList.toggle('hidden');
            const spans = hamburger.querySelectorAll('span');
            
            if (!mobileMenu.classList.contains('hidden')) {
                spans[0].classList.add('rotate-45', 'translate-y-1.5');
                spans[1].classList.add('opacity-0');
                spans[2].classList.add('-rotate-45', '-translate-y-1.5');
            } else {
                spans[0].classList.remove('rotate-45', 'translate-y-1.5');
                spans[1].classList.remove('opacity-0');
                spans[2].classList.remove('-rotate-45', '-translate-y-1.5');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const spans = hamburger.querySelectorAll('span');
                spans[0].classList.remove('rotate-45', 'translate-y-1.5');
                spans[1].classList.remove('opacity-0');
                spans[2].classList.remove('-rotate-45', '-translate-y-1.5');
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const spans = hamburger.querySelectorAll('span');
                spans[0].classList.remove('rotate-45', 'translate-y-1.5');
                spans[1].classList.remove('opacity-0');
                spans[2].classList.remove('-rotate-45', '-translate-y-1.5');
            });
        });
    } else {
        console.warn('Hamburger menu elements not found!');
    }
    
    // Fix Certificate Tabs
    const tabButtons = document.querySelectorAll('.cert-tab-btn');
    const tabContents = document.querySelectorAll('.cert-tab-content');
    
    if (tabButtons.length && tabContents.length) {
        console.log('Found certificate tabs:', tabButtons.length, 'buttons,', tabContents.length, 'content areas');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default behavior
                const target = this.getAttribute('data-target');
                console.log('Tab clicked:', target);
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.getElementById(target);
                
                if (targetContent) {
                    targetContent.classList.add('active');
                    console.log('Activated content:', target);
                } else {
                    console.error('Could not find content with ID:', target);
                }
            });
        });
    } else {
        console.warn('Certificate tab elements not found');
    }
    
    // Initialize project galleries
    initProjectGalleries();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize enhanced project cards
    initEnhancedProjectCards();
    
    // Initialize dark mode
    initDarkMode();
    
    // Prevent horizontal scrolling
    preventHorizontalScroll();
});

// Prevent horizontal scrolling
function preventHorizontalScroll() {
    // Prevent horizontal scroll with mouse wheel
    document.addEventListener('wheel', function(e) {
        if (e.shiftKey || e.deltaX !== 0) {
            e.preventDefault();
        }
    }, { passive: false });

    // Prevent horizontal scroll with arrow keys
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
        }
    });

    // Force body to never allow horizontal overflow
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    // Monitor for any elements that might cause horizontal overflow
    const observer = new ResizeObserver(() => {
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
    });
    
    observer.observe(document.body);
}

// Project gallery functionality
function initProjectGalleries() {
    const projectGalleries = document.querySelectorAll('.project-gallery');
    console.log('Found', projectGalleries.length, 'project galleries');
    
    projectGalleries.forEach(gallery => {
        const images = gallery.querySelectorAll('.project-image');
        if (images.length <= 1) return;
        
        // Ensure first image is visible
        images[0].style.opacity = '1';
        images[0].style.zIndex = '2';
        
        for (let i = 1; i < images.length; i++) {
            images[i].style.opacity = '0';
            images[i].style.zIndex = '1';
        }
        
        // Add hover functionality for desktop
        gallery.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                images[0].style.opacity = '0';
                images[1].style.opacity = '1';
                images[1].style.zIndex = '2';
            }
        });
        
        gallery.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                images[0].style.opacity = '1';
                images[0].style.zIndex = '2';
                images[1].style.opacity = '0';
                images[1].style.zIndex = '1';
            }
        });
    });
}

// Scroll animations functionality
function initScrollAnimations() {
    // Elements to observe
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Triggers slightly before the element enters the viewport
    });
    
    // Observe all elements with the animate-on-scroll class
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced project card interactions
function initEnhancedProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // 3D hover effect
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 768) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = (x - centerX) / 15;
            const rotateX = (centerY - y) / 15;
            
            // Apply the transformation
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Dark Mode functionality
function initDarkMode() {
    const toggleBtn = document.getElementById('toggle-mode');
    const toggleMobileBtn = document.getElementById('toggle-mode-mobile');
    const htmlEl = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlEl.classList.add('dark');
    }
    
    // Function to toggle dark mode
    function toggleDarkMode() {
        htmlEl.classList.toggle('dark');
        
        // Save preference to localStorage
        if (htmlEl.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        // Update images based on dark mode
        updateImagesForDarkMode();
    }
    
    // Add click event listeners
    if (toggleBtn) toggleBtn.addEventListener('click', toggleDarkMode);
    if (toggleMobileBtn) toggleMobileBtn.addEventListener('click', toggleDarkMode);
}

// Function to switch between light and dark mode images
function updateImagesForDarkMode() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    // List of images to swap based on dark mode
    const imagesToSwap = document.querySelectorAll('[data-dark-src]');
    
    imagesToSwap.forEach(img => {
        if (isDarkMode) {
            const darkSrc = img.getAttribute('data-dark-src');
            img.setAttribute('data-light-src', img.src);
            img.src = darkSrc;
        } else {
            const lightSrc = img.getAttribute('data-light-src');
            if (lightSrc) {
                img.src = lightSrc;
            }
        }
    });
}