import { useEffect } from "react";
import type { Transition } from "framer-motion";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ThemeProvider } from "@/hooks/use-theme";
import { I18nProvider, useI18n } from "@/hooks/use-i18n";
import { Navbar } from "@/components/layout/navbar";
import { CommandPalette } from "@/components/layout/command-palette";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Demos } from "@/components/sections/demos";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Testimonials } from "@/components/sections/testimonials";
import { ProjectDetail } from "@/pages/project-detail";
import NotFound from "@/pages/not-found";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const EASE = [0.16, 1, 0.3, 1] as const;

type TransitionStyle = "blur" | "slide-up" | "scale" | "slide-side";

const transitions: Record<TransitionStyle, Variants> = {
  blur: {
    initial: { opacity: 0, y: 24, filter: "blur(12px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -24, filter: "blur(12px)" },
  },
  "slide-up": {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  },
  "slide-side": {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
};

function pickTransition(path: string): TransitionStyle {
  if (path === "/" || path === "") return "blur";
  if (path.startsWith("/projects")) return "scale";
  if (path === "/contact") return "slide-up";
  if (path === "/about" || path === "/experience") return "slide-side";
  return "blur";
}

function PageShell({
  style,
  children,
}: {
  style: TransitionStyle;
  children: React.ReactNode;
}) {
  const v = transitions[style];
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={v}
      transition={{ duration: 0.55, ease: EASE }}
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

  const style = pickTransition(location);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Switch key={location} location={location}>
        <Route path="/">
          <PageShell style={style}>
            <Hero />
            <Highlights />
          </PageShell>
        </Route>
        <Route path="/about">
          <PageShell style={style}><About /></PageShell>
        </Route>
        <Route path="/skills">
          <PageShell style={style}><Skills /></PageShell>
        </Route>
        <Route path="/experience">
          <PageShell style={style}><Experience /></PageShell>
        </Route>
        <Route path="/projects/:slug">
          <PageShell style={style}><ProjectDetail /></PageShell>
        </Route>
        <Route path="/projects">
          <PageShell style={style}>
            <Projects />
            <Demos />
          </PageShell>
        </Route>
        <Route path="/education">
          <PageShell style={style}><Education /></PageShell>
        </Route>
        <Route path="/contact">
          <PageShell style={style}>
            <Contact />
            <Testimonials />
          </PageShell>
        </Route>
        <Route>
          <PageShell style={style}><NotFound /></PageShell>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-foreground/10 text-center text-sm text-muted-foreground md:pl-56 lg:pl-60 rtl:md:pl-0 rtl:md:pr-56 rtl:lg:pr-60">
      <div className="container mx-auto px-6">
        <p>© {new Date().getFullYear()} Ali Omar. Built with precise engineering.</p>
      </div>
    </footer>
  );
}

function Shell() {
  const { dir } = useI18n();
  return (
    <div
      dir={dir}
      className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground font-sans overflow-x-hidden transition-colors duration-300"
    >
      <Navbar />
      <CommandPalette />
      <main className="relative md:pl-56 lg:pl-60 rtl:md:pl-0 rtl:md:pr-56 rtl:lg:pr-60">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <WouterRouter base={base}>
          <Shell />
        </WouterRouter>
      </I18nProvider>
    </ThemeProvider>
  );
}
