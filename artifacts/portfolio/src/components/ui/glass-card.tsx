import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  /** Add a cursor-following spotlight overlay on hover. */
  spotlight?: boolean;
}

export function GlassCard({
  children,
  className = "",
  delay = 0,
  hoverEffect = true,
  spotlight = false,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = spotlight
    ? (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--card-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--card-y", `${e.clientY - rect.top}px`);
      }
    : undefined;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={`glass-panel rounded-2xl p-6 md:p-8 ${spotlight ? "glass-spotlight group/card" : ""} ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
