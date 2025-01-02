import React from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ title, image, price, onAddToCart }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={title}
      />
      <div className="px-6 py-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 text-base mb-4">${price}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Define prop types
ProductCard.propTypes = {
  title: PropTypes.string.isRequired, // The title of the product
  image: PropTypes.string.isRequired, // URL for the product image
  price: PropTypes.number.isRequired, // Price of the product
  onAddToCart: PropTypes.func.isRequired, // Callback function when "Add to Cart" is clicked
};


