import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, Users, Wifi, Car, Utensils, Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const rooms = [
  {
    id: 1,
    type: "Single Sharing",
    price: 8000,
    originalPrice: 10000,
    features: ["AC Room", "Attached Bathroom", "Study Table", "WiFi"],
    available: 3,
    icon: Users,
  },
  {
    id: 2,
    type: "Double Sharing",
    price: 6000,
    originalPrice: 8000,
    features: ["AC Room", "Shared Bathroom", "Study Table", "WiFi"],
    available: 5,
    icon: Users,
  },
  {
    id: 3,
    type: "Triple Sharing",
    price: 4500,
    originalPrice: 6000,
    features: ["Non-AC Room", "Shared Bathroom", "Study Table", "WiFi"],
    available: 2,
    icon: Users,
  },
];

const BookRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    college: "",
    moveInDate: "",
    duration: "6",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userEmail = localStorage.getItem("studentEmail") || "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoom) {
      toast({
        title: "Please select a room",
        description: "Choose a room type before booking",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate booking submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Booking Request Submitted!",
      description: "We'll contact you within 24 hours to confirm your booking.",
    });

    setIsSubmitting(false);
    setSelectedRoom(null);
    setFormData({
      name: "",
      phone: "",
      college: "",
      moveInDate: "",
      duration: "6",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentEmail");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">AR</span>
            </div>
            <span className="text-xl font-bold text-foreground">AR PG</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Welcome, {userEmail}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Book Your Room
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred room type and fill in your details. We'll get back to you within 24 hours!
          </p>
        </div>

        {/* Amenities Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { icon: Wifi, label: "Free WiFi" },
            { icon: Utensils, label: "Homely Food" },
            { icon: Car, label: "Parking" },
            { icon: Shield, label: "24/7 Security" },
            { icon: Clock, label: "Flexible Timing" },
          ].map((amenity, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border"
            >
              <amenity.icon className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{amenity.label}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Room Selection */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Select Room Type
            </h2>
            <div className="space-y-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedRoom === room.id
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {selectedRoom === room.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {room.type}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {room.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-secondary/50 text-secondary-foreground px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {room.available} rooms available
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground line-through">
                        ₹{room.originalPrice.toLocaleString()}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        ₹{room.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">/month</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Your Details
            </h2>
            <form onSubmit={handleSubmit} className="bg-card p-6 rounded-xl border border-border">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Full Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={userEmail}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    College/Institution
                  </label>
                  <Input
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    placeholder="e.g., Acharya Institute of Technology"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Preferred Move-in Date
                    </label>
                    <Input
                      name="moveInDate"
                      type="date"
                      value={formData.moveInDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Duration (months)
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                    >
                      <option value="3">3 months</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-4"
                  size="lg"
                  disabled={isSubmitting || !selectedRoom}
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-3">
                  By submitting, you agree to our terms and conditions. We'll contact you to confirm availability.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookRoom;
