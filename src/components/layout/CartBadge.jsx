import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartBadge.css';

export function CartBadge() {
  const { itemCount } = useCart();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (itemCount === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(timer);
  }, [itemCount]);

  return (
    <Link
      to="/cart"
      className="cart-badge-link"
      aria-label={`Cart with ${itemCount} items`}
      id="cart-badge-button"
    >
      <span className="cart-badge-icon" aria-hidden="true">🧾</span>
      <span className="cart-badge-label">RECEIPT</span>
      <span
        className={`cart-badge-count ${bump ? 'bump' : ''}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {itemCount}
      </span>
    </Link>
  );
}
