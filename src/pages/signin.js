import SignUpForm from "@/components/SignUpForm";

export default function signin() {
    return (
        <SignUpForm buttonLabel="Sign In" handleClick={()=>{console.log("clicked sign in")}}/>
    )
}