import React from 'react';
import { Link } from 'react-router-dom';
import { Receipt } from '../components/cart/Receipt';

export function CartPage() {
  return (
    <div className="container" style={{ padding: '1rem 1rem 3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: '0.5rem',
          }}
        >
          ← Continue Browsing Sneakers
        </Link>
      </div>

      <Receipt />
    </div>
  );
}
