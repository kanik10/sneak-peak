/**
 * Formats price integer in smallest currency units (cents) into formatted currency.
 * e.g. 17500 -> "$175.00"
 */
export function formatPrice(cents, currency = 'USD') {
  if (cents == null || isNaN(cents)) return '$0.00';
  const dollars = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(dollars);
}

/**
 * Formats integers with thousands commas (e.g. 1420 -> "1,420")
 */
export function formatNumber(num) {
  if (num == null) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}
