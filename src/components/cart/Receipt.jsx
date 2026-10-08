import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductsContext';
import { formatPrice } from '../../utils/format';
import { CartLine } from './CartLine';
import { useToast } from '../../context/ToastContext';
import './Receipt.css';

export function Receipt() {
  const { cart, clearCart } = useCart();
  const { products } = useProducts();
  const { addToast } = useToast();
  const [isOrdered, setIsOrdered] = useState(false);

  // Join cart map with products, dropping any missing product IDs
  const lines = useMemo(() => {
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const product = products.find((p) => p.id === id);
        if (!product) return null;
        return { product, quantity };
      })
      .filter(Boolean);
  }, [cart, products]);

  // Derived financial values in integer cents
  const subtotal = useMemo(() => {
    return lines.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [lines]);

  const tax = useMemo(() => {
    return Math.round(subtotal * 0.08); // 8% sales tax
  }, [subtotal]);

  const total = subtotal + tax;

  const totalItemCount = useMemo(() => {
    return lines.reduce((sum, item) => sum + item.quantity, 0);
  }, [lines]);

  const handleCheckout = () => {
    setIsOrdered(true);
    addToast({
      message: '✓ Archival order recorded! Physical receipt printed.',
      type: 'success',
      duration: 5000,
    });
    clearCart();
  };

  const receiptDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  return (
    <div className="receipt-container" id="receipt-paper-view">
      <div className="receipt-tear-top" aria-hidden="true" />

      <div className="receipt-paper">
        <header className="receipt-header">
          <div className="receipt-brand">SNEAK PEAK</div>
          <div className="receipt-sub">ARCHIVAL FOOTWEAR & LEATHER GOODS</div>
          <div className="receipt-sub">EST. 1977 • TOKYO / BROOKLYN</div>

          <div className="receipt-meta">
            <span>TXN: #SKP-{Math.abs(subtotal % 99999).toString().padStart(5, '0')}</span>
            <span>{receiptDate}</span>
          </div>
        </header>

        {lines.length === 0 ? (
          <div className="receipt-empty">
            {isOrdered ? (
              <>
                <div className="receipt-stamp" style={{ marginBottom: '1.25rem' }}>
                  PAID IN FULL // DISPATCHED
                </div>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Thank you for collecting from Sneak Peak. Your parcel is being packed in archival kraft wrapping.
                </p>
                <Link to="/" className="receipt-browse-btn" onClick={() => setIsOrdered(false)}>
                  Return to Archive Catalog
                </Link>
              </>
            ) : (
              <>
                <div className="receipt-empty-stamp">RECEIPT VOID / EMPTY</div>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  No sneaker lots added to this ticket yet.
                </p>
                <Link to="/" className="receipt-browse-btn">
                  Browse Sneaker Archive
                </Link>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="receipt-items-list" role="list">
              {lines.map((item) => (
                <CartLine key={item.product.id} item={item} />
              ))}
            </div>

            <div className="receipt-summary">
              <div className="receipt-summary-row">
                <span>TOTAL ITEMS</span>
                <span>{totalItemCount} pairs</span>
              </div>
              <div className="receipt-summary-row">
                <span>SUBTOTAL</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="receipt-summary-row">
                <span>ARCHIVAL TAX (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="receipt-summary-row total">
                <span>TOTAL PAYABLE</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div className="receipt-stamp">AUTHENTICATED STOCK</div>
            </div>

            <div className="receipt-barcode" aria-hidden="true">
              <svg className="barcode-svg" viewBox="0 0 200 44" fill="currentColor">
                <rect x="0" y="0" width="3" height="40" />
                <rect x="6" y="0" width="2" height="40" />
                <rect x="11" y="0" width="6" height="40" />
                <rect x="20" y="0" width="2" height="40" />
                <rect x="25" y="0" width="4" height="40" />
                <rect x="33" y="0" width="2" height="40" />
                <rect x="38" y="0" width="8" height="40" />
                <rect x="49" y="0" width="2" height="40" />
                <rect x="54" y="0" width="4" height="40" />
                <rect x="62" y="0" width="5" height="40" />
                <rect x="70" y="0" width="3" height="40" />
                <rect x="76" y="0" width="6" height="40" />
                <rect x="85" y="0" width="2" height="40" />
                <rect x="90" y="0" width="4" height="40" />
                <rect x="97" y="0" width="5" height="40" />
                <rect x="105" y="0" width="3" height="40" />
                <rect x="111" y="0" width="2" height="40" />
                <rect x="116" y="0" width="6" height="40" />
                <rect x="125" y="0" width="3" height="40" />
                <rect x="131" y="0" width="4" height="40" />
                <rect x="138" y="0" width="2" height="40" />
                <rect x="143" y="0" width="6" height="40" />
                <rect x="152" y="0" width="3" height="40" />
                <rect x="158" y="0" width="5" height="40" />
                <rect x="166" y="0" width="2" height="40" />
                <rect x="171" y="0" width="4" height="40" />
                <rect x="178" y="0" width="6" height="40" />
                <rect x="187" y="0" width="2" height="40" />
                <rect x="192" y="0" width="4" height="40" />
                <rect x="198" y="0" width="2" height="40" />
              </svg>
              <div className="barcode-serial">0 77941 82035 9</div>
            </div>

            <div className="receipt-actions">
              <button
                type="button"
                className="receipt-clear-btn"
                onClick={clearCart}
                title="Discard current ticket"
              >
                Clear Ticket
              </button>
              <button
                type="button"
                className="receipt-checkout-btn"
                onClick={handleCheckout}
                id="receipt-checkout-btn"
              >
                Seal & Pay {formatPrice(total)}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="receipt-tear-bottom" aria-hidden="true" />
    </div>
  );
}
