// pages/api/ingest.js
export default function handler(req, res) {
  // CORS para que el tracker estático pueda llamar
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { id, type, ...data } = req.body;

  // Memoria volátil (persiste hasta que Vercel duerma)
  global.trackerData = global.trackerData || {};
  global.trackerData[id] = { id, type, ...data, ts: Date.now() };

  console.log('[INGEST]', id, type, data); // verás en Vercel → Logs
  res.status(200).end();
}
