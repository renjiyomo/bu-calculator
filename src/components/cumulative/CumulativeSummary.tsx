// ========================================
// Cumulative Summary Component
// Displays overall cumulative GWA and Latin Honors status
// ========================================

import type { LatinHonorsEvaluation } from '../../types';
import { formatGWA } from '../../utils/bu-computation';
import { HonorBadge } from '../shared/Badge';
import { Hash, BookOpen, AlertCircle, Maximize2 } from 'lucide-react';
import { ShareModal } from '../shared/ShareModal';
import { useApp } from '../../context/AppContext';
import { useState } from 'react';

interface CumulativeSummaryProps {
  evaluation: LatinHonorsEvaluation;
}

export function CumulativeSummary({ evaluation }: CumulativeSummaryProps) {
  const { userName, setUserName } = useApp();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { gwaResult, honor, honorLabel, semesterSummaries } = evaluation;

  if (!gwaResult.isValid && !gwaResult.hasDisqualifyingGrades) {
    return null;
  }

  return (
    <>
      <div className="space-y-4 animate-slide-down">
        {/* Main GWA card */}
        <div className="card">
          {/* Mobile Layout (hidden on sm+) */}
          <div className="flex flex-col gap-5 sm:hidden">
            <div>
              <p className="text-2xs font-semibold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider mb-2">
                Cumulative General Weighted Average
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
                Cumulative General Weighted Average
              </p>
              <p className="text-4xl font-bold text-charcoal-700 dark:text-charcoal-100 tabular-nums tracking-tight">
                {formatGWA(gwaResult.gwa)}
              </p>
            </div>
            {/* Honor Badge and Share Button side-by-side */}
            <div className="flex items-center gap-3">
              <HonorBadge type={honor} label={honorLabel} size="lg" />
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
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">
                  Permanently Disqualified from Latin Honors
                </p>
                <ul className="space-y-0.5">
                  {gwaResult.disqualifyingSubjects.map((s) => (
                    <li
                      key={s.id}
                      className="text-xs text-red-600 dark:text-red-400/80"
                    >
                      • {s.subjectCode || '(No code)'} — Grade:{' '}
                      {String(s.grade)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Per-semester summary table */}
      {semesterSummaries.length > 0 &&
        semesterSummaries.some((s) => s.subjectCount > 0) && (
          <div className="card p-0 overflow-hidden">
            <div className="px-4 py-3 border-b border-charcoal-100 dark:border-charcoal-700">
              <h4 className="text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider">
                Per-Semester Breakdown
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-cream-50 dark:bg-charcoal-700/30 border-b border-charcoal-100 dark:border-charcoal-600">
                    <th className="px-4 py-2.5 text-2xs font-semibold text-charcoal-400 uppercase tracking-wider text-left">
                      Semester
                    </th>
                    <th className="px-4 py-2.5 text-2xs font-semibold text-charcoal-400 uppercase tracking-wider text-center">
                      Subjects
                    </th>
                    <th className="px-4 py-2.5 text-2xs font-semibold text-charcoal-400 uppercase tracking-wider text-center">
                      Units
                    </th>
                    <th className="px-4 py-2.5 text-2xs font-semibold text-charcoal-400 uppercase tracking-wider text-right">
                      GWA
                    </th>
                    <th className="px-4 py-2.5 text-2xs font-semibold text-charcoal-400 uppercase tracking-wider text-center w-16">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-50 dark:divide-charcoal-700">
                  {semesterSummaries.map((summary) => (
                    <tr
                      key={summary.semesterId}
                      className={`transition-colors ${
                        summary.hasIssues
                          ? 'bg-red-50/40 dark:bg-red-900/10'
                          : 'hover:bg-cream-100 dark:hover:bg-charcoal-700/30'
                      }`}
                    >
                      <td className="px-4 py-2.5 text-sm text-charcoal-600 dark:text-charcoal-300">
                        {summary.semesterName}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-charcoal-500 dark:text-charcoal-400 text-center tabular-nums">
                        {summary.subjectCount}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-charcoal-500 dark:text-charcoal-400 text-center tabular-nums">
                        {summary.totalUnits}
                      </td>
                      <td className="px-4 py-2.5 text-sm font-semibold text-charcoal-700 dark:text-charcoal-200 text-right tabular-nums">
                        {formatGWA(summary.gwa)}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {summary.hasIssues ? (
                          <span className="text-red-500 text-xs font-semibold">
                            ⚠
                          </span>
                        ) : summary.subjectCount > 0 ? (
                          <span className="text-sage-500 text-xs">✓</span>
                        ) : (
                          <span className="text-charcoal-300 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        type="latin"
        gwa={gwaResult.gwa}
        honorLabel={honorLabel}
        totalUnits={gwaResult.totalAcademicUnits}
        userName={userName}
        onNameChange={setUserName}
        semesterSummaries={semesterSummaries}
      />
    </>
  );
}
