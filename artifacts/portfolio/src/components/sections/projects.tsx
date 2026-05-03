import { Link } from "wouter";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Picture } from "@/components/ui/picture";
import { Spotlight } from "@/components/ui/spotlight";
import { useI18n } from "@/hooks/use-i18n";
import { projects } from "@/data/projects";

function TiltImage({ name, alt }: { name: string; alt: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative will-change-transform"
    >
      <Spotlight className="rounded-2xl">
        <GlassCard hoverEffect={false} className="p-2 overflow-hidden group">
          <div className="relative rounded-xl overflow-hidden aspect-video">
            <Picture
              name={name}
              alt={alt}
              width={1408}
              height={768}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </GlassCard>
      </Spotlight>
    </motion.div>
  );
}

export function Projects() {
  const { t } = useI18n();
  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-5xl font-bold mb-16">{t("projects.title")}</h2>

        <div className="space-y-24">
          {projects.map((project, idx) => (
            <div
              key={project.slug}
              className={`flex flex-col ${idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
            >
              {/* Image side */}
              <div className="w-full lg:w-1/2">
                <TiltImage name={project.image} alt={project.title} />
              </div>

              {/* Content side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary font-mono text-sm uppercase tracking-wider">
                      {project.type}
                    </span>
                    <span className="text-muted-foreground text-sm font-mono">
                      {project.date}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">{project.title}</h3>
                </div>

                <Spotlight className="rounded-2xl">
                  <GlassCard hoverEffect={false} className="bg-foreground/5 border-none">
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {project.description}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {project.outcomes.slice(0, 2).map((o, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-3 rtl:mr-0 rtl:ml-3 text-primary mt-1.5">▹</span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </Spotlight>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm group"
                >
                  {t("projects.viewCase")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
