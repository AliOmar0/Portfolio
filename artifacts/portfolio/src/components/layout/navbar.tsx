import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  Terminal,
  Home,
  User,
  Cpu,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Skills", href: "/skills", icon: Cpu },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Education", href: "/education", icon: GraduationCap },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Lock scroll while mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <>
      {/* Desktop / tablet: vertical left rail */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col items-center"
      >
        <div className="glass-panel rounded-full border border-white/10 px-2 py-3 flex flex-col items-center gap-1 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          <Link
            href="/"
            className="group w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 hover:bg-primary/30 transition-colors mb-2"
            aria-label="Home — Ali Omar"
          >
            <Terminal className="w-4 h-4 text-primary" />
          </Link>

          <nav className="flex flex-col items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={link.name}
                  aria-current={active ? "page" : undefined}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="relative w-[18px] h-[18px]" />

                  {/* Tooltip */}
                  <span
                    className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium px-2.5 py-1 rounded-md glass-panel border border-white/10 text-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Vertical word mark */}
        <div className="mt-4 [writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.4em] uppercase text-muted-foreground/60 select-none">
          Ali Omar — Portfolio
        </div>
      </motion.aside>

      {/* Mobile: top bar with hamburger */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        <div className="glass-panel rounded-full border border-white/10 px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
              <Terminal className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-base tracking-tight">
              Ali <span className="text-muted-foreground font-light">Omar</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 bg-white/5"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-md pt-24 px-4"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-3xl border border-white/10 p-3 flex flex-col gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition-colors ${
                      active
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground border border-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
