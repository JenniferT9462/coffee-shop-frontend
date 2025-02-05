import React from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import { useCart } from "@/context/CartContext";

export default function CartSummary({ updateCart }) {
  const { cart, removeItem, updateQuantity } = useCart();

  const calculateTotalPrice = () =>
    cart.reduce(
      (total, product) =>
        total +
        (Number(product.price) || 0) *
          (Number(product.quantity) || 1),
      0
    );

  const cartJSX = cart.map((product, idx) => (
    <CartItem
      key={product._id + idx}
      product={product}
      // updateQuantity={updateQuantity}
      updateQuantity={(id, delta) => {
        console.log("Updating item with ID:", id, "Delta:", delta);
        updateQuantity(id, delta);
      }}
      removeItem={() => removeItem(product._id)}
    />
  ));

  return (
    <div className="shadow-lg rounded-lg bg-base-100 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4">
        {cart.length > 0 ? (
          cartJSX
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
        <div className="text-end">
          <h2 className="text-lg font-bold">
            Total Price:<span> ${calculateTotalPrice().toFixed(2)}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

CartSummary.propTypes = {
  title: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired, // URL for the product image
};
