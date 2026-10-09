import React from 'react';
import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { useProducts } from '../../context/ProductsContext';
import { formatPrice } from '../../utils/format';
import { Icon } from '../Icon';
import './RecentlyViewed.css';

export function RecentlyViewed({ currentId = null }) {
  const { recentlyViewedIds } = useRecentlyViewed();
  const { products } = useProducts();

  const recentProducts = React.useMemo(() => {
    return recentlyViewedIds
      .filter((id) => id !== currentId)
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);
  }, [recentlyViewedIds, currentId, products]);

  if (recentProducts.length === 0) return null;

  return (
    <section className="recently-viewed-section" aria-label="Recently viewed sneakers">
      <div className="recently-viewed-header">
        <h3 className="recently-viewed-title">
          <Icon name="history" size={18} /> Recent Archival Views
        </h3>
        <span className="font-mono text-muted" style={{ fontSize: '0.8rem' }}>
          {recentProducts.length} recorded
        </span>
      </div>

      <div className="recently-viewed-grid">
        {recentProducts.map((p) => (
          <Link
            to={`/product/${p.id}`}
            key={p.id}
            className="recently-viewed-card"
          >
            <img src={p.image} alt="" className="recently-viewed-img" loading="lazy" />
            <div className="recently-viewed-name" title={p.name}>
              {p.name}
            </div>
            <div className="recently-viewed-price">{formatPrice(p.price)}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
