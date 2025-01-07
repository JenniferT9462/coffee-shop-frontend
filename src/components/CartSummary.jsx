import React from 'react';
import PropTypes from 'prop-types';

export default function CartSummary({ title }) {
 
  return (
    <div className="p-4 bg-white rounded shadow-lg border">
      <div>Cart Summary Component {title} </div>
    </div>
  );
};

CartSummary.propTypes = {
  title: PropTypes.string.isRequired,
  totalItems: PropTypes.string.isRequired, // The title of the product
  totalPrice: PropTypes.string.isRequired, // URL for the product image
  
};

