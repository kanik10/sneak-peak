import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useToast } from './ToastContext';

export const WISHLIST_STORAGE_KEY = 'sneak-peak:wishlist';

function loadWishlist() {
  try {
    const stored = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(loadWishlist);
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === WISHLIST_STORAGE_KEY) {
        setWishlistIds(loadWishlist());
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleWishlist = (product) => {
    const isSaved = wishlistIds.includes(product.id);
    const next = isSaved
      ? wishlistIds.filter((id) => id !== product.id)
      : [...wishlistIds, product.id];

    setWishlistIds(next);
    addToast({
      message: isSaved
          ? 'Removed "' + product.name + '" from your wishlist'
          : 'Added "' + product.name + '" to your wishlist',
      type: 'success',
      duration: 2500,
    });
  };

  const clearWishlist = () => {
    if (wishlistIds.length === 0) return;
    setWishlistIds([]);
    addToast({
      message: 'Wishlist cleared',
      type: 'info',
      duration: 2500,
    });
  };

  const value = useMemo(() => ({
    wishlistIds,
    wishlistCount: wishlistIds.length,
    isWishlisted: (id) => wishlistIds.includes(id),
    toggleWishlist,
    clearWishlist,
  }), [wishlistIds, addToast]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
