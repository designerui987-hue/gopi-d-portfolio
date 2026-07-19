import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Workflow, Palette, User, Mail, FileDown, Linkedin, Layers, Box, Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import { PlaceholderCard } from "@/components/page-shell";
import { SectionHeader } from "@/components/section-header";
import { Stagger, staggerItem, Reveal } from "@/components/reveal";
import { HeroScene } from "@/components/hero-scene";
import { StatsScrollReveal } from "@/components/stats-scroll-reveal";
import { Magnetic } from "@/components/magnetic";
import { GsapHeadline } from "@/components/gsap-headline";
import { projects } from "@/lib/projects";

/* ─── Unified Site-Wide Motion System Standards ─── */
const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

/** Subtle Fade-up with hardware-accelerated transforms */
function FadeUp({
  children,
  delay = 0,
  className,
  y = 18,
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
      initial={{ opacity: 0, y: reduced ? 0 : y, filter: reduced ? "none" : "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "none" }}
      transition={{ duration: 0.85, ease: EASE_EDITORIAL, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── CHAPTER 02: Featured Work ─── */
function HomeProjectsSection() {
  return (
    <section className="relative w-full py-16 md:py-24 border-t border-border/20">
      <div className="flex items-center gap-3 mb-10">
        <span className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold">
          CHAPTER 02 · SELECTED WORK
        </span>
        <motion.div
          className="h-px bg-accent/40 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
          style={{ originX: 0, width: "4rem" }}
        />
      </div>

      <div className="flex items-start justify-between mb-12">
        <h2 className="font-display text-4xl md:text-5xl font-light text-foreground tracking-tight leading-[1.05] max-w-sm">
          Work that ships.
        </h2>
        <Link
          to="/projects"
          className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors duration-300 border border-border/30 rounded-full px-5 py-2.5 hover:border-accent/30"
        >
          All case studies <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="space-y-5">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1}>
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:bg-surface/30 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
            >
              <div className="relative md:w-[42%] shrink-0 overflow-hidden bg-surface/30 aspect-[16/9] md:aspect-auto">
                {p.coverImage ? (
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="w-full h-full object-cover md:absolute md:inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface/40 min-h-[180px]">
                    <Layers className="h-8 w-8 text-accent/20" strokeWidth={1} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 hidden md:block pointer-events-none" />
              </div>
              <div className="flex flex-col justify-between p-7 md:p-10 flex-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-accent font-semibold">{p.category}</span>
                    <span className="text-border/60">&middot;</span>
                    <span className="text-[9px] font-mono text-muted-foreground/50">{p.year}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-foreground leading-[1.15] tracking-tight group-hover:text-accent/90 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md">
                    {p.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border/20 pt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tools.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-full border border-border/30 bg-background/30 px-2.5 py-1 text-[9px] font-mono text-muted-foreground/70">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read case study <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
              <span className="absolute top-5 right-6 font-mono text-[10px] text-muted-foreground/25 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 md:hidden text-center">
        <Link to="/projects" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors duration-300">
          View all case studies <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

/* ─── Social & Resume URLs ─── */
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
  const reduced = useReducedMotion();

  return (
    <HeroScene>
      {/* ─── CHAPTER 00: Hero (Who am I?) ─── */}
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
              I translate complex software requirements into calm, quiet interfaces.{" "}
              <span className="text-foreground/75">One year into building digital products with intention, clarity, and precision.</span>
            </p>
          </FadeUp>

          <div className="flex flex-wrap items-center gap-3.5 mt-10">
            <FadeUp delay={1.75} y={14}>
              <Magnetic strength={0.25}>
                <Link
                  to="/contact"
                  data-cursor="talk"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground shadow-[0_4px_24px_rgb(220,120,80,0.18)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgb(220,120,80,0.32)]"
                >
                  Let's talk
                  <motion.span
                    className="inline-flex"
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
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
                  className="group inline-flex items-center gap-2 rounded-full border border-border/40 px-7 py-4 text-sm font-medium text-muted-foreground bg-surface/20 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:text-foreground hover:border-accent/40 hover:bg-surface/40"
                >
                  <Linkedin className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-105" strokeWidth={1.75} />
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

        {/* ─── CHAPTER 01: Key Metrics (Why should someone trust me?) ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold block">
              CHAPTER 01 · PROVEN FOUNDATIONS
            </span>
            <h3 className="font-display text-3xl font-light text-foreground tracking-tight leading-snug">
              Trust is built through shipped work, not claims.
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground font-light">
              One year of full-time design. Four core enterprise modules designed end-to-end. Real tools built for real teams.
            </p>
          </div>
          <div className="lg:col-span-8">
            <StatsScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                ["1 yr", "full-time product design experience", "Proven Experience", "col-span-1 sm:col-span-2 bg-surface/25 border-accent/20"],
                ["2", "production releases shipped", "Public Releases", "col-span-1"],
                ["4", "enterprise modules designed end-to-end", "Product Scope", "col-span-1"],
                ["Figma + Lovable", "foundational design & dev stack", "Tooling Stack", "col-span-1 sm:col-span-2"],
              ].map(([k, v, category, extraClass], i) => (
                <div
                  key={v}
                  className={`relative group rounded-3xl border border-border/30 p-6 overflow-hidden transition-all duration-300 hover:border-accent/40 hover:scale-[1.01] shadow-[var(--shadow-soft)] ${extraClass}`}
                  data-stat
                >
                  <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity select-none pointer-events-none">
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

        {/* ─── CHAPTER 02: Selected Work ─── */}
        <HomeProjectsSection />

        {/* ─── CHAPTER 03: Process (How do I think?) ─── */}
        <section className="space-y-12 border-t border-border/20 pt-16">
          <div className="text-right max-w-xl ml-auto">
            <SectionHeader
              index="03"
              eyebrow="How I think"
              title="Good software is thought through before it's styled."
              description="I don't guess layout logic or rely on decorative trends. Every decision starts with understanding the problem and testing structure early."
              linkTo="/process"
              linkLabel="See full workflow"
            />
          </div>
          
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.08}>
            {[
              ["01", "Understand", "Deconstruct the brief. Ask uncomfortable questions about user goals before drawing a single frame.", "md:translate-y-0"],
              ["02", "Sketch", "Ugly, low-fidelity paper wireframes to test layout hierarchy and flow logic fast.", "md:translate-y-8"],
              ["03", "Feedback", "Pressure-test wireframes with users and mentors before touching high-fidelity details.", "md:translate-y-0"],
              ["04", "Refine", "Design system mapping, token alignment, and clean developer handoff documentation.", "md:translate-y-8"],
            ].map(([n, t, d, offsetClass]) => (
              <motion.div
                key={n}
                variants={staggerItem}
                whileHover={{ scale: reduced ? 1 : 1.01 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
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

        {/* ─── CHAPTER 04: Design System (Why build systems instead of isolated screens?) ─── */}
        <section className="space-y-12 border-t border-border/20 pt-16">
          <SectionHeader
            index="04"
            eyebrow="System Architecture"
            title="A screen is a moment. A system is a conversation."
            description="Isolated screens break when software grows. I build modular token rules, type scales, and layout rhythms so interfaces stay calm as features multiply."
            linkTo="/design-system"
            linkLabel="Open system spec"
          />

          <Stagger className="grid grid-cols-1 lg:grid-cols-12 gap-8" stagger={0.08}>
            {/* Left Col (7 cols): Interactive Token & Type Architecture Spec */}
            <motion.div variants={staggerItem} className="lg:col-span-7">
              <motion.div
                whileHover={{ scale: reduced ? 1 : 1.01 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                className="h-full rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-md p-8 flex flex-col justify-between hover:border-accent/30 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold font-mono">
                      FOUNDATION_SPEC // TYPE_SCALE
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground/60">
                      WCAG_AA_PASSED
                    </span>
                  </div>

                  <div className="font-display text-4xl sm:text-5xl leading-none tracking-tight text-accent">
                    Fraunces
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground font-mono">
                    Inter Sans · Display Serif Contrast
                  </div>

                  {/* Micro Token Spec Grid */}
                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/25 pt-6 text-[11px] font-mono">
                    <div>
                      <span className="text-muted-foreground/60 block text-[9px] uppercase">DISPLAY_SCALE</span>
                      <span className="text-foreground">72px / 1.02 lh</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground/60 block text-[9px] uppercase">BODY_SCALE</span>
                      <span className="text-foreground">16px / 1.75 lh</span>
                    </div>
                  </div>
                </div>

                <p className="mt-8 text-xs leading-relaxed text-muted-foreground font-light">
                  Editorial voice paired with technical layout clarity. Strict fluid modular type scale matching viewport dimensions.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Col (5 cols): Spatial Rhythm & Color Tokens */}
            <motion.div variants={staggerItem} className="lg:col-span-5 space-y-6">
              {/* Palette Card */}
              <motion.div
                whileHover={{ scale: reduced ? 1 : 1.01 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                className="rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-md p-6 hover:border-accent/30 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold font-mono">
                    COLOR_TOKENS
                  </span>
                  <span className="text-[9px] font-mono text-accent">6 PROD_SWATCHES</span>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {[
                    ["--background", "oklch(0.14)"],
                    ["--surface", "oklch(0.18)"],
                    ["--border", "oklch(0.30)"],
                    ["--primary", "oklch(0.95)"],
                    ["--secondary", "oklch(0.22)"],
                    ["--accent", "oklch(0.82)"],
                  ].map(([c, val], idx) => (
                    <motion.div
                      key={c}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08, ease: EASE_EDITORIAL }}
                      className="group relative aspect-square rounded-xl border border-border/40 cursor-pointer"
                      style={{ background: `var(${c})` }}
                      title={`${c}: ${val}`}
                    />
                  ))}
                </div>
                <div className="mt-4 text-xs text-foreground font-mono">Obsidian Canvas · Champagne Gold Accent</div>
              </motion.div>

              {/* Spatial 8pt Grid Card */}
              <motion.div
                whileHover={{ scale: reduced ? 1 : 1.01 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                className="rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-md p-6 hover:border-accent/30 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold font-mono">
                    8PT_SPACING_RHYTHM
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground/60">8px → 64px</span>
                </div>

                <div className="space-y-2">
                  {[8, 16, 24, 32, 48].map((px, idx) => (
                    <motion.div
                      key={px}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.08, ease: EASE_EDITORIAL }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-[9px] font-mono text-muted-foreground/60 w-8">{px}px</span>
                      <div
                        className="h-1.5 rounded-full bg-accent/80"
                        style={{ originX: 0, width: `${(px / 48) * 100}%` }}
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-foreground font-mono">Mathematical layout rhythm</div>
              </motion.div>
            </motion.div>
          </Stagger>
        </section>

        {/* ─── CHAPTER 05: About Story (Why did I become a designer?) ─── */}
        <section className="space-y-12 border-t border-border/20 pt-16">
          <div className="text-right max-w-xl ml-auto">
            <SectionHeader
              index="05"
              eyebrow="Perspective"
              title="Software should make complex tasks feel quiet, not overwhelming."
              linkTo="/about"
              linkLabel="More about me"
            />
          </div>

          <Reveal className="grid grid-cols-1 gap-12 md:grid-cols-12 items-center">
            <div className="md:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "none" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_EDITORIAL }}
              >
                <PlaceholderCard label="NEERAJ GOPI" aspect="aspect-[4/5]" />
              </motion.div>
            </div>
            <div className="space-y-6 md:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: EASE_EDITORIAL }}
                className="text-2xl leading-relaxed text-foreground font-light"
              >
                I’m Gopi Neeraj Kumar — a UI/UX designer focused on building quiet, considered digital tools.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE_EDITORIAL }}
                className="text-base leading-relaxed text-muted-foreground font-light"
              >
                I became a designer because most software is too loud. Confusing layouts and visual clutter waste human attention. My focus is stripping away noise until only clarity remains.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.25, ease: EASE_EDITORIAL }}
                className="text-sm leading-relaxed text-muted-foreground/80 font-light"
              >
                Recently, I collaborated on an enterprise HRMS platform where I designed four core modules end-to-end — turning tangled employee workflows into straightforward screen flows.
              </motion.p>
              
              {/* Finishing Signature Accent */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35, ease: EASE_EDITORIAL }}
                className="grid grid-cols-2 gap-6 border-t border-border/30 pt-8"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                    Core tools
                  </div>
                  <div className="mt-2 font-display text-lg text-foreground flex items-center gap-2">
                    <span>Figma · Lovable</span>
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                    Availability
                  </div>
                  <div className="mt-2 font-display text-lg text-foreground">Open to roles</div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </section>

        {/* ─── CHAPTER 06: Climax CTA & Studio Footer (Why contact me?) ─── */}
        <div className="border-t border-border/25 pt-24 text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold block mb-6">
            CHAPTER 06 · COLLABORATION
          </span>
          <Reveal>
            <h2 className="font-display text-5xl sm:text-7xl md:text-[85px] lg:text-[110px] xl:text-[130px] leading-[0.85] tracking-tight text-foreground font-light select-none">
              READY TO BUILD<br />
              SOMETHING<br />
              <motion.span
                className="text-accent inline-block"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE_EDITORIAL }}
              >
                UNFORGETTABLE?
              </motion.span>
            </h2>
          </Reveal>

          <p className="mt-8 text-base md:text-lg text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
            Whether you're shaping a new product from scratch or refining an existing system, let's build something clear, calm, and memorable.
          </p>

          <div className="mt-12 flex justify-center">
            <Magnetic strength={0.25}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-10 py-5 text-base font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgb(220,120,80,0.3)]"
              >
                Let's talk
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </div>

          {/* Animated Line Divider */}
          <div className="mt-32 w-full relative h-[1px] bg-border/20 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE_EDITORIAL }}
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
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_EDITORIAL }}
              >
                <Link
                  to={to}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-surface/15 backdrop-blur-sm p-6 text-sm text-muted-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-surface/30 hover:text-accent hover:border-accent/30 hover:shadow-[var(--shadow-float)]"
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
