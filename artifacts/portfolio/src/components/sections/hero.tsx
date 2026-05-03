import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Mail, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedAurora } from "@/components/effects/animated-aurora";

const base = import.meta.env.BASE_URL;

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <AnimatedAurora />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-20" />
      </div>

      <div className="container relative z-30 mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-primary" />
          <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-primary uppercase">
            Software Developer
          </span>
          <div className="flex items-center gap-1.5 ml-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>Ramallah, Palestine</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.05]"
        >
          Ali{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradient_6s_linear_infinite]">
            Omar.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 font-light leading-relaxed"
        >
          Full-stack and AI engineer crafting production-grade web, mobile, and AI-integrated systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-7 group font-medium"
          >
            <Link href="/projects">
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-7 glass-panel hover:bg-white/10 transition-colors border-white/20 font-medium"
          >
            <Link href="/contact">
              <Mail className="mr-2 w-4 h-4 text-secondary" />
              Get in Touch
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="rounded-full px-5 text-muted-foreground hover:text-foreground hover:bg-white/5 font-medium"
          >
            <a href={`${base}Ali_Omar_CV.pdf`} download="Ali_Omar_CV.pdf">
              <Download className="mr-2 w-4 h-4" />
              Download CV
            </a>
          </Button>
        </motion.div>

        {/* Scroll cue removed — short page now */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground/60"
        >
          Use the navigation to explore
        </motion.div>
      </div>
    </section>
  );
}
