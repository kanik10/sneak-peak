import assert from 'node:assert';
import { cartReducer } from '../src/utils/cartReducer.js';
import { loadCart } from '../src/utils/cartStorage.js';
import { filterProducts } from '../src/utils/filterProducts.js';
import { formatPrice, formatNumber } from '../src/utils/format.js';
import products from '../src/data/products.json' with { type: 'json' };

console.log('--- Running Sneak Peak Logic & Reducer Tests ---');

// 1. Reducer test: ADD
let state = {};
state = cartReducer(state, { type: 'ADD', id: 'tokyo-parchment-runner', qty: 1 });
assert.strictEqual(state['tokyo-parchment-runner'], 1, 'Should add item with quantity 1');

state = cartReducer(state, { type: 'ADD', id: 'tokyo-parchment-runner', qty: 2 });
assert.strictEqual(state['tokyo-parchment-runner'], 3, 'Should increment quantity to 3');

// 2. Reducer test: Clamping at MAX_QTY = 10
state = cartReducer(state, { type: 'SET_QTY', id: 'tokyo-parchment-runner', qty: 99 });
assert.strictEqual(state['tokyo-parchment-runner'], 10, 'Should clamp max quantity to 10');

state = cartReducer(state, { type: 'SET_QTY', id: 'tokyo-parchment-runner', qty: 0 });
assert.strictEqual(state['tokyo-parchment-runner'], 1, 'Should clamp min quantity to 1');

// 3. Reducer test: REMOVE
state = cartReducer(state, { type: 'REMOVE', id: 'tokyo-parchment-runner' });
assert.strictEqual(state['tokyo-parchment-runner'], undefined, 'Should remove item');

// 4. Reducer test: CLEAR
state = { a: 1, b: 2 };
state = cartReducer(state, { type: 'CLEAR' });
assert.deepStrictEqual(state, {}, 'Should clear cart');

// 5. Reducer test: HYDRATE
state = cartReducer(state, { type: 'HYDRATE', state: { 'vintage-leather-hardwood-84': 2 } });
assert.strictEqual(state['vintage-leather-hardwood-84'], 2, 'Should hydrate state');

// 6. Formatting tests
assert.strictEqual(formatPrice(17500), '$175.00', 'Should format cents to USD');
assert.strictEqual(formatPrice(34000), '$340.00', 'Should format cents to USD');
assert.strictEqual(formatPrice(0), '$0.00', 'Should format zero cents');
assert.strictEqual(formatNumber(1250), '1,250', 'Should format integer with commas');

// 7. Filter tests
const allResults = filterProducts(products, { q: '', cat: 'all', sort: 'featured' });
assert.strictEqual(allResults.length, products.length, 'Should return all products');

const retroResults = filterProducts(products, { q: '', cat: 'retro', sort: 'featured' });
assert.ok(retroResults.length > 0, 'Should find retro sneakers');
assert.ok(retroResults.every(p => p.category === 'retro'), 'All items should belong to retro');

const searchResults = filterProducts(products, { q: 'Blueprint', cat: 'all', sort: 'featured' });
assert.strictEqual(searchResults.length, 1, 'Should match Blueprint collab');
assert.strictEqual(searchResults[0].id, 'deconstructed-blueprint-special-edition', 'Should find exact id');

// 8. Sorting test
const priceAsc = filterProducts(products, { q: '', cat: 'all', sort: 'price-asc' });
for (let i = 0; i < priceAsc.length - 1; i++) {
  assert.ok(priceAsc[i].price <= priceAsc[i + 1].price, 'Prices should be sorted ascending');
}

const priceDesc = filterProducts(products, { q: '', cat: 'all', sort: 'price-desc' });
for (let i = 0; i < priceDesc.length - 1; i++) {
  assert.ok(priceDesc[i].price >= priceDesc[i + 1].price, 'Prices should be sorted descending');
}

console.log('✓ All 8 test suites passed with 100% assertions satisfied!');
