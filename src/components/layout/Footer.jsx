import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import './Footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-col-title">SNEAK PEAK / ATELIER ARCHIVE</div>
            <p className="footer-desc">
              Curated archive of iconic footwear silhouettes rendered in heavy paper, kraft fiber,
              and vulcanized rubber. Designed without UI bloat - driven by pure CSS tokens,
              type-safe integer math, and authentic tactile receipt styling.
            </p>
          </div>

          <div>
            <div className="footer-col-title">ARCHIVE SECTIONS</div>
            <ul className="footer-links-list">
              <li><Link to="/?cat=retro">Retro Court</Link></li>
              <li><Link to="/?cat=runners">Technical Runners</Link></li>
              <li><Link to="/?cat=skate">Minimal Skate</Link></li>
              <li><Link to="/?cat=high-top">High-Top Classics</Link></li>
              <li><Link to="/?cat=collabs">Studio Collabs</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">DEV & TEST FLAGS</div>
            <p style={{ marginBottom: '0.75rem', fontSize: '0.8rem' }}>
              Simulate network latency and failures as required by specs:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="/?slow=1" className="footer-testing-chip">
                <><Icon name="clock" size={14} /> Test Slow Network (?slow=1)</>
              </a>
              <a href="/?error=1" className="footer-testing-chip">
                <><Icon name="warning" size={14} /> Test Server Error (?error=1)</>
              </a>
              <a href="/" className="footer-testing-chip">
                <><Icon name="check" size={14} /> Normal Mode</>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-stamp">
            PRINTED ON RECYCLED 280GSM ARCHIVAL COTTON // TOKYO - NY - LONDON
          </div>
          <div>
            (C) {new Date().getFullYear()} SNEAK PEAK. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
