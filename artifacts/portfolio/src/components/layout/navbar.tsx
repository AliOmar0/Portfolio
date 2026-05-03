import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.substring(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "glass-panel rounded-full px-6 py-3 border-white/10" : ""}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
              <Terminal className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">Ali <span className="text-muted-foreground font-light">Omar</span></span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}