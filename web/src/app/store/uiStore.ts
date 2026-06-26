// web/src/app/store/uiStore.ts
// MAJ : showHunger / showThirst (et leurs toggles) supprimés —
// ces stats ne sont plus affichées dans le HUD.
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type Theme = 'dark' | 'light';

interface UIState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
  subscribeWithSelector((set, get) => ({
    theme: 'dark',
    setTheme: (theme) => {
      document.documentElement.dataset.theme = theme;
      set({ theme });
    },
    toggleTheme: () => {
      const next = get().theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      set({ theme: next });
    },
  }))
);