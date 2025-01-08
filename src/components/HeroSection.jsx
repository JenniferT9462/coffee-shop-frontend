// components/HeroSection.jsx
import Button from "./Button";
import { useRouter } from "next/router";

const HeroSection = () => {
  const router = useRouter();
  function handleCtaClick() {
    console.log("CTA button clicked!");
    router.push("/signup");
  }
  return (
    <div className="hero min-h-screen bg-base-100"  style={{
        backgroundImage: "url('/splashImage.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        {/* Overlay */}
        <div className="hero-overlay bg-opacity-60 bg-black"></div>

        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
                <h2 className="text-5xl font-bold">Freshly Brewed Happiness</h2>
                <p className="text-lg py-6">
                    Indulge in the finest coffee crafted just for you.
                </p>
                <Button label="Sign Up Now" handleClick={handleCtaClick} />
            </div>
        </div>
    </div>
  );
};

export default HeroSection;
