import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  alpha: number;
};

export function AnimatedAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Color palette tuned to the site's iridescent cyan/violet/emerald
    const palette = [
      { hue: 174, sat: 90, light: 55 }, // cyan / teal
      { hue: 270, sat: 85, light: 60 }, // violet
      { hue: 158, sat: 80, light: 55 }, // emerald
      { hue: 210, sat: 90, light: 60 }, // electric blue
    ];

    const blobs: Blob[] = Array.from({ length: 5 }).map((_, i) => {
      const p = palette[i % palette.length]!;
      return {
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00012,
        vy: (Math.random() - 0.5) * 0.00012,
        r: 0.35 + Math.random() * 0.25,
        hue: p.hue,
        alpha: 0.55,
      };
    });

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let last = performance.now();

    const render = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;

      // Base wash
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(7, 11, 22, 1)";
      ctx.fillRect(0, 0, width, height);

      // Blobs
      ctx.globalCompositeOperation = "lighter";
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active;

      for (const b of blobs) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.x < -0.2 || b.x > 1.2) b.vx *= -1;
        if (b.y < -0.2 || b.y > 1.2) b.vy *= -1;

        let cx = b.x;
        let cy = b.y;
        if (active) {
          // gentle pull toward mouse
          cx = b.x + (mx - b.x) * 0.18;
          cy = b.y + (my - b.y) * 0.18;
        }

        const px = cx * width;
        const py = cy * height;
        const radius = b.r * Math.max(width, height);
        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
        grad.addColorStop(0, `hsla(${b.hue}, 90%, 60%, ${b.alpha})`);
        grad.addColorStop(0.55, `hsla(${b.hue}, 90%, 55%, ${b.alpha * 0.25})`);
        grad.addColorStop(1, `hsla(${b.hue}, 90%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle grain
      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = "rgba(255,255,255,0.012)";
      ctx.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: "blur(40px) saturate(140%)" }}
      />
      {/* glass overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-background/30" />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
    </div>
  );
}
