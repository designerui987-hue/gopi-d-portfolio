import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import { BookOpen, PencilRuler, MessageSquare, Repeat, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Stagger, staggerItem, Reveal } from "@/components/reveal";
import { useRef } from "react";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "How I Work — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "How I actually approach a design project as a junior UI/UX designer — understand, sketch, feedback, refine.",
      },
      { property: "og:title", content: "How I Work — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "How I actually approach a design project as a junior UI/UX designer — understand, sketch, feedback, refine.",
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
    t: "Understand the brief",
    Icon: BookOpen,
    d: "I re-read the brief, write the problem back in one sentence, and list what I don't know yet. If I can, I talk to whoever wrote it, or to one or two people who'd actually use the thing. Nothing polished — just notes in FigJam or a Notion doc.",
    outputs: ["Problem in one sentence", "Open questions", "3–5 short user notes"],
  },
  {
    n: "02",
    t: "Sketch cheap and often",
    Icon: PencilRuler,
    d: "Before Figma, I sketch on paper or in FigJam — two or three rough directions, ugly on purpose. It stops me from falling in love with the first idea and makes it easier to throw things away.",
    outputs: ["Paper sketches", "Rough user flows", "Low-fi wireframes"],
  },
  {
    n: "03",
    t: "Show it early, on purpose",
    Icon: MessageSquare,
    d: "I share work while it's still rough — with mentors, classmates, and (whenever I can) real users. I try to ask specific questions instead of \"what do you think?\", and I take notes I'll actually re-read the next day.",
    outputs: ["Mentor / peer review", "Small user checks", "Written feedback log"],
  },
  {
    n: "04",
    t: "Refine in small loops",
    Icon: Repeat,
    d: "Then I move into Figma properly — components, states, responsive checks. I iterate in small, defensible steps, keep a short changelog, and try to write down why I made each decision, not just what I changed.",
    outputs: ["Hi-fi screens", "Component variants", "Design decisions log"],
  },
];

const principles = [
  ["Ship something small, weekly", "Even a rough Figma frame is a decision I can defend or throw away."],
  ["Feedback beats opinion — including mine", "If I can't explain why, it's an opinion. Time to ask someone."],
  ["Reuse before you invent", "First check the kit. If a pattern exists, use it. If not, note why."],
  ["Write it down", "Short notes on decisions save future-me a lot of second-guessing."],
];

function StepCard({ step }: { step: Step }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group relative overflow-hidden rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-8 md:p-10 hover:border-accent/30 hover:shadow-[var(--shadow-premium)] w-full h-full flex flex-col justify-between"
    >
      {/* Accent glow top right */}
      <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/10 transition-colors" />

      <div>
        <div className="flex items-start justify-between relative z-10">
          <div className="font-display text-sm text-accent font-semibold">{step.n}</div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/40 bg-background/50 text-muted-foreground group-hover:text-accent group-hover:border-accent/30 transition-all duration-300">
            <step.Icon className="h-4 w-4" strokeWidth={1.75} />
          </div>
        </div>
        <h3 className="mt-6 font-display text-2xl text-foreground font-medium group-hover:text-accent transition-colors duration-300">
          {step.t}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
          {step.d}
        </p>
      </div>

      <div className="mt-8 border-t border-border/30 pt-6 relative z-10">
        <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-accent" />
          Deliverables
        </div>
        <ul className="flex flex-wrap gap-2">
          {step.outputs.map((o) => (
            <li
              key={o}
              className="rounded-full border border-border/40 bg-background/40 px-3 py-1 text-xs text-foreground/80 hover:text-foreground hover:border-accent/30 transition-colors"
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

  // Dampen scroll translation using physical springs to create Locomotive-like inertia
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
        
        <motion.div style={{ x }} className="flex gap-8 px-12 relative z-10 w-[240vw]">
          {steps.map((s) => (
            <div key={s.n} className="w-[50vw] max-w-[460px] shrink-0">
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
      eyebrow="Workflow"
      title="A junior designer's honest loop."
      description="I'm early in my career, so my process is deliberately simple: understand the brief, sketch cheaply, get feedback from mentors and users, refine in small steps. Below is how that plays out on a project."
    >
      {/* Desktop Horizontal Scroll Timeline */}
      <HorizontalTimeline />

      {/* Mobile Stack Timeline */}
      <div className="md:hidden space-y-8 mt-12 relative">
        <div className="absolute left-[20px] top-4 bottom-4 w-[1px] bg-border/30" />
        {steps.map((s) => (
          <div key={s.n} className="relative pl-10">
            {/* Timeline node */}
            <div className="absolute left-[12px] top-[14px] h-[16px] w-[16px] rounded-full border-2 border-accent bg-background z-10" />
            <StepCard step={s} />
          </div>
        ))}
      </div>

      {/* Principles */}
      <Reveal className="mt-36">
        <div className="mb-8 flex items-baseline gap-4 border-b border-border/30 pb-4">
          <span className="font-display text-sm text-accent">05</span>
          <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground font-semibold">
            Working notes
          </span>
        </div>
        <h2 className="max-w-2xl font-display text-4xl leading-tight text-foreground font-light">
          Small rules I try to actually follow.
        </h2>
        <Stagger className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border/40 bg-border/40 md:grid-cols-2" stagger={0.06}>
          {principles.map(([t, d]) => (
            <motion.div
              key={t}
              variants={staggerItem}
              className="bg-surface/20 backdrop-blur-sm p-8 md:p-10 hover:bg-surface/30 transition-all duration-300"
            >
              <div className="font-display text-xl text-foreground font-medium flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {d}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </Reveal>

      {/* Quote */}
      <Reveal className="mt-28">
        <div className="relative py-12 px-8 rounded-3xl border border-border/40 bg-surface/10 backdrop-blur-sm overflow-hidden text-center max-w-4xl mx-auto">
          <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-accent/5 blur-xl" />
          <blockquote className="font-display text-2xl md:text-3xl leading-relaxed text-foreground/90 italic font-light relative z-10">
            "I'm not trying to be clever yet — I'm trying to be honest about the
            problem and clear on the page."
          </blockquote>
        </div>
      </Reveal>
    </PageShell>
  );
}
