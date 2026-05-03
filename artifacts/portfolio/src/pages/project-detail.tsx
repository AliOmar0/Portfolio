import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Calendar, ExternalLink, User2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Picture } from "@/components/ui/picture";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { getProject } from "@/data/projects";
import NotFound from "@/pages/not-found";

export function ProjectDetail() {
  const [, params] = useRoute<{ slug: string }>("/projects/:slug");
  const project = params?.slug ? getProject(params.slug) : undefined;
  const { t } = useI18n();

  if (!project) return <NotFound />;

  return (
    <section className="pt-32 pb-24 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {t("projects.back")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-secondary mb-3">
              {project.type}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {project.description}
            </p>
          </motion.div>

          <Spotlight className="rounded-2xl mb-10">
            <GlassCard hoverEffect={false} className="p-2 md:p-2 overflow-hidden">
              <div className="rounded-xl overflow-hidden aspect-video">
                <Picture
                  name={project.image}
                  alt={project.title}
                  width={1408}
                  height={768}
                  className="w-full h-full object-cover"
                />
              </div>
            </GlassCard>
          </Spotlight>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <GlassCard hoverEffect={false} className="p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-2">
                <User2 className="w-3.5 h-3.5" />
                {t("projects.role")}
              </div>
              <p className="text-sm font-medium">{project.role}</p>
            </GlassCard>
            <GlassCard hoverEffect={false} className="p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-2">
                <Calendar className="w-3.5 h-3.5" />
                {t("projects.timeline")}
              </div>
              <p className="text-sm font-medium font-mono">{project.date}</p>
            </GlassCard>
            <GlassCard hoverEffect={false} className="p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {t("projects.stack")}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-foreground/5 border border-foreground/10 text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="px-2 py-0.5 rounded-md bg-foreground/5 border border-foreground/10 text-[11px] text-muted-foreground">
                    +{project.stack.length - 4}
                  </span>
                )}
              </div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Spotlight className="rounded-2xl">
              <GlassCard hoverEffect={false} className="h-full">
                <h2 className="text-xl font-semibold mb-3 text-primary">
                  {t("projects.problem")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
              </GlassCard>
            </Spotlight>

            <Spotlight className="rounded-2xl" color="hsl(var(--secondary) / 0.2)">
              <GlassCard hoverEffect={false} className="h-full">
                <h2 className="text-xl font-semibold mb-3 text-secondary">
                  {t("projects.approach")}
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  {project.approach.map((p, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-3 rtl:mr-0 rtl:ml-3 text-secondary mt-1.5">▹</span>
                      <span className="leading-relaxed text-[15px]">{p}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Spotlight>
          </div>

          <Spotlight className="rounded-2xl mb-10">
            <GlassCard hoverEffect={false}>
              <h2 className="text-xl font-semibold mb-3 text-primary">
                {t("projects.outcomes")}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.outcomes.map((o, i) => (
                  <li
                    key={i}
                    className="rounded-xl bg-foreground/[0.03] border border-foreground/10 p-4 text-[14px] text-foreground/90 leading-relaxed"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Spotlight>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" className="rounded-full glass-panel border-foreground/10">
              <Link href="/projects">
                <ArrowLeft className="mr-2 rtl:mr-0 rtl:ml-2 w-4 h-4 rtl:rotate-180" />
                {t("projects.back")}
              </Link>
            </Button>
            <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">
                {t("hero.getInTouch")}
                <ExternalLink className="ml-2 rtl:ml-0 rtl:mr-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
