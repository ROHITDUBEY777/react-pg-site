import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="gradient-hero min-h-[70vh] flex items-center justify-center py-24 px-5"
    >
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
          <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
          <span className="text-primary-foreground/90 font-medium">
            Trusted by 500+ Students
          </span>
          <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
          Welcome to AR PG
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Premium Accommodation for Students | Comfortable Living | Affordable Rates
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Button
            onClick={scrollToContact}
            size="lg"
            variant="hero"
            className="text-lg px-8 py-6 group"
          >
            Book Your Room Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            onClick={() => document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" })}
            size="lg"
            variant="heroOutline"
            className="text-lg px-8 py-6"
          >
            View Rooms
          </Button>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-8 text-primary-foreground/80 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-foreground">24/7</div>
            <div className="text-sm">Security</div>
          </div>
          <div className="w-px h-12 bg-primary-foreground/30" />
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-foreground">WiFi</div>
            <div className="text-sm">High Speed</div>
          </div>
          <div className="w-px h-12 bg-primary-foreground/30" />
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-foreground">3</div>
            <div className="text-sm">Room Types</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
