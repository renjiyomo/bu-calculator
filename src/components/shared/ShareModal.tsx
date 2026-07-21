import { X, Share2 } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShareableResultCard } from './ShareableResultCard';
import type { SemesterSummary, Subject } from '../../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'semester' | 'latin';
  gwa: number;
  honorLabel?: string;
  totalUnits: number;
  userName: string;
  onNameChange: (name: string) => void;
  semesterSummaries?: SemesterSummary[];
  subjects?: Subject[];
}

export function ShareModal({
  isOpen,
  onClose,
  type,
  gwa,
  honorLabel,
  totalUnits,
  userName,
  onNameChange,
  semesterSummaries,
  subjects,
}: ShareModalProps) {
  // Lock body scroll and close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Dialog container — scrollable, full height aware, scrollbar hidden */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-4 flex flex-col max-h-[96vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Header row: title + close */}
        <div className="flex items-center justify-between mb-5 flex-shrink-0">
          <div className="flex items-center gap-2 text-white/80">
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Result Card</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card */}
        <div className="animate-slide-up flex-shrink-0">
          <ShareableResultCard
            type={type}
            gwa={gwa}
            honorLabel={honorLabel ?? null}
            totalUnits={totalUnits}
            userName={userName}
            onNameChange={onNameChange}
            semesterSummaries={semesterSummaries}
            subjects={subjects}
          />
        </div>

        {/* Hint */}
        <p className="text-center text-white/40 text-xs mt-5 flex-shrink-0">
          Tap your name to edit · Screenshot to share
        </p>
      </div>
    </div>,
    document.body
  );
}
