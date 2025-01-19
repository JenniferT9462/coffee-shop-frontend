import SignUpForm from "@/components/SignUpForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;
const registerURL = `${BACKEND_URL}/auth/register`;

console.log('Register URL:', registerURL);


export default function signup() {
  const router = useRouter();
  const [error, setError] = useState('');
  async function handleSignUp(user) {
    alert('You are Signed Up!!' + user.email);
    user.role = "admin";
    // POST request to register user
    const response = await fetch(registerURL, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    if (!response.ok) {
      const error = await response.text();
      console.error('Fetch error:', error);
      setError(`HTTP error! status: ${response.status}`);
      return;
    }
    const data = await response.json();
    console.log('Response data:', data)
    if (data.error) {
      setError(data.error);
    } else {
      router.push('/signin');
    }
    
  }

  return (
    <>
      <Header />
      {
        error ? 
          <div className="text-red-400">
            An error occurred when signing up.
            {error}
          </div>
        : ""
      }
      <SignUpForm
        title="Sign Up Now!"
        buttonLabel="Sign Up"
        handleSignUp={handleSignUp}
      />
      <Footer title={"Brew Haven 2024"} />
    </>
  );
}
