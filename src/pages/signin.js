import Footer from "@/components/Footer";
// import SignUpForm from "@/components/SignUpForm";
import Header from "@/components/Header";
import SignInForm from "@/components/SignInForm";
import { useRouter } from "next/router";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;
const loginURL = `${BACKEND_URL}/auth/login`;

console.log('Register URL:', loginURL);

export default function signin() {
  const router = useRouter();

  async function signInUser(email, password) {
    try{
      const response = await fetch(loginURL, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        }
      });

       // Log response before parsing
       const responseText = await response.text();
       console.log("Raw response:", responseText);

      if (response.ok) {
        const data = JSON.parse(responseText);
        console.log("Login successful:", data);

        if (!data.token || !data.userData) {
          console.error("Missing token or userData in response");
          return;
      }

        // const userData = {
        //   token: data.token,
        //   user: data.userData,
        // }

        // Store token or user data if necessary
        localStorage.setItem("user", JSON.stringify(data.userData));
        localStorage.setItem("token", data.token);

        // May redirect to a dashboard
        router.push('/products');
        alert("You are signed in!")
      } else {
        console.error("Login failed:", response.statusText);
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  }

    
  return (
    <>
      <Header />
      <SignInForm buttonLabel="Sign In" title="Sign In Now!" handleSignIn={signInUser}/>
      <Footer title={"Brew Haven"} />
    </>
  );
}
