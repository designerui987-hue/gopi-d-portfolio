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
        { property: "og:image", content: p.coverImage || "/images/hrms/cover.png" },
        { name: "twitter:image", content: p.coverImage || "/images/hrms/cover.png" },
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

  return isHRMS ? (
    <HRMSCaseStudy project={project} />
  ) : (
    <StandardCaseStudy project={project} />
  );
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
   Canvas primitives
══════════════════════════════════════════════════════════════ */

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
