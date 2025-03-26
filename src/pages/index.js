// import HelloBackend from "@/components/HelloBackend";
// import TestButton from "@/components/TestButton";
// import NavBar from "@/components/NavBar";
import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  useEffect(() => {
    const warmUpBackend = async () => {
      try {
        await fetch(`${BACKEND_URL}/hello`);
        console.log("Backend warmed up successfully");
      } catch (error) {
        console.error("Error warming up backend:", error);
      }
  };
  warmUpBackend();
}, []);


  return (
  <div className="flex flex-col min-h-screen">
    {/* <NavBar/> */}
    <Header/>
    <main>
        {/* <h1>Coffee Shop Frontend Splash Page</h1> */}
        <HeroSection/>
    </main>
    <Footer title={"Brew Haven"}/>
    {/* <HelloBackend/> */}
    {/* <TestButton/> */}
  </div>
  )
}