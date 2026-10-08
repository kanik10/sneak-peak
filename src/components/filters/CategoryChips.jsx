import React from 'react';
import './CategoryChips.css';

const CATEGORIES = [
  { id: 'all', label: 'All Silhouettes' },
  { id: 'retro', label: 'Retro Court' },
  { id: 'runners', label: 'Tech Runners' },
  { id: 'skate', label: 'Minimal Skate' },
  { id: 'high-top', label: 'High-Tops' },
  { id: 'collabs', label: 'Studio Collabs' },
];

export function CategoryChips({ activeCategory = 'all', onSelect, counts = {} }) {
  return (
    <div className="category-chips-list" role="tablist" aria-label="Filter by category">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        const count = counts[cat.id];

        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`category-chip-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(cat.id)}
            id={`category-tab-${cat.id}`}
          >
            <span>{cat.label}</span>
            {count != null && (
              <span className="category-chip-badge">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
