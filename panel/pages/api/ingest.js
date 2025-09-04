export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { id, type, ...data } = req.body;

  // Guardamos en memoria (podes usar Redis después)
  global.trackerData = global.trackerData || {};
  global.trackerData[id] = { id, type, ...data, ts: Date.now() };

  res.status(200).end();
}
