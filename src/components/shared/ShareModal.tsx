import { X } from 'lucide-react';
import { ShareableResultCard } from './ShareableResultCard';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Props for ShareableResultCard
  type: 'semester' | 'latin';
  gwa: number;
  honorLabel?: string;
  totalUnits: number;
  userName: string;
  onNameChange: (name: string) => void;
  semesterSummaries?: any[];
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
}: ShareModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-md animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button outside the card for clean screenshots */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* The Card */}
        <div className="shadow-2xl ring-1 ring-white/10 rounded-[2rem]">
          <ShareableResultCard
            type={type}
            gwa={gwa}
            honorLabel={honorLabel}
            totalUnits={totalUnits}
            userName={userName}
            onNameChange={onNameChange}
            semesterSummaries={semesterSummaries}
          />
        </div>
        
        <p className="text-center text-white/60 text-xs mt-4">
          Type your name, then take a screenshot to share!
        </p>
      </div>
    </div>,
    document.body
  );
}
