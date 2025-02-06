import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { token } = useAuth();
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  async function fetchCart() {
    if (token) {
      try {
        const response = await fetch(`${BACKEND_URL}/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // if (!response.ok) throw new Error("Failed to fetch cart");

        if (!response.ok) {
          if (response.status === 404) {
            // Handle empty cart scenario
            setCart([]);
            return;
          }
          throw new Error("Failed to fetch cart");
        }
  

        const cartData = await response.json();

        setCart(
          cartData.products.map((item) => ({
            _id: item.productId._id,
            name: item.productId.name,
            imageUrl: item.productId.imageUrl,
            price: item.productId.price,
            quantity: Number(item.quantity) || 1,
          }))
        );
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    } else {
      // Load guest cart from localStorage
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCart(guestCart);
    }
  }

  async function removeItem(productId) {
    if (token) {
      try {
        const response = await fetch(`${BACKEND_URL}/cart/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to remove item");

        setCart((prevCart) =>
          prevCart.filter((item) => item._id !== productId)
        );
      } catch (error) {
        console.error("Error removing item:", error);
      }
    } else {
      // Remove from guest cart
      const updatedCart = cart.filter((item) => item._id !== productId);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  }

  const updateQuantity = async (id, delta) => {
    if (token) {
      try {
        const response = await fetch(`${BACKEND_URL}/cart/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: delta }),
        });

        if (!response.ok) throw new Error("Failed to update quantity");

        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === id
              ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
              : item
          )
        );
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      // Guest user quantity update
      const updatedCart = cart.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      );
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const clearCart = async () => {
    try {
      if (token) {
        // Authenticated user: Clear cart from backend
        const response = await fetch(`${BACKEND_URL}/cart`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to clear cart from backend");
        }
      } else {
        // Guest user: Clear cart from local storage
        localStorage.removeItem("guestCart");
      }

      setCart([]); // Clear cart state in context
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, fetchCart, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
