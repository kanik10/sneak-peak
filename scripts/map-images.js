import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('sneaker_images_1024x1024');
const destDir = path.resolve('public/images');

// Get all source images sorted
const srcImages = fs.readdirSync(srcDir)
  .filter(f => f.endsWith('.jpg'))
  .sort();

// Product IDs in the same order as products.json
const productIds = [
  'paper-archive-craft-low',
  'tokyo-parchment-runner',
  'heritage-ink-high',
  'kraft-waffle-trainer',
  'monolith-canvas-skate',
  'deconstructed-blueprint-special-edition',
  'sumi-shadow-trail-matrix',
  'vellum-suede-lo-pro',
  'origami-fold-high',
  'terrazzo-aeroflux-carbon',
  'pressed-linen-slip-on',
  'vintage-leather-hardwood-84',
  'cyanotype-indigo-dunk',
  'unbleached-ecru-marathon',
  'charcoal-rubbed-sk8',
  'papyrus-gold-olympic-court',
  'botanical-tea-tint-trainer',
  'typewriter-ribbon-monochrome',
];

// Also copy some extras for hero background slides
const heroSlides = [
  { src: srcImages[18], dest: 'hero-slide-1.jpg' },
  { src: srcImages[19], dest: 'hero-slide-2.jpg' },
  { src: srcImages[20], dest: 'hero-slide-3.jpg' },
];

// Map product images
productIds.forEach((id, i) => {
  if (srcImages[i]) {
    const src = path.join(srcDir, srcImages[i]);
    const dest = path.join(destDir, `${id}.jpg`);
    fs.copyFileSync(src, dest);
    console.log(`✓ ${srcImages[i]} → ${id}.jpg`);
  }
});

// Copy hero slides
heroSlides.forEach(({ src, dest }) => {
  if (src) {
    fs.copyFileSync(path.join(srcDir, src), path.join(destDir, dest));
    console.log(`✓ ${src} → ${dest}`);
  }
});

console.log('\nDone! All images mapped.');
