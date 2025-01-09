import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSummary from "@/components/CartSummary";
import ContactDetails from "@/components/ContactDetails";
import ShippingDetails from "@/components/ShippingDetails";
import PaymentDetails from "@/components/PaymentDetails";

export default function CheckoutPage() {
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Details Form */}
            <ContactDetails/>

            {/* Shipping Details Form */}
            <ShippingDetails/>

            {/* Payment Method Form */}
            <PaymentDetails/>
          </div>

          {/* Right Section: Checkout Summary */}
          <CartSummary title="Order Summary" totalPrice="25.00"/>
          
        </div>
      </div>
      <Footer title={"Brew Haven"} />
    </div>
  );
}
