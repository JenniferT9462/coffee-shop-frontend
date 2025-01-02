import React from 'react';
import PropTypes from 'prop-types';

export default function CartSummary({ totalItems, totalPrice, onCheckout }) {
 
  return (
    <div className="p-4 bg-white rounded shadow-lg border">
      <h2 className="text-lg font-bold mb-4">Cart Summary</h2>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700">Total Items:</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700">Total Price:</span>
        <span>{totalPrice}</span>
      </div>
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

CartSummary.propTypes = {
  totalItems: PropTypes.string.isRequired, // The title of the product
  totalPrice: PropTypes.string.isRequired, // URL for the product image
  
};

