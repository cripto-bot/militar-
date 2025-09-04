export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { id, type, ...data } = req.body;

  global.trackerData = global.trackerData || {};
  global.trackerData[id] = { id, type, ...data, ts: Date.now() };

  console.log('[INGEST]', id, type, data); // aparecerá en Vercel logs
  res.status(200).end();
}
