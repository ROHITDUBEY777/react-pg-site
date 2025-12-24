import { Button } from "@/components/ui/button";
import { Bed, Check, IndianRupee } from "lucide-react";

const rooms = [
  {
    id: 1,
    title: "Single Room",
    description: "Private room with attached bathroom",
    beds: 1,
    price: "8,000",
    features: ["Ceiling Fan", "WiFi", "Bed & Mattress"],
  },
  {
    id: 2,
    title: "Shared Room (2 Bed)",
    description: "Comfortable room for 2 students",
    beds: 2,
    price: "7,500",
    features: ["Ceiling Fan", "WiFi", "Beds & Mattresses"],
  },
  {
    id: 3,
    title: "Shared Room (3 Bed)",
    description: "Budget-friendly room for 3 students",
    beds: 3,
    price: "6,500",
    features: ["Ceiling Fan", "WiFi", "Beds & Mattresses"],
  },
];

const RoomsSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="rooms" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
          Room Options
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Room Image/Icon Area */}
              <div className="gradient-room h-48 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  {Array.from({ length: room.beds }).map((_, i) => (
                    <Bed
                      key={i}
                      className="w-12 h-12 text-primary-foreground animate-float"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Room Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-2">
                  {room.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {room.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2 mb-4">
                  {room.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-1 text-2xl font-bold text-price mb-4">
                  <IndianRupee className="w-6 h-6" />
                  <span>{room.price}</span>
                  <span className="text-base font-normal text-muted-foreground">/month</span>
                </div>
                
                {/* CTA Button */}
                <Button
                  onClick={scrollToContact}
                  variant="destructive"
                  className="w-full"
                >
                  Inquire Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
