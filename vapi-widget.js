/* ─── VAPI Widget — Avianca ───────────────────────────────────────────────── */

(function () {
  const VAPI_PUBLIC_KEY = '09d1509b-3228-416c-a1c9-792f208aeb3a';
  const ASSISTANT_ID    = 'c73d03ea-87fb-4fcd-9bf5-db9b813b597d';
  const CHAT_API        = 'https://qxsi6eee0k.execute-api.us-east-1.amazonaws.com/chat';

  let vapi      = null;
  let vapiReady = false;
  let state     = 'idle'; // idle | menu | voice | chat
  let chatHistory = []; // { role, content }[]

  /* ── HTML skeleton ──────────────────────────────────────────────────────── */

  const WIDGET_HTML = `
    <div id="vapi-widget">
      <button id="vapi-fab" class="vapi-fab" aria-label="Asistente Ava">
        <svg class="vapi-icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg class="vapi-icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:none">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <div id="vapi-menu" class="vapi-menu" style="display:none">
        <p class="vapi-menu-label">¿Cómo prefieres hablar con Ava?</p>
        <button id="vapi-btn-voice" class="vapi-menu-btn" disabled>
          <span class="vapi-menu-icon vapi-menu-icon--voice"></span>
          <span>
            <strong>Voz</strong>
            <small>Conversación en tiempo real</small>
          </span>
        </button>
        <button id="vapi-btn-chat" class="vapi-menu-btn" disabled>
          <span class="vapi-menu-icon vapi-menu-icon--chat"></span>
          <span>
            <strong>Chat</strong>
            <small>Escribe tu consulta</small>
          </span>
        </button>
        <p class="vapi-menu-loading" id="vapi-menu-loading">Cargando modo voz...</p>
      </div>

      <div id="vapi-voice-overlay" class="vapi-voice-overlay" style="display:none">
        <div class="vapi-voice-card">
          <div class="vapi-voice-waves">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <p class="vapi-voice-name">Ava · Avianca</p>
          <p class="vapi-voice-status" id="vapi-voice-status">Conectando...</p>
          <button id="vapi-btn-hangup" class="vapi-btn-hangup" aria-label="Colgar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.06 6.06l.97-.97a2 2 0 0 1 2.11-.45c.9.36 1.85.6 2.81.7A2 2 0 0 1 22 16.92z"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          </button>
        </div>
      </div>

      <div id="vapi-chat-window" class="vapi-chat-window" style="display:none">
        <div class="vapi-chat-header">
          <div class="vapi-chat-avatar">A</div>
          <div>
            <strong>Ava</strong>
            <small>Asistente Avianca</small>
          </div>
          <button id="vapi-chat-close" class="vapi-chat-close" aria-label="Cerrar chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="vapi-chat-messages" id="vapi-chat-messages">
          <div class="vapi-msg vapi-msg--bot">
            <p>Hola, soy Ava, la asistente virtual de Avianca Colombia. Puedo ayudarte con:<br><br>• Buscar vuelos disponibles<br>• Recomendarte destinos según tus gustos<br>• Consultar el estado de una reserva existente<br><br>Próximamente también podrás realizar reservas directamente desde aquí.<br><br>¿En qué te puedo ayudar hoy?</p>
          </div>
        </div>
        <div class="vapi-chat-footer">
          <input id="vapi-chat-input" class="vapi-chat-input" type="text"
                 placeholder="Escribe tu mensaje..." maxlength="500" autocomplete="off">
          <button id="vapi-chat-send" class="vapi-chat-send" aria-label="Enviar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  /* ── Bootstrap ──────────────────────────────────────────────────────────── */

  function init() {
    document.body.insertAdjacentHTML('beforeend', WIDGET_HTML);
    // Chat is independent of VAPI — enable it immediately
    el('vapi-btn-chat').disabled = false;
    bindEvents();
    loadSDK();
  }

  async function loadSDK() {
    try {
      const module = await import('https://esm.sh/@vapi-ai/web');
      const VapiClass = module.default || module.Vapi || module;
      initVapi(VapiClass);
    } catch (e) {
      console.error('[VAPI] No se pudo cargar el SDK:', e);
      const loading = el('vapi-menu-loading');
      if (loading) loading.textContent = 'No se pudo cargar el asistente.';
    }
  }

  function initVapi(VapiClass) {
    try {
      vapi = new VapiClass(VAPI_PUBLIC_KEY);
    } catch (e) {
      console.error('[VAPI] Error al instanciar:', e);
      return;
    }

    vapiReady = true;
    el('vapi-btn-voice').disabled = false;
    const loading = el('vapi-menu-loading');
    if (loading) loading.style.display = 'none';

    vapi.on('call-start', () => {
      if (state === 'voice') setVoiceStatus('Escuchando...');
    });

    vapi.on('call-end', () => {
      if (state === 'voice') toIdle();
    });

    vapi.on('speech-start', () => {
      if (state === 'voice') setVoiceStatus('Ava está hablando...');
    });

    vapi.on('speech-end', () => {
      if (state === 'voice') setVoiceStatus('Escuchando...');
    });

    vapi.on('error', (err) => {
      console.error('[VAPI]', err);
      if (state === 'voice') toIdle();
    });
  }

  /* ── State machine ──────────────────────────────────────────────────────── */

  function toIdle() {
    state = 'idle';
    tryStop();
    el('vapi-menu').style.display          = 'none';
    el('vapi-voice-overlay').style.display = 'none';
    el('vapi-chat-window').style.display   = 'none';
    setFabIcon('chat');
  }

  function toMenu() {
    state = 'menu';
    el('vapi-menu').style.display          = '';
    el('vapi-voice-overlay').style.display = 'none';
    el('vapi-chat-window').style.display   = 'none';
    setFabIcon('close');
  }

  async function toVoice() {
    if (!vapiReady) return;
    state = 'voice';
    el('vapi-menu').style.display          = 'none';
    el('vapi-voice-overlay').style.display = '';
    setVoiceStatus('Conectando...');
    setFabIcon('close');
    try {
      await vapi.start(ASSISTANT_ID);
    } catch (e) {
      console.error('[VAPI] Error al iniciar voz:', e);
      toIdle();
    }
  }

  function toChat() {
    // Chat mode does NOT call vapi.start() — no microphone, no voice output.
    // AI responses come from the API Gateway /chat endpoint.
    state = 'chat';
    chatHistory = [];
    el('vapi-menu').style.display        = 'none';
    el('vapi-chat-window').style.display = '';
    setFabIcon('close');
    el('vapi-chat-input').focus();
  }

  /* ── Event binding ──────────────────────────────────────────────────────── */

  function bindEvents() {
    el('vapi-fab').addEventListener('click', () => {
      if (state === 'idle')  { toMenu();  return; }
      if (state === 'menu')  { toIdle();  return; }
      toIdle();
    });

    el('vapi-btn-voice').addEventListener('click', toVoice);
    el('vapi-btn-chat').addEventListener('click', toChat);
    el('vapi-btn-hangup').addEventListener('click', toIdle);
    el('vapi-chat-close').addEventListener('click', toIdle);

    el('vapi-chat-send').addEventListener('click', sendChatMessage);
    el('vapi-chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
    });
  }

  /* ── Chat messaging ─────────────────────────────────────────────────────── */

  async function sendChatMessage() {
    const input   = el('vapi-chat-input');
    const sendBtn = el('vapi-chat-send');
    const text    = input.value.trim();
    if (!text) return;

    appendMsg(text, 'user');
    chatHistory.push({ role: 'user', content: text });
    input.value      = '';
    input.disabled   = true;
    sendBtn.disabled = true;

    const typingEl = showTyping();

    try {
      const res = await fetch(CHAT_API, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': localStorage.getItem('idToken') || '',
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      console.log('[Chat] status:', res.status);
      const data = await res.json();
      console.log('[Chat] response:', data);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${data.error || data.message || 'Error del servidor'}`);
      }

      const reply = data.response || data.message || data.content || 'No pude procesar tu mensaje.';
      chatHistory.push({ role: 'assistant', content: reply });
      removeTyping(typingEl);
      appendMsg(reply, 'bot');
    } catch (e) {
      console.error('[Chat] error:', e.message);
      removeTyping(typingEl);
      appendMsg(`Error: ${e.message}`, 'bot');
    }

    input.disabled   = false;
    sendBtn.disabled = false;
    input.focus();
  }

  /* ── UI helpers ─────────────────────────────────────────────────────────── */

  function appendMsg(text, role) {
    const box = el('vapi-chat-messages');
    const div = document.createElement('div');
    div.className = `vapi-msg vapi-msg--${role}`;
    const p = document.createElement('p');
    p.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    div.appendChild(p);
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function showTyping() {
    const box = el('vapi-chat-messages');
    const div = document.createElement('div');
    div.className = 'vapi-msg vapi-msg--bot vapi-typing';
    div.innerHTML = '<p><span></span><span></span><span></span></p>';
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div;
  }

  function removeTyping(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function setVoiceStatus(text) {
    const s = el('vapi-voice-status');
    if (s) s.textContent = text;
  }

  function setFabIcon(type) {
    const iconChat  = document.querySelector('.vapi-icon-chat');
    const iconClose = document.querySelector('.vapi-icon-close');
    if (!iconChat || !iconClose) return;
    iconChat.style.display  = type === 'chat'  ? '' : 'none';
    iconClose.style.display = type === 'close' ? '' : 'none';
  }

  function tryStop() {
    if (vapi) {
      try { vapi.stop(); } catch (e) { /* already stopped */ }
    }
  }

  function el(id) { return document.getElementById(id); }

  /* ── Init ───────────────────────────────────────────────────────────────── */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
