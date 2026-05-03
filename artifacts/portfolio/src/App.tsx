import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import NotFound from "@/pages/not-found";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -24, filter: "blur(12px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Switch key={location} location={location}>
        <Route path="/">
          <PageShell><Hero /></PageShell>
        </Route>
        <Route path="/about">
          <PageShell><About /></PageShell>
        </Route>
        <Route path="/skills">
          <PageShell><Skills /></PageShell>
        </Route>
        <Route path="/experience">
          <PageShell><Experience /></PageShell>
        </Route>
        <Route path="/projects">
          <PageShell><Projects /></PageShell>
        </Route>
        <Route path="/education">
          <PageShell><Education /></PageShell>
        </Route>
        <Route path="/contact">
          <PageShell><Contact /></PageShell>
        </Route>
        <Route>
          <PageShell><NotFound /></PageShell>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <WouterRouter base={base}>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground font-sans overflow-x-hidden">
        <Navbar />
        <main className="relative">
          <AnimatedRoutes />
        </main>
        <footer className="py-8 border-t border-white/5 text-center text-sm text-muted-foreground">
          <div className="container mx-auto px-6">
            <p>© {new Date().getFullYear()} Ali Omar. Built with precise engineering.</p>
          </div>
        </footer>
      </div>
    </WouterRouter>
  );
}
