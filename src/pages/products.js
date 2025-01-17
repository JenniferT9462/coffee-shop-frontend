// import data from "../../mocks/products.json";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "@/util";
import { v4 as uuidv4 } from "uuid";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [cartContents, setCartContents] = useState([]);
  const { category } = router.query;

  async function fetchProducts() {
    const url = "https://coffee-shop-backend-sm62.onrender.com/products";
    try {
      const result = await fetch(url);
      const productData = await result.json();
      console.log("Fetched Products:", productData); // Debug log
      if (productData && Array.isArray(productData.products)) {
        setProducts(productData.products); // Access the `products` array
      } else {
        console.error("Expected an array in 'products' but got:", productData);
        setProducts([]); // Default to an empty array
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  }

  async function fetchFilteredProducts(category) {
  const url = `https://coffee-shop-backend-sm62.onrender.com/products?category=${category}`;
  try {
    const result = await fetch(url);
    const productData = await result.json();
    console.log("Fetched Filtered Products:", productData); // Debug log
    if (productData && Array.isArray(productData.products)) {
      setProducts(productData.products); // Access the `products` array
    } else {
      console.error("Expected an array in 'products' but got:", productData);
      setProducts([]);
    }
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    setProducts([]);
  }
}
  //Load cart from local storage
  useEffect(() => {
    const cartData = loadCartFromLocalStorage();
    setCartContents(cartData);
    // setProducts(data);
    fetchProducts();
  }, []);

  // // Filter products based on category
  useEffect(() => {
    if (category) {
      console.log(category);
      // const filteredProducts = products.filter(
      //   (product) => product.category === category
      // );
      fetchFilteredProducts(category);
      // setProducts(filteredProducts);
    } else {
      // If no category, show all products
      fetchProducts();
    }
  }, [category]);

  function addProductToCart(product) {
    const productWithId = { ...product, quantity: 1, cartItemId: uuidv4() };
    const newCartContents = [...cartContents, productWithId];
    setCartContents(newCartContents);
    saveCartToLocalStorage(newCartContents);
  }

  const allProducts = Array.isArray(products) ? products.map((product, idx) => {
    function addToCart() {
      alert(product.name + " Has Been Added to Your Cart!!!");
      // TODO: Add fetch to backend
      addProductToCart(product);
    }
    // Redirect to product/[id].js with template literal to pass a js variable
    function viewProduct() {
      router.push(`/product/${product._id}`);
    }
    return (
      <ProductCard
        key={product._id + idx}
        product={product}
        onAddToCart={addToCart}
        onViewProduct={viewProduct}
      />
    );
  }) : [];
    

  // Handle category button click
  // function handleCategoryClick(selectedCategory) {
  //   router.push({
  //     pathname: "/products",
  //     query: {
  //       category: selectedCategory === "All" ? undefined : selectedCategory,
  //     },
  //   });
  // }

  return (
    <div>
      <Header itemCount={cartContents.length} />
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-center mb-8 text-primary">
          Products Page
        </h1>

        {/* Category Filter Buttons */}
        {/* <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded ${
                category === cat 
                  ? "bg-primary text-base-100"
                  : "bg-info text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div> */}
        <div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts}
          </div>
          ) : (
            <p className="text-center text-lg">No products available at the moment.</p>
          )}
        </div>
      </div>
      <Footer title="Brew Haven" />
    </div>
  );
}
