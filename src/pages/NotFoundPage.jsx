import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export function NotFoundPage({ customMessage }) {
  return (
    <div className="container">
      <div className="not-found-view" role="status">
        <div className="not-found-stamp">404 // LEDGER PAGE NOT FOUND</div>
        <h1 className="not-found-title">Archival Record Missing</h1>
        <p className="not-found-desc">
          {customMessage || "The page or sneaker reference you searched for has either been deaccessioned or never existed in the Sneak Peak archive ledger."}
        </p>
        <Link to="/" className="not-found-return-btn">
          Return to Archive Index
        </Link>
      </div>
    </div>
  );
}
