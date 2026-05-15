import { useEffect, useMemo, useRef, useState } from "react";
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
  const parsed = useMemo(() => {
    const m = value.match(/^(\D*)([\d.]+)(\D*)$/);
    if (!m) return null;
    return {
      prefix: m[1] ?? "",
      target: parseFloat(m[2]),
      suffix: m[3] ?? "",
      isFloat: m[2].includes("."),
    };
  }, [value]);

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!parsed) return;
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    if (reduce) {
      setDisplay(parsed.target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(parsed.target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, duration, reduce]);

  if (!parsed) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  const formatted = parsed.isFloat
    ? display.toFixed(1)
    : Math.round(display).toString();
  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  );
}
