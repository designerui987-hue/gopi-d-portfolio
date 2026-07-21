import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function ThreeAmbientCanvas({
  className = "",
}: {
  className?: string;
}) {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
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

    // 3 Floating Glass Spheres with 3D Depth coordinates
    const spheres = [
      { x: 0.2, y: 0.3, z: 1.2, radius: 45, vx: 0.0003, vy: 0.0002, phase: 0 },
      { x: 0.8, y: 0.4, z: 0.8, radius: 65, vx: -0.0002, vy: 0.0003, phase: 2.1 },
      { x: 0.5, y: 0.75, z: 1.5, radius: 55, vx: 0.00025, vy: -0.0002, phase: 4.2 },
    ];

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 40;
      targetY = (e.clientY / window.innerHeight - 0.5) * 40;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const draw = (time: number) => {
      if (!running) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Smooth camera lerp tracking
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      const isLight = document.documentElement.classList.contains("light");

      for (const s of spheres) {
        // Compute floating coordinates with camera tilt offset
        const cx = (s.x + Math.sin(time * s.vx + s.phase) * 0.05) * w + mouseX * s.z * dpr;
        const cy = (s.y + Math.cos(time * s.vy + s.phase) * 0.05) * h + mouseY * s.z * dpr;
        const r = s.radius * dpr * (s.z * 0.8);

        // Glass Sphere Outer Refraction Halo
        const haloGrad = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 1.4);
        haloGrad.addColorStop(0, isLight ? "rgba(212, 196, 232, 0.08)" : "rgba(212, 196, 232, 0.04)");
        haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 1.4, 0, Math.PI * 2);
        ctx.fill();

        // Glass Sphere Surface Gradient with Soft Studio Keylight
        const sphereGrad = ctx.createRadialGradient(
          cx - r * 0.35,
          cy - r * 0.35,
          r * 0.05,
          cx,
          cy,
          r
        );

        if (isLight) {
          sphereGrad.addColorStop(0, "rgba(255, 255, 255, 0.65)");
          sphereGrad.addColorStop(0.4, "rgba(245, 240, 230, 0.25)");
          sphereGrad.addColorStop(0.85, "rgba(212, 196, 232, 0.12)");
          sphereGrad.addColorStop(1, "rgba(180, 180, 190, 0.05)");
        } else {
          sphereGrad.addColorStop(0, "rgba(245, 240, 230, 0.35)");
          sphereGrad.addColorStop(0.35, "rgba(212, 196, 232, 0.12)");
          sphereGrad.addColorStop(0.8, "rgba(30, 33, 37, 0.25)");
          sphereGrad.addColorStop(1, "rgba(17, 19, 21, 0.02)");
        }

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        // Glass Specular Specularity Highlight
        ctx.strokeStyle = isLight ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.22)";
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.arc(cx - r * 0.1, cy - r * 0.1, r * 0.85, Math.PI * 1.1, Math.PI * 1.6);
        ctx.stroke();
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
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-60 z-0 ${className}`}
    />
  );
}
