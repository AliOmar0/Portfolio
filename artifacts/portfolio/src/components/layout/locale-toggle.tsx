import { Languages } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

export function LocaleToggle({ compact = false }: { compact?: boolean }) {
  const { locale, toggle, t } = useI18n();
  const label = t("nav.locale");

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={`Switch language (current: ${locale})`}
        className="w-9 h-9 rounded-full flex items-center justify-center border border-foreground/15 bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Languages className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch language to ${label}`}
      className="group relative flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-2xl text-muted-foreground hover:text-foreground transition-colors"
    >
      <span className="relative w-7 h-7 rounded-lg flex items-center justify-center bg-foreground/[0.04] border border-foreground/5 group-hover:bg-foreground/[0.08]">
        <Languages className="w-[15px] h-[15px]" />
      </span>
      <span className="relative text-[13px] font-medium tracking-wide whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}
