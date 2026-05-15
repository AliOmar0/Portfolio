import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";

export type Tech = {
  name: string;
  /** simple-icons slug, e.g. "react", "typescript". Optional if using `icon`. */
  slug?: string;
  /** brand hex color without # (used both for image tint and hover glow) */
  color: string;
  /** optional lucide icon fallback (used when no slug or when CDN fails) */
  icon?: ComponentType<{ className?: string }>;
};

const CDN = "https://cdn.simpleicons.org";

export type TechGroup = {
  category: string;
  items: Tech[];
};

function TechIcon({ tech }: { tech: Tech }) {
  if (!tech.slug && tech.icon) {
    const Icon = tech.icon;
    return <Icon className="w-7 h-7" />;
  }
  return (
    <img
      src={`${CDN}/${tech.slug}/${tech.color}`}
      alt=""
      width={28}
      height={28}
      loading="lazy"
      decoding="async"
      className="w-7 h-7 transition-transform"
      onError={(e) => {
        // Hide failed CDN image; the tile name still identifies the tech.
        (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
      }}
    />
  );
}

export function TechStackGrid({ groups }: { groups: TechGroup[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {groups.map((group, gi) => (
        <Spotlight key={group.category} className="rounded-2xl">
          <div className="rounded-2xl glass-panel p-6 h-full">
            <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-5 pb-3 border-b border-foreground/10">
              {group.category}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {group.items.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: gi * 0.05 + i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="group relative flex flex-col items-center gap-2 p-3 rounded-xl bg-foreground/[0.03] border border-foreground/10 hover:border-primary/40 hover:bg-foreground/5 transition-colors cursor-default"
                  title={tech.name}
                  style={{ color: `#${tech.color}` }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none -z-10"
                    style={{ backgroundColor: `#${tech.color}33` }}
                  />
                  <TechIcon tech={tech} />
                  <span className="text-[10.5px] font-medium text-foreground/80 text-center leading-tight">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Spotlight>
      ))}
    </div>
  );
}
