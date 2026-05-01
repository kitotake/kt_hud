// ============================================================
// App — Bootstrap root
// ============================================================

import { ThemeProvider } from '../providers/ThemeProvider';
import { StoreProvider } from '../providers/StoreProvider';
import { useNuiBridge } from '../core/bridge/nuiBridge';
import { Hud } from '../features';
import '../styles/globals.scss';

// Initialise le bridge NUI (écoute tous les window.postMessage de FiveM)
function NuiBridgeInit() {
  useNuiBridge();
  return null;
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <StoreProvider>
        <NuiBridgeInit />
        <Hud />
      </StoreProvider>
    </ThemeProvider>
  );
}