import { motion, useReducedMotion } from "framer-motion";

/**
 * Decorative animated brand avatar used in the hero. Gradient ring with
 * floating glass orbs and an "AO" monogram. No external assets needed.
 */
export function AnimatedAvatar() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-60 dark:opacity-50"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--primary)) 100%)",
        }}
      />

      {/* Spinning conic ring */}
      <motion.div
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, hsl(var(--primary)) 0%, transparent 30%, hsl(var(--secondary)) 60%, transparent 90%, hsl(var(--primary)) 100%)",
          padding: "2px",
          maskImage: "radial-gradient(circle, transparent 60%, black 62%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 60%, black 62%)",
        }}
      />

      {/* Glass disc */}
      <div className="absolute inset-[14%] rounded-full glass-panel border border-foreground/15 backdrop-blur-2xl flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, hsl(var(--primary) / 0.55) 0%, transparent 55%), radial-gradient(circle at 75% 80%, hsl(var(--secondary) / 0.5) 0%, transparent 55%)",
          }}
        />
        <span
          className="relative z-10 text-6xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary via-foreground to-secondary leading-none"
          aria-hidden="true"
        >
          AO
        </span>
      </div>

      {/* Floating orbs */}
      {!reduce && (
        <>
          <motion.div
            animate={{ y: [-8, 8, -8], x: [4, -4, 4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 right-6 w-12 h-12 rounded-full backdrop-blur-md border border-foreground/15"
            style={{ background: "hsl(var(--primary) / 0.35)" }}
          />
          <motion.div
            animate={{ y: [10, -10, 10], x: [-6, 6, -6] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 -left-4 w-16 h-16 rounded-full backdrop-blur-md border border-foreground/15"
            style={{ background: "hsl(var(--secondary) / 0.35)" }}
          />
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -right-6 w-8 h-8 rounded-full backdrop-blur-md border border-foreground/15"
            style={{ background: "hsl(var(--primary) / 0.4)" }}
          />
        </>
      )}
    </div>
  );
}
