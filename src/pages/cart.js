import Button from "@/components/Button";
import cart from "../../mocks/cart.json";
import CartItem from "@/components/CartItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function CartPage() {
  const cartContent = cart.items;

  const cartJSX = cartContent.map((product) => {
    function removeItem() {
      alert(product.name + "Has Been Removed From Cart!")
    }
    return (<CartItem
              key={product._id}
              product={product}
              removeItem={removeItem}
              />)
  })
  function checkout(){
    alert("Proceeding to Checkout!")
  }
  return (
    <div className="text-primary">
      <Header />
      <div className="container mx-auto p-4 text-primary">
        {/* Flex container for the cart and order summary */}
        <div className="flex flex-col md:flex-row gap-4 h-screen">
          {/* Shopping Cart Section */}
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <div className="space-y-4">
              {cartJSX}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full md:w-1/3 p-4 rounded-lg shadow mt-12">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Subtotal:</span>
              {/* TODO: Add function to calculate total */}
              <span>${cart.totalPrice}</span>
            </div>
            <Button label="Proceed to Checkout" className="btn btn-primary w-full" handleClick={checkout}/>
          </div>
        </div>
      </div>
      <Footer title="Brew Haven" />
    </div>
  );
}
