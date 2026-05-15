import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Mail, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { Magnetic } from "@/components/ui/magnetic";
import { AnimatedAvatar } from "@/components/ui/animated-avatar";
import { useI18n } from "@/hooks/use-i18n";

const base = import.meta.env.BASE_URL;

const ROLES = [
  "Software Developer",
  "Web Developer",
  "Front-End Developer",
  "Full-Stack Developer",
  "AI Engineer",
];

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Aurora background fills the whole hero */}
      <div className="absolute inset-0 z-0">
        <AuroraBackground className="h-full">
          <div className="absolute inset-0 z-[2] bg-background/30 dark:bg-background/40 backdrop-blur-[1px]" />
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div
            className="absolute inset-0 z-[3] opacity-[0.05] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
        </AuroraBackground>
      </div>

      <div className="container relative z-30 mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
          {/* Left: text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-primary" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-primary uppercase">
                {t("hero.role")}
              </span>
              <div className="flex items-center gap-1.5 ml-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-sm text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{t("hero.location")}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 w-fit"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05]">
                Ali{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradient_6s_linear_infinite]">
                  Omar.
                </span>
              </h1>
            </motion.div>

            {/* Gooey-morphing role display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mb-8"
            >
              <GooeyText
                texts={ROLES}
                morphTime={1}
                cooldownTime={1.6}
                className="h-14 md:h-16"
                textClassName="text-2xl md:text-4xl font-bold text-foreground whitespace-nowrap"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 font-light leading-relaxed"
            >
              {t("hero.tagline")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.3}>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-7 group font-medium"
                >
                  <Link href="/projects">
                    {t("hero.viewProjects")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:ml-0 rtl:mr-2 rtl:group-hover:-translate-x-1" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-7 glass-panel hover:bg-foreground/10 transition-colors border-foreground/20 font-medium"
                >
                  <Link href="/contact">
                    <Mail className="mr-2 w-4 h-4 text-secondary rtl:mr-0 rtl:ml-2" />
                    {t("hero.getInTouch")}
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="rounded-full px-5 text-muted-foreground hover:text-foreground hover:bg-foreground/5 font-medium"
                >
                  <a href={`${base}Ali_Omar_CV.pdf`} download="Ali_Omar_CV.pdf">
                    <Download className="mr-2 w-4 h-4 rtl:mr-0 rtl:ml-2" />
                    {t("hero.downloadCV")}
                  </a>
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right: animated avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex justify-center items-center pr-4"
          >
            <AnimatedAvatar />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
