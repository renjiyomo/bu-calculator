// ========================================
// Subject Row Component
// A single subject input row with all fields
// ========================================

import { Trash2, Check, X } from 'lucide-react';
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
      className={`group transition-colors duration-150 ${
        isDisqualified
          ? 'row-disqualified'
          : 'hover:bg-cream-100 dark:hover:bg-charcoal-700/50'
      } ${subject.isNstp ? 'opacity-60' : ''}`}
    >
      {/* Row number */}
      <td className="px-3 py-2.5 text-2xs text-charcoal-300 dark:text-charcoal-500 font-mono w-10 text-center">
        {index + 1}
      </td>



      {/* Units */}
      <td className="px-3 py-2.5 w-24">
        <input
          type="number"
          min={1}
          max={12}
          value={subject.units}
          onChange={(e) =>
            onUpdate({ units: Math.max(1, parseInt(e.target.value) || 1) })
          }
          className="input-field text-sm text-center"
          id={`units-${subject.id}`}
        />
      </td>

      {/* Grade */}
      <td className="px-3 py-2.5 w-48">
        <GradeSelect
          value={subject.grade}
          onChange={(grade) => onUpdate({ grade })}
          isDisqualified={isDisqualified}
          id={`grade-${subject.id}`}
        />
      </td>

      {/* NSTP Toggle */}
      <td className="px-3 py-2.5 w-32 text-center">
        <button
          onClick={() => onUpdate({ isNstp: !subject.isNstp })}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            subject.isNstp
              ? 'bg-sage-100 dark:bg-sage-900/40 text-sage-700 dark:text-sage-400 border border-sage-200 dark:border-sage-700'
              : 'bg-cream-100 dark:bg-charcoal-700 text-charcoal-400 dark:text-charcoal-500 hover:bg-cream-200 dark:hover:bg-charcoal-600 border border-transparent'
          }`}
          title="Toggle whether to exclude this NSTP subject"
          type="button"
        >
          {subject.isNstp ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Excluded
            </>
          ) : (
            <>
              <X className="w-3.5 h-3.5" />
              Included
            </>
          )}
        </button>
      </td>

      {/* Remove */}
      <td className="px-3 py-2.5 w-12 text-center">
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
