import products from "../../mocks/products.json";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-center mb-8 text-primary">Products Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }