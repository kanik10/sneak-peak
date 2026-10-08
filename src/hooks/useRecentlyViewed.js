import { useState, useEffect, useCallback } from 'react';

const RECENTLY_VIEWED_KEY = 'sneak-peak:recently-viewed:v1';
const MAX_RECENT = 6;

function loadRecentlyViewed() {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY));
    if (Array.isArray(raw)) {
      return raw.filter((id) => typeof id === 'string').slice(0, MAX_RECENT);
    }
    return [];
  } catch {
    return [];
  }
}

export function useRecentlyViewed() {
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(loadRecentlyViewed);

  const addRecentlyViewed = useCallback((id) => {
    if (!id) return;
    setRecentlyViewedIds((prev) => {
      const next = [id, ...prev.filter((item) => item !== id)].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn('Could not save recently viewed:', err);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    // Listen for storage events in case of multiple tabs
    const handleStorage = (e) => {
      if (e.key === RECENTLY_VIEWED_KEY) {
        setRecentlyViewedIds(loadRecentlyViewed());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return { recentlyViewedIds, addRecentlyViewed };
}
