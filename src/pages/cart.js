import Button from "@/components/Button";
// import data from "../../mocks/cart.json";
import CartItem from "@/components/CartItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "@/util";

export default function CartPage() {
  const [cartContent, setCartContents] = useState([]);

  useEffect(() => {
    const cartData = loadCartFromLocalStorage();
    console.log("Loaded cart data:", cartData); // Debug log
    if (cartData) setCartContents(cartData);
  }, []);

  //For updates from the cart page 
  const saveCart = (updatedCart) => {
    setCartContents(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };
  const removeItem = (cartItemId) => {
    const updatedCart = cartContent.filter((product) => product.cartItemId !== cartItemId);
    setCartContents(updatedCart);
    saveCartToLocalStorage(updatedCart);
    alert("Item has been removed from the cart!");
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cartContent.map((product) => {
      if (product._id === id) {
        const newQuantity = (product.quantity || 1) + delta;
        return { ...product, quantity: Math.max(newQuantity, 1) }; // Ensure quantity is at least 1
      }
      return product;
    });
    // saveCart(updatedCart);
    setCartContents(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const calculateSubTotal = (product) => {
    return product.quantity * product.price;
  };
  
  const calculateTotalPrice = () =>
    cartContent.reduce(
      (total, product) => total + Number(product.price) * Number(product.quantity),
      0
    );
  const subTotals = cartContent.map((item) => {
    return (
      <div className="flex justify-between items-center mb-4 border-b pb-2">
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
  const cartJSX = cartContent.map((product, idx) => (
    <CartItem
      key={product._id + idx}
      product={product}
      updateQuantity={updateQuantity}
      removeItem={() => removeItem(product.cartItemId)}
    />
  ));

  const router = useRouter();
  function checkout() {
    alert("Proceeding to Checkout!");
    router.push("/checkout");
  }

  return (
    <div className="text-primary">
      <Header itemCount={cartContent.length}/>
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
