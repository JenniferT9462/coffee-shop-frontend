import React from "react";
import PropTypes from "prop-types";
// import cart from "../../mocks/cart.json";
import CartItem from "./CartItem";
// import { useState, useEffect } from "react";
// import { loadCartFromLocalStorage, saveCartToLocalStorage } from "@/util";

export default function CartSummary({ cartContent, updateCart }) {
  const removeItem = (id) => {
    const updatedCart = cartContent.filter((product) => product._id !== id);
    // setCartContents(updatedCart);
    // saveCartToLocalStorage(updatedCart);
    alert("Item has been removed from the cart!");
    updateCart(updatedCart);
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cartContent.map((product) => {
      if (product._id === id) {
        const newQuantity = (product.quantity || 1) + delta;
        return { ...product, quantity: Math.max(newQuantity, 1) }; // Ensure quantity is at least 1
      }
      return product;
    });
    updateCart(updatedCart);
    //   // saveCart(updatedCart);
    //   setCartContents(updatedCart);
    //   saveCartToLocalStorage(updatedCart);
  };

  const calculateTotalPrice = () =>
    cartContent.reduce(
      (total, product) =>
        total + Number(product.price) * Number(product.quantity || 1),
      0
    );

    const cartJSX = cartContent.map((product) => (
      <CartItem
        key={product._id}
        product={product}
        updateQuantity={updateQuantity}
        removeItem={() => removeItem(product._id)}
      />
    ));

  // const [cartContent, setCartContents] = useState([]);

  // useEffect(() => {
  //   const cartData = loadCartFromLocalStorage();
  //   console.log("Loaded cart data:", cartData); // Debug log
  //   if (cartData) setCartContents(cartData);
  // }, []);

  return (
    <div className="shadow-lg rounded-lg bg-base-100 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      <div className="space-y-4">
        {cartJSX}
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
