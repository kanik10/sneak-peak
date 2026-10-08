import products from '../data/products.json';

/**
 * Simulates an asynchronous API fetch with query parameter testing flags.
 * - ?error=1: forces a rejection/error state
 * - ?slow=1: stretches response delay to 3000ms instead of 600ms
 * Reading window.location.search dynamically allows the "Retry" button to re-evaluate flags.
 */
export function fetchProducts() {
  const p = new URLSearchParams(window.location.search);
  return new Promise((resolve, reject) => {
    const delay = p.get('slow') === '1' ? 3000 : 600;
    setTimeout(() => {
      if (p.get('error') === '1') {
        reject(new Error('Could not load products from the Sneak Peak archive'));
      } else {
        resolve(products);
      }
    }, delay);
  });
}
