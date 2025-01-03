import HelloBackend from "@/components/HelloBackend";
import TestButton from "@/components/TestButton";
import NavBar from "@/components/NavBar";


export default function Home() {
  return (
  <>
    <NavBar/>
    <h1>Coffee Shop Frontend Splash Page</h1>
    <HelloBackend/>
    <TestButton/>
  </>
  )
}