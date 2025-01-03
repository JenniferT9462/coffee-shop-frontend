import "@/styles/globals.css";
import "@/styles/navbar.css";

export default function App({ Component, pageProps }) {
  return (
    <div data-theme="coffeeShop">
      <Component {...pageProps} />
    </div>
  ) 
}
