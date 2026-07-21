import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Terminal, Code2, Layers, Cpu, Compass, Sliders, Play, RotateCcw } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Reveal, Stagger, staggerItem } from "@/components/reveal";
import { useState } from "react";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Experimental Lab & Playground — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Interactive micro-interactions, visual UI explorations, design system experiments, and motion prototypes by Gopi Neeraj Kumar.",
      },
      { property: "og:title", content: "Experimental Lab & Playground — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Interactive micro-interactions, visual UI explorations, design system experiments, and motion prototypes by Gopi Neeraj Kumar.",
      },
    ],
  }),
  component: Playground,
});

type Experiment = {
  num: string;
  title: string;
  category: string;
  description: string;
  component: React.ReactNode;
};

function FinancialDataExplorer() {
  const [activeTab, setActiveTab] = useState<"1D" | "1W" | "1M" | "1Y">("1M");
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  return (
    <div className="space-y-4 rounded-2xl border border-border/40 bg-surface/30 p-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-accent font-semibold block">
            PORTFOLIO VALUE
          </span>
          <div className="text-2xl font-display font-light text-foreground mt-1">
            {hoveredValue ?? "$142,850.00"}
          </div>
        </div>
        <div className="flex gap-1 rounded-full border border-border/40 bg-background/40 p-1 font-mono text-[10px]">
          {(["1D", "1W", "1M", "1Y"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`rounded-full px-2.5 py-0.5 transition-colors ${
                activeTab === t ? "bg-accent text-accent-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Sparkline Simulation */}
      <div className="h-28 w-full flex items-end gap-1.5 pt-4">
        {[40, 55, 35, 70, 65, 85, 60, 90, 75, 95, 80, 100].map((h, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredValue(`$${(130000 + h * 200).toLocaleString()}.00`)}
            onMouseLeave={() => setHoveredValue(null)}
            className="flex-1 rounded-t bg-accent/20 hover:bg-accent transition-all duration-200 group relative cursor-pointer"
            style={{ height: `${h}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-mono text-[8px] text-accent font-semibold transition-opacity pointer-events-none">
              {h}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommandPaletteTester() {
  const [activeShortcut, setActiveShortcut] = useState<string | null>(null);

  const shortcuts = [
    { keys: "G H", label: "Navigate to Home" },
    { keys: "G P", label: "Navigate to Projects" },
    { keys: "G S", label: "Navigate to System" },
    { keys: "⌘ K", label: "Open Command Modal" },
  ];

  return (
    <div className="space-y-4 rounded-2xl border border-border/40 bg-surface/30 p-6">
      <div className="text-xs font-mono text-muted-foreground font-light">
        Test keyboard chord triggers:
      </div>
      <div className="grid grid-cols-2 gap-3">
        {shortcuts.map((s) => (
          <button
            key={s.keys}
            onClick={() => setActiveShortcut(s.label)}
            className={`flex items-center justify-between rounded-xl border p-3 font-mono text-xs transition-all ${
              activeShortcut === s.label
                ? "border-accent bg-accent/10 text-accent"
                : "border-border/30 bg-background/20 text-muted-foreground hover:border-accent/40 hover:text-foreground"
            }`}
          >
            <span>{s.label}</span>
            <kbd className="rounded border border-border/50 bg-background/60 px-1.5 py-0.5 text-[9px] font-mono text-accent">
              {s.keys}
            </kbd>
          </button>
        ))}
      </div>
      {activeShortcut && (
        <div className="text-xs font-mono text-accent flex items-center gap-1.5 pt-1">
          <Sparkles className="h-3 w-3" />
          Triggered: {activeShortcut}
        </div>
      )}
    </div>
  );
}

function GlassPillDynamics() {
  const [blurVal, setBlurVal] = useState(24);
  const [opacityVal, setOpacityVal] = useState(55);

  return (
    <div className="space-y-5 rounded-2xl border border-border/40 bg-surface/30 p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">Adjust backdrop blur & opacity</span>
        <button
          onClick={() => {
            setBlurVal(24);
            setOpacityVal(55);
          }}
          className="text-[10px] font-mono text-accent flex items-center gap-1 hover:underline"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <label>Blur ({blurVal}px)</label>
          <input
            type="range"
            min="4"
            max="40"
            value={blurVal}
            onChange={(e) => setBlurVal(Number(e.target.value))}
            className="w-32 accent-accent cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between text-xs font-mono">
          <label>Opacity ({opacityVal}%)</label>
          <input
            type="range"
            min="10"
            max="95"
            value={opacityVal}
            onChange={(e) => setOpacityVal(Number(e.target.value))}
            className="w-32 accent-accent cursor-pointer"
          />
        </div>
      </div>

      {/* Live Preview Box */}
      <div
        className="rounded-2xl border border-border/30 p-5 text-center font-display text-sm text-foreground transition-all"
        style={{
          backdropFilter: `blur(${blurVal}px)`,
          backgroundColor: `rgba(30, 33, 37, ${opacityVal / 100})`,
        }}
      >
        Illuminated Glass Capsule Preview
      </div>
    </div>
  );
}

function Playground() {
  const reduced = useReducedMotion();

  const EXPERIMENTS: Experiment[] = [
    {
      num: "01",
      title: "Financial Data Density Canvas",
      category: "UI Architecture",
      description: "Interactive dark mode data visualization card with sparkline dynamics and responsive time-range toggles.",
      component: <FinancialDataExplorer />,
    },
    {
      num: "02",
      title: "Linear-Inspired Command Hotkeys",
      category: "Interaction Design",
      description: "Keyboard chord triggers and shortcut palette interactive simulator.",
      component: <CommandPaletteTester />,
    },
    {
      num: "03",
      title: "Atmospheric Glass Pill Dynamics",
      category: "Design System",
      description: "Real-time backdrop-blur and luminance opacity controller for elevated glass panels.",
      component: <GlassPillDynamics />,
    },
  ];

  return (
    <PageShell
      eyebrow="CHAPTER 07 · EXPERIMENTAL LAB"
      title="Micro-interactions & visual explorations."
      description="A playground of interactive prototypes, UI concepts, design token controllers, and motion dynamics."
    >
      <div className="relative mt-12 space-y-16">

        {/* ── EXPERIMENTS GRID ── */}
        <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-8" stagger={0.1}>
          {EXPERIMENTS.map((exp) => (
            <motion.div
              key={exp.num}
              variants={staggerItem}
              whileHover={reduced ? undefined : { y: -3 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-7 md:p-8 space-y-6 flex flex-col justify-between hover:border-accent/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border/20 pb-4">
                  <span className="font-mono text-xs font-semibold text-accent">{exp.num}</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
                    {exp.category}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-foreground font-light tracking-tight">
                  {exp.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground font-light">
                  {exp.description}
                </p>
              </div>

              {/* Interactive Widget Container */}
              <div className="pt-2">
                {exp.component}
              </div>
            </motion.div>
          ))}
        </Stagger>

        {/* ── LAB FOOTER STATEMENT ── */}
        <Reveal className="border-t border-border/20 pt-12 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-accent">
            <Terminal className="h-4 w-4" />
            <span>MORE EXPERIMENTS COMING SOON</span>
          </div>
          <p className="text-xs text-muted-foreground font-light max-w-md mx-auto">
            These interactive prototypes test component ideas before integration into full production case studies.
          </p>
        </Reveal>

      </div>
    </PageShell>
  );
}
