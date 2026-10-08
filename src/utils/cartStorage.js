export const CART_STORAGE_KEY = 'sneak-peak:cart:v1';
const MAX_QTY = 10;

/**
 * Loads cart state from localStorage with defensive sanitization.
 * Never trust what's in localStorage.
 */
export function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    return Object.fromEntries(
      Object.entries(raw)
        .filter(([id, q]) => typeof id === 'string' && Number.isInteger(q) && q > 0)
        .map(([id, q]) => [id, Math.min(q, MAX_QTY)])
    );
  } catch {
    return {};
  }
}

/**
 * Persists cart state to localStorage safely.
 */
export function saveCart(state) {
  try {
    if (!state || Object.keys(state).length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
    } else {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    }
  } catch (err) {
    console.warn('Failed to persist cart to localStorage:', err);
  }
}
