import React from 'react';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import './ProductGrid.css';

export function ProductGrid({ products = [], isLoading = false, skeletonCount = 8 }) {
  if (isLoading) {
    return (
      <div className="product-grid" aria-busy="true">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
