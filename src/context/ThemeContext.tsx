// ========================================
// BU Calculator — Theme Context
// ========================================

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { loadTheme, saveTheme } from '../utils/storage';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => loadTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const doc = document;

    if ('startViewTransition' in doc && typeof (doc as any).startViewTransition === 'function') {
      (doc as any).startViewTransition(() => {
        setTheme(nextTheme);
      });
      return;
    }

    doc.documentElement.classList.add('theme-transitioning');
    setTheme(nextTheme);
    
    setTimeout(() => {
      doc.documentElement.classList.remove('theme-transitioning');
    }, 250);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
