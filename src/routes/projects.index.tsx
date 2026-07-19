import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Layers, Cpu } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Stagger, staggerItem } from "@/components/reveal";
import { projects } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Route ──────────────────────────────────────────────── */
export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Case studies — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Explore full case studies for production modules, SaaS design systems, and AI stock assistants built by Gopi.",
      },
      { property: "og:title", content: "Case studies — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Explore full case studies for production modules, SaaS design systems, and AI stock assistants built by Gopi.",
      },
    ],
  }),
  component: ProjectsIndex,
});

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "SaaS Dashboard": Layers,
  "AI Product Design": Cpu,
  "Fintech / Dashboard": Cpu,
};

/* ─── Page ───────────────────────────────────────────────── */
function ProjectsIndex() {
  useReducedMotion();

  return (
    <PageShell
      eyebrow="Portfolio"
      title="Sleek layouts, proven utility."
      description="Detailed case studies of digital products. Each project documents the why behind every decision."
    >
      <div className="mt-20">
        <Stagger className="space-y-6" stagger={0.12}>
          {projects.map((p, i) => {
            const Icon = CATEGORY_ICONS[p.category] ?? Layers;
            return (
              <motion.div key={p.slug} variants={staggerItem}>
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group relative flex flex-col md:flex-row gap-0 overflow-hidden rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-sm transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/40 hover:bg-surface/30 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                >
                  {/* Cover */}
                  <div className="relative md:w-[45%] shrink-0 overflow-hidden bg-surface/30">
                    {p.coverImage ? (
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="w-full h-full object-cover aspect-[16/10] md:aspect-auto md:absolute md:inset-0 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.008]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="aspect-[16/10] md:h-full flex items-center justify-center bg-surface/40">
                        <Icon className="h-10 w-10 text-accent/30" strokeWidth={1} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 hidden md:block pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between p-7 md:p-10 flex-1 min-h-[260px]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-accent">
                          <Icon className="h-3 w-3" strokeWidth={2} />
                          {p.category}
                        </span>
                        <span className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-wider">
                          {p.year}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl font-light text-foreground leading-[1.15] tracking-tight group-hover:text-accent/90 transition-colors duration-[180ms]">
                        {p.title}
                      </h2>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-lg">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-border/20 pt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tools.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border/30 bg-background/30 px-2.5 py-1 text-[9px] font-mono text-muted-foreground/70"
                          >
                            {t}
                          </span>
                        ))}
                        {p.tools.length > 4 && (
                          <span className="rounded-full border border-border/30 bg-background/30 px-2.5 py-1 text-[9px] font-mono text-muted-foreground/50">
                            +{p.tools.length - 4}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-[180ms] ease-out">
                        Read case study
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-[180ms]" />
                      </span>
                    </div>
                  </div>

                  <span className="absolute top-6 right-6 font-mono text-[10px] text-muted-foreground/30 font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </PageShell>
  );
}
