import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';

const mount = () => {
  const root = document.getElementById('root');
  if (!root) {
    console.error('[kt_hud] #root element not found');
    return;
  }
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}