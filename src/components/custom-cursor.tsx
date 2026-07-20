import { useEffect, useRef, useState } from "react";

type HoverMode = "none" | "interactive" | "card";

function detectHoverMode(target: EventTarget | null): HoverMode {
  if (!(target instanceof Element)) return "none";

  // Check if hovering over editable text or non-interactive text blocks first
  const isEditable = target.closest("input, textarea, [contenteditable='true']");
  if (isEditable) return "none";

  // Check if hovering a card element
  const card = target.closest("[data-card], .group.rounded-3xl, article, [data-stat]");
  if (card) return "card";

  // Check if hovering a clickable element (button, link, interactive element)
  const clickable = target.closest("a[href], button, [role='button'], input[type='submit'], select, label");
  if (clickable) return "interactive";

  return "none";
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoverMode, setHoverMode] = useState<HoverMode>("none");
  const [isClicked, setIsClicked] = useState(false);

  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    setEnabled(true);

    const onPointerMove = (e: PointerEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = 0;
          posRef.current.x += (targetPosRef.current.x - posRef.current.x) * 0.45;
          posRef.current.y += (targetPosRef.current.y - posRef.current.y) * 0.45;

          if (ringRef.current) {
            ringRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
          }
        });
      }
    };

    const onPointerOver = (e: PointerEvent) => {
      const mode = detectHoverMode(e.target);
      setHoverMode(mode);
    };

    const onPointerLeave = () => setHoverMode("none");
    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onPointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  const active = hoverMode !== "none";
  const ringSize = hoverMode === "card" ? 38 : 30;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-all duration-[160ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        width: `${ringSize}px`,
        height: `${ringSize}px`,
        opacity: active ? (hoverMode === "card" ? 0.75 : 0.9) : 0,
        scale: active ? (isClicked ? 0.85 : 1) : 0.4,
        border: "1px solid var(--accent)",
        boxShadow: active ? "0 0 12px oklch(0.82 0.11 75 / 0.15)" : "none",
        willChange: "transform, opacity",
      }}
    />
  );
}
