import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals immediate `[data-stat]` children with a GSAP + ScrollTrigger
 * stagger. Static fallback when prefers-reduced-motion is set.
 */
export function StatsScrollReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const items = el.querySelectorAll<HTMLElement>("[data-stat]");
    if (!items.length) return;

    gsap.set(items, { y: 12, opacity: 0, filter: "blur(4px)" });

    const tween = gsap.to(items, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.35,
      ease: "power2.out",
      stagger: 0.06,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
