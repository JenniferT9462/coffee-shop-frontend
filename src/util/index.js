// src/util/index.js
import { v4 as uuidv4 } from "uuid";

export const loadProductsFromLocalStorage = () => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

// export const loadCartFromLocalStorage = () => {
//   const cart = localStorage.getItem('cart');
//   return cart ? JSON.parse(cart) : [];
// };

export function loadCartFromLocalStorage() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!Array.isArray(cart)) {
      console.error("Cart in localstorage is not an array. Resetting cart.");
      return [];
    }
    return cart.map((product) => ({
      ...product,
      cartItemId: product.cartItemId || uuidv4(),
      price: Number(product.price) || 0, // Ensure price is a number, default to 0 if invalid
      quantity: Number(product.quantity) || 1, // Ensure quantity is a number, default to 1 if invalid
    }));
  } catch (error) {
    console.error("Error loading cart from localstorage", error);
    return [];
  }
}

export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const saveOrderToLocalStorage = (orderDetails) => {
  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
  existingOrders.push(orderDetails);
  localStorage.setItem("orders", JSON.stringify(existingOrders));
};

export const saveProductsToLocalStorage = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

export const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const loginUserToLocalStorage = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};
