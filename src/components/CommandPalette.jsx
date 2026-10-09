import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { formatPrice } from '../utils/format';
import { Icon } from './Icon';
import './CommandPalette.css';

export function CommandPalette({ isOpen, onClose }) {
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  // Filter products by query
  const filteredProducts = React.useMemo(() => {
    if (!query.trim()) return products.slice(0, 8);
    const q = query.toLowerCase().trim();
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [products, query]);

  // Focus input and reset query on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredProducts.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredProducts.length) % Math.max(1, filteredProducts.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredProducts[selectedIndex]) {
        navigate(`/product/${filteredProducts[selectedIndex].id}`);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="cmd-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
    >
      <div
        className="cmd-dialog"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="cmd-header">
          <Icon name="search" size={18} className="cmd-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Search archival sneakers, tech, or materials..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-autocomplete="list"
            aria-controls="cmd-listbox"
          />
          <kbd className="cmd-esc-badge">ESC</kbd>
        </div>

        <ul
          id="cmd-listbox"
          ref={listRef}
          className="cmd-list"
          role="listbox"
          aria-label="Search results"
        >
          {filteredProducts.length === 0 ? (
            <li className="cmd-empty">No sneakers found matching "{query}"</li>
          ) : (
            filteredProducts.map((p, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <li
                  key={p.id}
                  id={`cmd-option-${p.id}`}
                  role="option"
                  aria-selected={isSelected}
                  className="cmd-item"
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-left">
                    <img src={p.image} alt="" className="cmd-thumb" />
                    <div className="cmd-item-info">
                      <div className="cmd-item-name">{p.name}</div>
                      <div className="cmd-item-meta">
                        <span style={{ textTransform: 'capitalize' }}>{p.category}</span>
                        <span aria-hidden="true">/</span>
                        <span>Stock: {p.stock}</span>
                      </div>
                    </div>
                  </div>
                  <div className="cmd-item-price">{formatPrice(p.price)}</div>
                </li>
              );
            })
          )}
        </ul>

        <div className="cmd-footer">
          <div className="cmd-hints">
            <span><Icon name="arrow-up" size={13} /><Icon name="arrow-down" size={13} /> Navigate</span>
            <span><Icon name="check" size={13} /> Select</span>
            <span>ESC Close</span>
          </div>
          <div>SNEAK PEAK ARCHIVE</div>
        </div>
      </div>
    </div>
  );
}
