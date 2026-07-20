// ========================================
// Subject Table Component
// Table of subject rows with header
// ========================================

import { Plus, Info } from 'lucide-react';
import type { Subject, HonorsRules } from '../../types';
import { SubjectRow } from './SubjectRow';

interface SubjectTableProps {
  subjects: Subject[];
  rules: HonorsRules;
  onUpdate: (id: string, updates: Partial<Subject>) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}

export function SubjectTable({
  subjects,
  rules,
  onUpdate,
  onRemove,
  onAdd,
}: SubjectTableProps) {
  return (
    <div className="space-y-4">
      {/* Explanation banner for PE/NSTP */}
      <div className="flex items-start gap-3 p-4 bg-sage-50 dark:bg-sage-900/20 border border-sage-200 dark:border-sage-700 rounded-sm">
        <Info className="w-4 h-4 text-sage-600 dark:text-sage-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-sage-800 dark:text-sage-300">
            About PE and NSTP Subjects
          </p>
          <p className="text-xs text-sage-600 dark:text-sage-400 mt-1 leading-relaxed">
            According to the BU Handbook, grades in Physical Education (PE) and National Service Training Program (NSTP) are <strong>not included</strong> in the computation of your General Weighted Average (GWA). Toggle the switch on for these subjects to exclude them.
          </p>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-charcoal-100 dark:border-charcoal-600 bg-cream-100 dark:bg-charcoal-700/50">
              <th className="px-3 py-3 text-2xs font-semibold text-charcoal-400 dark:text-charcoal-400 uppercase tracking-wider w-10 text-center">
                #
              </th>

              <th className="px-3 py-3 text-2xs font-semibold text-charcoal-400 dark:text-charcoal-400 uppercase tracking-wider text-center w-24">
                Units
              </th>
              <th className="px-3 py-3 text-2xs font-semibold text-charcoal-400 dark:text-charcoal-400 uppercase tracking-wider text-left w-48">
                Grade
              </th>
              <th className="px-3 py-3 text-2xs font-semibold text-charcoal-400 dark:text-charcoal-400 uppercase tracking-wider text-center w-32">
                <div className="flex flex-col items-center">
                  <span>Exclude (PE/NSTP)</span>
                </div>
              </th>
              <th className="px-3 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-50 dark:divide-charcoal-700">
            {subjects.map((subject, index) => (
              <SubjectRow
                key={subject.id}
                subject={subject}
                rules={rules}
                onUpdate={(updates) => onUpdate(subject.id, updates)}
                onRemove={() => onRemove(subject.id)}
                index={index}
                showRemove={subjects.length > 1}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Row Button */}
      <div className="border-t border-charcoal-100 dark:border-charcoal-700 px-3 py-2">
        <button
          onClick={onAdd}
          className="btn-ghost text-sage-600 dark:text-sage-400 hover:text-sage-700 dark:hover:text-sage-300 w-full justify-start"
          id="add-subject-btn"
        >
          <Plus className="w-4 h-4" />
          Add subject
        </button>
      </div>
      </div>
    </div>
  );
}
