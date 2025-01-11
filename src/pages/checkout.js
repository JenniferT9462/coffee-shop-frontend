import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";
import cart from "../../mocks/cart.json";


export default function CheckoutPage() {

  function handleCheckout(name,
    email,
    phone,
    address,
    city,
    state,
    zipcode,
    cardNumber,
    exDate,
    cvv,) {
    alert('Checkout clicked! Thank you ' + name +  " Your order will be shipped to: " + address );
    // TODO: send to server...
  }

    
  
  return (
    <div className="h-screen flex flex-col text-primary">
      <Header />
      <div className="container mx-auto flex-grow px-4">
        <h1 className="text-5xl text-center my-8">Checkout</h1>
        {/* DaisyUI Divider */}
        <div className="divider divider-primary divider-start">Progress</div>
        {/* DaisyUI Steps to display progress. TODO: add logic  */}
        <ul className="steps mb-8">
          <li className="step step-primary">Contact Info</li>
          <li className="step">Shipping Details</li>
          <li className="step">Payment Method</li>
          <li className="step">Review</li>
        </ul>

        {/* Checkout Form Section */}
        <CheckoutForm handleCheckout={handleCheckout} />
       

      </div>
      <Footer title={"Brew Haven"} />
    </div>
  );
}
