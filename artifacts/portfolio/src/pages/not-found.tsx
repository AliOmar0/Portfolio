import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-32 relative overflow-hidden">
      {/* subtle backdrop accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 65%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-lg"
      >
        <div className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">
          Error 404
        </div>
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradient_6s_linear_infinite]">
            404
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">{t("notFound.title")}</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">{t("notFound.body")}</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6"
          >
            <Link href="/">
              <Home className="mr-2 rtl:mr-0 rtl:ml-2 w-4 h-4" />
              {t("notFound.home")}
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full glass-panel border-foreground/15 px-6"
          >
            <Link href="/projects">
              <ArrowLeft className="mr-2 rtl:mr-0 rtl:ml-2 w-4 h-4 rtl:rotate-180" />
              View Projects
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
