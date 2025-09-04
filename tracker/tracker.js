// Obtener ID desde la URL
const deviceId = location.pathname.split('/').pop();

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Instalación de PWA
let installPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installPrompt = e;
  document.getElementById('install').style.display = 'inline-block';
});

document.getElementById('install')?.addEventListener('click', async () => {
  if (installPrompt) {
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      document.getElementById('install').style.display = 'none';
    }
  }
});

// Enviar datos al panel
function send(data) {
  fetch('/api/ingest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: deviceId, ...data })
  });
}

// Ubicación
if ('geolocation' in navigator) {
  navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      send({ type: 'geo', lat: latitude, lon: longitude, acc: accuracy });
    },
    (err) => console.warn('Geolocation error:', err),
    { enableHighAccuracy: true }
  );
}

// Audio (con permiso)
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream) => {
    const ctx = new AudioContext();
    const src = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    src.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    setInterval(() => {
      analyser.getByteFrequencyData(data);
      const volume = data.reduce((a, b) => a + b) / data.length;
      send({ type: 'audio', volume });
    }, 3000);
  })
  .catch(() => console.warn('Mic access denied'));

// Cámara (con permiso)
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    send({ type: 'camera', status: 'granted' });
  })
  .catch(() => console.warn('Camera access denied'));

// Estado visual
document.getElementById('status').textContent = 'Activo';
