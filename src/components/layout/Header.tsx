// ========================================
// Header Component
// Top bar with branding and theme toggle
// ========================================

import { Sun, Moon, Settings } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { hasCustomRules } = useApp();

  return (
    <header className="h-14 border-b border-charcoal-100 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 flex items-center justify-between px-5 flex-shrink-0">
      {/* Left: Branding */}
      <div className="flex items-center gap-3">
        <img src="/favicon/favicon.svg" alt="BUeño Calculator Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
        <div className="hidden sm:block">
          <h1 className="text-sm font-bold text-charcoal-700 dark:text-charcoal-100 leading-tight">
            BUeño Calculator
          </h1>
          <p className="text-2xs text-charcoal-400 dark:text-charcoal-500 leading-tight">
            Bicol University GWA
          </p>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {hasCustomRules && (
          <span className="hidden sm:inline-flex items-center gap-1 text-2xs font-medium text-collegiate-orange dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-2 py-1 rounded-sm">
            <Settings className="w-3 h-3" />
            Custom rules
          </span>
        )}

        <button
          onClick={toggleTheme}
          className="btn-ghost p-2"
          aria-label="Toggle theme"
          id="theme-toggle"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}
