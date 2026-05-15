import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: string;
  duration?: number;
  className?: string;
};

/**
 * Parses a value like "10+", "3", "60%" and animates the numeric part
 * from 0 to the target on first viewport entry. Suffix/prefix preserved.
 */
export function AnimatedCounter({ value, duration = 1.6, className }: Props) {
  const match = value.match(/^(\D*)([\d.]+)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const isFloat = match?.[2]?.includes(".") ?? false;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce || !match ? target : 0);

  useEffect(() => {
    if (!inView || !match) return;
    if (reduce) {
      setDisplay(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce, match]);

  if (!match) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  const formatted = isFloat ? display.toFixed(1) : Math.round(display).toString();
  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
