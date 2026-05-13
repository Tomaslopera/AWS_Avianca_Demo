// Formulario de búsqueda
const initFormSubmission = () => {
  const searchForm = document.querySelector('.search-form');
  if (!searchForm) return;

  if (!document.getElementById('originInput')) return;

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const origin      = document.getElementById('originInput');
    const destination = document.getElementById('destinationInput');
    const dateStart   = document.getElementById('dateStart');
    const dateEnd     = document.getElementById('dateEnd');
    const passengers  = document.getElementById('passengersValue');
    const tripType    = document.querySelector('input[name="trip"]:checked')?.value || 'round';

    if (!origin?.value.trim() || !destination?.value.trim()) {
      alert('Por favor completa origen y destino.');
      return;
    }

    if (!dateStart?.value.trim()) {
      alert('Por favor selecciona la fecha de ida.');
      return;
    }

    if (tripType === 'round' && !dateEnd?.value.trim()) {
      alert('Por favor selecciona la fecha de vuelta.');
      return;
    }

    const params = new URLSearchParams({
      origin:      origin.value.trim(),
      destination: destination.value.trim(),
      dateStart:   dateStart.value.trim(),
      dateEnd:     dateEnd?.value.trim() || '',
      passengers:  passengers?.value.trim() || '1',
      trip:        tripType,
    });

    window.location.href = `resultados.html?${params.toString()}`;
  });
};

// Búsqueda de reserva (Tu reserva)
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

// Efectos de scroll en header
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

// Smooth scroll para anclas
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

// Menu móvil
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

// Selector de fechas
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

// Selector de pasajeros
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

// Botón Promotional Banner
//const initPromoButtons = () => {
//   const promoButtons = document.querySelectorAll('.btn-white');
//      promoButtons.forEach(button => {
//          button.addEventListener('click', () => {
//              alert('¡Oferta especial!\n\nEn producción, esto redirigiría a la página de ofertas o aplicaría el descuento automáticamente.');
//      });
//   });
//};

// Toggle para viaje de ida o ida y vuelta
const initRadioButtons = () => {

  const radios = document.querySelectorAll('input[name="trip"]');
  const datePair = document.querySelector(".date-pair");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {

      if (radio.value === "oneway") {
        datePair.classList.add("oneway");
      } else {
        datePair.classList.remove("oneway");
      }

    });
  });

};

// Animaciones al hacer scroll
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

// Enlaces de información (Información y ayuda)*
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

// Cards de experiencia (Experiencia Avianca)
const initExperienceCards = () => {
    const cards = document.querySelectorAll('.experience-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').textContent;
            alert(`${title}\n\nEn producción, esto redirigiría a la página de ${title.toLowerCase()}.`);
        });
    });
};

// Links de LifeMiles
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

// Eventos de resize (para performance)
let resizeTimer;
const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized to:', window.innerWidth);
    }, 250);
};

window.addEventListener('resize', handleResize);

// Lazy loading de imágenes
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

// Botón Comprar con millas
const initButtonOptions = () => {
    const btnOption = document.querySelector('.btn-option');
    
    if (btnOption) {
        btnOption.addEventListener('click', () => {
            alert('Comprar con millas\n\nEn producción, esto cambiaría el modo de búsqueda para mostrar precios en millas LifeMiles.');
        });
    }
};

// CHECKBOX (Pagar con avianca credits)
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

// Toggle para viaje de ida o ida y vuelta (mostrar/ocultar fecha de regreso)
const initTripTypeToggle = () => {
  const radios = document.querySelectorAll('input[name="trip"]');
  const returnBox = document.querySelector('.return-date');

  radios.forEach(radio=>{
    radio.addEventListener("change", ()=>{

      if(radio.value === "oneway" && radio.checked){
        returnBox.classList.add("hidden");
      }

      if(radio.value === "round" && radio.checked){
        returnBox.classList.remove("hidden");
      }

    });
  });
};

// Ciudad autocomplete
function renderCities(listEl, filter="all", inputTarget, searchText=""){

  listEl.innerHTML = "";

  const text = searchText.toLowerCase();

  destinations.forEach(city => {

    if(filter !== "all" && city.type !== filter) return;

    if(
      !city.name.toLowerCase().includes(text) &&
      !city.code.toLowerCase().includes(text)
    ) return;

    const item = document.createElement("div");
    item.className = "city-item";

    item.innerHTML = `
      <div class="city-left">
        <strong>${city.name}</strong>
        <span>${city.name} (${city.code})</span>
      </div>
      <div class="city-code">${city.code}</div>
    `;

    item.addEventListener("click", ()=>{
      inputTarget.value = `${city.name} (${city.code})`;
      listEl.parentElement.style.display = "none";
    });

    listEl.appendChild(item);
  });
}

// Inicialización de filtros y autocompletado para ciudades
function setupCityFilters(dropdownId, filterName){

  const dropdown = document.getElementById(dropdownId);
  const list = dropdown.querySelector(".city-list");

  // Guardamos filtro activo
  dropdown.dataset.filter = "all";

  dropdown.querySelectorAll(`input[name="${filterName}"]`)
    .forEach(radio=>{
      radio.addEventListener("change", e=>{
        dropdown.dataset.filter = e.target.value;

        const input =
          dropdown.previousElementSibling.querySelector("input");

        renderCities(
          list,
          e.target.value,
          input,
          input.value
        );
      });
    });

}

// Configuración de input de ciudad con autocompletado
function setupCityInput(inputId, dropdownId){

  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  const list = dropdown.querySelector(".city-list");

  if(!input || !dropdown) return;

  // ABRIR
  input.addEventListener("focus", ()=>{
    dropdown.style.display = "block";

    const filter = dropdown.dataset.filter || "all";

    renderCities(list, filter, input, input.value);
  });

  // CLICK
  input.addEventListener("click", ()=>{
    dropdown.style.display = "block";

    const filter = dropdown.dataset.filter || "all";

    renderCities(list, filter, input, input.value);
  });

  // ESCRIBIR
  input.addEventListener("input", ()=>{
    const filter = dropdown.dataset.filter || "all";

    renderCities(list, filter, input, input.value);
  });

  // CLICK AFUERA
  document.addEventListener("click", (e)=>{
    if(!input.contains(e.target) && !dropdown.contains(e.target)){
      dropdown.style.display = "none";
    }
  });

}

const originSelect = document.getElementById("originSelector");
const originLabel  = document.getElementById("originCityLabel");

// LogOut Cognito
const initLogout = () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {

        // Clear local session
        localStorage.removeItem("idToken");
        localStorage.removeItem("accessToken");

        // Redirect to Cognito logout endpoint
        const COGNITO_DOMAIN = "https://us-east-1wai3cb0pm.auth.us-east-1.amazoncognito.com";
        const CLIENT_ID = "1vpm1sda0irgatmcvq9iseb9b8";
        const CALLBACK_URL = "https://d1cq6wgq3znilx.cloudfront.net";

        const logoutUrl =
            `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}` +
            `&logout_uri=${encodeURIComponent(CALLBACK_URL)}`;

        window.location.href = logoutUrl;
    });
};

// Ofertas aleatorias para la página principal
function renderIndexOffers(origin = "Bogotá") {

  const grid = document.getElementById("indexOffersGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (typeof destinations === "undefined") {
    console.error("destinations no está definido");
    return;
  }

  const availableCities = destinations.filter(city =>
    city.type === "national" &&
    city.name !== origin
  );

  const shuffled = [...availableCities]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  shuffled.forEach(city => {

    const card = document.createElement("div");
    card.className = "offer-card";

    card.innerHTML = `
      <div class="offer-image"
           style="background-image:url('${city.image}')">
      </div>

      <div class="offer-info">
        <div>
          <h4>${city.name}</h4>
          <p>Por trayecto desde</p>
        </div>
        <div>
          <span class="badge">Acumula millas</span>
          <strong>COP ${(Math.random()*90000+70000).toFixed(0)}</strong>
        </div>
      </div>
    `;

    grid.appendChild(card);

  });
}

// Cargar selector de origen en la página principal
function loadIndexOriginSelector(){

  const select = document.getElementById("indexOriginSelector");
  if(!select) return;

  destinations
  .filter(city => city.type === "national")
  .forEach(city =>{
    const option = document.createElement("option");
    option.value = city.name;
    option.textContent = city.name;
    select.appendChild(option);
  });

  select.value = "Bogotá";

  select.addEventListener("change", e=>{
    const city = e.target.value;
    document.getElementById("indexOriginLabel").textContent = city;
    renderIndexOffers(city);
  });

}

// INICIALIZACIÓN GENERAL
const init = () => {
    console.log('Avianca Frontend Initialized');
    
    // Core functionality
    initFormSubmission();
    initTripTypeToggle();

    renderIndexOffers("Bogotá");
    loadIndexOriginSelector();

    // Session
    initLogout();

    // City autocomplete (only on pages that have the search dropdowns)
    if (document.getElementById('originDropdown')) {
      setupCityFilters("originDropdown","originFilter");
      setupCityFilters("destinationDropdown","destinationFilter");
      setupCityInput("originInput","originDropdown");
      setupCityInput("destinationInput","destinationDropdown");
    }
    
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
    initInfoLinks();
    initExperienceCards();
    initLifemilesLinks();
    
    // Performance
    initLazyLoading();
    
    console.log('✅ All modules loaded successfully');
    console.log('📍 Ready for backend integration on EC2');
};

// Wait for DOM to be fully loaded
function startWhenReady() {

    if (window._contentfulDataReady) {
        init();
    } else {
        document.addEventListener(
            'contentfulDataReady',
            init,
            { once: true }
        );
    }

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startWhenReady);
} else {
    startWhenReady();
}

// Expose functions for testing or future backend integration
window.AviancaFrontend = {
    showLoadingState,
    hideLoadingState,
    init
};
// =============================================
// RECOMMENDATION WIZARD — ML Destination AI
// =============================================
const initRecommendationWizard = () => {
    const overlay  = document.getElementById('recModalOverlay');
    const btnOpen  = document.getElementById('openRecWizard');
    const btnClose = document.getElementById('recModalClose');
    if (!overlay || !btnOpen) return;

    const questions = [
        {
            field: 'q1_paisaje',
            text: '¿Qué tipo de paisaje prefieres?',
            options: [
                { value: 'playa',   label: 'Playa',   icon: '🏖️' },
                { value: 'montaña', label: 'Montaña', icon: '⛰️' },
                { value: 'ciudad',  label: 'Ciudad',  icon: '🏙️' },
                { value: 'selva',   label: 'Selva',   icon: '🌿' },
            ],
        },
        {
            field: 'q2_actividad',
            text: '¿Qué te gusta hacer en vacaciones?',
            options: [
                { value: 'descansar', label: 'Descansar', icon: '😌' },
                { value: 'explorar',  label: 'Explorar',  icon: '🧭' },
                { value: 'fiesta',    label: 'Fiesta',    icon: '🎉' },
                { value: 'cultura',   label: 'Cultura',   icon: '🏛️' },
            ],
        },
        {
            field: 'q3_clima',
            text: '¿Cómo prefieres el clima?',
            options: [
                { value: 'caliente',  label: 'Caliente',  icon: '☀️' },
                { value: 'frio',      label: 'Frío',      icon: '❄️' },
                { value: 'templado',  label: 'Templado',  icon: '🌤️' },
            ],
            cols: 3,
        },
        {
            field: 'q4_gastro',
            text: '¿Qué gastronomía te atrae?',
            options: [
                { value: 'local',          label: 'Local típica',   icon: '🍲' },
                { value: 'internacional',  label: 'Internacional',  icon: '🌍' },
                { value: 'mariscos',       label: 'Mariscos',       icon: '🦞' },
                { value: 'parrilla',       label: 'Parrilla',       icon: '🥩' },
            ],
        },
        {
            field: 'q5_compania',
            text: '¿Con quién viajas?',
            options: [
                { value: 'solo',    label: 'Solo',    icon: '🧍' },
                { value: 'pareja',  label: 'Pareja',  icon: '👫' },
                { value: 'familia', label: 'Familia', icon: '👨‍👩‍👧' },
                { value: 'amigos',  label: 'Amigos',  icon: '👥' },
            ],
        },
        {
            field: 'q6_duracion',
            text: '¿Cuánto dura tu viaje ideal?',
            options: [
                { value: 'finde',       label: 'Un fin de semana',  icon: '⚡' },
                { value: 'semana',      label: '1 semana',          icon: '📅' },
                { value: 'dos_semanas', label: 'Más de 2 semanas',  icon: '🗓️' },
            ],
            cols: 3,
        },
        {
            field: 'q7_nocturna',
            text: '¿Qué tanto te importa la vida nocturna?',
            options: [
                { value: 'mucho', label: 'Mucho', icon: '🌃' },
                { value: 'algo',  label: 'Algo',  icon: '🌆' },
                { value: 'nada',  label: 'Nada',  icon: '🌙' },
            ],
            cols: 3,
        },
        {
            field: 'q8_tipo',
            text: '¿Prefieres destino nacional o internacional?',
            options: [
                { value: 'nacional',       label: 'Nacional',       icon: '🇨🇴' },
                { value: 'internacional',  label: 'Internacional',  icon: '✈️' },
            ],
            cols: 3,
        },
        {
            field: 'q9_presupuesto',
            text: '¿Cuál es tu presupuesto aproximado?',
            options: [
                { value: 'bajo',  label: 'Menos de $1M COP',  icon: '💰' },
                { value: 'medio', label: '$1M – $3M COP',      icon: '💳' },
                { value: 'alto',  label: 'Más de $3M COP',    icon: '💎' },
            ],
            cols: 3,
        },
        {
            field: 'q10_aventura',
            text: '¿Qué tan aventurero eres?',
            options: [
                { value: 'aventurero', label: 'Muy aventurero',       icon: '🧗' },
                { value: 'moderado',   label: 'Moderado',             icon: '🚶' },
                { value: 'comodo',     label: 'Prefiero comodidad',   icon: '🛋️' },
            ],
            cols: 3,
        },
    ];

    let currentStep = 0;
    const answers = {};

    const wizardEl  = document.getElementById('recWizard');
    const loadingEl = document.getElementById('recLoading');
    const resultsEl = document.getElementById('recResults');
    const questionArea  = document.getElementById('recQuestionArea');
    const progressFill  = document.getElementById('recProgressFill');
    const progressLabel = document.getElementById('recProgressLabel');
    const btnBack = document.getElementById('recBtnBack');
    const btnNext = document.getElementById('recBtnNext');

    const openModal = () => {
        currentStep = 0;
        Object.keys(answers).forEach(k => delete answers[k]);
        showWizard();
        renderStep();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    const showWizard  = () => { wizardEl.style.display=''; loadingEl.style.display='none'; resultsEl.style.display='none'; };
    const showLoading = () => { wizardEl.style.display='none'; loadingEl.style.display=''; resultsEl.style.display='none'; };
    const showResults = () => { wizardEl.style.display='none'; loadingEl.style.display='none'; resultsEl.style.display=''; };

    const renderStep = () => {
        const q = questions[currentStep];
        const pct = ((currentStep + 1) / questions.length) * 100;
        progressFill.style.width = pct + '%';
        progressLabel.textContent = `Pregunta ${currentStep + 1} de ${questions.length}`;
        btnBack.disabled = currentStep === 0;

        const isLast = currentStep === questions.length - 1;
        btnNext.innerHTML = isLast
            ? `Descubrir mi destino <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z"/></svg>`
            : `Siguiente <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;

        const colsClass = q.cols ? ` cols-${q.cols}` : '';
        const optionsHTML = q.options.map(opt => {
            const sel = answers[q.field] === opt.value ? ' selected' : '';
            return `<button type="button" class="rec-option-btn${sel}" data-value="${opt.value}">
                <span style="font-size:20px">${opt.icon}</span>
                <span>${opt.label}</span>
                <svg class="rec-opt-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </button>`;
        }).join('');

        questionArea.innerHTML = `
            <p class="rec-question-text">${q.text}</p>
            <div class="rec-options-grid${colsClass}">${optionsHTML}</div>
        `;

        updateNextBtn();

        questionArea.querySelectorAll('.rec-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                answers[q.field] = btn.dataset.value;
                questionArea.querySelectorAll('.rec-option-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                updateNextBtn();
            });
        });
    };

    const updateNextBtn = () => {
        const q = questions[currentStep];
        btnNext.disabled = !answers[q.field];
    };

    const goNext = async () => {
        if (currentStep < questions.length - 1) {
            currentStep++;
            renderStep();
        } else {
            await submitRecommendation();
        }
    };

    const goBack = () => {
        if (currentStep > 0) { currentStep--; renderStep(); }
    };

    const submitRecommendation = async () => {
        showLoading();
        try {
            const body = {
                q1_paisaje:     answers.q1_paisaje,
                q2_actividad:   answers.q2_actividad,
                q3_clima:       answers.q3_clima,
                q4_gastro:      answers.q4_gastro,
                q5_compania:    answers.q5_compania,
                q6_duracion:    answers.q6_duracion,
                q7_nocturna:    answers.q7_nocturna,
                q8_tipo:        answers.q8_tipo,
                q9_presupuesto: answers.q9_presupuesto,
                q10_aventura:   answers.q10_aventura,
            };

            const res = await fetch('https://qxsi6eee0k.execute-api.us-east-1.amazonaws.com/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            renderResults(data);
        } catch (err) {
            console.error('Recommendation API error:', err);
            showWizard();
            currentStep = questions.length - 1;
            renderStep();
            alert('No pudimos obtener recomendaciones en este momento. Por favor intenta de nuevo.');
        }
    };

    const medals = ['🥇', '🥈', '🥉'];
    const rankClass = ['rank-1', 'rank-2', 'rank-3'];

    const renderResults = (data) => {
        const cards = document.getElementById('recResultsCards');
        const maxScore = data.top3[0]?.score || 1;

        cards.innerHTML = data.top3.map((dest, i) => {
            const scorePct  = Math.round((dest.score / maxScore) * 100);
            const barWidth  = scorePct < 1 ? 4 : scorePct;
            const scoreLabel = scorePct < 1 ? '< 1%' : `${scorePct}%`;
            const searchUrl = `destino.html?city=${encodeURIComponent(dest.ciudad)}`;
            return `
                <a href="${searchUrl}" class="rec-result-card ${rankClass[i]}">
                    <div class="rec-rank-medal">${medals[i]}</div>
                    <div class="rec-card-info">
                        <div class="rec-card-city">${dest.ciudad}</div>
                        <div class="rec-card-iata">${dest.destino}</div>
                        <div class="rec-score-wrap">
                            <div class="rec-score-bar">
                                <div class="rec-score-fill" style="width:${barWidth}%"></div>
                            </div>
                            <span class="rec-score-pct">${scoreLabel}</span>
                        </div>
                    </div>
                    <svg class="rec-card-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
            `;
        }).join('');

        showResults();
    };

    btnOpen.addEventListener('click', openModal);
    btnClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    btnNext.addEventListener('click', goNext);
    btnBack.addEventListener('click', goBack);
    document.getElementById('recBtnRetry').addEventListener('click', () => { showWizard(); currentStep = 0; Object.keys(answers).forEach(k => delete answers[k]); renderStep(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
};

initRecommendationWizard();
