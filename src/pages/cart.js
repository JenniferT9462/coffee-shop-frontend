import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeItem, fetchCart } = useCart();

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { token } = useAuth();

  console.log(token);

  // Fetch cart when the component mounts
  useEffect(() => {
    fetchCart();
  }, [token]);

  const calculateSubTotal = (item) => item.quantity * item.price;

  const calculateTotalPrice = () =>
    cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

  function checkout() {
    alert("Proceeding to Checkout!");
    router.push("/checkout");
  }

  console.log(cart);

  return (
    <div className="text-primary">
      <Header itemCount={cart.length} />
      <div className="container mx-auto p-4 text-primary">
        {/* Flex container for the cart and order summary */}
        <div className="flex flex-col md:flex-row gap-4 min-h-screen">
          {/* Shopping Cart Section */}
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item._id}
                  product={item}
                  updateQuantity={updateQuantity}
                  removeItem={() => removeItem(item._id)}
                />
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full md:w-1/3 p-6 rounded-lg shadow-md bg-gray-50">
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Order Summary
            </h2>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-4 border-b pb-2"
              >
                <div className="flex flex-col">
                  <span className="font-bold">{item.name}</span>
                  <div className="text-sm text-gray-500">
                    <span>{item.quantity} x </span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                </div>
                <span className="font-medium text-right">
                  ${calculateSubTotal(item).toFixed(2)}
                </span>
              </div>
            ))}
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
