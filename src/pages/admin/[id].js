// PUT method to edit products
import Button from "@/components/Button";
// import AdminNavBar from "@/components/AdminNavBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useAuth from "@/hooks/auth";
import { useRouter } from "next/router";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  // Get token
  const { token } = useAuth();

  // onSubmit function
  const onSubmit = (e) => {
    e.preventDefault();
    // See if it's working so far
    alert("Product Updated: " + id);

    // Get inputs for formData
    // Create a FormData object
    const formData = new FormData();
    formData.append("name", e.target.elements.name.value);
    formData.append("description", e.target.elements.description.value);
    formData.append("category", e.target.elements.category.value);
    formData.append("price", e.target.elements.price.value);
    formData.append("stock", e.target.elements.stock.value);

    // Add the image file
    const imageFile = e.target.elements.image.files[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // PUT method to update backend
    // Step 5 - Fetch Post
    const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;
    const url = `${BACKEND_URL}/products/${id}`;

    async function editProduct() {
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text(); // Read error response once
        throw new Error(`Error: ${errorText}`);
      }

      const data = await response.json();
      console.log(data);
    }

    // Call postProduct
    editProduct();

    // Reset the form after submission
    e.target.reset();
  };
  return (
    <>
      <Header />
      <h1 className="mt-8 text-2xl text-center text-primary">
        Update for product &#35; {id}
      </h1>
      <form
        className="card-body"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input type="text" placeholder="A Product" name="name" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input type="text" placeholder="Description" name="description" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input type="text" placeholder="Category" name="category" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input type="text" placeholder="Price" name="price" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock</span>
          </label>
          <input type="number" placeholder="Stock" name="stock" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          {/* file type for image upload and accept attribute */}
          <input type="file" name="image" accept="image/*" />
        </div>
        <div className="form-control mt-6">
          <Button
            className="btn btn-primary"
            type="submit"
            label="Update Product"
          />
        </div>
      </form>
      <Footer title="Brew Haven" />
    </>
  );
}
