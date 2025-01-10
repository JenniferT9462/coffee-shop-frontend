import products from "../../mocks/products.json";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function ProductsPage() {
  const router = useRouter();

  const allProducts = products.map((product) => {
    function addToCart() {
      alert(product.name + " Has Been Added to Your Cart!!!");
      // TODO: Add fetch to backend
    }

    // Redirect to product/[id].js with template literal to pass a js variable
    function viewProduct() {
      router.push(`/product/${product._id}`);
    }

    return (
      <ProductCard
        key={product._id}
        product={product}
        onAddToCart={addToCart}
        onViewProduct={viewProduct}
      />
    );
  });

  return (
    <div>
      <Header />
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
