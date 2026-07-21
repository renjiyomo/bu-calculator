// ========================================
// GWA Result Component
// Displays the computed GWA and honors status
// ========================================

import type { SemesterEvaluation, Subject } from '../../types';
import { formatGWA } from '../../utils/bu-computation';
import { HonorBadge } from '../shared/Badge';
import { TrendingUp, Hash, Weight, Maximize2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ShareModal } from '../shared/ShareModal';
import { useState } from 'react';

interface GWAResultProps {
  evaluation: SemesterEvaluation;
  subjects?: Subject[];
}

export function GWAResult({ evaluation, subjects }: GWAResultProps) {
  const { userName, setUserName } = useApp();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { gwaResult, honor, honorLabel } = evaluation;

  if (!gwaResult.isValid && !gwaResult.hasDisqualifyingGrades) {
    return null;
  }

  return (
    <>
      <div className="card animate-slide-down relative">
        {/* Mobile Layout (hidden on sm+) */}
        <div className="flex flex-col gap-5 sm:hidden">
          <div>
            <p className="text-2xs font-semibold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider mb-2">
              General Weighted Average
            </p>
            <div className="flex items-center justify-between gap-4 w-full">
              <p className="text-4xl font-bold text-charcoal-700 dark:text-charcoal-100 tabular-nums tracking-tight">
                {formatGWA(gwaResult.gwa)}
              </p>
              <div className="flex-shrink-0">
                <HonorBadge type={honor} label={honorLabel} size="md" />
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-charcoal-800 dark:bg-charcoal-100 text-white dark:text-charcoal-900 hover:bg-charcoal-700 dark:hover:bg-white transition-colors text-sm font-semibold shadow-sm"
          >
            <Maximize2 className="w-4 h-4" />
            View Details
          </button>
        </div>

        {/* Desktop/Web Layout (hidden on mobile) */}
        <div className="hidden sm:flex sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-2xs font-semibold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider mb-1">
              General Weighted Average
            </p>
            <p className="text-4xl font-bold text-charcoal-700 dark:text-charcoal-100 tabular-nums tracking-tight">
              {formatGWA(gwaResult.gwa)}
            </p>
          </div>
          {/* Honor Badge and Share Button */}
          <div className="flex items-center gap-3">
            <HonorBadge type={honor} label={honorLabel} size="md" />
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-50 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-700 transition-colors text-xs font-semibold border border-charcoal-200 dark:border-charcoal-700"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              View Details
            </button>
          </div>
        </div>

        {/* Disqualification notice */}
        {gwaResult.hasDisqualifyingGrades && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-sm animate-fade-in">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">
              Disqualifying Grades Detected
            </p>
            <ul className="space-y-0.5">
              {gwaResult.disqualifyingSubjects.map((s) => (
                <li
                  key={s.id}
                  className="text-xs text-red-600 dark:text-red-400/80"
                >
                  • {s.subjectCode || '(No code)'} — Grade: {String(s.grade)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        type="semester"
        gwa={gwaResult.gwa}
        honorLabel={honorLabel}
        totalUnits={gwaResult.totalAcademicUnits}
        userName={userName}
        onNameChange={setUserName}
        subjects={subjects}
      />
    </>
  );
}
