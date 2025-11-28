import { Link } from "react-router-dom";
import { affiliateLinks } from "@/lib/affiliateLinks";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "হোম", href: "/" },
    { name: "প্রমোশন", href: affiliateLinks.main },
    { name: "আমাদের সম্পর্কে", href: "#about" },
    { name: "যোগাযোগ", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gradient">TEKKABUZZ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" asChild>
            <a href={affiliateLinks.login} target="_blank" rel="noopener noreferrer">
              লগইন
            </a>
          </Button>
          <Button variant="brand" asChild>
            <a href={affiliateLinks.signup} target="_blank" rel="noopener noreferrer">
              সাইন আপ
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <nav className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="outline" asChild>
                <a href={affiliateLinks.login} target="_blank" rel="noopener noreferrer">
                  লগইন
                </a>
              </Button>
              <Button variant="brand" asChild>
                <a href={affiliateLinks.signup} target="_blank" rel="noopener noreferrer">
                  সাইন আপ
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
