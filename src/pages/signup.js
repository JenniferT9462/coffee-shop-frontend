import SignUpForm from "@/components/SignUpForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function signup() {
  const router = useRouter();
  function signUp() {
    alert('You are Signed Up!!');
    router.push('/signin');
  }
  return (
    <>
      <Header />
      <SignUpForm
        title="Sign Up Now!"
        buttonLabel="Sign Up"
        handleSignUp={signUp}
      />
      <Footer title={"Brew Haven 2024"} />
    </>
  );
}
