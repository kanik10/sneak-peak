import React from 'react';
import './SortSelect.css';

export function SortSelect({ value = 'featured', onChange }) {
  return (
    <div className="sort-select-wrap">
      <label htmlFor="sneaker-sort-select" className="sort-label">Sort:</label>
      <select
        id="sneaker-sort-select"
        className="sort-dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="featured">Curated (Default)</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Highest Rated</option>
        <option value="name-asc">Name: A to Z</option>
      </select>
    </div>
  );
}
