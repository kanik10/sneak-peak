import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format';
import { QuantityStepper } from './QuantityStepper';
import { useCart } from '../../context/CartContext';
import './CartLine.css';

export function CartLine({ item }) {
  const { product, quantity } = item;
  const { setQty, removeWithUndo } = useCart();

  const handleDecrement = () => {
    if (quantity <= 1) {
      removeWithUndo(product.id, product.name);
    } else {
      setQty(product.id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQty(product.id, Math.min(10, quantity + 1));
  };

  const lineTotal = product.price * quantity;

  return (
    <div className="cart-line" id={`cart-line-${product.id}`}>
      <img src={product.image} alt="" className="cart-line-thumb" />

      <div className="cart-line-details">
        <h4 className="cart-line-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h4>
        <div className="cart-line-meta">
          <span>{formatPrice(product.price)} ea</span>
          <span>•</span>
          <span style={{ textTransform: 'uppercase' }}>{product.category}</span>
        </div>
      </div>

      <div className="cart-line-controls-wrap" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <QuantityStepper
          quantity={quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          max={Math.min(10, product.stock)}
        />

        <div className="cart-line-pricing">
          <div className="cart-line-total">{formatPrice(lineTotal)}</div>
          <button
            type="button"
            className="cart-line-remove"
            onClick={() => removeWithUndo(product.id, product.name)}
            aria-label={`Remove ${product.name} from receipt`}
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
}
