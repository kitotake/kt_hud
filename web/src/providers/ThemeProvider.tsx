// web/src/providers/ThemeProvider.tsx
// FIX #4 : suppression de la double application du data-theme.
// setTheme() dans uiStore applique déjà document.documentElement.dataset.theme.
// Le second useEffect était redondant et pouvait causer un flash au mount.
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
  const setTheme = useUIStore((s) => s.setTheme);

  // Applique le thème initial une seule fois.
  // setTheme() gère déjà document.documentElement.dataset.theme en interne.
  useEffect(() => {
    setTheme(defaultTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionnel : on ne réapplique pas si defaultTheme change

  return <>{children}</>;
};
