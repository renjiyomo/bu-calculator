import { useState, useRef, useEffect } from 'react';
import { Trophy, Medal, Star, Pencil } from 'lucide-react';
import { formatGWA } from '../../utils/bu-computation';
import type { SemesterSummary } from '../../types';
import { useApp } from '../../context/AppContext';

interface ShareableResultCardProps {
  type: 'semester' | 'latin';
  gwa: number;
  honorLabel: string | null;
  totalUnits: number;
  userName: string;
  onNameChange: (name: string) => void;
  semesterSummaries?: SemesterSummary[];
}

export function ShareableResultCard({
  type,
  gwa,
  honorLabel,
  totalUnits,
  userName,
  onNameChange,
  semesterSummaries,
}: ShareableResultCardProps) {
  const { rules } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  // Determine styles and icons based on honor level
  let badgeColors = 'from-charcoal-700 to-charcoal-800 text-charcoal-200';
  let Icon = Star;
  
  if (honorLabel?.includes('President') || honorLabel?.includes('Summa')) {
    badgeColors = 'from-yellow-400 to-yellow-600 text-white shadow-yellow-500/30';
    Icon = Trophy;
  } else if (honorLabel?.includes("Dean") || honorLabel?.includes('Magna')) {
    badgeColors = 'from-sage-400 to-sage-600 text-white shadow-sage-500/30';
    Icon = Medal;
  } else if (honorLabel?.includes('Cum Laude')) {
    badgeColors = 'from-blue-400 to-blue-600 text-white shadow-blue-500/30';
    Icon = Medal;
  } else {
    // No honors
    badgeColors = 'from-charcoal-400 to-charcoal-500 text-white shadow-charcoal-500/20';
  }

  const title = type === 'semester' ? 'Semester GWA' : 'Cumulative GWA';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-charcoal-800 p-8 sm:p-10 shadow-xl border border-charcoal-200 dark:border-charcoal-700">
      
      <div className="relative z-10 flex flex-col gap-8">
        
        {/* Header / Name */}
        <div className="flex flex-col items-center text-center gap-2">
          
          <div className="relative group inline-flex items-center justify-center min-h-[40px]">
            {isEditing || !userName ? (
              <input
                ref={inputRef}
                type="text"
                value={userName}
                onChange={(e) => onNameChange(e.target.value)}
                onFocus={() => setIsEditing(true)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Enter your name..."
                className="bg-transparent border-b-2 border-charcoal-200 dark:border-charcoal-600 text-charcoal-800 dark:text-charcoal-100 text-xl sm:text-2xl font-bold text-center focus:outline-none focus:border-sage-500 transition-colors w-full max-w-[300px] placeholder-charcoal-300 dark:placeholder-charcoal-600"
              />
            ) : (
              <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setIsEditing(true)}
                title="Click to edit name"
              >
                <h3 className="text-charcoal-800 dark:text-charcoal-100 text-xl sm:text-2xl font-bold tracking-tight">
                  {userName}
                </h3>
                <Pencil className="w-4 h-4 text-charcoal-300 dark:text-charcoal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
        </div>

        {/* Big GWA Display */}
        <div className="flex flex-col items-center text-center gap-1">
          <p className="text-charcoal-400 dark:text-charcoal-400 text-xs font-semibold uppercase tracking-[0.15em]">
            {title}
          </p>
          <div className="text-5xl sm:text-6xl font-bold text-charcoal-800 dark:text-charcoal-100 tabular-nums tracking-tighter my-2">
            {formatGWA(gwa)}
          </div>
          <p className="text-charcoal-500 dark:text-charcoal-400 text-xs font-medium">
            Based on {totalUnits} total academic units
          </p>
        </div>

        {/* Honors Badge */}
        <div className="flex justify-center mt-4">
          {honorLabel ? (
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${badgeColors}`}>
              <Icon className="w-4 h-4 drop-shadow-sm" />
              <span className="font-semibold tracking-wide text-sm drop-shadow-sm">
                {honorLabel}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal-100 dark:bg-charcoal-700/50 border border-charcoal-200 dark:border-charcoal-600">
              <span className="text-charcoal-500 dark:text-charcoal-400 font-medium text-sm">
                No Honors
              </span>
            </div>
          )}
        </div>

        {/* Semester Breakdown for Latin Honors */}
        {type === 'latin' && semesterSummaries && semesterSummaries.length > 0 && (
          <div className="mt-4 pt-6 border-t border-charcoal-100 dark:border-charcoal-700/50 flex flex-col gap-3">
            <p className="text-charcoal-400 dark:text-charcoal-500 text-[10px] font-bold uppercase tracking-widest text-center mb-1">
              Semester Breakdown
            </p>
            <div className="grid grid-cols-1 gap-2">
              {semesterSummaries
                .filter((s) => s.subjectCount > 0 || s.totalUnits > 0)
                .map((summary) => {
                  let semHonorLabel = '—';
                  let honorColor = 'text-charcoal-400 dark:text-charcoal-500';
                  
                  if (summary.hasIssues) {
                    semHonorLabel = 'Disqualified';
                    honorColor = 'text-red-500 font-semibold';
                  } else if (summary.gwa > 0) {
                    if (summary.gwa >= 1.0 && summary.gwa <= rules.presidentListerMax) {
                      semHonorLabel = "President's Lister";
                      honorColor = 'text-yellow-600 dark:text-yellow-500 font-semibold';
                    } else if (summary.gwa > rules.presidentListerMax && summary.gwa <= rules.deanListerMax) {
                      semHonorLabel = "Dean's Lister";
                      honorColor = 'text-sage-600 dark:text-sage-400 font-semibold';
                    }
                  }
                  
                  return (
                    <div 
                      key={summary.semesterId} 
                      className="flex items-center justify-between gap-4 text-xs bg-charcoal-50 dark:bg-charcoal-700/30 px-4 py-2.5 rounded-xl border border-charcoal-100 dark:border-charcoal-700/50"
                    >
                      <span className="font-medium text-charcoal-700 dark:text-charcoal-200 truncate min-w-0 flex-1">
                        {summary.semesterName}
                      </span>
                      <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                        <span className="tabular-nums font-bold text-charcoal-800 dark:text-charcoal-100">
                          {formatGWA(summary.gwa)}
                        </span>
                        <span className={`w-24 sm:w-28 text-right truncate ${honorColor}`}>
                          {semHonorLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
