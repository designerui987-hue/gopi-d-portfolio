import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Target,
  Layers,
  Accessibility,
  Smartphone,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Monitor,
  Tablet,
  Palette,
  LayoutGrid,
  Map,
  FileText,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import { useRef, useState } from "react";
import { PlaceholderCard } from "@/components/page-shell";
import { Reveal, Stagger, staggerItem } from "@/components/reveal";
import { getProject, projects, type Project } from "@/lib/projects";

/* ─── Route ─────────────────────────────────────────────────── */
export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Case study not found — Gopi Neeraj Kumar" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.title} — Case study` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.title} — Case study` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.coverImage || "/images/stockai/cover.png" },
        { name: "twitter:image", content: p.coverImage || "/images/stockai/cover.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${p.title} — Case study` },
        { name: "twitter:description", content: p.description },
      ],
    };
  },
  component: CaseStudy,
  notFoundComponent: CaseStudyNotFound,
});

/* ─── shared ─────────────────────────────────────────────────── */
/* ── StockAI Section primitive ── */
function SASection({
  n,
  label,
  children,
  isLast = false,
}: {
  n: string;
  label: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <section className={`pt-24 ${!isLast ? 'pb-0 border-b border-border/15 mb-0' : 'pb-8'}`}>
      <div className="flex items-center gap-3 mb-12">
        <span className="font-mono text-xs text-accent font-semibold">{n}</span>
        <span className="h-px flex-1 bg-border/20" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 font-semibold">{label}</span>
      </div>
      {children}
    </section>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── 404 ────────────────────────────────────────────────────── */
function CaseStudyNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center lg:pl-28">
      <p className="text-xs uppercase tracking-[0.24em] text-accent font-semibold">404</p>
      <h1 className="mt-4 font-display text-4xl text-foreground font-light">
        Case study not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        The project you're looking for doesn't exist yet.
      </p>
      <Link
        to="/projects"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/20 px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-surface/40 hover:text-accent hover:border-accent/30"
      >
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>
    </div>
  );
}

/* ─── Page router ────────────────────────────────────────────── */
function CaseStudy() {
  const { project } = Route.useLoaderData() as { project: Project };
  const isHRMS = project.slug === "hrms";
  const isStockAI = project.slug === "stockai";

  if (isHRMS)    return <HRMSCaseStudy project={project} />;
  if (isStockAI) return <StockAICaseStudy project={project} />;
  return <StandardCaseStudy project={project} />;
}

/* ══════════════════════════════════════════════════════════════
   HRMS — Premium Case Study Canvas
══════════════════════════════════════════════════════════════ */
function HRMSCaseStudy({ project }: { project: Project }) {
  const idx  = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative w-full"
    >
      {/* ── Dark header strip ── */}
      <div className="mx-auto max-w-7xl px-6 lg:pl-28 lg:pr-12 pt-8 pb-0">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent border border-border/40 bg-surface/15 rounded-full px-4 py-2.5 backdrop-blur-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-accent" /> All projects
        </Link>
      </div>

      {/* ── White canvas ── */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8 pb-32 pt-10">
        <div className="w-full rounded-[2rem] bg-white shadow-[0_24px_80px_rgb(0,0,0,0.18),0_4px_16px_rgb(0,0,0,0.08)] overflow-hidden">

          {/* ════ 01 · HERO ════ */}
          <HeroSection project={project} />

          {/* ════ 02 · PROJECT OVERVIEW ════ */}
          <CanvasSection label="02" title="Project Overview" icon={LayoutGrid}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-5">
                <p className="text-[15px] leading-[1.8] text-slate-600">
                  {project.description}
                </p>
                <p className="text-[15px] leading-[1.8] text-slate-600">
                  The goal was to design an intuitive HRMS platform that consolidates attendance tracking, leave management, onboarding, and payroll into a single, cohesive experience — eliminating tool-switching and reducing administrative overhead.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Role", value: project.role },
                  { label: "Duration", value: "8 months" },
                  { label: "Tools", value: project.tools.join(", ") },
                  { label: "Platform", value: "Web (Desktop + Mobile)" },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
                    <div className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold mb-2">
                      {label}
                    </div>
                    <div className="text-sm text-slate-800 font-medium leading-snug">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </CanvasSection>

          {/* ════ 03 · PROBLEM STATEMENT ════ */}
          <CanvasSection label="03" title="Problem Statement" icon={Target} tinted>
            <div className="max-w-3xl space-y-8">
              <p className="text-[16px] leading-[1.85] text-slate-600">
                {project.problem}
              </p>
              <div className="space-y-4">
                {[
                  "Attendance records are scattered across multiple spreadsheets",
                  "Leave approvals are slow and lack visibility into team availability",
                  "New hires face confusing onboarding with no step-by-step guidance",
                  "Payroll details are inaccessible and require HR intervention",
                  "No single platform for managers to monitor team-wide HR status",
                ].map((pain, i) => (
                  <CanvasPainPoint key={i} text={pain} index={i} />
                ))}
              </div>
            </div>
          </CanvasSection>

          {/* ════ 04 · BUSINESS GOALS ════ */}
          <CanvasSection label="04" title="Business Goals" icon={TrendingUp}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { goal: "Improve operational efficiency", detail: "Reduce HR team manual effort by centralising all processes in one platform." },
                { goal: "Reduce HR friction", detail: "Make common HR actions achievable in under 3 taps on any device." },
                { goal: "Improve employee satisfaction", detail: "Give employees full visibility into their own HR data and history." },
                { goal: "Increase transparency", detail: "Real-time leave calendars and attendance dashboards for all team members." },
                { goal: "Reduce app-switcher fatigue", detail: "Consolidate leave, attendance, payroll and onboarding in one product." },
                { goal: "Digitise HR operations", detail: "Move all paper-based and email-based HR processes fully online." },
              ].map(({ goal, detail }, i) => (
                <CanvasGoalCard key={i} goal={goal} detail={detail} index={i} />
              ))}
            </div>
          </CanvasSection>

          {/* ════ 05 · USER PERSONAS ════ */}
          <CanvasSection label="05" title="User Personas" icon={Users} tinted>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  role: "HR Manager",
                  name: "Priya S.",
                  age: "34",
                  goal: "Manage approvals, monitor attendance, reduce repetitive admin tasks.",
                  pains: ["Too many approval notifications", "No team calendar view", "Manual payroll calculations"],
                  color: "bg-orange-50 border-orange-100",
                  accent: "text-orange-600",
                  dot: "bg-orange-400",
                },
                {
                  role: "Employee",
                  name: "Arjun M.",
                  age: "27",
                  goal: "Apply for leave, check pay slips, track attendance — without asking HR.",
                  pains: ["No self-service portal", "Can't see leave balance easily", "Payslip comes via email only"],
                  color: "bg-blue-50 border-blue-100",
                  accent: "text-blue-600",
                  dot: "bg-blue-400",
                },
                {
                  role: "Department Manager",
                  name: "Neha R.",
                  age: "41",
                  goal: "Approve leave requests, monitor team availability, handle new hire onboarding.",
                  pains: ["No consolidated team view", "Manual leave approval tracking", "Slow onboarding for new staff"],
                  color: "bg-emerald-50 border-emerald-100",
                  accent: "text-emerald-600",
                  dot: "bg-emerald-400",
                },
              ].map((p) => (
                <PersonaCard key={p.role} persona={p} />
              ))}
            </div>
          </CanvasSection>

          {/* ════ 06 · USER JOURNEY ════ */}
          <CanvasSection label="06" title="User Journey" icon={Map}>
            <div className="space-y-6">
              <p className="text-[15px] leading-[1.8] text-slate-500 max-w-2xl">
                Core journey: an employee logging in, applying for leave, getting manager approval, and downloading their payslip.
              </p>
              <div className="overflow-x-auto pb-2">
                <div className="flex items-start gap-0 min-w-[700px]">
                  {[
                    { step: "Login", icon: "🔐", note: "SSO or email login" },
                    { step: "Dashboard", icon: "📊", note: "Overview widgets" },
                    { step: "Apply Leave", icon: "📅", note: "Calendar picker" },
                    { step: "Manager Approval", icon: "✅", note: "Push notification" },
                    { step: "Leave Approved", icon: "🎉", note: "Status updated" },
                    { step: "Figma Generated", icon: "📄", note: "Auto payslip" },
                    { step: "Download Payslip", icon: "⬇️", note: "PDF export" },
                    { step: "Employee Happy", icon: "😊", note: "Task complete" },
                  ].map((step, i, arr) => (
                    <div key={step.step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-accent/30 flex items-center justify-center text-lg shadow-sm">
                          {step.icon}
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight">
                          {step.step}
                        </span>
                        <span className="text-[9px] text-slate-400 text-center">{step.note}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-full flex-none" style={{ width: "24px" }}>
                          <div className="h-px bg-accent/30 w-full mt-[-28px]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CanvasSection>

          {/* ════ 07 · INFORMATION ARCHITECTURE ════ */}
          <CanvasSection label="07" title="Information Architecture" icon={Layers} tinted>
            <div className="space-y-6">
              <p className="text-[15px] leading-[1.8] text-slate-500 max-w-2xl">
                The platform is structured around four primary modules, accessible from a persistent sidebar.
              </p>
              <div className="rounded-2xl border border-slate-100 overflow-hidden">
                {/* Root nav */}
                <div className="bg-slate-800 text-white px-6 py-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm font-semibold tracking-wide">HRMS Dashboard</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-slate-100">
                  {[
                    {
                      module: "Attendance Module",
                      items: ["Daily Check-in/Out", "Monthly Log", "Attendance Reports", "Settings"],
                      accent: "border-t-2 border-t-orange-400",
                    },
                    {
                      module: "Leave Module",
                      items: ["Apply Leave", "Approval Queue", "Team Calendar", "Leave Balance"],
                      accent: "border-t-2 border-t-blue-400",
                    },
                    {
                      module: "Pre-Onboarding",
                      items: ["Document Upload", "Checklist", "Welcome Guide", "IT Setup"],
                      accent: "border-t-2 border-t-emerald-400",
                    },
                    {
                      module: "Payroll Module",
                      items: ["Salary Breakdown", "Payslip Archive", "Tax Details", "Download PDF"],
                      accent: "border-t-2 border-t-purple-400",
                    },
                  ].map(({ module, items, accent }) => (
                    <div key={module} className={`p-5 bg-white ${accent}`}>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-4">
                        {module}
                      </div>
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                            <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {/* Bottom nav */}
                <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex gap-8">
                  {["Employee Profile", "Notifications", "Settings"].map((item) => (
                    <span key={item} className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CanvasSection>

          {/* ════ 08 · WIREFRAMES ════ */}
          <CanvasSection label="08" title="Wireframes — Low Fidelity" icon={FileText}>
            <div className="space-y-5">
              <p className="text-[15px] leading-[1.8] text-slate-500 max-w-2xl">
                Early wireframes focused on layout logic, information density, and navigation patterns before adding any visual polish.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  "Attendance Dashboard",
                  "Leave Dashboard",
                  "Apply Leave",
                  "Payroll",
                  "Pre-Onboarding",
                ].map((label) => (
                  <WireframeCard key={label} label={label} />
                ))}
              </div>
            </div>
          </CanvasSection>

          {/* ════ 09 · HIGH FIDELITY UI ════ */}
          <CanvasSection label="09" title="High Fidelity UI" icon={Monitor} tinted>
            <div className="space-y-8">
              <p className="text-[15px] leading-[1.8] text-slate-500 max-w-2xl">
                Final screens across all four HRMS modules, designed in Figma with consistent spacing, color, and interaction patterns.
              </p>
              {/* Main screens grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.decisions.map((d) => (
                  <HiFiCard key={d.title} decision={d} />
                ))}
                {/* Additional HiFi screens */}
                {[
                  { title: "Attendance Dashboard", img: "/images/hrms/attendance.png" },
                  { title: "Payroll View", img: "/images/hrms/payroll.png" },
                  { title: "Pre-Onboarding", img: "/images/hrms/preonboarding.png" },
                ].slice(0, Math.max(0, 6 - project.decisions.length)).map((s) => (
                  <HiFiCard key={s.title} decision={{ title: s.title, detail: "", image: s.img }} />
                ))}
              </div>

              {/* Cover hero screen */}
              {project.coverImage && (
                <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm mt-2">
                  <img
                    src={project.coverImage}
                    alt="HRMS Dashboard Overview"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="bg-slate-50 border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
                    Full dashboard overview — Attendance, Leave &amp; Payroll modules
                  </div>
                </div>
              )}
            </div>
          </CanvasSection>

          {/* ════ 10 · DESIGN SYSTEM ════ */}
          <CanvasSection label="10" title="Design System" icon={Palette}>
            <div className="space-y-10">
              {/* Colors */}
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-4">Colours</div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "Primary", color: "#dc7850" },
                    { name: "Secondary", color: "#6366f1" },
                    { name: "Success", color: "#22c55e" },
                    { name: "Warning", color: "#f59e0b" },
                    { name: "Danger", color: "#ef4444" },
                    { name: "Slate 900", color: "#0f172a" },
                    { name: "Slate 100", color: "#f1f5f9" },
                  ].map(({ name, color }) => (
                    <div key={name} className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 h-12 rounded-xl border border-slate-100 shadow-sm"
                        style={{ background: color }}
                      />
                      <span className="text-[9px] text-slate-400 text-center">{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-4">Typography</div>
                <div className="space-y-3">
                  {[
                    { label: "H1 — Display", style: "text-3xl font-bold text-slate-900", sample: "Attendance Dashboard" },
                    { label: "H2 — Heading", style: "text-xl font-semibold text-slate-800", sample: "Leave Summary" },
                    { label: "Body", style: "text-sm text-slate-600", sample: "Your leave balance has been updated." },
                    { label: "Caption", style: "text-xs text-slate-400", sample: "Last updated 2 hours ago" },
                  ].map(({ label, style, sample }) => (
                    <div key={label} className="flex items-baseline gap-6 py-3 border-b border-slate-50">
                      <span className="text-[9px] uppercase tracking-wider text-slate-300 font-medium w-28 shrink-0">{label}</span>
                      <span className={style}>{sample}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-4">Buttons</div>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-full bg-[#dc7850] text-white px-5 py-2 text-sm font-medium">Primary</button>
                  <button className="rounded-full border-2 border-[#dc7850] text-[#dc7850] px-5 py-2 text-sm font-medium">Secondary</button>
                  <button className="rounded-full bg-slate-900 text-white px-5 py-2 text-sm font-medium">Dark</button>
                  <button className="rounded-full bg-slate-100 text-slate-600 px-5 py-2 text-sm font-medium">Ghost</button>
                  <button className="rounded-full bg-[#22c55e] text-white px-5 py-2 text-sm font-medium">Success</button>
                  <button className="rounded-full bg-[#ef4444] text-white px-5 py-2 text-sm font-medium">Danger</button>
                </div>
              </div>

              {/* Spacing grid */}
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-4">Spacing Grid</div>
                <div className="flex items-end gap-3">
                  {[4, 8, 12, 16, 24, 32, 48].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-1.5">
                      <div
                        className="bg-accent/20 rounded-sm w-6"
                        style={{ height: `${s * 1.5}px` }}
                      />
                      <span className="text-[9px] text-slate-300">{s}px</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CanvasSection>

          {/* ════ 11 · UX DECISIONS ════ */}
          <CanvasSection label="11" title="UX Decisions" icon={Lightbulb} tinted>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ...project.decisions.map((d) => ({ title: d.title, detail: d.detail })),
                {
                  title: "Leave Balance Card",
                  detail: "Surfaced leave balance counts at the top of the dashboard so employees never need to navigate to a separate screen to check availability.",
                },
                {
                  title: "Approval Timeline",
                  detail: "Visual timeline showing each approval state (Pending → Manager → HR → Approved) to eliminate ambiguity around leave request status.",
                },
                {
                  title: "One-Minute Onboarding",
                  detail: "New hires land on a progress checklist that gamifies document submission — each completed step reveals the next, reducing form abandonment.",
                },
                {
                  title: "Self-Service Portal",
                  detail: "Replaced email-based payslip distribution with an in-app secure download — reducing HR ticket volume by an estimated 40%.",
                },
              ].map(({ title, detail }, i) => (
                <UXDecisionCard key={i} title={title} detail={detail} index={i} />
              ))}
            </div>
          </CanvasSection>

          {/* ════ 12 · ACCESSIBILITY ════ */}
          <CanvasSection label="12" title="Accessibility" icon={Accessibility}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                {[
                  { label: "WCAG 2.1 AA Compliant", desc: "All interactive elements meet minimum contrast requirements of 4.5:1." },
                  { label: "Keyboard Navigation", desc: "Full tab order defined across all forms, modals, and navigation elements." },
                  { label: "Screen Reader Targets", desc: "Touch targets minimum 44×44px on mobile, with ARIA labels on all icons." },
                  { label: "High Contrast Labels", desc: "Error, warning, and status states never rely on colour alone." },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex gap-4">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2} />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{label}</div>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 space-y-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
                  Contrast Check
                </div>
                {[
                  { pair: "White on Accent (#dc7850)", ratio: "3.8:1", pass: false, note: "Large text only" },
                  { pair: "Slate-900 on White", ratio: "19.6:1", pass: true },
                  { pair: "Slate-500 on White", ratio: "4.6:1", pass: true },
                  { pair: "White on Slate-800", ratio: "12.4:1", pass: true },
                ].map(({ pair, ratio, pass, note }) => (
                  <div key={pair} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                    <div>
                      <span className="text-xs text-slate-600">{pair}</span>
                      {note && <span className="text-[10px] text-slate-400 ml-2">({note})</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">{ratio}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${pass ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                        {pass ? "Pass" : "Warn"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CanvasSection>

          {/* ════ 13 · RESPONSIVE DESIGN ════ */}
          <CanvasSection label="13" title="Responsive Design" icon={Smartphone} tinted>
            <div className="space-y-6">
              <p className="text-[15px] leading-[1.8] text-slate-500 max-w-2xl">
                Every module was designed responsively — desktop-first for HR managers, with optimised mobile views for employees on the go.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    device: "Desktop (1440px)",
                    icon: Monitor,
                    desc: "Full sidebar navigation, multi-column data grids, detailed charts and team calendars.",
                    color: "border-blue-100 bg-blue-50/40",
                  },
                  {
                    device: "Tablet (768px)",
                    icon: Tablet,
                    desc: "Collapsible sidebar, stacked grid layouts, touch-optimised approval cards.",
                    color: "border-purple-100 bg-purple-50/40",
                  },
                  {
                    device: "Mobile (375px)",
                    icon: Smartphone,
                    desc: "Bottom tab navigation, card-based leave requests, one-tap check-in widget.",
                    color: "border-emerald-100 bg-emerald-50/40",
                  },
                ].map(({ device, icon: Icon, desc, color }) => (
                  <div key={device} className={`rounded-2xl border p-6 space-y-4 ${color}`}>
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-slate-500" strokeWidth={1.5} />
                      <span className="text-sm font-semibold text-slate-700">{device}</span>
                    </div>
                    <div className="w-full aspect-[4/3] rounded-xl bg-white border border-white/80 shadow-sm flex items-center justify-center">
                      <Icon className="h-8 w-8 text-slate-200" strokeWidth={1} />
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </CanvasSection>

          {/* ════ 14 · KEY OUTCOMES ════ */}
          <CanvasSection label="14" title="Key Outcomes" icon={BarChart3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
              {[
                { stat: "4", label: "Core modules shipped", sub: "Leaves, Attendance, Onboarding, Payroll" },
                { stat: "60%", label: "Faster leave approval", sub: "vs. previous email-based flow" },
                { stat: "45%", label: "Reduction in HR tickets", sub: "Self-service payslip access" },
                { stat: "90%", label: "Payroll processed accurately", sub: "Zero manual calculation errors" },
              ].map(({ stat, label, sub }) => (
                <OutcomeStatCard key={label} stat={stat} label={label} sub={sub} />
              ))}
            </div>
            <div className="space-y-4">
              {project.outcomes.map((o, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="flex gap-4 items-start py-4 border-b border-slate-50 last:border-0">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2} />
                    <p className="text-[15px] text-slate-600 leading-relaxed">{o}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </CanvasSection>

          {/* ════ 15 · FINAL SHOWCASE ════ */}
          <CanvasSection label="15" title="Final Showcase" icon={Sparkles} tinted last>
            <div className="space-y-6">
              <p className="text-[15px] leading-[1.8] text-slate-500 max-w-2xl">
                The completed HRMS platform — all four modules working cohesively as a single product.
              </p>

              {/* Large showcase image */}
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-md">
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt="HRMS Final Product"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-[16/8] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                    <span className="text-slate-300 text-sm uppercase tracking-widest">HRMS Dashboard</span>
                  </div>
                )}
              </div>

              {/* Module thumbnails */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.decisions.map((d) => (
                  <div key={d.title} className="space-y-2">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                      {d.image ? (
                        <img src={d.image} alt={d.title} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <LayoutGrid className="h-6 w-6 text-slate-200" />
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 text-center leading-tight">{d.title}</p>
                  </div>
                ))}
              </div>

              {/* Learnings */}
              <div className="rounded-2xl bg-slate-900 text-white p-8 mt-4 space-y-6">
                <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold">
                  What I learned
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.learnings.map((l, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="font-mono text-accent text-sm font-bold mt-0.5">0{i + 1}</span>
                      <p className="text-sm text-slate-300 leading-relaxed">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CanvasSection>

        </div>{/* end white canvas */}
      </div>

      {/* ── Next project CTA (back on dark) ── */}
      {projects.length > 1 && (
        <div className="mx-auto max-w-7xl px-6 lg:px-28 pb-32">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-surface/10 backdrop-blur-sm p-8 md:p-12 mt-4">
              <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-accent/5 blur-xl pointer-events-none" />
              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">Next case study</div>
                  <div className="mt-3 font-display text-3xl text-foreground font-light">
                    {projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length].title}
                  </div>
                </div>
                <Link
                  to="/projects/$slug"
                  params={{ slug: projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length].slug }}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(220,120,80,0.2)]"
                >
                  Continue reading
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   StockAI — Premium Editorial Dark Case Study
══════════════════════════════════════════════════════════════ */
function StockAICaseStudy({ project }: { project: Project }) {
  const idx  = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const reduced = useReducedMotion();
  const [activeAnno, setActiveAnno] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative w-full"
    >
      {/* ── Back nav ── */}
      <div className="mx-auto max-w-7xl px-6 lg:pl-28 lg:pr-12 pt-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent border border-border/40 bg-surface/15 rounded-full px-4 py-2.5 backdrop-blur-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-accent" /> All projects
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:pl-28 lg:pr-12 pb-40">

        {/* ════ 00 · HERO ════ */}
        <div className="pt-20 pb-24 border-b border-border/20">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-semibold">Case Study</span>
              <span className="text-border/60">·</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-semibold">{project.category}</span>
              <span className="text-border/60">·</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-semibold">{project.year}</span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-light tracking-tight text-foreground leading-[1.0] max-w-4xl">
              StockAI
            </h1>
            <p className="mt-4 font-display text-xl md:text-2xl font-light text-muted-foreground max-w-2xl leading-snug">
              Replacing trading terminals with plain-language AI signals.
            </p>

            {/* Meta row */}
            <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-border/20">
              {[
                { k: "Role", v: "Designer & Developer (solo, full-stack)" },
                { k: "Stack", v: "Next.js, FastAPI, Python, Figma" },
                { k: "Year", v: project.year },
                { k: "GitHub", v: "designerui987-hue/ai-stock-analyzer", href: "https://github.com/designerui987-hue/ai-stock-analyzer.git" },
              ].map(({ k, v, href }) => (
                <div key={k}>
                  <div className="text-[9px] uppercase tracking-[0.22em] text-accent font-semibold mb-1">{k}</div>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground/80 font-light hover:text-accent transition-colors duration-300 inline-flex items-center gap-1"
                    >
                      {v} <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : (
                    <div className="text-sm text-foreground/80 font-light">{v}</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="mt-16 overflow-hidden rounded-3xl border border-border/30 bg-surface/20 p-2 shadow-[0_32px_80px_rgb(0,0,0,0.3)]"
          >
            <img
              src="/images/stockai/dashboard.png"
              alt="StockAI Dashboard"
              className="w-full h-auto object-cover rounded-2xl"
            />
            <p className="px-5 py-3 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.2em]">
              StockAI v1.0 · Dashboard · Demo Mode · NIFTY 50
            </p>
          </motion.div>
        </div>

        {/* ════ 01 · THE PROBLEM ════ */}
        <SASection n="01" label="The Problem">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground leading-[1.1] tracking-tight">
                Most retail investors don't need more charts. They need more clarity.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.85] text-muted-foreground font-light">
              <p>
                Open Zerodha, Groww, or any modern trading terminal, and you are immediately hit by a wall of data. Candlestick charts, MACD oscillators, order book depth, and live tickers vie for attention. While professional day traders command these tools, they overwhelm normal people.
              </p>
              <p className="text-foreground/80">
                Busy professionals simply do not have the time to analyze market trends and technical charts every day. Beginners struggle to parse conflicting financial signals and opinion pieces. As a result, investing today requires jumping between multiple apps, news sites, and chat groups, leading to <em className="not-italic font-normal text-accent">decision fatigue</em> rather than clear confidence.
              </p>
              <p>
                StockAI explores a different path: can a thoughtfully designed workspace synthesize these fragmented inputs into one quiet, decision-support interface? The goal is not to automate the human out of the loop, but to organize data so they can decide with clarity.
              </p>
            </div>
          </div>

          {/* Pain points */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "01", title: "Information overload", body: "Trading terminals show dozens of indicators at once. Normal users have no entry point to begin understanding." },
              { n: "02", title: "Conflicting signals", body: "An investor has to read newsletters, monitor news feeds, and check charts just to answer: should I hold or sell?" },
              { n: "03", title: "Decision paralysis", body: "Fearing they missed a signal, users either make emotional panic trades or fail to take action altogether." },
            ].map((p) => (
              <div key={p.n} className="rounded-2xl border border-border/30 bg-surface/10 p-6 space-y-3">
                <span className="font-mono text-xs text-accent">{p.n}</span>
                <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </SASection>

        {/* ════ 02 · WHY I BUILT STOCKAI ════ */}
        <SASection n="02" label="Why I Built StockAI">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground leading-[1.1] tracking-tight">
                Curiosity, complexity, and a personal challenge.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.85] text-muted-foreground font-light">
              <p>
                This project was born out of my own frustration. When I first started looking at the stock market, I realized that modern platforms make you feel like you are looking at a dashboard in a nuclear power plant. The learning curve is steep, and the noise is deafening.
              </p>
              <p>
                I observed my friends—busy professionals who wanted to manage their savings—spending hours scrolling through forums trying to decode technical terms. Experienced investors were equally stressed, manually tracking indicators in spreadsheet templates.
              </p>
              <p className="text-foreground/80">
                I wanted to see if good design could bridge this gap. I set a challenge for myself: build a platform that presents complex stock analysis as if it were a clean, quiet document. That curiosity drove me to build StockAI end-to-end, writing both the design tokens and the API pipelines.
              </p>
            </div>
          </div>
        </SASection>

        {/* ════ 03 · PRODUCT VISION ════ */}
        <SASection n="03" label="Product Vision">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.85] text-muted-foreground font-light">
              <p>
                StockAI is a calm, unified workspace where AI coordinates technical indicators, institutional activity, portfolio data, and financial context into a single legible experience.
              </p>
              <p className="text-foreground/80">
                We believe that the value of an interface lies in what it helps you filter out. By reducing cognitive friction and presenting explainable signals, the workspace helps users make structured decisions without feeling overwhelmed by raw numbers.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-6 space-y-4">
                <div className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">Vision Statement</div>
                <p className="text-lg font-display font-light text-foreground leading-snug">
                  "Create a calm workspace where AI organizes technical analysis, market sentiment, portfolio insights, and financial news into one understandable experience."
                </p>
              </div>
            </div>
          </div>
        </SASection>

        {/* ════ 04 · USER TYPES ════ */}
        <SASection n="04" label="User Types">
          <div className="space-y-10">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl font-light text-foreground leading-[1.1] mb-5">
                Two perspectives, one shared interface.
              </h2>
              <p className="text-[15px] leading-[1.85] text-muted-foreground font-light">
                We design for two core personas. Both want better decision-making capabilities, but they approach the market with different constraints and levels of trust.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "The Busy Investor",
                  desc: "Needs quick confidence without spending hours analyzing raw data every single day.",
                  needs: [
                    "A 10-second summary of overall market direction.",
                    "Quick validation of existing portfolio alerts.",
                    "Actionable stock picks with clear, digestible rationale."
                  ],
                  feature: "Supported by: The macro index strip, high-confidence alert list, and direct AI picks."
                },
                {
                  title: "The Beginner Investor",
                  desc: "Needs explanations instead of raw indicators to build long-term confidence.",
                  needs: [
                    "Translating complex numbers into simple directions.",
                    "Understanding why a stock is recommended (not just a tip).",
                    "A quiet layout that doesn't trigger panic when red flags appear."
                  ],
                  feature: "Supported by: Plain-English reason strings and explainable confidence indicators."
                }
              ].map((user) => (
                <div key={user.title} className="rounded-2xl border border-border/30 bg-surface/10 p-6 md:p-8 space-y-6">
                  <div>
                    <h3 className="font-display text-2xl text-foreground font-light mb-2">{user.title}</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{user.desc}</p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-border/15">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-accent font-semibold">Core Needs</span>
                    <ul className="space-y-2">
                      {user.needs.map((need, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground font-light leading-relaxed">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0 mt-1.5" />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-border/15">
                    <p className="text-xs font-mono text-muted-foreground/60 italic">{user.feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SASection>

        {/* ════ 05 · PRODUCT GOALS ════ */}
        <SASection n="05" label="Product Goals">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-4xl font-light text-foreground leading-[1.1]">
                Designing for outcomes, not features.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-0">
                {[
                  { goal: "Reduce decision fatigue", detail: "Avoid walls of charts. Consolidate technical data, flows, and news into a structured grid that answers key questions directly." },
                  { goal: "Make AI explainable", detail: "Never display isolated signals. Provide a specific confidence rating and a plain-English rationale for every pick." },
                  { goal: "Establish visual trust", detail: "Design a clean, restrained dark layout. Use color intentionally (green/red only for actions, never for decoration) to prevent emotional panic." },
                  { goal: "Simplify financial structures", detail: "Turn fragmented institutional data, moving averages, and sentiment scores into cohesive components that require no trading background." },
                  { goal: "Support faster daily check-ins", detail: "Layout sections logically so users can scan indexes, review their portfolio status, and read alerts in under a minute." },
                ].map((item, i) => (
                  <div key={item.goal} className="flex gap-6 py-5 border-b border-border/20 last:border-b-0">
                    <span className="font-mono text-xs text-accent/60 shrink-0 mt-0.5">0{i + 1}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{item.goal}</h3>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SASection>

        {/* ════ 06 · INFORMATION ARCHITECTURE ════ */}
        <SASection n="06" label="Information Architecture">
          <div className="space-y-10">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl font-light text-foreground leading-[1.1] mb-5">
                The layout is a product decision, not a template.
              </h2>
              <p className="text-[15px] leading-[1.85] text-muted-foreground font-light">
                The layout hierarchy mimics the steps an investor takes when triaging their day. We move systematically from high-level market context down to individual decisions.
              </p>
            </div>

            {/* IA flow diagram */}
            <div className="rounded-2xl border border-border/30 bg-surface/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-border/20 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Information Hierarchy & Rationale</span>
              </div>
              <div className="p-6">
                {[
                  { level: "L1 · Macro Context", items: ["NIFTY 50", "SENSEX", "BANKNIFTY", "NIFTYIT"], note: "Provides immediate context on whether the broader market is up or down before analyzing single assets." },
                  { level: "L2 · Market Movers", items: ["Top Gainers", "Top Losers"], note: "Establishes daily momentum, highlighting which sectors are attracting capital today." },
                  { level: "L3 · Personal Stake", items: ["Portfolio Value", "Overall P&L", "Daily returns"], note: "Tells the user exactly how their capital is performing relative to the macro trends." },
                  { level: "L4 · Action Alerts", items: ["BUY Triggers", "Breakout alerts", "Risk Warnings"], note: "High-priority items requiring immediate attention or tactical adjustments." },
                  { level: "L5 · AI Picks", items: ["Ticker symbol", "Action badge", "Confidence %", "Plain-English reason"], note: "Synthesized recommendation signals with transparent confidence ratings." },
                  { level: "L6 · Underlying Sentiment", items: ["Score", "FII flows", "DII flows", "PCR & VIX"], note: "Exposes the institutional trends that confirm or challenge individual signals." },
                ].map((row, i) => (
                  <div key={row.level} className={`flex gap-6 items-start py-4 ${i < 5 ? 'border-b border-border/15' : ''}`}>
                    <div className="w-28 shrink-0">
                      <span className="text-[9px] font-mono text-accent uppercase tracking-wider">{row.level}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {row.items.map(item => (
                        <span key={item} className="rounded-full border border-border/40 bg-background/30 px-2.5 py-1 text-[10px] font-mono text-foreground/70">{item}</span>
                      ))}
                    </div>
                    <div className="hidden lg:block w-56 shrink-0">
                      <p className="text-[10px] text-muted-foreground/60 font-light leading-relaxed italic">{row.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SASection>

        {/* ════ 07 · DASHBOARD OVERVIEW ════ */}
        <SASection n="07" label="Dashboard Overview">
          <div className="space-y-10">
            <h2 className="font-display text-4xl font-light text-foreground max-w-xl leading-[1.1]">
              A synthesized canvas for stock triage.
            </h2>

            {/* Full dashboard screenshot */}
            <div className="relative rounded-3xl border border-border/30 bg-surface/20 p-2 overflow-hidden">
              <img
                src="/images/stockai/dashboard.png"
                alt="StockAI Dashboard layout"
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent rounded-b-2xl" />
            </div>

            {/* Section-by-section breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Index Strip", tag: "L1", body: "Live indices (NIFTY 50, SENSEX) display the macro trend. Placed at the top because individual assets cannot be evaluated without knowing the market's direction." },
                { title: "Top Movers", tag: "L2", body: "Gainers and losers panels ranked by price change. Helps users identify market momentum and sector rotation in real time." },
                { title: "Portfolio Health", tag: "L3", body: "A summary of performance metrics. Designed as a quick health check rather than a complex grid to prevent daily over-trading." },
                { title: "Alerts Panel", tag: "L4", body: "Color-coded list of breakout alerts and risk flags. Severity-ranked so that critical, time-sensitive signals catch the eye first." },
                { title: "AI Recommendations", tag: "L5", body: "The core platform widget. Combines ticker, action badge, confidence score, and explainable reasons into a single, clean table." },
                { title: "Market Sentiment", tag: "L6", body: "Translates institutional data (FII/DII net, PCR, VIX) into a simple, directional gauge, providing context behind AI recommendations." },
              ].map((panel) => (
                <div key={panel.title} className="rounded-2xl border border-border/30 bg-surface/10 p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-2 py-0.5 text-[8px] font-mono text-accent uppercase tracking-wider">{panel.tag}</span>
                    <h3 className="text-sm font-semibold text-foreground">{panel.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">{panel.body}</p>
                </div>
              ))}
            </div>
          </div>
        </SASection>

        {/* ════ 08 · AI DECISION SYSTEM ════ */}
        <SASection n="08" label="AI Decision System">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-display text-4xl font-light text-foreground leading-[1.1]">
                Exposing the model's reasoning chain in the UI.
              </h2>
              <p className="text-[15px] leading-[1.85] text-muted-foreground font-light">
                Black-box tips invite skepticism. For a user to trust an AI recommendation, they must understand the inputs that triggered the signal.
              </p>
              <p className="text-[15px] leading-[1.85] text-muted-foreground font-light">
                The decision system explicitly avoids black-box labels. Instead, it exposes the confidence score and the underlying technical factors as the core UI hierarchy.
              </p>
            </div>
            <div className="lg:col-span-7">
              {/* AI signal anatomy */}
              <div className="rounded-2xl border border-border/30 bg-surface/10 overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border/20">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">AI Pick · Signal Anatomy</span>
                </div>
                <div className="p-5 space-y-4">
                  {/* Simulated AI pick row */}
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-border/20 bg-background/30 transition-colors duration-[180ms]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`font-mono text-sm font-bold rounded px-1.5 py-0.5 transition-all duration-[180ms] ${activeAnno === "ticker" ? "bg-accent/15 text-accent ring-1 ring-accent/35" : "text-foreground"}`}>
                          TATAMOTORS
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-all duration-[180ms] ${activeAnno === "badge" ? "bg-accent text-accent-foreground ring-4 ring-accent/20 scale-[1.03]" : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"}`}>
                          BUY
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-light">JLR record volumes + EV momentum breakout</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-lg font-display font-light transition-all duration-[180ms] px-1 rounded ${activeAnno === "confidence" ? "text-accent bg-accent/[0.08] ring-1 ring-accent/30" : "text-foreground"}`}>
                        87.2%
                      </div>
                      <div className="text-[9px] text-muted-foreground">confidence</div>
                    </div>
                  </div>
                  {/* Annotation labels */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { key: "ticker", label: "Ticker", note: "Searchable, links to full analysis" },
                      { key: "badge", label: "Action Badge", note: "BUY / HOLD / SELL — never ambiguous" },
                      { key: "confidence", label: "Confidence %", note: "Derived from signal convergence across 6 indicators" },
                    ].map((a) => (
                      <div
                        key={a.label}
                        onMouseEnter={() => setActiveAnno(a.key)}
                        onMouseLeave={() => setActiveAnno(null)}
                        className={`rounded-xl border p-3 space-y-1 cursor-crosshair transition-all duration-[180ms] ${
                          activeAnno === a.key
                            ? "border-accent/40 bg-accent/[0.04] scale-[1.01]"
                            : "border-border/20 bg-background/20"
                        }`}
                      >
                        <div className={`text-[9px] font-mono uppercase tracking-wider transition-colors duration-[180ms] ${activeAnno === a.key ? 'text-accent' : 'text-accent/70'}`}>
                          {a.label}
                        </div>
                        <p className="text-[9px] text-muted-foreground font-light leading-tight">{a.note}</p>
                      </div>
                    ))}
                  </div>
                  {/* Reasoning string callout */}
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4">
                    <div className="text-[9px] font-mono text-amber-500/80 uppercase tracking-wider mb-2">Product Alignment</div>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      The plain-English explanation is generated by mapping top-weighted signals to readable strings. Exposing the reasoning directly on the screen ensures the recommendation is auditable and builds trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signal pipeline */}
          <div className="mt-10 rounded-2xl border border-border/30 bg-surface/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-border/20">
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Signal Pipeline — Data Flow</span>
            </div>
            <div className="flex flex-wrap items-center gap-0 p-6">
              {[
                { step: "Market Data", note: "OHLC, Volume, institutional activity" },
                { step: "Technical Signals", note: "MACD, RSI, and SMA averages" },
                { step: "Confidence Score", note: "Weighted signal calculation" },
                { step: "Reason String", note: "Conversion to readable text" },
                { step: "Action Badge", note: "Threshold assignment (75% / 50%)" },
                { step: "UI Render", note: "Component displays signal card" },
              ].map((s, i, arr) => (
                <div key={s.step} className="flex items-center">
                  <div className="flex flex-col items-center text-center px-3">
                    <div className="w-8 h-8 rounded-full border border-accent/30 bg-accent/[0.06] flex items-center justify-center">
                      <span className="font-mono text-[9px] text-accent">{i + 1}</span>
                    </div>
                    <div className="text-[9px] font-semibold text-foreground mt-2 max-w-[80px] leading-tight">{s.step}</div>
                    <div className="text-[8px] text-muted-foreground/60 mt-1 max-w-[90px] leading-tight">{s.note}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="h-px w-6 bg-border/40 shrink-0 -mt-8" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </SASection>

        {/* ════ 09 · KEY PRODUCT DECISIONS ════ */}
        <SASection n="09" label="Key Product Decisions">
          <div className="space-y-6">
            <h2 className="font-display text-4xl font-light text-foreground max-w-xl leading-[1.1]">
              Strategic product choices behind the layout.
            </h2>
            <div className="space-y-4">
              {[
                {
                  decision: "The AI recommendation is placed first because users primarily visit to answer one question.",
                  why: "Should I buy, hold, or wait? Hiding recommendations below technical charts forces users to scroll and self-triage. Placing explainable picks first delivers immediate utility. The supporting analysis follows to let users verify the recommendation."
                },
                {
                  decision: "Prioritize confidence ratings over isolated BUY/SELL badges.",
                  why: "Binary signals hide uncertainty. By establishing confidence percentages as the primary focus, the system shows that financial predictions are probabilistic. A buy signal at 88% confidence warrants more attention than one at 76%."
                },
                {
                  decision: "Abstract institutional flows into a single Market Sentiment index.",
                  why: "Presenting raw buy/sell values in massive tables causes cognitive fatigue for retail investors. Converting flows, volume, and volatility indexes into a bullish/bearish direction meter provides immediate macro context."
                },
                {
                  decision: "Group alerts by severity rather than chronological order.",
                  why: "Chronological lists force users to scan and evaluate urgency manually. Severity grouping (Action Required → Warnings → Watchlist Alerts) ensures that the most critical risk events are processed first."
                },
                {
                  decision: "Make Demo Mode explicitly clear in the header.",
                  why: "Because money is involved, trust is everything. Displaying a clear, persistent warning that the platform runs in sandboxed mode ensures transparency and prevents any confusion regarding live capital placement."
                },
              ].map((item, i) => (
                <div key={item.decision} className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6 border-b border-border/20 last:border-b-0">
                  <div className="lg:col-span-4 flex gap-4 items-start">
                    <span className="font-mono text-xs text-accent/50 shrink-0 mt-1">0{i + 1}</span>
                    <h3 className="text-sm font-semibold text-foreground leading-snug">{item.decision}</h3>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SASection>

        {/* ════ 10 · DESIGN SYSTEM ════ */}
        <SASection n="10" label="Design System">
          <div className="space-y-10">
            <h2 className="font-display text-4xl font-light text-foreground max-w-xl leading-[1.1]">
              A consistent foundation for data density.
            </h2>

            {/* Color tokens */}
            <div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 font-semibold mb-4">Color Tokens</div>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "Background", hex: "#0A0A0A", cls: "bg-[#0A0A0A] border-white/10" },
                  { name: "Surface", hex: "#111111", cls: "bg-[#111111] border-white/10" },
                  { name: "Border", hex: "#222222", cls: "bg-[#222222] border-white/10" },
                  { name: "Accent", hex: "#DC7850", cls: "bg-[#DC7850] border-transparent" },
                  { name: "Bullish", hex: "#22C55E", cls: "bg-[#22C55E] border-transparent" },
                  { name: "Bearish", hex: "#EF4444", cls: "bg-[#EF4444] border-transparent" },
                  { name: "Foreground", hex: "#F0F0F0", cls: "bg-[#F0F0F0] border-white/10" },
                ].map(({ name, hex, cls }) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl border ${cls}`} />
                    <span className="text-[9px] text-muted-foreground/70 text-center leading-tight max-w-[56px]">{name}</span>
                    <span className="text-[8px] font-mono text-muted-foreground/40">{hex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Type scale */}
            <div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 font-semibold mb-4">Type Scale</div>
              <div className="space-y-3 border-t border-border/20">
                {[
                  { label: "Display", size: "text-5xl", sample: "22,456.8", weight: "font-light" },
                  { label: "Heading", size: "text-2xl", sample: "AI Picks", weight: "font-semibold" },
                  { label: "Body", size: "text-sm", sample: "JLR record volumes + EV momentum breakout", weight: "font-light" },
                  { label: "Caption", size: "text-[10px]", sample: "Last updated 2 min ago", weight: "font-normal" },
                  { label: "Mono / Tag", size: "text-[9px] font-mono", sample: "TATAMOTORS · BUY · 87.2%", weight: "font-medium" },
                ].map(({ label, size, sample, weight }) => (
                  <div key={label} className={`flex items-baseline gap-6 py-3 border-b border-border/15`}>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-semibold w-20 shrink-0">{label}</span>
                    <span className={`${size} ${weight} text-foreground leading-none`}>{sample}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 font-semibold mb-4">8pt Spacing Scale</div>
              <div className="flex items-end gap-3">
                {[8, 16, 24, 32, 40, 48, 64].map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <div className="bg-accent/20 rounded-sm w-5" style={{ height: `${s * 1.2}px` }} />
                    <span className="text-[9px] font-mono text-muted-foreground/50">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SASection>

        {/* ════ 11 · TECHNICAL IMPLEMENTATION ════ */}
        <SASection n="11" label="Technical Implementation">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-5">
              <h2 className="font-display text-4xl font-light text-foreground leading-[1.1]">
                Bridging UI specs and frontend engineering.
              </h2>
              <p className="text-[15px] leading-[1.85] text-muted-foreground font-light">
                Owning both ends of the product exposed how layout choices affect performance, state management, and asset delivery.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  title: "Direct interface contracts",
                  detail: "Figma design tokens map directly to TypeScript constants. Colors, sizes, and spacing definitions remain unified across design file and build output."
                },
                {
                  title: "Motion standards with framer-motion",
                  detail: "Implemented hardware-accelerated transforms for confidence level loading bars and alerts, honoring user reduced-motion preferences automatically."
                },
                {
                  title: "Access-friendly structural foundation",
                  detail: "Based layouts on accessible HTML grid frameworks, ensuring tabular data maintains correct reading hierarchy for assistive technologies."
                },
                {
                  title: "Clean API mapping with FastAPI",
                  detail: "FastAPI endpoints emit JSON matching the data structures required by frontend components. This eliminates translation layers and simplifies state updates."
                },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-5 items-start py-4 border-b border-border/20 last:border-b-0">
                  <span className="font-mono text-xs text-accent/50 shrink-0 mt-0.5">0{i + 1}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SASection>

        {/* ════ 12 · REFLECTION ════ */}
        <SASection n="12" label="Reflection">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground leading-[1.1] tracking-tight">
                Reflections on clarity over charts.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.85] text-muted-foreground font-light">
              <p>
                Building StockAI completely shifted my understanding of dashboard design. I started the project assuming that investors wanted faster tools to scan raw indicators. I realized that users rarely need more information. They need better prioritization.
              </p>
              <p className="text-foreground/80">
                In complex domains like finance, trust, explainability, and visual calm are far more valuable than visual complexity. When we show AI predictions, the transparency of the logic matters as much as the accuracy of the model itself.
              </p>
              <p>
                This first-principles approach—starting with the core user query and designing the visual hierarchy around explainable signals—is a principle I intend to apply to every complex platform interface I design.
              </p>
            </div>
          </div>
        </SASection>

        {/* ════ 13 · WHAT COMES NEXT ════ */}
        <SASection n="13" label="What Comes Next" isLast>
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-display text-4xl font-light text-foreground leading-[1.1]">
                  The next iterations.
                </h2>
                <p className="text-sm text-muted-foreground mt-4 font-light leading-relaxed">
                  While the initial workspace prototype validates the narrative flow, several core product areas require deep refinement before release.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Real investor testing", body: "Conducting user studies to check if investors interpret confidence scores correctly under live market conditions." },
                  { title: "Mobile layout focus", body: "Refining the desktop-first card modules into a clean single-column view optimized for mobile check-ins." },
                  { title: "Explainable onboarding", body: "Designing a step-by-step introduction that explains how signals are generated to prevent skepticism." },
                  { title: "Portfolio insights", body: "Extending AI signals to analyze current holdings and flag rising volatility or divergence warnings." },
                  { title: "Semantic accessibility", body: "Auditing color tokens and table elements to guarantee contrast standards and screen-reader usability." },
                  { title: "AI model clarity", body: "Exposing dynamic signal breakdowns so users can explore the exact factors behind a confidence rating." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border/30 bg-surface/10 p-5 space-y-2">
                    <h3 className="text-xs font-semibold text-foreground">{item.title}</h3>
                    <p className="text-[11px] text-muted-foreground font-light leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SASection>

        {/* Next project */}
        {projects.length > 1 && (
          <Reveal className="mt-16 border-t border-border/30 pt-12">
            <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-surface/10 backdrop-blur-sm p-8 md:p-12">
              <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-accent/5 blur-xl pointer-events-none" />
              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">Next case study</div>
                  <div className="mt-3 font-display text-3xl text-foreground font-light">{next.title}</div>
                </div>
                <Link to="/projects/$slug" params={{ slug: next.slug }} className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(220,120,80,0.2)]">
                  Continue reading
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        )}

      </div>
    </motion.div>
  );
}
/* ══════════════════════════════════════════════════════════════
   Standard (non-HRMS) Case Study
══════════════════════════════════════════════════════════════ */
function StandardCaseStudy({ project }: { project: Project }) {
  const idx  = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: EASE }}
      className="relative mx-auto w-full max-w-6xl px-6 pb-32 pt-16 lg:pl-28 lg:pr-12 lg:pt-24"
    >
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent border border-border/40 bg-surface/15 rounded-full px-4 py-2.5 backdrop-blur-sm"
      >
        <ArrowLeft className="h-3.5 w-3.5 text-accent" /> All projects
      </Link>

      {/* Hero */}
      <Reveal as="section" id="01" className="mt-28 md:mt-36 scroll-mt-28">
        <div className="mb-8 flex items-baseline gap-4 border-b border-border/30 pb-4">
          <span className="font-display text-sm text-accent font-semibold">01</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">Case study</span>
        </div>
        <div className="mt-6 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-3.5 py-1.5 text-[9px] font-semibold tracking-wider text-accent uppercase backdrop-blur-sm">
            <Sparkles className="h-3 w-3" />
            {project.category} · {project.year}
          </div>
          <h1 className="font-display tracking-tight text-foreground leading-[1.0] text-5xl md:text-7xl font-light">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>
        <div className="mt-14 overflow-hidden rounded-3xl border border-border/40 bg-surface/30 p-2 backdrop-blur-sm">
          {project.coverImage ? (
            <img src={project.coverImage} alt={project.title} className="w-full h-auto object-cover aspect-[16/9] rounded-2xl" />
          ) : (
            <PlaceholderCard label={`${project.cover} — Hero`} aspect="aspect-[16/9]" />
          )}
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { k: "Role", v: project.role },
            { k: "Tools", v: project.tools.join(", ") },
            { k: "Year", v: project.year },
            { k: "Type", v: project.category },
          ].map(({ k, v }) => (
            <div key={k} className="rounded-2xl border border-border/40 bg-surface/20 backdrop-blur-sm p-5 hover:border-accent/25 transition-all duration-300">
              <div className="text-[9px] uppercase tracking-[0.2em] text-accent font-semibold">{k}</div>
              <div className="mt-2 text-sm text-foreground/90 font-medium">{v}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Problem */}
      <Reveal as="section" id="02" className="mt-28 md:mt-36 scroll-mt-28">
        <div className="mb-8 flex items-baseline gap-4 border-b border-border/30 pb-4">
          <span className="font-display text-sm text-accent font-semibold">02</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">Problem</span>
        </div>
        <h2 className="mb-8 max-w-3xl font-display text-3xl leading-tight text-foreground font-light md:text-4xl">What I was actually solving</h2>
        <p className="max-w-3xl text-base leading-relaxed text-foreground/80 md:text-lg font-light">{project.problem}</p>
      </Reveal>

      {/* Constraints */}
      <Reveal as="section" id="03" className="mt-28 md:mt-36 scroll-mt-28">
        <div className="mb-8 flex items-baseline gap-4 border-b border-border/30 pb-4">
          <span className="font-display text-sm text-accent font-semibold">03</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">Constraints</span>
        </div>
        <h2 className="mb-8 max-w-3xl font-display text-3xl leading-tight text-foreground font-light md:text-4xl">What I had to work within</h2>
        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2" stagger={0.05}>
          {project.constraints.map((c, i) => (
            <motion.div key={i} variants={staggerItem} className="flex gap-4 rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-sm p-6 hover:border-accent/20 transition-all duration-300">
              <span className="font-display text-sm text-accent font-semibold">0{i + 1}</span>
              <p className="text-sm leading-relaxed text-foreground/90">{c}</p>
            </motion.div>
          ))}
        </Stagger>
      </Reveal>

      {/* Process */}
      <Reveal as="section" id="04" className="mt-28 md:mt-36 scroll-mt-28">
        <div className="mb-8 flex items-baseline gap-4 border-b border-border/30 pb-4">
          <span className="font-display text-sm text-accent font-semibold">04</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">Process</span>
        </div>
        <h2 className="mb-8 max-w-3xl font-display text-3xl leading-tight text-foreground font-light md:text-4xl">The choices that shaped it</h2>
        <Stagger className="grid grid-cols-1 gap-6" stagger={0.06}>
          {project.decisions.map((d, i) => (
            <motion.article key={i} variants={staggerItem} className="rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-sm p-6 md:p-8 hover:border-accent/20 transition-all duration-300">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-sm text-accent font-semibold">0{i + 1}</span>
                <h3 className="font-display text-2xl text-foreground font-medium">{d.title}</h3>
              </div>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{d.detail}</p>
              {d.image && (
                <div className="mt-8 overflow-hidden rounded-2xl border border-border/40 bg-background/55">
                  <img src={d.image} alt={d.title} className="w-full h-auto object-cover max-w-full aspect-[16/10]" loading="lazy" />
                  {d.caption && <p className="border-t border-border/30 bg-surface/20 px-5 py-3.5 text-xs text-muted-foreground">{d.caption}</p>}
                </div>
              )}
            </motion.article>
          ))}
        </Stagger>
      </Reveal>

      {/* Outcomes */}
      <Reveal as="section" id="05" className="mt-28 md:mt-36 scroll-mt-28">
        <div className="mb-8 flex items-baseline gap-4 border-b border-border/30 pb-4">
          <span className="font-display text-sm text-accent font-semibold">05</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">Outcome &amp; learnings</span>
        </div>
        <h2 className="mb-8 max-w-3xl font-display text-3xl leading-tight text-foreground font-light md:text-4xl">What happened, what I'd change</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            { label: "Outcome", items: project.outcomes },
            { label: "What I learned", items: project.learnings },
          ].map(({ label, items }) => (
            <div key={label} className="rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-sm p-6 md:p-8">
              <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />{label}
              </div>
              <ul className="mt-6 space-y-4">
                {items.map((o, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Next */}
      {projects.length > 1 && (
        <Reveal className="mt-28 border-t border-border/30 pt-12">
          <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-surface/10 backdrop-blur-sm p-8 md:p-12">
            <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-accent/5 blur-xl pointer-events-none" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">Next case study</div>
                <div className="mt-3 font-display text-3xl text-foreground font-light">{next.title}</div>
              </div>
              <Link to="/projects/$slug" params={{ slug: next.slug }} className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(220,120,80,0.2)]">
                Continue reading
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      )}
    </motion.div>
  );
}
