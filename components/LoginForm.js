import { useState } from 'react';
import { Shield } from 'lucide-react';

export default function LoginForm({ onLogin }) {
  const [cred, setCred] = useState({ u: '', p: '' });
  const [err, setErr] = useState('');

  const login = () => {
    if (
      cred.u === process.env.NEXT_PUBLIC_ADMIN_USER &&
      cred.p === process.env.NEXT_PUBLIC_ADMIN_PASS
    ) {
      onLogin(Date.now().toString());
    } else {
      setErr('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 border border-green-500 p-8 rounded w-96">
        <div className="flex flex-col items-center mb-4">
          <Shield className="w-12 h-12 text-green-500 mb-2" />
          <h1 className="text-green-500 text-2xl font-bold">COMMAND CENTER</h1>
        </div>
        <input
          type="text"
          placeholder="Usuario"
          value={cred.u}
          onChange={(e) => setCred({ ...cred, u: e.target.value })}
          className="w-full bg-black border border-green-700 text-green-400 p-2 mb-3"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={cred.p}
          onChange={(e) => setCred({ ...cred, p: e.target.value })}
          className="w-full bg-black border border-green-700 text-green-400 p-2 mb-3"
        />
        {err && <p className="text-red-500 text-sm mb-2">{err}</p>}
        <button
          onClick={login}
          className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-2"
        >
          ACCEDER
        </button>
      </div>
    </div>
  );
}
