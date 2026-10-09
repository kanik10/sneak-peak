import React, { useMemo, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
import { HeroSection } from '../components/home/HeroSection';
import { TrendingStrip } from '../components/home/TrendingStrip';
import { FeaturedStories } from '../components/home/FeaturedStories';
import { Icon } from '../components/Icon';
import './ListingPage.css';

export function ListingPage() {
  const { products, status, error, retry } = useProducts();
  const { filters, update, clear } = useProductFilters();
  const location = useLocation();
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const catalogRef = useRef(null);

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

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTrendingTag = (query) => {
    update({ q: query });
    scrollToCatalog();
  };

  if (status === 'error') {
    return (
      <div className="container">
        <ErrorState message={error} onRetry={retry} />
      </div>
    );
  }

  const isLoading = status === 'loading';
  const hasActiveFilters = Boolean(filters.q || (filters.cat && filters.cat !== 'all') || (filters.sort && filters.sort !== 'featured'));
  const isHeaderCatalogView = new URLSearchParams(location.search).has('cat');
  const shouldShowCatalogOnly = hasActiveFilters || isHeaderCatalogView;

  return (
    <div className="listing-page-root">
      {/* Fullscreen Hero — sits outside the container so it's edge-to-edge */}
      {!shouldShowCatalogOnly && <HeroSection onExploreClick={scrollToCatalog} />}

      {/* Trending strip runs full-bleed beneath the hero */}
      {!shouldShowCatalogOnly && <TrendingStrip onSelectTag={handleSelectTrendingTag} />}

      {/* Rest of page uses the centered container */}
      <div className="container">
        {/* "What's Hot / Archive Drops" Editorial Stories */}
        {!shouldShowCatalogOnly && <FeaturedStories />}

        {/* Catalog & Filter Section */}
        <section
          id="archive-catalog"
          ref={catalogRef}
          className="catalog-section"
          aria-label="Sneaker catalog"
        >
        <header className="listing-catalog-header">
          <div className="catalog-header-text">
            <span className="listing-hero-badge">CATALOG // '77—'26</span>
            <h2 className="listing-catalog-title">THE ARCHIVE DIRECTORY</h2>
            <p className="listing-catalog-sub">
              Browse complete serialized silhouettes. Filter by category, technical sole, or keyword.
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="clear-all-pill-btn"
              onClick={clear}
              title="Reset all active filters"
            >
              <Icon name="close" size={14} /> Reset Active Filters
            </button>
          )}
        </header>

        {/* Desktop Filter Bar */}
        <div className="filter-bar-desktop">
          <div className="filter-bar-row-top">
            <SearchBar
              value={filters.q}
              onChange={(val) => update({ q: val })}
              placeholder="Filter archive by silhouette, washi fiber, Vibram, or model..."
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
        <div className="mobile-search-filter-row">
          <div style={{ flex: 1 }}>
            <SearchBar
              value={filters.q}
              onChange={(val) => update({ q: val })}
              placeholder="Search sneakers..."
            />
          </div>
          <button
            type="button"
            className="mobile-filter-trigger"
            onClick={() => setIsFilterSheetOpen(true)}
            aria-label="Open filter options"
          >
            <Icon name="filter" size={16} />
            <span>Filters</span>
          </button>
        </div>

        {/* Stats bar */}
        <div className="archive-stats-bar">
          <span>
            {isLoading
              ? 'Reading archive ledger...'
              : `Showing ${filteredProducts.length} of ${products.length} models`}
          </span>
          {hasActiveFilters && (
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
        </section>
      </div>

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
