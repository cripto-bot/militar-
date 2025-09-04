import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';

export default function Panel() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tk = sessionStorage.getItem('token');
    if (tk) setToken(tk);
  }, []);

  const handleLogin = (tk) => {
    sessionStorage.setItem('token', tk);
    setToken(tk);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  };

  if (!token) return <LoginForm onLogin={handleLogin} />;
  return <Dashboard onLogout={handleLogout} />;
}
