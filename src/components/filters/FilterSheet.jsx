import React from 'react';
import { CategoryChips } from './CategoryChips';
import { SortSelect } from './SortSelect';
import './FilterSheet.css';

export function FilterSheet({
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
  sort,
  onSortChange,
  categoryCounts,
  onClearFilters,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="filter-sheet-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Filter sneakers"
    >
      <div className="filter-sheet-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="filter-sheet-header">
          <h3 className="filter-sheet-title">Filter & Sort Archive</h3>
          <button
            type="button"
            className="filter-sheet-close-btn"
            onClick={onClose}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>

        <div className="filter-sheet-section">
          <div className="filter-sheet-section-title">Category / Silhouette</div>
          <CategoryChips
            activeCategory={activeCategory}
            onSelect={(cat) => {
              onSelectCategory(cat);
            }}
            counts={categoryCounts}
          />
        </div>

        <div className="filter-sheet-section">
          <div className="filter-sheet-section-title">Sorting Order</div>
          <SortSelect value={sort} onChange={onSortChange} />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button
            type="button"
            className="filter-sheet-apply-btn"
            style={{ background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--line)' }}
            onClick={() => {
              onClearFilters();
              onClose();
            }}
          >
            Clear All
          </button>
          <button
            type="button"
            className="filter-sheet-apply-btn"
            onClick={onClose}
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}
