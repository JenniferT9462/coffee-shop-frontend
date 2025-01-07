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
