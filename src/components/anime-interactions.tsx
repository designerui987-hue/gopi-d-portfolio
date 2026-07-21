import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Custom handcrafted cubic-bezier easing curves:
 * - Editorial Luxury Spring: cubic-bezier(0.16, 1, 0.3, 1)
 * - Elastic Hover Snap: cubic-bezier(0.34, 1.56, 0.64, 1)
 * - Smooth Momentum: cubic-bezier(0.25, 0.1, 0.25, 1.0)
 */

/* ── 1. Anime.js Style Counter Animation ── */
export function AnimeCounter({
  target,
  duration = 1800,
  prefix = "",
  suffix = "",
  className = "",
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? target : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (reduced || !isInView) return;

    let startTimestamp: number | null = null;
    let raf = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Handcrafted cubic-bezier easeOutExpo curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * target);
      setCount(current);

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration, reduced]);

  return (
    <span ref={ref} className={`font-mono font-semibold ${className}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ── 2. SVG Path Drawing / Stroke Animation ── */
export function AnimePathDraw({
  d,
  className = "",
  strokeColor = "var(--accent)",
  strokeWidth = 1.5,
  duration = 1.6,
}: {
  d: string;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <svg
      ref={ref}
      className={`overflow-visible ${className}`}
      viewBox="0 0 100 100"
      fill="none"
    >
      <motion.path
        d={d}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }
        }
        transition={{
          duration: reduced ? 0 : duration,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </svg>
  );
}

/* ── 3. SVG Circular Progress Draw ── */
export function AnimeProgressCircle({
  percentage = 100,
  size = 48,
  strokeWidth = 3,
  className = "",
}: {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div ref={ref} className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset: offset }
              : { strokeDashoffset: reduced ? offset : circumference }
          }
          transition={{
            duration: reduced ? 0 : 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

/* ── 4. Floating 3D Micro-Motion Object ── */
export function AnimeFloatingObject({
  children,
  amplitude = 8,
  duration = 4,
  className = "",
}: {
  children: ReactNode;
  amplitude?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotateZ: [-1, 1, -1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
