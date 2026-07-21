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
    <header className="h-14 sm:h-16 border-b-0 sm:border-b border-charcoal-100 dark:border-charcoal-700 bg-white/70 dark:bg-charcoal-800/70 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-4 sm:px-5 flex-shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:shadow-none transition-colors duration-200">
      {/* Left: Branding */}
      <div className="flex items-center gap-3 relative z-10 w-1/3">
        <img src="/favicon/favicon.svg" alt="BUeño Calculator Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm" />
        <div className="hidden sm:block">
          <h1 className="text-sm font-bold text-charcoal-700 dark:text-charcoal-100 leading-tight">
            BUeño Calculator
          </h1>
          <p className="text-2xs text-charcoal-400 dark:text-charcoal-500 leading-tight">
            Bicol University GWA
          </p>
        </div>
      </div>

      {/* Center: Mobile Title (Native App Bar Style) */}
      <div className="sm:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[15px] font-semibold text-charcoal-800 dark:text-charcoal-100 tracking-tight">
          BUeño Calculator
        </h1>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center justify-end gap-2 relative z-10 w-1/3">
        {hasCustomRules && (
          <span className="hidden sm:inline-flex items-center gap-1 text-2xs font-medium text-collegiate-orange dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-2 py-1 rounded-full">
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
