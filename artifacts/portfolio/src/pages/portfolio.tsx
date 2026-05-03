import { useEffect } from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Navbar } from "@/components/layout/navbar";

export default function Portfolio() {
  useEffect(() => {
    // Add dark mode class if not present
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground font-sans overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <footer className="py-8 border-t border-white/5 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Ali Omar. Built with precise engineering.</p>
        </div>
      </footer>
    </div>
  );
}