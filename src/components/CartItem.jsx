import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

export default function CartItem({ product, updateQuantity, removeItem }) {
  const handleIncrease = () => {
    updateQuantity(product._id, 1);
  };

  const handleDecrease = () => {
    updateQuantity(product._id, -1);
  };
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-16 h-16 object-cover mr-4"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500">
          Price: ${product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          Subtotal: ${(product.price * product.quantity).toFixed(2)}
        </p>
      </div>
      {/* Quantity buttons */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          // TODO: Add function to calculate quantity change
          onClick={handleDecrease} // Placeholder for decrease functionality
          className="btn btn-sm btn-secondary"
          disabled={product.quantity <= 1}
        >
          -
        </button>
        <span>{product.quantity}</span>
        <button
          // TODO: Add function to calculate quantity change
          onClick={handleIncrease} // Placeholder for increase functionality
          className="btn btn-sm btn-secondary"
          type="button"
        >
          +
        </button>
        <Button
          type="button"
          // TODO Add function to remove items
          variant="error"
          label="Remove"
          handleClick={removeItem}
        />
      </div>
    </div>
  );
}

// Define prop types
CartItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired, // Product data structure
  removeItem: PropTypes.func.isRequired, // Function to handle removal
};
