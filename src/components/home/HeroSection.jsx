import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';
import './HeroSection.css';

export function HeroSection({ featuredProduct, onExploreClick }) {
  const { addToCart } = useCart();
  const heroShoe = featuredProduct || {
    id: "paper-archive-craft-low",
    name: "Craft Raw Paper Low-Top '77",
    image: "/images/paper-archive-craft-low.svg",
    price: 17500,
    category: "retro",
    stock: 7,
    accent: "#c2410c",
  };

  return (
    <section className="adidas-hero" aria-label="Featured Collection">
      {/* 3-Stripe Diagonal Paper Motif */}
      <div className="hero-stripes-bg" aria-hidden="true">
        <div className="hero-stripe" />
        <div className="hero-stripe" />
        <div className="hero-stripe" />
      </div>

      <div className="hero-content-grid">
        <div className="hero-text-block">
          <div className="hero-kicker-wrap">
            <span className="hero-kicker-badge">№ 77 ARCHIVE</span>
            <span className="hero-kicker-text">ORIGINALS NEVER FADE</span>
          </div>

          <h1 className="hero-headline">
            <span className="headline-line">BORN IN THE STREETS.</span>
            <span className="headline-line headline-accent">RECORDED ON PAPER.</span>
          </h1>

          <p className="hero-desc">
            Archival footwear engineered with 280gsm washi-paper ripstop, unbleached cotton corduroy, 
            and vulcanized natural gum soles. Built for movement. Numbered for the collector.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="adidas-btn-primary"
              onClick={onExploreClick}
              id="hero-explore-btn"
            >
              <span>EXPLORE THE ARCHIVE</span>
              <span aria-hidden="true">→</span>
            </button>

            <Link
              to="/?cat=collabs"
              className="adidas-btn-secondary"
              id="hero-collabs-btn"
            >
              <span>SHOP LIMITED COLLABS</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Featured Sneaker Spotlight */}
        <div className="hero-showcase-box">
          <div className="hero-showcase-tag">
            <span style={{ fontWeight: 700, color: 'var(--ink)' }}>SPOTLIGHT LOT № 01</span>
            <span style={{ color: 'var(--muted)' }}>STOCK: {heroShoe.stock}</span>
          </div>

          <Link to={`/product/${heroShoe.id}`} aria-label={`View ${heroShoe.name}`}>
            <img
              src={heroShoe.image}
              alt={heroShoe.name}
              className="hero-showcase-img"
            />
          </Link>

          <div className="hero-showcase-footer">
            <div>
              <div className="hero-showcase-name">
                <Link to={`/product/${heroShoe.id}`}>{heroShoe.name}</Link>
              </div>
              <div className="hero-showcase-price">{formatPrice(heroShoe.price)}</div>
            </div>

            <button
              type="button"
              className="adidas-btn-primary"
              style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}
              onClick={() => addToCart(heroShoe.id, 1, heroShoe.name)}
              id="hero-quick-add-btn"
            >
              + ADD TO RECEIPT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
