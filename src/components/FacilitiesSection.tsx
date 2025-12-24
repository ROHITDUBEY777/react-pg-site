import { 
  BookOpen, 
  UtensilsCrossed, 
  Shield, 
  Shirt, 
  Fan, 
  Wifi, 
  Sun, 
  Droplets, 
  GlassWater 
} from "lucide-react";

const facilities = [
  {
    icon: BookOpen,
    title: "Study Table",
    description: "Dedicated study spaces with high-speed WiFi for focused learning",
  },
  {
    icon: UtensilsCrossed,
    title: "Mess Facility",
    description: "Hygienic, nutritious meals prepared by experienced cooks",
  },
  {
    icon: Shield,
    title: "Security",
    description: "24/7 CCTV surveillance and trained security personnel",
  },
  {
    icon: Shirt,
    title: "Laundry Service",
    description: "Weekly laundry service for all residents",
  },
  {
    icon: Fan,
    title: "Ceiling Fan",
    description: "Quality air circulation for comfortable living environment",
  },
  {
    icon: Wifi,
    title: "WiFi",
    description: "High-speed internet connectivity available throughout the premises",
  },
  {
    icon: Sun,
    title: "Solar Water Heating",
    description: "Available 24×7 to provide hot water",
  },
  {
    icon: Droplets,
    title: "Water Boiler",
    description: "Also available 24×7 to provide hot water whenever needed",
  },
  {
    icon: GlassWater,
    title: "Purified Water",
    description: "Filtered drinking water available 24×7 for safe consumption",
  },
];

const FacilitiesSection = () => {
  return (
    <section id="facilities" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
          Our Facilities
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div
                key={facility.title}
                className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {facility.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
