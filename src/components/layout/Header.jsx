import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartBadge } from './CartBadge';
import { AnnouncementBar } from './AnnouncementBar';
import './Header.css';

const NAV_LINKS = [
  { label: 'RETRO COURT', path: '/?cat=retro' },
  { label: 'TECH RUNNERS', path: '/?cat=runners' },
  { label: 'MINIMAL SKATE', path: '/?cat=skate' },
  { label: 'HIGH-TOPS', path: '/?cat=high-top' },
  { label: 'STUDIO COLLABS', path: '/?cat=collabs', highlight: true },
];

export function Header({ onOpenCommandPalette }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sneak-peak:theme') || 'system';
  });
  const location = useLocation();

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
    <>
      <AnnouncementBar />
      <header className="site-header">
        <div className="container">
          <div className="header-main-row">
            <div className="brand-group">
              <span className="brand-stamp">№ 77</span>
              <Link to="/" className="brand-link" id="brand-logo-link">
                <span className="brand-title">
                  SNEAK <span className="brand-accent">PEAK</span>
                </span>
                <span className="brand-tagline">Paper & Rubber Sneaker Archive</span>
              </Link>
            </div>

            {/* Adidas-style Main Category Navigation */}
            <nav aria-label="Main category navigation">
              <ul className="header-category-nav">
                {NAV_LINKS.map((link) => {
                  const isActive = location.search.includes(link.path.replace('/?', ''));
                  return (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className={`header-nav-link ${link.highlight ? 'highlight' : ''} ${isActive ? 'active' : ''}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

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

          {/* Subnav strip on mobile / tablet */}
          <div className="header-subnav-strip" aria-label="Mobile category navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`header-nav-link ${link.highlight ? 'highlight' : ''}`}
                style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
