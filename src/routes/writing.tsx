import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, Sparkles, Tag, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Reveal, Stagger, staggerItem } from "@/components/reveal";
import { useState } from "react";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "Writing & Essays — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Editorial essays and thoughts on calm software, design systems, interface design, and developer collaboration by Gopi Neeraj Kumar.",
      },
      { property: "og:title", content: "Writing & Essays — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Editorial essays and thoughts on calm software, design systems, interface design, and developer collaboration by Gopi Neeraj Kumar.",
      },
    ],
  }),
  component: Writing,
});

type Essay = {
  slug: string;
  num: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
};

const ESSAYS: Essay[] = [
  {
    slug: "quiet-software",
    num: "01",
    category: "Product Philosophy",
    readTime: "6 min read",
    date: "July 2026",
    title: "The Case for Quiet Software in an Era of Digital Noise",
    excerpt:
      "Modern products often demand attention instead of creating space. How designing for predictability, low cognitive load, and visual calm leads to superior user retention and trust.",
    content: [
      "Every pixel in a digital product either aids human focus or consumes cognitive energy. As software expands into every workflow, user fatigue is at an all-time high.",
      "Quiet software does not attempt to maximize time-in-app through artificial gamification or aggressive notification badges. Instead, it respects the user's focus by presenting high-density information with clear visual hierarchy and predictable interaction models.",
      "When designing enterprise business platforms, quietness becomes a productivity metric. Reducing visual noise allows operators to make critical decisions with clarity and confidence."
    ],
    keyTakeaways: [
      "Usability over visual noise",
      "Predictability reduces cognitive fatigue",
      "Clarity is a functional metric"
    ]
  },
  {
    slug: "designing-systems",
    num: "02",
    category: "Design Systems",
    readTime: "8 min read",
    date: "June 2026",
    title: "Designing Systems, Not Just Screens: Building for Velocity and Scale",
    excerpt:
      "A UI screen is a temporary snapshot, but a design system is an operational engine. How tokenized component architectures align product teams and accelerate development velocity.",
    content: [
      "When designers focus solely on individual screen layouts, inconsistencies multiply as product scope grows. A design system shifts focus from static mockups to reusable foundational rules.",
      "By establishing semantic tokens for color, typography, spacing, and elevation, design decisions become programmatic. Component variants and auto-layout structures ensure new features inherit existing accessibility and interaction patterns.",
      "The true test of a design system is engineering adoption. Clear component documentation and code awareness turn Figma libraries into shared cross-functional toolkits."
    ],
    keyTakeaways: [
      "Semantic tokens create programmatic consistency",
      "Component variants prevent ad-hoc styling",
      "Documentation bridges design and code"
    ]
  },
  {
    slug: "designer-developer-bridge",
    num: "03",
    category: "Engineering Collaboration",
    readTime: "5 min read",
    date: "May 2026",
    title: "The Designer-Developer Bridge: Why Implementation Awareness Matters",
    excerpt:
      "Designers who understand CSS layout boundaries, component states, and rendering mechanics design better products and build stronger engineering partnerships.",
    content: [
      "Great product design happens at the intersection of human empathy and technical reality. When a designer understands CSS Flexbox, Grid, and DOM rendering, wireframes become realistic software blueprints.",
      "Implementation awareness doesn't mean writing production code daily; it means designing with respect for state management, responsive breakpoints, loading skeletons, and edge cases.",
      "When designers hand off clean component specs and understand technical trade-offs, engineering teams spend less time interpreting designs and more time building robust products."
    ],
    keyTakeaways: [
      "Technical awareness speeds up execution",
      "Account for loading and error states early",
      "Treat handoff as an active dialogue"
    ]
  },
  {
    slug: "ai-as-design-partner",
    num: "04",
    category: "AI & UX Workflow",
    readTime: "7 min read",
    date: "April 2026",
    title: "AI as a Design Partner: Accelerating Synthesis Without Losing Human Craft",
    excerpt:
      "How leveraging AI models for research synthesis, wireframe exploration, and content drafting elevates product design velocity while keeping decisions human-centered.",
    content: [
      "Artificial intelligence is transforming how designers research and iterate. Using AI tools for rapid wireframe exploration and qualitative user feedback synthesis frees up time for strategic product thinking.",
      "However, AI cannot replace human empathy, context awareness, or visual refinement. The best workflows combine AI speed with human craftsmanship and intentional decision-making.",
      "As AI interaction patterns evolve, product designers must pioneer clear, explainable, human-in-the-loop interfaces that empower users while maintaining transparency."
    ],
    keyTakeaways: [
      "Use AI to accelerate synthesis and ideation",
      "Maintain human judgment for strategy and craft",
      "Design transparent, explainable AI interfaces"
    ]
  }
];

function Writing() {
  const [activeEssay, setActiveEssay] = useState<Essay | null>(null);
  const reduced = useReducedMotion();

  return (
    <PageShell
      eyebrow="CHAPTER 05 · WRITING & ESSAYS"
      title="On calm software, systems, & product craft."
      description="Curated editorial essays exploring product design methodology, design system architecture, and cross-functional engineering collaboration."
    >
      <div className="relative mt-12 space-y-20">

        {/* ── ESSAYS EDITORIAL INDEX GRID ── */}
        <Stagger className="space-y-6" stagger={0.1}>
          {ESSAYS.map((essay) => (
            <motion.article
              key={essay.slug}
              variants={staggerItem}
              whileHover={reduced ? undefined : { y: -2 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveEssay(essay)}
              className="group cursor-pointer rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-8 md:p-10 transition-all duration-300 hover:border-accent/40 hover:bg-surface/30 hover:shadow-[var(--shadow-float)]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/20 pb-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-accent">{essay.num}</span>
                  <span className="h-3 w-px bg-border/40" />
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/30 bg-surface/30 px-3 py-1 text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                    <Tag className="h-2.5 w-2.5 text-accent" />
                    {essay.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground/70">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3 text-accent/80" />
                    {essay.readTime}
                  </span>
                  <span>&middot;</span>
                  <span>{essay.date}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="font-display text-2xl md:text-3xl font-light text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                  {essay.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-light max-w-3xl">
                  {essay.excerpt}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/20 pt-5">
                <div className="flex flex-wrap gap-2">
                  {essay.keyTakeaways.map((takeaway) => (
                    <span
                      key={takeaway}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border/30 bg-background/30 px-2.5 py-1 text-[11px] font-mono text-muted-foreground/80"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent/50" />
                      {takeaway}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-mono text-accent group-hover:underline">
                  Read Essay
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </Stagger>

        {/* ── ESSAY READING DRAWER / OVERLAY MODAL ── */}
        {activeEssay && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-xl animate-in fade-in duration-200"
            onClick={() => setActiveEssay(null)}
          >
            <div
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border/40 bg-surface/90 backdrop-blur-2xl p-8 sm:p-12 space-y-8 shadow-[var(--shadow-premium)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border/20 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-accent">{activeEssay.num}</span>
                  <span className="text-xs font-mono text-muted-foreground/80">{activeEssay.category}</span>
                </div>
                <button
                  onClick={() => setActiveEssay(null)}
                  className="rounded-full border border-border/40 px-4 py-1 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-accent/40"
                >
                  Close [ESC]
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="font-display text-3xl sm:text-4xl text-foreground font-light tracking-tight leading-tight">
                  {activeEssay.title}
                </h2>
                <div className="flex items-center gap-3 text-xs font-mono text-accent/90">
                  <span>{activeEssay.date}</span>
                  <span>&middot;</span>
                  <span>{activeEssay.readTime}</span>
                </div>
              </div>

              <div className="space-y-6 text-sm sm:text-base leading-relaxed text-muted-foreground font-light border-t border-border/20 pt-6">
                {activeEssay.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="border-t border-border/20 pt-6 space-y-3">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-accent font-semibold block">
                  KEY TAKEAWAYS
                </span>
                <ul className="space-y-2">
                  {activeEssay.keyTakeaways.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-xs font-mono text-foreground/90">
                      <Sparkles className="h-3 w-3 text-accent shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </PageShell>
  );
}
