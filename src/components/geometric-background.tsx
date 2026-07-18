import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function GeometricBackground() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const y1 = useTransform(scrollY, [0, 1200], [0, reduced ? 0 : -140]);
  const y2 = useTransform(scrollY, [0, 1200], [0, reduced ? 0 : 100]);
  const y3 = useTransform(scrollY, [0, 1200], [0, reduced ? 0 : -70]);
  const rotate = useTransform(scrollY, [0, 1600], [0, reduced ? 0 : 25]);

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Particle pool: 50 subtle coordinates
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      driftSpeed: number;
      phase: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.2 + 0.3,
        speedY: Math.random() * 0.00015 + 0.00005,
        driftSpeed: Math.random() * 0.0001 + 0.00005,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.22 + 0.08,
      });
    }

    const draw = (t: number) => {
      if (!running) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const isLight = document.documentElement.classList.contains("light");
      const pColor = isLight ? "rgba(85, 45, 25, " : "rgba(220, 180, 120, ";

      for (const p of particles) {
        p.y -= p.speedY;
        if (p.y < 0) p.y = 1;

        // Slow horizontal sway
        const px = (p.x + Math.sin(t * p.driftSpeed + p.phase) * 0.02) * w;
        const py = p.y * h;

        ctx.fillStyle = `${pColor}${p.opacity})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Fine architectural grid layout */}
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-85" />

      {/* Global slow drifting background particles */}
      {!reduced && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-60"
        />
      )}

      {/* Luxury Drifting Mesh Glow 1 (Amber Gold) */}
      {!reduced && (
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            y: y1,
            background:
              "radial-gradient(circle, var(--glow-1), transparent 70%)",
          }}
          className="absolute -left-10 -top-40 h-[650px] w-[650px] rounded-full opacity-35 blur-3xl"
        />
      )}

      {/* Luxury Drifting Mesh Glow 2 (Terracotta Warmth) */}
      {!reduced && (
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -50, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            y: y2,
            background:
              "radial-gradient(circle, oklch(0.55 0.16 45 / 0.12), transparent 70%)",
          }}
          className="absolute right-[-100px] top-[15%] h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
        />
      )}

      {/* Luxury Drifting Mesh Glow 3 (Deep Blue / Teal Accent) */}
      {!reduced && (
        <motion.div
          animate={{
            x: [0, 20, -10, 0],
            y: [0, 40, -20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "radial-gradient(circle, var(--glow-2), transparent 70%)",
          }}
          className="absolute bottom-[-150px] left-[20%] h-[550px] w-[550px] rounded-full opacity-25 blur-3xl"
        />
      )}

      {/* Editorial layout lines */}
      <div className="absolute inset-y-0 left-6 lg:left-28 w-[1px] bg-border/20 pointer-events-none" />
      <div className="absolute inset-y-0 right-6 lg:right-12 w-[1px] bg-border/20 pointer-events-none" />

      {/* Abstract Geometric Marks */}
      <motion.svg
        style={{ y: y3, rotate }}
        className="absolute right-12 top-24 hidden opacity-[0.12] lg:block text-accent"
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
      >
        <circle cx="80" cy="80" r="79" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle cx="80" cy="80" r="60" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="80" cy="80" r="40" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="80" cy="80" r="10" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="80" x2="160" y2="80" stroke="currentColor" strokeWidth="0.5" />
        <line x1="80" y1="0" x2="80" y2="160" stroke="currentColor" strokeWidth="0.5" />
      </motion.svg>
    </div>
  );
}
