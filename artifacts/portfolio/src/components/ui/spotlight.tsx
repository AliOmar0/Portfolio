import { useRef, type ReactNode } from "react";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  /** Hex/HSL string for the spotlight color, defaults to primary. */
  color?: string;
  /** Spotlight size in px. */
  size?: number;
}

/**
 * Wrap any element to give it a cursor-following radial highlight.
 * Uses CSS variables updated via mousemove — no React re-render per move.
 */
export function Spotlight({
  children,
  className = "",
  color = "hsl(var(--primary) / 0.18)",
  size = 360,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group/spot relative ${className}`}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "50%",
          "--spot-color": color,
          "--spot-size": `${size}px`,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/spot:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(var(--spot-size) circle at var(--spot-x) var(--spot-y), var(--spot-color), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
