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
        <main className="flex-1 overflow-y-auto custom-scrollbar pb-20 lg:pb-0">
          <div className="max-w-5xl mx-auto p-5 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
