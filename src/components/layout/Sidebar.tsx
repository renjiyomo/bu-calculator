// ========================================
// Sidebar Component
// Navigation between the three tools
// ========================================

import { Calculator, GraduationCap, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { View } from '../../types';

const navItems: { view: View; label: string; icon: typeof Calculator; description: string }[] = [
  {
    view: 'semester',
    label: 'Semester Honors',
    icon: Calculator,
    description: "Dean's / President's Lister",
  },
  {
    view: 'cumulative',
    label: 'Latin Honors',
    icon: GraduationCap,
    description: 'Cumulative GWA',
  },
  {
    view: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Rules & Cutoffs',
  },
];

export function Sidebar() {
  const { activeView, setActiveView, hasCustomRules } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r border-charcoal-100 dark:border-charcoal-700 bg-cream-50 dark:bg-charcoal-800 transition-all duration-200 flex-shrink-0 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Collapse button */}
        <div className="flex justify-end p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="btn-ghost p-1.5"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            const Icon = item.icon;
            return (
              <button
                key={item.view}
                onClick={() => setActiveView(item.view)}
                className={`w-full ${
                  isActive ? 'sidebar-item-active' : 'sidebar-item'
                } ${collapsed ? 'justify-center px-2' : ''}`}
                id={`nav-${item.view}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                {!collapsed && (
                  <div className="text-left">
                    <div className="leading-tight">{item.label}</div>
                    <div
                      className={`text-2xs leading-tight mt-0.5 ${
                        isActive
                          ? 'text-white/70'
                          : 'text-charcoal-300 dark:text-charcoal-500'
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                )}
                {!collapsed &&
                  item.view === 'settings' &&
                  hasCustomRules && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-collegiate-orange dark:bg-amber-400 flex-shrink-0" />
                  )}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        {!collapsed && (
          <div className="p-4 border-t border-charcoal-100 dark:border-charcoal-700">
            <p className="text-2xs text-charcoal-300 dark:text-charcoal-500 leading-relaxed">
              Based on the BU Student Handbook. For reference only.
            </p>
          </div>
        )}
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-charcoal-800 border-t border-charcoal-100 dark:border-charcoal-700 flex">
        {navItems.map((item) => {
          const isActive = activeView === item.view;
          const Icon = item.icon;
          return (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 text-2xs font-medium transition-colors ${
                isActive
                  ? 'text-forest-700 dark:text-sage-400'
                  : 'text-charcoal-400 dark:text-charcoal-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
