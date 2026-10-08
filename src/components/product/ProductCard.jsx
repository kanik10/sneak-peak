import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format';
import { RatingStars } from './RatingStars';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const isOnlyOne = product.stock === 1;

  return (
    <article className="product-card" id={`product-card-${product.id}`}>
      <div className="product-card-media">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="product-card-img"
          />
        </Link>
        {isOnlyOne ? (
          <span className="product-card-stock-badge scarce">Only 1 in Archive</span>
        ) : (
          <span className="product-card-stock-badge">Stock: {product.stock}</span>
        )}
        <div
          className="product-card-accent-tag"
          style={{ backgroundColor: product.accent }}
          title={`Color Accent: ${product.accent}`}
        />
      </div>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span>{product.category}</span>
          <span>№ {product.id.substring(0, 7)}</span>
        </div>

        <h3 className="product-card-name">
          <Link to={`/product/${product.id}`} title={product.name}>
            {product.name}
          </Link>
        </h3>

        <div style={{ marginBottom: '0.75rem' }}>
          <RatingStars rating={product.rating} ratingCount={product.ratingCount} />
        </div>

        <div className="product-card-footer">
          <div className="product-card-price">{formatPrice(product.price)}</div>
          <button
            type="button"
            className="product-card-add-btn"
            onClick={() => addToCart(product.id, 1, product.name)}
            aria-label={`Add ${product.name} to receipt`}
            id={`add-btn-${product.id}`}
          >
            + Add to Receipt
          </button>
        </div>
      </div>
    </article>
  );
}
