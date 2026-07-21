// ========================================
// Rules Engine / Settings View (Tool C)
// Configurable GWA cutoffs and disqualifying grades
// ========================================

import { useState } from 'react';
import { RotateCcw, Save, Plus, X, AlertTriangle, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_RULES } from '../../types';

export function RulesEngine() {
  const { rules, updateRules, resetRules, hasCustomRules } = useApp();

  // Local state for the disqualifying grade input
  const [newGrade, setNewGrade] = useState('');

  const handleCutoffChange = (
    field: keyof typeof rules,
    value: string
  ) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 1.0 && num <= 5.0) {
      updateRules({ [field]: num });
    }
  };

  const addDisqualifyingGrade = () => {
    const trimmed = newGrade.trim().toUpperCase();
    if (trimmed && !rules.disqualifyingGrades.includes(trimmed)) {
      updateRules({
        disqualifyingGrades: [...rules.disqualifyingGrades, trimmed],
      });
      setNewGrade('');
    }
  };

  const removeDisqualifyingGrade = (grade: string) => {
    updateRules({
      disqualifyingGrades: rules.disqualifyingGrades.filter((g) => g !== grade),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-charcoal-700 dark:text-charcoal-100">
            Rules & Settings
          </h2>
          <p className="text-sm text-charcoal-400 dark:text-charcoal-500 mt-1">
            Configure GWA cutoffs and disqualifying grades. Changes apply
            immediately to both calculators.
          </p>
        </div>
        {hasCustomRules && (
          <button
            onClick={resetRules}
            className="btn-secondary text-sm sm:text-xs min-h-[44px] sm:min-h-0 justify-center w-full sm:w-auto"
            id="reset-rules-btn"
          >
            <RotateCcw className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            Reset to BU Defaults
          </button>
        )}
      </div>

      {/* Custom rules warning */}
      {hasCustomRules && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-sm animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-collegiate-orange dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              Custom Rules Active
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-1">
              You are using modified rules that differ from the default BU
              Student Handbook settings. Both calculators will use these custom
              cutoffs.
            </p>
          </div>
        </div>
      )}

      {/* Semester Honors Cutoffs */}
      <div className="card">
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-4 h-4 text-sage-600 dark:text-sage-400" />
          <h3 className="text-sm font-bold text-charcoal-600 dark:text-charcoal-200 uppercase tracking-wider">
            Semester Honors Cutoffs
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* President's Lister */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 mb-1.5">
              President's Lister — Max GWA
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-charcoal-400 whitespace-nowrap">
                1.00 –
              </span>
              <input
                type="number"
                step="0.01"
                min="1.00"
                max="3.00"
                value={rules.presidentListerMax}
                onChange={(e) =>
                  handleCutoffChange('presidentListerMax', e.target.value)
                }
                className="input-field w-24 text-center tabular-nums min-h-[44px] sm:min-h-0"
                id="president-max"
              />
              {rules.presidentListerMax !== DEFAULT_RULES.presidentListerMax && (
                <span className="text-2xs text-collegiate-orange dark:text-amber-400">
                  Default: {DEFAULT_RULES.presidentListerMax}
                </span>
              )}
            </div>
          </div>

          {/* Dean's Lister */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 mb-1.5">
              Dean's Lister — Max GWA
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-charcoal-400 whitespace-nowrap">
                {(rules.presidentListerMax + 0.01).toFixed(2)} –
              </span>
              <input
                type="number"
                step="0.01"
                min="1.00"
                max="3.00"
                value={rules.deanListerMax}
                onChange={(e) =>
                  handleCutoffChange('deanListerMax', e.target.value)
                }
                className="input-field w-24 text-center tabular-nums min-h-[44px] sm:min-h-0"
                id="dean-max"
              />
              {rules.deanListerMax !== DEFAULT_RULES.deanListerMax && (
                <span className="text-2xs text-collegiate-orange dark:text-amber-400">
                  Default: {DEFAULT_RULES.deanListerMax}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Latin Honors Cutoffs */}
      <div className="card">
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-4 h-4 text-sage-600 dark:text-sage-400" />
          <h3 className="text-sm font-bold text-charcoal-600 dark:text-charcoal-200 uppercase tracking-wider">
            Latin Honors Cutoffs
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Summa Cum Laude */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 mb-1.5">
              Summa Cum Laude — Max GWA
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-charcoal-400 whitespace-nowrap">
                1.00 –
              </span>
              <input
                type="number"
                step="0.01"
                min="1.00"
                max="3.00"
                value={rules.summaCumLaudeMax}
                onChange={(e) =>
                  handleCutoffChange('summaCumLaudeMax', e.target.value)
                }
                className="input-field w-24 text-center tabular-nums min-h-[44px] sm:min-h-0"
                id="summa-max"
              />
            </div>
            {rules.summaCumLaudeMax !== DEFAULT_RULES.summaCumLaudeMax && (
              <span className="text-2xs text-collegiate-orange dark:text-amber-400 mt-1 block">
                Default: {DEFAULT_RULES.summaCumLaudeMax}
              </span>
            )}
          </div>

          {/* Magna Cum Laude */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 mb-1.5">
              Magna Cum Laude — Max GWA
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-charcoal-400 whitespace-nowrap">
                {(rules.summaCumLaudeMax + 0.01).toFixed(2)} –
              </span>
              <input
                type="number"
                step="0.01"
                min="1.00"
                max="3.00"
                value={rules.magnaCumLaudeMax}
                onChange={(e) =>
                  handleCutoffChange('magnaCumLaudeMax', e.target.value)
                }
                className="input-field w-24 text-center tabular-nums min-h-[44px] sm:min-h-0"
                id="magna-max"
              />
            </div>
            {rules.magnaCumLaudeMax !== DEFAULT_RULES.magnaCumLaudeMax && (
              <span className="text-2xs text-collegiate-orange dark:text-amber-400 mt-1 block">
                Default: {DEFAULT_RULES.magnaCumLaudeMax}
              </span>
            )}
          </div>

          {/* Cum Laude */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 mb-1.5">
              Cum Laude — Max GWA
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-charcoal-400 whitespace-nowrap">
                {(rules.magnaCumLaudeMax + 0.01).toFixed(2)} –
              </span>
              <input
                type="number"
                step="0.01"
                min="1.00"
                max="3.00"
                value={rules.cumLaudeMax}
                onChange={(e) =>
                  handleCutoffChange('cumLaudeMax', e.target.value)
                }
                className="input-field w-24 text-center tabular-nums min-h-[44px] sm:min-h-0"
                id="cum-laude-max"
              />
            </div>
            {rules.cumLaudeMax !== DEFAULT_RULES.cumLaudeMax && (
              <span className="text-2xs text-collegiate-orange dark:text-amber-400 mt-1 block">
                Default: {DEFAULT_RULES.cumLaudeMax}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Disqualifying Grades */}
      <div className="card">
        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <h3 className="text-sm font-bold text-charcoal-600 dark:text-charcoal-200 uppercase tracking-wider">
            Disqualifying Grades
          </h3>
        </div>
        <p className="text-xs text-charcoal-400 dark:text-charcoal-500 mb-4">
          Any subject with these grades will immediately disqualify the student
          from honors, regardless of GWA.
        </p>

        {/* Current disqualifying grades */}
        <div className="flex flex-wrap gap-2 mb-4">
          {rules.disqualifyingGrades.map((grade) => (
            <span
              key={grade}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-sm text-xs font-semibold text-red-700 dark:text-red-400"
            >
              {grade}
              <button
                onClick={() => removeDisqualifyingGrade(grade)}
                className="hover:text-red-900 dark:hover:text-red-300 transition-colors"
                aria-label={`Remove ${grade}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {rules.disqualifyingGrades.length === 0 && (
            <span className="text-xs text-charcoal-400 italic">
              No disqualifying grades set
            </span>
          )}
        </div>

        {/* Add new grade */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add grade (e.g., 4.0)"
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addDisqualifyingGrade()}
            className="input-field w-full sm:w-48 min-h-[44px] sm:min-h-0"
            id="new-disqualifying-grade"
          />
          <button
            onClick={addDisqualifyingGrade}
            className="btn-secondary text-sm sm:text-xs min-h-[44px] sm:min-h-0"
            disabled={!newGrade.trim()}
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Auto-save indicator */}
      <div className="flex items-center gap-2 text-2xs text-charcoal-300 dark:text-charcoal-500">
        <Save className="w-3 h-3" />
        <span>All changes are saved automatically</span>
      </div>
    </div>
  );
}
