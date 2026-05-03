import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Mail, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const base = import.meta.env.BASE_URL;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Springs smooth out the cursor parallax
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  // Different layers move different distances
  const bgX = useTransform(sx, [-1, 1], [-25, 25]);
  const bgY = useTransform(sy, [-1, 1], [-15, 15]);
  const orb1X = useTransform(sx, [-1, 1], [40, -40]);
  const orb1Y = useTransform(sy, [-1, 1], [30, -30]);
  const orb2X = useTransform(sx, [-1, 1], [-60, 60]);
  const orb2Y = useTransform(sy, [-1, 1], [-40, 40]);
  const headlineX = useTransform(sx, [-1, 1], [-8, 8]);
  const headlineY = useTransform(sy, [-1, 1], [-6, 6]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width; // 0..1
      const cy = (e.clientY - rect.top) / rect.height;
      mx.set(cx * 2 - 1);
      my.set(cy * 2 - 1);
    };
    const handleLeave = () => {
      mx.set(0);
      my.set(0);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [mx, my]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background image with parallax + slow drift */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[8%] z-0"
          style={{ x: bgX, y: bgY }}
          animate={{ scale: [1.02, 1.08, 1.02] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={`${base}hero-bg.png`}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-30 mix-blend-multiply dark:opacity-70 dark:mix-blend-screen"
          />
        </motion.div>

        {/* Slow rotating conic glow */}
        <motion.div
          className="absolute -inset-[20%] z-[1] pointer-events-none opacity-50"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(45,212,191,0.18), rgba(168,85,247,0.18), rgba(56,189,248,0.18), rgba(45,212,191,0.18))",
            filter: "blur(80px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Vignette + base wash */}
        <div className="absolute inset-0 z-[2] bg-background/55 backdrop-blur-[2px]" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div
          className="absolute inset-0 z-[3] opacity-[0.06] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />

        {/* Floating glow orbs that follow mouse */}
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="absolute top-1/4 right-[10%] w-72 h-72 bg-primary/25 rounded-full blur-[100px] z-[2] pointer-events-none"
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute bottom-1/4 left-[15%] w-[28rem] h-[28rem] bg-secondary/20 rounded-full blur-[120px] z-[2] pointer-events-none"
        />
      </div>

      <div className="container relative z-30 mx-auto px-6 md:px-12 lg:px-20">
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
          <div className="flex items-center gap-1.5 ml-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-sm text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>Ramallah, Palestine</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: headlineX, y: headlineY }}
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
            className="rounded-full px-7 glass-panel hover:bg-foreground/10 transition-colors border-foreground/20 font-medium"
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
            className="rounded-full px-5 text-muted-foreground hover:text-foreground hover:bg-foreground/5 font-medium"
          >
            <a href={`${base}Ali_Omar_CV.pdf`} download="Ali_Omar_CV.pdf">
              <Download className="mr-2 w-4 h-4" />
              Download CV
            </a>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
