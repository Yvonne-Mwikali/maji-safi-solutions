import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/projects", label: "OUR PROJECTS" },
    { href: "/team", label: "TEAM" },
    { href: "/get-involved", label: "GET INVOLVED" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-primary/98 backdrop-blur-md shadow-lg py-3"
          : "bg-primary py-5",
      )}
      data-testid="navigation"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            data-testid="link-home-logo"
          >
            <div className=" text-primary p-2 rounded-md group-hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.png"
                alt="Maji Safi logo"
                className="h-10 w-10 object-contain"
              />
            </div>
            <span className="font-heading font-bold text-xl md:text-2xl text-white tracking-tight">
              Maji<span className="text-secondary">Safi</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold tracking-widest transition-colors duration-300",
                  location === link.href
                    ? "text-secondary"
                    : "text-secondary/80 hover:text-secondary",
                )}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/donate" data-testid="link-nav-donate">
              <Button className="bg-secondary text-primary font-bold tracking-wider hover:bg-secondary/90 transition-all duration-300 px-6">
                DONATE
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-secondary p-2 hover:bg-white/10 rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-primary border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block text-lg font-semibold tracking-wider py-3 border-b border-white/10 transition-colors",
                      location === link.href
                        ? "text-secondary"
                        : "text-secondary/70 hover:text-secondary",
                    )}
                    onClick={() => setIsOpen(false)}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  data-testid="link-mobile-donate"
                >
                  <Button className="w-full bg-secondary text-primary font-bold tracking-wider mt-2">
                    DONATE
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
