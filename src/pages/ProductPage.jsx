import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { formatPrice } from '../utils/format';
import { RatingStars } from '../components/product/RatingStars';
import { QuantityStepper } from '../components/cart/QuantityStepper';
import { RecentlyViewed } from '../components/product/RecentlyViewed';
import { NotFoundPage } from './NotFoundPage';
import { Icon } from '../components/Icon';
import './ProductPage.css';

export function ProductPage() {
  const { id } = useParams();
  const { products, status } = useProducts();
  const { addToCart } = useCart();
  const { addRecentlyViewed } = useRecentlyViewed();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product, addRecentlyViewed]);

  if (status === 'loading') {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <p className="font-mono text-muted">Retrieving sneaker archive dossier...</p>
      </div>
    );
  }

  if (status === 'success' && !product) {
    return <NotFoundPage customMessage={`No sneaker found matching archival reference "${id}".`} />;
  }

  if (!product) return null;

  const isScarce = product.stock <= 2;

  return (
    <div
      className="container product-detail-view"
      style={{ '--accent': product.accent }}
      id={`product-page-${product.id}`}
    >
      <nav className="product-back-nav" aria-label="Breadcrumb">
        <Link to="/" className="back-link">
          <Icon name="arrow-left" size={16} /> Return to Archive Index
        </Link>
      </nav>

      <div className="product-detail-grid">
        <div className="product-showcase-media">
          <img
            src={product.image}
            alt={product.name}
            className="product-showcase-img"
          />
          <div className="product-showcase-badge">
            LOT #{product.id.slice(0, 8).toUpperCase()}
          </div>
        </div>

        <div className="product-info-panel">
          <div className="product-category-tag">
            {product.category} // ARCHIVE SPEC
          </div>

          <h1 className="product-detail-title">{product.name}</h1>

          <div style={{ marginBottom: '0.75rem' }}>
            <RatingStars rating={product.rating} ratingCount={product.ratingCount} />
          </div>

          <div className="product-price-tag">
            <span>{formatPrice(product.price)}</span>
            <span className={`product-stock-tag ${isScarce ? 'scarce' : ''}`}>
              {product.stock === 1 ? <><Icon name="warning" size={14} /> Only 1 remaining!</> : `${product.stock} in inventory`}
            </span>
          </div>

          <p className="product-desc-text">
            {product.description}
          </p>

          <div className="product-purchase-box">
            <QuantityStepper
              quantity={qty}
              onIncrement={() => setQty((q) => Math.min(Math.min(10, product.stock), q + 1))}
              onDecrement={() => setQty((q) => Math.max(1, q - 1))}
              max={Math.min(10, product.stock)}
            />

            <button
              type="button"
              className="product-add-cart-btn"
              onClick={() => addToCart(product.id, qty, product.name)}
              id="add-to-cart-detail-btn"
            >
              Add {qty > 1 ? `(${qty})` : ''} to Receipt / {formatPrice(product.price * qty)}
            </button>
          </div>

          <div className="specs-ledger">
            <div className="specs-ledger-title">Archival Ledger Specifications</div>
            <div className="specs-grid">
              <span className="spec-key">Archival Code</span>
              <span className="spec-val">SKP-{product.id.slice(0, 6).toUpperCase()}</span>

              <span className="spec-key">Accent Formula</span>
              <span className="spec-val" style={{ color: product.accent }}>{product.accent}</span>

              <span className="spec-key">Sole Compound</span>
              <span className="spec-val">Vulcanized Gum / Crepe</span>

              <span className="spec-key">Packaging</span>
              <span className="spec-val">280gsm Kraft Box</span>
            </div>
          </div>
        </div>
      </div>

      <RecentlyViewed currentId={product.id} />
    </div>
  );
}
