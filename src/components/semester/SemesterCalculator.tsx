// ========================================
// Semester Calculator View (Tool A)
// Dean's / President's Lister calculator
// ========================================

import { useMemo } from 'react';
import { RotateCcw, Download, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateSemesterHonors } from '../../utils/bu-computation';
import { exportSemesterPDF } from '../../utils/pdf-export';
import { SubjectTable } from './SubjectTable';
import { GWAResult } from './GWAResult';

export function SemesterCalculator() {
  const {
    semesterSubjects,
    addSemesterSubject,
    removeSemesterSubject,
    updateSemesterSubject,
    clearSemesterSubjects,
    rules,
    userName,
  } = useApp();

  // Compute GWA and evaluate honors reactively
  const evaluation = useMemo(
    () => evaluateSemesterHonors(semesterSubjects, rules),
    [semesterSubjects, rules]
  );

  const hasData = semesterSubjects.some((s) => s.grade !== '');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-charcoal-700 dark:text-charcoal-100">
            Semester Honors Calculator
          </h2>
          <p className="text-xs text-charcoal-400 dark:text-charcoal-500 mt-1">
            Compute your semester GWA and check eligibility for Dean's or
            President's List.
          </p>
        </div>
        <div className="flex gap-2">
          {hasData && (
            <>
              <button
                onClick={() =>
                  exportSemesterPDF(semesterSubjects, evaluation, userName)
                }
                className="btn-secondary text-xs"
                id="export-semester-pdf"
              >
                <Download className="w-3.5 h-3.5" />
                Export PDF
              </button>
              <button
                onClick={clearSemesterSubjects}
                className="btn-secondary text-xs"
                id="clear-semester"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* GWA Result Card (shown when there's computed data) */}
      <GWAResult evaluation={evaluation} subjects={semesterSubjects} />

      {/* Explanation banner for NSTP */}
      <div className="flex items-start gap-3 p-4 bg-sage-50 dark:bg-sage-900/20 border border-sage-200 dark:border-sage-700 rounded-sm">
        <Info className="w-4 h-4 text-sage-600 dark:text-sage-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-sage-800 dark:text-sage-300">
            About NSTP Subjects
          </p>
          <p className="text-xs text-sage-600 dark:text-sage-400 mt-1 leading-relaxed">
            National Service Training Program (NSTP) are <strong>not included</strong> in the computation of your General Weighted Average (GWA). Note that Physical Education (PE / PATHFIT) <strong>is included</strong> in the GWA. Toggle the button for NSTP subjects to exclude them.
          </p>
        </div>
      </div>

      {/* Subject Input Table */}
      <SubjectTable
        subjects={semesterSubjects}
        rules={rules}
        onUpdate={updateSemesterSubject}
        onRemove={removeSemesterSubject}
        onAdd={addSemesterSubject}
      />

      {/* Reference Info */}
      <div className="card bg-cream-50 dark:bg-charcoal-800/50 border-dashed">
        <h4 className="text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider mb-3">
          BU Semester Honors Criteria
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-charcoal-600 dark:text-charcoal-300">
                President's Lister
              </p>
              <p className="text-charcoal-400 dark:text-charcoal-500">
                GWA 1.00 – {rules.presidentListerMax.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-sage-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-charcoal-600 dark:text-charcoal-300">
                Dean's Lister
              </p>
              <p className="text-charcoal-400 dark:text-charcoal-500">
                GWA{' '}
                {(rules.presidentListerMax + 0.01).toFixed(2)} –{' '}
                {rules.deanListerMax.toFixed(2)}
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
                {rules.disqualifyingGrades.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
