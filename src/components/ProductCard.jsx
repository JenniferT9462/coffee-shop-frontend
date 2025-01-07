import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

export default function ProductCard({ product }) {
  console.log(product)
  if (!product) {
    return <div>Loading...</div>; // or display an error message
  }

  return (
    <div className="card max-w-sm rounded overflow-hidden shadow-lg bg-white border">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <Button label="Add to Cart" />
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
