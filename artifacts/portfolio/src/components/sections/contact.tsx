import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
  Send,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const base = import.meta.env.BASE_URL;

const TARGET_EMAIL = "alidawood098@gmail.com";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    const subject = `Portfolio inquiry from ${name.trim()}`;
    const body = `${message.trim()}\n\n— ${name.trim()}\n${email.trim()}`;
    const href = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  return (
    <section className="pt-32 pb-24 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-3">
              Contact
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">build</span> something.
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Open to new opportunities, collaborations, and quiet conversations about clean architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
            {/* Contact form */}
            <GlassCard className="lg:col-span-3 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="bg-white/5 border-white/10 focus-visible:ring-primary/40"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="bg-white/5 border-white/10 focus-visible:ring-primary/40"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project, role, or idea..."
                    rows={6}
                    className="bg-white/5 border-white/10 focus-visible:ring-primary/40 resize-none"
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-muted-foreground">
                    Opens your email client, pre-filled and ready to send.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 group font-medium"
                  >
                    Send Message
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </div>
              </form>
            </GlassCard>

            {/* Side panel — direct contact */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <GlassCard className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Email</p>
                  <a
                    href={`mailto:${TARGET_EMAIL}`}
                    className="block text-sm font-medium text-foreground hover:text-primary transition-colors break-all"
                  >
                    {TARGET_EMAIL}
                  </a>
                </div>
              </GlassCard>

              <GlassCard className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Phone</p>
                  <a
                    href="tel:+970592870233"
                    dir="ltr"
                    className="block text-sm font-medium text-foreground hover:text-secondary transition-colors"
                  >
                    +970 592 870 233
                  </a>
                </div>
              </GlassCard>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full glass-panel border-white/10 hover:bg-white/10"
                >
                  <a
                    href="https://www.linkedin.com/in/ali-omar0/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin className="mr-2 w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full glass-panel border-white/10 hover:bg-white/10"
                >
                  <a
                    href="https://github.com/AliOmar0"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="mr-2 w-4 h-4" />
                    GitHub
                  </a>
                </Button>
              </div>

              <Button
                asChild
                variant="outline"
                className="rounded-full glass-panel border-primary/30 hover:bg-primary/10 text-primary"
              >
                <a href={`${base}Ali_Omar_CV.pdf`} download="Ali_Omar_CV.pdf">
                  <Download className="mr-2 w-4 h-4" />
                  Download CV (PDF)
                </a>
              </Button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12">
            <h3 className="text-xs font-medium mb-5 text-center uppercase tracking-[0.3em] text-muted-foreground">
              Reference
            </h3>
            <GlassCard className="max-w-md mx-auto p-6 flex flex-col items-center text-center">
              <p className="font-bold text-foreground mb-1">Muntaser Dudeen</p>
              <p className="text-sm text-muted-foreground mb-4">
                Head of Infrastructure Dept., Palestine Islamic Bank
              </p>
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
