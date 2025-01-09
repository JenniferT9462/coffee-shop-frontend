import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

export default function CartSummary() {
  return (
    <div className="shadow-md rounded-lg bg-base-100 p-4 h-1/2">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span>Item 1</span>
          <span>$10.00</span>
        </li>
        <li className="flex justify-between">
          <span>Item 2</span>
          <span>$15.00</span>
        </li>
        <li className="flex justify-between font-bold">
          <span>Total</span>
          <span>$25.00</span>
        </li>
      </ul>
      <Button
        className="btn btn-primary w-full"
        label="Proceed to Checkout"
        handleClick={() => {
          alert("Thank you for your patronage");
        }}
      />
    </div>
  );
}

CartSummary.propTypes = {
  title: PropTypes.string.isRequired,
  totalItems: PropTypes.string.isRequired, // The title of the product
  totalPrice: PropTypes.string.isRequired, // URL for the product image
};
