import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ProductsProvider } from './context/ProductsContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductsProvider>
      <ToastProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ToastProvider>
    </ProductsProvider>
  </React.StrictMode>
);
