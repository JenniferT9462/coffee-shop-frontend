import React from 'react';
import PropTypes from 'prop-types';

export default function Toast({ message }) {
  return (
      <div
        className={'fixed top-5 right-5 flex items-center p-4 rounded border shadow-lg'}
        role="alert"
      >
        <div>Toast Component</div>
        <div>{message}</div>
      </div>
  );
};

// Define prop types
Toast.propTypes = {
  message: PropTypes.string.isRequired, // The message to display in the toast
};



