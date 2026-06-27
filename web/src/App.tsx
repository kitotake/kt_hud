// ============================================================
// App.tsx — kt_hud v3
// ============================================================
import { Hud }           from './components/Hud';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useNuiBridge, useDevSync } from './bridge';
import './styles/globals.scss';

// Fond sombre en DEV pour voir le HUD dans le navigateur
if (import.meta.env.DEV) {
  document.body.classList.add('dev');
}

function Bridge() {
  useNuiBridge();
  useDevSync();
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Bridge />
      <Hud />
    </ErrorBoundary>
  );
}
