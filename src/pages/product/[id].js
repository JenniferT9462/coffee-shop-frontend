import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
// import products from "../../../mocks/products.json";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState();

  async function fetchProduct(id) {
    try {
      console.log("Fetching the Product");
      const response = await fetch(`https://coffee-shop-backend-sm62.onrender.com/products/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      const product = await response.json();
      setProduct(product);
    } catch (error) {
      console.log("Failed to fetch product", error)
    }
  }

  useEffect(() => {
    if (id) {
      console.log("Hello from use Effect with [id]" + id)
      fetchProduct(id)
    }
  }, [id])

  
  // Wait for the router to be ready before accessing the query
  if (!router.isReady) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  // Find the product that matches the id
  //const product = products.find((product) => product._id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  function addToCart() {
    alert(product.name + " Has Been Added to Your Cart!!");
    // TODO: Add fetch to backend
  }

  return (
    <div>
      <Header />
      <div className="w-1/3 h-screen">
        <h1>Product Page for product &#35; {id}</h1>
        <ProductCard product={product} onAddToCart={addToCart} />
      </div>
      <Footer title={"Brew Haven"} />
    </div>
  );
}
