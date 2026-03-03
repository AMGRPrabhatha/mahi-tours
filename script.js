// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.service-card, .fleet-card, .destination-card, .feature-item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ===================================
// CONTACT FORM VALIDATION
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Add error message display function
    function showError(input, message) {
        const formGroup = input.parentElement;

        // Remove existing error
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error styling
        input.style.borderColor = '#ef4444';
        input.style.background = '#fef2f2';

        // Create and add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; animation: fadeIn 0.3s ease;';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
        input.style.background = '';
    }

    function showSuccess() {
        // Create success message overlay
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem 3rem;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            text-align: center;
            animation: slideIn 0.3s ease;
        `;
        successDiv.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
            <h3 style="color: #059669; font-size: 1.5rem; margin-bottom: 0.5rem;">Message Sent!</h3>
            <p style="color: #6b7280;">Thank you for contacting us. We'll get back to you within 2 hours.</p>
        `;
        document.body.appendChild(successDiv);

        // Remove after 3 seconds
        setTimeout(() => {
            successDiv.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => successDiv.remove(), 300);
        }, 3000);
    }

    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                showError(input, 'This field is required');
            } else if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    showError(input, 'Please enter a valid email address');
                } else {
                    clearError(input);
                }
            } else if (input.type === 'tel' && input.value.trim()) {
                const phoneRegex = /^[\d\s\+\-\(\)]+$/;
                if (!phoneRegex.test(input.value.trim())) {
                    showError(input, 'Please enter a valid phone number');
                } else {
                    clearError(input);
                }
            } else {
                clearError(input);
            }
        });

        input.addEventListener('input', () => {
            if (input.value.trim()) {
                clearError(input);
            }
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Get form values
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');

        // Clear all errors first
        inputs.forEach(input => clearError(input));

        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Please enter your full name');
            isValid = false;
        }

        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Please enter your email address');
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // Validate phone
        if (!phone.value.trim()) {
            showError(phone, 'Please enter your phone number');
            isValid = false;
        } else {
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(phone.value.trim())) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
        }

        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters long');
            isValid = false;
        }

        // If valid, show success and reset
        if (isValid) {
            showSuccess();
            contactForm.reset();
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error-message');
            if (firstError) {
                firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Gallery filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Image lightbox for gallery
const galleryImages = document.querySelectorAll('.gallery-item img');
let lightbox = null;

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        // Create lightbox if it doesn't exist
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="" alt="">
                </div>
            `;
            document.body.appendChild(lightbox);

            // Close lightbox on click
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target.className === 'lightbox-close') {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // Show lightbox with clicked image
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 8px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 40px;
        color: white;
        cursor: pointer;
        transition: 0.3s;
    }
    
    .lightbox-close:hover {
        color: #06b6d4;
    }
`;
document.head.appendChild(lightboxStyles);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// MAHI MAPS - INTERACTIVE FEATURES
document.addEventListener('DOMContentLoaded', function () {
    console.log('Mahi Maps - Website loaded successfully! 🌴');

    // ===================================
    // TESTIMONIAL SLIDER
    // ===================================
    let currentTestimonialIndex = 0;
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');

    function showTestimonial(index) {
        // Remove active class from all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Add active class to current slide
        if (testimonialSlides[index]) {
            testimonialSlides[index].classList.add('active');
        }
    }

    function nextTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonialIndex);
    }

    function prevTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(currentTestimonialIndex);
    }

    // Add event listeners if buttons exist
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', nextTestimonial);
        prevButton.addEventListener('click', prevTestimonial);

        // Auto-rotate testimonials every 5 seconds
        setInterval(nextTestimonial, 5000);
    }

    // ===================================
    // FAQ ACCORDION (Redesign)
    // ===================================
    const faqModernItems = document.querySelectorAll('.faq-item-modern');

    // Initialize first one
    if (faqModernItems.length > 0) {
        const firstItem = faqModernItems[0];
        const answer = firstItem.querySelector('.faq-answer-modern');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    faqModernItems.forEach(item => {
        const question = item.querySelector('.faq-question-modern');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            const icon = item.querySelector('.faq-toggle-icon i');

            // Close all other items
            faqModernItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer-modern');
                    const otherIcon = otherItem.querySelector('.faq-toggle-icon i');

                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-times');
                        otherIcon.classList.add('fa-plus');
                    }
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer-modern');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-times');
                }
            } else {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer-modern');
                if (answer) answer.style.maxHeight = null;
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-plus');
                }
            }
        });
    });
});

// Offer Modals
function openOfferModal(event, modalId) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeOfferModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function closeOfferModalOutside(event, modalId) {
    const modal = document.getElementById(modalId);
    if (event.target === modal) {
        closeOfferModal(modalId);
    }
}

// Destination Modals
function openDestModal(event, modalId) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeDestModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function closeDestModalOutside(event, modalId) {
    const modal = document.getElementById(modalId);
    if (event.target === modal) {
        closeDestModal(modalId);
    }
}
