import React from 'react';
import { useToast } from '../../context/ToastContext';
import './ToastViewport.css';

export function ToastViewport() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-viewport" role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item toast-item--${toast.type}`}>
          <div className="toast-message">{toast.message}</div>
          <div className="toast-actions">
            {toast.action && (
              <button
                type="button"
                className="toast-action-btn"
                onClick={() => {
                  toast.action.onClick();
                  removeToast(toast.id);
                }}
              >
                {toast.action.label}
              </button>
            )}
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
