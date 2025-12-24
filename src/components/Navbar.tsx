import { useState } from "react";
import { Menu, X, Home, Building, Bed, Phone, Shield } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#facilities", label: "Facilities", icon: Building },
    { href: "#rooms", label: "Rooms", icon: Bed },
    { href: "#contact", label: "Contact", icon: Phone },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-secondary sticky top-0 z-50 shadow-nav">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
            <span className="text-secondary-foreground font-bold text-xl">AR</span>
          </div>
          <span className="text-secondary-foreground font-bold text-2xl">AR PG</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollToSection(link.href)}
                className="text-secondary-foreground hover:text-accent transition-colors duration-300 font-medium"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollToSection("#contact")}
              className="bg-secondary-foreground/20 text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary-foreground/30 transition-colors duration-300 flex items-center gap-2"
            >
              <Shield size={16} />
              Admin Login
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-secondary-foreground p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary border-t border-secondary-foreground/10 animate-slide-up">
          <ul className="container mx-auto py-4 space-y-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-secondary-foreground hover:text-accent transition-colors duration-300 font-medium flex items-center gap-3 w-full py-2"
                  >
                    <Icon size={18} />
                    {link.label}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                onClick={() => scrollToSection("#contact")}
                className="bg-secondary-foreground/20 text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary-foreground/30 transition-colors duration-300 flex items-center gap-2 w-full justify-center"
              >
                <Shield size={16} />
                Admin Login
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
