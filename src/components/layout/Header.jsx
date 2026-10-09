import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartBadge } from './CartBadge';
import { AnnouncementBar } from './AnnouncementBar';
import { Icon } from '../Icon';
import './Header.css';

const NAV_LINKS = [
  { label: 'RETRO COURT', path: '/?cat=retro' },
  { label: 'TECH RUNNERS', path: '/?cat=runners' },
  { label: 'MINIMAL SKATE', path: '/?cat=skate' },
  { label: 'HIGH-TOPS', path: '/?cat=high-top' },
  { label: 'COLLABS', path: '/?cat=collabs', highlight: true },
  { label: 'ALL DROPS', path: '/?cat=all' },
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
    setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <AnnouncementBar />
      <header className="site-header">
        <div className="container">
          <div className="header-main-row">
            <div className="brand-group">
              <span className="brand-mark" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <Link to="/" className="brand-link" id="brand-logo-link">
                <span className="brand-title">
                  SNEAK <span className="brand-accent">PEAK</span>
                </span>
                <span className="brand-tagline">Paper &amp; Rubber Sneaker Archive</span>
              </Link>
            </div>

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
                title="Search archive (Ctrl+K or Cmd+K)"
                aria-label="Open command search"
                id="command-trigger-btn"
              >
                <svg className="search-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <circle cx="8.5" cy="8.5" r="5.5" />
                  <path d="m12.5 12.5 4 4" />
                </svg>
                <span className="command-label">Search</span>
              </button>

              <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={`Toggle theme (currently ${theme})`}
                title="Toggle Light/Dark Theme"
                id="theme-toggle-btn"
              >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
              </button>

              <Link to="/wishlist" className="wishlist-header-link" aria-label="Open wishlist" title="Wishlist">
                <Icon name="heart" size={16} />
                <span>Wishlist</span>
              </Link>

              <CartBadge />
            </div>
          </div>

          <div className="header-subnav-strip" aria-label="Mobile category navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`header-nav-link ${link.highlight ? 'highlight' : ''}`}
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
