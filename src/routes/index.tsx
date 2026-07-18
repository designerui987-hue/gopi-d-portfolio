import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Workflow, Palette, User, Mail, FileDown, Linkedin, Layers, Box, Cpu, Sparkles } from "lucide-react";
import { PlaceholderCard } from "@/components/page-shell";
import { SectionHeader } from "@/components/section-header";
import { Stagger, staggerItem, Reveal } from "@/components/reveal";
import { HeroScene } from "@/components/hero-scene";
import { StatsScrollReveal } from "@/components/stats-scroll-reveal";
import { Magnetic } from "@/components/magnetic";
import { GsapHeadline } from "@/components/gsap-headline";

/* ─── Shared premium easing curve ─── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ─── Fade-up animation wrapper ─── */
function FadeUp({
  children,
  delay = 0,
  className,
  y = 22,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y, filter: reduced ? "blur(0px)" : "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── CHAPTER 02: Architectural Blueprint Visual Composition ─── */
function ProjectsRebuildingEditorial() {
  const reduced = useReducedMotion();

  return (
    <section className="relative w-full py-16 md:py-24">
      {/* Chapter Label */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold">
          CHAPTER 01 · SYSTEM IN REFACTOR
        </span>
        <span className="h-px w-16 bg-accent/40 rounded-full" />
      </div>

      {/* Asymmetrical 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column (5 Cols): Editorial Announcement Text */}
        <div className="lg:col-span-5 space-y-8 text-left">
          
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-accent"
          >
            <span className="relative flex h-1.5 w-1.5">
              {!reduced && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              )}
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            Active Refactor Stage
          </motion.div>

          {/* Heading */}
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.92] tracking-tight text-foreground font-light">
              Projects are being <br />
              <span className="text-accent italic font-normal">rebuilt.</span>
            </h2>
          </Reveal>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2 }}
            className="text-base md:text-lg leading-[1.8] text-muted-foreground font-light"
          >
            I’m currently redesigning this portfolio with deeper case studies, stronger visuals, and a more immersive experience.
          </motion.p>

          {/* Footnote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="pt-4 border-t border-border/25 flex items-center justify-between"
          >
            <span className="text-xs text-muted-foreground/60 font-mono tracking-wider">
              EST. COMPLETION · SOON
            </span>
            <span className="text-xs text-accent font-medium tracking-wide">
              New work will be added soon.
            </span>
          </motion.div>

          {/* Technical Metadata Node */}
          <div className="grid grid-cols-2 gap-4 pt-2 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
            <div>FRAMEWORK: TANSTACK START</div>
            <div>STATUS: SHIPPED V2.4</div>
          </div>
        </div>

        {/* Right Column (7 Cols): Abstract Blueprint & Component Architecture Canvas */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-surface/25 backdrop-blur-xl p-6 md:p-8 shadow-[var(--shadow-soft)]">
              
              {/* Background Blueprint Grid */}
              <div className="absolute inset-0 grid-bg opacity-[0.18] pointer-events-none" />
              
              {/* Top Bar Architectural Details */}
              <div className="relative z-10 flex items-center justify-between border-b border-border/30 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-accent/80" />
                  <span>CANVAS // 01_CASE_STUDY_FRAMEWORK</span>
                </div>
                <div className="text-[10px] font-mono text-accent/70 tracking-widest uppercase">
                  [ 1440 × 900 ]
                </div>
              </div>

              {/* Architectural Component Tree & Token Visualization */}
              <div className="relative z-10 space-y-6">
                
                {/* Visual Wireframe Block 1 - Hero Case Study Bounds */}
                <div className="group relative rounded-2xl border border-dashed border-accent/40 bg-surface/30 p-5 transition-colors duration-500 hover:border-accent/70">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest flex items-center gap-1.5">
                      <Layers className="h-3 w-3" />
                      Hero Module Spec
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground/60">
                      DISPLAY_SCALE: OKLCH(0.82 0.12 75)
                    </span>
                  </div>
                  <div className="h-12 w-full rounded-lg bg-border/25 flex items-center px-4 justify-between overflow-hidden">
                    <div className="h-2.5 w-1/3 bg-accent/40 rounded" />
                    <div className="flex gap-2">
                      <div className="h-2.5 w-12 bg-border/60 rounded" />
                      <div className="h-2.5 w-8 bg-accent/60 rounded" />
                    </div>
                  </div>
                </div>

                {/* Visual Wireframe Block 2 - Split Component Nodes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Token Box 1 */}
                  <div className="rounded-2xl border border-border/30 bg-surface/40 p-4 relative overflow-hidden">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Box className="h-3 w-3 text-accent" />
                        Card Design System
                      </span>
                      <span>GRID_SPAN: 6</span>
                    </div>
                    <div className="space-y-2 pt-1">
                      <div className="h-2 w-4/5 bg-muted-foreground/30 rounded" />
                      <div className="h-2 w-3/5 bg-accent/30 rounded" />
                    </div>
                  </div>

                  {/* Token Box 2 */}
                  <div className="rounded-2xl border border-border/30 bg-surface/40 p-4 relative overflow-hidden">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Cpu className="h-3 w-3 text-accent" />
                        Framer Physics
                      </span>
                      <span>SPRING: 400</span>
                    </div>
                    <div className="space-y-2 pt-1">
                      <div className="h-2 w-2/3 bg-accent/40 rounded" />
                      <div className="h-2 w-1/2 bg-muted-foreground/30 rounded" />
                    </div>
                  </div>
                </div>

                {/* Design Token Floating Bar */}
                <div className="rounded-xl border border-border/30 bg-background/50 p-3 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
                    <span>TOKENS: OKLCH_DARK</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-background border border-border" />
                    <span className="h-3 w-3 rounded-full bg-surface" />
                    <span className="h-3 w-3 rounded-full bg-accent" />
                  </div>
                </div>

              </div>

              {/* Blueprint Footer Coordinate bar */}
              <div className="relative z-10 mt-6 pt-4 border-t border-border/20 flex justify-between text-[9px] font-mono text-muted-foreground/50">
                <span>X_AXIS: 0.16_EXPO</span>
                <span>STATE: IN_PROGRESS</span>
                <span>MODE: ASYMMETRICAL_CANVAS</span>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

/* ─── Constants ─── */
const LINKEDIN_URL = "https://www.linkedin.com/in/neeraj-kumar-gopi-b09391331";
const BEHANCE_URL = "https://www.behance.net/neerajgopi";
const EMAIL_ADDRESS = "neerajkumar.gopi2025@gmail.com";
const RESUME_URL = "/neeraj_ui_ux_resume_updaetd_v1_7148.pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gopi Neeraj Kumar — UI/UX Designer" },
      {
        name: "description",
        content:
          "Junior UI/UX designer with 1 year of experience — building calm, considered interfaces and learning in public. Currently available for new work.",
      },
      { property: "og:title", content: "Gopi Neeraj Kumar — UI/UX Designer" },
      {
        property: "og:description",
        content:
          "Junior UI/UX designer with 1 year of experience — building calm, considered interfaces and learning in public. Currently available for new work.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <HeroScene>
      {/* ─── SECTION 01: Hero (Left Aligned Cinematic) ─── */}
      <div className="relative h-screen min-h-[680px] w-full flex flex-col justify-center px-6 lg:pl-28 lg:pr-12 overflow-hidden border-b border-border/30">
        <div className="relative z-10 max-w-5xl space-y-0">

          <FadeUp delay={0.15} className="mb-6">
            <span className="inline-flex items-center gap-2.5 text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
              <span className="inline-block h-px w-6 bg-accent/60 rounded-full" />
              UI/UX Designer &amp; Product Developer
              <span className="inline-block h-px w-6 bg-accent/60 rounded-full" />
            </span>
          </FadeUp>

          <GsapHeadline
            text="Designing calm digital experiences."
            className="font-display tracking-tight text-foreground leading-[0.86] text-[clamp(2.8rem,8vw,7.5rem)]"
          />

          <FadeUp delay={1.45} y={18} className="mt-8 max-w-xl">
            <p className="text-base md:text-[1.05rem] leading-[1.75] text-muted-foreground font-light">
              One year into designing digital products. I translate complex
              business logic into clean, simple interface flows.{" "}
              <span className="text-foreground/60">Currently open to junior roles, internships &amp; freelance briefs.</span>
            </p>
          </FadeUp>

          <div className="flex flex-wrap items-center gap-3.5 mt-10">
            <FadeUp delay={1.75} y={14}>
              <Magnetic strength={0.4}>
                <Link
                  to="/contact"
                  data-cursor="talk"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground shadow-[0_4px_24px_rgb(220,120,80,0.18)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgb(220,120,80,0.32)]"
                >
                  Let's talk
                  <motion.span
                    className="inline-flex"
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </Magnetic>
            </FadeUp>

            <FadeUp delay={1.95} y={14}>
              <Magnetic strength={0.25}>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-border/40 px-7 py-4 text-sm font-medium text-muted-foreground bg-surface/20 backdrop-blur-sm transition-all duration-300 hover:text-foreground hover:border-accent/40 hover:bg-surface/40"
                >
                  <Linkedin className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                  LinkedIn
                </a>
              </Magnetic>
            </FadeUp>

            <FadeUp delay={2.1} y={14}>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                <FileDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                Resume
              </a>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ─── Main Content Container ─── */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-32 lg:pl-28 lg:pr-12 pt-20 space-y-36">

        {/* ─── SECTION 02: Key Metrics (Asymmetrical 5-Column Split) ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold block">
              PERFORMANCE &amp; EXPERIENCE
            </span>
            <h3 className="font-display text-3xl font-light text-foreground tracking-tight">
              Metrics by the numbers.
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Production output across full-time design roles, design systems, and shipped interfaces.
            </p>
          </div>
          <div className="lg:col-span-8">
            <StatsScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                ["1 yr", "designing full-time", "Experience", "col-span-1 sm:col-span-2 bg-surface/25 border-accent/20"],
                ["2", "products shipped / designed", "Public Releases", "col-span-1"],
                ["4", "modules designed end-to-end", "Product Focus", "col-span-1"],
                ["Figma + Lovable", "primary toolset", "Tooling Stack", "col-span-1 sm:col-span-2"],
              ].map(([k, v, category, extraClass], i) => (
                <div
                  key={v}
                  className={`relative group rounded-3xl border border-border/30 p-6 overflow-hidden transition-all duration-300 hover:border-accent/40 shadow-[var(--shadow-soft)] ${extraClass}`}
                  data-stat
                >
                  <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity select-none pointer-events-none">
                    <span className="font-display text-8xl font-bold text-accent select-none leading-none">0{i + 1}</span>
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold mb-3">
                    {category}
                  </div>
                  <div className="font-display text-3xl font-light text-foreground tracking-tight mb-2">
                    {k}
                  </div>
                  <div className="text-xs text-muted-foreground leading-normal">{v}</div>
                </div>
              ))}
            </StatsScrollReveal>
          </div>
        </section>

        {/* ─── SECTION 03: Projects Rebuilding Announcement (Asymmetrical Split Editorial) ─── */}
        <ProjectsRebuildingEditorial />

        {/* ─── SECTION 04: Process (Right-Aligned Staggered Flow) ─── */}
        <section className="space-y-12">
          <div className="text-right max-w-xl ml-auto">
            <SectionHeader
              index="02"
              eyebrow="How I work"
              title="Considered loops, solid results."
              description="A practical approach to digital design — understand, sketch, test, refine."
              linkTo="/process"
              linkLabel="See full process"
            />
          </div>
          
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.08}>
            {[
              ["01", "Understand", "Deconstruct the brief. Define real user questions before wireframing.", "md:translate-y-0"],
              ["02", "Sketch", "Ugly, low-fidelity paper wireframes to test structure and flows quickly.", "md:translate-y-8"],
              ["03", "Feedback", "Gather input early from mentors and users to validate layout choices.", "md:translate-y-0"],
              ["04", "Refine", "Figma pixel-polish, design systems mapping, and dev handoff logs.", "md:translate-y-8"],
            ].map(([n, t, d, offsetClass]) => (
              <motion.div
                key={n}
                variants={staggerItem}
                className={`group rounded-3xl border border-border/40 bg-surface/25 backdrop-blur-md p-8 transition-all duration-500 hover:border-accent/30 hover:bg-surface/40 ${offsetClass}`}
              >
                <div className="font-display text-xs text-accent uppercase tracking-widest">{n}</div>
                <div className="mt-4 font-display text-2xl text-foreground font-medium group-hover:text-accent transition-colors duration-300">{t}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                  {d}
                </p>
              </motion.div>
            ))}
          </Stagger>
        </section>

        {/* ─── SECTION 05: Design System Spec (Full-Width Asymmetrical Showcase) ─── */}
        <section className="space-y-12">
          <SectionHeader
            index="03"
            eyebrow="Design system"
            title="Unified rules, balanced layouts."
            description="Tuned colors, consistent typography, and layout rhythm aligned on a strict modular grid."
            linkTo="/design-system"
            linkLabel="Open system spec"
          />

          <Stagger className="grid grid-cols-1 lg:grid-cols-12 gap-8" stagger={0.08}>
            {/* Left Col (7 cols): Typography Spec */}
            <motion.div variants={staggerItem} className="lg:col-span-7">
              <div
                className="h-full rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-md p-8 flex flex-col justify-between hover:border-accent/30 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                    TYPOGRAPHIC HIERARCHY
                  </div>
                  <div className="mt-6 font-display text-5xl md:text-6xl leading-none tracking-tight text-accent">
                    Fraunces
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    Inter Sans · Display Serif Spec
                  </div>
                </div>
                <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                  Editorial voice paired with technical layout clarity. Strict fluid modular type scale matching viewport dimensions.
                </p>
              </div>
            </motion.div>

            {/* Right Col (5 cols): Token Matrix */}
            <motion.div variants={staggerItem} className="lg:col-span-5 space-y-6">
              {/* Palette Card */}
              <div
                className="rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-md p-6 hover:border-accent/30 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Palettes
                </div>
                <div className="mt-5 grid grid-cols-5 gap-2">
                  {[
                    "var(--background)",
                    "var(--secondary)",
                    "var(--muted-foreground)",
                    "var(--primary)",
                    "var(--accent)",
                  ].map((c) => (
                    <div
                      key={c}
                      className="aspect-square rounded-xl border border-border/40"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div className="mt-4 text-xs text-foreground font-mono">Obsidian Canvas · Champagne Gold</div>
              </div>

              {/* Modular Grid Card */}
              <div
                className="rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-md p-6 hover:border-accent/30 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Rhythms
                </div>
                <div className="mt-4 space-y-2">
                  {[20, 45, 75, 100].map((w) => (
                    <div
                      key={w}
                      className="h-1.5 rounded-full bg-accent/80"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
                <div className="mt-4 text-xs text-foreground font-mono">Modular grid · 8px base offsets</div>
              </div>
            </motion.div>
          </Stagger>
        </section>

        {/* ─── SECTION 06: About Story (Editorial Magazine Split) ─── */}
        <section className="space-y-12">
          <div className="text-right max-w-xl ml-auto">
            <SectionHeader
              index="04"
              eyebrow="About"
              title="Calm interfaces, focused details."
              linkTo="/about"
              linkLabel="More about me"
            />
          </div>

          <Reveal className="grid grid-cols-1 gap-12 md:grid-cols-12 items-center">
            <div className="md:col-span-5">
              <PlaceholderCard label="NEERAJ GOPI" aspect="aspect-[4/5]" />
            </div>
            <div className="space-y-6 md:col-span-7">
              <p className="text-2xl leading-relaxed text-foreground font-light">
                I'm Gopi Neeraj Kumar — a UI/UX designer with one year of full-time experience designing production digital systems.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                I recently collaborated on an internal HRMS product where I designed four core modules end-to-end. I focus on translating complex business logic into clean, modular layouts, ensuring employee tools remain simple, clear, and highly usable.
              </p>
              <div className="grid grid-cols-2 gap-6 border-t border-border/30 pt-8">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                    Core tools
                  </div>
                  <div className="mt-2 font-display text-lg text-foreground">Figma · Lovable</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                    Availability
                  </div>
                  <div className="mt-2 font-display text-lg text-foreground">Open to roles</div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ─── SECTION 07: Climax CTA & Studio Footer ─── */}
        <div className="border-t border-border/25 pt-24 text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold block mb-6">
            CHAPTER 05 · NEXT LEVEL
          </span>
          <Reveal>
            <h2 className="font-display text-5xl sm:text-7xl md:text-[85px] lg:text-[110px] xl:text-[130px] leading-[0.85] tracking-tight text-foreground font-light select-none">
              READY TO BUILD<br />
              SOMETHING<br />
              <span className="text-accent">UNFORGETTABLE?</span>
            </h2>
          </Reveal>

          <div className="mt-14 flex justify-center">
            <Magnetic strength={0.4}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-10 py-5 text-base font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(220,120,80,0.3)]"
              >
                Let's talk
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </div>

          {/* Animated Divider */}
          <div className="mt-32 w-full relative h-[1px] bg-border/20 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 bg-accent origin-left"
            />
          </div>

          {/* Social Nodes */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-4xl mx-auto">
            {[
              { to: "/process" as const, label: "Workflow Spec", Icon: Workflow },
              { to: "/design-system" as const, label: "Design Token Spec", Icon: Palette },
              { to: "/about" as const, label: "About Story", Icon: User },
              { to: "/contact" as const, label: "Get in touch", Icon: Mail },
            ].map(({ to, label, Icon }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <Link
                  to={to}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-surface/15 backdrop-blur-sm p-6 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface/30 hover:text-accent hover:border-accent/30 hover:shadow-[var(--shadow-float)]"
                >
                  <Icon className="h-5 w-5 text-accent/80 group-hover:text-accent transition-colors mb-3" strokeWidth={1.75} />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground">{label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Studio Footer */}
          <footer className="mt-44 border-t border-border/20 pt-16 pb-20 select-none">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
              {/* Brand */}
              <div className="md:col-span-6 space-y-4">
                <div className="font-display text-2xl font-light text-foreground tracking-tight">
                  Gopi Neeraj <span className="text-accent">Kumar</span>
                </div>
                <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                  UI/UX Designer and Product Developer focusing on calm interfaces, design systems, and shipped functional logic.
                </p>
                <div className="text-[10px] text-muted-foreground/45 tracking-widest uppercase pt-2">
                  © {new Date().getFullYear()} ALL RIGHTS RESERVED
                </div>
              </div>

              {/* Credits Grid */}
              <div className="md:col-span-3 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground/60 block font-semibold">DESIGN / CODE</span>
                  <span className="text-[11px] uppercase tracking-wider text-foreground font-mono">GOPI NEERAJ</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground/60 block font-semibold">LOCATED IN</span>
                  <span className="text-[11px] uppercase tracking-wider text-foreground font-mono">INDIA</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground/60 block font-semibold">YEAR</span>
                  <span className="text-[11px] uppercase tracking-wider text-foreground font-mono">2026</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground/60 block font-semibold">ROLE</span>
                  <span className="text-[11px] uppercase tracking-wider text-foreground font-mono">JUNIOR UI/UX</span>
                </div>
              </div>

              {/* Connect */}
              <div className="md:col-span-3 space-y-3">
                <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground/60 block font-semibold">CONNECT</span>
                <div className="flex flex-col gap-2.5 text-[11px] font-medium tracking-widest uppercase">
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors w-fit flex items-center gap-1.5 group/link">
                    LINKEDIN <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                  <a href={BEHANCE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors w-fit flex items-center gap-1.5 group/link">
                    BEHANCE <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                  <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-accent transition-colors w-fit flex items-center gap-1.5 group/link">
                    EMAIL <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors w-fit flex items-center gap-1.5 group/link">
                    RESUME <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>

      </div>
    </HeroScene>
  );
}
