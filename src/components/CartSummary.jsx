import React from "react";
import PropTypes from "prop-types";
import cart from "../../mocks/cart.json";
import CartItem from "./CartItem";

export default function CartSummary({ title }) {
  const cartContent = cart.items;
  const price = cart.totalPrice;
  
  const cartJSX = cartContent.map((product) => {
      function removeItem() {
        alert(product.name + "Has Been Removed From Cart!")
      }
      return (<CartItem
                key={product._id}
                product={product}
                removeItem={removeItem}
                />)
    })
  return (
    <div className="shadow-lg rounded-lg bg-base-100 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      <div className="space-y-4">
        {cartJSX}
        <div className="text-end">
         <h2 className="text-lg font-bold">Total Price:<span> ${price.toFixed(2)}</span></h2>  
        </div>
      </div>
      
    </div>
  );
}

CartSummary.propTypes = {
  title: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired, // URL for the product image
};
