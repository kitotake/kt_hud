import { create } from 'zustand';
// FIX: subscribeWithSelector importé depuis zustand/middleware (correct pour zustand v4/v5)
// En zustand v5, subscribeWithSelector est dans zustand/middleware
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