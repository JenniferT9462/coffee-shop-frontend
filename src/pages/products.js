import data from "../../mocks/products.json";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from '@/util';
import { v4 as uuidv4 } from "uuid";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [cartContents, setCartContents] = useState([]);
  const { category } = router.query; 
  //Load cart from local storage
  useEffect(() => {
    const cartData = loadCartFromLocalStorage();
    setCartContents(cartData);
    setProducts(data)
  }, [])

  // Filter products based on category
  useEffect(() => {
    if (category) {
      const filteredProducts = data.filter(
        (product) => product.category === category
      );
      setProducts(filteredProducts);
    } else {
      // If no category, show all products
      setProducts(data);
    }
  }, [category]);

  
  // useEffect(() => {
  //   console.log(category);
  //   const filterProductsData = data.filter(product => {
  //     console.log(data.category);
  //     return product.category === category;
  //   })
  //   setProducts(filterProductsData)
  // }, [category]);

  function addProductToCart(product) {
    const productWithId = { ...product, quantity: 1, cartItemId: uuidv4() };
    const newCartContents = [...cartContents, productWithId];
    setCartContents(newCartContents);
    saveCartToLocalStorage(newCartContents);
  }

  const allProducts = products.map((product, idx) => {
    function addToCart() {
      alert(product.name + " Has Been Added to Your Cart!!!");
      // TODO: Add fetch to backend
      addProductToCart(product);
    }

    // Redirect to product/[id].js with template literal to pass a js variable
    function viewProduct() {
      router.push(`/product/${product._id}`);
    }

    // Stub functions for the ProductsPage
    const loadProducts = () => console.log("Loading Products...");
    const filterProducts = (category, start, limit) => console.log("Filtered List of Products...");
    

    return (
      <ProductCard
        key={product._id + idx}
        product={product}
        onAddToCart={addToCart}
        onViewProduct={viewProduct}
      />
    );
  });

  return (
    <div>
      <Header itemCount={cartContents.length}/>
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-center mb-8 text-primary">
          Products Page
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts}
        </div>
      </div>
      <Footer title="Brew Haven" />
    </div>
  );
}
