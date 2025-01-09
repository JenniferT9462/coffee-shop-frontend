import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSummary from "@/components/CartSummary";

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
            <section className="p-4 shadow-md rounded-lg bg-base-100">
              <h2 className="text-xl font-bold mb-4">Contact Details</h2>
              <form className="space-y-4">
                <div>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input
                    type="tel"
                    placeholder="Your Phone Number"
                    className="input input-bordered w-full"
                  />
                </div>
              </form>
            </section>

            {/* Shipping Details Form */}
            <section className="p-4 shadow-md rounded-lg bg-base-100">
              <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
              <form className="space-y-4">
                <div>
                  <label className="label">Address</label>
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">State</label>
                    <input
                      type="text"
                      placeholder="State"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Zip Code</label>
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              </form>
            </section>

            {/* Payment Method Form */}
            <section className="p-4 shadow-md rounded-lg bg-base-100">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <form className="space-y-4">
                <div>
                  <label className="label">Card Number</label>
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">Expiration Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">CVV</label>
                  <input
                    type="text"
                    placeholder="CVV"
                    className="input input-bordered w-full"
                  />
                </div>
              </form>
            </section>
          </div>

          {/* Right Section: Checkout Summary */}
          <CartSummary/>
          
        </div>
      </div>
      <Footer title={"Brew Haven"} />
    </div>
  );
}
