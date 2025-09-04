let lastData = {};

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { id, type, ...data } = req.body;
  lastData[id] = { id, type, ...data, timestamp: Date.now() };

  res.status(200).end();
}
