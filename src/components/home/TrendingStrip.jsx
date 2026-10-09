import React from 'react';
import { Icon } from '../Icon';
import './TrendingStrip.css';

const TRENDING_TAGS = [
  { label: "Craft Low '77", query: "Craft Low" },
  { label: "Blueprint OG", query: "Blueprint", badge: "HOT" },
  { label: "Tokyo Tech Runner", query: "Tokyo" },
  { label: "Hardwood '84", query: "Hardwood" },
  { label: "Origami High", query: "Origami" },
  { label: "Vibram Soles", query: "Vibram" },
  { label: "Duck Canvas", query: "Duck Canvas" },
];

export function TrendingStrip({ onSelectTag }) {
  return (
    <div className="trending-strip-wrap" aria-label="Trending sneakers">
      <div className="trending-strip-label">
        <span className="trending-icon" aria-hidden="true">🔥</span>
        <span>POPULAR RIGHT NOW</span>
      </div>

      <div className="trending-pills-row">
        {TRENDING_TAGS.map((tag) => (
          <button
            key={tag.label}
            type="button"
            className="trending-pill-btn"
            onClick={() => onSelectTag(tag.query)}
            title={`Filter by ${tag.label}`}
          >
            <span>{tag.label}</span>
            {tag.badge && <span className="trending-pill-badge">{tag.badge}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
