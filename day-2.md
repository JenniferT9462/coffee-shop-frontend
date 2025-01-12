# Day 2: Component and Form Development
## Day 2 Part 2
[Part 2](day-2-part-2.md)

## Setup Branch for Day 2
- Before you begin, create a new branch for your work. Make sure your main branch is up to date. Then create a new branch called design-components.
    ```bash
    git switch main
    git pull
    git switch -c design-components
## Create Basic Pages
- NOTE: The file extensions `.js` versus `.jsx`, usually I will use `.jsx` for components and  `.js` for my pages. It is just a preference and usually when working with a team you would follow the team guidelines. I use it this way because it goes with the defaults in Next.js. 
- [x] index.js
- [x] products/index.js
- [x] products/[id].js
- [x] cart.js
- [x] checkout.js
- [x] signup.js
- [x] signin.js

## Optional Admin Pages:
- [] admin/list-products.js
- [] admin/create-product.js
- [] admin/view-product.js
- [] admin/update-product.js
(Note: update-product.jsx will include a delete product confirmation popup.)

## Setup Mock Data and Images
- Create a folder named `mocks` you can put this in the root of your project or in the `src` directory. The only difference is the path when you import. 
- Inside `mocks` create a `products.json` and `cart.js` file. 
- Example `products.json`:
    ```json
        [
    {
        "name": "Espresso",
        "description": "A strong and concentrated coffee beverage.",
        "price": 2.5,
        "category": "Beverage",
        "stock": 10,
        "imageUrl": "/sample-images/espresso.jpg",
        "_id": 0
    },
    {
        "name": "Cappuccino",
        "description": "An Italian coffee drink that is traditionally prepared with equal parts espresso, steamed milk, and milk foam.",
        "price": 3.5,
        "category": "Beverage",
        "stock": 5,
        "imageUrl": "/sample-images/cappuccino.jpg",
        "_id": 1
    },
    {
        "name": "Croissant",
        "description": "A buttery, flaky, viennoiserie pastry named for its crescent shape.",
        "price": 2,
        "category": "Food",
        "stock": 8,
        "imageUrl": "/sample-images/croissant.jpg",
        "_id": 2
    },
    {
        "name": "Muffin",
        "description": "A small, sweet baked good that is typically made with ingredients such as flour, sugar, eggs, and butter.",
        "price": 2.5,
        "category": "Food",
        "stock": 6,
        "imageUrl": "/sample-images/muffin.jpg",
        "_id": 3
    }
    ]
- Example `cart.json`:
    ```json
    {
    "cartId": "cart123",
    "userId": "user456",
    "items": [
      {
        "_id": "1",
        "name": "Blueberry Muffins",
        "imageUrl": "/blueberryMuffin.jpg",
        "price": 3.5,
        "quantity": 2,
        "subtotal": 7.0
      },
      {
        "_id": "2",
        "name": "Everything Bagel",
        "imageUrl": "/everythingBagel.jpg",
        "price": 2.5,
        "quantity": 3,
        "subtotal": 7.5
      },
      {
        "_id": "4",
        "name": "Latte",
        "imageUrl": "/latte.jpg",
        "price": 4.0,
        "quantity": 1,
        "subtotal": 4.0
      }
    ],
    "totalPrice": 18.5
  }
- You can also copy some data from <https://dummyjson.com/docs/products>
- You can grab some generic images from <https://www.pexels.com/> or a similar site. Just search for `coffee` or `coffee shop`.
- Once you have your images save them to your `public` directory in your project. 
- Make sure the paths to your images are the same in your mock data. 
- Git commit a message like: "Add basic pages for the Coffee Shop frontend and mock data."

## Designing Pages

### Splash Page 
- In your `index.js` file, build a splash page that includes the following: 
    - Header or NavBar
    - Hero Section with CTA Button
    - Brief Description
    - Footer
- Break into Components, update the following skeleton components from day 1:
    * Header or NavBar
    * HeroSection
    * Button
    * Footer
- The DaisyUI Hero with Overlay Image works nicely. <https://daisyui.com/components/hero/>
- For the Button component, update to handle click events in `src/components/Button.jsx` Example:
    ```js
   import PropTypes from 'prop-types';
    export default function Button({ label, handleClick }) {
        return (
            <button 
                type="button" 
                onClick={handleClick} 
                className="btn btn-primary w-full">
            {label}
            </button>
        );
    }
    Button.propTypes = {
        label: PropTypes.string.isRequired,
        handleClick: PropTypes.func,
    };
- In `index.js` we will use the Button and add the logic for the button. We will use the Pages Router to push the user to the Sign Up page when the button is clicked:
    ```js
    import Button from '../components/Button';
    import { useRouter } from 'next/router';
    ...
    export default function Home() {
        const router = useRouter();
        function handleCtaClick() {
            console.log('CTA button clicked!');
            router.push('/signup');
        }
        return (
            <div>
            ...
            <Button label="Sign Up Now" handleClick={handleCtaClick} />
            ...
            </div>
        );
    }
- git commit with a message like `"Add Button component with click handling."`

### Products Page
- In your `products.js` file, create a layout for the products page.
- Use the ProductCard component to display a list of products.
- Example Products Page:
    ```js
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
- Git commit a message like `"Created Products Page"`.
### Product by Id Page
- In your `product/[id].js` file, create a layout for a single product page.
- Include a `Header` and `Footer`.
- Import the data from the mock products file at `mocks/products.json`.
- Create a product card displaying:
    * Product image
    * Name
    * Description
    * Price
    * Add to Cart Button
- Update your `ProductCard.jsx` file I used `DaisyUI` classes for the `ProductCard`. <https://daisyui.com/components/card/>
    ```js
    import React from "react";
    import PropTypes from "prop-types";
    import Button from "./Button";

    export default function ProductCard({ product }) {
        console.log(product);
        if (!product) {
            return <div>Loading...</div>; 
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card w-64 bg-base-100 shadow-xl">
                    {/* Daisy UI Figure */}
                    <figure className="h-48">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                    </figure>
                    <div>
                        <h3 className="card-title">{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </div>
                    <div className="mt-auto card-actions justify-end">
                        <Button
                            label="Add to Cart"
                            handleClick={() => alert("Product Added to Cart!")}
                        />
                    </div>
                </div>
            </div>
        );
    }

    ProductCard.propTypes = {
        product: PropTypes.object.isRequired,
    };

- Example of `product/[id].js`:
    ```js
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
                <div className="w-1/3 h-screen">
                    <h1>Product Page for product &#35; { id }</h1>
                    <ProductCard product={product} />
                </div>
                <Footer title={"Brew Haven 2024"}/>
            </div>
        );
    }
- Git commit a message like `"Created single product page"`.

### Sign Up Page
- In your `signup.js` file, include the `Header` and `Footer` components from the splash page. 
- Add a form with the following fields:
    * Name
    * Email
    * Password
    * Submit Button
- Break the Form Into a Component
    * Create a `SignupForm` component and use the following prop:
       -  `buttonLabel`: A string that determines the button's text.
    * Use PropTypes to validate `buttonLabel` as a string.
- Example SignupForm:
    ```js
    import PropTypes from 'prop-types';
    import Button from '@/components/Button';

    export default function SignupForm({ title, buttonLabel, }) {
        return (
            <div>
                <h1>{title}</h1>
                <form className="form">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <Button
                        className="btn btn-primary"
                        label={buttonLabel}
                        handleClick={() => {
                        console.log("clicked sign up");
                        }}
                    />
                </form>
            </div>
        );
    }

    SignupForm.propTypes = {
        buttonLabel: PropTypes.string.isRequired,
    };
- Add the `SignUp` component to the SignUp Page:
    ```js
    import SignUpForm from "@/components/SignUpForm";
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";

    export default function signup() {
        return (
            <>
                <Header />
                <SignUpForm
                    title="Sign Up Now!"
                    buttonLabel="Sign Up"
                    handleClick={() => {
                    console.log("clicked sign up");
                    }}
                />
                <Footer title={"Brew Haven 2024"} />
            </>
        );
    }

- git commit with a message like `"Add SignupForm component."`

### Sign In Page
- Sign In Page will be very similar to the Sign Up Page. 
- In your `signin.js` file, reuse the `SignupForm` component for the signin page.
- Pass  `"Signin"` as the buttonLabel prop.
- Pass a different `handleClick` function to the `Button` component that logs `"clicked sign in"`.
- git commit with a message like `"Add Signin page form"`

### Cart Page
- In your `cart.js` file, create a layout for the cart page.
- Import mock data in your `cart.js` file.
    ```js
    import cart from "../../mocks/cart.json";
- Create `CartItem` component to display , with the button labeled `"Remove"`:
    ```js
    import React from 'react';
    import PropTypes from 'prop-types';

    export default function CartItem({ product }) {
        return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
            {/* Thumbnail Image of Product */}
            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover mr-4" />
            {/* Product Details */}
            <div className="flex-grow">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">Price: ${product.price}</p>
            </div>
            {/* Quantity buttons */}
            <div className="flex items-center space-x-2">
                <button
                    {/*TODO: Add function to calculate quantity*/}
                    className="btn btn-sm btn-secondary"
                    disabled={product.quantity <= 1}
                >
                    -
                </button>
                
                {/* Add quantity from mock data */}
                <span>{product.quantity}</span>

                {/* Increment/Decrement buttons */}
                <button
                    {/*TODO: Add function to calculate quantity*/}
                    className="btn btn-sm btn-secondary"
                >
                    +
                </button>
                {/* Remove button */}
                <button
                    {/*TODO: Add function to remove items*/}
                    className="btn btn-sm btn-error text-white"
                >
                    Remove
                </button>
            </div>
        </div>
        );
    }
    // Define prop types
    CartItem.propTypes = {
        product: PropTypes.string.isRequired, // The title of the product
        onRemove: PropTypes.func.isRequired,  // Function to handle removal
        onQuantityChange: PropTypes.func.isRequired, // Function to handle quantity changes
    };

- Back to `cart.js`, add a `"Checkout"` button at the bottom.
- I wanted the cart items on the left and the cart summary on the right side. I used TailwindCSS classes to accomplish this. 
- Example of `cart.js`:
    ```js
    import Button from "@/components/Button";
    import cart from "../../mocks/cart.json";
    import CartItem from "@/components/CartItem";
    import Footer from "@/components/Footer";
    import Header from "@/components/Header";

    export default function CartPage() {
        return (
            <div className="text-primary">
                <Header />
                <div className="container mx-auto p-4 text-primary">
                    {/* Flex container for the cart and order summary */}
                    <div className="flex flex-col md:flex-row gap-4 h-screen">
                    {/* Shopping Cart Section */}
                    <div className="w-full md:w-2/3">
                        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                        <div className="space-y-4">
                        {cart.items.map((item) => (
                            <CartItem key={item._id} product={item} />
                            // TODO: Add function to remove items
                        ))}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="w-full md:w-1/3 p-4 rounded-lg shadow mt-12">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-4">
                            <span>Subtotal:</span>
                            {/* TODO: Add function to calculate total */}
                            <span>${cart.totalPrice}</span>
                        </div>
                        <Button 
                            label="Checkout" 
                            className="btn btn-primary" 
                            handleClick={() => alert("Proceeding to Checkout!")}>
                                Checkout
                        </Button>
                    </div>
                </div>
            </div>
            <Footer title="Brew Haven" />
        </div>
        );
    }
- Git commit with a message like "Add Cart page."

### Checkout Page
- In your `checkout.js` file, create a layout for the checkout page.
- Include the header and footer.
- Break the form into a CheckoutForm component.
    * In `CheckoutForm` I have my form separated into 3 sections that take input fields:
        - ContactDetails
        - ShippingDetails
        - PaymentDetails
    * I also have a `CartSummary` component to display CartItems.
    ```js
    import React from "react";
    import PropTypes from "prop-types";
    import cart from "../../mocks/cart.json";
    import CartItem from "./CartItem";

    export default function CartSummary({ title }) {
    const cartContent = cart.items;
    const price = cart.totalPrice;
    
    const cartJSX = cartContent.map((product) => {
        function removeItem() {
            alert(product.name + "Has Been Removed From Cart!")
        }
        return (<CartItem
                    key={product._id}
                    product={product}
                    removeItem={removeItem}
                    />)
        })
    return (
        <div className="shadow-lg rounded-lg bg-base-100 p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <div className="space-y-4">
            {cartJSX}
            <div className="text-end">
            <h2 className="text-lg font-bold">Total Price:<span> ${price.toFixed(2)}</span></h2>  
            </div>
        </div>
        
        </div>
    );
    }

    CartSummary.propTypes = {
    title: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired, // URL for the product image
    };

- Add a "Buy Now" button:
    ```js
    <Button
        className="btn btn-primary"
        label="Buy Now"
        type="submit"
    />
- CheckoutForm Example:
    ```js
    import ContactDetails from "./ContactDetails";
    import ShippingDetails from "./ShippingDetails";
    import PaymentDetails from "./PaymentDetails";
    import CartSummary from "./CartSummary";
    import Button from "./Button";
    import PropTypes from "prop-types";

    export default function CheckoutForm({ handleCheckout }) {
        function handleSubmit() {
            alert("Thank You for Your Patronage!");
            console.log("Button has been clicked.");
        }
    
        return (
            <>
                {/* Left Section: Forms */}
                <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Contact Details Form */}
                        <ContactDetails  />

                        {/* Shipping Details Form */}
                        <ShippingDetails />

                        {/* Payment Method Form */}
                        <PaymentDetails />
                    </div>
                    {/* Right Section: Checkout Summary */}
                    <div className="lg:col-span-1 flex flex-col items-center space-y-4">
                        <CartSummary />
                        {/* TODO: Add functionality for checkout */}
                        <Button
                            className="btn btn-primary"
                            label="Buy Now"
                            type="submit"
                        />
                    </div>
                </form>
            </>
        );
        }
    CheckoutForm.propTypes = {
        handleCheckout: PropTypes.func,
    }
- For now, leave the payment functionality as a placeholder. You could have an alert that says "Thank you for your patronage" when the button is clicked.
- Create a new story in Storybook for the CheckoutForm component.
- Git commit with a message like `"Add Checkout page"`.

## Extra Features
- Added a `View Product` button, I wanted a redirect to the single product page for the `ProductsPage`:
    1. Add a prop to `ProductCard` named `onViewProduct`:
        ```js
        export default function ProductCard({ product, onAddToCart, onViewProduct })
    2. Pass the `onViewProduct` prop to the `Button` component in the `ProductCard`:
        ```js
        <Button 
            label="View Product" 
            variant="warning" 
            handleClick={onViewProduct} 
            fullWidth
        />
    3. To make the `viewButton` only visible on the `ProductsPage`:
        ```js
        {onViewProduct && (
            <Button 
                label="View Product" 
                variant="warning" 
                handleClick={onViewProduct} 
                fullWidth
            />
          )}
    4. In the `ProductPage` component, use `useRouter` to navigate to the `[id].js` page when `View Product` is clicked:
        ```js
        const router = useRouter();
        function viewProduct() {
            router.push(`/products/${product._id}`);
        }
    5. Make sure to pass the `onViewProduct` prop to the `ProductCard` with the `viewProduct` function in the `products.js` file:
        ```js
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
          />
- Added a `CartButton` that is an icon found on `Iconify` and an `itemCount` badge using `DaisyUI` class:
    1. Found a cart icon on `Iconify` and downloaded it via `JSX`.
    2. Added a prop `itemCount` to the `CartButton` component.
    3. Set the button to relative className.
    4. Put the cart icon inside the `button` tags.
    5. Added a badge inside the `button` tags with the following classes and used the `itemCount` prop. Make sure to make it not appear if the `itemCount` is 0:
        ```js
        {itemCount > 0 && (
            <span className="badge absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-warning text-primary text-xs font-bold">
                {itemCount}
            </span>
        )}
    6. Pass the `itemCount` to the `CartButton`:
        ```js
        <CartButton itemCount={3}/>
    7. Will add function and logic to get the actual item count in the future. 
- Redirects:
    * From `CartPage` to `CheckoutPage`:
        ```js
        const router = useRouter();
        function checkout(){
            alert("Proceeding to Checkout!")
            router.push('/checkout');
        }
    * From `SignInPage` to `ProductsPage`:
        ```js
        const router = useRouter();
        function signIn() {
            alert("Your are Signed In!!!")
            // May redirect to a dashboard
            router.push('/products');
        }
    * From `ViewButton` to `products/[id].js`:
        ```js
        const router = useRouter();
        function viewProduct() {
            router.push(`/products/${product._id}`);
        }
- Hid the `CartButton` on the `HomePage`, `SignUpPage` and the `SignInPage`:
    1. In the `Header` component, use the `useRouter` hook from Next.js to check the current route: 
        ```js
        const isHomePage = router.pathname === "/";
        const isSignUpPage = router.pathname === "/signup";
        const isSignInPage = router.pathname === "/signin";
    2. Based on the route, conditionally render the `CartButton` in the `Header` component:
        ```js
        {!isHomePage && !isSignUpPage && !isSignInPage && (
          <Link href="/cart" className="navLink btn btn-ghost gap-2">
            <CartButton itemCount={3}/>
        </Link>
        )}

## Challenges
- The buttons for the sign up form do not console log. 
    * UPDATE: I fixed the issue by adding `type="button"` in my Button component. 
- Having trouble with the product page, specifically via instructions for the product page by id. 
    - UPDATE: I used `useRouter` and extracted the id from the query param. 
- Still having issues with importing my mock data. 
    * UPDATE: I was having issues with importing my mock data, fixed by adding (For some reason `@` isn't working and I have it configured in the `json.config` file): 
    ```js
    .../.../.../mocks/products.json. 
- Another issue was with `imageUrl` being undefined I fixed my adding(Not sure how that worked???): 
    ```js
    if (!product) {
        return <div>Loading...</div>;
    }
- I also added to the `[id].js` file to load a `Product Not Found` message: 
    ```js
    if (!product) {
      return <div>Product not found</div>;
    } 
- Had an issue when putting a `variant` prop to my Button component, I fixed by adding:
    ```js
     export default function Button({ 
            label, 
            handleClick, 
            variant = "primary", 
            fullWidth = false, 
            type = "button" 
            }) {
        const variantClass = {
            primary: "btn-primary",
            secondary: "btn-secondary",
            error: "btn-error",
            warning: "btn-warning",
            info: "btn-info",
            }[variant] || "btn-primary"; // Fallback to "btn-primary" if no match

        return (
            <button
                type={type}
                onClick={handleClick}
                className={`btn ${variantClass} ${fullWidth ? "w-full" : ""}`}
                >
            {label}
            </button>
        );
    }
- The `variantClass` object maps variants to class names.
- `[variant]` dynamically retrieves the class name for the given variant prop. 
- The `|| "btn-primary"` ensures a default class is applied if the variant is invalid or missing.
- This now helps to handle cases where the variant prop does not match a Tailwind/DaisyUI class. I call the `Button` component and pass the `variant` prop:
    ```js
     <Button
        type="button"
        // TODO Add function to remove items
        variant="error"
        label="Remove"
        handleClick={removeItem}
    />
- I was having issues with my Button style, I wanted only the ProductCard, which uses the Button component to be the full width of the container and not full for other components that use the Button component. So I added a prop to Button component `fullWidth = false` and updated the className with a conditional statement to be flexible: 
    ```js
    <button
      type="button"
      onClick={handleClick}
      className={`btn ${variantClass} ${fullWidth ? "w-full" : ""}`} >
        {label}
    </button>
   
 - and then passed it to the Button component in my ProductCard component and removed the `justify-end` in my `div`:
    ```js
    <div className="mt-auto card-actions">
        <Button label="Add to Cart" handleClick={onAddToCart} fullWidth />
    </div>
- Breaking up my sections of the checkout form was tricky, I had to pass `type` as a prop so I could use the  `Button` component and `onSubmit`. 
## Key Deliverables:
* Functional and styled UI components.
* Dynamic forms for login, signup, and product management.