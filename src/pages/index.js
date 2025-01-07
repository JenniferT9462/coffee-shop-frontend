// import HelloBackend from "@/components/HelloBackend";
// import TestButton from "@/components/TestButton";
// import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";


export default function Home() {
  return (
  <div className="flex flex-col min-h-screen">
    {/* <NavBar/> */}
    <Header/>
    <main>
        {/* <h1>Coffee Shop Frontend Splash Page</h1> */}
        <HeroSection/>
    </main>
    <Footer title={"Brew Haven 2024"}/>
    {/* <HelloBackend/> */}
    {/* <TestButton/> */}
  </div>
  )
}