import React from 'react';
import { formatNumber } from '../../utils/format';
import { Icon } from '../Icon';
import './RatingStars.css';

export function RatingStars({ rating = 0, ratingCount = 0 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  const filledStars = fullStars + (hasHalf ? 1 : 0);

  return (
    <div className="rating-stars" aria-label={`Rating ${rating} out of 5 stars from ${ratingCount} reviews`}>
      <span className="rating-stars-icons" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Icon
            key={index}
            name="star"
            size={14}
            className={index < filledStars ? '' : 'rating-star-empty'}
          />
        ))}
      </span>
      <span className="rating-score">{rating.toFixed(1)}</span>
      {ratingCount > 0 && (
        <span className="rating-count">({formatNumber(ratingCount)})</span>
      )}
    </div>
  );
}
