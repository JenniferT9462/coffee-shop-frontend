import React from 'react';
import PropTypes from 'prop-types';

export default function CartItem({ product, onRemove, onQuantityChange }) {
    return (
      <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover mr-4" />
        <div className="flex-grow">
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-sm text-gray-500">Price: ${product.price}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onQuantityChange(product._id, product.quantity - 1)}
            className="btn btn-sm btn-secondary"
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <span>{product.quantity}</span>
          <button
            onClick={() => onQuantityChange(product._id, product.quantity + 1)}
            className="btn btn-sm btn-secondary"
          >
            +
          </button>
          <button
            onClick={onRemove}
            className="btn btn-sm btn-error text-white"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }


// Define prop types
CartItem.propTypes = {
  product: PropTypes.string.isRequired, // The title of the product
  onRemove: PropTypes.func.isRequired,  // Function to handle removal
  onQuantityChange: PropTypes.func.isRequired, // Function to handle quantity changes
};


