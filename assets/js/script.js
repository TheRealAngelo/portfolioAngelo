// Toggle Dark Mode
const toggleBtn = document.getElementById("toggle-mode");
const body = document.body;

// Load mode from localStorage
if (localStorage.getItem("mode") === "dark") {
  body.classList.add("dark-mode");
  if (toggleBtn) toggleBtn.textContent = "DARK";
} else {
  if (toggleBtn) toggleBtn.textContent = "LIGHT";
}

// Add event listener for toggle button
if (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "DARK";
      localStorage.setItem("mode", "dark");
    } else {
      toggleBtn.textContent = "LIGHT";
      localStorage.setItem("mode", "light");
    }
    updateButtonIcons();
    updateProjectLinkIcons();
  });
}

// Update Resume Button Icons Based on Dark Mode
function updateButtonIcons() {
  const isDarkMode = body.classList.contains("dark-mode");
  const externalIcon = document.querySelector(
    '.resume-btn img[alt="External Link Icon"]'
  );
  const downloadIcon = document.querySelector(
    '.resume-btn img[alt="Download Icon"]'
  );

  if (externalIcon) {
    externalIcon.src = isDarkMode
      ? "assets/pictures/External-Icon-Light.svg"
      : "assets/pictures/External-Icon-Dark.svg";
  }

  if (downloadIcon) {
    downloadIcon.src = isDarkMode
      ? "assets/pictures/Download-Icon-Light.svg"
      : "assets/pictures/Download-Icon-Dark.svg";
  }
}

// Update Project Link Icons Based on Dark Mode
function updateProjectLinkIcons() {
  const isDarkMode = body.classList.contains("dark-mode");
  document.querySelectorAll(".project-link-icon").forEach((icon) => {
    icon.src = isDarkMode
      ? "assets/pictures/Link-Icon-Dark.svg"
      : "assets/pictures/Link-Icon-Light.svg";
  });
}

// Update icons on page load
document.addEventListener("DOMContentLoaded", function () {
  updateButtonIcons();
  updateProjectLinkIcons();
});

// Mouse Spotlight Effect for Dark Mode
const spotlight = document.getElementById("spotlight-cursor");
if (spotlight) {
  document.addEventListener("mousemove", function (e) {
    // Disable spotlight for mobile view
    if (window.innerWidth >= 769 && body.classList.contains("dark-mode")) {
      spotlight.style.left = e.clientX + "px";
      spotlight.style.top = e.clientY + "px";
      spotlight.style.opacity = 0.7;
    } else {
      spotlight.style.opacity = 0; // Hide spotlight in mobile view
    }
  });

  document.addEventListener("mouseleave", function () {
    if (window.innerWidth >= 769) {
      spotlight.style.opacity = 0;
    }
  });

  document.addEventListener("mouseenter", function () {
    if (window.innerWidth >= 769 && body.classList.contains("dark-mode")) {
      spotlight.style.opacity = 0.7;
    }
  });

  // Disable Spotlight Effect When Hovering Over PDF Viewer
  const pdfIframe = document.querySelector("#resume-pdf-viewer iframe");
  if (pdfIframe) {
    pdfIframe.addEventListener("mouseenter", function () {
      spotlight.style.opacity = 0;
    });

    pdfIframe.addEventListener("mouseleave", function () {
      if (window.innerWidth >= 769 && body.classList.contains("dark-mode")) {
        spotlight.style.opacity = 0.7;
      }
    });
  }
}

// Mobile Navbar Hamburger Toggle - FIXED
const hamburger = document.getElementById("nav-hamburger");
const mobileMenu = document.getElementById("nav-mobile-menu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);

    // Animate hamburger lines
    const spans = hamburger.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      mobileMenu.classList.contains("open") &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);

      // Reset hamburger animation
      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
}

// Auto-close mobile menu when clicking links
const mobileLinks = document.querySelectorAll(".nav-mobile-link");
mobileLinks.forEach((link) => {
  link.addEventListener("click", function () {
    if (mobileMenu && mobileMenu.classList.contains("open")) {
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);

      // Reset hamburger animation
      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
});

// Certificates Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
  function setupCarousel(wrapperId, prevBtnId, nextBtnId) {
    const wrapper = document.getElementById(wrapperId);
    const images = wrapper
      ? wrapper.querySelectorAll(".certificate-image")
      : [];
    let currentIndex = 0;

    function updateCarousel() {
      images.forEach((img, idx) => {
        img.style.display = idx === currentIndex ? "block" : "none";
      });
    }

    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (prevBtn && nextBtn && images.length > 0) {
      prevBtn.addEventListener("click", function () {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        updateCarousel();
      });

      nextBtn.addEventListener("click", function () {
        currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        updateCarousel();
      });
      updateCarousel();
    }
  }

  // Setup only the existing carousels
  setupCarousel("cert-wrapper", "cert-prev-btn", "cert-next-btn");
  setupCarousel("badge-wrapper", "badge-prev-btn", "badge-next-btn");
});

document.addEventListener("DOMContentLoaded", function () {
  const certWrapper = document.getElementById("cert-wrapper");
  const certImages = certWrapper
    ? certWrapper.querySelectorAll(".certificate-image")
    : [];

  const badgeWrapper = document.getElementById("badge-wrapper");
  const badgeImages = badgeWrapper
    ? badgeWrapper.querySelectorAll(".certificate-image")
    : [];

  function updateCertificationsDisplay() {
    if (window.innerWidth <= 768) {
      // Mobile view: Show only the first certification
      certImages.forEach((img, index) => {
        img.style.display = index === 0 ? "block" : "none";
      });
    } else {
      // Web view: Show all certifications
      certImages.forEach((img) => {
        img.style.display = "block";
      });
    }
  }

  function updateBadgesDisplay() {
    if (window.innerWidth <= 768) {
      // Mobile view: Show only the first badge
      badgeImages.forEach((img, index) => {
        img.style.display = index === 0 ? "block" : "none";
      });
    } else {
      // Web view: Show all badges
      badgeImages.forEach((img) => {
        img.style.display = "block";
      });
    }
  }

  // Update display on page load and when resizing the window
  updateCertificationsDisplay();
  updateBadgesDisplay();
  window.addEventListener("resize", () => {
    updateCertificationsDisplay();
    updateBadgesDisplay();
  });
});

// Smooth Scrolling for Navbar Links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        if (targetId === "login" || window.location.hash === "#login") {
          targetElement.scrollIntoView({ behavior: "auto" });
        } else {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});

// Highlight Active Navbar Link
document.addEventListener("DOMContentLoaded", function () {
  const sections = ["about", "resume", "certification", "projects", "contact"];
  const navLinks = document.querySelectorAll(".nav-links a");

  function setActiveNav() {
    let current = "";
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollY < 10) {
      current = "about";
    } else if (scrollY + windowHeight >= docHeight - 10) {
      current = "contact";
    } else {
      let minDiff = Infinity;
      sections.forEach((id) => {
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

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  }

  window.addEventListener("scroll", setActiveNav);
  window.addEventListener("resize", setActiveNav);
  setActiveNav();
});

document.addEventListener("DOMContentLoaded", function () {
  const btnUp = document.getElementById("btn-up");
  const btnHome = document.getElementById("btn-home");
  const btnDown = document.getElementById("btn-down");

  // Define the sections to navigate between
  const sections = ["about", "resume", "certification", "projects", "contact"];

  // Helper function to get the current section
  function getCurrentSection() {
    let current = "";
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    sections.forEach((id) => {
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

  // Scroll Up Button - Simple fix
  if (btnUp) {
    btnUp.addEventListener("click", function () {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // If at bottom of page, go to projects section
      if (scrollY + windowHeight >= docHeight - 50) {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      // Normal section-based navigation
      const currentSection = getCurrentSection();
      const currentIndex = sections.indexOf(currentSection);

      if (currentIndex > 0) {
        const previousSection = document.getElementById(
          sections[currentIndex - 1]
        );
        if (previousSection) {
          previousSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // Go Home Button
  if (btnHome) {
    btnHome.addEventListener("click", function () {
      const homeSection = document.getElementById("about");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Scroll Down Button
  if (btnDown) {
    btnDown.addEventListener("click", function () {
      const currentSection = getCurrentSection();
      const currentIndex = sections.indexOf(currentSection);

      if (currentIndex < sections.length - 1) {
        const nextSection = document.getElementById(sections[currentIndex + 1]);
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }
});

// Add scroll animations
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".scroll-animation");
  animatedElements.forEach((el) => observer.observe(el));
});

// Lock user in login area until they interact - Updated with refresh reset to login
document.addEventListener("DOMContentLoaded", function () {
  const loginContainer = document.getElementById("login");
  let loginCompleted = false;

  // Prevent all scrolling initially
  function lockScroll() {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    // Prevent scroll events
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventScrollKeys, { passive: false });

    loginCompleted = false;
  }

  function unlockScroll() {
    document.body.style.overflow = "";
    document.body.style.height = "";
    document.documentElement.style.overflow = "";

    // Remove all scroll prevention event listeners
    window.removeEventListener("wheel", preventDefault);
    window.removeEventListener("touchmove", preventDefault);
    window.removeEventListener("keydown", preventScrollKeys);

    console.log("Scroll completely unlocked");

    loginCompleted = true;
  }

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventScrollKeys(e) {
    const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
    if (keys.includes(e.keyCode)) {
      e.preventDefault();
    }
  }

  // Reset to login section on page load/refresh
  function resetToLogin() {
    // Force scroll to login section immediately
    if (loginContainer) {
      loginContainer.scrollIntoView({ behavior: "auto" }); // Use 'auto' for instant scroll
    }

    // Alternative: Force scroll to top
    window.scrollTo(0, 0);

    // Lock scroll after positioning
    setTimeout(() => {
      lockScroll();
    }, 50);
  }

  // Always reset to login on page load/refresh
  resetToLogin();

  // Unlock scroll when user clicks "Sign In" button
  const signInButton = document.querySelector(".login-btn");
  if (signInButton) {
    signInButton.addEventListener("click", function () {
      unlockScroll();
    });
  }

  // Handle logout button - reset scroll lock when pressed
  const logoutButton = document.querySelector(".nav-logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();

      const loginSection = document.getElementById("login");
      if (loginSection) {
        loginSection.scrollIntoView({ behavior: "auto" });

        setTimeout(() => {
          lockScroll();
        }, 800);
      }
    });
  }

  // Handle browser refresh detection
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    console.log("Page refreshed - returning to login");
    resetToLogin();
  }

  // Handle page show event (covers refresh, back/forward)
  window.addEventListener("pageshow", function (event) {
    if (
      event.persisted ||
      performance.navigation.type === performance.navigation.TYPE_RELOAD
    ) {
      console.log("Page reloaded or restored - returning to login");
      resetToLogin();
    }
  });

  // Clear any stored states on page unload
  window.addEventListener("beforeunload", function () {
    sessionStorage.clear();
    localStorage.removeItem("scrollPosition");
  });
});

// Force immediate return to login on any page load
(function () {
  // Execute immediately, before DOM loads
  window.scrollTo(0, 0);

  // Override any stored scroll position
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // Force hash to login
  if (window.location.hash && window.location.hash !== "#login") {
    window.location.hash = "#login";
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  // Force scroll to login section again after DOM loads
  const loginContainer = document.getElementById("login");
  if (loginContainer) {
    window.scrollTo(0, 0);
    loginContainer.scrollIntoView({ behavior: "auto" });
  }

  // Then apply scroll lock
  setTimeout(() => {
    lockScroll();
  }, 100);
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollUpBtn = document.getElementById("scrollUpBtn");
  const scrollDownBtn = document.getElementById("scrollDownBtn");
  const btnUp = document.getElementById("btn-up");
  const btnDown = document.getElementById("btn-down");
  const btnHome = document.getElementById("btn-home");
  const sections = [
    "login",
    "about",
    "resume",
    "certification",
    "projects",
    "contact",
  ];

  // About section scroll restriction variables
  const aboutSection = document.getElementById("about");
  let hasReachedAbout = false;
  let isScrollingProgrammatically = false;

  function getCurrentSection() {
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          return sections[i];
        }
      }
    }
    return sections[0];
  }

  function updateButtonVisibility() {
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Check if user has reached about section for restriction
    checkAboutReached();

    // Show/hide btnUp - only hide if trying to go to login
    if (btnUp) {
      if (currentIndex > 0) {
        // Only hide if user reached about AND trying to go to login
        if (
          hasReachedAbout &&
          currentIndex === 1 &&
          sections[currentIndex - 1] === "login"
        ) {
          btnUp.style.display = "none";
        } else {
          btnUp.style.display = "block";
        }
      } else {
        btnUp.style.display = "none";
      }
    }

    // Show/hide btnDown - always allow going down
    if (btnDown) {
      if (scrollY + windowHeight >= docHeight - 50) {
        btnDown.style.display = "none";
      } else {
        btnDown.style.display = "block";
      }
    }
  }

  // About section restriction functions
  function checkAboutReached() {
    if (!aboutSection) return;

    const aboutRect = aboutSection.getBoundingClientRect();

    // Check if about section is in view
    if (aboutRect.top <= window.innerHeight / 2 && aboutRect.bottom >= 0) {
      hasReachedAbout = true;
    }
  }

  function preventScrollToLogin() {
    if (!hasReachedAbout || isScrollingProgrammatically || !aboutSection)
      return;

    const aboutRect = aboutSection.getBoundingClientRect();
    const loginSection = document.getElementById("login");

    // Only prevent if user is trying to scroll TO login section
    if (loginSection) {
      const loginRect = loginSection.getBoundingClientRect();

      // If login section is becoming visible (user scrolling up to it)
      if (loginRect.bottom > 0 && aboutRect.top > window.innerHeight / 2) {
        isScrollingProgrammatically = true;
        aboutSection.scrollIntoView({ behavior: "auto" });
        setTimeout(() => {
          isScrollingProgrammatically = false;
        }, 100);
      }
    }
  }

  // Function to reset all states (for logout)
  function resetScrollRestriction() {
    hasReachedAbout = false;
    isScrollingProgrammatically = false;
    console.log(
      "Scroll restrictions reset - user can access all sections again"
    );
  }

  // Scroll event handlers
  window.addEventListener("scroll", function () {
    updateButtonVisibility();
    preventScrollToLogin();
  });

  // btnUp functionality - Fixed to allow navigation between non-login sections
  if (btnUp) {
    btnUp.addEventListener("click", function () {
      const currentSection = getCurrentSection();
      const currentIndex = sections.indexOf(currentSection);

      if (currentIndex > 0) {
        const targetSection = sections[currentIndex - 1];

        // Only prevent if trying to go to login after reaching about
        if (hasReachedAbout && targetSection === "login") {
          return; // Don't scroll to login
        }

        const previousSection = document.getElementById(targetSection);
        if (previousSection) {
          previousSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // Go Home Button - Modified to go to about instead of login when restricted
  if (btnHome) {
    btnHome.addEventListener("click", function () {
      // If user hasn't reached about yet, go to login
      if (!hasReachedAbout) {
        const loginSection = document.getElementById("login");
        if (loginSection) {
          loginSection.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If restriction is active, go to about
        const homeSection = document.getElementById("about");
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // btnDown functionality - Always allow going down
  if (btnDown) {
    btnDown.addEventListener("click", function () {
      const currentSection = getCurrentSection();
      const currentIndex = sections.indexOf(currentSection);

      if (currentIndex < sections.length - 1) {
        const nextSection = document.getElementById(sections[currentIndex + 1]);
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // Modified wheel and touch event handler - only prevent going to login
  function handleRestrictedScroll(e) {
    if (!hasReachedAbout || !aboutSection) return;

    const loginSection = document.getElementById("login");
    if (!loginSection) return;

    const loginRect = loginSection.getBoundingClientRect();
    const aboutRect = aboutSection.getBoundingClientRect();

    // Only prevent if login section is becoming visible
    if (loginRect.bottom > 0 && aboutRect.top > window.innerHeight / 2) {
      e.preventDefault();
      isScrollingProgrammatically = true;
      aboutSection.scrollIntoView({ behavior: "auto" });
      setTimeout(() => {
        isScrollingProgrammatically = false;
      }, 100);
    }
  }

  // Add wheel and touch event listeners with less aggressive prevention
  window.addEventListener("wheel", handleRestrictedScroll, { passive: false });
  window.addEventListener("touchmove", handleRestrictedScroll, {
    passive: false,
  });

  // Handle keyboard navigation - only prevent going to login
  window.addEventListener("keydown", function (e) {
    if (!hasReachedAbout || !aboutSection) return;

    const scrollKeys = [33, 36, 38]; // Page Up, Home, Arrow Up
    if (scrollKeys.includes(e.keyCode)) {
      const loginSection = document.getElementById("login");
      if (loginSection) {
        const loginRect = loginSection.getBoundingClientRect();
        const aboutRect = aboutSection.getBoundingClientRect();

        // Only prevent if it would show login section
        if (loginRect.bottom > 0 && aboutRect.top > window.innerHeight / 2) {
          e.preventDefault();
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });

  // Navigation menu functionality - Fixed to allow navigation between allowed sections
  const navLinks = document.querySelectorAll(
    'nav a[href^="#"], .nav-mobile-links a[href^="#"]'
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);

      // Only prevent if trying to go to login after reaching about
      if (hasReachedAbout && targetId === "login") {
        e.preventDefault();
        return;
      }

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // LOGOUT BUTTON FUNCTIONALITY - FIXED
  const logoutButton = document.querySelector(".nav-logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent multiple triggers

      console.log("Logout button clicked - resetting to login section");

      // First, unlock any existing scroll locks
      unlockScroll();

      // Reset scroll restriction state
      resetScrollRestriction();

      // Force scroll to top/login section immediately
      isScrollingProgrammatically = true;
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Apply scroll lock after navigation completes
      setTimeout(() => {
        lockScroll();
        isScrollingProgrammatically = false;
        console.log("Scroll locked - user back at login");
      }, 1000);

      // Update button visibility
      setTimeout(() => {
        updateButtonVisibility();
      }, 100);
    });
  }

  // Initialize on page load
  updateButtonVisibility();
  checkAboutReached();

  // Scroll lock functionality for login section
  let isScrollLocked = false;

  function lockScroll() {
    isScrollLocked = true;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Add event listeners to prevent scrolling
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventScrollKeys, false);

    console.log("Scroll locked");
  }

  function unlockScroll() {
    isScrollLocked = false;
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // Remove all scroll prevention event listeners
    window.removeEventListener("wheel", preventDefault);
    window.removeEventListener("touchmove", preventDefault);
    window.removeEventListener("keydown", preventScrollKeys);

    console.log("Scroll completely unlocked");
  }

  function preventDefault(e) {
    if (isScrollLocked && !isScrollingProgrammatically) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function preventScrollKeys(e) {
    if (isScrollLocked && !isScrollingProgrammatically) {
      const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // Space, Page Up/Down, End, Home, Arrow keys
      if (scrollKeys.includes(e.keyCode)) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }

  // Unlock scroll when user clicks "Sign In" button
  const signInButton = document.querySelector(".login-btn");
  if (signInButton) {
    signInButton.addEventListener("click", function () {
      unlockScroll();
      console.log("Sign in clicked - scroll unlocked");
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const showPassword = document.getElementById("show-password");
  const passwordInput = document.getElementById("login-password");
  if (showPassword && passwordInput) {
    showPassword.addEventListener("change", function () {
      passwordInput.type = this.checked ? "text" : "password";
    });
  }
});

// About section animation restart functionality
function restartAboutAnimations() {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;
  
  // Get all animated elements in about section
  const animatedElements = aboutSection.querySelectorAll('.scroll-animation');
  
  // Remove visible class to reset animations
  animatedElements.forEach(element => {
      element.classList.remove('visible');
      // Force reflow
      element.offsetHeight;
  });
  
  // Re-add visible class with staggered timing
  setTimeout(() => {
      animatedElements.forEach((element, index) => {
          setTimeout(() => {
              element.classList.add('visible');
          }, index * 150); // 150ms delay between each element
      });
  }, 100);
}

// Enhanced Intersection Observer for about section
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          // Add small delay to ensure section is fully visible
          setTimeout(() => {
              restartAboutAnimations();
          }, 200);
      }
  });
}, {
  threshold: 0.3, // Trigger when 30% of about section is visible
  rootMargin: '-50px 0px -50px 0px'
});

// Observe the about section
const aboutSection = document.getElementById('about');
if (aboutSection) {
  aboutObserver.observe(aboutSection);
}
