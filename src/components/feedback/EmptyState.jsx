import React from 'react';
import { useProducts } from '../../context/ProductsContext';
import { Icon } from '../Icon';
import './EmptyState.css';

export function EmptyState({ filters = {}, onClearFilters, onSelectCategory }) {
  const { products } = useProducts();
  const { q = '', cat = 'all' } = filters;

  // Find categories that have matches when searching query alone
  const matchingCategories = React.useMemo(() => {
    if (!q) {
      // Return other available categories
      const categories = Array.from(new Set(products.map((p) => p.category)));
      return categories.filter((c) => c !== cat);
    }
    const query = q.toLowerCase();
    const categoriesWithQueryMatches = new Set();
    products.forEach((p) => {
      const match =
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      if (match) {
        categoriesWithQueryMatches.add(p.category);
      }
    });
    return Array.from(categoriesWithQueryMatches);
  }, [products, q, cat]);

  return (
    <div className="empty-state" role="status">
      <div className="empty-state-icon"><Icon name="tag" size={42} /></div>
      <h2 className="empty-state-title">No Sneakers Matched</h2>
      <p className="empty-state-desc">
        We checked our paper archives, but couldn't find any silhouettes matching your criteria.
      </p>

      {(q || cat !== 'all') && (
        <div className="empty-state-active-filters">
          {q && <span className="empty-state-badge">Query: "{q}"</span>}
          {cat !== 'all' && <span className="empty-state-badge">Category: {cat}</span>}
        </div>
      )}

      {matchingCategories.length > 0 && (
        <div className="empty-state-suggestions">
          <div className="empty-state-suggestions-title">
            {q ? 'Available in other categories for this search:' : 'Explore other categories:'}
          </div>
          <div className="empty-state-chips">
            {matchingCategories.map((c) => (
              <button
                key={c}
                type="button"
                className="empty-suggestion-chip"
                onClick={() => onSelectCategory && onSelectCategory(c)}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <button
          type="button"
          className="empty-clear-btn"
          onClick={onClearFilters}
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
}
