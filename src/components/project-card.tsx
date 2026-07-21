import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers, CheckCircle2, Clock, Wrench } from "lucide-react";
import { type Project } from "@/lib/projects";
import { useRef } from "react";

const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: EASE_EDITORIAL, delay: index * 0.1 }}
    >
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="block group relative focus:outline-none"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-surface/20 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-accent/40 group-hover:bg-surface/30 group-hover:-translate-y-1 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
        >
          {/* Dynamic Light Reflection Spotlight */}
          {!reduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
              style={{
                background: `radial-gradient(400px circle at ${smoothX.get()}px ${smoothY.get()}px, rgba(245, 240, 230, 0.08), transparent 80%)`,
              }}
            />
          )}

          <div className="flex flex-col lg:flex-row min-h-[380px]">

            {/* Media / Image Presentation Layer */}
            <div className="relative lg:w-[48%] shrink-0 overflow-hidden bg-surface/40 aspect-[16/10] lg:aspect-auto">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover lg:absolute lg:inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface/50 min-h-[220px]">
                  <Layers className="h-10 w-10 text-accent/30" strokeWidth={1} />
                </div>
              )}
              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/60 pointer-events-none z-10" />

              <span className="absolute top-6 left-6 font-mono text-xs font-semibold text-accent z-20 rounded-full border border-accent/30 bg-background/60 backdrop-blur-md px-3 py-1">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Detailed Metadata Content Layer */}
            <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12 flex-1 space-y-6 z-10">

              <div className="space-y-4">
                {/* Header Metadata Pill Bar */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1 text-[9px] font-mono font-semibold uppercase tracking-[0.22em] text-accent">
                    <Sparkles className="h-3 w-3" />
                    {project.category}
                  </span>
                  <span className="text-muted-foreground/30">&middot;</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                    <Clock className="h-3 w-3 text-accent/70" />
                    {project.year}
                  </span>
                </div>

                {/* Main Display Title */}
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-foreground leading-[1.12] tracking-tight group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Problem Statement Preview */}
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-xl">
                  <span className="text-foreground/90 font-medium block mb-1 font-mono text-[10px] uppercase tracking-wider text-accent/90">
                    PROBLEM OVERVIEW
                  </span>
                  {project.problem.slice(0, 180)}…
                </p>
              </div>

              {/* Roles, Impact & Tools Matrix */}
              <div className="space-y-4 border-t border-border/20 pt-6">
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70 block">ROLE</span>
                    <span className="text-foreground/90 font-light text-[11px]">{project.role}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70 block">KEY IMPACT</span>
                    <span className="text-accent font-light text-[11px] truncate block">
                      {project.outcomes[0] ?? "Shipped end-to-end"}
                    </span>
                  </div>
                </div>

                {/* Tools Tags & Action CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-border/30 bg-background/40 px-2.5 py-0.5 text-[9px] font-mono text-muted-foreground/80"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 4 && (
                      <span className="rounded-full border border-border/30 bg-background/40 px-2 py-0.5 text-[9px] font-mono text-muted-foreground/50">
                        +{project.tools.length - 4}
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent opacity-90 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                    Read case study
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  );
}
