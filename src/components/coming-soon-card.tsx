import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Construction } from "lucide-react";

/* Matches the staggerItem variants exported from reveal.tsx */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface ComingSoonCardProps {
  /** Tailwind col-span class, e.g. "md:col-span-8" */
  colSpan?: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[16/10]" */
  aspect?: string;
  /** Variant controls layout density: "featured" for homepage grid, "row" for projects page */
  variant?: "featured" | "row";
}

/**
 * Placeholder card shown while case studies are being rebuilt.
 * Visually matches the existing project card system — same border, surface,
 * backdrop-blur, rounded-3xl, and hover states — but replaces project content
 * with an animated Construction icon and "building in public" messaging.
 */
export function ComingSoonCard({
  colSpan = "md:col-span-4",
  aspect = "aspect-[3/4]",
  variant = "featured",
}: ComingSoonCardProps) {
  const reduced = useReducedMotion();

  /* Slow pulse keyframe, respects reduced-motion via inline style override */
  const iconMotion = reduced
    ? {}
    : {
        animate: {
          rotate: [0, -8, 8, -4, 4, 0],
          scale: [1, 1.08, 1.08, 1.04, 1.04, 1],
        },
        transition: {
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
        },
      };

  /* Soft shimmer that sweeps across the card surface */
  const shimmerVariants: Variants = reduced
    ? {}
    : {
        hidden: { x: "-110%", opacity: 0 },
        show: {
          x: ["−110%", "110%"],
          opacity: [0, 0.06, 0],
          transition: {
            duration: 2.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 3.5,
          },
        },
      };

  return (
    <motion.article
      variants={staggerItem}
      className={`group relative overflow-hidden rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-md transition-all duration-500 hover:border-accent/30 hover:bg-surface/40 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.45)] ${colSpan}`}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {/* ── Visual canvas (mirrors image area of the real cards) ── */}
      <div
        className={`relative ${aspect} overflow-hidden border-b border-border/40 flex flex-col items-center justify-center gap-6`}
      >
        {/* Subtle grid background — matches no-image fallback */}
        <div className="absolute inset-0 grid-bg opacity-20 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-40" />

        {/* Accent radial glow on hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.82 0.12 75 / 0.09), transparent 70%)",
          }}
        />

        {/* Bottom vignette — identical to real cards */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

        {/* Sweeping shimmer */}
        <motion.div
          className="absolute inset-0 w-[60%] skew-x-[-20deg] bg-white pointer-events-none"
          variants={shimmerVariants}
          initial="hidden"
          animate="show"
          aria-hidden="true"
        />

        {/* ── Icon ── */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/50 bg-background/60 backdrop-blur-md shadow-[var(--shadow-soft)]"
            {...iconMotion}
          >
            <Construction
              className="h-6 w-6 text-accent"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </motion.div>

          {/* Status badge — top-left on featured variant, centred in canvas on row */}
          {variant === "featured" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-background/60 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-md">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                aria-hidden="true"
              />
              Building in public
            </span>
          )}
        </div>
      </div>

      {/* ── Text body (mirrors card footer of real cards) ── */}
      <div className="flex flex-col gap-3 p-6 md:p-8">
        {variant === "row" && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/[0.07] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-accent w-fit mb-1">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
              aria-hidden="true"
            />
            Building in public
          </span>
        )}

        <h3 className="font-display text-xl leading-tight text-foreground/80">
          Case study in progress
        </h3>

        <div className="flex items-start justify-between border-t border-border/30 pt-4 text-xs text-muted-foreground">
          <p className="leading-relaxed max-w-[28ch]">
            Rebuilding this with deeper process detail — check back soon.
          </p>
        </div>
      </div>
    </motion.article>
  );
}
