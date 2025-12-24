import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import RoomsSection from "@/components/RoomsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FacilitiesSection />
        <RoomsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
