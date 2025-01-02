import React from 'react';
import PropTypes from 'prop-types';

export default function CartItem({ title, image, price, quantity, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex items-center justify-between bg-white p-4 border-b">
      <div className="flex items-center">
        <img
          className="w-16 h-16 object-cover rounded"
          src={image}
          alt={title}
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">${price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center border rounded">
          <button
            className="px-2 text-gray-600 hover:text-gray-800"
            onClick={() => onUpdateQuantity(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            className="px-2 text-gray-600 hover:text-gray-800"
            onClick={() => onUpdateQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

// Define prop types
CartItem.propTypes = {
  title: PropTypes.string.isRequired, // The title of the product
  image: PropTypes.string.isRequired, // URL for the product image
  price: PropTypes.number.isRequired, // Price of the product
  quantity: PropTypes.number.isRequired, // Quantity of the product in the cart
  onRemove: PropTypes.func.isRequired, // Callback for removing the item from the cart
  onUpdateQuantity: PropTypes.func.isRequired, // Callback for updating the quantity
};


