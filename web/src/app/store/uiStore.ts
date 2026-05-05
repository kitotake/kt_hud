// web/src/app/store/uiStore.ts
// FIX #11 : showHunger / showThirst déplacés ici depuis hudStore.
// Ce sont des préférences d'affichage UI, pas des données de jeu.
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type Theme = 'dark' | 'light';

interface UIState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // FIX #11 : préférences d'affichage UI (ex-hudStore)
  showHunger: boolean;
  showThirst: boolean;
  toggleHunger: () => void;
  toggleThirst: () => void;
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

    showHunger: true,
    showThirst: true,
    toggleHunger: () => set((s) => ({ showHunger: !s.showHunger })),
    toggleThirst: () => set((s) => ({ showThirst: !s.showThirst })),
  }))
);
