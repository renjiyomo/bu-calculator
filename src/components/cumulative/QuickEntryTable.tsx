// ========================================
// Quick Entry Table
// Fast GWA input — just semester GWA + units
// For students who already know their per-semester GWA
// ========================================

import { Plus, Trash2, Info, Check, X } from 'lucide-react';
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
            Enter your <strong>semester GWA</strong> and <strong>total academic units</strong>. This is faster than entering every subject
            individually if you already know your GWA per semester.
          </p>
        </div>
      </div>

      {/* Quick entry cards */}
      <div className="card p-0 overflow-hidden border-0 sm:border border-charcoal-200 dark:border-charcoal-700 bg-transparent sm:bg-white dark:sm:bg-charcoal-800 shadow-none sm:shadow-sm">
        <div className="overflow-x-auto sm:overflow-visible">
          <table className="w-full block sm:table">
            <thead className="hidden sm:table-header-group">
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
                    <span className="font-normal normal-case tracking-normal text-charcoal-300 dark:text-charcoal-500">excluding NSTP</span>
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
            <tbody className="divide-y divide-charcoal-50 dark:divide-charcoal-700 block sm:table-row-group space-y-3 sm:space-y-0 p-3 sm:p-0">
              {quickSemesters.map((qs) => (
                <tr
                  key={qs.id}
                  className={`group transition-colors duration-150 grid grid-cols-2 sm:table-row p-3.5 sm:p-0 mb-3 sm:mb-0 rounded-xl sm:rounded-none border border-charcoal-200 dark:border-charcoal-700/50 sm:border-0 bg-white dark:bg-charcoal-800/40 sm:bg-transparent shadow-2xs sm:shadow-none gap-x-2 gap-y-1.5 sm:gap-0 ${
                    qs.hasDisqualifyingGrade
                      ? 'row-disqualified'
                      : 'hover:bg-cream-100 dark:hover:bg-charcoal-700/50'
                  }`}
                >
                  {/* Semester name / Remove (Mobile Header) */}
                  <td className="col-span-2 sm:table-cell px-0 sm:px-4 py-1 sm:py-3 flex flex-col sm:table-cell border-b border-charcoal-100 dark:border-charcoal-700/50 sm:border-0 pb-2 sm:pb-3">
                    <div className="flex justify-between items-center w-full mb-1.5 sm:hidden">
                      <span className="text-2xs font-semibold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider">Semester</span>
                      
                      <div className="flex items-center gap-3 sm:hidden">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider">Disq?</span>
                          <button
                            onClick={() =>
                              onUpdate(qs.id, {
                                hasDisqualifyingGrade: !qs.hasDisqualifyingGrade,
                              })
                            }
                            className={`inline-flex items-center justify-center px-2 py-1 rounded text-2xs font-semibold transition-all ${
                              qs.hasDisqualifyingGrade
                                ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                                : 'bg-cream-100 dark:bg-charcoal-700 text-charcoal-400 dark:text-charcoal-500 border border-transparent'
                            }`}
                            type="button"
                          >
                            {qs.hasDisqualifyingGrade ? 'Yes' : 'No'}
                          </button>
                        </div>
                        {quickSemesters.length > 1 && (
                          <button
                            onClick={() => onRemove(qs.id)}
                            className="text-red-500 hover:text-red-600 p-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-all"
                            aria-label="Remove semester"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <input
                      type="text"
                      value={qs.name}
                      onChange={(e) => onUpdate(qs.id, { name: e.target.value })}
                      className="input-field text-sm w-full"
                      placeholder="e.g. Year 1 — Semester 1"
                    />
                  </td>

                  {/* GWA */}
                  <td className="col-span-1 sm:table-cell px-0 sm:px-4 py-1 sm:py-3 flex flex-col sm:table-cell justify-between items-start sm:items-center w-full sm:w-36 gap-1 sm:gap-0">
                    <span className="sm:hidden text-[9px] font-bold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider">GWA</span>
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
                      className="input-field text-sm text-center tabular-nums w-full"
                      placeholder="GWA"
                    />
                  </td>

                  {/* Total Units */}
                  <td className="col-span-1 sm:table-cell px-0 sm:px-4 py-1 sm:py-3 flex flex-col sm:table-cell justify-between items-start sm:items-center w-full sm:w-36 gap-1 sm:gap-0">
                    <span className="sm:hidden text-[9px] font-bold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider">Units</span>
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
                      className="input-field text-sm text-center tabular-nums w-full"
                      placeholder="Units"
                    />
                  </td>

                  {/* Disqualifying grade flag (Desktop only) */}
                  <td className="hidden sm:table-cell px-4 py-3 w-48 text-center">
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

                  {/* Remove (Desktop only) */}
                  <td className="hidden sm:table-cell px-4 py-3 w-12 text-center">
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
