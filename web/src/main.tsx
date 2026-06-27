import { StrictMode }  from 'react';
import { createRoot }  from 'react-dom/client';
import App             from './App';

const mount = () => {
  const el = document.getElementById('root');
  if (!el) { console.error('[kt_hud] #root manquant'); return; }
  createRoot(el).render(<StrictMode><App /></StrictMode>);
};

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', mount)
  : mount();
