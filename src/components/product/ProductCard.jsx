import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format';
import { RatingStars } from './RatingStars';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Icon } from '../Icon';
import './ProductCard.css';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isOnlyOne = product.stock === 1;
  const saved = isWishlisted(product.id);

  return (
    <article className="product-card" id={'product-card-' + product.id}>
      <div className="product-card-media">
        <Link to={'/product/' + product.id} aria-label={'View ' + product.name}>
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
          title={'Color Accent: ' + product.accent}
        />
      </div>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span>{product.category}</span>
          <span># {product.id.substring(0, 7)}</span>
        </div>

        <h3 className="product-card-name">
          <Link to={'/product/' + product.id} title={product.name}>
            {product.name}
          </Link>
        </h3>

        <div style={{ marginBottom: '0.75rem' }}>
          <RatingStars rating={product.rating} ratingCount={product.ratingCount} />
        </div>

        <div className="product-card-footer">
          <div className="product-card-price">{formatPrice(product.price)}</div>
          <div className="product-card-actions">
            <button
              type="button"
              className={'product-card-wishlist-btn' + (saved ? ' is-wishlisted' : '')}
              onClick={() => toggleWishlist(product)}
              aria-label={(saved ? 'Remove ' : 'Add ') + product.name + (saved ? ' from' : ' to') + ' wishlist'}
              aria-pressed={saved}
              title={saved ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Icon name="heart" size={18} />
            </button>
            <button
              type="button"
              className="product-card-add-btn"
              onClick={() => addToCart(product.id, 1, product.name)}
              aria-label={'Add ' + product.name + ' to receipt'}
              title="Add to receipt"
              id={'add-btn-' + product.id}
            >
              <Icon name="plus" size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
