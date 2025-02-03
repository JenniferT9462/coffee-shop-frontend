import AdminProductCard from "@/components/AdminProductCard";
import AdminNavBar from "@/components/AdminNavBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuthFetch } from "@/hooks/api";
import useAuth from "@/hooks/auth";
import Header from "@/components/Header";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;

export default function AdminProductsPage() {
  const router = useRouter();
  const { category } = router.query;

  //   const [cartContents, setCartContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  console.log(category);

  const { token } = useAuth();
  console.log(token);

  const [url, setUrl] = useState(`${BACKEND_URL}/products`);
  const [productFetchError, productsLoading, products] = useAuthFetch(
    url,
    [],
    token
  );

  // Define categories
  const categories = ["All", "Beverages", "Bakery", "Merch"];

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
      pathname: "/admin",
      query: {
        category: selectedCategory === "All" ? undefined : selectedCategory,
      },
    });
  }

  async function handleDeleteProduct(product) {
    // const productWithId = { ...product, quantity: 1, cartItemId: uuidv4() };
    console.log("Delete: ", product);
    const productId = product._id;
    try {
      const response = await fetch(`${BACKEND_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token.replace(/['"]+/g, "")}`
        }
      })  
      const data = await response.json();
      console.log(data);
    } catch (error) {
        console.log(error);
    }
  }

//   function handleEditProduct(product) {
//     const productWithId = { ...product, quantity: 1, cartItemId: uuidv4() };
//     alert("Edit: " + productWithId.name);
//   }

  const allProducts = products.map((product, idx) => {
    function deleteProduct() {
      alert(product.name + " Has Been deleted!!!");
      // TODO: Add fetch to backend
      handleDeleteProduct(product);
    }
    // Redirect to product/[id].js with template literal to pass a js variable
    function editProduct() {
        alert("Proceeding to Edit")
        console.log("Edit Product")
        router.push(`/admin/${product._id}`);
    }
    return (
      <AdminProductCard
        key={product._id + idx}
        product={product}
        onDeleteProduct={deleteProduct}
        onEditProduct={editProduct}
      />
    );
  });

  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-4xl font-semibold text-center my-8 text-primary">
          Admin Functions
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
