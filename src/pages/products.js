import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/api";
import { saveCartToLocalStorage, loadCartFromLocalStorage } from "@/util";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;

export default function ProductsPage() {
  const { cart, fetchCart } = useCart();

  const router = useRouter();
  const { category } = router.query;

  const [selectedCategory, setSelectedCategory] = useState("All");

  console.log(category);

  const { token } = useAuth();
  console.log(token);

  const [url, setUrl] = useState(`${BACKEND_URL}/products`);
  const [productFetchError, productsLoading, products] = useFetch(
    url,
    [],
    token
  );

  // Define categories
  const categories = ["All", "Beverages", "Bakery", "Merch"];

  async function addProductToCart(product) {
    if (token) {
      try {
        await fetch(`${BACKEND_URL}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: product._id, quantity: 1 }),
        });
        await fetchCart(); // Refresh cart after adding product
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      // Guest user cart update
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      fetchCart();
    }
    alert(`${product.name} Has Been Added to Your Cart!!!`);
  }

  console.log(products);

  // Filter products based on category
  useEffect(() => {
    if (category) {
      console.log(category);

      // fetchFilteredProducts(category);
    } else {
      // If no category, show all products
      // fetchProducts();
    }
  }, [category]);

  function handleCategoryClick(selectedCategory) {
    setSelectedCategory(selectedCategory);
    router.push({
      pathname: "/products",
      query: {
        category: selectedCategory === "All" ? undefined : selectedCategory,
      },
    });
  }

  const allProducts = products.map((product, idx) => {
    function addToCart() {
      alert(`${product.name} Has Been Added to Your Cart!!!`);
      // TODO: Add fetch to backend
      addProductToCart(product._id);
    }
    // Redirect to product/[id].js with template literal to pass a js variable
    function viewProduct() {
      router.push(`/product/${product._id}`);
    }
    return (
      <ProductCard
        key={product._id + idx}
        product={product}
        // onAddToCart={addToCart}
        onAddToCart={() => addProductToCart(product)}
        onViewProduct={viewProduct}
      />
    );
  });

  return (
    <div>
      <Header itemCount={cart.length} />
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-center mb-8 text-primary">
          Products Page
        </h1>

        {/* Category Filter Buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                handleCategoryClick(cat);
                setUrl(
                  cat === "All"
                    ? `${BACKEND_URL}/products` // No category filter for "All"
                    : `${BACKEND_URL}/products?category=${cat}`
                );
              }}
              className={`px-4 py-2 rounded ${
                (selectedCategory === cat && cat !== "All") ||
                (cat === "All" && selectedCategory === "All")
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
