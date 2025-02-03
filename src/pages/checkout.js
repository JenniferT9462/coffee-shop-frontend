import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { saveOrderToLocalStorage } from "@/util";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;


export default function CheckoutPage() {
  const [cartContent, setCartContents] = useState([]);
  const [alert, setAlert] = useState(null);
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

  const updateCart = (newCart) => {
    setCartContents(newCart);
    // saveCartToLocalStorage(newCart);
  };

  function handleCheckout(
    name,
    email,
    phone,
    address,
    city,
    state,
    zipcode,
    cardNumber,
    exDate,
    cvv
  ) {
    const orderDetails = {
      name,
      email,
      phone,
      address,
      city,
      state,
      zipcode,
      cart: cartContent,
      paymentInfo: { cardNumber, exDate, cvv },
    };

    // Save to localStorage
    saveOrderToLocalStorage(orderDetails);
    // alert(
    //   `Checkout clicked! Thank you,
    //     ${name}! Your order will be shipped to: ${address}. A confirmation email sent to: ${email}`
    // );

    // Show DaisyUI alert
    setAlert({
      type: "success",
      message: `Thank you, ${name}! Your order will be shipped to ${address}. A confirmation email has been sent to ${email}.`,
    });
    // Clear the cart after checkout
    updateCart([]);
    // TODO: send to server...
  }

  return (
    <div className="h-screen flex flex-col text-primary">
      <Header itemCount={cartContent.length} />
      <div className="container mx-auto flex-grow px-4">
        <h1 className="text-5xl text-center my-8">Checkout</h1>
        {/* DaisyUI Divider */}
        <div className="divider divider-primary divider-center">Progress</div>
        {/* DaisyUI Steps to display progress. TODO: add logic  */}
        <div className="flex justify-center">
          <ul className="steps mb-8">
            <li className="step step-primary">Contact Info</li>
            <li className="step">Shipping</li>
            <li className="step">Payment</li>
            <li className="step">Review</li>
          </ul>
        </div>

        {/* Render Alert */}
        {alert && (
          <div role="alert" className={`alert alert-${alert.type} || alert-success`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{alert.message}</span>
          </div>
        )}

        {/* Checkout Form Section */}
        <CheckoutForm
          // cartContent={cartContent}
          updateCart={updateCart}
          handleCheckout={handleCheckout}
        />
      </div>
      <Footer title={"Brew Haven"} />
    </div>
  );
}
