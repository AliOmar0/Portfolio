import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useI18n } from "@/hooks/use-i18n";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, cycle } = useTheme();
  const { t } = useI18n();

  const label =
    theme === "dark"
      ? t("nav.darkMode")
      : theme === "light"
        ? t("nav.lightMode")
        : t("nav.systemMode");

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to cycle.`}
      title={`${label} — click to cycle`}
      className={`group relative flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-2xl text-muted-foreground hover:text-foreground transition-colors ${className}`}
    >
      <span className="relative w-7 h-7 rounded-lg flex items-center justify-center bg-foreground/[0.04] border border-foreground/5 group-hover:bg-foreground/[0.08] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ y: -14, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 14, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute"
          >
            <Icon className="w-[15px] h-[15px]" />
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="relative text-[13px] font-medium tracking-wide whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

export function ThemeToggleCompact() {
  const { theme, cycle } = useTheme();
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${theme}. Click to cycle.`}
      className="w-9 h-9 rounded-full flex items-center justify-center border border-foreground/15 bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
