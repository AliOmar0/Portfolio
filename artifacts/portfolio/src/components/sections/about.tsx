import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { Terminal, Globe, Cpu } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs text-primary mb-6 font-mono uppercase tracking-wider">
              <Terminal className="w-3 h-3" />
              {t("about.eyebrow")}
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              {t("about.title.1")} <br />
              <span className="text-glow font-light italic text-muted-foreground">
                {t("about.title.2")}
              </span>
            </h2>

            <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
              <p>{t("about.body.1")}</p>
              <p>{t("about.body.2")}</p>
              <p>{t("about.body.3")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Spotlight className="rounded-2xl">
              <GlassCard delay={0.2} className="flex flex-col justify-center h-full min-h-[200px]">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("about.card1.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("about.card1.body")}</p>
              </GlassCard>
            </Spotlight>

            <Spotlight className="rounded-2xl sm:translate-y-12" color="hsl(var(--secondary) / 0.18)">
              <GlassCard delay={0.4} className="flex flex-col justify-center h-full min-h-[200px]">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("about.card2.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("about.card2.body")}</p>
              </GlassCard>
            </Spotlight>
          </div>
        </div>
      </div>
    </section>
  );
}
