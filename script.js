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

        const origin = document.getElementById("originInput");
        const destination = document.getElementById("destinationInput");
        const dateStart = document.getElementById("dateStart");
        const dateEnd = document.getElementById("dateEnd");
        const passengers = document.getElementById("passengersValue");

        if (
            origin.value.trim() === "" ||
            destination.value.trim() === "" ||
            dateStart.value.trim() === "" ||
            dateEnd.value.trim() === "" ||
            passengers.value.trim() === ""
        ) {
            alert("Por favor completa todos los campos requeridos");
            return;
        }

        showLoadingState();

        setTimeout(() => {
            hideLoadingState();
            alert("¡Búsqueda realizada!");
        }, 1200);
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
// DATE PICKER (FLATPICKR)
// ===================================
const initDateInputs = () => {

    const startInput = document.getElementById("dateStart");
    const endInput = document.getElementById("dateEnd");

    if (!startInput || !endInput) return;

    flatpickr(startInput, {
        dateFormat: "d/m/Y",
        minDate: "today",
        onChange: function (selectedDates) {
            if (selectedDates.length) {
                endPicker.set("minDate", selectedDates[0]);
            }
        }
    });

    const endPicker = flatpickr(endInput, {
        dateFormat: "d/m/Y",
        minDate: "today"
    });
};



// ===================================
// PASSENGER SELECTOR (REAL DROPDOWN)
// ===================================
const initPassengerSelector = () => {

    const toggle = document.getElementById("passengersToggle");
    const dropdown = document.getElementById("passengersDropdown");
    const valueField = document.getElementById("passengersValue");

    if (!toggle || !dropdown || !valueField) return;

    let counts = {
        adult: 1,
        child: 0,
        baby: 0
    };

    // Abrir / cerrar
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.style.display =
            dropdown.style.display === "block" ? "none" : "block";
    });

    // Botones + y -
    dropdown.querySelectorAll(".counter button").forEach(btn => {
        btn.addEventListener("click", () => {

            const type = btn.dataset.type;
            const op = btn.dataset.op;

            if (op === "+") counts[type]++;

            if (op === "-" && counts[type] > 0) {
                if (type === "adult" && counts[type] === 1) return;
                counts[type]--;
            }

            document.getElementById(type + "Count").textContent = counts[type];
        });
    });

    // Confirmar
    dropdown.querySelector(".confirm-passengers")
        .addEventListener("click", () => {

            const total =
                counts.adult +
                counts.child +
                counts.baby;

            valueField.value = total;
            dropdown.style.display = "none";
        });

    // Click fuera
    document.addEventListener("click", (e) => {
        if (!toggle.contains(e.target) &&
            !dropdown.contains(e.target)) {
            dropdown.style.display = "none";
        }
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
