import { Eye, Mic, Video, Trash2, ExternalLink, Copy } from 'lucide-react';
import { useState } from 'react';

export default function DeviceCard({ device, onDelete }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(device.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-gray-900 border border-green-700 p-4 rounded hover:border-green-500 transition">
      <div className="flex justify-between mb-2">
        <h3 className="font-bold text-green-400">{device.name}</h3>
        <span
          className={`text-xs px-2 py-1 rounded ${
            device.status === 'online' ? 'bg-green-800' : 'bg-red-800'
          }`}
        >
          {device.status}
        </span>
      </div>

      <p className="text-xs text-green-600 mb-2">ID: {device.id}</p>

      <div className="flex items-center gap-2 mb-3">
        <a
          href={device.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-green-400 underline flex items-center gap-1"
        >
          <ExternalLink size={12} /> Ver
        </a>

        <button
          onClick={copyToClipboard}
          className="text-xs text-green-400 flex items-center gap-1"
        >
          <Copy size={12} /> {copied ? '¡Copiado!' : 'Copiar'}
        </button>
      </div>

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
