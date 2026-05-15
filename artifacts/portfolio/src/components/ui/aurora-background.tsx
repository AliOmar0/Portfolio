import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";

interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-background text-foreground transition-colors",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -inset-[10px] opacity-60 will-change-transform",
            "[--white-gradient:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)]",
            "[--dark-gradient:repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)]",
            "[--aurora:repeating-linear-gradient(100deg,hsl(175_80%_45%)_10%,hsl(260_70%_60%)_15%,hsl(200_90%_60%)_20%,hsl(280_80%_70%)_25%,hsl(175_80%_50%)_30%)]",
            "[background-image:var(--white-gradient),var(--aurora)]",
            "dark:[background-image:var(--dark-gradient),var(--aurora)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "blur-[10px] invert dark:invert-0",
            "after:content-[''] after:absolute after:inset-0",
            "after:[background-image:var(--white-gradient),var(--aurora)]",
            "after:dark:[background-image:var(--dark-gradient),var(--aurora)]",
            "after:[background-size:200%,_100%]",
            "after:animate-[aurora_60s_linear_infinite]",
            "after:[background-attachment:fixed]",
            "after:mix-blend-difference",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_70%_30%,black_15%,transparent_75%)]",
          )}
        />
      </div>
      {children}
    </div>
  );
}
