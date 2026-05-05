// ============================================================
// App — Bootstrap root
// FIX #15 : ErrorBoundary ajouté pour éviter un crash total du NUI
// ============================================================

import { ThemeProvider } from '../providers/ThemeProvider';
import { StoreProvider } from '../providers/StoreProvider';
import { useNuiBridge } from '../core/bridge/nuiBridge';
import { ErrorBoundary } from '../shared/components/ErrorBoundary/ErrorBoundary';
import { Hud } from '../features';
import '../styles/globals.scss';

// Initialise le bridge NUI (écoute tous les window.postMessage de FiveM)
function NuiBridgeInit() {
  useNuiBridge();
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <StoreProvider>
          <NuiBridgeInit />
          <Hud />
        </StoreProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
