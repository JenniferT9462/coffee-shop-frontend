import React from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import { useCart } from "@/context/CartContext";

// const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;

export default function CartSummary({ updateCart }) {
  // const [cartContent, setCartContents] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { cart, removeItem, updateQuantity } = useCart();

  // const { token } = useAuth();

  // useEffect(() => {
  //   if (token) {
  //     fetchCart();
  //   }
  // }, [token]);

  // async function fetchCart() {
  //   try {
  //     const response = await fetch(`${BACKEND_URL}/cart`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch cart");
  //     }

  //     const cartData = await response.json();
  //     console.log("Fetched cart:", cartData);
  //     cartData.products.forEach((item) => console.log(item));
  //     setCartContents(cartData.products || []); // Ensure it's an array
  //   } catch (error) {
  //     console.error("Error fetching cart:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const removeItem = (cartItemId) => {
  //   const updatedCart = cartContent.filter((product) => product.cartItemId !== cartItemId);
  //   // setCartContents(updatedCart);
  //   // saveCartToLocalStorage(updatedCart);
  //   alert("Item has been removed from the cart!");
  //   updateCart(updatedCart);
  // };

  // const removeItem = async (productId) => {
  //   try {
  //     console.log("Removing productId:", productId); // Log the productId to be removed

  //     // Fetch the item from the cartContent state that matches the productId
  //     const item = cartContent.find((cartItem) => cartItem.productId._id === productId);
  //     if (item) {
  //       console.log("Item productId:", item.productId._id); // Log the item productId to confirm it's correct

  //       const response = await fetch(`${BACKEND_URL}/cart/${productId}`, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         alert("Item has been removed from the cart!");
  //         setCartContents((prevContents) =>
  //           prevContents.filter((cartItem) => cartItem.productId._id !== productId)
  //         );
  //       } else {
  //         console.error("Failed to remove item:", data.message);
  //         alert("Failed to remove item.");
  //       }
  //     } else {
  //       console.error("Item not found in cart.");
  //       alert("Item not found in cart.");
  //     }
  //   } catch (error) {
  //     console.error("Error removing item:", error);
  //     alert("Failed to remove item.");
  //   }
  // };

  // const updateQuantity = (id, delta) => {
  //   const updatedCart = cartContent.map((product) => {
  //     if (product._id === id) {
  //       const newQuantity = (product.quantity || 1) + delta;
  //       return { ...product, quantity: Math.max(newQuantity, 1) }; // Ensure quantity is at least 1
  //     }
  //     return product;
  //   });
  //   updateCart(updatedCart);
  //   //   // saveCart(updatedCart);
  //   //   setCartContents(updatedCart);
  //   //   saveCartToLocalStorage(updatedCart);
  // };

  // const updateQuantity = async (id, delta) => {
  //   console.log("Updating quantity for item with productId:", id); // Log the productId you're passing
  //   console.log("Current cartContent:", cartContent); // Log the cart content to verify its structure

  //   // Find the cart item based on the productId
  //   const updatedItem = cartContent.find((item) => item.productId._id === id);

  //   if (!updatedItem) {
  //     console.error("Item not found in cart");
  //     alert("Item not found in cart.");
  //     return;
  //   }

  //   const newQuantity = Math.max(updatedItem.quantity + delta, 1); // Prevent quantity from going below 1

  //   try {
  //     const response = await fetch(
  //       `${BACKEND_URL}/cart/${updatedItem.productId._id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ quantity: newQuantity }),
  //       }
  //     );

  //     // Check if the response is not ok
  //     if (!response.ok) {
  //       const errorData = await response.json(); // Try to get the error message from the response
  //       console.error("Failed to update quantity. Response:", errorData);
  //       throw new Error(
  //         `Failed to update quantity. Server responded with: ${errorData.message}`
  //       );
  //     }

  //     // Update the local cartContent state to reflect the new quantity
  //     setCartContents((prevCart) =>
  //       prevCart.map((item) =>
  //         item.productId._id === id ? { ...item, quantity: newQuantity } : item
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating quantity:", error); // Log the error message for debugging
  //     alert(`Failed to update quantity: ${error.message}`);
  //   }
  // };

  const calculateTotalPrice = () =>
    cart.reduce(
      (total, product) =>
        total + (Number(product.productId.price) || 0) * (Number(product.quantity) || 1),
      0
    );

  const cartJSX = cart.map((product, idx) => (
    <CartItem
      key={product._id + idx}
      product={product}
      // updateQuantity={updateQuantity}
      updateQuantity={(id, delta) => {
        console.log("Updating item with ID:", id, "Delta:", delta);
        updateQuantity(id, delta);
      }}
      removeItem={() => removeItem(product.productId._id)}
    />
  ));

  return (
    <div className="shadow-lg rounded-lg bg-base-100 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      {/* <div className="space-y-4">
        {cartJSX}
        <div className="text-end">
          <h2 className="text-lg font-bold">
            Total Price:<span> ${calculateTotalPrice().toFixed(2)}</span>
          </h2>
        </div>
      </div> */}
      <div className="space-y-4">
        {cart.length > 0 ? (
          cartJSX
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
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
