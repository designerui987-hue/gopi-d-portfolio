import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    // Three drifting blobs — terracotta accent + cool counterpoint
    const blobs = [
      { hue: "244, 154, 96", x: 0.28, y: 0.35, r: 0.55, phase: 0.0, speed: 0.00018 },
      { hue: "230, 120, 80", x: 0.72, y: 0.55, r: 0.5, phase: 1.7, speed: 0.00022 },
      { hue: "120, 150, 200", x: 0.55, y: 0.2, r: 0.42, phase: 3.1, speed: 0.00015 },
    ];

    // Floating particles
    const particleCount = 80;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      driftSpeed: number;
      phase: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.5 + 0.4,
        speedY: Math.random() * 0.0003 + 0.0001,
        driftSpeed: Math.random() * 0.0002 + 0.00008,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.35 + 0.1,
      });
    }

    // Cursor tracking with lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) - 0.5;
      targetMouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const draw = (t: number) => {
      if (!running) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Smooth cursor lerping
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      const isLight = document.documentElement.classList.contains("light");
      ctx.globalCompositeOperation = isLight ? "source-over" : "lighter";

      // Draw light blobs (with parallax depth shift)
      for (const b of blobs) {
        const cx = (b.x + Math.sin(t * b.speed + b.phase) * 0.12 - mouseX * 0.25) * w;
        const cy = (b.y + Math.cos(t * b.speed * 1.3 + b.phase) * 0.1 - mouseY * 0.25) * h;
        const rad = Math.min(w, h) * b.r;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        const opacityMain = isLight ? 0.15 : 0.22;
        const opacityMid = isLight ? 0.05 : 0.08;
        g.addColorStop(0, `rgba(${b.hue}, ${opacityMain})`);
        g.addColorStop(0.5, `rgba(${b.hue}, ${opacityMid})`);
        g.addColorStop(1, `rgba(${b.hue}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw floating particles (WebGL-like particle system)
      ctx.globalCompositeOperation = "source-over";
      const pColor = isLight ? "rgba(85, 45, 25, " : "rgba(220, 180, 120, ";
      for (const p of particles) {
        p.y -= p.speedY * (1 + mouseY * 0.3); // movement slightly affected by cursor
        if (p.y < 0) p.y = 1;
        
        // Sway sideward + mouse parallax offset
        const px = (p.x + Math.sin(t * p.driftSpeed + p.phase) * 0.04 + mouseX * 0.06) * w;
        const py = p.y * h;

        ctx.fillStyle = `${pColor}${p.opacity * 0.6})`;
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
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-45"
      style={{ filter: "blur(120px) saturate(0.85)" }}
    />
  );
}
