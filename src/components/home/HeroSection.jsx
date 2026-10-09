import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import './HeroSection.css';

const SLIDES = [
  {
    image: '/images/hero-slide-1.png',
    kicker: 'NEW ARRIVALS',
    headline: ['THE LINEUP', 'JUST DROPPED.'],
    accentLine: 1,
    sub: "Five silhouettes. One statement. From trail tech to court classics - the season's best.",
    cta: { label: 'EXPLORE THE ARCHIVE', href: '/#archive-catalog' },
    ctaSecondary: { label: 'SHOP ALL', href: '/?cat=all' },
  },
  {
    image: '/images/hero-slide-2.webp',
    kicker: 'LIMITED DROP',
    headline: ['BORN IN THE', 'STREETS.'],
    accentLine: 1,
    sub: 'Numbered silhouettes. Washi-paper ripstop. Vulcanized natural gum soles.',
    cta: { label: 'SHOP RUNNERS', href: '/?cat=runners' },
    ctaSecondary: { label: 'VIEW ALL', href: '/#archive-catalog' },
  },
  {
    image: '/images/hero-slide-3-v2.jpg',
    kicker: 'EDITORIAL',
    headline: ['STYLE IS', 'A STATEMENT.'],
    accentLine: 0,
    sub: 'High-top heritage. Every step tells a story. Every sole carries culture.',
    cta: { label: 'SHOP HIGH-TOPS', href: '/?cat=high-top' },
    ctaSecondary: { label: 'VIEW LOOKBOOK', href: '/#archive-catalog' },
  },
  {
    image: '/images/hero-slide-4.webp',
    kicker: 'LUXURY COLLAB',
    headline: ['THE ART OF', 'THE SNEAKER.'],
    accentLine: 1,
    sub: 'Where fashion meets footwear. Curated collabs for the discerning collector.',
    cta: { label: 'SHOP COLLABS', href: '/?cat=collabs' },
    ctaSecondary: { label: 'DISCOVER MORE', href: '/#archive-catalog' },
  },
];

export function HeroSection({ onExploreClick }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === activeSlide) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveSlide(index);
      setIsAnimating(false);
    }, 400);
  }, [isAnimating, activeSlide]);

  const nextSlide = useCallback(() => {
    goToSlide((activeSlide + 1) % SLIDES.length);
  }, [activeSlide, goToSlide]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = SLIDES[activeSlide];

  return (
    <section className="hero-fullscreen" aria-label="Featured Collection">
      {/* Background image layer */}
      <div className={`hero-bg-wrap ${isAnimating ? 'hero-bg-fade' : ''}`}>
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`hero-bg-img ${i === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
            aria-hidden="true"
          />
        ))}
        {/* Dark overlay */}
        <div className="hero-overlay" aria-hidden="true" />
        {/* Paper grain texture */}
        <div className="hero-grain" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className={`hero-content ${isAnimating ? 'hero-content-exit' : 'hero-content-enter'}`}>
        <div className="hero-inner">
          {/* Kicker badge */}
          <div className="hero-kicker-row">
            <span className="hero-kicker-badge">{slide.kicker}</span>
            <span className="hero-kicker-line" aria-hidden="true" />
            <span className="hero-kicker-sub">SNEAK PEAK ORIGINALS</span>
          </div>

          {/* Main headline */}
          <h1 className="hero-main-headline">
            {slide.headline.map((line, i) => (
              <span
                key={i}
                className={`hero-headline-line ${i === slide.accentLine ? 'accent' : ''}`}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p className="hero-subtext">{slide.sub}</p>

          {/* CTAs */}
          <div className="hero-cta-row">
            <a
              href={slide.cta.href}
              className="hero-btn-primary"
              onClick={slide.cta.href === '/#archive-catalog' ? (e) => { e.preventDefault(); onExploreClick?.(); } : undefined}
            >
              {slide.cta.label}
              <Icon name="arrow-right" size={18} className="hero-btn-arrow" />
            </a>
            <Link to={slide.ctaSecondary.href} className="hero-btn-ghost">
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide controls — bottom bar */}
      <div className="hero-controls">
        {/* Dot indicators */}
        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hero-dot ${i === activeSlide ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <span className="hero-counter">
          {String(activeSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>

        {/* Next arrow */}
        <button
          type="button"
          className="hero-next-btn"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <Icon name="arrow-right" size={18} />
        </button>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" onClick={onExploreClick}>
        <span className="hero-scroll-text">SCROLL</span>
        <Icon name="arrow-down" size={16} className="hero-scroll-arrow" />
      </div>
    </section>
  );
}
