// ============================================================
// ThemeProvider — applies theme CSS class to <html>
// ============================================================
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
  const theme    = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);

  // Apply initial theme
  useEffect(() => {
    setTheme(defaultTheme);
  }, []);

  // Sync theme attr on change
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <>{children}</>;
};