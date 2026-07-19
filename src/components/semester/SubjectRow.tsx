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
      className={`group transition-colors duration-150 ${
        isDisqualified
          ? 'row-disqualified'
          : 'hover:bg-cream-100 dark:hover:bg-charcoal-700/50'
      } ${subject.isPeNstp ? 'opacity-60' : ''}`}
    >
      {/* Row number */}
      <td className="px-3 py-2.5 text-2xs text-charcoal-300 dark:text-charcoal-500 font-mono w-10 text-center">
        {index + 1}
      </td>

      {/* Subject Code */}
      <td className="px-3 py-2.5">
        <input
          type="text"
          placeholder="e.g. CS 101"
          value={subject.subjectCode}
          onChange={(e) => onUpdate({ subjectCode: e.target.value })}
          className="input-field text-sm"
          id={`subject-code-${subject.id}`}
        />
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

      {/* PE/NSTP Toggle */}
      <td className="px-3 py-2.5 w-24 text-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={subject.isPeNstp}
            onChange={(e) => onUpdate({ isPeNstp: e.target.checked })}
            className="sr-only peer"
            id={`pe-nstp-${subject.id}`}
          />
          <div className="w-8 h-4.5 bg-charcoal-200 dark:bg-charcoal-600 peer-focus:ring-2 peer-focus:ring-sage-500/20 rounded-sm peer peer-checked:after:translate-x-full peer-checked:bg-sage-500 dark:peer-checked:bg-sage-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-sm after:h-3.5 after:w-3.5 after:transition-all"></div>
        </label>
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
