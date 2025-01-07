import React from 'react';
import PropTypes from 'prop-types';

export default function CartItem({ title }) {
  return (
    <div className="flex items-center justify-between bg-white p-4 border-b">
      <div>Cart Item Component {title} </div>
    </div>
  );
};

// Define prop types
CartItem.propTypes = {
  title: PropTypes.string.isRequired, // The title of the product
};


