function gaEvent(eventName, params = {}) {
  if (typeof gtag === 'undefined') return;
  gtag('event', eventName, params);
}

// ─── DETECTAR PÁGINA ──────────────────────────────────────────────────────────

const GA_PAGE = (() => {
  const path = window.location.pathname;
  if (path.includes('resultados'))  return 'resultados';
  if (path.includes('checkout'))    return 'checkout';
  if (path.includes('ofertas'))     return 'ofertas';
  if (path.includes('destino'))     return 'destino';
  if (path.includes('tu_reserva')) return 'tu_reserva';
  return 'home';
})();

// ─── EVENTOS GLOBALES (todas las páginas) ─────────────────────────────────────

function initGlobalEvents() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      gaEvent('click_nav_link', {
        link_text: link.textContent.trim(),
        link_href: link.getAttribute('href'),
        page:      GA_PAGE,
      });
    });
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      gaEvent('click_logout', { page: GA_PAGE });
    });
  }
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function initHomeEvents() {
  if (GA_PAGE !== 'home') return;

  function attachSearchTracker() {
    const form = document.querySelector('.search-form');
    if (!form) return;

    form.addEventListener('submit', () => {
      const origin      = document.getElementById('originInput')?.value      || '';
      const destination = document.getElementById('destinationInput')?.value || '';
      const dateStart   = document.getElementById('dateStart')?.value        || '';
      const dateEnd     = document.getElementById('dateEnd')?.value          || '';
      const passengers  = document.getElementById('passengersValue')?.value  || '1';
      const trip        = document.querySelector('input[name="trip"]:checked')?.value || 'round';

      gaEvent('search_flights', {
        origin,
        destination,
        date_start:  dateStart,
        date_end:    dateEnd,
        passengers:  parseInt(passengers),
        trip_type:   trip,
      });
    }, true);
  }

  function attachOfferCards() {
    document.querySelectorAll('.offer-card').forEach(card => {
      card.addEventListener('click', () => {
        const city = card.querySelector('h4')?.textContent || '';
        gaEvent('click_offer_card', { city_name: city, source: 'home' });
      });
    });
  }

  document.querySelectorAll('.interest-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h4')?.textContent || '';
      gaEvent('click_interest_card', { card_title: title });
    });
  });

  // Experience cards
  document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h4')?.textContent || '';
      gaEvent('click_experience_card', { card_title: title });
    });
  });

  // Lifemiles cards
  document.querySelectorAll('.lifemiles-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h4')?.textContent || '';
      gaEvent('click_lifemiles_card', { card_title: title });
    });
  });

  // Promo banners
  document.querySelectorAll('.promo-banner-card').forEach(card => {
    card.addEventListener('click', () => {
      const variant = card.classList.contains('large') ? 'large' : 'red';
      const title   = card.querySelector('h2, h3')?.textContent?.trim() || '';
      gaEvent('click_promo_banner', { variant, title });
    });
  });

  // Ver más ofertas
  document.querySelectorAll('.link-red').forEach(link => {
    if (link.textContent.includes('ofertas')) {
      link.addEventListener('click', () => {
        gaEvent('click_ver_mas_ofertas');
      });
    }
  });

  // Esperar a que Contentful cargue para attachar cards dinámicas
  if (window._contentfulDataReady) {
    attachSearchTracker();
    setTimeout(attachOfferCards, 500);
  } else {
    document.addEventListener('contentfulDataReady', () => {
      attachSearchTracker();
      setTimeout(attachOfferCards, 500);
    });
  }
}

// ─── OFERTAS ──────────────────────────────────────────────────────────────────

function initOfertasEvents() {
  if (GA_PAGE !== 'ofertas') return;

  gaEvent('view_offers_page');

  // Offer cards — dinámicas, observer para cuando se rendericen
  const observer = new MutationObserver(() => {
    document.querySelectorAll('.offer-card:not([data-ga])').forEach(card => {
      card.dataset.ga = '1';
      card.addEventListener('click', () => {
        const city = card.querySelector('h4')?.textContent || '';
        gaEvent('click_offer_card', { city_name: city, source: 'ofertas' });
      });
    });
  });

  const grid = document.getElementById('offersGrid');
  if (grid) observer.observe(grid, { childList: true });

  // Filtro origen
  document.getElementById('originSelector')?.addEventListener('change', e => {
    gaEvent('filter_origin', { origin: e.target.value });
  });

  // Filtro país
  document.getElementById('countrySelector')?.addEventListener('change', e => {
    gaEvent('filter_country', { country: e.target.value });
  });
}

// ─── DESTINO ──────────────────────────────────────────────────────────────────

function initDestinoEvents() {
  if (GA_PAGE !== 'destino') return;

  // Ver página de destino — esperar a que cargue el nombre
  function trackDestinationView() {
    const cityName = document.getElementById('destinationTitle')?.textContent || '';
    if (cityName) {
      gaEvent('view_destination', { city_name: cityName });
    }
  }

  // Atracciones turísticas
  function attachAttractionCards() {
    document.querySelectorAll('.tourism-card:not([data-ga])').forEach(card => {
      card.dataset.ga = '1';
      card.addEventListener('click', () => {
        const name = card.querySelector('h4')?.textContent || '';
        const city = document.getElementById('destinationTitle')?.textContent || '';
        gaEvent('click_attraction', { attraction_name: name, city_name: city });
      });
    });
  }

  // Búsqueda desde destino
  const form = document.querySelector('.search-form');
  if (form) {
    form.addEventListener('submit', () => {
      const origin      = document.getElementById('originInput')?.value      || '';
      const destination = document.getElementById('destinationInput')?.value || '';
      const dateStart   = document.getElementById('dateStart')?.value        || '';
      const passengers  = document.getElementById('passengersValue')?.value  || '1';
      const trip        = document.querySelector('input[name="trip"]:checked')?.value || 'round';

      gaEvent('search_flights', {
        origin,
        destination,
        date_start: dateStart,
        passengers: parseInt(passengers),
        trip_type:  trip,
        source:     'destination_page',
      });
    }, true);
  }

  if (window._contentfulDataReady) {
    trackDestinationView();
    setTimeout(attachAttractionCards, 500);
  } else {
    document.addEventListener('contentfulDataReady', () => {
      trackDestinationView();
      setTimeout(attachAttractionCards, 500);
    });
  }
}

// ─── RESULTADOS ───────────────────────────────────────────────────────────────

function initResultadosEvents() {
  if (GA_PAGE !== 'resultados') return;

  // View results — esperar a que carguen los vuelos
  function trackViewResults() {
    const params      = new URLSearchParams(window.location.search);
    const origin      = params.get('origin')      || '';
    const destination = params.get('destination') || '';
    const trip        = params.get('trip')         || 'round';
    const passengers  = params.get('passengers')   || '1';
    const outCount    = document.querySelectorAll('#outboundList .flight-card').length;
    const retCount    = document.querySelectorAll('#returnList .flight-card').length;

    gaEvent('view_results', {
      origin,
      destination,
      trip_type:       trip,
      passengers:      parseInt(passengers),
      outbound_count:  outCount,
      return_count:    retCount,
    });
  }

  // Observer para cuando se rendericen los vuelos
  const outboundList = document.getElementById('outboundList');
  const returnList   = document.getElementById('returnList');

  if (outboundList) {
    new MutationObserver(() => {
      // Trackear view_results una vez al cargar
      if (outboundList.children.length > 0 && !outboundList.dataset.tracked) {
        outboundList.dataset.tracked = '1';
        setTimeout(trackViewResults, 300);
      }

      // Attachar eventos a cada flight card nueva
      outboundList.querySelectorAll('.flight-card:not([data-ga])').forEach(card => {
        card.dataset.ga = '1';
        const btn = card.querySelector('.btn-select-flight');
        if (btn) {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const flightId = card.dataset.flightId || '';
            const isSelected = btn.classList.contains('btn-selected');
            gaEvent(isSelected ? 'deselect_flight' : 'select_flight_outbound', {
              flight_id: flightId,
              direction: 'outbound',
            });
          });
        }
      });
    }).observe(outboundList, { childList: true });
  }

  if (returnList) {
    new MutationObserver(() => {
      returnList.querySelectorAll('.flight-card:not([data-ga])').forEach(card => {
        card.dataset.ga = '1';
        const btn = card.querySelector('.btn-select-flight');
        if (btn) {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const flightId  = card.dataset.flightId || '';
            const isSelected = btn.classList.contains('btn-selected');
            gaEvent(isSelected ? 'deselect_flight' : 'select_flight_return', {
              flight_id: flightId,
              direction: 'return',
            });
          });
        }
      });
    }).observe(returnList, { childList: true });
  }

  // Filtros
  document.querySelectorAll('input[name="sortBy"]').forEach(radio => {
    radio.addEventListener('change', e => {
      gaEvent('apply_filter', { filter_type: 'sort', filter_value: e.target.value });
    });
  });

  document.querySelectorAll('input[name="stops"]').forEach(cb => {
    cb.addEventListener('change', e => {
      gaEvent('apply_filter', { filter_type: 'stops', filter_value: e.target.value, checked: e.target.checked });
    });
  });

  document.querySelectorAll('input[name="timeRange"]').forEach(cb => {
    cb.addEventListener('change', e => {
      gaEvent('apply_filter', { filter_type: 'time_range', filter_value: e.target.value, checked: e.target.checked });
    });
  });

  document.querySelectorAll('input[name="cabin"]').forEach(radio => {
    radio.addEventListener('change', e => {
      gaEvent('apply_filter', { filter_type: 'cabin', filter_value: e.target.value });
    });
  });

  // Modificar búsqueda
  document.getElementById('btnModify')?.addEventListener('click', () => {
    gaEvent('click_modify_search');
  });

  // Continuar al checkout
  document.getElementById('btnContinueCheckout')?.addEventListener('click', () => {
    const params = new URLSearchParams(window.location.search);
    gaEvent('begin_checkout', {
      origin:      params.get('origin')      || '',
      destination: params.get('destination') || '',
      trip_type:   params.get('trip')        || 'round',
      passengers:  parseInt(params.get('passengers') || '1'),
    });
  });
}

// ─── CHECKOUT ─────────────────────────────────────────────────────────────────

function initCheckoutEvents() {
  if (GA_PAGE !== 'checkout') return;

  const params     = new URLSearchParams(window.location.search);
  const outboundId = params.get('outboundId') || params.get('flightId') || '';
  const returnId   = params.get('returnId')   || '';
  const cabin      = params.get('cabin')      || 'economica';
  const passengers = parseInt(params.get('passengers') || '1');

  // Entrada al checkout
  gaEvent('begin_checkout', {
    outbound_id: outboundId,
    return_id:   returnId   || null,
    cabin,
    passengers,
  });

  // Trackear pasos — override goToStep
  // Usamos MutationObserver en el stepper para detectar cambios
  const stepNames = {
    1: 'vuelo',
    2: 'pasajeros',
    3: 'asientos_ida',
    4: 'asientos_vuelta_o_equipaje',
    5: 'equipaje_o_pago',
    6: 'pago_o_confirmacion',
    7: 'confirmacion',
  };

  const stepper = document.querySelector('.stepper-container');
  if (stepper) {
    new MutationObserver(() => {
      const activeStep = stepper.querySelector('.step.active');
      if (activeStep) {
        const stepNum = parseInt(activeStep.dataset.step);
        const label   = activeStep.querySelector('.step-label')?.textContent?.trim() || '';
        gaEvent(`checkout_step`, {
          step_number: stepNum,
          step_name:   label,
          cabin,
          passengers,
        });
      }
    }).observe(stepper, { subtree: true, attributeFilter: ['class'] });
  }

  // Selección de asiento
  document.addEventListener('click', e => {
    const seat = e.target.closest('.seat.available, .seat.executive');
    if (!seat) return;
    const seatId    = seat.dataset.seat || '';
    const isExec    = seat.classList.contains('executive');
    const passenger = seat.dataset.passenger || '0';

    gaEvent('select_seat', {
      seat_id:    seatId,
      is_exec:    isExec,
      passenger:  parseInt(passenger) + 1,
      cabin,
    });

    if (isExec && cabin === 'economica') {
      gaEvent('upgrade_to_executive', {
        seat_id:   seatId,
        passenger: parseInt(passenger) + 1,
      });
    }
  });

  // Selección de equipaje
  document.addEventListener('click', e => {
    const option = e.target.closest('.baggage-option');
    if (!option) return;
    const block     = option.closest('.baggage-passenger-block');
    const paxTitle  = block?.querySelector('.baggage-passenger-title')?.textContent?.trim() || '';
    const bagName   = option.querySelector('.baggage-name')?.textContent?.trim() || '';

    gaEvent('select_baggage', {
      baggage_type: bagName,
      passenger:    paxTitle,
    });
  });

  // Compra completada — observer en el código de reserva
  const bookingCode = document.getElementById('bookingCode');
  if (bookingCode) {
    new MutationObserver(() => {
      const code = bookingCode.textContent;
      if (code && code !== '-') {
        gaEvent('purchase', {
          transaction_id: code,
          cabin,
          passengers,
          outbound_id:    outboundId,
          return_id:      returnId || null,
          currency:       'COP',
        });
      }
    }).observe(bookingCode, { childList: true, characterData: true, subtree: true });
  }
}

// ─── TU RESERVA ───────────────────────────────────────────────────────────────

function initTuReservaEvents() {
  if (GA_PAGE !== 'tu_reserva') return;

  const form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', () => {
      gaEvent('search_reservation');
    });
  }

  // Observar si aparece el resultado
  const resultSection = document.getElementById('reservationResult');
  if (resultSection) {
    new MutationObserver(() => {
      const isVisible = !resultSection.classList.contains('hidden');
      const hasContent = resultSection.querySelector('.reservation-code');

      if (isVisible && hasContent) {
        const code = hasContent.textContent?.trim() || '';
        gaEvent('reservation_found', { reservation_code: code });
      }
    }).observe(resultSection, { attributes: true, attributeFilter: ['class'], subtree: true });
  }

  // Error — observar si aparece el mensaje de error
  const observer = new MutationObserver(() => {
    const errorEl = document.getElementById('reservationError');
    if (errorEl && errorEl.style.display !== 'none' && errorEl.textContent) {
      gaEvent('reservation_not_found');
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Imprimir
  document.addEventListener('click', e => {
    if (e.target.closest('.btn-print')) {
      gaEvent('print_itinerary');
    }
  });
}

// ─── INICIALIZACIÓN ───────────────────────────────────────────────────────────

function initAnalytics() {
  initGlobalEvents();
  initHomeEvents();
  initOfertasEvents();
  initDestinoEvents();
  initResultadosEvents();
  initCheckoutEvents();
  initTuReservaEvents();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
  initAnalytics();
}