import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AnnouncementBar.css';

const MESSAGES = [
  { text: "FREE ARCHIVAL SHIPPING ON ORDERS OVER $150 // WORLDWIDE DISPATCH", link: "/?sort=price-desc" },
  { text: "LIMITED COLLAB DROP: ONLY 1 PAIR LEFT OF BLUEPRINT ATELIER", link: "/product/deconstructed-blueprint-special-edition" },
  { text: "SIGN UP & RECEIVE 10% OFF YOUR FIRST RECEIPT • CODE: ARCHIVE77", link: "/?cat=collabs" },
  { text: "PRINTED RECEIPT & NUMBERED CERTIFICATE WITH EVERY ORDER", link: "/cart" },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % MESSAGES.length);
  };

  const current = MESSAGES[index];

  return (
    <div className="announcement-bar" role="region" aria-label="Announcements">
      <div className="announcement-inner">
        <button
          type="button"
          className="announcement-nav-btn"
          onClick={handlePrev}
          aria-label="Previous announcement"
        >
          ‹
        </button>

        <span className="announcement-text">
          <Link to={current.link}>{current.text}</Link>
        </span>

        <button
          type="button"
          className="announcement-nav-btn"
          onClick={handleNext}
          aria-label="Next announcement"
        >
          ›
        </button>
      </div>
    </div>
  );
}
