import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import products from "../../../mocks/products.json";
import { useRouter } from 'next/router';
import Loader from "@/components/Loader";


export default function ProductPage() {
    const router = useRouter();
    const { id } = router.query;

    // Wait for the router to be ready before accessing the query
    if (!router.isReady) {
      return <div><Loader/></div>;
    }

    // Find the product that matches the id
    const product = products.find((product) => product._id === id);

    if (!product) {
      return <div>Product not found</div>;
    }

    function addToCart() {
      alert( product.name + " Has Been Added to Your Cart!!");
      // TODO: Add fetch to backend
    }

    return (
      <div>
        <Header/>
        <div className="w-1/3 h-screen">
          <h1>Product Page for product &#35; { id }</h1>
          <ProductCard product={product} onAddToCart={addToCart} />
        </div>
        <Footer title={"Brew Haven"}/>
      </div>
    );
  }