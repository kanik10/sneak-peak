import React, { createContext, useContext, useReducer, useEffect, useMemo, useRef } from 'react';
import { loadCart, saveCart, CART_STORAGE_KEY } from '../utils/cartStorage';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const MAX_QTY = 10;
const clamp = (n) => Math.min(MAX_QTY, Math.max(1, n));

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        [action.id]: clamp((state[action.id] ?? 0) + (action.qty ?? 1)),
      };
    case 'SET_QTY':
      return {
        ...state,
        [action.id]: clamp(action.qty),
      };
    case 'REMOVE': {
      const { [action.id]: _, ...rest } = state;
      return rest;
    }
    case 'CLEAR':
      return {};
    case 'HYDRATE':
      return action.state || {};
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadCart);
  const { addToast } = useToast();
  const isInitialMount = useRef(true);

  // Synchronize changes to localStorage
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    saveCart(cart);
  }, [cart]);

  // Cross-tab synchronization via window storage event
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === CART_STORAGE_KEY) {
        dispatch({ type: 'HYDRATE', state: loadCart() });
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Derived values computed via useMemo, never stored
  const itemCount = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  const uniqueItemCount = useMemo(() => {
    return Object.keys(cart).length;
  }, [cart]);

  /**
   * Remove item from cart with an Undo toast capability
   */
  const removeWithUndo = (id, productName = 'Item') => {
    const prevQty = cart[id] ?? 1;
    dispatch({ type: 'REMOVE', id });

    addToast({
      message: `Removed "${productName}" from cart`,
      type: 'info',
      duration: 6000,
      action: {
        label: 'Undo',
        onClick: () => {
          dispatch({ type: 'ADD', id, qty: prevQty });
          addToast({
            message: `Restored "${productName}"`,
            type: 'success',
            duration: 2500,
          });
        },
      },
    });
  };

  const addToCart = (id, qty = 1, productName = 'Item') => {
    dispatch({ type: 'ADD', id, qty });
    addToast({
      message: `Added "${productName}" to cart`,
      type: 'success',
      duration: 3000,
    });
  };

  const setQty = (id, qty) => {
    dispatch({ type: 'SET_QTY', id, qty });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  const value = {
    cart,
    dispatch,
    itemCount,
    uniqueItemCount,
    addToCart,
    setQty,
    removeWithUndo,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
