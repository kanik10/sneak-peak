import React from 'react';
import './Icon.css';

const PATHS = {
  search: <><circle cx="10" cy="10" r="6.5" /><path d="m15 15 5 5" /></>,
  tag: <path d="M20 13 13 20 4 11V4h7l9 9ZM7.5 7.5h.01" />,
  history: <><path d="M4 12a8 8 0 1 0 2.35-5.65" /><path d="M4 5v4h4M12 7v5l3 2" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14.5-4L4 9" /><path d="M4 4v5h5M4 13a8 8 0 0 0 14.5 4L20 15" /><path d="M20 20v-5h-5" /></>,
  'arrow-left': <path d="M19 12H5m6-6-6 6 6 6" />,
  'arrow-right': <path d="M5 12h14m-6-6 6 6-6 6" />,
  'arrow-down': <path d="M12 5v14m-6-6 6 6 6-6" />,
  'arrow-up': <path d="M12 19V5m-6 6 6-6 6 6" />,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  heart: <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" />,
  filter: <path d="M4 5h16M7 12h10m-7 7h4" />,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
  warning: <><path d="m12 4 9 16H3L12 4Z" /><path d="M12 9v5m0 3h.01" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  'chevron-left': <path d="m14 5-7 7 7 7" />,
  'chevron-right': <path d="m10 5 7 7-7 7" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
  moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
};

export function Icon({ name, size = 16, className = '' }) {
  return (
    <svg
      className={`ui-icon ui-icon--${name} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
