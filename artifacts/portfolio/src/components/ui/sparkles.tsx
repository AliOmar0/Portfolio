import { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

type SparklesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export function SparklesCore(props: SparklesProps) {
  const {
    id,
    className,
    background = "transparent",
    minSize = 0.4,
    maxSize = 1.2,
    speed = 1,
    particleColor = "#ffffff",
    particleDensity = 100,
  } = props;
  const [init, setInit] = useState(false);
  const controls = useAnimation();
  const generatedId = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({ opacity: 1, transition: { duration: 1 } });
    }
  };

  if (!init) return null;

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      className={cn("opacity-0", className)}
    >
      <Particles
        id={id || generatedId}
        className="h-full w-full"
        particlesLoaded={particlesLoaded}
        options={{
          background: { color: { value: background } },
          fullScreen: { enable: false, zIndex: 1 },
          fpsLimit: 90,
          interactivity: {
            events: {
              onClick: { enable: false, mode: "push" },
              onHover: { enable: false, mode: "repulse" },
              resize: { enable: true },
            },
          },
          particles: {
            color: { value: particleColor },
            move: {
              enable: true,
              direction: "none",
              speed: { min: 0.1, max: 1 },
              straight: false,
              outModes: { default: "out" },
            },
            number: {
              density: { enable: true, width: 400, height: 400 },
              value: particleDensity,
            },
            opacity: {
              value: { min: 0.1, max: 1 },
              animation: {
                enable: true,
                speed,
                sync: false,
                startValue: "random",
              },
            },
            shape: { type: "circle" },
            size: { value: { min: minSize, max: maxSize } },
          },
          detectRetina: true,
        }}
      />
    </motion.div>
  );
}
