import React from 'react';
import './ProductSkeleton.css';

export function ProductSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-media skeleton-shimmer" />
      <div className="skeleton-body">
        <div className="skeleton-bar skeleton-bar-sm skeleton-shimmer" />
        <div className="skeleton-bar skeleton-bar-md skeleton-shimmer" />
        <div className="skeleton-bar skeleton-bar-lg skeleton-shimmer" />
      </div>
    </div>
  );
}
