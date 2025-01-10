import Footer from "@/components/Footer";
// import SignUpForm from "@/components/SignUpForm";
import Header from "@/components/Header";
import SignInForm from "@/components/SignInForm";

export default function signin() {
  function signIn() {
    alert("Your are Signed In!!!")
    // TODO: add redirect?
  }

  return (
    <>
      <Header />
      <SignInForm buttonLabel="Sign In" title="Sign In Now!" handleSignIn={signIn}/>
      <Footer title={"Brew Haven"} />
    </>
  );
}
