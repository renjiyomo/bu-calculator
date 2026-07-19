// ========================================
// Grade Select Dropdown
// Renders the BU grading scale options
// ========================================

import type { Grade } from '../../types';
import { ALL_GRADES, getGradeLabel } from '../../utils/bu-computation';

interface GradeSelectProps {
  value: Grade | '';
  onChange: (grade: Grade | '') => void;
  isDisqualified?: boolean;
  id?: string;
}

export function GradeSelect({ value, onChange, isDisqualified, id }: GradeSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange('');
      return;
    }
    // Parse as number if it's a numeric grade, otherwise keep as string
    const num = parseFloat(val);
    if (!isNaN(num)) {
      onChange(num as Grade);
    } else {
      onChange(val as Grade);
    }
  };

  return (
    <select
      id={id}
      value={String(value)}
      onChange={handleChange}
      className={`select-field ${
        isDisqualified
          ? 'border-red-400 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-900/30 dark:text-red-400'
          : ''
      }`}
    >
      <option value="">Select grade</option>
      <optgroup label="Outstanding (1.0 – 1.4)">
        {ALL_GRADES.slice(0, 5).map((g) => (
          <option key={String(g)} value={String(g)}>
            {g} — {getGradeLabel(g as Grade)}
          </option>
        ))}
      </optgroup>
      <optgroup label="Superior (1.5 – 1.9)">
        {ALL_GRADES.slice(5, 10).map((g) => (
          <option key={String(g)} value={String(g)}>
            {g} — {getGradeLabel(g as Grade)}
          </option>
        ))}
      </optgroup>
      <optgroup label="Very Satisfactory (2.0 – 2.4)">
        {ALL_GRADES.slice(10, 15).map((g) => (
          <option key={String(g)} value={String(g)}>
            {g} — {getGradeLabel(g as Grade)}
          </option>
        ))}
      </optgroup>
      <optgroup label="Satisfactory (2.5 – 2.9)">
        {ALL_GRADES.slice(15, 20).map((g) => (
          <option key={String(g)} value={String(g)}>
            {g} — {getGradeLabel(g as Grade)}
          </option>
        ))}
      </optgroup>
      <optgroup label="Fair (3.0)">
        <option value="3">3.0 — {getGradeLabel(3.0)}</option>
      </optgroup>
      <optgroup label="Other">
        <option value="5">5.0 — Failure</option>
        <option value="INC">INC — Incomplete</option>
        <option value="DRP">DRP — Dropped</option>
      </optgroup>
    </select>
  );
}
