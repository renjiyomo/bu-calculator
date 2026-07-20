// ========================================
// Quick Entry Table
// Fast GWA input — just semester GWA + units
// For students who already know their per-semester GWA
// ========================================

import { Plus, Trash2, Info, AlertTriangle, Check, X } from 'lucide-react';
import type { QuickSemester } from '../../types';

interface QuickEntryTableProps {
  quickSemesters: QuickSemester[];
  onUpdate: (id: string, updates: Partial<QuickSemester>) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}

export function QuickEntryTable({
  quickSemesters,
  onUpdate,
  onRemove,
  onAdd,
}: QuickEntryTableProps) {
  return (
    <div className="space-y-4">
      {/* Explanation banner */}
      <div className="flex items-start gap-3 p-4 bg-sage-50 dark:bg-sage-900/20 border border-sage-200 dark:border-sage-700 rounded-sm">
        <Info className="w-4 h-4 text-sage-600 dark:text-sage-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-sage-800 dark:text-sage-300">
            Quick Entry Mode
          </p>
          <p className="text-xs text-sage-600 dark:text-sage-400 mt-1 leading-relaxed">
            Enter your <strong>semester GWA</strong> and <strong>total academic units</strong> directly
            from your Report of Grades (ROG) or transcript. This is faster than entering every subject
            individually. You can find your semester GWA on your official grade report from the Registrar.
          </p>
        </div>
      </div>

      {/* Quick entry cards */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-charcoal-100 dark:border-charcoal-600 bg-cream-100 dark:bg-charcoal-700/50">
                <th className="px-4 py-3 text-2xs font-semibold text-charcoal-400 dark:text-charcoal-400 uppercase tracking-wider text-left">
                  Semester
                </th>
                <th className="px-4 py-3 text-2xs font-semibold text-charcoal-400 dark:text-charcoal-400 uppercase tracking-wider text-center w-36">
                  <div className="flex flex-col items-center">
                    <span>Semester GWA</span>
                    <span className="font-normal normal-case tracking-normal text-charcoal-300 dark:text-charcoal-500">from your ROG</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-2xs font-semibold text-charcoal-400 dark:text-charcoal-400 uppercase tracking-wider text-center w-36">
                  <div className="flex flex-col items-center">
                    <span>Academic Units</span>
                    <span className="font-normal normal-case tracking-normal text-charcoal-300 dark:text-charcoal-500">excluding PE/NSTP</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-2xs font-semibold text-charcoal-400 dark:text-charcoal-400 uppercase tracking-wider text-center w-48">
                  <div className="flex flex-col items-center">
                    <span>Disqualifying Grade?</span>
                    <span className="font-normal normal-case tracking-normal text-charcoal-300 dark:text-charcoal-500">e.g., 5.0, INC, DRP</span>
                  </div>
                </th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-50 dark:divide-charcoal-700">
              {quickSemesters.map((qs) => (
                <tr
                  key={qs.id}
                  className={`group transition-colors duration-150 ${
                    qs.hasDisqualifyingGrade
                      ? 'row-disqualified'
                      : 'hover:bg-cream-100 dark:hover:bg-charcoal-700/50'
                  }`}
                >
                  {/* Semester name */}
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={qs.name}
                      onChange={(e) => onUpdate(qs.id, { name: e.target.value })}
                      className="input-field text-sm"
                      placeholder="e.g. Year 1 — Semester 1"
                    />
                  </td>

                  {/* GWA */}
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.0001"
                      min="1.0"
                      max="5.0"
                      value={qs.gwa === '' ? '' : qs.gwa}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdate(qs.id, {
                          gwa: val === '' ? '' : parseFloat(val),
                        });
                      }}
                      className="input-field text-sm text-center tabular-nums"
                      placeholder="e.g. 1.4500"
                    />
                  </td>

                  {/* Total Units */}
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={qs.totalUnits === '' ? '' : qs.totalUnits}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdate(qs.id, {
                          totalUnits: val === '' ? '' : parseInt(val) || '',
                        });
                      }}
                      className="input-field text-sm text-center tabular-nums"
                      placeholder="e.g. 21"
                    />
                  </td>

                  {/* Disqualifying grade flag */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() =>
                        onUpdate(qs.id, {
                          hasDisqualifyingGrade: !qs.hasDisqualifyingGrade,
                        })
                      }
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        qs.hasDisqualifyingGrade
                          ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                          : 'bg-cream-100 dark:bg-charcoal-700 text-charcoal-400 dark:text-charcoal-500 hover:bg-cream-200 dark:hover:bg-charcoal-600 border border-transparent'
                      }`}
                      title="Toggle if you received a disqualifying grade (5.0, INC, DRP) this semester"
                      type="button"
                    >
                      {qs.hasDisqualifyingGrade ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Yes
                        </>
                      ) : (
                        <>
                          <X className="w-3.5 h-3.5" />
                          No
                        </>
                      )}
                    </button>
                  </td>

                  {/* Remove */}
                  <td className="px-4 py-3 text-center">
                    {quickSemesters.length > 1 && (
                      <button
                        onClick={() => onRemove(qs.id)}
                        className="btn-ghost p-1 opacity-0 group-hover:opacity-100 text-charcoal-300 hover:text-red-500 dark:hover:text-red-400 transition-all"
                        aria-label="Remove semester"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add row */}
        <div className="border-t border-charcoal-100 dark:border-charcoal-700 px-3 py-2">
          <button
            onClick={onAdd}
            className="btn-ghost text-sage-600 dark:text-sage-400 hover:text-sage-700 dark:hover:text-sage-300 w-full justify-start"
          >
            <Plus className="w-4 h-4" />
            Add semester
          </button>
        </div>
      </div>
    </div>
  );
}
