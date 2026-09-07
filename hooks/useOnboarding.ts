'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'event-gallery:onboarded';

export function useOnboarding() {
  const [dismissed, setDismissed] = useState(true); // default hidden until we've checked storage
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(STORAGE_KEY) === '1');
    } catch {
      // Storage unavailable (private browsing, etc.) — show it once and
      // don't worry about persistence.
      setDismissed(false);
    } finally {
      setReady(true);
    }
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Ignore — worst case the onboarding screen reappears next visit.
    }
  }

  return { showOnboarding: ready && !dismissed, dismiss };
}
