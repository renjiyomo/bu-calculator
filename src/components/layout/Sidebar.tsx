// ========================================
// Sidebar Component
// Navigation between the three tools
// ========================================

import { Calculator, GraduationCap, Settings, PanelLeftClose, PanelLeftOpen, Smartphone } from 'lucide-react';
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

const downloadNavItem = {
  view: 'download' as View,
  label: 'Download App',
  icon: Smartphone,
  description: 'Android APK',
};

export function Sidebar() {
  const { activeView, setActiveView, hasCustomRules, isPWA } = useApp();
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
            className="btn-ghost p-1.5 text-charcoal-400 hover:text-charcoal-700 dark:hover:text-charcoal-200 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
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

          {/* Divider */}
          <div className={`my-2 border-t border-charcoal-100 dark:border-charcoal-700 ${collapsed ? 'mx-2' : 'mx-1'}`} />

          {/* Download App nav item */}
          {!isPWA && (() => {
            const isActive = activeView === downloadNavItem.view;
            const Icon = downloadNavItem.icon;
            return (
              <button
                onClick={() => setActiveView(downloadNavItem.view)}
                className={`w-full ${
                  isActive ? 'sidebar-item-active' : 'sidebar-item'
                } ${collapsed ? 'justify-center px-2' : ''}`}
                id="nav-download"
                title={collapsed ? downloadNavItem.label : undefined}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                {!collapsed && (
                  <div className="text-left">
                    <div className="leading-tight">{downloadNavItem.label}</div>
                    <div
                      className={`text-2xs leading-tight mt-0.5 ${
                        isActive
                          ? 'text-white/70'
                          : 'text-charcoal-300 dark:text-charcoal-500'
                      }`}
                    >
                      {downloadNavItem.description}
                    </div>
                  </div>
                )}
                {/* APK ready badge */}
                {!collapsed && (
                  <span className="ml-auto inline-flex items-center px-1.5 py-0.5 text-[9px] font-semibold rounded-sm bg-sage-100 dark:bg-sage-900/50 text-sage-700 dark:text-sage-300 border border-sage-200 dark:border-sage-700 flex-shrink-0">
                    APK
                  </span>
                )}
              </button>
            );
          })()}
        </nav>

        {/* Footer info */}
        {!collapsed && (
          <div className="p-4 border-t border-charcoal-100 dark:border-charcoal-700 mt-auto">
            <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500 leading-relaxed text-center opacity-80 hover:opacity-100 transition-opacity">
              <strong>Note:</strong> This is an independent project and is not officially associated with or endorsed by Bicol University. 
              Results are for reference only and should not be used as the official basis for determining honors. Please wait for official university announcements.
            </p>
          </div>
        )}
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex pb-[env(safe-area-inset-bottom)] transition-colors duration-200">
        {[...navItems, ...(isPWA ? [] : [downloadNavItem])].map((item) => {
          const isActive = activeView === item.view;
          const Icon = item.icon;
          return (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2 px-1 relative"
              id={`mobile-nav-${item.view}`}
            >
              <div className={`flex items-center justify-center w-16 h-8 rounded-full transition-colors duration-200 ${isActive ? 'bg-forest-100 dark:bg-sage-900/40 text-forest-700 dark:text-sage-400' : 'text-charcoal-400 dark:text-charcoal-500'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-medium leading-tight text-center transition-colors duration-200 ${isActive ? 'text-forest-700 dark:text-sage-400' : 'text-charcoal-400 dark:text-charcoal-500'}`}>
                {item.view === 'download' ? 'Download' : item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
