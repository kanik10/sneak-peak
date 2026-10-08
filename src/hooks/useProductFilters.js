import { useSearchParams } from 'react-router-dom';

/**
 * Custom hook synchronizing product filters with the URL search parameters (?q=&cat=&sort=).
 */
export function useProductFilters() {
  const [params, setParams] = useSearchParams();

  const filters = {
    q: params.get('q') ?? '',
    cat: params.get('cat') ?? 'all',
    sort: params.get('sort') ?? 'featured',
  };

  const update = (patch, replace = false) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(patch).forEach(([k, v]) => {
        if (v && v !== 'all' && v !== 'featured') {
          next.set(k, v);
        } else if (k === 'cat' && v === 'all') {
          next.delete(k);
        } else if (k === 'sort' && v === 'featured') {
          next.delete(k);
        } else if (!v) {
          next.delete(k);
        }
      });
      return next;
    }, { replace });
  };

  const clear = () => setParams({});

  return { filters, update, clear };
}
