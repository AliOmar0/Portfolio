import { GlassCard } from "@/components/ui/glass-card";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">
          Professional <span className="text-glow-secondary font-light italic text-muted-foreground">Tenure.</span>
        </h2>

        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12">
          <div className="relative pl-8 md:pl-12">
            {/* Timeline Node */}
            <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,255,200,0.5)]">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>

            <GlassCard hoverEffect={false}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">IT Intern</h3>
                  <div className="flex items-center gap-2 text-primary mt-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">Palestine Islamic Bank (PIB)</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>01/2023 – Sep. 2026 (Expected)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Ramallah, Palestine</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 text-muted-foreground leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-3 text-primary mt-1.5">▹</span>
                  <span>Built and maintained full-stack web applications using Laravel and ASP.NET Core with RESTful API layers serving internal banking portals.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary mt-1.5">▹</span>
                  <span>Developed the Connect Hub AI platform — a graduation project that modernised customer-facing communication channels at the bank.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary mt-1.5">▹</span>
                  <span>Optimised Oracle and NoSQL databases via query tuning and RMAN backups, reducing data latency by 25%.</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}