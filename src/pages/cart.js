import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

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
    } else {
      const storedCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCartContents(storedCart);
      setLoading(false);
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

      // Normalize backend cart structure
      const formattedCart = cartData.products.map((item) => ({
        _id: item.productId._id,
        name: item.productId.name,
        description: item.productId.description,
        imageUrl: item.productId.imageUrl,
        price: item.productId.price,
        quantity: item.quantity,
        cartItemId: item._id, // Needed for removing items
      }));

      // cartData.products.forEach((item) => console.log(item));
      // setCartContents(cartData.products || []);
      setCartContents(formattedCart);
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
      if (token) {
        const response = await fetch(`${BACKEND_URL}/cart/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to remove item");

        setCartContents((prev) =>
          prev.filter((item) => item._id !== productId)
        );
      } else {
        // Guest user - Remove from local storage
        const updatedCart = cartContent.filter(
          (item) => item._id !== productId
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartContents(updatedCart);
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item.");
    }
  };

  const updateQuantity = async (id, delta) => {
    if (token) {
      // Find the cart item based on the productId
      const updatedItem = cartContent.find((item) => item._id === id);

      if (!updatedItem) return;

      // Prevent quantity from going below 1
      const newQuantity = Math.max(updatedItem.quantity + delta, 1);

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
          });

      // Check if the response is not ok
      if (!response.ok) throw new Error("Failed to update quantity");

        // Update the local cartContent state to reflect the new quantity
      setCartContents((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
        console.error("Error updating quantity:", error); // Log the error message for debugging
        alert(`Failed to update quantity: ${error.message}`);
    }
  } else {
    // Update in local storage
    const updatedCart = cartContent.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
    );
    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    setCartContents(updatedCart);
  }
};

  const calculateSubTotal = (item) => {
    return item.quantity * item.price;
  };

  const calculateTotalPrice = () =>
    cartContent.reduce((total, product) => {
      if (!product._id || typeof product.price !== "number") {
        console.error("Skipping product with missing price:", product);
        return total;
      }
      return total + Number(product.price) * Number(product.quantity);
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
          <span className="font-bold">{item.name}</span>
          <div className="text-sm text-gray-500">
            {/* TODO: figure out how to implement this with real calculations */}
            <span>{item.quantity} x </span>
            <span>${item.price.toFixed(2)}</span>
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
      product={item} 
      updateQuantity={updateQuantity}
      removeItem={() => removeItem(item._id)} // Pass the item ID for removal
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
