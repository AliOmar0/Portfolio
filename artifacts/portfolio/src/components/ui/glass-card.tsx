import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className = "", delay = 0, hoverEffect = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={`glass-panel rounded-2xl p-6 md:p-8 ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
