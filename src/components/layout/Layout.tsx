// ========================================
// Layout Component
// Main layout wrapper with header + sidebar + content
// ========================================

import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto custom-scrollbar pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0 relative">
          <div className="max-w-5xl mx-auto p-4 sm:p-5 md:p-8 relative z-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
