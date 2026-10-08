/**
 * Pure function to filter and sort products.
 *
 * @param {Array} products - List of product items
 * @param {Object} filters - { q: string, cat: string, sort: string }
 * @returns {Array} Filtered and sorted products
 */
export function filterProducts(products = [], { q = '', cat = 'all', sort = 'featured' } = {}) {
  if (!Array.isArray(products)) return [];

  const query = q.trim().toLowerCase();
  const category = (cat || 'all').toLowerCase();

  // 1. Filtering
  const filtered = products.filter((item) => {
    // Category check
    if (category !== 'all' && item.category.toLowerCase() !== category) {
      return false;
    }

    // Text search query
    if (query) {
      const matchName = item.name.toLowerCase().includes(query);
      const matchDesc = item.description ? item.description.toLowerCase().includes(query) : false;
      const matchCat = item.category.toLowerCase().includes(query);
      const matchId = item.id.toLowerCase().includes(query);
      if (!matchName && !matchDesc && !matchCat && !matchId) {
        return false;
      }
    }

    return true;
  });

  // 2. Sorting
  return [...filtered].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating - a.rating || b.ratingCount - a.ratingCount;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'featured':
      default:
        return 0; // maintain original curated archive order
    }
  });
}
