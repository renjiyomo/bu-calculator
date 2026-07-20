// ========================================
// Badge Component
// Displays honors status badges
// ========================================

import { Trophy, Award, Star, AlertTriangle, Minus } from 'lucide-react';
import type { SemesterHonor, LatinHonor } from '../../types';

interface HonorBadgeProps {
  type: SemesterHonor | LatinHonor;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

const iconMap: Record<string, typeof Trophy> = {
  president: Trophy,
  dean: Award,
  summa: Trophy,
  magna: Star,
  cum_laude: Award,
  disqualified: AlertTriangle,
  none: Minus,
};

const styleMap: Record<string, string> = {
  president: 'badge-gold',
  dean: 'badge-success',
  summa: 'badge-gold',
  magna: 'badge-success',
  cum_laude: 'badge-info',
  disqualified: 'badge-danger',
  none: 'badge-warning',
};

const sizeMap = {
  sm: 'text-[10px] px-1.5 py-0.5 whitespace-nowrap flex-shrink-0',
  md: 'text-2xs sm:text-xs px-2.5 py-1 whitespace-nowrap flex-shrink-0',
  lg: 'text-xs sm:text-sm px-3 py-1.5 whitespace-nowrap flex-shrink-0',
};

export function HonorBadge({ type, label, size = 'md' }: HonorBadgeProps) {
  const Icon = iconMap[type] || Minus;
  const style = styleMap[type] || 'badge-warning';
  const sizeClass = sizeMap[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-sm animate-scale-in whitespace-nowrap flex-shrink-0 ${style} ${sizeClass}`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      {label}
    </span>
  );
}
