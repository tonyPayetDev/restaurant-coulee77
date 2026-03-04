/**
 * Restaurant Coulee 77 - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================
    // NAVBAR SCROLL EFFECT
    // ===============================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===============================
    // MOBILE MENU TOGGLE
    // ===============================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===============================
    // SMOOTH SCROLLING
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===============================
    // MENU TABS
    // ===============================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // ===============================
    // TESTIMONIALS SLIDER
    // ===============================
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.remove('active');
            dots[i].classList.remove('active');
        });
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(next);
    }

    // Auto-play testimonials
    function startTestimonialSlider() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function stopTestimonialSlider() {
        clearInterval(testimonialInterval);
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopTestimonialSlider();
            showTestimonial(index);
            startTestimonialSlider();
        });
    });

    // Start slider
    startTestimonialSlider();

    // ===============================
    // RESERVATION FORM
    // ===============================
    const reservationForm = document.getElementById('reservationForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success modal
        successModal.classList.add('active');
        
        // Reset form
        reservationForm.reset();
    });

    // Close modal handlers
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    });

    // Close modal on outside click
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });

    // ===============================
    // NEWSLETTER FORM
    // ===============================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre inscription à notre newsletter !');
        newsletterForm.reset();
    });

    // ===============================
    // ANIMATION ON SCROLL
    // ===============================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.about-content, .menu-item, .gallery-item, .contact-info, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    // ===============================
    // STATS COUNTER ANIMATION
    // ===============================
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    const suffix = stat.textContent.replace(/[0-9]/g, '');
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + suffix;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + suffix;
                        }
                    }, 30);
                });
            }
        });
    }, { threshold: 0.5 });

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }

    // ===============================
    // HERO PARALLAX EFFECT
    // ===============================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }
    });

    // ===============================
    // BUTTON RIPPLE EFFECT
    // ===============================
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        </style>
    `);

    console.log('🍽️ Restaurant Coulee 77 - Site chargé avec succès!');
});
