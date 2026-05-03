import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-2xl text-muted-foreground hover:text-foreground transition-colors ${className}`}
    >
      <span className="relative w-7 h-7 rounded-lg flex items-center justify-center bg-foreground/[0.04] border border-foreground/5 group-hover:bg-foreground/[0.08] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ y: -14, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 14, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute"
            >
              <Moon className="w-[15px] h-[15px]" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ y: -14, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 14, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute"
            >
              <Sun className="w-[15px] h-[15px]" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="relative text-[13px] font-medium tracking-wide whitespace-nowrap">
        {isDark ? "Dark" : "Light"} mode
      </span>
    </button>
  );
}
