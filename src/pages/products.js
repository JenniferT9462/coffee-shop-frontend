import products from "../../mocks/products.json";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductsPage() {
  const allProducts = products.map((product) => {
    function addToCart() {
      alert(product.name + " Has Been Added to Your Cart!!!");
      // TODO: Add fetch to backend
    }
    return (
      <ProductCard
        key={product._id}
        product={product}
        onAddToCart={addToCart}
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
