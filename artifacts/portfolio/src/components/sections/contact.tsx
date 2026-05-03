import { GlassCard } from "@/components/ui/glass-card";
import { Mail, Phone, Linkedin, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's Connect</h2>
            <p className="text-muted-foreground text-lg">
              Open for new opportunities, collaborations, and discussions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <GlassCard className="flex flex-col items-center text-center p-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Email</h3>
              <a href="mailto:alidawood098@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                alidawood098@gmail.com
              </a>
            </GlassCard>

            <GlassCard className="flex flex-col items-center text-center p-8">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 text-secondary">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Phone</h3>
              <a href="tel:+970592870233" className="text-muted-foreground hover:text-secondary transition-colors" dir="ltr">
                +970 592 870 233
              </a>
            </GlassCard>
          </div>

          <div className="flex justify-center gap-4 mb-16">
            <Button asChild variant="outline" size="lg" className="rounded-full glass-panel border-white/10 hover:bg-white/10">
              <a href="https://www.linkedin.com/in/ali-omar-developer" target="_blank" rel="noreferrer">
                <Linkedin className="mr-2 w-4 h-4" />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full glass-panel border-white/10 hover:bg-white/10">
              <a href="https://github.com/alidawood098" target="_blank" rel="noreferrer">
                <Github className="mr-2 w-4 h-4" />
                GitHub
              </a>
            </Button>
          </div>

          <div className="border-t border-white/10 pt-16">
            <h3 className="text-xl font-medium mb-6 text-center text-muted-foreground">Reference</h3>
            <GlassCard className="max-w-md mx-auto p-6 flex flex-col items-center text-center">
              <p className="font-bold text-foreground mb-1">Muntaser Dudeen</p>
              <p className="text-sm text-muted-foreground mb-4">Head of Infrastructure Dept., Palestine Islamic Bank</p>
              <a 
                href="mailto:muntaser.dudeen@islamicbank.ps" 
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                muntaser.dudeen@islamicbank.ps
                <ExternalLink className="ml-1 w-3 h-3" />
              </a>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
}