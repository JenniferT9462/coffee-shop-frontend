import "@/styles/globals.css";
import "@/styles/navbar.css";
import { Lobster, Lora } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
const lobster = Lobster({ weight: "400", subsets: ["latin"] });
const lora = Lora({ weight: ["400", "700"], subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        data-theme="coffeeShop"
        className={`${lobster.className} ${lora.className}`}
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        
      </div>
    </QueryClientProvider>
  );
}
