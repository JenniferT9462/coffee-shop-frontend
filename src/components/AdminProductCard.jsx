import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

export default function AdminProductCard({ product, onDeleteProduct, onEditProduct }) {
  console.log(product);
  if (!product) {
    return <div>Loading...</div>; 
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card w-64 bg-base-100 shadow-xl">
        {/* Daisy UI Figure */}
        <figure className="h-48">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </figure>
        <div>
          <h3 className="card-title">{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
        <div className="mt-auto card-actions">
          <Button
            label="Delete Product"
            handleClick={onDeleteProduct}
            fullWidth
          />
          {onEditProduct && (
            <Button label="Edit" variant="info" handleClick={onEditProduct} fullWidth/>
          )}
        </div>
      </div>
    </div>
  );
}

AdminProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  onEditProduct: PropTypes.func,
};

AdminProductCard.defaultProps = {
  onEditProduct: null,
};
