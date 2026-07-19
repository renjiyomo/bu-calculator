// ========================================
// Semester Accordion Component
// Collapsible semester section for cumulative view
// ========================================

import {
  ChevronDown,
  ChevronRight,
  Trash2,
  Pencil,
  Check,
  X,
} from 'lucide-react';
import { useState } from 'react';
import type { Semester, Subject, HonorsRules } from '../../types';
import { SubjectTable } from '../semester/SubjectTable';
import { formatGWA, computeGWA } from '../../utils/bu-computation';

interface SemesterAccordionProps {
  semester: Semester;
  rules: HonorsRules;
  onToggleCollapse: () => void;
  onRemove: () => void;
  onUpdateName: (name: string) => void;
  onAddSubject: () => void;
  onRemoveSubject: (subjectId: string) => void;
  onUpdateSubject: (subjectId: string, updates: Partial<Subject>) => void;
  showRemove: boolean;
}

export function SemesterAccordion({
  semester,
  rules,
  onToggleCollapse,
  onRemove,
  onUpdateName,
  onAddSubject,
  onRemoveSubject,
  onUpdateSubject,
  showRemove,
}: SemesterAccordionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(semester.name);

  const gwaResult = computeGWA(semester.subjects, rules);
  const filledSubjects = semester.subjects.filter((s) => s.grade !== '').length;

  const handleSaveName = () => {
    if (editName.trim()) {
      onUpdateName(editName.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(semester.name);
    setIsEditing(false);
  };

  return (
    <div className="card p-0 overflow-hidden animate-slide-down">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 bg-cream-50 dark:bg-charcoal-700/50 border-b border-charcoal-100 dark:border-charcoal-600 cursor-pointer group"
        onClick={() => !isEditing && onToggleCollapse()}
      >
        {/* Chevron */}
        <span className="text-charcoal-400 dark:text-charcoal-500">
          {semester.isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>

        {/* Semester name (editable) */}
        {isEditing ? (
          <div
            className="flex items-center gap-2 flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="input-field text-sm py-1 flex-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveName();
                if (e.key === 'Escape') handleCancelEdit();
              }}
            />
            <button
              onClick={handleSaveName}
              className="btn-ghost p-1 text-sage-600"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn-ghost p-1 text-charcoal-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-charcoal-600 dark:text-charcoal-200">
              {semester.name}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="btn-ghost p-1 opacity-0 group-hover:opacity-100"
            >
              <Pencil className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Summary stats */}
        <div className="hidden sm:flex items-center gap-4 text-2xs text-charcoal-400 dark:text-charcoal-500">
          <span>
            {filledSubjects} subject{filledSubjects !== 1 ? 's' : ''}
          </span>
          <span>{gwaResult.totalAcademicUnits} units</span>
          {gwaResult.isValid && (
            <span className="font-semibold text-charcoal-600 dark:text-charcoal-300 tabular-nums">
              GWA: {formatGWA(gwaResult.gwa)}
            </span>
          )}
          {gwaResult.hasDisqualifyingGrades && (
            <span className="text-red-500 font-semibold">⚠</span>
          )}
        </div>

        {/* Remove semester */}
        {showRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="btn-ghost p-1 opacity-0 group-hover:opacity-100 text-charcoal-300 hover:text-red-500 dark:hover:text-red-400"
            aria-label="Remove semester"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Body (subject table) */}
      {!semester.isCollapsed && (
        <div className="p-0">
          <SubjectTable
            subjects={semester.subjects}
            rules={rules}
            onUpdate={(id, updates) => onUpdateSubject(id, updates)}
            onRemove={(id) => onRemoveSubject(id)}
            onAdd={onAddSubject}
          />
        </div>
      )}
    </div>
  );
}
