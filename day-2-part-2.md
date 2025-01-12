# Day 2: Part 2: Setup for Input Values

- In my Checkout Page I have my CheckoutForm in 3 sections. `ContactDetails`, `ShippingDetails` and `PaymentDetails`. I also separated the `CartSummary` in a component. And all that is inside a `CheckoutForm` component.
- I wrap the `form` around each component in `CheckoutForm`:

  ```js
  {/* Left Section: Forms */}
  <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-8">
      {/* Contact Details Form */}
      <ContactDetails />

      {/* Shipping Details Form */}
      <ShippingDetails />

      {/* Payment Method Form */}
      <PaymentDetails />
    </div>
    {/* Right Section: Checkout Summary */}
    <div className="lg:col-span-1 flex flex-col items-center space-y-4">
      <CartSummary />
      {/* TODO: Add functionality for checkout */}
      <Button className="btn btn-primary" label="Buy Now" type="submit" />
    </div>
  </form>;
- In each details components I set the inputs and props Accordingly, Example, props:
    ```js
    export default function ContactDetails({ name, email, phone })
- For the all inputs, I use the prop to its input name:
    ```js
    <div>
        <label htmlFor="name" className="label">Name</label>
        <input
            value={name}
            name="name"
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
        />
    </div>
- Set the onSubmit in the opening form tags in `CheckoutForm.jsx`:
    ```js
     <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
- Add handleSubmit function in `CheckoutForm.jsx`:
    ```js
    function handleSubmit(event) {
        event.preventDefault();
        //TODO: Extract input values
        //TODO: Call the handler with all collected form data
    }
- Extract input values in `CheckoutForm.jsx`:
    ```js
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
- Call the handler with all collected form data under the extracted inputs:
    ```js
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
- On the `CheckoutPage`, add handleCheckout function:
    ```js
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
        alert(
        "Checkout clicked! Thank you, " +
            name +
            " Your order will be shipped to: " +
            address +
            ". A confirmation email sent to: " +
            email
        );
        // TODO: send to server...
  }
- Pass `handleCheckout` to CheckoutForm in `checkout.jsx`:
    ```js
    <CheckoutForm handleCheckout={handleCheckout} />