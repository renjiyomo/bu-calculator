// ========================================
// Subject Row Component
// A single subject input row with all fields
// ========================================

import { Trash2 } from 'lucide-react';
import type { Subject, Grade, HonorsRules } from '../../types';
import { GradeSelect } from '../shared/GradeSelect';
import { isDisqualifyingGrade } from '../../utils/bu-computation';

interface SubjectRowProps {
  subject: Subject;
  rules: HonorsRules;
  onUpdate: (updates: Partial<Subject>) => void;
  onRemove: () => void;
  index: number;
  showRemove: boolean;
}

export function SubjectRow({
  subject,
  rules,
  onUpdate,
  onRemove,
  index,
  showRemove,
}: SubjectRowProps) {
  const isDisqualified =
    subject.grade !== '' &&
    isDisqualifyingGrade(subject.grade as Grade, rules);

  return (
    <tr
      className={`group transition-colors duration-150 grid grid-cols-2 sm:table-row p-4 sm:p-0 mb-3 sm:mb-0 rounded-[16px] sm:rounded-none border-0 sm:border-0 bg-white dark:bg-charcoal-800/40 sm:bg-transparent shadow-sm sm:shadow-none gap-x-3 gap-y-2 sm:gap-0 ${
        isDisqualified
          ? 'row-disqualified'
          : 'hover:bg-cream-100 dark:hover:bg-charcoal-700/50'
      } ${subject.isNstp ? 'opacity-60' : ''}`}
    >
      {/* Row Header / Delete (Mobile) or Row Number (Desktop) */}
      <td className="col-span-2 sm:table-cell px-0 sm:px-3 py-1 sm:py-2.5 flex sm:table-cell justify-between items-center sm:text-center w-full sm:w-10 sm:border-0 pb-2 sm:pb-2.5">
        <span className="sm:hidden text-xs font-mono font-bold text-charcoal-500 dark:text-charcoal-400">Subject #{index + 1}</span>
        
        {/* Mobile controls: Exclude NSTP toggle + Delete Button */}
        <div className="flex items-center gap-3 sm:hidden">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider">Exclude NSTP</span>
            <button
              onClick={() => onUpdate({ isNstp: !subject.isNstp })}
              className={`inline-flex items-center justify-center px-4 py-2 min-h-[32px] rounded-lg text-xs font-semibold transition-all ${
                subject.isNstp
                  ? 'bg-sage-100 dark:bg-sage-900/40 text-sage-700 dark:text-sage-400 border border-sage-200 dark:border-sage-700'
                  : 'bg-cream-100 dark:bg-charcoal-700 text-charcoal-400 dark:text-charcoal-500 border border-transparent'
              }`}
              title="Toggle whether to exclude this NSTP subject"
              type="button"
            >
              {subject.isNstp ? 'Yes' : 'No'}
            </button>
          </div>
          {showRemove && (
            <button
              onClick={onRemove}
              className="text-red-500 hover:text-red-600 p-2 min-h-[44px] min-w-[44px] hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-all flex items-center justify-center"
              aria-label="Remove subject"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <span className="hidden sm:inline text-2xs text-charcoal-300 dark:text-charcoal-500 font-mono">{index + 1}</span>
      </td>

      {/* Units */}
      <td className="col-span-1 sm:table-cell px-0 sm:px-3 py-1 sm:py-2.5 flex flex-col sm:table-cell justify-between items-start sm:items-center w-full sm:w-24 gap-1 sm:gap-0">
        <span className="sm:hidden text-[9px] font-bold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider">Units</span>
        <input
          type="number"
          min={1}
          max={12}
          value={subject.units}
          onChange={(e) =>
            onUpdate({ units: Math.max(1, parseInt(e.target.value) || 1) })
          }
          className="input-field text-base sm:text-sm text-center w-full min-h-[44px] sm:min-h-0"
          id={`units-${subject.id}`}
        />
      </td>

      {/* Grade */}
      <td className="col-span-1 sm:table-cell px-0 sm:px-3 py-1 sm:py-2.5 flex flex-col sm:table-cell justify-between items-start sm:items-center w-full sm:w-48 gap-1 sm:gap-0">
        <span className="sm:hidden text-[9px] font-bold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider">Grade</span>
        <div className="w-full">
          <GradeSelect
            value={subject.grade}
            onChange={(grade) => onUpdate({ grade })}
            isDisqualified={isDisqualified}
            id={`grade-${subject.id}`}
          />
        </div>
      </td>

      {/* NSTP Toggle (Desktop only) */}
      <td className="hidden sm:table-cell px-3 py-2.5 w-32 text-center">
        <button
          onClick={() => onUpdate({ isNstp: !subject.isNstp })}
          className={`inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg text-xs font-semibold sm:font-medium transition-all ${
            subject.isNstp
              ? 'bg-sage-100 dark:bg-sage-900/40 text-sage-700 dark:text-sage-400 border border-sage-200 dark:border-sage-700'
              : 'bg-cream-100 dark:bg-charcoal-700 text-charcoal-400 dark:text-charcoal-500 border border-transparent'
          }`}
          title="Toggle whether to exclude this NSTP subject"
          type="button"
        >
          {subject.isNstp ? 'Yes' : 'No'}
        </button>
      </td>

      {/* Remove (Desktop only) */}
      <td className="hidden sm:table-cell px-3 py-2.5 w-12 text-center">
        {showRemove && (
          <button
            onClick={onRemove}
            className="btn-ghost p-1 opacity-0 group-hover:opacity-100 text-charcoal-300 hover:text-red-500 dark:hover:text-red-400 transition-all"
            aria-label="Remove subject"
            id={`remove-${subject.id}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </td>
    </tr>
  );
}
