// pages/api/ingest.js
export default function handler(req, res) {
  // Logs para depuración
  console.log('=== NUEVA LLAMADA ===');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  // CORS: permite que cualquier origen haga requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Respuesta para preflight requests
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Solo POST
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { id, type, ...data } = req.body;

  // Validación mínima
  if (!id || !type) return res.status(400).json({ error: 'id y type son requeridos' });

  // Guardar en memoria global
  global.trackerData = global.trackerData || {};
  global.trackerData[id] = { id, type, ...data, ts: Date.now() };

  console.log('[INGEST]', id, type, data);

  // Respuesta JSON
  res.status(200).json({ status: 'ok', id, type });
}
