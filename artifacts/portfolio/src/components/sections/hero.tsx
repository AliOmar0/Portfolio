import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 z-10 backdrop-blur-[2px]" />
        <img 
          src="/hero-bg.png" 
          alt="Abstract Liquid Glass" 
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
      </div>

      <div className="container relative z-30 mx-auto px-6 md:px-12 lg:px-24">
        <motion.div 
          style={{ y, opacity }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-primary" />
            <span className="font-mono text-sm tracking-wider text-primary uppercase">Software Developer</span>
            <div className="hidden md:flex items-center gap-1.5 ml-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>Ramallah, Palestine</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-foreground leading-[1.1]"
          >
            Ali <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Omar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 font-light leading-relaxed"
          >
            Building precise engineering with modern AI craft. 
            Blending technical depth with an atelier's touch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 group font-medium"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 glass-panel hover:bg-white/10 transition-colors border-white/20 font-medium"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="mr-2 w-4 h-4 text-secondary" />
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-[20%] w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
      />
    </section>
  );
}