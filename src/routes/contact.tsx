import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  FileDown,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Reveal, Stagger, staggerItem } from "@/components/reveal";
import { useState } from "react";

const LINKEDIN_URL = "https://www.linkedin.com/in/neeraj-kumar-gopi-b09391331";
const BEHANCE_URL = "https://www.behance.net/neerajgopi";
const EMAIL_ADDRESS = "neerajkumar.gopi2025@gmail.com";
const RESUME_URL = "/neeraj_ui_ux_resume_updaetd_v1_7148.pdf";
const FORMSPREE_URL = "https://formspree.io/f/xpwrjznp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Let's Build Something Worth Remembering — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "The closing chapter of Gopi Neeraj Kumar's product design portfolio. Open for UI/UX roles, product design opportunities, and creative collaborations.",
      },
      { property: "og:title", content: "Let's Build Something Worth Remembering — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "The closing chapter of Gopi Neeraj Kumar's product design portfolio. Open for UI/UX roles, product design opportunities, and creative collaborations.",
      },
    ],
  }),
  component: Contact,
});

type FormState = "idle" | "submitting" | "success" | "error";

const COLLABORATION_CATEGORIES = [
  { num: "01", title: "Product Design", detail: "End-to-end UX/UI strategy & execution" },
  { num: "02", title: "Enterprise Platforms", detail: "Complex workflow simplification & data UI" },
  { num: "03", title: "AI Products", detail: "AI interaction patterns & human-in-the-loop interfaces" },
  { num: "04", title: "Design Systems", detail: "Scalable component libraries & design tokens" },
  { num: "05", title: "UX Strategy", detail: "Information architecture & journey mapping" },
  { num: "06", title: "Freelance Collaborations", detail: "Targeted product design consultations & sprints" },
] as const;

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    else if (name.length > 100) errs.name = "Name must be 100 characters or fewer.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) errs.email = "Please enter a valid email address.";
    else if (email.length > 150) errs.email = "Email must be 150 characters or fewer.";

    if (company && company.length > 100) errs.company = "Company must be 100 characters or fewer.";

    if (!subject.trim()) errs.subject = "Please enter what you are building or looking for.";
    else if (subject.length > 150) errs.subject = "Subject must be 150 characters or fewer.";

    if (!message.trim() || message.trim().length < 10) errs.message = "Message must be at least 10 characters long.";
    else if (message.length > 2000) errs.message = "Message cannot exceed 2000 characters.";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setSubject("");
    setMessage("");
    setFieldErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    // 1. Try local server API endpoint /api/contact first
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, subject, message }),
      });

      if (res.ok) {
        setStatus("success");
        resetForm();
        return;
      }
    } catch {
      // Endpoint fallback
    }

    // 2. Fall back to Formspree if API route is unhandled or in static preview
    try {
      const data = new FormData();
      data.set("name", name);
      data.set("email", email);
      data.set("company", company);
      data.set("subject", subject);
      data.set("message", message);

      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        resetForm();
      } else {
        const json = await res.json().catch(() => ({}));
        const msg =
          Array.isArray(json?.errors)
            ? json.errors.map((err: { message: string }) => err.message).join(", ")
            : "Something went wrong. Please try again or email directly.";
        setErrorMsg(msg);
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <PageShell
      eyebrow="CHAPTER 06 · COLLABORATION"
      title="The Closing Chapter"
      description="An open invitation to build calm, thoughtful digital products together."
    >
      <div className="relative mt-8 sm:mt-12 space-y-28 sm:space-y-36">

        {/* ── SECTION 01: MASSIVE EDITORIAL HERO ── */}
        <section className="space-y-8 sm:space-y-12">
          {/* Dramatic Line-Broken Headline */}
          <Reveal>
            <h1 className="font-display text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.2rem] font-light tracking-tight text-foreground leading-[0.92] select-none">
              Let's build<br />
              products<br />
              <span className="text-accent italic font-normal">worth</span> remembering.
            </h1>
          </Reveal>

          {/* Thoughtful Positioning Paragraph */}
          <Reveal delay={0.25} className="pt-2 sm:pt-4">
            <p className="text-base sm:text-xl md:text-2xl font-light leading-relaxed text-muted-foreground/90 max-w-3xl">
              I enjoy solving meaningful product problems through thoughtful UI/UX design, systems thinking, and close cross-functional collaboration. Whether shaping a new product experience or scaling a complex platform, every great product begins with a quiet conversation.
            </p>
          </Reveal>

          {/* Editorial Specs Bar */}
          <Reveal delay={0.35} className="pt-6 border-t border-border/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground/80">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-foreground font-medium">Available for Opportunities</span>
            </div>

            <div className="flex items-center gap-6">
              <span>LOCATION · VISAKHAPATNAM, INDIA</span>
              <span className="hidden md:inline">&middot;</span>
              <span className="hidden md:inline">RESPONSE · WITHIN 24 HOURS</span>
            </div>
          </Reveal>
        </section>


        {/* ── SECTION 02: EDITORIAL MANIFESTO ── */}
        <section className="border-t border-border/20 pt-20 sm:pt-28 space-y-10 sm:space-y-14">
          <Reveal>
            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-accent font-semibold block mb-4">
              EDITORIAL MANIFESTO
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-foreground tracking-tight max-w-4xl leading-[1.05]">
              Good products begin with understanding, not assumptions.
            </h2>
          </Reveal>

          <Reveal delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 text-sm sm:text-base leading-relaxed text-muted-foreground font-light">
            <div className="space-y-6">
              <p>
                Digital products should not demand attention—they should create space for it. I believe the most effective user interfaces feel invisible, allowing people to focus on their goals without cognitive noise or unnecessary friction.
              </p>
              <p>
                Great design isn't about applying aesthetic trends to wireframes. It is about understanding the core problem, aligning user needs with business strategy, and crafting predictable systems that scale gracefully.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                From enterprise platforms with complex data workflows to consumer products requiring human clarity, I approach every project with curiosity, empathy, and technical awareness for smooth engineering collaboration.
              </p>
              <p className="text-foreground/90 font-normal">
                If you value systems over noise, clarity over complexity, and digital products designed to endure—let's create something exceptional together.
              </p>
            </div>
          </Reveal>
        </section>


        {/* ── SECTION 03: COLLABORATION CATEGORIES (Typographic Layout) ── */}
        <section className="border-t border-border/20 pt-20 sm:pt-28 space-y-12">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-accent font-semibold block">
                COLLABORATION SCOPE
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-light text-foreground tracking-tight mt-2">
                Ways We Can Work Together
              </h3>
            </div>
            <span className="text-xs font-mono text-muted-foreground/70">
              06 EDITORIAL DISCIPLINES
            </span>
          </Reveal>

          {/* Typographic List Layout (No heavy cards!) */}
          <Stagger className="divide-y divide-border/20 border-t border-b border-border/20" stagger={0.06}>
            {COLLABORATION_CATEGORIES.map((cat) => (
              <div
                key={cat.num}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 sm:py-8 gap-4 transition-colors duration-300 hover:bg-surface/10 px-2 sm:px-4"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs font-semibold text-accent/80 group-hover:text-accent transition-colors">
                    {cat.num}
                  </span>
                  <h4 className="font-display text-xl sm:text-3xl text-foreground font-light tracking-tight group-hover:text-accent transition-colors duration-300">
                    {cat.title}
                  </h4>
                </div>
                <span className="text-xs font-mono text-muted-foreground/80 font-light max-w-md sm:text-right group-hover:text-foreground/90 transition-colors">
                  {cat.detail}
                </span>
              </div>
            ))}
          </Stagger>
        </section>


        {/* ── SECTION 04: OVERSIZED DIRECT COMMUNICATION LINKS ── */}
        <section className="border-t border-border/20 pt-20 sm:pt-28 space-y-10">
          <Reveal>
            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-accent font-semibold block mb-2">
              DIRECT COMMUNICATION
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-foreground font-light tracking-tight">
              Preferred Channels
            </h3>
          </Reveal>

          {/* Full-Width Oversized Navigation Links */}
          <div className="divide-y divide-border/25 border-t border-b border-border/25">
            {/* EMAIL */}
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="group flex items-center justify-between py-8 sm:py-12 transition-all duration-300 px-2 hover:px-4"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent block font-semibold">
                  PRIMARY EMAIL
                </span>
                <span className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
                  {EMAIL_ADDRESS}
                </span>
              </div>
              <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent shrink-0 ml-4" />
            </a>

            {/* LINKEDIN */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-8 sm:py-12 transition-all duration-300 px-2 hover:px-4"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent block font-semibold">
                  PROFESSIONAL NETWORK
                </span>
                <span className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
                  LinkedIn
                </span>
              </div>
              <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent shrink-0 ml-4" />
            </a>

            {/* BEHANCE */}
            <a
              href={BEHANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-8 sm:py-12 transition-all duration-300 px-2 hover:px-4"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent block font-semibold">
                  DESIGN PORTFOLIO
                </span>
                <span className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
                  Behance
                </span>
              </div>
              <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent shrink-0 ml-4" />
            </a>

            {/* RESUME */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="group flex items-center justify-between py-8 sm:py-12 transition-all duration-300 px-2 hover:px-4"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent block font-semibold">
                  CURRICULUM VITAE
                </span>
                <span className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
                  Download Resume PDF
                </span>
              </div>
              <FileDown className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-accent shrink-0 ml-4" />
            </a>
          </div>
        </section>


        {/* ── SECTION 05: INVISIBLE EDITORIAL CONTACT FORM ── */}
        <section className="border-t border-border/20 pt-20 sm:pt-28 space-y-12 max-w-4xl mx-auto">
          <Reveal className="space-y-3">
            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-accent font-semibold block">
              INITIATE A CONVERSATION
            </span>
            <h3 className="font-display text-3xl sm:text-5xl font-light text-foreground tracking-tight">
              Tell me about your product or team.
            </h3>
            <p className="text-sm text-muted-foreground font-light">
              Fill out a few details below and I'll respond within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            {status === "success" ? (
              /* Calm, Human Success State */
              <div
                role="alert"
                aria-live="polite"
                className="border-y border-emerald-500/30 py-16 flex flex-col items-center text-center gap-6"
              >
                <div className="h-12 w-12 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" strokeWidth={1.5} />
                </div>
                <div className="space-y-3 max-w-md">
                  <h4 className="font-display text-3xl text-foreground font-light">
                    Thank you for reaching out.
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    I read every message carefully and will respond to your email within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-xs font-mono uppercase tracking-[0.2em] text-accent hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="space-y-10"
              >
                <div className="space-y-8">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Name */}
                    <div className="relative space-y-2">
                      <label
                        htmlFor="c-name"
                        className="block text-[9px] font-mono uppercase tracking-[0.25em] text-accent font-semibold"
                      >
                        Your Name *
                      </label>
                      <input
                        id="c-name"
                        name="name"
                        type="text"
                        placeholder="Alex Morgan"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: "" }));
                        }}
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? "c-name-error" : undefined}
                        disabled={status === "submitting"}
                        className="w-full bg-transparent border-b border-border/30 py-4 text-base sm:text-lg text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-accent transition-colors disabled:opacity-50 font-light"
                      />
                      {fieldErrors.name && (
                        <span id="c-name-error" className="mt-2 block text-xs font-mono text-red-400">
                          {fieldErrors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="relative space-y-2">
                      <label
                        htmlFor="c-email"
                        className="block text-[9px] font-mono uppercase tracking-[0.25em] text-accent font-semibold"
                      >
                        Email Address *
                      </label>
                      <input
                        id="c-email"
                        name="email"
                        type="email"
                        placeholder="alex@company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? "c-email-error" : undefined}
                        disabled={status === "submitting"}
                        className="w-full bg-transparent border-b border-border/30 py-4 text-base sm:text-lg text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-accent transition-colors disabled:opacity-50 font-light"
                      />
                      {fieldErrors.email && (
                        <span id="c-email-error" className="mt-2 block text-xs font-mono text-red-400">
                          {fieldErrors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company (Optional) */}
                  <div className="relative space-y-2">
                    <label
                      htmlFor="c-company"
                      className="block text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground/70 font-semibold"
                    >
                      Company / Organization (Optional)
                    </label>
                    <input
                      id="c-company"
                      name="company"
                      type="text"
                      placeholder="Acme Corp / Linear"
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        if (fieldErrors.company) setFieldErrors((prev) => ({ ...prev, company: "" }));
                      }}
                      aria-invalid={!!fieldErrors.company}
                      aria-describedby={fieldErrors.company ? "c-company-error" : undefined}
                      disabled={status === "submitting"}
                      className="w-full bg-transparent border-b border-border/30 py-4 text-base sm:text-lg text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-accent transition-colors disabled:opacity-50 font-light"
                    />
                    {fieldErrors.company && (
                      <span id="c-company-error" className="mt-2 block text-xs font-mono text-red-400">
                        {fieldErrors.company}
                      </span>
                    )}
                  </div>

                  {/* What are you building? */}
                  <div className="relative space-y-2">
                    <label
                      htmlFor="c-subject"
                      className="block text-[9px] font-mono uppercase tracking-[0.25em] text-accent font-semibold"
                    >
                      What are you building? *
                    </label>
                    <input
                      id="c-subject"
                      name="subject"
                      type="text"
                      placeholder="e.g. Enterprise Platform Redesign / Product Design Role"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        if (fieldErrors.subject) setFieldErrors((prev) => ({ ...prev, subject: "" }));
                      }}
                      aria-invalid={!!fieldErrors.subject}
                      aria-describedby={fieldErrors.subject ? "c-subject-error" : undefined}
                      disabled={status === "submitting"}
                      className="w-full bg-transparent border-b border-border/30 py-4 text-base sm:text-lg text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-accent transition-colors disabled:opacity-50 font-light"
                    />
                    {fieldErrors.subject && (
                      <span id="c-subject-error" className="mt-2 block text-xs font-mono text-red-400">
                        {fieldErrors.subject}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="relative space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="c-msg"
                        className="block text-[9px] font-mono uppercase tracking-[0.25em] text-accent font-semibold"
                      >
                        Tell me about your project or opportunity. *
                      </label>
                      <span className="text-[10px] font-mono text-muted-foreground/60">
                        {message.length} / 2000
                      </span>
                    </div>
                    <textarea
                      id="c-msg"
                      name="message"
                      rows={5}
                      placeholder="Share a few details about product goals, scope, timeline, or open role."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: "" }));
                      }}
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? "c-msg-error" : undefined}
                      disabled={status === "submitting"}
                      className="w-full bg-transparent border-b border-border/30 py-4 text-base sm:text-lg leading-relaxed text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-accent transition-colors resize-none disabled:opacity-50 font-light"
                    />
                    {fieldErrors.message && (
                      <span id="c-msg-error" className="mt-2 block text-xs font-mono text-red-400">
                        {fieldErrors.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="flex items-center gap-2 border border-red-500/30 bg-red-500/[0.07] px-4 py-3 rounded-xl text-xs text-red-400 font-mono"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    {errorMsg}
                  </div>
                )}

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-6 border-t border-border/20">
                  <span className="text-xs font-mono text-muted-foreground/70">
                    Replies usually within 24 hours.
                  </span>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-9 py-4 text-sm font-semibold text-accent-foreground shadow-[0_4px_20px_rgb(220,120,80,0.15)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgb(220,120,80,0.25)] active:scale-[0.98] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending message…</span>
                      </>
                    ) : (
                      <>
                        <span>Start the Conversation</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </section>


        {/* ── SECTION 06: UNFORGETTABLE CLOSING STATEMENT ── */}
        <section className="border-t border-border/20 pt-28 pb-16 text-center space-y-6 max-w-3xl mx-auto">
          <Reveal>
            <p className="font-display text-2xl xs:text-3xl sm:text-5xl text-foreground font-light leading-snug tracking-tight">
              “Every meaningful product begins with a conversation.”
            </p>
            <p className="font-display text-xl sm:text-3xl text-accent font-light italic mt-3">
              Let's start ours.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="pt-6 flex items-center justify-center gap-2 text-[9px] font-mono uppercase tracking-[0.35em] text-muted-foreground/60">
              <Sparkles className="h-3 w-3 text-accent/70" />
              <span>GOPI NEERAJ KUMAR · PRODUCT DESIGNER</span>
            </div>
          </Reveal>
        </section>

      </div>
    </PageShell>
  );
}
