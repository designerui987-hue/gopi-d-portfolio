import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Workflow, Palette, User, Mail, FileDown, Linkedin } from "lucide-react";
import { PlaceholderCard } from "@/components/page-shell";
import { SectionHeader } from "@/components/section-header";
import { Stagger, staggerItem, Reveal } from "@/components/reveal";
import { HeroScene } from "@/components/hero-scene";
import { StatsScrollReveal } from "@/components/stats-scroll-reveal";
import { Magnetic } from "@/components/magnetic";
import { GsapHeadline } from "@/components/gsap-headline";
import { ComingSoonCard } from "@/components/coming-soon-card";

/* Shared premium easing curve used site-wide */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Fade-up with optional blur — hero entrance variant */
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
      {/* ─── Fullscreen Cinematic Hero ─── */}
      <div className="relative h-screen min-h-[680px] w-full flex flex-col justify-center px-6 lg:pl-28 lg:pr-12 overflow-hidden border-b border-border/30">
        <div className="relative z-10 max-w-5xl space-y-0">

          {/* 1 ── Eyebrow label */}
          <FadeUp delay={0.15} className="mb-6">
            <span className="inline-flex items-center gap-2.5 text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
              <span className="inline-block h-px w-6 bg-accent/60 rounded-full" />
              UI/UX Designer &amp; Product Developer
              <span className="inline-block h-px w-6 bg-accent/60 rounded-full" />
            </span>
          </FadeUp>

          {/* 2 ── Main headline — GSAP character stagger */}
          <GsapHeadline
            text="Designing calm digital experiences."
            className="font-display tracking-tight text-foreground leading-[0.86] text-[clamp(2.8rem,8vw,7.5rem)]"
          />

          {/* 3 ── Subtitle */}
          <FadeUp delay={1.45} y={18} className="mt-8 max-w-xl">
            <p className="text-base md:text-[1.05rem] leading-[1.75] text-muted-foreground font-light">
              One year into designing digital products. I translate complex
              business logic into clean, simple interface flows.{" "}
              <span className="text-foreground/60">Currently open to junior roles, internships &amp; freelance briefs.</span>
            </p>
          </FadeUp>

          {/* 4 ── CTA row — each button staggered independently */}
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

      {/* Main Content Body */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-32 lg:pl-28 lg:pr-12 pt-16">
        <StatsScrollReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
          {[
            ["1 yr", "designing full-time", "Experience"],
            ["2", "products shipped / designed", "Public Releases"],
            ["4", "modules designed end-to-end", "Product Focus"],
            ["Figma + Lovable", "primary toolset", "Tooling Stack"],
          ].map(([k, v, category], i) => (
            <div 
              key={v} 
              className="relative group rounded-3xl border border-border/30 bg-surface/10 backdrop-blur-md p-6 overflow-hidden transition-all duration-300 hover:border-accent/20 hover:bg-surface/20 shadow-[var(--shadow-soft)]"
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

        {/* 02 · Featured work */}
        <div className="mt-36">
          <SectionHeader
            index="02"
            eyebrow="Selected work"
            title="Sleek layouts, real solutions."
            description="Case studies detailing my work on production systems, design systems, and solo product builds."
            linkTo="/projects"
            linkLabel="All projects"
          />
          <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-12" stagger={0.12}>
            {/* ── Placeholder cards while case studies are being rebuilt ── */}
            <ComingSoonCard
              colSpan="md:col-span-8"
              aspect="aspect-[16/10]"
              variant="featured"
            />
            <ComingSoonCard
              colSpan="md:col-span-4"
              aspect="aspect-[3/4]"
              variant="featured"
            />
            <ComingSoonCard
              colSpan="md:col-span-4"
              aspect="aspect-[3/4]"
              variant="featured"
            />
          </Stagger>
        </div>

        {/* 03 · Process teaser */}
        <div className="mt-36">
          <SectionHeader
            index="03"
            eyebrow="How I work"
            title="Considered loops, solid results."
            description="A practical approach to digital design — understand, sketch, test, refine. Clear logic over decorative aesthetics."
            linkTo="/process"
            linkLabel="See full process"
          />
          <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border/40 bg-border/40 md:grid-cols-4" stagger={0.06}>
            {[
              ["01", "Understand", "Deconstruct the brief. Define real user questions before wireframing."],
              ["02", "Sketch", "Ugly, low-fidelity paper wireframes to test structure and flows quickly."],
              ["03", "Feedback", "Gather input early from mentors and users to validate layout choices."],
              ["04", "Refine", "Figma pixel-polish, design systems mapping, and dev handoff logs."],
            ].map(([n, t, d]) => (
              <motion.div
                key={n}
                variants={staggerItem}
                className="group bg-surface/30 backdrop-blur-sm p-8 transition-all duration-500 hover:bg-surface/50"
              >
                <div className="font-display text-xs text-accent uppercase tracking-widest">{n}</div>
                <div className="mt-4 font-display text-xl text-foreground font-medium group-hover:text-accent transition-colors duration-300">{t}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                  {d}
                </p>
              </motion.div>
            ))}
          </Stagger>
        </div>

        {/* 04 · System teaser */}
        <div className="mt-36">
          <SectionHeader
            index="04"
            eyebrow="Design system"
            title="Unified rules, balanced layouts."
            description="Tuned colors, consistent typography, and layout rhythm aligned on a strict modular grid."
            linkTo="/design-system"
            linkLabel="Open system spec"
          />
          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.08}>
            <motion.div variants={staggerItem}>
              <div
                className="rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-md p-6 hover:border-accent/30 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Palettes
                </div>
                <div className="mt-6 grid grid-cols-5 gap-2">
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
                <div className="mt-6 text-sm text-foreground">Obsidian Canvas · Champagne Gold Accent</div>
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <div
                className="rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-md p-6 hover:border-accent/30 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Typography
                </div>
                <div className="mt-6 font-display text-4xl leading-none tracking-tight text-accent">
                  Fraunces
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Inter Sans · display serif
                </div>
                <div className="mt-6 text-sm text-foreground">Editorial voice · technical layout clarity</div>
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <div
                className="rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-md p-6 hover:border-accent/30 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Rhythms
                </div>
                <div className="mt-6 space-y-2">
                  {[16, 40, 72, 96].map((w) => (
                    <div
                      key={w}
                      className="h-1.5 rounded-full bg-accent/80"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
                <div className="mt-6 text-sm text-foreground">Modular spacing grid · 8px base offsets</div>
              </div>
            </motion.div>
          </Stagger>
        </div>

        {/* 05 · About teaser */}
        <div className="mt-36">
          <SectionHeader
            index="05"
            eyebrow="About"
            title="Calm interfaces, focused details."
            linkTo="/about"
            linkLabel="More about me"
          />
          <Reveal className="grid grid-cols-1 gap-12 md:grid-cols-5 items-start">
            <div className="md:col-span-2">
              <PlaceholderCard label="NEERAJ GOPI" aspect="aspect-[4/5]" />
            </div>
            <div className="space-y-6 md:col-span-3">
              <p className="text-xl leading-relaxed text-foreground font-light">
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
        </div>

        {/* Climax - CTA & Credits */}
        <div className="mt-44 border-t border-border/25 pt-24 text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold block mb-6">
            06 · NEXT LEVEL
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
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-accent origin-left"
            />
          </div>

          {/* Social Nodes - Animate Individually */}
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

          {/* Redesigned Premium Footer */}
          <footer className="mt-44 border-t border-border/20 pt-16 pb-20 select-none">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
              {/* Left Column: Brand & Description */}
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

              {/* Middle Column: Credits Grid */}
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

              {/* Right Column: Connect */}
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
