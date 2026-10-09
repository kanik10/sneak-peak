import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { Icon } from '../components/Icon';
import './WishlistPage.css';

export function WishlistPage() {
  const { products, status } = useProducts();
  const { wishlistIds, wishlistCount, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistProducts = useMemo(() => (
    wishlistIds
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean)
  ), [products, wishlistIds]);

  const addAllToReceipt = () => {
    wishlistProducts.forEach((product) => {
      if (product.stock > 0) addToCart(product.id, 1, product.name);
    });
  };

  if (status === 'loading') {
    return (
      <div className="container wishlist-loading">
        <p className="font-mono text-muted">Reading saved archive records...</p>
      </div>
    );
  }

  return (
    <div className="container wishlist-page">
      <header className="wishlist-header">
        <div>
          <span className="wishlist-kicker">SAVED ARCHIVE / {String(wishlistCount).padStart(2, '0')} LOTS</span>
          <h1 className="wishlist-title">Your Wishlist</h1>
          <p className="wishlist-description">
            Keep your next pairs close. Saved silhouettes stay here until you are ready to collect them.
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <div className="wishlist-header-actions">
            <button type="button" className="wishlist-secondary-btn" onClick={clearWishlist}>
              Clear Wishlist
            </button>
            <button type="button" className="wishlist-primary-btn" onClick={addAllToReceipt}>
              <Icon name="plus" size={16} /> Add All to Receipt
            </button>
          </div>
        )}
      </header>

      {wishlistProducts.length > 0 ? (
        <>
          <div className="wishlist-summary">
            <span>{wishlistProducts.length} {wishlistProducts.length === 1 ? 'silhouette' : 'silhouettes'} saved</span>
            <Link to="/cart">View Receipt <Icon name="arrow-right" size={15} /></Link>
          </div>
          <ProductGrid products={wishlistProducts} />
        </>
      ) : (
        <section className="wishlist-empty" aria-live="polite">
          <Icon name="heart" size={42} className="wishlist-empty-icon" />
          <h2>No saved silhouettes yet</h2>
          <p>Tap the heart on any sneaker card to build your personal archive.</p>
          <Link to="/" className="wishlist-browse-btn">Browse the Archive</Link>
        </section>
      )}
    </div>
  );
}
