import { createFileRoute } from "@tanstack/react-router";
import {
  FileDown,
  Linkedin,
  BookOpen,
  Layers,
  Workflow,
  CheckCircle,
  Pen,
  Code2,
  Zap,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/* ── Skills data (exactly as-is from project tools) ─────────── */
const SKILL_GROUPS = [
  {
    label: "Design",
    icon: Pen,
    items: ["Figma", "FigJam", "Component systems", "Responsive layouts", "Dev handoff"],
  },
  {
    label: "Development",
    icon: Code2,
    items: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "FastAPI", "Python"],
  },
  {
    label: "Rapid Prototyping",
    icon: Zap,
    items: ["Lovable", "AI-assisted iteration", "Figma → code handoff"],
  },
] as const;

/* ── Skill chip ─────────────────────────────────────────────── */
function SkillChip({ label, delay }: { label: string; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ scale: 1.04, borderColor: "var(--accent)" }}
      className="rounded-full border border-border/35 bg-surface/30 px-4 py-2 text-[11px] font-medium text-muted-foreground tracking-wide cursor-default select-none transition-colors duration-200 hover:text-foreground"
    >
      {label}
    </motion.div>
  );
}

/* ── Skill group ────────────────────────────────────────────── */
function SkillGroup({
  group,
  groupDelay,
}: {
  group: (typeof SKILL_GROUPS)[number];
  groupDelay: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon   = group.icon;

  return (
    <div ref={ref} className="space-y-5">
      {/* Group heading */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: groupDelay }}
        className="flex items-center gap-2.5"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/25 bg-accent/8 text-accent">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
        <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-semibold">
          {group.label}
        </span>
      </motion.div>

      {/* Accent rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: groupDelay + 0.1, originX: 0 }}
        className="h-px w-8 bg-accent/40 rounded-full"
      />

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {group.items.map((item, i) => (
          <SkillChip key={item} label={item} delay={groupDelay + 0.15 + i * 0.06} />
        ))}
      </div>
    </div>
  );
}

const LINKEDIN_URL = "https://www.linkedin.com/in/neeraj-kumar-gopi-b09391331";
const RESUME_URL = "/neeraj_ui_ux_resume_updaetd_v1_7148.pdf";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Scroll-parallax image card ─────────────────────────────── */
function ParallaxImage({
  src,
  alt,
  aspect = "aspect-[4/5]",
}: {
  src?: string;
  alt: string;
  aspect?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y     = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl border border-border/40 bg-surface/30 p-2 backdrop-blur-sm shadow-[var(--shadow-soft)] hover:border-accent/30 transition-colors duration-500 w-full ${aspect}`}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {src ? (
          <motion.img
            style={{ y: reduced ? 0 : y, scale: reduced ? 1 : scale }}
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <motion.div
            style={{ y: reduced ? 0 : y }}
            className="absolute inset-0 grid-bg opacity-30 flex items-center justify-center"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {alt}
            </span>
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

/* ── Animated timeline node ─────────────────────────────────── */
function TimelineNode({
  n,
  icon: Icon,
  label,
}: {
  n: string;
  icon: React.ElementType;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex items-center gap-3 mb-5"
    >
      {/* Circle node */}
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      </span>
      <span className="text-[9px] uppercase tracking-[0.28em] text-accent font-semibold">
        {n} · {label}
      </span>
    </motion.div>
  );
}

/* ── Staggered paragraph — each sentence on own line ────────── */
function StaggeredParagraph({
  lines,
  delay = 0,
}: {
  lines: string[];
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-2">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.65,
            ease: EASE,
            delay: delay + i * 0.1,
          }}
          className="text-sm leading-[1.8] text-muted-foreground"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

/* ── Milestone block ────────────────────────────────────────── */
function Milestone({
  n,
  icon,
  eyebrow,
  title,
  lines,
  image,
  imageAlt,
  imageFirst = false,
}: {
  n: string;
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  lines: string[];
  image?: string;
  imageAlt: string;
  imageFirst?: boolean;
}) {
  const ref  = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const textCol = (
    <div className="space-y-6">
      <TimelineNode n={n} icon={icon} label={eyebrow} />

      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.75, ease: EASE }}
        className="font-display text-3xl sm:text-4xl md:text-[2.6rem] font-light tracking-tight text-foreground leading-[1.08]"
      >
        {title}
      </motion.h2>

      {/* Accent rule under heading */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        style={{ originX: 0 }}
        className="h-px w-12 bg-accent/50 rounded-full"
      />

      <StaggeredParagraph lines={lines} delay={0.3} />
    </div>
  );

  const imgCol = (
    <ParallaxImage src={image} alt={imageAlt} />
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
      {imageFirst ? (
        <>
          <div className="md:col-span-5 order-2 md:order-1">{imgCol}</div>
          <div className="md:col-span-6 md:col-start-7 order-1 md:order-2">{textCol}</div>
        </>
      ) : (
        <>
          <div className="md:col-span-6 order-1">{textCol}</div>
          <div className="md:col-span-5 md:col-start-8 order-2">{imgCol}</div>
        </>
      )}
    </div>
  );
}

/* ── Route ──────────────────────────────────────────────────── */
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "UI/UX designer Gopi Neeraj Kumar — my story, how I work, and what I believe about digital product design.",
      },
      { property: "og:title", content: "About — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "UI/UX designer Gopi Neeraj Kumar — my story, how I work, and what I believe about digital product design.",
      },
    ],
  }),
  component: About,
});

/* ── Page ───────────────────────────────────────────────────── */
function About() {
  return (
    <PageShell
      eyebrow="My Story"
      title="Quiet dedication, honest product layouts."
      description="I'm a UI/UX designer who believes that digital products should be clear, considered, and deeply respectful of the user's attention. Here is how I got here."
    >
      {/* ── Story Timeline ── */}
      <div className="relative mt-24 space-y-32 md:space-y-44">

        {/* Central vertical rule */}
        <div
          aria-hidden="true"
          className="absolute left-[50%] top-0 bottom-32 w-px bg-gradient-to-b from-transparent via-border/25 to-transparent hidden md:block pointer-events-none"
        />

        {/* 01 · The Spark */}
        <Milestone
          n="01"
          icon={BookOpen}
          eyebrow="The Spark (2025)"
          title="Curiosity over templates."
          imageFirst
          imageAlt="THE SPARK"
          lines={[
            "Tired of generic, busy layouts, I opened Figma to ask a simple question:",
            "what happens when digital products are built with absolute clarity?",
            "I began learning the grammar of interfaces, typography bounds, and component kits.",
          ]}
        />

        {/* 02 · The Collaboration */}
        <Milestone
          n="02"
          icon={Workflow}
          eyebrow="The Collaboration (2025–2026)"
          title="4 core HRMS modules, shipped."
          imageAlt="HRMS CASE STUDY"
          image="/images/hrms/cover.png"
          lines={[
            "Joined an internal product team to build a complex SaaS system.",
            "Designed payroll breakdowns, leave approval schedules, checklists, and attendance sheets.",
            "Translating business complexity into simple layouts taught me the speed of developer handoffs.",
          ]}
        />

        {/* 03 · The Experiment */}
        <Milestone
          n="03"
          icon={Layers}
          eyebrow="The Experiment (2026)"
          title="Nova — Fintech made readable."
          imageFirst
          imageAlt="NOVA FINTECH"
          image="/images/nova/cover.png"
          lines={[
            "As a solo project, designed and developed an AI-powered stock analysis platform.",
            "Replaced complex day-trading candlesticks with plain-language Buy / Hold recommendation cards.",
            "Owning design, frontend, and backend deepened my technical pragmatism.",
          ]}
        />

        {/* 04 · The Philosophy */}
        <Milestone
          n="04"
          icon={CheckCircle}
          eyebrow="The Philosophy (Present)"
          title="Quiet interfaces speak loudest."
          imageAlt="DESIGN SYSTEM"
          lines={[
            "Simple layouts are respectful.",
            "I build fast, coherent components that solve business logic while staying completely out of the user's way.",
            "I'm currently looking for junior roles to build the next generation of shipped product work.",
          ]}
        />
      </div>

      {/* ── Skills ── */}
      <div className="mt-36">
        <Reveal>
          <div className="flex items-baseline gap-4 border-b border-border/25 pb-5 mb-14">
            <span className="font-display text-sm text-accent">05</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground font-semibold">
              Skills &amp; Tools
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-foreground leading-[1.1] mb-16 max-w-lg">
            What I work with,{" "}
            <span className="text-muted-foreground">and how.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <SkillGroup key={group.label} group={group} groupDelay={i * 0.12} />
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="mt-36 border-t border-border/25 pt-20 max-w-2xl mx-auto text-center">
        <Reveal>
          <span className="text-[9px] uppercase tracking-[0.32em] text-accent font-semibold block mb-6">
            Let's Build Together
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-[1.1] mb-10">
            Quietly curious.{" "}
            <span className="text-muted-foreground">Ready to ship.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/30 px-6 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface/50 hover:text-accent hover:border-accent/30"
            >
              <Linkedin className="h-4 w-4 text-accent" strokeWidth={1.75} />
              LinkedIn Profile
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(220,120,80,0.22)]"
            >
              <FileDown className="h-4 w-4" strokeWidth={1.75} />
              Download Resume PDF
            </a>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
