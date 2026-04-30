// ThemeProvider.tsx
import React, { useEffect, type ReactNode } from 'react';
import { useUIStore } from '../app/store/uiStore';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'dark' | 'light';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'dark',
}) => {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);

  // Appliquer le thème initial (une seule fois)
  useEffect(() => {
    setTheme(defaultTheme);
  }, [setTheme, defaultTheme]);     // On inclut setTheme pour éviter les warnings

  // Synchroniser l'attribut data-theme sur <html>
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <>{children}</>;
};