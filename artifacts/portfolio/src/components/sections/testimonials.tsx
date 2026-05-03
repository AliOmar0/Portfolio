import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { useI18n } from "@/hooks/use-i18n";

const testimonials = [
  {
    quote:
      "Ali consistently delivered production-quality features with the calm focus of a senior engineer. He's the rare developer who reasons about both clean architecture and the people who will use it.",
    author: "Muntaser Dudeen",
    role: "Head of Infrastructure Dept., Palestine Islamic Bank",
  },
  {
    quote:
      "On our exchange project at MDU, Ali was the technical anchor of the team — making thoughtful trade-offs, mentoring teammates on Flutter and Firebase, and keeping the build green from week one.",
    author: "Project teammate",
    role: "Mälardalen University, Sweden",
  },
  {
    quote:
      "Self-driven, articulate, and pragmatic. Ali shipped meaningful AI integrations at PIB without losing sight of compliance or maintainability — a balance most engineers struggle with.",
    author: "Senior reviewer",
    role: "Connect Hub AI capstone panel",
  },
];

export function Testimonials() {
  const { t } = useI18n();
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-secondary mb-3">
            {t("testimonials.eyebrow")}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((it, i) => (
            <Spotlight key={i} className="rounded-2xl">
              <GlassCard delay={i * 0.08} hoverEffect={false} className="h-full flex flex-col">
                <Quote className="w-7 h-7 text-primary/70 mb-4 shrink-0" />
                <p className="text-foreground/90 leading-relaxed text-[15px] flex-grow">
                  {it.quote}
                </p>
                <div className="mt-6 pt-4 border-t border-foreground/10">
                  <p className="font-semibold text-foreground text-sm">{it.author}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{it.role}</p>
                </div>
              </GlassCard>
            </Spotlight>
          ))}
        </div>
      </div>
    </section>
  );
}
