import fs from 'fs';
import path from 'path';

const mapping = {
  'paper-archive-craft-low': 'clean_important_1003.jpg',
  'tokyo-parchment-runner': 'clean_2018-12-07_06-48-01_UTC.jpg',
  'heritage-ink-high': 'clean_important_17368.jpg',
  'kraft-waffle-trainer': 'clean_2019-01-25_00-29-05_UTC.jpg',
  'monolith-canvas-skate': 'clean_2019-01-21_19-18-49_UTC.jpg',
  'deconstructed-blueprint-special-edition': 'clean_important_10091.jpg',
  'sumi-shadow-trail-matrix': 'clean_2019-01-21_19-31-59_UTC.jpg',
  'vellum-suede-lo-pro': 'clean_important_10003.jpg',
  'origami-fold-high': 'clean_2019-01-21_20-04-03_UTC.jpg',
  'terrazzo-aeroflux-carbon': 'clean_2019-01-21_20-48-31_UTC.jpg',
  'pressed-linen-slip-on': 'clean_2018-10-11_19-57-37_UTC.jpg',
  'vintage-leather-hardwood-84': 'clean_important_10085.jpg',
  'cyanotype-indigo-dunk': 'clean_important_13497.jpg',
  'unbleached-ecru-marathon': 'clean_important_10079.jpg',
  'charcoal-rubbed-sk8': 'clean_important_4092.jpg',
  'papyrus-gold-olympic-court': 'clean_important_8445.jpg',
  'botanical-tea-tint-trainer': 'clean_2019-01-28_15-12-55_UTC_1.jpg',
  'typewriter-ribbon-monochrome': 'clean_2019-01-21_19-36-48_UTC.jpg'
};

const srcDir = path.resolve('sneaker_images_1024x1024');
const destDir = path.resolve('public/images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

for (const [id, srcFile] of Object.entries(mapping)) {
  const srcPath = path.join(srcDir, srcFile);
  const destPath = path.join(destDir, `${id}.jpg`);

  if (!fs.existsSync(srcPath)) {
    console.error(`Missing source image: ${srcPath}`);
    continue;
  }

  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${srcFile} -> public/images/${id}.jpg`);
}

// Update products.json
const productsPath = path.resolve('src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

for (const p of products) {
  if (mapping[p.id]) {
    p.image = `/images/${p.id}.jpg`;
  }
}

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log('Updated src/data/products.json with real sneaker photos!');
