import { GlassCard } from "@/components/ui/glass-card";
import { GraduationCap, Award, BookOpen, MapPin } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-24 relative bg-background/50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Education & Training</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <GlassCard className="flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Al-Quds University</h3>
                <p className="text-primary text-sm font-mono mt-1">B.Sc. Information Technology</p>
              </div>
            </div>
            <div className="space-y-3 flex-grow text-muted-foreground text-sm">
              <p>Dual Studies Program (Final Semester)</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Abu Dis, Palestine</span>
              </div>
              <p className="font-mono text-xs opacity-70">08/2022 – Sep. 2026 (Expected)</p>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Mälardalen University</h3>
                <p className="text-secondary text-sm font-mono mt-1">Exchange Program</p>
              </div>
            </div>
            <div className="space-y-3 flex-grow text-muted-foreground text-sm">
              <p>Computer Science Exchange</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Västerås, Sweden</span>
              </div>
              <p className="font-mono text-xs opacity-70">08/2024 – 01/2025</p>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="font-bold">Training & Certifications</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><strong className="text-foreground">Udacity Nanodegree:</strong> AI Programming with Python & TensorFlow</li>
              <li><strong className="text-foreground">Udacity Nanodegree:</strong> Data Visualization</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <GlobeIcon className="w-5 h-5 text-secondary" />
              <h3 className="font-bold">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/5 rounded-md text-sm">Arabic (Native)</span>
              <span className="px-3 py-1 bg-white/5 rounded-md text-sm">English (Excellent)</span>
              <span className="px-3 py-1 bg-white/5 rounded-md text-sm">Swedish (Beginner)</span>
              <span className="px-3 py-1 bg-white/5 rounded-md text-sm">German (Beginner)</span>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}

function GlobeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}