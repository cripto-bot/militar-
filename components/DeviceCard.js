import { Eye, Mic, Video, Trash2, ExternalLink } from 'lucide-react';

export default function DeviceCard({ device, onDelete }) {
  return (
    <div className="bg-gray-900 border border-green-700 p-4 rounded hover:border-green-500 transition">
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">{device.name}</h3>
        <span
          className={`text-xs px-2 py-1 rounded ${
            device.status === 'online' ? 'bg-green-800' : 'bg-red-800'
          }`}
        >
          {device.status}
        </span>
      </div>

      <p className="text-xs text-green-600 mb-2">ID: {device.id}</p>
      <a
        href={device.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-green-400 underline break-all flex items-center gap-1 mb-3"
      >
        <ExternalLink size={12} /> {device.url}
      </a>

      <div className="flex gap-2">
        <button className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 text-xs rounded">
          <Eye size={12} /> Cámara
        </button>
        <button className="flex items-center gap-1 bg-purple-600 text-white px-2 py-1 text-xs rounded">
          <Mic size={12} /> Audio
        </button>
        <button className="flex items-center gap-1 bg-orange-600 text-white px-2 py-1 text-xs rounded">
          <Video size={12} /> Pantalla
        </button>
        <button
          onClick={() => onDelete(device.id)}
          className="ml-auto text-red-500 hover:text-red-400"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
