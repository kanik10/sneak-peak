import React from 'react';
import { formatNumber } from '../../utils/format';
import './RatingStars.css';

export function RatingStars({ rating = 0, ratingCount = 0 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  let stars = '★'.repeat(fullStars);
  if (hasHalf) stars += '★';
  while (stars.length < 5) stars += '☆';

  return (
    <div className="rating-stars" aria-label={`Rating ${rating} out of 5 stars from ${ratingCount} reviews`}>
      <span className="rating-stars-icons" aria-hidden="true">{stars}</span>
      <span className="rating-score">{rating.toFixed(1)}</span>
      {ratingCount > 0 && (
        <span className="rating-count">({formatNumber(ratingCount)})</span>
      )}
    </div>
  );
}
