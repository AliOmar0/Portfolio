import { GlassCard } from "@/components/ui/glass-card";
import { Terminal, Globe, Cpu } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs text-primary mb-6 font-mono uppercase tracking-wider">
              <Terminal className="w-3 h-3" />
              About Me
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Architecting the <br />
              <span className="text-glow font-light italic text-muted-foreground">next layer.</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
              <p>
                I am a full-stack and mobile developer with hands-on experience building production-grade web applications, RESTful APIs, and AI-integrated systems. Currently completing a dual-studies B.Sc. in Information Technology at Al-Quds University while concurrently interning at Palestine Islamic Bank.
              </p>
              <p>
                At PIB, I design and maintain business-critical software, bridging the gap between legacy robust systems and modern, agile interfaces. My focus is on clean architecture, scalable databases, and seamless AI integration.
              </p>
              <p>
                Having completed an exchange program at Mälardalen University in Sweden, I thrive in distributed international teams and am completely comfortable working remotely across time zones.
              </p>
            </div>
          </div>

          {/* Cards / Visuals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard delay={0.2} className="flex flex-col justify-center h-full min-h-[200px]">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Integration</h3>
              <p className="text-sm text-muted-foreground">Bridging LLMs, STT, and TTS with production infrastructure.</p>
            </GlassCard>

            <GlassCard delay={0.4} className="flex flex-col justify-center h-full min-h-[200px] sm:translate-y-12">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Ready</h3>
              <p className="text-sm text-muted-foreground">Experienced in international teams and cross-cultural communication.</p>
            </GlassCard>
          </div>
          
        </div>
      </div>
    </section>
  );
}