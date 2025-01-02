import React from 'react';
import PropTypes from 'prop-types';

export default function Toast({ message, type, onClose }) {
  // Set dynamic classes based on the toast type
  const toastTypeClasses = {
    success: 'bg-green-100 text-green-800 border-green-500',
    error: 'bg-red-100 text-red-800 border-red-500',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    info: 'bg-blue-100 text-blue-800 border-blue-500',
  };

  const toastClass = toastTypeClasses[type] || toastTypeClasses.info;

  return (
    <div
      className={`fixed top-5 right-5 flex items-center p-4 rounded border shadow-lg ${toastClass}`}
      role="alert"
    >
      <span className="flex-grow">{message}</span>
      {onClose && (
        <button
          className="ml-4 text-lg font-bold text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
      )}
    </div>
  );
};

// Define prop types
Toast.propTypes = {
  message: PropTypes.string.isRequired, // The message to display in the toast
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']), // The type of the toast
  onClose: PropTypes.func, // Optional callback for closing the toast
};

// Set default props
Toast.defaultProps = {
  type: 'info',
  onClose: null,
};


