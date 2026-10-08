import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedStories.css';

const STORIES = [
  {
    kicker: "LIMITED COLLAB",
    title: "Deconstructed Blueprint Series",
    desc: "Drafting vellum overlays, exposed foam, and cyanotype coordinate typography.",
    image: "/images/deconstructed-blueprint-special-edition.svg",
    link: "/product/deconstructed-blueprint-special-edition",
    cta: "DISCOVER THE COLLAB",
  },
  {
    kicker: "ALL-TERRAIN",
    title: "Tokyo Vibram Tech Runners",
    desc: "Japanese washi-paper ripstop mesh engineered with Megagrip traction soles.",
    image: "/images/tokyo-parchment-runner.svg",
    link: "/?cat=runners",
    cta: "EXPLORE RUNNERS",
  },
  {
    kicker: "HERITAGE '84",
    title: "Hardwood Leather Originals",
    desc: "Aged cream midsoles and heavy full-grain leather for timeless court posture.",
    image: "/images/vintage-leather-hardwood-84.svg",
    link: "/?cat=retro",
    cta: "SHOP COURT CLASSICS",
  },
];

export function FeaturedStories() {
  return (
    <section className="featured-stories-section" aria-label="Featured drops and stories">
      <div className="featured-stories-header">
        <h2 className="featured-stories-title">WHAT'S HOT // ARCHIVE DROPS</h2>
        <span className="featured-stories-sub">CURATED EDITORIAL</span>
      </div>

      <div className="featured-stories-grid">
        {STORIES.map((story) => (
          <Link to={story.link} key={story.title} className="story-card">
            <div className="story-card-media">
              <span className="story-card-kicker">{story.kicker}</span>
              <img src={story.image} alt={story.title} className="story-card-img" loading="lazy" />
            </div>
            <div className="story-card-body">
              <h3 className="story-card-headline">{story.title}</h3>
              <p className="story-card-desc">{story.desc}</p>
              <span className="story-card-cta">
                <span>{story.cta}</span>
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
