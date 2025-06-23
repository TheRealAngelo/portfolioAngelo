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
});

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