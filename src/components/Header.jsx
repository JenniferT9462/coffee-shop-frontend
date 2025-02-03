import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt, FaCoffee, FaTools } from "react-icons/fa";
import CartButton from "./CartButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Header({ itemCount }) {
  const { user, clearAuth } = useAuth();
  const { cart } = useCart();
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return <div>Loading...</div>;

  console.log("Header user:", user);


  const router = useRouter();

  const handleLogout = () => {
    console.log("Logout button clicked!"); // Debugging log

    clearAuth(); // Clear auth state and localStorage
    router.push("/signin"); // Ensure navigation updates properly
  };

  let menuItemsJSX;

  if (user?.role === "user") {
    menuItemsJSX = (
      <>
        <li>
          <Link href="/products" className="navLink btn btn-ghost gap-2">
            <FaCoffee />
            Products
          </Link>
        </li>
        <li>
          <Link href="/cart" className="navLink btn btn-ghost gap-2">
            <CartButton itemCount={cart.length} />
          </Link>
        </li>
        {/* TODO: Logout */}
        <li>
        <button
            type="button"
            onClick={handleLogout}
            className="btn btn-ghost gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </li>
      </>
    );
  } else if (user?.role === "admin") {
    menuItemsJSX = (
      <>
        <li>
          <Link href="/admin/create" className="navLink btn btn-ghost gap-2">
            <FaCoffee />
            Create Product
          </Link>
        </li>
        <li>
          <Link href="/admin" className="navLink btn btn-ghost gap-2">
            <FaTools />
            Admin Functions
          </Link>
        </li>
        {/* TODO: Logout */}
        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-ghost gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </li>
      </>
    );
  } else {
    menuItemsJSX = (
      <>
        <li>
          <Link href="/products" className="navLink btn btn-ghost gap-2">
            <FaCoffee />
            Products
          </Link>
        </li>
        <li>
          <Link href="/signin" className="navLink btn btn-ghost gap-2">
            <FaSignInAlt />
            Sign In
          </Link>
        </li>
      </>
    );
  }

  // const router = useRouter();
  // // Make CartButton disappear on Home, signup and signin
  // const isHomePage = router.pathname === "/";
  // const isSignUpPage = router.pathname === "/signup";
  // const isSignInPage = router.pathname === "/signin";

  // Stub function for signin
  const goToLogin = () => console.log("Navigate to Login Page");

  return (
    <div className="navbar bg-primary text-primary-content">
      {/* Logo */}
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={48}
          height={48}
          viewBox="0 0 512 512"
        >
          <path
            fill="#fcae73"
            d="M203.043 26.648c-8.893.062-17.672 1.326-26.193 3.873c-8.454 2.53-16.242 6.197-23.31 10.867c7.722 19.622 27.435 44.53 50.27 65.793c23.842 22.202 51.18 41.065 68.835 49.572l.207.1l.203.103c16.224 8.335 27.71 21.453 34.34 35.924c4.27 9.318 6.757 19.078 8.207 29c13-10.14 26.704-18.26 40.636-24.153c-1.06-18.31-5.088-37.51-12.424-56.735c-15.386-40.32-42.26-72.78-72.695-92.576c-21.875-14.228-45.35-21.926-68.077-21.768zm-76.408 42.305c-5.113 7.934-9.306 16.78-12.492 26.387c-10.64 32.074-9.777 72.308 5.61 112.63c9.312 24.403 22.837 45.92 38.81 63.5c15.736 4.708 31.3 11.982 45.92 21.852c11.296 7.627 21.362 16.357 30.085 25.852c2.847.692 5.695 1.282 8.54 1.746c5.42-14.138 12.455-28.204 21.124-41.85a239 239 0 0 1 17.21-23.757c.072-5.192.03-10.223-.217-15.026c-.67-12.99-2.75-24.1-6.56-32.414c-3.808-8.314-8.77-14.122-18.06-18.894l.41.202c-22.878-11.025-51.447-31.172-77.74-55.655c-20.9-19.46-40.288-41.258-52.64-64.574zm279.752 135.725c-13.507.11-27.796 3.247-42.252 9.248c-30.84 12.802-61.806 38.75-84.71 74.797c-11.717 18.442-20.137 37.67-25.372 56.523c20.55 34.478 25.597 74.082 10.793 107.342a76 76 0 0 0 7.986 9.613c21.644-18.674 46.588-34.143 64.316-50.028c9.69-8.68 17.027-17.275 21.104-25.46c4.077-8.187 5.48-15.697 3.36-25.923l-.124-.595l-.082-.6c-8.053-58.294 6.075-92.552 26.664-113.51c16.556-16.85 33.036-25.725 44.405-37.442c-8.214-2.73-16.972-4.04-26.088-3.965m56.746 23.953c-16.63 20.67-37.133 30.217-49.383 42.686c-14.076 14.328-23.793 31.575-16.715 83.104c3.408 17.52.413 34.346-6.558 48.342c-7.097 14.247-17.71 25.832-29.305 36.222c-17.613 15.782-37.93 29.296-54.926 42.48c19.275 5.007 41.22 2.584 63.565-6.693c30.84-12.8 61.808-38.75 84.71-74.797c22.905-36.048 33.24-75.107 31.728-108.463c-1.156-25.51-9.035-47.368-23.115-62.88zm-66.098 125.79c-.06-.315-.108-.628-.174-.943l.208 1.193a7 7 0 0 0-.033-.25zm-280.223-71.424c-18.383-.166-35.7 3.865-50.275 11.807c.1.003.187.01.287.013c8.63.305 19.464-.713 31.938.99c12.473 1.704 27.085 7.368 38.154 19.893c11.07 12.524 18.66 30.28 23.947 55.78l.125.594l.082.602c2.453 17.792 13.786 28.085 33.434 37.722c16.764 8.223 38.287 14.095 58.717 20.073c9.15-41-12.56-91.006-58.81-122.23c-24.938-16.836-52.274-25.015-77.597-25.244zm-81.078 41.447c-25.27 43.53-5.004 107.405 50.106 144.612c54.225 36.61 119.786 32.276 151.34-5.7c-18.436-5.254-39.336-11.22-58.53-20.634c-24.75-12.14-48.34-32.54-53.1-64.222c-4.533-21.7-10.59-33.28-15.61-38.96c-5.04-5.707-8.97-7.095-16.05-8.06c-7.08-.968-16.81-.277-28.333-.683c-8.98-.316-19.516-1.605-29.823-6.352zm89.817 54.055c.022.1.044.192.065.293l-.207-1.196c.042.304.097.6.143.904z"
          ></path>
        </svg>
        <Link href="/" className="btn btn-ghost text-xl">
          Brew Haven
        </Link>
      </div>

      {/* <ThemeController/> */}

      {/* Navigation Links */}
      <div className="flex-1 justify-end space-x-4">
        <ul className="menu menu-horizontal px-1">{menuItemsJSX}</ul>
        {/* Make cart not display on homepage */}
        {/* {!isHomePage && !isSignUpPage && !isSignInPage && (
        
        )} */}
      </div>
    </div>
  );
}
