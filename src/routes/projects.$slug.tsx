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
import { useRef } from "react";
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
                { k: "Role", v: project.role },
                { k: "Stack", v: "Next.js, FastAPI, Python, Figma" },
                { k: "Year", v: project.year },
                { k: "Scope", v: "End-to-end solo product" },
              ].map(({ k, v }) => (
                <div key={k}>
                  <div className="text-[9px] uppercase tracking-[0.22em] text-accent font-semibold mb-1">{k}</div>
                  <div className="text-sm text-foreground/80 font-light">{v}</div>
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

        {/* ════ 01 · THE CHALLENGE ════ */}
        <SASection n="01" label="The Challenge">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground leading-[1.1] tracking-tight">
                Data was never the problem. Interpretation was.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.85] text-muted-foreground font-light">
              <p>
                Most retail investors open a stock app and see a wall of numbers: OHLC charts, order book depth, RSI curves, moving averages, Bollinger bands. Professional traders understand these tools. Everyone else is guessing.
              </p>
              <p className="text-foreground/80">
                The real question a first-time NIFTY 50 investor has is simple: <em className="not-italic font-normal text-accent">"Should I buy this stock today, and why?"</em> No existing retail platform answers that question directly. They all hand you more raw data instead.
              </p>
              <p>
                StockAI was built to answer that question — clearly, with visible reasoning, without hiding the model's uncertainty behind a false sense of authority.
              </p>
            </div>
          </div>

          {/* Pain points */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "01", title: "Information overload", body: "Zerodha, Groww, and Upstox show raw charts and indicators. Beginners have no entry point." },
              { n: "02", title: "Black-box AI signals", body: "Some platforms offer 'AI tips' with no explanation. Trust in an opaque signal is close to zero." },
              { n: "03", title: "Fragmented context", body: "Market sentiment, institutional flows, and stock-specific signals live in separate tools, requiring manual aggregation." },
            ].map((p) => (
              <div key={p.n} className="rounded-2xl border border-border/30 bg-surface/10 p-6 space-y-3">
                <span className="font-mono text-xs text-accent">{p.n}</span>
                <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </SASection>

        {/* ════ 02 · OPPORTUNITY ════ */}
        <SASection n="02" label="Opportunity">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.85] text-muted-foreground font-light">
              <p>
                The opportunity was not to build a better trading terminal. It was to build a completely different kind of product — one that treats AI as a translator, converting market complexity into human-readable signals.
              </p>
              <p className="text-foreground/80">
                The differentiator would be <em className="not-italic font-normal text-accent">explainability</em>. Every recommendation would show its confidence score, the specific market factors driving it, and a one-line plain-English reason. The interface would never tell users to trust the AI — it would show them exactly why the signal was generated.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-6 space-y-4">
                <div className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">Design Hypothesis</div>
                <p className="text-lg font-display font-light text-foreground leading-snug">
                  "If I show users not just what the AI recommends but precisely why it made that call, they will act with more confidence and make fewer panic decisions."
                </p>
              </div>
            </div>
          </div>
        </SASection>

        {/* ════ 03 · MY ROLE ════ */}
        <SASection n="03" label="My Role">
          <div className="space-y-8">
            <h2 className="font-display text-4xl font-light text-foreground max-w-lg leading-[1.1]">
              I owned everything.
            </h2>
            <p className="text-[15px] leading-[1.85] text-muted-foreground font-light max-w-3xl">
              This was a solo end-to-end project. There was no PM, no engineering team, no design review. Every decision was mine — which is both liberating and clarifying. When you build the backend, you design with awareness of what state is actually available. When you design the component, you know which props the API will return.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { area: "Product Strategy", detail: "Defined scope, cut features, chose what not to build" },
                { area: "UX Architecture", detail: "Designed the information hierarchy and component system" },
                { area: "Frontend Dev", detail: "Built in Next.js with TypeScript, shadcn/ui, Framer Motion" },
                { area: "Backend / AI", detail: "FastAPI server serving real market signals from Python" },
              ].map((r) => (
                <div key={r.area} className="rounded-2xl border border-border/30 bg-surface/10 p-5 space-y-2">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-accent font-semibold">{r.area}</div>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </SASection>

        {/* ════ 04 · PRODUCT GOALS ════ */}
        <SASection n="04" label="Product Goals">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-4xl font-light text-foreground leading-[1.1]">
                What "done" actually meant.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-0">
                {[
                  { goal: "Answer the entry question", detail: "A non-expert investor should be able to open the dashboard and understand within 10 seconds whether the market is favorable today." },
                  { goal: "Expose AI reasoning", detail: "Every signal must show its confidence percentage and a plain-English explanation. No black-box outputs." },
                  { goal: "Unify fragmented data", detail: "Market indices, top movers, portfolio value, institutional flows, and AI picks — one canvas, one scroll." },
                  { goal: "Build component-first", detail: "Every UI element maps to a TypeScript interface. The design file is also a spec document." },
                  { goal: "Make trust earnable", detail: "The system should be honest about uncertainty. Low-confidence signals should look different from high-confidence ones." },
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

        {/* ════ 05 · INFORMATION ARCHITECTURE ════ */}
        <SASection n="05" label="Information Architecture">
          <div className="space-y-10">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl font-light text-foreground leading-[1.1] mb-5">
                The layout is a decision, not a default.
              </h2>
              <p className="text-[15px] leading-[1.85] text-muted-foreground font-light">
                Every section on the dashboard was placed in a deliberate order. The hierarchy maps to how a trader actually processes the market — moving from macro context to individual opportunities.
              </p>
            </div>

            {/* IA flow diagram */}
            <div className="rounded-2xl border border-border/30 bg-surface/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-border/20 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Dashboard — Information Hierarchy</span>
              </div>
              <div className="p-6">
                {[
                  { level: "L1 · Macro", items: ["NIFTY 50", "SENSEX", "BANKNIFTY", "NIFTYIT"], note: "Immediate market context — are we up or down?" },
                  { level: "L2 · Movers", items: ["Top Gainers", "Top Losers"], note: "Where is momentum today?" },
                  { level: "L3 · Portfolio", items: ["Current Value", "Total P&L", "Today's P&L"], note: "User's personal stake in the market" },
                  { level: "L4 · Alerts", items: ["Buy Signals", "Breakout Alerts", "Risk Warnings"], note: "Action-required events, time-sensitive" },
                  { level: "L5 · AI Picks", items: ["Stock", "Action Badge", "Confidence %", "Plain-English Reason"], note: "Synthesised recommendations with visible reasoning" },
                  { level: "L6 · Sentiment", items: ["Bullish/Bearish Score", "FII Net", "DII Net", "PCR", "VIX"], note: "Institutional context — secondary, not primary" },
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

        {/* ════ 06 · DASHBOARD BREAKDOWN ════ */}
        <SASection n="06" label="Dashboard Breakdown">
          <div className="space-y-10">
            <h2 className="font-display text-4xl font-light text-foreground max-w-xl leading-[1.1]">
              What each panel actually does.
            </h2>

            {/* Full dashboard screenshot with annotations */}
            <div className="relative rounded-3xl border border-border/30 bg-surface/20 p-2 overflow-hidden">
              <img
                src="/images/stockai/dashboard.png"
                alt="StockAI Dashboard annotated"
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent rounded-b-2xl" />
            </div>

            {/* Section-by-section breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Index Strip", tag: "L1", body: "Four live index cards (NIFTY 50, SENSEX, BANKNIFTY, NIFTYIT) with percentage change. Shown first because they set the entire market context before any individual stock." },
                { title: "Top Gainers / Losers", tag: "L2", body: "Side-by-side panels with percentage change and price. Ranked by day's movement. This is where momentum traders look first." },
                { title: "Portfolio Card", tag: "L3", body: "Invested vs current value, total return percentage. Intentionally minimal — the goal is a quick health check, not a detailed breakdown." },
                { title: "Alerts Panel", tag: "L4", body: "Colour-coded by severity: BUY signal (green), Breakout (amber), SELL signal (red), Risk Warning (orange). Never more than 4 alerts visible without scroll." },
                { title: "AI Picks Panel", tag: "L5", body: "The core differentiator. Each row shows a stock ticker, an action badge (BUY/HOLD/SELL), confidence percentage, and a one-line plain-English reason for the signal." },
                { title: "Market Sentiment", tag: "L6", body: "A circular gauge scoring the market from 0–100, labeled Bullish or Bearish. Below: FII Net, DII Net, PCR, VIX as secondary data. Sentiment is derived, not raw." },
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

        {/* ════ 07 · AI DECISION SYSTEM ════ */}
        <SASection n="07" label="AI Decision System">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-display text-4xl font-light text-foreground leading-[1.1]">
                The model's reasoning is part of the UI.
              </h2>
              <p className="text-[15px] leading-[1.85] text-muted-foreground font-light">
                Most AI-powered tools treat the model output as a black box. You get a number or a label. You don't get to understand why.
              </p>
              <p className="text-[15px] leading-[1.85] text-muted-foreground font-light">
                The design decision here was to make explainability a first-class layout element — not an afterthought in a tooltip or a modal.
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
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-border/20 bg-background/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm font-bold text-foreground">TATAMOTORS</span>
                        <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">BUY</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-light">JLR record volumes + EV momentum breakout</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-display font-light text-foreground">87.2%</div>
                      <div className="text-[9px] text-muted-foreground">confidence</div>
                    </div>
                  </div>
                  {/* Annotation labels */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { label: "Ticker", note: "Searchable, links to full analysis" },
                      { label: "Action Badge", note: "BUY / HOLD / SELL — never ambiguous" },
                      { label: "Confidence %", note: "Derived from signal convergence across 6 indicators" },
                    ].map((a) => (
                      <div key={a.label} className="rounded-xl border border-border/20 bg-background/20 p-3 space-y-1">
                        <div className="text-[9px] font-mono text-accent uppercase tracking-wider">{a.label}</div>
                        <p className="text-[9px] text-muted-foreground font-light leading-tight">{a.note}</p>
                      </div>
                    ))}
                  </div>
                  {/* Reasoning string callout */}
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4">
                    <div className="text-[9px] font-mono text-amber-500/80 uppercase tracking-wider mb-2">Key Design Decision</div>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      The one-line plain-English reason (e.g. "JLR record volumes + EV momentum breakout") is not a marketing line. It is a stringified summary of the top 2 signals that crossed the confidence threshold. The backend constructs this string — the frontend renders it without modification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signal pipeline */}
          <div className="mt-10 rounded-2xl border border-border/30 bg-surface/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-border/20">
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Signal Pipeline — How a recommendation is generated</span>
            </div>
            <div className="flex flex-wrap items-center gap-0 p-6">
              {[
                { step: "Market Data", note: "OHLC, Volume, FII/DII flows" },
                { step: "Technical Signals", note: "RSI, MACD, SMA crossovers" },
                { step: "Confidence Score", note: "Signal convergence across 6 factors" },
                { step: "Reason String", note: "Top 2 signals → plain English" },
                { step: "Action Badge", note: "Threshold: BUY > 75%, HOLD 50–75%, SELL < 50%" },
                { step: "UI Render", note: "Component receives typed props" },
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

        {/* ════ 08 · COMPONENT SYSTEM ════ */}
        <SASection n="08" label="Component System">
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-display text-4xl font-light text-foreground leading-[1.1]">
                  Every component is a typed contract.
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.85] text-muted-foreground font-light">
                <p>
                  The component system was designed alongside the TypeScript interfaces, not after them. Every visual decision had to have a corresponding prop. If the design required a confidence percentage, the interface exported a <code className="text-xs bg-surface/40 border border-border/30 rounded px-1.5 py-0.5 font-mono text-accent">confidence: number</code> field.
                </p>
                <p>
                  This constraint eliminated ambiguity during development. The component knew exactly what data it would receive.
                </p>
              </div>
            </div>

            {/* Component map */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  component: "<AIPickRow />",
                  props: ["ticker: string", "action: 'BUY' | 'HOLD' | 'SELL'", "confidence: number", "reason: string"],
                  note: "Core AI recommendation row. Renders action badge, confidence score, and plain-English reason."
                },
                {
                  component: "<IndexCard />",
                  props: ["name: string", "value: number", "change: number", "changePercent: number"],
                  note: "Market index display card with colour-coded positive/negative delta."
                },
                {
                  component: "<SentimentGauge />",
                  props: ["score: number", "label: 'Bullish' | 'Bearish' | 'Neutral'", "fii: number", "dii: number"],
                  note: "Circular gauge translating institutional flow data into a directional market score."
                },
                {
                  component: "<AlertItem />",
                  props: ["type: 'buy' | 'sell' | 'breakout' | 'risk'", "stock: string", "message: string", "timestamp: Date"],
                  note: "Time-sensitive alert item with severity-mapped icon and colour treatment."
                },
              ].map((c) => (
                <div key={c.component} className="rounded-2xl border border-border/30 bg-surface/10 overflow-hidden">
                  <div className="px-5 py-3 border-b border-border/20 bg-background/20">
                    <code className="text-xs font-mono text-accent">{c.component}</code>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {c.props.map(p => (
                        <span key={p} className="font-mono text-[9px] text-muted-foreground/80 border border-border/30 rounded px-2 py-0.5 bg-background/20">{p}</span>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground font-light leading-relaxed">{c.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SASection>

        {/* ════ 09 · KEY DESIGN DECISIONS ════ */}
        <SASection n="09" label="Key Design Decisions">
          <div className="space-y-6">
            <h2 className="font-display text-4xl font-light text-foreground max-w-xl leading-[1.1]">
              The choices that shaped what the product is.
            </h2>
            <div className="space-y-4">
              {[
                {
                  decision: "Sidebar navigation, not top tabs",
                  why: "Top tab navigation collapses on mobile into a hamburger, losing the product's wayfinding entirely. A sidebar with icon-only collapse mode scales from 1440px desktop to 375px mobile without changing the user's mental model."
                },
                {
                  decision: "Confidence score as the primary AI affordance, not the action badge",
                  why: "Users trust a number more than a label when money is involved. The badge (BUY/HOLD/SELL) is a quick visual scan, but the confidence percentage is the actual signal of strength. Leading with the number prevents users from acting on low-confidence recommendations without noticing."
                },
                {
                  decision: "Market Sentiment as a derived score, not raw FII/DII tables",
                  why: "Raw institutional flow data (FII bought ₹647 Cr) means nothing to a retail investor. A derived directional score (72 — Bullish) gives immediate context. The raw numbers appear below for users who want to verify the calculation."
                },
                {
                  decision: "Alerts ranked by severity, not time",
                  why: "Time-ordered alerts force users to manually triage. Severity-ranked alerts (BUY signal → Breakout → SELL → Risk Warning) match the mental hierarchy of trading decisions — act first on the strongest signal, not the newest one."
                },
                {
                  decision: "Demo Mode badge in the header",
                  why: "Trust in a financial product is fragile. Showing a 'Demo Mode · v1.0' badge in the header was a deliberate honesty signal — it tells users explicitly that this data is not live-connected. When the product goes live, the badge changes to 'Market Open' or 'Market Closed', not removed."
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
              Dark + data-dense — without feeling heavy.
            </h2>

            {/* Color tokens */}
            <div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 font-semibold mb-4">Colour Tokens</div>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "Background", hex: "#0A0A0A", cls: "bg-[#0A0A0A] border-white/10" },
                  { name: "Surface", hex: "#111111", cls: "bg-[#111111] border-white/10" },
                  { name: "Border", hex: "#222222", cls: "bg-[#222222] border-white/10" },
                  { name: "Accent / Gold", hex: "#DC7850", cls: "bg-[#DC7850] border-transparent" },
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

        {/* ════ 11 · FRONTEND IMPLEMENTATION ════ */}
        <SASection n="11" label="Frontend Implementation">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-5">
              <h2 className="font-display text-4xl font-light text-foreground leading-[1.1]">
                Design meets the build layer.
              </h2>
              <p className="text-[15px] leading-[1.85] text-muted-foreground font-light">
                Building the frontend myself exposed decisions that look fine in Figma but add engineering complexity — or vice versa, find simpler implementations than the designed spec assumed.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  title: "Component-to-TypeScript mapping",
                  detail: "Every Figma component has a corresponding TypeScript interface. This made the handoff document the actual code — not a separate spec sheet."
                },
                {
                  title: "Framer Motion for state transitions",
                  detail: "Alert items animate in on arrival. Confidence bars fill on mount. These are not decorative — they draw attention to new information without a notification ping."
                },
                {
                  title: "shadcn/ui as the component foundation",
                  detail: "Used shadcn/ui's unstyled primitives (Table, Badge, Tooltip) to avoid rebuilding accessibility behaviour. Custom tokens overrode the visual layer while keeping keyboard nav and ARIA intact."
                },
                {
                  title: "FastAPI backend serving typed responses",
                  detail: "The Python backend returns strictly typed JSON matching the frontend interfaces. No transformation layer needed — the API response structure was co-designed with the UI."
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
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-display text-4xl font-light text-foreground leading-[1.1]">
                  What I'd do differently.
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.85] text-muted-foreground font-light">
                <p>
                  This was a solo prototype with no external user validation. I didn't test the interface with actual NIFTY 50 investors. That's a real gap — I made assumptions about what a "beginner investor" needs that haven't been challenged by real users.
                </p>
                <p className="text-foreground/80">
                  If I were to take this further, I'd run 5 structured interviews with first-time retail investors before building. I'd want to know: do they trust a confidence percentage, or does a number feel arbitrary? Does "plain-English reason" actually reduce cognitive load, or does it just shift the uncertainty somewhere else?
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "No user research", body: "All decisions were based on observed pain points in existing tools, not tested hypotheses. Honest limitation." },
                { title: "No live market testing", body: "The platform runs in demo mode. Real-world latency, API reliability, and stale data edge cases are unresolved." },
                { title: "Mobile view incomplete", body: "The dashboard was designed desktop-first. The mobile breakpoint is functional but not optimised — it's on the roadmap." },
              ].map((r) => (
                <div key={r.title} className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-5 space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">{r.title}</h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </SASection>

        {/* ════ 13 · FINAL THOUGHT ════ */}
        <SASection n="13" label="Final Thought" isLast>
          <div className="max-w-3xl mx-auto text-center space-y-8 py-8">
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground leading-[1.1]">
                AI should explain itself.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-[15px] leading-[1.85] text-muted-foreground font-light max-w-2xl mx-auto">
                The most important design decision in StockAI wasn't the layout or the colour system. It was the conviction that an AI recommendation without a visible reason is just a coin flip with better marketing. Every interface pattern in this product was built around making that reasoning legible.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-[15px] leading-[1.85] text-muted-foreground font-light max-w-2xl mx-auto">
                That's the kind of thinking I want to bring to every product I work on — not just fintech, not just AI interfaces. Good design explains itself.
              </p>
            </Reveal>
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



function HeroSection({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale   = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.06]);
  const yImg    = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-8%"]);

  return (
    <div ref={ref} className="relative">
      {/* Top meta bar */}
      <div className="px-10 pt-12 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-semibold">Case Study</span>
          <span className="text-slate-200">·</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-semibold">{project.category}</span>
          <span className="text-slate-200">·</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-semibold">{project.year}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.05] tracking-tight mt-4 max-w-3xl">
          HRMS
        </h1>
        <h2 className="font-display text-xl md:text-2xl font-light text-slate-500 mt-2">
          Modern Employee Management Platform
        </h2>
        <p className="mt-4 text-base text-slate-500 leading-relaxed max-w-xl">
          Simplifying Attendance, Leaves, Payroll &amp; Employee Onboarding
        </p>

        {/* Quick meta row */}
        <div className="flex flex-wrap gap-8 mt-8 pt-6 border-t border-slate-100">
          {[
            { k: "Role", v: project.role },
            { k: "Duration", v: "8 months" },
            { k: "Tools", v: "Figma, Figma, Lovable" },
            { k: "Platform", v: "Responsive Web" },
          ].map(({ k, v }) => (
            <div key={k}>
              <div className="text-[9px] uppercase tracking-[0.22em] text-slate-400 font-semibold">{k}</div>
              <div className="text-sm text-slate-700 font-medium mt-1">{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero image */}
      <div className="overflow-hidden">
        <motion.div style={{ scale, y: yImg }}>
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto object-cover max-h-[600px]"
            />
          ) : (
            <div className="aspect-[16/7] bg-gradient-to-br from-slate-100 via-slate-50 to-white flex items-center justify-center">
              <span className="text-slate-200 text-sm uppercase tracking-widest">HRMS Dashboard Preview</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function CanvasSection({
  label,
  title,
  icon: Icon,
  children,
  tinted = false,
  last = false,
}: {
  label: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  tinted?: boolean;
  last?: boolean;
}) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE }}
      className={`px-8 md:px-12 lg:px-16 py-16 ${tinted ? "bg-slate-50/60" : "bg-white"} ${!last ? "border-b border-slate-100" : ""}`}
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <div className="flex items-baseline gap-2.5">
          <span className="text-[10px] font-mono text-accent font-semibold">{label}</span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-slate-400 font-semibold">{title}</span>
        </div>
        <div className="flex-1 h-px bg-slate-100 ml-2" />
      </div>

      {children}
    </motion.section>
  );
}

function CanvasPainPoint({ text, index }: { text: string; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
      className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0 group"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 mt-0.5">
        <span className="h-2 w-2 rounded-full bg-red-400" />
      </span>
      <p className="text-[15px] text-slate-600 leading-relaxed">{text}</p>
    </motion.div>
  );
}

function CanvasGoalCard({ goal, detail, index }: { goal: string; detail: string; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
      whileHover={{ y: -3, boxShadow: "0 8px 30px rgb(0,0,0,0.06)" }}
      className="rounded-2xl border border-slate-100 bg-white p-6 space-y-3 cursor-default transition-shadow"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" strokeWidth={2} />
        <span className="text-sm font-semibold text-slate-800 leading-snug">{goal}</span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed pl-7">{detail}</p>
    </motion.div>
  );
}

function PersonaCard({ persona }: {
  persona: {
    role: string; name: string; age: string;
    goal: string; pains: string[];
    color: string; accent: string; dot: string;
  }
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE }}
      whileHover={{ y: -4, boxShadow: "0 12px 36px rgb(0,0,0,0.08)" }}
      className={`rounded-2xl border p-6 space-y-5 cursor-default transition-shadow ${persona.color}`}
    >
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
          <span className="text-lg">👤</span>
        </div>
        <div>
          <div className={`text-sm font-bold ${persona.accent}`}>{persona.name}</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">{persona.role} · {persona.age}y</div>
        </div>
      </div>

      {/* Goal */}
      <div>
        <div className="text-[9px] uppercase tracking-[0.22em] text-slate-400 font-semibold mb-2">Goal</div>
        <p className="text-xs text-slate-600 leading-relaxed">{persona.goal}</p>
      </div>

      {/* Pain points */}
      <div>
        <div className="text-[9px] uppercase tracking-[0.22em] text-slate-400 font-semibold mb-2">Pain Points</div>
        <ul className="space-y-1.5">
          {persona.pains.map((pain) => (
            <li key={pain} className="flex items-center gap-2 text-xs text-slate-600">
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${persona.dot}`} />
              {pain}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function WireframeCard({ label }: { label: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE }}
      whileHover={{ y: -3, boxShadow: "0 8px 24px rgb(0,0,0,0.06)" }}
      className="space-y-2 cursor-default"
    >
      <div className="aspect-[4/3] rounded-xl border border-slate-200 bg-slate-50 overflow-hidden relative">
        {/* Wireframe lines simulation */}
        <div className="absolute inset-3 space-y-2">
          <div className="h-3 bg-slate-200 rounded w-3/4" />
          <div className="h-2 bg-slate-100 rounded w-full" />
          <div className="h-2 bg-slate-100 rounded w-5/6" />
          <div className="h-8 bg-slate-200/60 rounded mt-2" />
          <div className="grid grid-cols-3 gap-1 mt-1">
            <div className="h-6 bg-slate-200/50 rounded" />
            <div className="h-6 bg-slate-200/50 rounded" />
            <div className="h-6 bg-slate-200/50 rounded" />
          </div>
          <div className="h-2 bg-slate-100 rounded w-2/3 mt-1" />
        </div>
      </div>
      <p className="text-[10px] text-slate-400 text-center">{label}</p>
    </motion.div>
  );
}

function HiFiCard({ decision }: { decision: { title: string; detail: string; image?: string; caption?: string } }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgb(0,0,0,0.1)" }}
      className="rounded-xl overflow-hidden border border-slate-100 cursor-default transition-shadow"
    >
      <div className="aspect-[4/3] bg-slate-50 overflow-hidden">
        {decision.image ? (
          <img
            src={decision.image}
            alt={decision.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Monitor className="h-8 w-8 text-slate-200" strokeWidth={1} />
            <span className="text-[9px] text-slate-300 uppercase tracking-widest">{decision.title}</span>
          </div>
        )}
      </div>
      <div className="px-4 py-3 bg-white border-t border-slate-100">
        <p className="text-[11px] text-slate-500 font-medium">{decision.title}</p>
      </div>
    </motion.div>
  );
}

function UXDecisionCard({ title, detail, index }: { title: string; detail: string; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
      whileHover={{ y: -2, boxShadow: "0 6px 24px rgb(0,0,0,0.06)" }}
      className="rounded-2xl border border-slate-100 bg-white p-6 space-y-3 cursor-default transition-shadow"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" strokeWidth={2} />
        <h3 className="text-sm font-semibold text-slate-800 leading-snug">{title}</h3>
      </div>
      <p className="text-[13px] text-slate-500 leading-relaxed pl-7">{detail}</p>
    </motion.div>
  );
}

function OutcomeStatCard({ stat, label, sub }: { stat: string; label: string; sub: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, ease: EASE }}
      className="rounded-2xl border border-slate-100 bg-white p-6 text-center space-y-1.5 shadow-sm"
    >
      <div className="font-display text-4xl font-bold text-accent">{stat}</div>
      <div className="text-sm font-semibold text-slate-700">{label}</div>
      <div className="text-[11px] text-slate-400">{sub}</div>
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
