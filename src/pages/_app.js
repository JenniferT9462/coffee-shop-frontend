import "@/styles/globals.css";
import "@/styles/navbar.css";
import { Lobster, Lora } from "next/font/google";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext"; 

const lobster = Lobster({ weight: "400", subsets: ["latin"] });
const lora = Lora({ weight: ["400", "700"], subsets: ["latin"] });

function Providers({ children }) {
  const { token } = useAuth(); // Use token from AuthProvider

  return (
    <CartProvider token={token}>
      {children}
    </CartProvider>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Providers>
        <div
          data-theme="coffeeShop"
          className={`${lobster.className} ${lora.className}`}
        >
          <Component {...pageProps} />
        </div>
      </Providers>
    </AuthProvider>
  );
}
