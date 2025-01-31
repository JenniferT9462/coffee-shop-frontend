import Button from "@/components/Button";
// import data from "../../mocks/cart.json";
import CartItem from "@/components/CartItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
// import { loadCartFromLocalStorage, saveCartToLocalStorage } from "@/util";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;

export default function CartPage() {
  const [cartContent, setCartContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { token } = useAuth();

  console.log(token);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
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

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const cartData = await response.json();
      console.log("Fetched cart:", cartData);
      cartData.products.forEach((item) => console.log(item));
      setCartContents(cartData.products || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }

  //For updates from the cart page
  const saveCart = (updatedCart) => {
    setCartContents(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const removeItem = async (productId) => {
    try {
      console.log("Removing productId:", productId); // Log the productId to be removed

      // Fetch the item from the cartContent state that matches the productId
      const item = cartContent.find((cartItem) => cartItem.productId._id === productId);
      if (item) {
        console.log("Item productId:", item.productId._id); // Log the item productId to confirm it's correct

        const response = await fetch(`${BACKEND_URL}/cart/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          alert("Item has been removed from the cart!");
          setCartContents((prevContents) =>
            prevContents.filter((cartItem) => cartItem.productId._id !== productId)
          );
        } else {
          console.error("Failed to remove item:", data.message);
          alert("Failed to remove item.");
        }
      } else {
        console.error("Item not found in cart.");
        alert("Item not found in cart.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item.");
    }
  };

  const updateQuantity = async (id, delta) => {
    console.log("Updating quantity for item with productId:", id); // Log the productId you're passing
    console.log("Current cartContent:", cartContent); // Log the cart content to verify its structure

    // Find the cart item based on the productId
    const updatedItem = cartContent.find((item) => item.productId._id === id);

    if (!updatedItem) {
      console.error("Item not found in cart");
      alert("Item not found in cart.");
      return;
    }

    const newQuantity = Math.max(updatedItem.quantity + delta, 1); // Prevent quantity from going below 1

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
      setCartContents((prevCart) =>
        prevCart.map((item) =>
          item.productId._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error); // Log the error message for debugging
      alert(`Failed to update quantity: ${error.message}`);
    }
  };

  const calculateSubTotal = (item) => {
    return item.quantity * item.productId.price;
  };

  const calculateTotalPrice = () =>
    cartContent.reduce((total, product) => {
      if (!product.productId || typeof product.productId.price !== "number") {
        console.error("Skipping product with missing price:", product);
        return total;
      }
      return total + Number(product.productId.price) * Number(product.quantity);
    }, 0);

  console.log(cartContent);
  // console.log(cart);
  const subTotals = cartContent.map((item) => {
    return (
      <div
        key={item.cartItemId}
        className="flex justify-between items-center mb-4 border-b pb-2"
      >
        <div className="flex flex-col">
          <span className="font-bold">{item.productId.name}</span>
          <div className="text-sm text-gray-500">
            {/* TODO: figure out how to implement this with real calculations */}
            <span>{item.quantity} x </span>
            <span>${item.productId.price.toFixed(2)}</span>
          </div>
        </div>

        <span className="font-medium text-right">
          {/* TODO: figure out how to implement this with real calculations */}$
          {calculateSubTotal(item).toFixed(2)}
        </span>
      </div>
    );
  });
  const cartJSX = cartContent.map((item) => (
    <CartItem
      key={item._id}
      product={item} // Access the product details inside productId
      // quantity={item.quantity} // Pass the quantity directly
      updateQuantity={updateQuantity}
      removeItem={() => removeItem(item.productId._id)} // Pass the item ID for removal
    />
  ));

  function checkout() {
    alert("Proceeding to Checkout!");
    router.push("/checkout");
  }

  return (
    <div className="text-primary">
      <Header itemCount={cartContent.length} />
      <div className="container mx-auto p-4 text-primary">
        {/* Flex container for the cart and order summary */}
        <div className="flex flex-col md:flex-row gap-4 min-h-screen">
          {/* Shopping Cart Section */}
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <div className="space-y-4">{cartJSX}</div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full md:w-1/3 p-6 rounded-lg shadow-md bg-gray-50">
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Order Summary
            </h2>
            {subTotals}
            <div className="divider divider-primary divider-end"></div>
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total Price:</span>
              {/* TODO: Add function to calculate total */}
              <span>${calculateTotalPrice().toFixed(2)}</span>
            </div>
            <Button
              label="Proceed to Checkout"
              className="btn btn-primary w-full"
              handleClick={checkout}
            />
          </div>
        </div>
      </div>
      <Footer title="Brew Haven" />
    </div>
  );
}
