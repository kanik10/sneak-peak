import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const products = JSON.parse(fs.readFileSync(path.resolve('src/data/products.json'), 'utf-8'));

function createSneakerSvg(p) {
  const accent = p.accent;
  const isHighTop = p.category === 'high-top';
  const isRunner = p.category === 'runners';
  const isCollab = p.category === 'collabs';
  const isSkate = p.category === 'skate';

  // Base background paper & shadow
  let upperPath = '';
  let solePath = '';
  let overlays = '';
  let laces = '';
  let details = '';

  if (isHighTop) {
    // High-top profile
    solePath = `<path d="M 60 270 C 60 280, 75 285, 120 285 L 380 285 C 410 285, 430 275, 430 265 L 430 250 L 60 250 Z" fill="#e8dfce" stroke="#1d1b18" stroke-width="3"/>
                <path d="M 60 272 L 430 272" stroke="${accent}" stroke-width="3" stroke-dasharray="8 4"/>
                <path d="M 90 285 L 140 285 C 135 289, 100 289, 90 285 Z" fill="#1d1b18"/>`;
    upperPath = `<path d="M 90 250 L 90 120 C 90 100, 110 90, 140 90 L 190 90 C 205 90, 215 110, 220 135 L 260 175 L 340 185 C 385 190, 420 215, 425 250 Z" fill="#fcf9f2" stroke="#1d1b18" stroke-width="3.5" stroke-linejoin="round"/>`;
    overlays = `
      <!-- Padded collar -->
      <rect x="98" y="100" width="80" height="25" rx="6" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-width="2"/>
      <path d="M 90 150 L 180 150 C 195 150, 210 160, 220 180 L 230 250" fill="none" stroke="#1d1b18" stroke-width="2.5" stroke-dasharray="4 3"/>
      <!-- Quarter swoosh / insignia -->
      <path d="M 140 200 C 200 190, 260 210, 310 240 C 260 235, 200 230, 150 245 Z" fill="${accent}" stroke="#1d1b18" stroke-width="2"/>
      <!-- Perforations toe -->
      <circle cx="370" cy="225" r="2.5" fill="#1d1b18"/>
      <circle cx="385" cy="230" r="2.5" fill="#1d1b18"/>
      <circle cx="360" cy="235" r="2.5" fill="#1d1b18"/>
      <circle cx="375" cy="240" r="2.5" fill="#1d1b18"/>
    `;
    laces = `
      <path d="M 195 115 L 210 130" stroke="#1d1b18" stroke-width="3" stroke-linecap="round"/>
      <path d="M 205 135 L 225 150" stroke="#1d1b18" stroke-width="3" stroke-linecap="round"/>
      <path d="M 220 155 L 245 170" stroke="#1d1b18" stroke-width="3" stroke-linecap="round"/>
      <path d="M 240 175 L 270 190" stroke="#1d1b18" stroke-width="3" stroke-linecap="round"/>
    `;
  } else if (isRunner) {
    // Dynamic aerodynamic runner
    solePath = `
      <path d="M 50 260 C 50 275, 75 285, 130 285 L 340 285 C 385 285, 420 270, 445 235 L 435 230 C 400 255, 360 260, 320 260 L 60 260 Z" fill="#e2d8c3" stroke="#1d1b18" stroke-width="3"/>
      <!-- Cushioning wedge -->
      <path d="M 70 260 C 130 260, 200 265, 270 250 L 330 250 L 310 260 Z" fill="${accent}"/>
      <path d="M 80 285 L 420 285" stroke="#1d1b18" stroke-width="4" stroke-dasharray="12 6"/>
    `;
    upperPath = `
      <path d="M 80 245 C 75 200, 110 165, 150 160 C 180 155, 210 145, 230 165 L 290 190 L 360 205 C 410 215, 435 235, 440 245 Z" fill="#faf6ee" stroke="#1d1b18" stroke-width="3.5" stroke-linejoin="round"/>
    `;
    overlays = `
      <!-- Tech cage and aero ribs -->
      <path d="M 180 170 C 200 200, 230 235, 250 245" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>
      <path d="M 210 175 C 230 205, 260 235, 280 245" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>
      <path d="M 120 230 C 160 220, 220 230, 290 240" stroke="#1d1b18" stroke-width="2" stroke-dasharray="3 3"/>
      <!-- Heel pull loop -->
      <path d="M 78 185 C 65 170, 70 150, 85 160" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
    `;
    laces = `
      <circle cx="215" cy="170" r="3" fill="#1d1b18"/>
      <circle cx="240" cy="180" r="3" fill="#1d1b18"/>
      <circle cx="265" cy="190" r="3" fill="#1d1b18"/>
      <circle cx="290" cy="200" r="3" fill="#1d1b18"/>
      <path d="M 215 170 Q 235 160 265 190" stroke="#1d1b18" stroke-width="2.5" fill="none"/>
    `;
  } else if (isCollab) {
    // Architectural deconstructed aesthetic
    solePath = `
      <rect x="60" y="250" width="370" height="32" rx="4" fill="#eee7d7" stroke="#1d1b18" stroke-width="3"/>
      <path d="M 70 276 L 420 276" stroke="${accent}" stroke-width="2"/>
      <text x="75" y="268" font-family="monospace" font-size="9" fill="#1d1b18" letter-spacing="1">ARCHIVE SPEC // BATCH 0${p.stock}</text>
    `;
    upperPath = `
      <path d="M 80 250 L 95 140 C 105 130, 130 130, 155 145 L 210 170 L 285 185 L 360 195 C 410 205, 430 235, 430 250 Z" fill="#f8f5ee" stroke="#1d1b18" stroke-width="3.5"/>
    `;
    overlays = `
      <!-- Technical grid & drafting lines -->
      <line x1="120" y1="130" x2="120" y2="250" stroke="${accent}" stroke-width="1.5" stroke-dasharray="3 3"/>
      <line x1="200" y1="130" x2="200" y2="250" stroke="${accent}" stroke-width="1.5" stroke-dasharray="3 3"/>
      <line x1="280" y1="130" x2="280" y2="250" stroke="${accent}" stroke-width="1.5" stroke-dasharray="3 3"/>
      <!-- Reverse label badge -->
      <rect x="150" y="200" width="90" height="28" rx="2" fill="${accent}" stroke="#1d1b18" stroke-width="2"/>
      <text x="156" y="218" font-family="monospace" font-size="8" font-weight="bold" fill="#ffffff" letter-spacing="0.5">SNEAKPEAK®</text>
      <!-- Exposed seam tape -->
      <path d="M 95 160 L 200 245" stroke="#1d1b18" stroke-width="3" stroke-dasharray="6 4"/>
    `;
    laces = `
      <path d="M 165 145 L 185 160" stroke="#1d1b18" stroke-width="3"/>
      <path d="M 190 160 L 215 175" stroke="#1d1b18" stroke-width="3"/>
      <path d="M 215 175 L 245 190" stroke="#1d1b18" stroke-width="3"/>
      <circle cx="160" cy="140" r="5" fill="${accent}"/>
    `;
  } else if (isSkate) {
    // Clean low-profile skate / deck silhouette
    solePath = `
      <path d="M 65 248 L 420 248 C 430 248, 435 258, 430 270 C 425 280, 410 282, 380 282 L 80 282 C 65 282, 60 272, 65 248 Z" fill="#f4eee1" stroke="#1d1b18" stroke-width="3"/>
      <rect x="70" y="248" width="355" height="6" fill="${accent}"/>
      <path d="M 68 280 L 420 280" stroke="#1d1b18" stroke-width="3"/>
    `;
    upperPath = `
      <path d="M 75 248 C 70 205, 95 180, 135 180 C 160 180, 185 185, 205 195 L 285 205 C 345 208, 395 218, 425 248 Z" fill="#faf7f0" stroke="#1d1b18" stroke-width="3.5"/>
    `;
    overlays = `
      <!-- Ollie patch & side wave -->
      <path d="M 260 248 C 265 220, 310 220, 340 248 Z" fill="${accent}" fill-opacity="0.3" stroke="#1d1b18" stroke-width="2"/>
      <path d="M 125 185 C 160 215, 240 220, 320 245" stroke="#1d1b18" stroke-width="2.5" fill="none"/>
      <!-- Metal eyelets -->
      <circle cx="170" cy="192" r="3" fill="#ffffff" stroke="#1d1b18" stroke-width="2"/>
      <circle cx="195" cy="196" r="3" fill="#ffffff" stroke="#1d1b18" stroke-width="2"/>
      <circle cx="220" cy="201" r="3" fill="#ffffff" stroke="#1d1b18" stroke-width="2"/>
    `;
    laces = `
      <path d="M 168 190 L 195 194" stroke="#1d1b18" stroke-width="2.5"/>
      <path d="M 193 194 L 220 199" stroke="#1d1b18" stroke-width="2.5"/>
    `;
  } else {
    // Retro court low-top
    solePath = `
      <path d="M 60 252 L 425 252 C 430 262, 425 278, 400 282 L 80 282 C 60 282, 55 268, 60 252 Z" fill="#ece5d5" stroke="#1d1b18" stroke-width="3"/>
      <line x1="60" y1="262" x2="425" y2="262" stroke="#1d1b18" stroke-width="1.5" stroke-dasharray="2 2"/>
      <path d="M 380 252 C 410 255, 420 270, 410 280" fill="none" stroke="${accent}" stroke-width="3"/>
    `;
    upperPath = `
      <path d="M 75 252 C 72 190, 105 165, 145 165 C 170 165, 195 175, 215 190 L 275 200 C 345 205, 395 218, 425 252 Z" fill="#fcf9f2" stroke="#1d1b18" stroke-width="3.5" stroke-linejoin="round"/>
    `;
    overlays = `
      <!-- Retro mudguard & leather star/chevron/swoosh -->
      <path d="M 320 252 C 320 220, 365 210, 425 235 L 425 252 Z" fill="${accent}" fill-opacity="0.18" stroke="#1d1b18" stroke-width="2"/>
      <path d="M 125 170 L 125 240" stroke="#1d1b18" stroke-width="2.5" stroke-dasharray="4 2"/>
      <path d="M 155 210 C 220 200, 270 215, 310 248 C 265 240, 210 230, 160 245 Z" fill="${accent}" stroke="#1d1b18" stroke-width="2"/>
    `;
    laces = `
      <path d="M 175 172 L 195 186" stroke="#1d1b18" stroke-width="2.5"/>
      <path d="M 195 186 L 220 197" stroke="#1d1b18" stroke-width="2.5"/>
      <path d="M 220 197 L 250 204" stroke="#1d1b18" stroke-width="2.5"/>
    `;
  }

  // Stamp details & subtle craft grid
  details = `
    <!-- Archival registration marks -->
    <circle cx="435" cy="45" r="7" fill="none" stroke="#6b645a" stroke-width="1"/>
    <line x1="435" y1="34" x2="435" y2="56" stroke="#6b645a" stroke-width="1"/>
    <line x1="424" y1="45" x2="446" y2="45" stroke="#6b645a" stroke-width="1"/>
    <!-- Stamp code -->
    <text x="35" y="45" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#6b645a" letter-spacing="1">ED. ${p.id.substring(0, 10).toUpperCase()}</text>
    <text x="35" y="60" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#6b645a">ART NO. 0${p.stock} // SNEAK PEAK ARCHIVE</text>
  `;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 340" width="100%" height="100%">
  <defs>
    <!-- Paper texture & subtle gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faf5ec" />
      <stop offset="100%" stop-color="#f0e7d5" />
    </linearGradient>
    <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1d1b18" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#1d1b18" stop-opacity="0" />
    </radialGradient>
    <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#d9d0bf" fill-opacity="0.6"/>
    </pattern>
  </defs>

  <!-- Card background with paper grain grid -->
  <rect width="100%" height="100%" fill="url(#bgGrad)" rx="12"/>
  <rect width="100%" height="100%" fill="url(#dotGrid)" rx="12"/>

  ${details}

  <!-- Ground drop shadow -->
  <ellipse cx="250" cy="296" rx="190" ry="16" fill="url(#shadowGrad)"/>

  <!-- Sneaker graphics -->
  <g id="sneaker-model" transform="translate(0, 5)">
    ${upperPath}
    ${overlays}
    ${solePath}
    ${laces}
  </g>

  <!-- Aesthetic technical border -->
  <rect x="12" y="12" width="476" height="316" rx="8" fill="none" stroke="#d9d0bf" stroke-width="1.5" stroke-dasharray="6 4"/>
</svg>`;
}

for (const p of products) {
  const filePath = path.join(outDir, `${p.id}.svg`);
  const svgContent = createSneakerSvg(p);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
}

console.log(`Generated ${products.length} sneaker SVG images in public/images/`);
