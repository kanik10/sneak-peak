import React from 'react';
import './QuantityStepper.css';

export function QuantityStepper({ quantity, onIncrement, onDecrement, max = 10, min = 1 }) {
  return (
    <div className="qty-stepper" role="group" aria-label="Quantity selector">
      <button
        type="button"
        className="qty-stepper-btn"
        onClick={onDecrement}
        aria-label={quantity === min ? 'Remove from receipt' : 'Decrease quantity'}
        title={quantity === min ? 'Remove from receipt' : 'Decrease'}
      >
        -
      </button>

      <span className="qty-stepper-value" aria-live="polite">
        {quantity}
      </span>

      <button
        type="button"
        className="qty-stepper-btn"
        onClick={onIncrement}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        title="Increase"
      >
        +
      </button>
    </div>
  );
}
