import { motion } from "framer-motion";
import { Code2, Layers, Globe2, Sparkles } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

const items = [
  { icon: Sparkles, valueKey: "highlights.years.value", labelKey: "highlights.years.label" },
  { icon: Layers, valueKey: "highlights.projects.value", labelKey: "highlights.projects.label" },
  { icon: Code2, valueKey: "highlights.langs.value", labelKey: "highlights.langs.label" },
  { icon: Globe2, valueKey: "highlights.countries.value", labelKey: "highlights.countries.label" },
] as const;

export function Highlights() {
  const { t } = useI18n();
  return (
    <section className="relative -mt-2 mb-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-2xl px-4 py-5 md:px-6 md:py-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-foreground/10 [&>*+*]:pl-4 md:[&>*+*]:pl-6 [&>*]:pr-4 md:[&>*]:pr-6 rtl:divide-x-reverse">
            {items.map(({ icon: Icon, valueKey, labelKey }) => (
              <div key={valueKey} className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 shrink-0 rounded-xl bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center text-primary">
                  <Icon className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-xl md:text-2xl font-bold leading-none tracking-tight tabular-nums">
                    {t(valueKey)}
                  </div>
                  <div className="text-[11px] md:text-xs text-muted-foreground mt-1.5 leading-tight">
                    {t(labelKey)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
