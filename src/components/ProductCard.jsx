import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

export default function ProductCard({ product }) {
  console.log(product)
  if (!product) {
    return <div>Loading...</div>; // or display an error message
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card w-64 bg-base-100 shadow-xl">
        <figure className="h-48">
          <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
        </figure>
        <div>
          <h3 className="card-title">{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
        <div className="mt-auto card-actions justify-end">
          <Button label="Add to Cart" handleClick={() => alert("Product Added to Cart!")} />
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
