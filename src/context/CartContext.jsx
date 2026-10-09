import React, { createContext, useContext, useReducer, useEffect, useMemo, useRef } from 'react';
import { loadCart, saveCart, CART_STORAGE_KEY } from '../utils/cartStorage';
import { cartReducer } from '../utils/cartReducer';
import { useToast } from './ToastContext';

export { cartReducer };
const CartContext = createContext(null);

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
      message: `Removed "${productName}" from your receipt`,
      type: 'info',
      duration: 6000,
      action: {
        label: 'Undo',
        onClick: () => {
          dispatch({ type: 'ADD', id, qty: prevQty });
          addToast({
            message: `Restored "${productName}" to your receipt`,
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
      message: `Added "${productName}" to your receipt`,
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
