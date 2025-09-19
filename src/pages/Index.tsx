import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <CurrencyConverter />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
