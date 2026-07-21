import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import { BookOpen, PencilRuler, MessageSquare, Repeat, Sparkles, Layers, Cpu, Compass, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Stagger, staggerItem, Reveal } from "@/components/reveal";
import { useRef } from "react";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Design Methodology & Process — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Systematic product design methodology combining discovery, information architecture, cross-functional alignment, and scalable design systems.",
      },
      { property: "og:title", content: "Design Methodology & Process — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Systematic product design methodology combining discovery, information architecture, cross-functional alignment, and scalable design systems.",
      },
    ],
  }),
  component: Process,
});

type Step = {
  n: string;
  t: string;
  Icon: typeof BookOpen;
  d: string;
  outputs: string[];
};

const steps: Step[] = [
  {
    n: "01",
    t: "Discovery & Problem Framing",
    Icon: Compass,
    d: "I translate complex or ambiguous product goals into clear problem statements. By mapping user mental models, business objectives, and technical constraints early, I ensure design decisions are rooted in evidence rather than assumptions.",
    outputs: ["Problem Definition", "User Journey Mapping", "Information Architecture"],
  },
  {
    n: "02",
    t: "Architecture & Structural Exploration",
    Icon: PencilRuler,
    d: "Before committing to visual fidelity, I map structural hierarchy, user flows, and low-fidelity interaction models in FigJam. Rapid exploration allows stress-testing alternative pathways without getting attached to visual details.",
    outputs: ["Conceptual User Flows", "Low-Fi Wireframes", "Structural Prototypes"],
  },
  {
    n: "03",
    t: "Cross-functional Alignment & Reviews",
    Icon: MessageSquare,
    d: "I conduct structured design reviews with product managers, engineering leads, and stakeholders. Sharing work early surfaces edge cases, technical feasibility bounds, and usability gaps before high-fidelity execution.",
    outputs: ["Design Review Notes", "Usability Testing Logs", "Technical Feasibility Alignment"],
  },
  {
    n: "04",
    t: "Systemic High-Fidelity & Handoff",
    Icon: Repeat,
    d: "I execute high-fidelity interfaces in Figma using scalable design tokens, variant components, auto-layout, and interaction states. I prepare comprehensive handoff documentation and collaborate closely with developers during implementation.",
    outputs: ["Hi-Fi Component System", "Micro-Interactions", "Developer Handoff Specs"],
  },
];

const principles = [
  ["Systems Over Isolated Screens", "Every component is designed as part of a scalable, repeatable product design system."],
  ["Clarity as the Core Metric", "If an interaction pattern requires explanation, the interface structure needs refinement."],
  ["Engineering Collaboration", "Designing with deep awareness of code boundaries accelerates product velocity and reduces friction."],
  ["Usability Validates Aesthetics", "Visual elegance serves human comprehension and focus—never superficial distraction."],
];

function StepCard({ step }: { step: Step }) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-8 md:p-10 hover:border-accent/40 hover:shadow-[var(--shadow-float)] w-full h-full flex flex-col justify-between transition-colors duration-[180ms]"
    >
      {/* Accent glow top right */}
      <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/10 transition-colors" />

      <div>
        <div className="flex items-start justify-between relative z-10">
          <div className="font-mono text-xs text-accent font-semibold">{step.n}</div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/40 bg-background/50 text-muted-foreground group-hover:text-accent group-hover:border-accent/30 transition-all duration-[180ms]">
            <step.Icon className="h-4 w-4" strokeWidth={1.75} />
          </div>
        </div>
        <h3 className="mt-6 font-display text-2xl text-foreground font-light tracking-tight group-hover:text-accent transition-colors duration-[180ms]">
          {step.t}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground font-light group-hover:text-foreground/90 transition-colors duration-[180ms]">
          {step.d}
        </p>
      </div>

      <div className="mt-8 border-t border-border/30 pt-6 relative z-10">
        <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold flex items-center gap-1.5 font-mono">
          <Sparkles className="h-3 w-3 text-accent" />
          KEY DELIVERABLES
        </div>
        <ul className="flex flex-wrap gap-2">
          {step.outputs.map((o) => (
            <li
              key={o}
              className="rounded-full border border-border/40 bg-background/40 px-3 py-1 text-xs font-mono text-foreground/80 hover:text-accent hover:border-accent/30 transition-colors duration-[180ms]"
            >
              {o}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function HorizontalTimeline() {
  const targetRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    mass: 0.35,
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-66%"]);

  if (reduced) {
    return (
      <div className="grid grid-cols-1 gap-8 mt-12 hidden md:grid">
        {steps.map((s) => (
          <StepCard key={s.n} step={s} />
        ))}
      </div>
    );
  }

  return (
    <div ref={targetRef} className="relative h-[250vh] w-full hidden md:block" data-cursor="drag">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Horizontal track line */}
        <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-border/25 z-0" />

        <motion.div style={{ x }} className="flex gap-8 relative z-10 px-4">
          {steps.map((s) => (
            <div key={s.n} className="w-[480px] shrink-0 h-[460px]">
              <StepCard step={s} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Process() {
  return (
    <PageShell
      eyebrow="METHODOLOGY & PROCESS"
      title="Systematic, repeatable, and defensible."
      description="A structured product design methodology connecting user discovery, structural architecture, cross-functional review, and scalable system handoff."
    >
      <div className="relative mt-12 space-y-24">

        {/* ── CINEMATIC TIMELINE TRACK ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/20 pb-4">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent font-semibold">
              04-STAGE EXECUTION CYCLE
            </span>
            <span className="text-xs font-mono text-muted-foreground/60 hidden md:inline">
              SCROLL TO EXPLORE TIMELINE &rarr;
            </span>
          </div>

          <HorizontalTimeline />

          {/* Mobile vertical stack fallback */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {steps.map((s) => (
              <StepCard key={s.n} step={s} />
            ))}
          </div>
        </section>

        {/* ── OPERATING PRINCIPLES ── */}
        <Reveal className="border-t border-border/20 pt-16 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent font-semibold block">
                OPERATING PHILOSOPHY
              </span>
              <h3 className="font-display text-3xl font-light text-foreground tracking-tight mt-2">
                Core Design Principles
              </h3>
            </div>
            <p className="text-xs text-muted-foreground font-light max-w-md">
              Foundational tenets guiding daily product execution and engineering partnerships.
            </p>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.08}>
            {principles.map(([title, desc], idx) => (
              <div
                key={title}
                className="rounded-3xl border border-border/30 bg-surface/20 p-7 space-y-3 hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between border-b border-border/20 pb-3">
                  <span className="font-mono text-xs font-semibold text-accent">0{idx + 1}</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60">
                    PRINCIPLE
                  </span>
                </div>
                <h4 className="font-display text-xl text-foreground font-light tracking-tight pt-1">
                  {title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground font-light">
                  {desc}
                </p>
              </div>
            ))}
          </Stagger>
        </Reveal>

      </div>
    </PageShell>
  );
}
