import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartBadge } from './CartBadge';
import './Header.css';

export function Header({ onOpenCommandPalette }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sneak-peak:theme') || 'system';
  });

  useEffect(() => {
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('sneak-peak:theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((curr) => {
      if (curr === 'dark') return 'light';
      return 'dark';
    });
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <div className="brand-group">
            <span className="brand-stamp">№ 77</span>
            <Link to="/" className="brand-link" id="brand-logo-link">
              <span className="brand-title">
                SNEAK <span className="brand-accent">PEAK</span>
              </span>
              <span className="brand-tagline">Paper & Rubber Sneaker Archive</span>
            </Link>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="command-trigger-btn"
              onClick={onOpenCommandPalette}
              title="Search archive (Ctrl+K or ⌘K)"
              aria-label="Open command search"
              id="command-trigger-btn"
            >
              <span>🔍</span>
              <span className="command-label">Search archive</span>
              <kbd className="command-shortcut">⌘K</kbd>
            </button>

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Toggle theme (currently ${theme})`}
              title="Toggle Light/Dark Theme"
              id="theme-toggle-btn"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <CartBadge />
          </div>
        </div>
      </div>
    </header>
  );
}
