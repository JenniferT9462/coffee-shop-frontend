import Footer from "@/components/Footer";
// import SignUpForm from "@/components/SignUpForm";
import Header from "@/components/Header";
import SignInForm from "@/components/SignInForm";

export default function signin() {
  return (
    <>
      <Header />
      <SignInForm buttonLabel="Sign In" title="Sign In Now!" handleSignIn={() => alert("You are Signed In!")}/>
      <Footer title={"Brew Haven"} />
    </>
  );
}
