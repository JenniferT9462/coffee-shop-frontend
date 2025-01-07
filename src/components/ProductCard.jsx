import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

export default function ProductCard({ product }) {
  console.log(product)
  if (!product) {
    return <div>Loading...</div>; // or display an error message
  }

  return (
    <div className="flex flex-col bg-white border rounded-lg shadow-md p-4 h-full">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
      <div>
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
      <Button label="Add to Cart" />
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
