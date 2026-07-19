// ========================================
// Cumulative Calculator View (Tool B)
// Latin Honors calculator across all semesters
// ========================================

import { useMemo } from 'react';
import { Plus, RotateCcw, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateLatinHonors } from '../../utils/bu-computation';
import { exportCumulativePDF } from '../../utils/pdf-export';
import { SemesterAccordion } from './SemesterAccordion';
import { CumulativeSummary } from './CumulativeSummary';

export function CumulativeCalculator() {
  const {
    semesters,
    addSemester,
    removeSemester,
    updateSemester,
    addSubjectToSemester,
    removeSubjectFromSemester,
    updateSubjectInSemester,
    clearAllSemesters,
    toggleSemesterCollapse,
    rules,
  } = useApp();

  // Evaluate Latin Honors reactively
  const evaluation = useMemo(
    () => evaluateLatinHonors(semesters, rules),
    [semesters, rules]
  );

  const hasData = semesters.some((s) =>
    s.subjects.some((sub) => sub.grade !== '')
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-charcoal-700 dark:text-charcoal-100">
            Latin Honors Calculator
          </h2>
          <p className="text-sm text-charcoal-400 dark:text-charcoal-500 mt-1">
            Compute your cumulative GWA across all semesters for graduation
            honors eligibility.
          </p>
        </div>
        <div className="flex gap-2">
          {hasData && (
            <>
              <button
                onClick={() =>
                  exportCumulativePDF(semesters, evaluation, rules)
                }
                className="btn-secondary text-xs"
                id="export-cumulative-pdf"
              >
                <Download className="w-3.5 h-3.5" />
                Export PDF
              </button>
              <button
                onClick={clearAllSemesters}
                className="btn-secondary text-xs"
                id="clear-cumulative"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear All
              </button>
            </>
          )}
        </div>
      </div>

      {/* Cumulative GWA Summary */}
      <CumulativeSummary evaluation={evaluation} />

      {/* Semester Accordions */}
      <div className="space-y-3">
        {semesters.map((semester) => (
          <SemesterAccordion
            key={semester.id}
            semester={semester}
            rules={rules}
            onToggleCollapse={() => toggleSemesterCollapse(semester.id)}
            onRemove={() => removeSemester(semester.id)}
            onUpdateName={(name) => updateSemester(semester.id, { name })}
            onAddSubject={() => addSubjectToSemester(semester.id)}
            onRemoveSubject={(subjectId) =>
              removeSubjectFromSemester(semester.id, subjectId)
            }
            onUpdateSubject={(subjectId, updates) =>
              updateSubjectInSemester(semester.id, subjectId, updates)
            }
            showRemove={semesters.length > 1}
          />
        ))}
      </div>

      {/* Add Semester Button */}
      <button
        onClick={addSemester}
        className="btn-primary w-full sm:w-auto"
        id="add-semester-btn"
      >
        <Plus className="w-4 h-4" />
        Add Semester
      </button>

      {/* Reference Info */}
      <div className="card bg-cream-50 dark:bg-charcoal-800/50 border-dashed">
        <h4 className="text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider mb-3">
          BU Latin Honors Criteria
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-charcoal-600 dark:text-charcoal-300">
                Summa Cum Laude
              </p>
              <p className="text-charcoal-400 dark:text-charcoal-500">
                GWA 1.00 – {rules.summaCumLaudeMax.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-sage-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-charcoal-600 dark:text-charcoal-300">
                Magna Cum Laude
              </p>
              <p className="text-charcoal-400 dark:text-charcoal-500">
                GWA{' '}
                {(rules.summaCumLaudeMax + 0.01).toFixed(2)} –{' '}
                {rules.magnaCumLaudeMax.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-charcoal-600 dark:text-charcoal-300">
                Cum Laude
              </p>
              <p className="text-charcoal-400 dark:text-charcoal-500">
                GWA{' '}
                {(rules.magnaCumLaudeMax + 0.01).toFixed(2)} –{' '}
                {rules.cumLaudeMax.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-charcoal-600 dark:text-charcoal-300">
                Disqualifiers
              </p>
              <p className="text-charcoal-400 dark:text-charcoal-500">
                {rules.disqualifyingGrades.join(', ')} in any semester
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
