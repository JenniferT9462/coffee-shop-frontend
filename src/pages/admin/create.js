import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useAuth from "@/hooks/auth";

export default function CreateProduct() {
  // Step 4 - get token
  const { token } = useAuth();
  
  const onSubmit = (e) => {
    // Step 2 - prevent page from reloading
    e.preventDefault();
    // Step 1 - Say "Form Submitted" on Submit
    alert("Form Submitted");

    // Step 3 - get all the inputs, and alert them (or log them)
    // const product = {
    //   name: e.target.elements.name.value,
    //   description: e.target.elements.description.value,
    //   category: e.target.elements.category.value,
    //   price: e.target.elements.price.value,
    //   stock: e.target.elements.stock.value,
    // };

    // // Log the product details
    // console.log("Payload being sent:", JSON.stringify(product));

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

    // Log the FormData entries 
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    // Step 5 - Fetch Post
    const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;
    const url = `${BACKEND_URL}/products`;

    async function postProduct() {
      const response = await fetch(url, {
        method: "POST",
        // body: JSON.stringify(product),
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
        },
      });
      const data = await response.json();
      console.log(data);
    }

    // Call postProduct
    postProduct();

    // Reset the form after submission
    e.target.reset();
  };

  return (
    <>
      <Header />
      {/* Add encType="multipart/form-data" attribute for image file */}
      <form className="card-body" onSubmit={onSubmit} encType="multipart/form-data">
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
            label="Create Product"
          />
        </div>
      </form>
      <Footer title="Brew Haven" />
    </>
  );
}
