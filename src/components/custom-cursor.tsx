import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorState = { active: boolean; label: string | null };

function detectLabel(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) return null;
  const explicit = target.closest<HTMLElement>("[data-cursor]");
  if (explicit) {
    const v = explicit.dataset.cursor;
    if (v === "view" || v === "View") return "VIEW";
    if (v === "talk" || v === "Talk") return "TALK";
    if (v === "drag" || v === "Drag") return "DRAG";
    if (v === "explore" || v === "Explore") return "EXPLORE";
    if (v === "open" || v === "Open") return "OPEN";
    if (v && v.length > 0 && v !== "true") return v.toUpperCase();
    return "";
  }
  const anchor = target.closest<HTMLAnchorElement>("a[href]");
  if (anchor) {
    const href = anchor.getAttribute("href") || "";
    if (href.includes("/contact") || href.startsWith("mailto:")) return "TALK";
    if (/\/projects\/[^/]/.test(href)) return "VIEW";
    if (href.includes("/process")) return "EXPLORE";
    return "OPEN";
  }
  const button = target.closest("button, [role='button']");
  if (button) {
    const label = button.getAttribute("aria-label") || "";
    if (label.includes("palette") || label.includes("search")) return "SEARCH";
    return "CLICK";
  }
  return null;
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>({ active: false, label: null });
  const [isClicked, setIsClicked] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 450, damping: 38, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 450, damping: 38, mass: 0.4 });

  const rafRef = useRef(0);
  const pending = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      pending.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = 0;
          if (pending.current) {
            x.set(pending.current.x);
            y.set(pending.current.y);
          }
        });
      }
    };

    const onOver = (e: PointerEvent) => {
      const label = detectLabel(e.target);
      if (label === null) {
        setState((s) => (s.active ? { active: false, label: null } : s));
      } else {
        setState({ active: true, label: label || null });
      }
    };

    const onLeave = () => setState({ active: false, label: null });

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  const hasLabel = state.active && !!state.label;
  const size = hasLabel ? 72 : state.active ? 48 : 18;

  return (
    <>
      {/* Ring / label bubble */}
      <motion.div
        aria-hidden="true"
        style={{
          x: springX,
          y: springY,
          mixBlendMode: "difference",
        }}
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ width: size, height: size, scale: isClicked ? 0.78 : 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.4 }}
          className="flex items-center justify-center rounded-full border border-white bg-white/10 text-[9px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-[2px]"
        >
          <AnimatePresence mode="wait">
            {hasLabel && (
              <motion.span
                key={state.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="select-none"
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        aria-hidden="true"
        style={{
          x,
          y,
          mixBlendMode: "difference",
        }}
        className="pointer-events-none fixed left-0 top-0 z-[201] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
    </>
  );
}
