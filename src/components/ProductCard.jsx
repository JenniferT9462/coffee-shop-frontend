import React from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ title }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border">
      <div>Product Card Component {title} </div>
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


