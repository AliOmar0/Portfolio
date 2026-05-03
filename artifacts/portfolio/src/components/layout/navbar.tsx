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
        {/* Liquid glass shell */}
        <div className="relative">
          {/* outer glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem] opacity-60 blur-2xl pointer-events-none"
            style={{
              background:
                "conic-gradient(from 120deg at 50% 50%, rgba(45,212,191,0.35), rgba(168,85,247,0.25), rgba(56,189,248,0.3), rgba(45,212,191,0.35))",
            }}
          />

          <div
            className="relative rounded-[1.75rem] p-[1px] overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.02) 65%, rgba(255,255,255,0.25))",
            }}
          >
            <div
              className="relative rounded-[1.7rem] px-2.5 py-3 flex flex-col items-stretch gap-1 overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,30,50,0.55), rgba(8,12,24,0.55))",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.04), 0 30px 80px -20px rgba(0,0,0,0.7)",
              }}
            >
              {/* Specular highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-3 top-0 h-12 rounded-b-full opacity-60"
                style={{
                  background:
                    "radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,0.18), rgba(255,255,255,0) 70%)",
                }}
              />
              {/* Subtle inner gradient sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[1.7rem] opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0) 40%, rgba(255,255,255,0.03) 75%, rgba(255,255,255,0.08))",
                }}
              />

              {/* Logo */}
              <Link
                href="/"
                aria-label="Home — Ali Omar"
                className="group relative flex items-center gap-3 px-2.5 py-2 mb-1 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <span className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                  <Terminal className="w-4 h-4 text-primary" />
                </span>
                <span className="font-bold text-sm tracking-tight whitespace-nowrap">
                  Ali <span className="text-muted-foreground font-light">Omar</span>
                </span>
              </Link>

              <div className="h-px mx-2 mb-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

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
                              "linear-gradient(135deg, rgba(45,212,191,0.22), rgba(168,85,247,0.18))",
                            boxShadow:
                              "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(45,212,191,0.35), 0 8px 24px -8px rgba(45,212,191,0.4)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span
                        className={`relative w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          active
                            ? ""
                            : "bg-white/[0.04] border border-white/5 group-hover:bg-white/[0.08]"
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
        <div
          className="relative rounded-full p-[1px] overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.25))",
          }}
        >
          <div
            className="rounded-full px-4 py-3 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,30,50,0.55), rgba(8,12,24,0.55))",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.18), 0 20px 50px -20px rgba(0,0,0,0.6)",
            }}
          >
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
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.25))",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="rounded-3xl p-3 flex flex-col gap-1"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20,30,50,0.6), rgba(8,12,24,0.6))",
                  backdropFilter: "blur(28px) saturate(180%)",
                  WebkitBackdropFilter: "blur(28px) saturate(180%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
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
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
