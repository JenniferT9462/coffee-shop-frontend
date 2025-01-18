
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "@/util";
import { v4 as uuidv4 } from "uuid";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;

export default function ProductsPage() {
  const router = useRouter();
  const { category } = router.query;

  const [products, setProducts] = useState([]);
  const [productFetchError, setProductFetchError] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [cartContents, setCartContents] = useState([]);

  console.log(category);

  // Define categories
  const categories = ["All", "Beverages", "Bakery", "Merch"];

  async function fetchProducts() {
    const url = `${BACKEND_URL}/products`;
    try {
      setProductsLoading(true);
      const result = await fetch(url);
      if (!result.ok) {
        console.log("fetch failed with " + response.status);
        setProductFetchError(true);
      } else {
        const productData = await result.json();
        setProducts(productData.products);
        console.log("Fetched Products:", productData); // Debug log
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductFetchError(true);
    } finally {
      setProductsLoading();
    }
  }

  async function fetchFilteredProducts(category) {
    const url = `${BACKEND_URL}/products?category=${category}`;
    setProductsLoading(true);
    const result = await fetch(url);
    const productData = await result.json();
    setProductsLoading(false);
    setProducts(productData.products);
  }

  useEffect(() => {
    // Load cart from local storage
    const cartData = loadCartFromLocalStorage(); // get data from outside the component
    setCartContents(cartData); // set data inside the component
    //TODO: get Product Data from server
    // setProducts(productData.products);
    fetchProducts();
  }, []);

  console.log(products);

  // Filter products based on category
  useEffect(() => {
    if (category) {
      console.log(category);

      fetchFilteredProducts(category);
    } else {
      // If no category, show all products
      fetchProducts();
    }
  }, [category]);

  function handleCategoryClick(selectedCategory) {
    router.push({
      pathname: "/products",
      query: {
        category: selectedCategory === "All" ? undefined : selectedCategory,
      },
    });
  }

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
      <Header itemCount={cartContents.length} />
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-center mb-8 text-primary">
          Products Page
        </h1>

        {/* Category Filter Buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded ${
                category === cat || (cat === "All" && !category)
                  ? "bg-primary text-base-100"
                  : "bg-info text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {productFetchError ? (
          <div className="text-red-400 text-lg">Error fetching products.</div>
        ) : (
          ""
        )}

        <div>
          {productsLoading ? (
            <div className="flex justify-center">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allProducts}
            </div>
          )}
        </div>
      </div>
      <Footer title="Brew Haven" />
    </div>
  );
}
