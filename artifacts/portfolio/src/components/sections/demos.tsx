import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Maximize2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { demos } from "@/data/demos";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  return mobile;
}

function DemoSkeleton() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-primary/5 to-secondary/5" />
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_2.2s_linear_infinite]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--foreground) / 0.08) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

function DemoCard({ demo, index }: { demo: (typeof demos)[number]; index: number }) {
  const { t } = useI18n();
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Spotlight className="rounded-2xl h-full">
        <GlassCard hoverEffect={false} className="p-3 h-full flex flex-col">
          <div className="relative rounded-xl overflow-hidden h-[240px] md:h-[460px] lg:h-[520px] bg-foreground/5 border border-foreground/10 group">
            {isMobile ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-4">
                <DemoSkeleton />
                <p className="relative z-10 text-sm text-muted-foreground max-w-xs">
                  {t("demos.mobileFallback")}
                </p>
                <Button
                  asChild
                  size="sm"
                  className="relative z-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <a href={demo.url} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-1.5 rtl:mr-0 rtl:ml-1.5 w-3.5 h-3.5" />
                    {t("demos.openDemo")}
                  </a>
                </Button>
              </div>
            ) : (
              <>
                {!loaded && <DemoSkeleton />}
                <iframe
                  src={demo.url}
                  title={demo.title}
                  loading="lazy"
                  onLoad={() => setLoaded(true)}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  referrerPolicy="no-referrer"
                  className="w-full h-full border-0 bg-background relative z-[1]"
                />
                <a
                  href={demo.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${t("demos.openInNewTab")} — ${demo.title}`}
                  className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur-md border border-foreground/15 text-xs font-medium text-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <Maximize2 className="w-3 h-3" />
                  {t("demos.openInNewTab")}
                </a>
              </>
            )}
          </div>

          <div className="p-3 pt-4 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-foreground mb-1">{demo.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
              {demo.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {demo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                asChild
                size="sm"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
              >
                <a href={demo.url} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-1.5 rtl:mr-0 rtl:ml-1.5 w-3.5 h-3.5" />
                  {t("demos.openDemo")}
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-full glass-panel border-foreground/10 hover:bg-foreground/10"
              >
                <a href={demo.repo} target="_blank" rel="noreferrer" aria-label={t("demos.viewSource")}>
                  <Github className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </GlassCard>
      </Spotlight>
    </motion.div>
  );
}

export function Demos() {
  const { t } = useI18n();
  return (
    <section id="demos" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-12">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-3">
            {t("demos.eyebrow")}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-3">{t("demos.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">{t("demos.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {demos.map((demo, i) => (
            <DemoCard key={demo.slug} demo={demo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
