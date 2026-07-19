import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function GsapHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".gsap-char");
    
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(chars, { y: "0%", rotateZ: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(
      chars,
      {
        y: "110%",
        rotateZ: 4,
        opacity: 0,
      },
      {
        y: "0%",
        rotateZ: 0,
        opacity: 1,
        stagger: 0.015,
        duration: 1.0,
        ease: "power4.out",
        delay: 0.6,
      }
    );
  }, [text]);

  const words = text.split(/(\s+)/);

  return (
    <h1
      ref={containerRef}
      className={className}
      aria-label={text}
    >
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          return (
            <span key={`space-${wi}`} aria-hidden="true">
              {"\u00A0"}
            </span>
          );
        }
        const chars = Array.from(word);
        return (
          <span
            key={`word-${wi}`}
            className="inline-block whitespace-nowrap align-baseline overflow-hidden"
            style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
            aria-hidden="true"
          >
            {chars.map((char, ci) => (
              <span
                key={`char-${wi}-${ci}`}
                className="gsap-char inline-block will-change-transform"
                style={{ display: "inline-block" }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </h1>
  );
}
