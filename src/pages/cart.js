import Button from "@/components/Button";
import cart from "../../mocks/cart.json";
import CartItem from "@/components/CartItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";


export default function CartPage() {
  const cartContent = cart.items;

  const subTotals = cartContent.map((item) => {
    return (
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <div className="flex flex-col">
          <span className="font-bold">{item.name}</span>
          <div className="text-sm text-gray-500">
            <span>{item.quantity} x </span>
            <span>${item.price.toFixed(2)}</span>
          </div>
        </div>
        <span className="font-medium text-right">
          ${item.subtotal.toFixed(2)}
        </span>
      </div>
    );
  });

  const cartJSX = cartContent.map((product) => {
    function removeItem() {
      alert(product.name + " Has Been Removed From Cart!");
    }
    return (
      <CartItem key={product._id} product={product} removeItem={removeItem} />
    );
  });
  const router = useRouter();
  function checkout() {
    alert("Proceeding to Checkout!");
    router.push("/checkout");
  }

  
  // Stub functions for Cart Page
  const loadCart = () => console.log("Cart loaded");
  const addToCart = (product) => console.log(`Added ${product.name} to cart`);
  const removeFromCart = (product) =>
    console.log(`Removed ${product.name} from cart`);
  const saveCartToLocalStorage = (cart) =>
    console.log("Cart saved to localStorage");

  return (
    <div className="text-primary">
      <Header />
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
              <span>${cart.totalPrice.toFixed(2)}</span>
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
