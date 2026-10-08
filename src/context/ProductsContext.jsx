import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../api/productsApi';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'success'
  const [error, setError] = useState(null);

  const loadData = useCallback(() => {
    setStatus('loading');
    setError(null);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setStatus('success');
      })
      .catch((err) => {
        setError(err.message || 'An unexpected error occurred.');
        setStatus('error');
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const value = {
    products,
    status,
    error,
    retry: loadData,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
