import React from 'react';
import { useToast } from '../../context/ToastContext';
import { Icon } from '../Icon';
import './ToastViewport.css';

export function ToastViewport() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-viewport" role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item toast-item--${toast.type}`}>
          <div className="toast-message">
            {toast.type === 'success' && <Icon name="check" size={16} />}
            <span className="toast-message-text">{toast.message}</span>
          </div>
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
              <Icon name="close" size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
