/**
 * Lambda: POST /chat
 * Body: { messages: [{ role, content }] }
 * Returns: { response: string }
 * Env: OPENAI_API_KEY
 */

import https from 'https';

const API_BASE = 'https://qxsi6eee0k.execute-api.us-east-1.amazonaws.com';

const SYSTEM_PROMPT = `Eres Ava, la asistente virtual inteligente de Avianca Colombia, la aerolínea más importante del país. Eres amable, profesional y conocedora de todos los destinos a los que vuela Avianca.

## IMPORTANTE
Estás en el año 2026. Cualquier fecha de vuelo debe ser en 2026 o posterior.

## TU PROPÓSITO
Conversar con el usuario para entender qué necesita y recopilar toda la información necesaria. Tienes dos herramientas: search_flights para buscar vuelos directamente, y execute_action para recomendaciones y consultas de reserva.

## PERSONALIDAD
- Habla siempre en español, de manera cálida y profesional
- Usa un tono cercano pero elegante, acorde a una aerolínea premium
- Haz una pregunta a la vez, nunca bombardees al usuario
- Si el usuario habla en inglés, respóndele en inglés
- NO USES EMOJIS NUNCA

## LO QUE PUEDES HACER
1. Buscar vuelos disponibles → tool: search_flights
2. Recomendar destinos según gustos → tool: execute_action
3. Consultar el estado de una reserva → tool: execute_action

## INTERPRETACIÓN DE INTENCIONES
- "quiero reservar", "hacer una reserva", "comprar un tiquete", "quiero viajar", "necesito un vuelo" → FLUJO BUSCAR VUELOS
- "consultar mi reserva", "ver mi reserva", "tengo una reserva", "estado de mi vuelo" → FLUJO CONSULTAR RESERVA
- "a dónde viajar", "recomiéndame", "no sé a dónde ir", "sugiéreme un destino" → FLUJO RECOMENDAR DESTINOS

NUNCA confundas "hacer una reserva" con "consultar una reserva".

## FLUJO PARA BUSCAR VUELOS
1. Pregunta la ciudad de origen
2. Pregunta la ciudad de destino
3. Pregunta la fecha de viaje
4. Confirma los datos con el usuario
5. Llama la tool search_flights con origin, destination y date (YYYY-MM-DD)
6. Presenta los resultados con número de vuelo, horarios y precio en palabras

Códigos IATA:
Bogotá=BOG, Medellín=MDE, Cartagena=CTG, Cali=CLO, Santa Marta=SMR,
Barranquilla=BAQ, San Andrés=ADZ, Miami=MIA, Nueva York=JFK, Madrid=MAD,
Barcelona=BCN, Londres=LHR, París=CDG, Cancún=CUN, Orlando=MCO,
São Paulo=GRU, Santiago=SCL, Lima=LIM, Buenos Aires=EZE

## FLUJO PARA RECOMENDAR DESTINOS
Haz estas 10 preguntas una por una:
1. ¿Qué tipo de paisaje prefieres? → playa / montaña / ciudad / selva
2. ¿Qué te gusta hacer en vacaciones? → descansar / explorar / fiesta / cultura
3. ¿Cómo prefieres el clima? → caliente / frío / templado
4. ¿Qué tipo de gastronomía te atrae? → local típica / internacional / mariscos / parrilla
5. ¿Con quién vas a viajar? → solo / pareja / familia / amigos
6. ¿Cuánto tiempo tienes? → un fin de semana / una semana / más de dos semanas
7. ¿Qué tanto te importa la vida nocturna? → mucho / algo / nada
8. ¿Prefieres destino nacional o internacional? → nacional / internacional
9. ¿Cuál es tu presupuesto? → menos de 1M COP / entre 1M y 3M COP / más de 3M COP
10. ¿Qué tan aventurero eres? → muy aventurero / moderado / prefiero la comodidad

Cuando tengas las 10 respuestas llama execute_action con action "get_recommendations" y los valores mapeados.

Mapeo:
- "local típica" → "local"
- "muy aventurero" → "aventurero"
- "prefiero la comodidad" → "comodo"
- "un fin de semana" → "finde"
- "una semana" → "semana"
- "más de dos semanas" → "dos_semanas"
- "menos de 1M COP" → "bajo"
- "entre 1M y 3M COP" → "medio"
- "más de 3M COP" → "alto"
- "frío" → "frio"

## FLUJO PARA CONSULTAR RESERVA
1. Pide el código de reserva (6 caracteres, ej: XK29TF)
2. Llama execute_action con action "get_booking" y params: {booking_code: código}
3. Presenta: estado, vuelo, pasajeros y fecha

## DESPUÉS DE RECIBIR RESPUESTA
- Para vuelos: número de vuelo, horarios y precio en palabras
- Para recomendaciones: presenta los 3 destinos con entusiasmo y score_pct como porcentaje de compatibilidad. Menciona solo el nombre de la ciudad, NUNCA el código IATA.
- Para reservas: estado, vuelo, pasajeros y fecha
- Siempre pregunta al final si puedes ayudar en algo más

## REGLAS IMPORTANTES
- NUNCA inventes información sobre vuelos, precios o reservas
- NUNCA llames una tool sin tener TODOS los parámetros necesarios
- Siempre confirma con el usuario antes de llamar la tool
- Precios siempre en números con formato: 1200000 → "$1.200.000 COP"
- NUNCA menciones códigos IATA al hablar con el usuario
- Mientras esperas respuesta de una tool, di: "Perfecto, déjame consultar esa información, un momento por favor"`;

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'search_flights',
      description: 'Busca vuelos disponibles entre dos ciudades',
      parameters: {
        type: 'object',
        properties: {
          origin:      { type: 'string', description: 'Código IATA origen (ej: BOG)' },
          destination: { type: 'string', description: 'Código IATA destino (ej: MDE)' },
          date:        { type: 'string', description: 'Fecha YYYY-MM-DD' },
        },
        required: ['origin', 'destination', 'date'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'execute_action',
      description: 'Ejecuta get_recommendations o get_booking',
      parameters: {
        type: 'object',
        properties: {
          action:         { type: 'string', enum: ['get_recommendations', 'get_booking'] },
          q1_paisaje:     { type: 'string' },
          q2_actividad:   { type: 'string' },
          q3_clima:       { type: 'string' },
          q4_gastro:      { type: 'string' },
          q5_compania:    { type: 'string' },
          q6_duracion:    { type: 'string' },
          q7_nocturna:    { type: 'string' },
          q8_tipo:        { type: 'string' },
          q9_presupuesto: { type: 'string' },
          q10_aventura:   { type: 'string' },
          params:         { type: 'object', properties: { booking_code: { type: 'string' } } },
        },
        required: ['action'],
      },
    },
  },
];

/* ── Lambda handler ─────────────────────────────────────────────────────── */

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Content-Type':                 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { messages } = JSON.parse(event.body || '{}');
    if (!Array.isArray(messages) || messages.length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'messages requerido' }) };
    }

    const reply = await runAgent([{ role: 'system', content: SYSTEM_PROMPT }, ...messages]);

    return { statusCode: 200, headers, body: JSON.stringify({ response: reply }) };
  } catch (e) {
    console.error('[Chat Lambda]', e);
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};

/* ── Agentic loop — handles tool calls automatically ───────────────────── */

async function runAgent(messages) {
  for (let i = 0; i < 5; i++) {
    const choice = await callOpenAI(messages);

    if (choice.finish_reason === 'stop' || !choice.message.tool_calls) {
      return choice.message.content;
    }

    messages.push(choice.message);

    for (const call of choice.message.tool_calls) {
      const args   = JSON.parse(call.function.arguments);
      const result = await executeTool(call.function.name, args);
      console.log(`[Tool] ${call.function.name}`, JSON.stringify(args), '→', JSON.stringify(result));

      messages.push({
        role:         'tool',
        tool_call_id: call.id,
        content:      JSON.stringify(result),
      });
    }
  }

  return 'Lo siento, no pude completar la solicitud en este momento.';
}

/* ── Tool execution ─────────────────────────────────────────────────────── */

async function executeTool(name, args) {
  try {
    if (name === 'search_flights') {
      const { origin, destination } = args;
      const data = await httpGet(`${API_BASE}/flights?origin=${origin}&destination=${destination}`);
      return data;
    }

    if (name === 'execute_action') {
      const { action, params, ...rest } = args;

      if (action === 'get_recommendations') {
        return await httpPost(`${API_BASE}/recommendations`, rest);
      }

      if (action === 'get_booking') {
        const code = params?.booking_code;
        return await httpGet(`${API_BASE}/lambda-bookings/${code}`);
      }
    }

    return { error: 'Tool desconocida' };
  } catch (e) {
    return { error: e.message };
  }
}

/* ── OpenAI call ────────────────────────────────────────────────────────── */

function callOpenAI(messages) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model:       'gpt-4o-mini',
      messages,
      tools:       TOOLS,
      max_tokens:  800,
      temperature: 0.7,
    });

    const options = {
      hostname: 'api.openai.com',
      path:     '/v1/chat/completions',
      method:   'POST',
      headers: {
        'Content-Type':   'application/json',
        'Authorization':  `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end',  () => {
        try {
          const json = JSON.parse(data);
          if (json.error) { reject(new Error(json.error.message)); return; }
          resolve(json.choices[0]);
        } catch (e) {
          reject(new Error('Error al parsear respuesta de OpenAI'));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

/* ── HTTP helpers ───────────────────────────────────────────────────────── */

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options = { hostname: u.hostname, path: u.pathname + u.search, method: 'GET',
      headers: { 'Content-Type': 'application/json' } };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end',  () => { try { resolve(JSON.parse(data)); } catch(e) { resolve(data); } });
    });
    req.on('error', reject);
    req.end();
  });
}

function httpPost(url, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const u = new URL(url);
    const options = {
      hostname: u.hostname, path: u.pathname, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end',  () => { try { resolve(JSON.parse(data)); } catch(e) { resolve(data); } });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}
