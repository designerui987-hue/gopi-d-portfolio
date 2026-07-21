import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";

export function GsapMarquee({
  items,
  speed = 40,
  className = "",
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    const duration = totalWidth / speed;

    const tween = gsap.to(track, {
      x: `-=${totalWidth}px`,
      duration,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [speed, reduced]);

  const duplicated = [...items, ...items, ...items];

  return (
    <div className={`overflow-hidden select-none whitespace-nowrap ${className}`}>
      <div ref={trackRef} className="inline-flex items-center gap-8">
        {duplicated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 font-mono text-xs text-muted-foreground/80 uppercase tracking-[0.25em]">
            <span>{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
