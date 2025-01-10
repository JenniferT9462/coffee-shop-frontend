import Footer from "@/components/Footer";
// import SignUpForm from "@/components/SignUpForm";
import Header from "@/components/Header";
import SignInForm from "@/components/SignInForm";
import { useRouter } from "next/router";

export default function signin() {
  const router = useRouter();
  function signIn() {
    alert("Your are Signed In!!!")
    // May redirect to a dashboard
    router.push('/products');
  }

  return (
    <>
      <Header />
      <SignInForm buttonLabel="Sign In" title="Sign In Now!" handleSignIn={signIn}/>
      <Footer title={"Brew Haven"} />
    </>
  );
}
