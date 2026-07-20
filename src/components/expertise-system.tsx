import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";
import { SectionHeader } from "./section-header";
import { Reveal, Stagger, staggerItem } from "./reveal";

/* ─── EXPERTISE SYSTEM DATA (01 - 06) ────────────────────────── */
export const EXPERTISE_CARDS = [
  {
    num: "01",
    discipline: "UX DESIGN",
    title: "UX Strategy & Research",
    description:
      "I begin with understanding people, business goals, and product structure before designing interfaces.",
    capabilities: [
      "User Research",
      "Information Architecture",
      "User Flows",
      "Wireframing",
      "User Journey Mapping",
      "Usability Testing",
      "Accessibility (WCAG)",
      "Design Thinking",
    ],
    span: "lg:col-span-7",
  },
  {
    num: "02",
    discipline: "UI DESIGN",
    title: "Interface Design",
    description:
      "Creating calm, structured, high-fidelity interfaces that simplify complex workflows.",
    capabilities: [
      "High-Fidelity UI",
      "Visual Design",
      "Responsive Design",
      "Interaction Design",
      "Dashboard Design",
      "Typography",
      "Visual Hierarchy",
    ],
    span: "lg:col-span-5",
  },
  {
    num: "03",
    discipline: "DESIGN SYSTEMS",
    title: "Scalable Design Systems",
    description:
      "Designing reusable foundations that keep products consistent as they grow.",
    capabilities: [
      "Components",
      "Variants",
      "Auto Layout",
      "Design Tokens",
      "Component Libraries",
      "Spacing Systems",
      "Grid Systems",
      "Documentation",
    ],
    span: "lg:col-span-5",
  },
  {
    num: "04",
    discipline: "PROTOTYPING",
    title: "Interaction & Prototyping",
    description:
      "Testing product ideas through realistic interactions before development.",
    capabilities: [
      "Interactive Prototypes",
      "Micro Interactions",
      "Smart Animate",
      "Motion Design",
      "Clickable Flows",
      "Developer Handoff",
    ],
    span: "lg:col-span-7",
  },
  {
    num: "05",
    discipline: "FRONTEND COLLABORATION",
    title: "Developer Collaboration",
    description:
      "Designing with implementation in mind to reduce friction between design and engineering.",
    capabilities: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Basic JavaScript",
      "Responsive Development",
      "GitHub Collaboration",
      "Design QA",
      "Component Specs",
    ],
    span: "lg:col-span-6",
  },
  {
    num: "06",
    discipline: "AI WORKFLOW",
    title: "AI Assisted Workflow",
    description:
      "Using AI to accelerate research, exploration, documentation, and rapid prototyping while keeping design decisions human.",
    capabilities: [
      "Prompt Engineering",
      "ChatGPT",
      "Claude",
      "Lovable",
      "Replit",
      "AI-Assisted Design",
      "Rapid Ideation",
    ],
    span: "lg:col-span-6",
  },
] as const;

export const DAILY_TOOLKIT = [
  "Figma",
  "FigJam",
  "Miro",
  "Framer",
  "Webflow",
  "Adobe Illustrator",
  "ChatGPT",
  "Claude",
  "Lovable",
  "GitHub",
] as const;

const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

export function ProductDesignExpertise() {
  const reduced = useReducedMotion();

  return (
    <section className="space-y-14 border-t border-border/20 pt-16 pb-12">
      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeader
          index="04"
          eyebrow="Operating System"
          title="Product Design Expertise"
          description="A combination of product thinking, interface design, design systems, and frontend collaboration developed through enterprise HRMS work and personal product exploration."
        />
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-surface/20 text-[10px] font-mono text-muted-foreground shrink-0">
          <Terminal className="h-3.5 w-3.5 text-accent" />
          <span>6 DISCIPLINES · HUMAN-LED PRODUCT DESIGN</span>
        </div>
      </div>

      {/* ── Asymmetric 6-Card Editorial Grid ── */}
      <Stagger className="grid grid-cols-1 lg:grid-cols-12 gap-6" stagger={0.07}>
        {EXPERTISE_CARDS.map((card) => (
          <motion.div
            key={card.num}
            variants={staggerItem}
            whileHover={reduced ? undefined : { y: -4 }}
            transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
            className={`group relative overflow-hidden rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-8 md:p-10 transition-all duration-500 hover:border-accent/40 hover:bg-surface/30 hover:shadow-[0_25px_65px_rgba(0,0,0,0.45)] ${card.span}`}
          >
            {/* Ambient background glow on hover */}
            <div
              className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-accent/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Row: Number & Discipline Label */}
            <div className="flex items-center justify-between border-b border-border/25 pb-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm md:text-base font-semibold text-accent/80 group-hover:text-accent transition-colors">
                  {card.num}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground/70 font-semibold">
                  {card.discipline}
                </span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-accent/30 group-hover:bg-accent group-hover:scale-125 transition-all duration-300" />
            </div>

            {/* Middle: Title & Philosophy Description */}
            <div className="my-6 space-y-3">
              <h3 className="font-display text-2xl md:text-3xl text-foreground font-light tracking-tight group-hover:text-accent/90 transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground/80 font-light max-w-xl">
                {card.description}
              </p>
            </div>

            {/* Capabilities List (Refined typography cells) */}
            <div className="pt-5 border-t border-border/20 space-y-3">
              <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-muted-foreground/50 block">
                CAPABILITIES
              </span>
              <div className="flex flex-wrap gap-2">
                {card.capabilities.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border/30 bg-surface/30 px-3 py-1.5 text-[11px] font-mono text-muted-foreground/90 transition-all duration-300 group-hover:border-border/50 group-hover:text-foreground hover:!border-accent/50 hover:!text-accent hover:!bg-accent/10"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </Stagger>

      {/* ── Daily Toolkit Minimal Footer ── */}
      <Reveal className="pt-8 border-t border-border/20">
        <div className="rounded-3xl border border-border/30 bg-surface/15 backdrop-blur-md p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-1 shrink-0">
            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-accent font-semibold block">
              DAILY TOOLKIT
            </span>
            <span className="text-xs text-muted-foreground font-light">
              Software &amp; environments used for daily product execution
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-mono text-muted-foreground/90">
            {DAILY_TOOLKIT.map((tool, idx) => (
              <span
                key={tool}
                className="inline-flex items-center gap-2 hover:text-accent transition-colors cursor-default"
              >
                <span className="hover:underline underline-offset-4 decoration-accent/40">
                  {tool}
                </span>
                {idx < DAILY_TOOLKIT.length - 1 && (
                  <span className="text-accent/30 select-none">&middot;</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
