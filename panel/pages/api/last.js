let lastData = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { id, type, ...data } = req.body;
    lastData[id] = { id, type, ...data, timestamp: Date.now() };
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { id } = req.query;
    return res.json(lastData[id] || {});
  }

  res.status(405).end();
}
