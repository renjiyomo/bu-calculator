// ========================================
// Cumulative Calculator View (Tool B)
// Latin Honors calculator across all semesters
// Supports two input modes:
//   - Quick: Enter GWA + units per semester (from transcript)
//   - Detailed: Enter every subject grade individually
// ========================================

import { useMemo } from 'react';
import { Plus, RotateCcw, Download, Zap, List } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateLatinHonors, evaluateLatinHonorsQuick } from '../../utils/bu-computation';
import { exportCumulativePDF } from '../../utils/pdf-export';
import { SemesterAccordion } from './SemesterAccordion';
import { QuickEntryTable } from './QuickEntryTable';
import { CumulativeSummary } from './CumulativeSummary';

export function CumulativeCalculator() {
  const {
    // Mode
    cumulativeInputMode,
    setCumulativeInputMode,
    // Detailed
    semesters,
    addSemester,
    removeSemester,
    updateSemester,
    addSubjectToSemester,
    removeSubjectFromSemester,
    updateSubjectInSemester,
    clearAllSemesters,
    toggleSemesterCollapse,
    // Quick
    quickSemesters,
    addQuickSemester,
    removeQuickSemester,
    updateQuickSemester,
    clearQuickSemesters,
    // Rules
    rules,
  } = useApp();

  const isQuickMode = cumulativeInputMode === 'quick';

  // Evaluate Latin Honors reactively based on mode
  const evaluation = useMemo(() => {
    if (isQuickMode) {
      return evaluateLatinHonorsQuick(quickSemesters, rules);
    }
    return evaluateLatinHonors(semesters, rules);
  }, [isQuickMode, quickSemesters, semesters, rules]);

  const hasData = isQuickMode
    ? quickSemesters.some((qs) => qs.gwa !== '' && qs.totalUnits !== '')
    : semesters.some((s) => s.subjects.some((sub) => sub.grade !== ''));

  const handleClear = () => {
    if (isQuickMode) {
      clearQuickSemesters();
    } else {
      clearAllSemesters();
    }
  };

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
              {!isQuickMode && (
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
              )}
              <button
                onClick={handleClear}
                className="btn-secondary text-xs"
                id="clear-cumulative"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Input Mode Toggle */}
      <div className="card p-0 overflow-hidden">
        <div className="flex border-b border-charcoal-100 dark:border-charcoal-700">
          <button
            onClick={() => setCumulativeInputMode('quick')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-all duration-150 ${
              isQuickMode
                ? 'bg-forest-700 dark:bg-sage-700 text-white'
                : 'bg-cream-50 dark:bg-charcoal-700/50 text-charcoal-400 dark:text-charcoal-500 hover:bg-cream-100 dark:hover:bg-charcoal-700 hover:text-charcoal-600 dark:hover:text-charcoal-300'
            }`}
            id="mode-quick"
          >
            <Zap className="w-4 h-4" />
            <div className="text-left">
              <div className="leading-tight">Quick Entry</div>
              <div className={`text-2xs leading-tight mt-0.5 ${isQuickMode ? 'text-white/70' : 'text-charcoal-300 dark:text-charcoal-500'}`}>
                Just enter GWA & units per semester
              </div>
            </div>
          </button>
          <button
            onClick={() => setCumulativeInputMode('detailed')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-all duration-150 ${
              !isQuickMode
                ? 'bg-forest-700 dark:bg-sage-700 text-white'
                : 'bg-cream-50 dark:bg-charcoal-700/50 text-charcoal-400 dark:text-charcoal-500 hover:bg-cream-100 dark:hover:bg-charcoal-700 hover:text-charcoal-600 dark:hover:text-charcoal-300'
            }`}
            id="mode-detailed"
          >
            <List className="w-4 h-4" />
            <div className="text-left">
              <div className="leading-tight">Detailed Entry</div>
              <div className={`text-2xs leading-tight mt-0.5 ${!isQuickMode ? 'text-white/70' : 'text-charcoal-300 dark:text-charcoal-500'}`}>
                Enter every subject grade individually
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Cumulative GWA Summary */}
      <CumulativeSummary evaluation={evaluation} isQuickMode={isQuickMode} />

      {/* Input Area — depends on mode */}
      {isQuickMode ? (
        /* ---- Quick Mode ---- */
        <QuickEntryTable
          quickSemesters={quickSemesters}
          onUpdate={updateQuickSemester}
          onRemove={removeQuickSemester}
          onAdd={addQuickSemester}
        />
      ) : (
        /* ---- Detailed Mode ---- */
        <>
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

          <button
            onClick={addSemester}
            className="btn-primary w-full sm:w-auto"
            id="add-semester-btn"
          >
            <Plus className="w-4 h-4" />
            Add Semester
          </button>
        </>
      )}

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
