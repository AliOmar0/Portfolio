/**
 * Soft ambient gradient backdrop for non-home pages. Sits behind everything,
 * picks up the brand colors at very low opacity so the site feels cohesive
 * without competing with the home Aurora.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -top-40 -left-32 w-[44rem] h-[44rem] rounded-full opacity-[0.18] dark:opacity-[0.22] blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 65%)" }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[40rem] h-[40rem] rounded-full opacity-[0.16] dark:opacity-[0.20] blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 65%)" }}
      />
      <div
        className="absolute -bottom-40 left-1/4 w-[36rem] h-[36rem] rounded-full opacity-[0.10] dark:opacity-[0.16] blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 65%)" }}
      />
    </div>
  );
}
