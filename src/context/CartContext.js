import { createContext, useContext, useState, useEffect } from "react";
// import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children, token }) {
  const [cart, setCart] = useState([]);
//   const { token } = useAuth();
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  async function fetchCart() {
    try {
      const response = await fetch(`${BACKEND_URL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch cart");

      const cartData = await response.json();
      
    //   setCart(cartData.products || []);
     // Ensure quantity is a number for all products
     const updatedCart = cartData.products.map((item) => ({
        ...item,
        quantity: Number(item.quantity) || 1,  // Default to 1 if quantity is not a valid number
      }));
  
      setCart(updatedCart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  async function removeItem(productId) {
    try {
      const response = await fetch(`${BACKEND_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCart((prevCart) =>
          prevCart.filter((item) => item.productId._id !== productId)
        );
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }

  const updateQuantity = async (id, delta) => {
      console.log("Updating quantity for item with productId:", id); // Log the productId you're passing
      console.log("Current cartContent:", cart); // Log the cart content to verify its structure
  
      // Find the cart item based on the productId
      const updatedItem = cart.find((item) => item.productId._id === id);
  
      if (!updatedItem) {
        console.error("Item not found in cart");
        alert("Item not found in cart.");
        return;
      }

      const currentQuantity = Number(updatedItem.quantity) || 1;
      const newQuantity = Math.max(currentQuantity + delta, 1); // Prevent quantity from going below 1
      console.log("Current quantity:", currentQuantity, "New quantity:", newQuantity);
  
      try {
        const response = await fetch(
          `${BACKEND_URL}/cart/${updatedItem.productId._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity: newQuantity }),
          }
        );
  
        // Check if the response is not ok
        if (!response.ok) {
          const errorData = await response.json(); // Try to get the error message from the response
          console.error("Failed to update quantity. Response:", errorData);
          throw new Error(
            `Failed to update quantity. Server responded with: ${errorData.message}`
          );
        }
  
        // Update the local cartContent state to reflect the new quantity
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.productId._id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      } catch (error) {
        console.error("Error updating quantity:", error); // Log the error message for debugging
        alert(`Failed to update quantity: ${error.message}`);
      }
    };
  

  return (
    <CartContext.Provider value={{ cart, setCart, removeItem, updateQuantity, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
