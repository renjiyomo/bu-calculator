// ========================================
// Empty State Component
// Shown when no subjects are added
// ========================================

import { BookOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-sm bg-cream-200 dark:bg-charcoal-700 flex items-center justify-center mb-6">
        <BookOpen className="w-8 h-8 text-sage-500 dark:text-sage-400" />
      </div>
      <h3 className="text-lg font-semibold text-charcoal-600 dark:text-charcoal-200 mb-2">
        {title}
      </h3>
      <p className="text-sm text-charcoal-400 dark:text-charcoal-400 max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
