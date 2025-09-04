import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function CreateDeviceModal({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('mobile');

  const handleCreate = () => {
    if (!name) return;
    onCreate(name, type);
    setName('');
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mb-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-black font-bold px-4 py-2 rounded"
      >
        <Plus size={18} /> Crear Dispositivo
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-green-500 p-6 rounded w-96">
            <h2 className="text-green-400 text-xl mb-4">Nuevo Dispositivo</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-green-700 text-green-400 p-2 mb-3"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-black border border-green-700 text-green-400 p-2 mb-4"
            >
              <option value="mobile">Móvil</option>
              <option value="desktop">Escritorio</option>
              <option value="tablet">Tablet</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="flex-1 bg-green-600 text-black font-bold py-2 rounded"
              >
                Crear
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-red-600 text-white font-bold py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
