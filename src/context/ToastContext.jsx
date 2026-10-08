import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idCounter = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * Adds a toast.
   * @param {Object} options
   * @param {string} options.message - The notification text
   * @param {'info' | 'success' | 'warn'} [options.type='info']
   * @param {number} [options.duration=4500] - Duration in ms before auto-dismiss
   * @param {{ label: string, onClick: Function }} [options.action] - Optional button (e.g. Undo)
   */
  const addToast = useCallback(({ message, type = 'info', duration = 4500, action = null }) => {
    const id = ++idCounter.current;
    const newToast = { id, message, type, action };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
