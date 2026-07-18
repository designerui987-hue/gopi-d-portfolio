import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  Search,
  Sparkles,
  Home,
  Layers,
  Workflow,
  Palette,
  User,
  Mail,
  Circle,
  Copy,
  CheckCircle2,
  Lock,
  Eye,
  Sliders,
  Maximize2,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design System Spec — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Production design system documentation: color tokens, typography scale, 8pt grid, 12-column layout, motion specs, accessibility compliance, and live interactive UI components.",
      },
      { property: "og:title", content: "Design System Spec — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Production design system documentation: color tokens, typography scale, 8pt grid, 12-column layout, motion specs, accessibility compliance, and live interactive UI components.",
      },
    ],
  }),
  component: DesignSystem,
});

const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

/* ---------------- Section Primitive ---------------- */
function SystemSection({
  id,
  index,
  label,
  title,
  description,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-24 scroll-mt-28 first:mt-0">
      <div className="mb-4 flex items-center gap-3 border-b border-border/40 pb-4">
        <span className="font-mono text-xs text-accent font-semibold">{index}</span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
          {label}
        </span>
      </div>
      <h2 className="max-w-3xl font-display text-3xl md:text-4xl text-foreground font-light tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground font-light">
          {description}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </section>
  );
}

/* ---------------- 1. Color Tokens ---------------- */
const colorTokens = [
  { name: "Canvas", varName: "--background", role: "Root canvas background", value: "oklch(0.14 0.01 60)" },
  { name: "Surface", varName: "--surface", role: "Card & container surfaces", value: "oklch(0.18 0.01 60 / 0.4)" },
  { name: "Border", varName: "--border", role: "Dividers, outlines & grids", value: "oklch(0.30 0.01 60 / 0.4)" },
  { name: "Primary", varName: "--primary", role: "Primary text & key controls", value: "oklch(0.95 0.01 60)" },
  { name: "Secondary", varName: "--secondary", role: "Subtle interactive fills", value: "oklch(0.22 0.01 60)" },
  { name: "Accent", varName: "--accent", role: "Warm gold focus & indicators", value: "oklch(0.82 0.12 75)" },
];

function ColorTokenCard({ token }: { token: (typeof colorTokens)[number] }) {
  const [copied, setCopied] = useState(false);

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(`${token.varName}: ${token.value}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* fallback */
    }
  };

  return (
    <motion.div
      onClick={copyToken}
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/40 bg-surface/30 backdrop-blur-md p-4 transition-colors hover:border-accent/40"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="h-8 w-12 rounded-lg border border-border/60" style={{ background: `var(${token.varName})` }} />
        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
          {token.varName}
        </span>
      </div>
      <div className="font-display text-lg text-foreground font-medium">{token.name}</div>
      <div className="mt-1 text-xs text-muted-foreground font-light">{token.role}</div>
      <div className="mt-4 flex items-center justify-between border-t border-border/20 pt-3 text-[10px] font-mono text-muted-foreground/60">
        <span>{token.value}</span>
        {copied ? (
          <span className="text-accent font-semibold flex items-center gap-1">
            <Check className="h-3 w-3" /> Copied
          </span>
        ) : (
          <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- 2. Typography Scale ---------------- */
const typeScale = [
  {
    role: "Display",
    sample: "Designing calm digital systems.",
    spec: "Fraunces · 4.5rem (72px) / Line-height 1.02 / -0.04em",
    cls: "font-display text-5xl md:text-7xl leading-[1.02] tracking-tight text-accent",
  },
  {
    role: "Heading",
    sample: "Modular design tokens in production.",
    spec: "Fraunces · 2.5rem (40px) / Line-height 1.1 / -0.03em",
    cls: "font-display text-3xl md:text-4xl leading-tight text-foreground",
  },
  {
    role: "Section",
    sample: "Consistent spacing and layout rhythm.",
    spec: "Fraunces · 1.5rem (24px) / Line-height 1.3 / -0.02em",
    cls: "font-display text-xl md:text-2xl text-foreground font-light",
  },
  {
    role: "Body",
    sample: "Every decision starts with understanding the problem and testing structure early.",
    spec: "Inter · 1.0rem (16px) / Line-height 1.75 / Normal tracking",
    cls: "text-base leading-relaxed text-muted-foreground font-light",
  },
  {
    role: "Caption",
    sample: "TOKEN_SPEC_V2.4 // WCAG_AA_COMPLIANT",
    spec: "Inter · 0.75rem (12px) / Line-height 2.0 / 0.25em tracking",
    cls: "text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/70",
  },
];

/* ---------------- 3. Spacing System ---------------- */
const spacingTokens = [
  { label: "8px", token: "space-2", rem: "0.5rem", use: "Tight component gaps & micro padding" },
  { label: "16px", token: "space-4", rem: "1.0rem", use: "Card inner padding & control spacing" },
  { label: "24px", token: "space-6", rem: "1.5rem", use: "Container gaps & section rhythm" },
  { label: "32px", token: "space-8", rem: "2.0rem", use: "Grid row gaps & header offsets" },
  { label: "40px", token: "space-10", rem: "2.5rem", use: "Major block separation" },
  { label: "48px", token: "space-12", rem: "3.0rem", use: "Section padding & hero offsets" },
  { label: "64px", token: "space-16", rem: "4.0rem", use: "Chapter breaks & page flow rhythm" },
];

/* ---------------- 4. Motion Tokens ---------------- */
const motionTokens = [
  { name: "Hover Response", duration: "0.2s / 200ms", easing: "cubic-bezier(0.16, 1, 0.3, 1)", use: "Buttons, cards, interactive pills" },
  { name: "Viewport Reveal", duration: "0.6s / 600ms", easing: "cubic-bezier(0.16, 1, 0.3, 1)", use: "Section scroll entrances & fade-ups" },
  { name: "Page Transition", duration: "0.4s / 400ms", easing: "cubic-bezier(0.16, 1, 0.3, 1)", use: "Route switching & container layout shifts" },
];

/* ---------------- Main Page Component ---------------- */
function DesignSystem() {
  const [activeTab, setActiveTab] = useState<"primary" | "secondary" | "ghost">("primary");
  const [activeSpacing, setActiveSpacing] = useState<number | null>(null);
  const [activeGridCol, setActiveGridCol] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <PageShell
      eyebrow="PRODUCT DESIGN SPECIFICATION"
      title="Design system."
      description="Great products are built on shared systems, not fragmented screens. Below is the production token architecture, type scale, spacing matrix, and live component library powering this portfolio."
    >
      {/* Table of Contents Header Pill */}
      <nav aria-label="System navigation" className="mb-16 flex flex-wrap gap-2 pt-4 border-t border-border/20">
        {[
          ["intro", "Intro"],
          ["colors", "Color Tokens"],
          ["typography", "Typography"],
          ["spacing", "Spacing"],
          ["grid", "Grid"],
          ["motion", "Motion"],
          ["accessibility", "Accessibility"],
          ["components", "Components"],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-full border border-border/40 bg-surface/30 px-4 py-1.5 text-xs font-mono tracking-wider text-muted-foreground transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* 1. Intro Statement */}
      <SystemSection
        id="intro"
        index="01"
        label="PHILOSOPHY"
        title="Scalable systems over isolated screens."
        description="Software scales when rules are explicit. This system establishes strict tokenized boundaries so every interface remains calm, readable, and cohesive as features expand."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "01 · Modular Architecture", desc: "Tokens serve as single sources of truth, linking CSS variables directly to component specs." },
            { title: "02 · Mathematical Rhythm", desc: "An 8-point spacing grid enforces vertical and horizontal rhythm across all viewports." },
            { title: "03 · Accessible Contrast", desc: "Color tokens are tuned to exceed WCAG AA standards, ensuring clarity for all users." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/30 bg-surface/20 p-6 backdrop-blur-sm">
              <div className="font-mono text-xs text-accent mb-2">{item.title}</div>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </SystemSection>

      {/* 2. Color Tokens */}
      <SystemSection
        id="colors"
        index="02"
        label="COLOR TOKENS"
        title="Production design tokens."
        description="Click any swatch to copy its production CSS variable and value."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {colorTokens.map((t) => (
            <ColorTokenCard key={t.varName} token={t} />
          ))}
        </div>
      </SystemSection>

      {/* 3. Typography Scale */}
      <SystemSection
        id="typography"
        index="03"
        label="TYPOGRAPHY SCALE"
        title="Complete type hierarchy."
        description="Fraunces display serif paired with Inter sans. Tuned for editorial contrast and technical readability."
      >
        <div className="divide-y divide-border/30 overflow-hidden rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md">
          {typeScale.map((t) => (
            <div
              key={t.role}
              className="group p-6 md:p-8 transition-colors hover:bg-surface/40 flex flex-col md:flex-row md:items-baseline justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent">
                  {t.role}
                </div>
                <div className={t.cls}>{t.sample}</div>
              </div>
              <div className="shrink-0 text-right text-[11px] font-mono text-muted-foreground/70">
                {t.spec}
              </div>
            </div>
          ))}
        </div>
      </SystemSection>

      {/* 4. Spacing System */}
      <SystemSection
        id="spacing"
        index="04"
        label="SPACING SYSTEM"
        title="The 8-point spatial grid."
        description="Hover over any spacing token to inspect its visual measurement bar."
      >
        <div className="rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-6 md:p-8 space-y-4">
          {spacingTokens.map((s, idx) => (
            <div
              key={s.label}
              onMouseEnter={() => setActiveSpacing(idx)}
              onMouseLeave={() => setActiveSpacing(null)}
              className={cn(
                "flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl transition-colors cursor-crosshair",
                activeSpacing === idx ? "bg-surface/50 border border-accent/30" : "border border-transparent"
              )}
            >
              <div className="flex items-center gap-4 w-48">
                <span className="font-mono text-xs font-semibold text-accent">{s.label}</span>
                <span className="font-mono text-[10px] text-muted-foreground/60">{s.token} ({s.rem})</span>
              </div>
              
              <div className="flex-1 my-2 sm:my-0 sm:mx-6">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-accent/70 to-accent transition-all duration-300"
                  style={{ width: `${parseInt(s.label) * 4}px` }}
                />
              </div>
              
              <span className="text-xs text-muted-foreground font-light text-right">{s.use}</span>
            </div>
          ))}
        </div>
      </SystemSection>

      {/* 5. Responsive 12-Column Grid */}
      <SystemSection
        id="grid"
        index="05"
        label="GRID ARCHITECTURE"
        title="Responsive 12-column grid."
        description="Hover over columns to inspect fluid grid spans and column index offsets."
      >
        <div className="rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-6 md:p-8">
          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveGridCol(i + 1)}
                onMouseLeave={() => setActiveGridCol(null)}
                className={cn(
                  "h-24 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer",
                  activeGridCol === i + 1
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-border/40 bg-surface/30 text-muted-foreground hover:border-accent/40"
                )}
              >
                <span className="font-mono text-xs font-semibold">0{i + 1}</span>
                <span className="text-[8px] font-mono opacity-60">COL</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-mono text-muted-foreground/60">
            <span>GRID_COLUMNS: 12</span>
            <span>GUTTER: 16PX</span>
            <span>MARGIN: RESPONSIVE</span>
          </div>
        </div>
      </SystemSection>

      {/* 6. Motion Tokens */}
      <SystemSection
        id="motion"
        index="06"
        label="MOTION TOKENS"
        title="Animation duration &amp; easing philosophy."
        description="Motion communicates intent, not decoration. Built on a single custom cubic-bezier curve."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {motionTokens.map((m) => (
            <div key={m.name} className="rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-6 space-y-4">
              <div className="text-xs font-mono text-accent font-semibold">{m.name}</div>
              <div className="font-display text-2xl text-foreground">{m.duration}</div>
              <div className="font-mono text-[10px] text-muted-foreground/80 bg-background/50 p-2 rounded-lg border border-border/30">
                {m.easing}
              </div>
              <p className="text-xs text-muted-foreground font-light">{m.use}</p>
            </div>
          ))}
        </div>
      </SystemSection>

      {/* 7. Accessibility Standards */}
      <SystemSection
        id="accessibility"
        index="07"
        label="ACCESSIBILITY STANDARDS"
        title="Inclusive by design."
        description="Accessibility is a core requirement of product craftsmanship, built directly into every token and component."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "WCAG AA Contrast", desc: "All text-to-background contrast ratios exceed 4.5:1." },
            { title: "Keyboard Navigation", desc: "Full focus ring visibility & logical tab order." },
            { title: "Reduced Motion", desc: "Disables non-essential movement via prefers-reduced-motion." },
            { title: "Semantic HTML", desc: "Built with standard HTML5 landmarks (<nav>, <main>, <article>)." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/30 bg-surface/20 p-5">
              <ShieldCheck className="h-5 w-5 text-accent mb-3" />
              <div className="font-display text-base text-foreground mb-1">{item.title}</div>
              <div className="text-xs text-muted-foreground font-light leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </SystemSection>

      {/* 8. Component Preview */}
      <SystemSection
        id="components"
        index="08"
        label="COMPONENT SPEC PREVIEW"
        title="Live interactive UI components."
        description="Test live interactive states for production buttons, badges, inputs, and cards."
      >
        <div className="space-y-8 rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-8">
          
          {/* Buttons Preview */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono text-accent uppercase tracking-widest">Buttons</div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:scale-[1.02] shadow-[0_4px_20px_rgb(220,120,80,0.2)]"
              >
                Primary Button
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/30 px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-accent/40 hover:bg-surface/50 hover:scale-[1.02]"
              >
                Secondary Button
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface/30"
              >
                Ghost Action
              </button>
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 rounded-full bg-surface/20 border border-border/20 px-5 py-3 text-sm font-medium text-muted-foreground/40 cursor-not-allowed"
              >
                Disabled
              </button>
            </div>
          </div>

          {/* Badges & Tags Preview */}
          <div className="space-y-3 pt-6 border-t border-border/20">
            <div className="text-[10px] font-mono text-accent uppercase tracking-widest">Badges &amp; Tags</div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <Sparkles className="h-3 w-3" /> Production Spec
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-surface/30 px-3 py-1 text-xs font-medium text-foreground">
                <CheckCircle2 className="h-3 w-3 text-accent" /> WCAG AA
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-surface/20 px-3 py-1 text-xs font-mono text-muted-foreground">
                SYSTEM_V2.4
              </span>
            </div>
          </div>

          {/* Form Control Preview */}
          <div className="space-y-3 pt-6 border-t border-border/20">
            <div className="text-[10px] font-mono text-accent uppercase tracking-widest">Form Controls</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-2">SYSTEM_SEARCH_INPUT</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search design tokens…"
                    className="w-full rounded-xl border border-border/40 bg-background/50 py-3 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </SystemSection>
    </PageShell>
  );
}
