import ContactDetails from "./ContactDetails";
import ShippingDetails from "./ShippingDetails";
import PaymentDetails from "./PaymentDetails";
import CartSummary from "./CartSummary";
import Button from "./Button";
import PropTypes from "prop-types";

export default function CheckoutForm({ handleCheckout }) {
  function handleSubmit(event) {
    // alert("Thank You for Your Patronage!");
    // console.log("Button has been clicked.");
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const phone = event.target.elements.phone.value;

    const address = event.target.elements.address.value;
    const city = event.target.elements.city.value;
    const state = event.target.elements.state.value;
    const zipcode = event.target.elements.zipcode.value;

    const cardNumber = event.target.elements.cardNumber.value;
    const exDate = event.target.elements.exDate.value;
    const cvv = event.target.elements.cvv.value;
    // Call the handler with all collected form data
    handleCheckout(
      name,
      email,
      phone,
      address,
      city,
      state,
      zipcode,
      cardNumber,
      exDate,
      cvv,
    );
  }
  return (
    <>
      {/* Left Section: Forms */}
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Details Form */}
          <ContactDetails  />

          {/* Shipping Details Form */}
          <ShippingDetails />

          {/* Payment Method Form */}
          <PaymentDetails />
        </div>
        {/* Right Section: Checkout Summary */}
        <div className="lg:col-span-1 flex flex-col items-center space-y-4">
          <CartSummary />
          {/* TODO: Add functionality for checkout */}
          <Button
            className="btn btn-primary"
            label="Buy Now"
            type="submit"
          />
        </div>
      </form>
    </>
  );
}
CheckoutForm.propTypes = {
  handleCheckout: PropTypes.func,
}