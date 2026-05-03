import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
  Send,
  Download,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/hooks/use-i18n";
import { sendContactMessage } from "@/lib/api";

const base = import.meta.env.BASE_URL;
const TARGET_EMAIL = "alidawood098@gmail.com";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success"; delivered: boolean }
  | { state: "error"; error: string };

export function Contact() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.state === "sending") return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus({ state: "error", error: t("contact.fillAll") });
      return;
    }

    setStatus({ state: "sending" });
    const result = await sendContactMessage(
      { name: trimmedName, email: trimmedEmail, message: trimmedMessage },
      { honeypot },
    );

    if (result.ok) {
      setStatus({ state: "success", delivered: !!result.delivered });
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus({ state: "error", error: result.error || t("contact.error") });
    }
  };

  const isSending = status.state === "sending";
  const isSuccess = status.state === "success";

  return (
    <section className="pt-32 pb-12 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-3">
              {t("contact.eyebrow")}
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {t("contact.title.1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {t("contact.title.build")}
              </span>{" "}
              {t("contact.title.2")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
            {/* Contact form */}
            <Spotlight className="rounded-2xl lg:col-span-3">
              <GlassCard hoverEffect={false} className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot — hidden from real users */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">
                        {t("contact.name")}
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("contact.namePlaceholder")}
                        className="bg-foreground/5 border-foreground/10 focus-visible:ring-primary/40"
                        autoComplete="name"
                        required
                        disabled={isSending}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                        {t("contact.email")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("contact.emailPlaceholder")}
                        className="bg-foreground/5 border-foreground/10 focus-visible:ring-primary/40"
                        autoComplete="email"
                        required
                        disabled={isSending}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground">
                      {t("contact.message")}
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("contact.messagePlaceholder")}
                      rows={6}
                      className="bg-foreground/5 border-foreground/10 focus-visible:ring-primary/40 resize-none"
                      required
                      disabled={isSending}
                    />
                  </div>

                  {status.state === "error" && (
                    <p className="text-sm text-destructive" role="alert">
                      {status.error}
                    </p>
                  )}
                  {isSuccess && (
                    <div
                      role="status"
                      className="flex items-center gap-2 text-sm text-primary bg-primary/10 border border-primary/20 rounded-lg px-3 py-2"
                    >
                      <Check className="w-4 h-4 shrink-0" />
                      <span>
                        {status.delivered ? t("contact.success") : t("contact.successStored")}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <p className="text-xs text-muted-foreground">{t("contact.hint")}</p>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSending}
                      className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 group font-medium disabled:opacity-70"
                    >
                      {isSending ? t("contact.sending") : t("contact.send")}
                      <Send className="ml-2 rtl:ml-0 rtl:mr-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </div>
                </form>
              </GlassCard>
            </Spotlight>

            {/* Side panel — direct contact */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Spotlight className="rounded-2xl">
                <GlassCard hoverEffect={false} className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      {t("contact.email")}
                    </p>
                    <a
                      href={`mailto:${TARGET_EMAIL}`}
                      className="block text-sm font-medium text-foreground hover:text-primary transition-colors break-all"
                    >
                      {TARGET_EMAIL}
                    </a>
                  </div>
                </GlassCard>
              </Spotlight>

              <Spotlight className="rounded-2xl" color="hsl(var(--secondary) / 0.18)">
                <GlassCard hoverEffect={false} className="p-6 flex items-start gap-4">
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
              </Spotlight>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full glass-panel border-foreground/10 hover:bg-foreground/10"
                >
                  <a href="https://www.linkedin.com/in/ali-omar0/" target="_blank" rel="noreferrer">
                    <Linkedin className="mr-2 rtl:mr-0 rtl:ml-2 w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full glass-panel border-foreground/10 hover:bg-foreground/10"
                >
                  <a href="https://github.com/AliOmar0" target="_blank" rel="noreferrer">
                    <Github className="mr-2 rtl:mr-0 rtl:ml-2 w-4 h-4" />
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
                  <Download className="mr-2 rtl:mr-0 rtl:ml-2 w-4 h-4" />
                  {t("hero.downloadCV")} (PDF)
                </a>
              </Button>
            </div>
          </div>

          <div className="border-t border-foreground/10 pt-12">
            <h3 className="text-xs font-medium mb-5 text-center uppercase tracking-[0.3em] text-muted-foreground">
              {t("contact.reference")}
            </h3>
            <Spotlight className="rounded-2xl max-w-md mx-auto">
              <GlassCard hoverEffect={false} className="p-6 flex flex-col items-center text-center">
                <p className="font-bold text-foreground mb-1">Muntaser Dudeen</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Head of Infrastructure Dept., Palestine Islamic Bank
                </p>
                <a
                  href="mailto:muntaser.dudeen@islamicbank.ps"
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  muntaser.dudeen@islamicbank.ps
                  <ExternalLink className="ml-1 rtl:ml-0 rtl:mr-1 w-3 h-3" />
                </a>
              </GlassCard>
            </Spotlight>
          </div>
        </div>
      </div>
    </section>
  );
}
