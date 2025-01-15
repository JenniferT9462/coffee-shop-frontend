import "@/styles/globals.css";
import "@/styles/navbar.css";
import { Lobster, Lora } from 'next/font/google';

const lobster = Lobster({ weight: '400', subsets: ['latin'] });
const lora = Lora({ weight: ['400', '700'], subsets: ['latin'] });


export default function App({ Component, pageProps }) {
  return (
    <div data-theme="coffeeShop" className={`${lobster.className} ${lora.className}`}>
      <Component {...pageProps} />
      
    </div>
  ) 
}
