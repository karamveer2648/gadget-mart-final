/*=============== DAGADGET MART - INTERACTIVE FUNCTIONALITY ===============*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navigation functionality
    initNavigation();
    
    // Scroll effects
    initScrollEffects();
    
    // Section dividers animations
    initSectionDividers();
    
    // Section visibility animations
    initSectionAnimations();
    
    // Back to top button
    initBackToTop();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Interactive button effects
    initButtonEffects();
    
    // Parallax effects
    initParallaxEffects();
    
    // Mobile menu enhancements
    initMobileMenuEnhancements();
    
    // Performance optimizations
    initPerformanceOptimizations();
});

/*=============== NAVIGATION FUNCTIONALITY ===============*/
function initNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Add entrance animation
            navMenu.style.animation = 'slideInRight 0.3s ease-out';
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            closeNavMenu();
        });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show')) {
                closeNavMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            closeNavMenu();
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            closeNavMenu();
        }
    });

    function closeNavMenu() {
        navMenu.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
            navMenu.style.animation = '';
        }, 300);
    }

    // Header scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(28, 28, 30, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(28, 28, 30, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
}

/*=============== SECTION DIVIDERS ANIMATIONS ===============*/
function initSectionDividers() {
    const dividers = document.querySelectorAll('.section-divider');
    
    // Intersection Observer for divider entrance animations
    const dividerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const divider = entry.target;
                divider.style.opacity = '1';
                divider.style.transform = 'translateY(0)';
                
                // Add specific entrance animations based on divider type
                if (divider.classList.contains('section-divider--gradient')) {
                    divider.style.animation = 'gradient-entrance 1s ease-out, gradient-flow 3s ease-in-out infinite 1s';
                } else if (divider.classList.contains('section-divider--dots')) {
                    divider.style.animation = 'dots-entrance 0.8s ease-out';
                } else if (divider.classList.contains('section-divider--lines')) {
                    divider.style.animation = 'lines-entrance 1.2s ease-out';
                } else if (divider.classList.contains('section-divider--geometric')) {
                    divider.style.animation = 'geometric-entrance 1s ease-out';
                } else if (divider.classList.contains('section-divider--particles')) {
                    divider.style.animation = 'particles-entrance 1.5s ease-out';
                } else if (divider.classList.contains('section-divider--pulse')) {
                    divider.style.animation = 'pulse-entrance 1s ease-out';
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '50px'
    });
    
    // Initialize dividers with hidden state
    dividers.forEach(divider => {
        divider.style.opacity = '0';
        divider.style.transform = 'translateY(30px)';
        divider.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        dividerObserver.observe(divider);
    });
    
    // Scroll-based parallax effect for dividers
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        dividers.forEach((divider, index) => {
            const rect = divider.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const parallaxOffset = scrollProgress * 20;
                
                // Apply subtle parallax movement
                divider.style.transform = `translateY(${parallaxOffset - 30}px)`;
            }
        });
    }, { passive: true });
}

/*=============== SECTION VISIBILITY ANIMATIONS ===============*/
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const childElements = entry.target.querySelectorAll('.section__header, .about__feature, .product__card, .brand__card, .testimonial__card, .contact__card');
                childElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/*=============== SCROLL EFFECTS ===============*/
function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    }, { passive: true });

    // Reveal animations for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for multiple cards
                const siblings = entry.target.parentElement.children;
                Array.from(siblings).forEach((sibling, index) => {
                    if (sibling.classList.contains('product__card') || 
                        sibling.classList.contains('brand__card') || 
                        sibling.classList.contains('testimonial__card')) {
                        setTimeout(() => {
                            sibling.style.opacity = '1';
                            sibling.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.product__card, .brand__card, .testimonial__card, .about__feature, .contact__card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/*=============== BACK TO TOP BUTTON ===============*/
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add ripple effect
            createRippleEffect(backToTopBtn);
        });
    }
}

/*=============== SMOOTH SCROLLING ===============*/
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Enhanced smooth scroll with easing
                smoothScrollTo(targetPosition, 1000);
                
                // Trigger divider animations during scroll
                triggerDividerSequence();
            }
        });
    });
}

// Enhanced smooth scroll function with custom easing
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth acceleration/deceleration
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, start + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Easing function
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Trigger divider sequence during navigation
function triggerDividerSequence() {
    const dividers = document.querySelectorAll('.section-divider');
    
    dividers.forEach((divider, index) => {
        setTimeout(() => {
            divider.style.animation = 'divider-highlight 0.8s ease-out';
        }, index * 150);
    });
}

/*=============== BUTTON EFFECTS ===============*/
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
        
        // Hover effect enhancement
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/*=============== RIPPLE EFFECT ===============*/
function createRippleEffect(element, event = null) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    
    let x, y;
    if (event) {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    } else {
        x = rect.width / 2;
        y = rect.height / 2;
    }
    
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/*=============== PARALLAX EFFECTS ===============*/
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }
}

/*=============== MOBILE MENU ENHANCEMENTS ===============*/
function initMobileMenuEnhancements() {
    // Touch gesture support for mobile menu
    let startY = 0;
    let currentY = 0;
    let isScrolling = false;
    
    const navMenu = document.getElementById('nav-menu');
    
    if (navMenu) {
        navMenu.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        navMenu.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            
            if (Math.abs(currentY - startY) > 50 && !isScrolling) {
                isScrolling = true;
                
                if (currentY > startY) {
                    // Swipe down - close menu
                    navMenu.classList.remove('show');
                    document.body.style.overflow = '';
                }
            }
        }, { passive: true });
        
        navMenu.addEventListener('touchend', () => {
            isScrolling = false;
        }, { passive: true });
    }
}

/*=============== PERFORMANCE OPTIMIZATIONS ===============*/
function initPerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Debounced scroll handler
    let scrollTimeout;
    
    function debounceScroll(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(scrollTimeout);
                func(...args);
            };
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(later, wait);
        };
    }
    
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Geist+Sans:wght@300;400;500;600;700;800;900&display=swap',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

/*=============== CUSTOM ANIMATIONS ===============*/
// Add custom CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 5px rgba(78, 226, 236, 0.3);
        }
        50% {
            box-shadow: 0 0 20px rgba(78, 226, 236, 0.6);
        }
    }
`;
document.head.appendChild(style);

/*=============== ACCESSIBILITY ENHANCEMENTS ===============*/
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Focus management for modal/menu
    const navMenu = document.getElementById('nav-menu');
    const focusableElements = navMenu.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
    );
    
    if (navMenu.classList.contains('show')) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
});

/*=============== ERROR HANDLING ===============*/
window.addEventListener('error', (e) => {
    console.error('Dagadget Mart Website Error:', e.error);
    // You can add error reporting here
});

/*=============== ANALYTICS & TRACKING ===============*/
// Google Analytics or other tracking can be added here
function trackEvent(eventName, eventData = {}) {
    // Example: gtag('event', eventName, eventData);
    console.log('Event tracked:', eventName, eventData);
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('button_click', {
            button_text: buttonText,
            page_location: window.location.href
        });
    }
});

/*=============== THEME TOGGLE (Optional) ===============*/
// This can be uncommented if you want to add a light/dark theme toggle
/*
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}
*/

/*=============== LOADING ANIMATION ===============*/
window.addEventListener('load', () => {
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
    
    // Trigger entrance animations
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
});

/*=============== INTERSECTION OBSERVER POLYFILL ===============*/
// Polyfill for older browsers
if (!window.IntersectionObserver) {
    // Fallback for browsers that don't support IntersectionObserver
    const animatedElements = document.querySelectorAll(
        '.product__card, .brand__card, .testimonial__card, .about__feature, .contact__card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

/*=============== CONTACT FORM ENHANCEMENT (If form is added later) ===============*/
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 1000);
        });
    }
}

/*=============== SOCIAL MEDIA INTEGRATION ===============*/
// Instagram feed integration (can be enhanced with actual API)
function initSocialMedia() {
    const instagramBtn = document.querySelector('.nav__instagram, .btn[href*="instagram"]');
    
    if (instagramBtn) {
        instagramBtn.addEventListener('click', () => {
            trackEvent('social_media_click', {
                platform: 'instagram',
                location: 'navigation'
            });
        });
    }
}

// Initialize social media features
initSocialMedia();

/*=============== PERFORMANCE MONITORING ===============*/
// Monitor page performance
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        // Track performance if analytics is available
        trackEvent('page_performance', {
            load_time: loadTime,
            user_agent: navigator.userAgent
        });
    }
});

/*=============== CONSOLE BRANDING ===============*/
console.log(
    '%c🛍️ Gadget Mart - Premium Electronics Store',
    'color: #4EE2EC; font-size: 18px; font-weight: bold; padding: 10px;'
);
console.log(
    '%cWebsite developed with ❤️ for the best electronics shopping experience in Durg, Chhattisgarh',
    'color: #A9A9A9; font-size: 12px;'
);
