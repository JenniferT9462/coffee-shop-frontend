import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

export default function CartSummary({ title, totalPrice}) {
  return (
    <div className="shadow-md rounded-lg bg-base-100 p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-2">
        {/* TODO: Add real cart data and calculate total */}
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
          <span>{totalPrice}</span>
        </li>
      </ul>
      {/* TODO: Add functionality for checkout */}
      <Button
        className="btn btn-primary w-full"
        label="Buy Now"
        handleClick={() => {
          alert("Thank you for your patronage");
        }}
      />
    </div>
  );
}

CartSummary.propTypes = {
  title: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired, // URL for the product image
};
