import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the app is currently running in standalone mode (installed PWA or TWA)
 */
export function useIsPWA() {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Check if the app is running in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    // Also check for iOS Safari standalone mode (fallback)
    const isIOSStandalone = ('standalone' in navigator) && (navigator as any).standalone;

    if (isStandalone || isIOSStandalone) {
      setIsPWA(true);
    }
  }, []);

  return isPWA;
}
