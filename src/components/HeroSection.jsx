// components/HeroSection.jsx
import Button from './Button';
import { useRouter } from 'next/router';

const HeroSection = () => {
    const router = useRouter();
    function handleCtaClick() {
        console.log('CTA button clicked!');
        router.push('/signup');
    }
    return (
        <section className="text-center text-base-100 py-20 bg-[url('/splashImage.jpeg')] bg-cover h-screen bg-center">
        <h2 className="text-4xl font-bold mb-4">Freshly Brewed Happiness</h2>
        <p className="text-lg mb-6">Indulge in the finest coffee crafted just for you.</p>
        <Button label="Sign Up Now" handleClick={handleCtaClick} />
        </section>
    );
    };

export default HeroSection;
