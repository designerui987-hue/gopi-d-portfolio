import { createFileRoute } from "@tanstack/react-router";
import {
  FileDown,
  Linkedin,
  Layers,
  Workflow,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { motion, useReducedMotion } from "framer-motion";

const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;
const LINKEDIN_URL = "https://www.linkedin.com/in/neeraj-kumar-gopi-b09391331";
const RESUME_URL = "/neeraj_ui_ux_resume_updaetd_v1_7148.pdf";

/* ── Chapter primitive ── */
function ChapterHeader({
  n,
  label,
  title,
}: {
  n: string;
  label: string;
  title: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-accent font-semibold">{n}</span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
          {label}
        </span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground leading-[1.1]">
        {title}
      </h2>
    </div>
  );
}

/* ── Toolkit Group Card ── */
function ToolGroupCard({
  n,
  label,
  tools,
}: {
  n: string;
  label: string;
  tools: string[];
}) {
  return (
    <div className="rounded-3xl border border-border/30 bg-surface/20 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-accent">{n}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tools.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border/40 bg-background/40 px-3 py-1.5 text-[10px] font-mono text-muted-foreground/80 hover:border-accent/30 hover:text-foreground transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Route ── */
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Manifesto — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Personal manifesto of UI/UX designer Gopi Neeraj Kumar — sharing beliefs, design principles, journey, and technical tools.",
      },
      { property: "og:title", content: "About & Manifesto — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Personal manifesto of UI/UX designer Gopi Neeraj Kumar — sharing beliefs, design principles, journey, and technical tools.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const reduced = useReducedMotion();

  return (
    <PageShell
      eyebrow="PERSONAL MANIFESTO"
      title="Quiet interfaces, systemic thinking."
      description="A document on digital product design, personal beliefs, and learning in public as an early-career designer."
    >
      <div className="relative mt-20 space-y-36">

        {/* ── CHAPTER 01: The Statement ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-border/20">
          <div className="lg:col-span-5">
            <ChapterHeader n="01" label="THE STATEMENT" title="A manifesto for quiet software." />
          </div>
          <div className="lg:col-span-7 space-y-6 text-base leading-[1.8] text-muted-foreground font-light">
            <p>
              I became a product designer because software often feels cluttered and chaotic. Clashing layouts, unnecessary alerts, and decorative animations waste human attention.
            </p>
            <p className="text-foreground">
              My focus is stripping away noise until only clarity remains. I value layout logic, clear system typography, and strict spacing structures over temporary design trends.
            </p>
          </div>
        </section>

        {/* ── CHAPTER 02: Current Mission ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-border/20">
          <div className="lg:col-span-5 lg:order-2">
            <ChapterHeader n="02" label="THE MISSION" title="Predictability is speed." />
          </div>
          <div className="lg:col-span-7 lg:order-1 space-y-6 text-base leading-[1.8] text-muted-foreground font-light">
            <p>
              I design interfaces so that users do not have to learn how a button, filter, or input field works twice. When layouts are predictable, tasks feel effortless.
            </p>
            <p>
              With one year of full-time product experience, I focus on translating complex requirements into clean, structured component matrices. I design systems, not screens.
            </p>
          </div>
        </section>

        {/* ── CHAPTER 03: Journey ── */}
        <section className="space-y-12 border-t border-border/20 pt-16">
          <ChapterHeader n="03" label="THE JOURNEY" title="Documenting shipped foundations." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-border/30 bg-surface/20 p-8 space-y-6">
              <div className="flex items-center gap-2 text-accent">
                <Workflow className="h-4 w-4" />
                <span className="font-mono text-xs font-semibold tracking-wider">
                  01 · ENTERPRISE DESIGN (2025–2026)
                </span>
              </div>
              <h3 className="font-display text-2xl text-foreground font-light">
                Internal HRMS Platform
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Designed payroll modules, checklist builders, attendance sheets, and configuration tools end-to-end. Translating high complexity into structured flows taught me the value of component alignment and clear developer handoff.
              </p>
            </div>

            <div className="rounded-3xl border border-border/30 bg-surface/20 p-8 space-y-6">
              <div className="flex items-center gap-2 text-accent">
                <Layers className="h-4 w-4" />
                <span className="font-mono text-xs font-semibold tracking-wider">
                  02 · FINTECH PROTOTYPE (2026)
                </span>
              </div>
              <h3 className="font-display text-2xl text-foreground font-light">
                Nova Stock Analytics
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Designed and built a calm stock tracking system as a personal design-to-code prototype. Replaced confusing trading charts with plain-language recommendation blocks, deepening my frontend layout skills.
              </p>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 04: Design Principles ── */}
        <section className="space-y-12 border-t border-border/20 pt-16">
          <div className="text-right max-w-xl ml-auto">
            <ChapterHeader n="04" label="THE VALUES" title="Decisions over decoration." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                t: "Clarity over novelty",
                d: "Aesthetics must serve layout logic. If a design element doesn't help users complete a task or understand data, it should be removed.",
              },
              {
                t: "Systems, not screens",
                d: "Isolated layouts break under pressure. Every component is designed to map directly to shared spacing rules and design system tokens.",
              },
              {
                t: "Honest simplicity",
                d: "No flashing animations, no dark patterns, and no layout tricks. Clean hierarchy, high-contrast text, and respect for user focus.",
              },
            ].map((principle, idx) => (
              <motion.div
                key={principle.t}
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: EASE_EDITORIAL,
                }}
                className="rounded-3xl border border-border/30 bg-surface/10 p-6 space-y-3"
              >
                <div className="font-display text-xl text-foreground font-light">
                  {principle.t}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  {principle.d}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CHAPTER 05: Current Toolkit ── */}
        <section className="space-y-12 border-t border-border/20 pt-16">
          <ChapterHeader n="05" label="THE STACK" title="Tools for building & handoff." />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ToolGroupCard
              n="01"
              label="DESIGN"
              tools={[
                "Figma",
                "FigJam",
                "Component systems",
                "Token architecture",
                "Responsive layout matrices",
              ]}
            />
            <ToolGroupCard
              n="02"
              label="DEVELOPMENT"
              tools={[
                "TypeScript",
                "React",
                "TanStack Router",
                "Framer Motion",
                "Tailwind CSS",
                "Vite",
              ]}
            />
            <ToolGroupCard
              n="03"
              label="RAPID PROTOTYPING"
              tools={[
                "Lovable",
                "AI-assisted UI staging",
                "Figma to code handoff logs",
              ]}
            />
          </div>
        </section>

        {/* ── CHAPTER 06: Currently Learning ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-border/20">
          <div className="lg:col-span-5">
            <ChapterHeader n="06" label="THE HORIZON" title="Active areas of growth." />
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {[
                {
                  title: "Advanced Design Tokens",
                  desc: "Mapping design variables across theme scopes (light/dark) using strict W3C token standards.",
                },
                {
                  title: "Frontend Performance Specs",
                  desc: "Studying browser rendering paths, CSS transitions, and layout paint shifts to write faster UI code.",
                },
                {
                  title: "WCAG 2.2 Standards",
                  desc: "Deepening my knowledge of screen-reader landmarks, focus locks, and structural markup compliance.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 items-start border-b border-border/25 pb-4 last:border-b-0"
                >
                  <Compass className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHAPTER 07: Closing Manifesto ── */}
        <section className="border-t border-border/25 pt-20 max-w-2xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/[0.06] text-[9px] font-mono text-accent uppercase tracking-widest mx-auto">
            <ShieldCheck className="h-3.5 w-3.5" />
            READY TO COLLABORATE
          </div>

          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-[1.1]">
              Quiet curiosity. <br />
              <span className="text-muted-foreground">Ready to design.</span>
            </h2>
          </Reveal>

          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed font-light">
            I am currently looking for roles where I can contribute to shipping clear interfaces and learn alongside experienced product teams.
          </p>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-border/40 bg-surface/30 px-7 py-4 text-sm font-medium text-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-surface/50 hover:text-accent hover:border-accent/30 shadow-[var(--shadow-soft)]"
              >
                <Linkedin className="h-4 w-4 text-accent" strokeWidth={1.75} />
                LinkedIn
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(220,120,80,0.22)]"
              >
                <FileDown className="h-4 w-4" strokeWidth={1.75} />
                Resume PDF
              </a>
            </div>
          </Reveal>
        </section>

      </div>
    </PageShell>
  );
}
