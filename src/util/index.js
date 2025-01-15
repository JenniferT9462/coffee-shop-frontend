// src/util/index.js
export const loadProductsFromLocalStorage = () => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  };
  
  // export const loadCartFromLocalStorage = () => {
  //   const cart = localStorage.getItem('cart');
  //   return cart ? JSON.parse(cart) : [];
  // };

  export function loadCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.map((product) => ({
      ...product,
      price: Number(product.price) || 0, // Ensure price is a number, default to 0 if invalid
      quantity: Number(product.quantity) || 1, // Ensure quantity is a number, default to 1 if invalid
    }));
  }
  
  export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  
  export const saveProductsToLocalStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  };
  
  export const saveUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const loginUserToLocalStorage = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };
  