// ===================================
// AVIANCA FRONTEND - JAVASCRIPT
// ===================================

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================
const initFormSubmission = () => {
    const searchForm = document.querySelector('.search-form');
    if (!searchForm) return;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = searchForm.querySelectorAll('input[type="text"]');
        
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim() && !input.hasAttribute('readonly')) {
                isValid = false;
                input.closest('.input-with-icon').style.borderColor = '#E30613';
                setTimeout(() => {
                    input.closest('.input-with-icon').style.borderColor = '';
                }, 2000);
            }
        });

        if (isValid) {
            // Simular búsqueda (aquí conectarías con tu backend)
            showLoadingState();
            
            setTimeout(() => {
                hideLoadingState();
                alert('¡Búsqueda realizada!\n\nEn producción, esto se conectaría a tu backend de búsqueda de vuelos en EC2.');
            }, 1500);
        } else {
            alert('Por favor completa todos los campos requeridos');
        }
    });
};

// ===================================
// LOADING STATE
// ===================================
const showLoadingState = () => {
    const searchBtn = document.querySelector('.btn-buscar');
    if (!searchBtn) return;

    searchBtn.disabled = true;
    searchBtn.style.opacity = '0.7';
    searchBtn.innerHTML = `Buscando...`;
};

const hideLoadingState = () => {
    const searchBtn = document.querySelector('.btn-buscar');
    if (!searchBtn) return;

    searchBtn.disabled = false;
    searchBtn.style.opacity = '1';
    searchBtn.innerHTML = `Buscar`;
};

// ===================================
// HEADER SCROLL EFFECT
// ===================================
const initHeaderScroll = () => {
    const header = document.querySelector('.main-header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
        }

        lastScroll = currentScroll;
    });
};

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('mobile-active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('mobile-active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
};

// ===================================
// DATE INPUT INTERACTION
// ===================================
const initDateInputs = () => {
    const dateInputs = document.querySelectorAll('.date-input-wrapper input');
    
    dateInputs.forEach(input => {
        input.addEventListener('click', () => {
            // En producción, aquí integrarías un date picker como flatpickr o pikaday
            console.log('Date picker would open here');
        });
    });
};

// ===================================
// PASSENGER SELECTOR
// ===================================
const initPassengerSelector = () => {
    const passengerInput = document.querySelector('.passengers-input input');
    
    if (!passengerInput) return;

    passengerInput.addEventListener('click', (e) => {
        e.preventDefault();
        // En producción, aquí mostrarías un dropdown/modal para seleccionar pasajeros
        alert('Selector de pasajeros\n\nEn producción, esto abriría un selector donde puedes elegir:\n• Número de adultos\n• Número de niños\n• Número de bebés\n• Clase de cabina (Económica, Business, Primera)');
    });
};

// ===================================
// PROMO BUTTONS INTERACTION
// ===================================
const initPromoButtons = () => {
    const promoButtons = document.querySelectorAll('.btn-white');
    
    promoButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('¡Oferta especial!\n\nEn producción, esto redirigiría a la página de ofertas o aplicaría el descuento automáticamente.');
        });
    });
};

// ===================================
// RADIO BUTTONS BEHAVIOR
// ===================================
const initRadioButtons = () => {
    const radioLabels = document.querySelectorAll('.radio-label');
    
    radioLabels.forEach(label => {
        label.addEventListener('click', () => {
            const input = label.querySelector('input[type="radio"]');
            if (input && input.name === 'trip') {
                // Handle trip type change
                const selectedValue = input.value;
                console.log('Trip type changed to:', selectedValue);
                
                // Aquí podrías mostrar/ocultar campos según el tipo de viaje
                if (selectedValue === 'oneway') {
                    // Ocultar campo de vuelta
                    console.log('One-way trip selected');
                }
            }
        });
    });
};

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const initScrollAnimations = () => {
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

    // Observe elements with animations
    const animatedElements = document.querySelectorAll('.promo-banner-card, .experience-card, .info-card');
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(el);
    });
};

// ===================================
// INFO LINKS INTERACTION
// ===================================
const initInfoLinks = () => {
    const infoLinks = document.querySelectorAll('.info-links a, .info-links-grid a');
    
    infoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const linkText = link.textContent;
            console.log('Link clicked:', linkText);
            alert(`Navegando a: ${linkText}\n\nEn producción, esto redirigiría a la página correspondiente.`);
        });
    });
};

// ===================================
// EXPERIENCE CARDS INTERACTION
// ===================================
const initExperienceCards = () => {
    const cards = document.querySelectorAll('.experience-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').textContent;
            alert(`${title}\n\nEn producción, esto redirigiría a la página de ${title.toLowerCase()}.`);
        });
    });
};

// ===================================
// LIFEMILES LINKS
// ===================================
const initLifemilesLinks = () => {
    const lifemilesLinks = document.querySelectorAll('.link-red');
    
    lifemilesLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const linkText = link.textContent;
            console.log('Lifemiles link clicked:', linkText);
        });
    });
};

// ===================================
// WINDOW RESIZE HANDLER
// ===================================
let resizeTimer;
const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized to:', window.innerWidth);
    }, 250);
};

window.addEventListener('resize', handleResize);

// ===================================
// PERFORMANCE: LAZY LOADING
// ===================================
const initLazyLoading = () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
};

// ===================================
// BUTTON OPTIONS (Comprar con millas)
// ===================================
const initButtonOptions = () => {
    const btnOption = document.querySelector('.btn-option');
    
    if (btnOption) {
        btnOption.addEventListener('click', () => {
            alert('Comprar con millas\n\nEn producción, esto cambiaría el modo de búsqueda para mostrar precios en millas LifeMiles.');
        });
    }
};

// ===================================
// CHECKBOX (Pagar con avianca credits)
// ===================================
const initCheckboxes = () => {
    const checkboxLabels = document.querySelectorAll('.checkbox-label');
    
    checkboxLabels.forEach(label => {
        label.addEventListener('click', () => {
            const input = label.querySelector('input[type="checkbox"]');
            if (input) {
                console.log('Avianca credits:', input.checked);
            }
        });
    });
};

// ===================================
// INITIALIZE ALL
// ===================================
const init = () => {
    console.log('🚀 Avianca Frontend Initialized');
    
    // Core functionality
    initFormSubmission();
    
    // UI enhancements
    initHeaderScroll();
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
    
    // Form interactions
    initDateInputs();
    initPassengerSelector();
    initRadioButtons();
    initButtonOptions();
    initCheckboxes();
    
    // Links and cards
    initPromoButtons();
    initInfoLinks();
    initExperienceCards();
    initLifemilesLinks();
    
    // Performance
    initLazyLoading();
    
    console.log('✅ All modules loaded successfully');
    console.log('📍 Ready for backend integration on EC2');
};

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===================================
// EXPORT FOR EXTERNAL USE (OPTIONAL)
// ===================================
window.AviancaFrontend = {
    showLoadingState,
    hideLoadingState,
    init
};
