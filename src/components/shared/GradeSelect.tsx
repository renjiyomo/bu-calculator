// ========================================
// Grade Select Dropdown
// Renders the BU grading scale options
// ========================================

import { useState, useEffect } from 'react';
import type { Grade } from '../../types';
import { ALL_GRADES, getGradeLabel } from '../../utils/bu-computation';

interface GradeSelectProps {
  value: Grade | '';
  onChange: (grade: Grade | '') => void;
  isDisqualified?: boolean;
  id?: string;
}

export function GradeSelect({ value, onChange, isDisqualified, id }: GradeSelectProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <option value="">{isMobile ? 'Grade' : 'Select grade'}</option>
      <optgroup label={isMobile ? "1.0 - 1.4" : "Outstanding (1.0 – 1.4)"}>
        {ALL_GRADES.slice(0, 5).map((g) => (
          <option key={String(g)} value={String(g)}>
            {isMobile ? String(g) : `${g} — ${getGradeLabel(g as Grade)}`}
          </option>
        ))}
      </optgroup>
      <optgroup label={isMobile ? "1.5 - 1.9" : "Superior (1.5 – 1.9)"}>
        {ALL_GRADES.slice(5, 10).map((g) => (
          <option key={String(g)} value={String(g)}>
            {isMobile ? String(g) : `${g} — ${getGradeLabel(g as Grade)}`}
          </option>
        ))}
      </optgroup>
      <optgroup label={isMobile ? "2.0 - 2.4" : "Very Satisfactory (2.0 – 2.4)"}>
        {ALL_GRADES.slice(10, 15).map((g) => (
          <option key={String(g)} value={String(g)}>
            {isMobile ? String(g) : `${g} — ${getGradeLabel(g as Grade)}`}
          </option>
        ))}
      </optgroup>
      <optgroup label={isMobile ? "2.5 - 2.9" : "Satisfactory (2.5 – 2.9)"}>
        {ALL_GRADES.slice(15, 20).map((g) => (
          <option key={String(g)} value={String(g)}>
            {isMobile ? String(g) : `${g} — ${getGradeLabel(g as Grade)}`}
          </option>
        ))}
      </optgroup>
      <optgroup label={isMobile ? "3.0" : "Fair (3.0)"}>
        <option value="3">{isMobile ? '3.0' : `3.0 — ${getGradeLabel(3.0)}`}</option>
      </optgroup>
      <optgroup label="Other">
        <option value="5">{isMobile ? '5.0' : '5.0 — Failure'}</option>
        <option value="INC">{isMobile ? 'INC' : 'INC — Incomplete'}</option>
        <option value="DRP">{isMobile ? 'DRP' : 'DRP — Dropped'}</option>
      </optgroup>
    </select>
  );
}
