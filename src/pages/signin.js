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
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        // Store token or user data if necessary
        localStorage.setItem("authToken", data.token);

        // May redirect to a dashboard
        router.push('/dashboard');
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
