import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { Icon } from '../Icon';
import './SearchBar.css';

export function SearchBar({ value, onChange, placeholder = 'Search sneakers by model, material, or keyword...' }) {
  const [localValue, setLocalValue] = useState(value || '');
  const debouncedValue = useDebounce(localValue, 250);

  // Sync with prop when URL changes from outside (e.g. Back button or clear filters)
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  // Push debounced changes up
  useEffect(() => {
    if (debouncedValue !== (value || '')) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="search-bar-wrap">
      <Icon name="search" size={17} className="search-icon-leading" />
      <input
        type="search"
        className="search-input-field"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        aria-label="Filter sneakers"
        id="sneaker-search-input"
      />
      {localValue && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={handleClear}
          aria-label="Clear search input"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
}
