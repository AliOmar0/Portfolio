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
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Skills", href: "/skills", icon: Cpu },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Education", href: "/education", icon: GraduationCap },
  { name: "Contact", href: "/contact", icon: Mail },
];

const glassShellStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, var(--glass-bg-1), var(--glass-bg-2))",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
  boxShadow: "var(--glass-shadow)",
};

const glassBorderStyle: React.CSSProperties = {
  background: "var(--glass-border)",
};

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

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
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col items-stretch"
      >
        <div className="relative">
          {/* outer aurora glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem] opacity-60 blur-2xl pointer-events-none"
            style={{ background: "var(--glass-aura)" }}
          />

          <div
            className="relative rounded-[1.75rem] p-[1px] overflow-hidden"
            style={glassBorderStyle}
          >
            <div
              className="relative rounded-[1.7rem] px-2.5 py-3 flex flex-col items-stretch gap-1 overflow-hidden"
              style={glassShellStyle}
            >
              {/* Specular highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-3 top-0 h-12 rounded-b-full opacity-70"
                style={{ background: "var(--glass-highlight)" }}
              />
              {/* Inner sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[1.7rem] opacity-50"
                style={{ background: "var(--glass-sheen)" }}
              />

              {/* Logo */}
              <Link
                href="/"
                aria-label="Home — Ali Omar"
                className="group relative flex items-center gap-3 px-2.5 py-2 mb-1 rounded-2xl hover:bg-foreground/5 transition-colors"
              >
                <span className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                  <Terminal className="w-4 h-4 text-primary" />
                </span>
                <span className="font-bold text-sm tracking-tight whitespace-nowrap">
                  Ali <span className="text-muted-foreground font-light">Omar</span>
                </span>
              </Link>

              <div className="h-px mx-2 mb-1 bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

              <nav className="relative flex flex-col gap-0.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-2xl transition-colors ${
                        active
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill-bg"
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background:
                              "linear-gradient(135deg, hsl(var(--primary) / 0.22), hsl(var(--secondary) / 0.18))",
                            boxShadow:
                              "inset 0 1px 0 hsl(var(--foreground) / 0.18), inset 0 0 0 1px hsl(var(--primary) / 0.35), 0 8px 24px -8px hsl(var(--primary) / 0.4)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span
                        className={`relative w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          active
                            ? ""
                            : "bg-foreground/[0.04] border border-foreground/5 group-hover:bg-foreground/[0.08]"
                        }`}
                      >
                        <Icon className="w-[15px] h-[15px]" />
                      </span>
                      <span className="relative text-[13px] font-medium tracking-wide whitespace-nowrap">
                        {link.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div className="h-px mx-2 my-1 bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile: top bar with hamburger */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        <div className="relative rounded-full p-[1px] overflow-hidden" style={glassBorderStyle}>
          <div
            className="rounded-full px-4 py-3 flex items-center justify-between"
            style={glassShellStyle}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                <Terminal className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold text-base tracking-tight">
                Ali <span className="text-muted-foreground font-light">Omar</span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggleCompact />
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-foreground/15 bg-foreground/5"
              >
                {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
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
              className="rounded-3xl p-[1px] overflow-hidden"
              style={glassBorderStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-3xl p-3 flex flex-col gap-1" style={glassShellStyle}>
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
                          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground border border-transparent"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeToggleCompact() {
  return (
    <div className="contents">
      <ThemeToggleIcon />
    </div>
  );
}

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

function ThemeToggleIcon() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 rounded-full flex items-center justify-center border border-foreground/15 bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors"
    >
      {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
}
