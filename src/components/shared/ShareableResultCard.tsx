import { useState, useRef, useEffect } from 'react';
import { Trophy, Medal, Star, Pencil, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatGWA } from '../../utils/bu-computation';
import type { SemesterSummary } from '../../types';
import { useApp } from '../../context/AppContext';

interface ShareableResultCardProps {
  type: 'semester' | 'latin';
  gwa: number;
  honorLabel: string | null;
  totalUnits: number;
  userName: string;
  onNameChange: (name: string) => void;
  semesterSummaries?: SemesterSummary[];
}

// ── Honor config helpers ──────────────────────────────────────────────────────
function getHonorConfig(honorLabel: string | null | undefined) {
  if (!honorLabel) {
    return {
      badge: 'bg-charcoal-100 dark:bg-charcoal-700/60 text-charcoal-500 dark:text-charcoal-400',
      accent: 'border-charcoal-200 dark:border-charcoal-700',
      Icon: Star,
    };
  }
  if (honorLabel.includes('President') || honorLabel.includes('Summa')) {
    return {
      badge: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white',
      accent: 'border-amber-200 dark:border-amber-700/40',
      Icon: Trophy,
    };
  }
  if (honorLabel.includes("Dean") || honorLabel.includes('Magna')) {
    return {
      badge: 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white',
      accent: 'border-emerald-200 dark:border-emerald-700/40',
      Icon: Medal,
    };
  }
  if (honorLabel.includes('Cum Laude')) {
    return {
      badge: 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white',
      accent: 'border-blue-200 dark:border-blue-700/40',
      Icon: Medal,
    };
  }
  return {
    badge: 'bg-charcoal-100 dark:bg-charcoal-700/60 text-charcoal-500 dark:text-charcoal-400',
    accent: 'border-charcoal-200 dark:border-charcoal-700',
    Icon: Star,
  };
}

function getSemHonor(gwa: number, rules: { presidentListerMax: number; deanListerMax: number }) {
  if (gwa <= 0) return { label: '—', color: 'text-charcoal-400 dark:text-charcoal-500' };
  if (gwa >= 1.0 && gwa <= rules.presidentListerMax)
    return { label: "President's Lister", color: 'text-amber-600 dark:text-amber-400 font-semibold' };
  if (gwa > rules.presidentListerMax && gwa <= rules.deanListerMax)
    return { label: "Dean's Lister", color: 'text-emerald-600 dark:text-emerald-400 font-semibold' };
  return { label: 'No Honors', color: 'text-charcoal-400 dark:text-charcoal-500' };
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ShareableResultCard({
  type,
  gwa,
  honorLabel,
  totalUnits,
  userName,
  onNameChange,
  semesterSummaries,
}: ShareableResultCardProps) {
  const { rules } = useApp();
  const [isEditing, setIsEditing] = useState(!userName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => setIsEditing(false);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const { badge, accent, Icon } = getHonorConfig(honorLabel);
  const title = type === 'semester' ? 'Semester GWA' : 'Cumulative GWA';

  const filteredSummaries = semesterSummaries?.filter(
    (s) => s.subjectCount > 0 || s.totalUnits > 0
  ) ?? [];
  const hasBreakdown = type === 'latin' && filteredSummaries.length > 0;

  return (
    <div className={`rounded-xl bg-white dark:bg-charcoal-800 shadow-xl border border-charcoal-200 dark:border-charcoal-700 overflow-hidden`}>

      {/* ── Top section: Name + GWA + Badge ─────────────────────────────── */}
      <div className="px-4 pt-5 pb-5 flex flex-col items-center text-center gap-2">

        {/* Name */}
        <div className="w-full flex items-center justify-center min-h-[32px] group">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={userName}
              onChange={(e) => onNameChange(e.target.value)}
              onFocus={() => setIsEditing(true)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name…"
              className="
                w-full max-w-[200px] text-center
                text-base sm:text-lg font-bold tracking-tight
                text-charcoal-800 dark:text-charcoal-100
                bg-transparent border-b border-charcoal-300 dark:border-charcoal-600
                focus:border-sage-500 dark:focus:border-sage-400
                focus:outline-none transition-colors
                placeholder:text-charcoal-300 dark:placeholder:text-charcoal-600
                pb-0.5
              "
            />
          ) : (
            <button
              className="flex items-center gap-1.5 rounded-lg px-2 py-0.5 -mx-2 hover:bg-charcoal-50 dark:hover:bg-charcoal-700/50 transition-colors"
              onClick={() => setIsEditing(true)}
              title="Click to edit your name"
            >
              <span className="text-lg sm:text-xl font-bold tracking-tight text-charcoal-800 dark:text-charcoal-100">
                {userName || 'Enter your name'}
              </span>
            </button>
          )}
        </div>

        {/* GWA */}
        <div className="flex flex-col items-center gap-0.5">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-charcoal-400 dark:text-charcoal-500">
            {title}
          </p>
          <div className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 dark:text-charcoal-50 tabular-nums tracking-tighter leading-none my-0.5">
            {formatGWA(gwa)}
          </div>
          <p className="text-[12px] text-charcoal-400 dark:text-charcoal-500">
            Based on {totalUnits} total academic units
          </p>
        </div>

        {/* Honor badge */}
        {honorLabel ? (
          <div className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full ${badge} shadow-xs`}>
            <Icon className="w-4 h-8 flex-shrink-0" />
            <span className="text-[12px] font-semibold tracking-wide">{honorLabel}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-charcoal-100 dark:bg-charcoal-700/50">
            <span className="text-[10px] font-medium text-charcoal-500 dark:text-charcoal-400">No Honors</span>
          </div>
        )}
      </div>

      {/* ── Semester Breakdown ───────────────────────── */}
      {hasBreakdown && (
        <div className="border-t border-charcoal-100 dark:border-charcoal-700">
          {/* Section header */}
          <div className="px-4 pt-2 pb-1 flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-charcoal-400 dark:text-charcoal-500">
              Semester Breakdown
            </span>
            <span className="text-[11px] font-medium text-charcoal-300 dark:text-charcoal-500">
              {filteredSummaries.length} sem{filteredSummaries.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* List — rendered cleanly without scrollbars, highly compressed */}
          <div className="px-2 pb-3 flex flex-col gap-0.5">
            {filteredSummaries.map((summary, idx) => {
              const sem = summary.hasIssues
                ? { label: 'Disqualified', color: 'text-red-500 dark:text-red-400 font-semibold' }
                : getSemHonor(summary.gwa, rules);

              const isPresident = sem.label === "President's Lister";
              const isDean = sem.label === "Dean's Lister";

              return (
                <div
                  key={summary.semesterId}
                  className={`
                    flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px]
                    ${idx % 2 === 0
                      ? 'bg-charcoal-50 dark:bg-charcoal-700/20'
                      : 'bg-white dark:bg-transparent'
                    }
                    border border-charcoal-100/50 dark:border-charcoal-700/10
                  `}
                >
                  {/* Status icon */}
                  <div className="flex-shrink-0">
                    {summary.hasIssues ? (
                      <AlertTriangle className="w-2.5 h-2.5 text-red-400" />
                    ) : isPresident ? (
                      <Trophy className="w-2.5 h-2.5 text-amber-500" />
                    ) : isDean ? (
                      <Medal className="w-2.5 h-2.5 text-emerald-500" />
                    ) : (
                      <CheckCircle className="w-2.5 h-2.5 text-charcoal-300 dark:text-charcoal-600" />
                    )}
                  </div>

                  {/* Semester name */}
                  <span className="flex-1 min-w-0 font-medium text-charcoal-700 dark:text-charcoal-200 truncate">
                    {summary.semesterName}
                  </span>

                  {/* GWA */}
                  <span className="tabular-nums font-bold text-charcoal-800 dark:text-charcoal-100 flex-shrink-0">
                    {formatGWA(summary.gwa)}
                  </span>

                  {/* Honor label */}
                  <span className={`text-right flex-shrink-0 min-w-[80px] truncate ${sem.color}`}>
                    {sem.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="px-4 py-2 border-t border-charcoal-100 dark:border-charcoal-700/50 bg-charcoal-50/60 dark:bg-charcoal-700/20 flex items-center justify-center gap-1">
        <span className="text-[8px] font-semibold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider">
          Bicol University · GWA Calculator
        </span>
      </div>
    </div>
  );
}
