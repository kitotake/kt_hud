// ============================================================
// App — Bootstrap root
// ============================================================

import { ThemeProvider } from '../providers/ThemeProvider';
import { StoreProvider } from '../providers/StoreProvider';
import { useNuiBridge } from '../core/bridge/nuiBridge';
import { Hud } from '../features';
import '../styles/globals.scss';

// Initialize NUI bridge (listens to all window messages)
function NuiBridgeInit() {
  useNuiBridge();
  return null;
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <StoreProvider>
        {/* Wire all NUI messages to event bus */}
        <NuiBridgeInit />

        {/* Persistent HUD layer */}
        <Hud />

      </StoreProvider>
    </ThemeProvider>
  );
}
