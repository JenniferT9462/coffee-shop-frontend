import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "@/util";
import { v4 as uuidv4 } from "uuid";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState();
  const [cartContents, setCartContents] = useState([]);

  async function fetchProduct(id) {
    try {
      console.log("Fetching the Product");
      const response = await fetch(`${BACKEND_URL}/products/${id}`);
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
     // Load cart from local storage
     const cartData = loadCartFromLocalStorage();
     setCartContents(cartData || []);
   }, [id]);


  
  
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
    // TODO: Add fetch to backend
    const productWithId = { ...product, quantity: 1, cartItemId: uuidv4() };
    const newCartContents = [...cartContents, productWithId];
    setCartContents(newCartContents);
    saveCartToLocalStorage(newCartContents);
    alert(product.name + " Has Been Added to Your Cart!");
  }
  

  return (
    <div>
      <Header itemCount={cartContents.length}/>
      <div className="w-1/3 h-screen">
        <h1>Product Page for product &#35; {id}</h1>
        <ProductCard keu={product._id} product={product} onAddToCart={addToCart} />
      </div>
      <Footer title={"Brew Haven"} />
    </div>
  );
}
