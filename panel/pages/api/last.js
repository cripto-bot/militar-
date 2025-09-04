export default function handler(req, res) {
  const { id } = req.query;
  const data = global.trackerData?.[id] || {};
  res.status(200).json(data);
}
