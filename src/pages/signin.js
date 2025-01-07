import Footer from "@/components/Footer";
import SignUpForm from "@/components/SignUpForm";
import Header from "@/components/Header";

export default function signin() {
    return (
        <>
            <Header/>
            <SignUpForm buttonLabel="Sign In" handleClick={()=>{console.log("clicked sign in")}}/>
            <Footer title={"Brew Haven 2024"}/>
        </>
    )
        
}