import React, { useMemo, useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import { useProductFilters } from '../hooks/useProductFilters';
import { filterProducts } from '../utils/filterProducts';
import { ProductGrid } from '../components/product/ProductGrid';
import { SearchBar } from '../components/filters/SearchBar';
import { CategoryChips } from '../components/filters/CategoryChips';
import { SortSelect } from '../components/filters/SortSelect';
import { FilterSheet } from '../components/filters/FilterSheet';
import { EmptyState } from '../components/feedback/EmptyState';
import { ErrorState } from '../components/feedback/ErrorState';
import { RecentlyViewed } from '../components/product/RecentlyViewed';
import './ListingPage.css';

export function ListingPage() {
  const { products, status, error, retry } = useProducts();
  const { filters, update, clear } = useProductFilters();
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Filtered and sorted products using the pure utility function
  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters);
  }, [products, filters]);

  // Compute category counts for chips
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  if (status === 'error') {
    return (
      <div className="container">
        <ErrorState message={error} onRetry={retry} />
      </div>
    );
  }

  const isLoading = status === 'loading';

  return (
    <div className="container">
      <header className="listing-hero">
        <span className="listing-hero-badge">ARCHIVE COLLECTION '77—'26</span>
        <h1 className="listing-hero-title">Curated Footwear Silhouettes</h1>
        <p className="listing-hero-sub">
          Archived sneakers categorized by craft construction, paper-fiber weave, and technical soles.
          Every piece serialized with authentic provenance.
        </p>
      </header>

      {/* Desktop Filter Bar */}
      <div className="filter-bar-desktop">
        <div className="filter-bar-row-top">
          <SearchBar
            value={filters.q}
            onChange={(val) => update({ q: val })}
          />
        </div>
        <div className="filter-bar-row-bottom">
          <CategoryChips
            activeCategory={filters.cat}
            onSelect={(cat) => update({ cat })}
            counts={categoryCounts}
          />
          <SortSelect
            value={filters.sort}
            onChange={(sort) => update({ sort })}
          />
        </div>
      </div>

      {/* Mobile Filter Trigger */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <SearchBar
            value={filters.q}
            onChange={(val) => update({ q: val })}
          />
        </div>
        <button
          type="button"
          className="mobile-filter-trigger"
          style={{ width: 'auto' }}
          onClick={() => setIsFilterSheetOpen(true)}
          aria-label="Open filter options"
        >
          <span>⚙️</span>
          <span>Filters</span>
        </button>
      </div>

      {/* Stats bar */}
      <div className="archive-stats-bar">
        <span>
          {isLoading ? 'Reading archive ledger...' : `Displaying ${filteredProducts.length} of ${products.length} models`}
        </span>
        {(filters.q || filters.cat !== 'all') && (
          <button
            type="button"
            onClick={clear}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Products Grid or Empty State */}
      {isLoading ? (
        <ProductGrid isLoading={true} skeletonCount={8} />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          filters={filters}
          onClearFilters={clear}
          onSelectCategory={(cat) => update({ cat })}
        />
      ) : (
        <ProductGrid products={filteredProducts} />
      )}

      {/* Recently Viewed Drawer */}
      <RecentlyViewed />

      {/* Mobile Filter Sheet */}
      <FilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        activeCategory={filters.cat}
        onSelectCategory={(cat) => update({ cat })}
        sort={filters.sort}
        onSortChange={(sort) => update({ sort })}
        categoryCounts={categoryCounts}
        onClearFilters={clear}
      />
    </div>
  );
}
