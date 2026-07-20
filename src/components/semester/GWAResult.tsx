// ========================================
// GWA Result Component
// Displays the computed GWA and honors status
// ========================================

import type { SemesterEvaluation } from '../../types';
import { formatGWA } from '../../utils/bu-computation';
import { HonorBadge } from '../shared/Badge';
import { TrendingUp, Hash, Weight, Maximize2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ShareModal } from '../shared/ShareModal';
import { useState } from 'react';

interface GWAResultProps {
  evaluation: SemesterEvaluation;
}

export function GWAResult({ evaluation }: GWAResultProps) {
  const { userName, setUserName } = useApp();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { gwaResult, honor, honorLabel } = evaluation;

  if (!gwaResult.isValid && !gwaResult.hasDisqualifyingGrades) {
    return null;
  }

  return (
    <>
      <div className="card animate-slide-down relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* GWA Display */}
          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xs font-semibold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider mb-1">
                General Weighted Average
              </p>
              <p className="text-3xl font-bold text-charcoal-700 dark:text-charcoal-100 tabular-nums tracking-tight">
                {formatGWA(gwaResult.gwa)}
              </p>
            </div>
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

        {/* Stats row */}
        <div className="mt-5 pt-4 border-t border-charcoal-100 dark:border-charcoal-700 grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-sage-50 dark:bg-sage-900/30 flex items-center justify-center flex-shrink-0">
              <Hash className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            </div>
            <div>
              <p className="text-2xs text-charcoal-400 dark:text-charcoal-500">
                Academic Units
              </p>
              <p className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-200 tabular-nums">
                {gwaResult.totalAcademicUnits}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-sage-50 dark:bg-sage-900/30 flex items-center justify-center flex-shrink-0">
              <Weight className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            </div>
            <div>
              <p className="text-2xs text-charcoal-400 dark:text-charcoal-500">
                Weighted Grades
              </p>
              <p className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-200 tabular-nums">
                {gwaResult.totalWeightedGrades.toFixed(1)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-sage-50 dark:bg-sage-900/30 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            </div>
            <div>
              <p className="text-2xs text-charcoal-400 dark:text-charcoal-500">
                Computation
              </p>
              <p className="text-2xs font-medium text-charcoal-500 dark:text-charcoal-400 tabular-nums">
                {gwaResult.totalWeightedGrades.toFixed(1)} ÷{' '}
                {gwaResult.totalAcademicUnits}
              </p>
            </div>
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
      />
    </>
  );
}
