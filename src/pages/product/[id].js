import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import products from "../../../mocks/products.json";
import { useRouter } from 'next/router';


export default function ProductPage() {
    const router = useRouter();
    const { id } = router.query;

    // Find the product that matches the id
    const product = products.find((product) => product._id === id);

    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <div>
        <Header/>
        <h1>Product Page for product &#35; { id }</h1>
        <ProductCard product={product} />
        <Footer title={"Brew Haven 2024"}/>
      </div>
    );
  }