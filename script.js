// Modern JavaScript for MediTech Hire Website
// Optimized for performance and user experience

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Throttle function for performance optimization
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// Debounce function for search/input optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Main Application Class
class MediTechHire {
    constructor() {
        this.navbar = $('#navbar');
        this.navToggle = $('#nav-toggle');
        this.navMenu = $('#nav-menu');
        this.backToTop = $('#backToTop');
        this.navLinks = $$('.nav-link');
        this.filterButtons = $$('.filter-btn');
        this.jobCards = $$('.job-card');
        this.statNumbers = $$('.stat-number');
        this.form = $('.contact-form');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.animateCounters();
        this.setupJobFilters();
        this.setupFormValidation();
        this.preloadCriticalResources();
        
        // Initialize AOS (Animate On Scroll) alternative
        this.setupScrollAnimations();
        
        console.log('MediTech Hire website initialized successfully! 🚀');
    }

    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', throttle(() => {
            this.handleNavbarScroll();
            this.handleBackToTopVisibility();
        }, 10));

        // Mobile navigation toggle
        this.navToggle?.addEventListener('click', () => {
            this.toggleMobileNav();
        });

        // Navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e);
            });
        });

        // Back to top button
        this.backToTop?.addEventListener('click', () => {
            this.scrollToTop();
        });

        // Job filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleJobFilter(e);
            });
        });

        // Form submission
        this.form?.addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar?.contains(e.target) && this.navMenu?.classList.contains('active')) {
                this.closeMobileNav();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu?.classList.contains('active')) {
                this.closeMobileNav();
            }
        });

        // Resize handler for responsive adjustments
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, 250));
    }

    handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    }

    handleBackToTopVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 500) {
            this.backToTop?.classList.add('visible');
        } else {
            this.backToTop?.classList.remove('visible');
        }
    }

    toggleMobileNav() {
        this.navMenu?.classList.toggle('active');
        this.navToggle?.classList.toggle('active');
        
        // Prevent body scroll when nav is open
        if (this.navMenu?.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileNav() {
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleNavClick(e) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;
        
        const targetSection = $(targetId);
        if (!targetSection) return;

        // Update active nav link
        this.navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');

        // Close mobile nav
        this.closeMobileNav();

        // Smooth scroll to section
        this.scrollToSection(targetSection);
    }

    scrollToSection(element) {
        const navHeight = this.navbar?.offsetHeight || 70;
        const targetPosition = element.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '-100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavLink(id);
                }
            });
        }, options);

        // Observe all sections
        $$('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveNavLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    setupSmoothScrolling() {
        // Polyfill for browsers that don't support smooth scrolling
        if (!('scrollBehavior' in document.documentElement.style)) {
            const smoothScrollPolyfill = document.createElement('script');
            smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
            document.head.appendChild(smoothScrollPolyfill);
        }
    }

    animateCounters() {
        const animateCounter = (element, target, duration = 2000) => {
            let start = 0;
            const increment = target / (duration / 16); // 60fps
            
            const timer = setInterval(() => {
                start += increment;
                element.textContent = Math.floor(start);
                
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        };

        // Intersection Observer for counters
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetValue = entry.target.dataset.target;
                    // Only animate if element has data-target attribute and it's a valid number
                    if (targetValue && !isNaN(parseInt(targetValue))) {
                        const target = parseInt(targetValue);
                        animateCounter(entry.target, target);
                    }
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });

        this.statNumbers.forEach(counter => {
            // Only observe counters that have data-target attributes
            if (counter.dataset.target) {
                counterObserver.observe(counter);
            }
        });
    }

    setupJobFilters() {
        const filterJobs = (category) => {
            this.jobCards.forEach(card => {
                const cardCategories = card.dataset.category?.split(' ') || [];
                
                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        // Add staggered animation for better UX
        const staggerJobCards = () => {
            const visibleCards = Array.from(this.jobCards).filter(card => 
                card.style.display !== 'none'
            );
            
            visibleCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        };

        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter jobs
                const category = button.dataset.filter;
                filterJobs(category);
                staggerJobCards();
            });
        });
    }

    handleJobFilter(e) {
        const category = e.target.dataset.filter;
        
        // Update button states
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Animate job cards
        this.jobCards.forEach((card, index) => {
            const cardCategories = card.dataset.category?.split(' ') || [];
            
            if (category === 'all' || cardCategories.includes(category)) {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(2rem)';
                    
                    requestAnimationFrame(() => {
                        card.style.transition = 'all 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(-2rem)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    setupFormValidation() {
        if (!this.form) return;

        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', debounce(() => {
                this.clearFieldError(input);
            }, 300));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Remove existing error
        this.clearFieldError(field);

        // Check if field is required and empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }

        // Phone validation (if exists)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s|-|\(|\)/g, ''))) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        }

        if (!isValid) {
            this.showFieldError(field, message);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                color: #dc2626;
                font-size: 1.4rem;
                margin-top: 0.5rem;
                display: block;
            `;
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isFormValid = true;

        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please correct the errors below', 'error');
            return;
        }

        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: 1.6rem 2.4rem;
            border-radius: 0.8rem;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #10b981;' : ''}
            ${type === 'error' ? 'background: #dc2626;' : ''}
            ${type === 'info' ? 'background: #2563eb;' : ''}
        `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    setupScrollAnimations() {
        const animationElements = $$('.service-card, .feature, .job-card, .about-text');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animationElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(3rem)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(element);
        });
    }

    preloadCriticalResources() {
        // Preload hero background images
        const heroImages = [
            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0" stop-color="%23fff" stop-opacity=".1"/><stop offset="100%" stop-color="%23fff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="300" r="100" fill="url(%23a)"/><circle cx="800" cy="200" r="150" fill="url(%23a)"/><circle cx="600" cy="700" r="120" fill="url(%23a)"/></svg>'
        ];

        heroImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    handleResize() {
        // Close mobile nav on resize to desktop
        if (window.innerWidth > 768 && this.navMenu?.classList.contains('active')) {
            this.closeMobileNav();
        }
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // Measure page load time
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
            
            // Log performance metrics (remove in production)
            console.log(`Page loaded in ${this.metrics.pageLoadTime}ms`);
        });

        // Measure First Contentful Paint
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.fcp = entry.startTime;
                        console.log(`First Contentful Paint: ${entry.startTime}ms`);
                    }
                }
            });
            observer.observe({ entryTypes: ['paint'] });
        }
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MediTechHire();
    new PerformanceMonitor();
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MediTechHire, PerformanceMonitor };
}