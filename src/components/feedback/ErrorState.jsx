import React from 'react';
import { Icon } from '../Icon';
import './ErrorState.css';

export function ErrorState({ message = 'Could not load products', onRetry }) {
  const hasErrorFlag = window.location.search.includes('error=1');

  const removeErrorFlag = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('error');
    window.history.replaceState({}, '', url.toString());
    if (onRetry) onRetry();
  };

  return (
    <div className="error-state" role="alert">
      <div className="error-stamp">ARCHIVE RETRIEVAL FAILED</div>
      <h2 className="error-title">Inventory Ledger Unreachable</h2>
      <p className="error-message">{message}</p>
      {hasErrorFlag && (
        <div className="error-hint">
          <strong>Flag detected:</strong> <code>?error=1</code> simulated an API failure.
        </div>
      )}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {onRetry && (
          <button type="button" className="error-retry-btn" onClick={onRetry}>
            <Icon name="refresh" size={16} /> Re-read Ledger (Retry)
          </button>
        )}
        {hasErrorFlag && (
          <button
            type="button"
            className="error-retry-btn"
            style={{ background: 'var(--ink)', color: 'var(--paper)' }}
            onClick={removeErrorFlag}
          >
            Clear ?error=1 & Retry
          </button>
        )}
      </div>
    </div>
  );
}
