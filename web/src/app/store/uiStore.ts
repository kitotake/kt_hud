// ============================================================
// Global UI Store — Zustand
// Manages: theme, open menus, toasts, overlays
// ============================================================
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type Theme = 'dark' | 'light';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface UIState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Active panels
  menuOpen: boolean;
  inventoryOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setInventoryOpen: (open: boolean) => void;

  // Any panel blocking cursor/input
  isAnyPanelOpen: () => boolean;

  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  subscribeWithSelector((set, get) => ({
    // ── Theme ───────────────────────────────────────────────
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

    // ── Panels ──────────────────────────────────────────────
    menuOpen:       false,
    inventoryOpen:  false,

    setMenuOpen: (open) => set({ menuOpen: open }),
    setInventoryOpen: (open) => set({ inventoryOpen: open }),

    isAnyPanelOpen: () => {
      const { menuOpen, inventoryOpen } = get();
      return menuOpen || inventoryOpen;
    },

    // ── Toasts ──────────────────────────────────────────────
    toasts: [],

    addToast: (toast) => {
      const id = crypto.randomUUID();
      const duration = toast.duration ?? 3500;

      set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));

      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    },

    removeToast: (id) =>
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  }))
);