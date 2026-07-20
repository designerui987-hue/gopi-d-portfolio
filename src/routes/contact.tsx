import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  FileDown,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  ExternalLink,
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
      { title: "Let's Build Something Thoughtful — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "The closing chapter of Gopi Neeraj Kumar's product design portfolio. Open for UI/UX roles, product design opportunities, and creative collaborations.",
      },
      { property: "og:title", content: "Let's Build Something Thoughtful — Gopi Neeraj Kumar" },
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

const WORKING_PRINCIPLES = [
  {
    num: "01",
    title: "Problem First",
    detail: "I understand the problem before designing.",
  },
  {
    num: "02",
    title: "Team Synergy",
    detail: "I value collaboration over assumptions.",
  },
  {
    num: "03",
    title: "Systemic Thinking",
    detail: "I design systems before individual screens.",
  },
  {
    num: "04",
    title: "Clear Communication",
    detail: "I believe clear communication leads to better products.",
  },
] as const;

function Contact() {
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        const msg =
          Array.isArray(json?.errors)
            ? json.errors.map((err: { message: string }) => err.message).join(", ")
            : "Something went wrong. Please try again or email me directly.";
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
      title="Let's Build Something Thoughtful"
      description="I enjoy solving meaningful product problems through thoughtful UI/UX design, systems thinking, and close cross-functional collaboration. Whether you have an open role or an opportunity to discuss, I'd love to connect."
    >
      <div className="relative mt-16 space-y-24">

        {/* ── 2-COLUMN EDITORIAL LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── LEFT COLUMN: Collaborator Profile & Specifications ── */}
          <Reveal className="lg:col-span-5 space-y-8">
            {/* Collaborator Profile Header */}
            <div
              className="rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-8 space-y-6"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-center justify-between gap-4 border-b border-border/20 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.25em] text-accent font-semibold">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    AVAILABILITY
                  </div>
                  <div className="mt-2 font-display text-2xl text-foreground font-light">
                    Currently Open
                  </div>
                </div>
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-border/40 shadow-sm">
                  <img src="/neeraj.jpg" alt="Gopi Neeraj Kumar" className="h-full w-full object-cover" />
                </div>
              </div>

              {/* Opportunities List */}
              <div className="space-y-3">
                <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60 block">
                  OPEN FOR
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "UI/UX Designer Opportunities",
                    "Product Design Roles",
                    "Freelance Design Projects",
                    "Creative Collaborations",
                  ].map((opp) => (
                    <span
                      key={opp}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border/30 bg-surface/30 px-3 py-1.5 text-xs font-mono text-muted-foreground/90"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent/50" />
                      {opp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Operational Specs Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-border/20 pt-6 text-xs font-mono">
                <div>
                  <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground/50 block">
                    LOCATION
                  </span>
                  <span className="text-foreground/90 font-light mt-1 block">
                    Visakhapatnam, India
                  </span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground/50 block">
                    WORKING STYLE
                  </span>
                  <span className="text-foreground/90 font-light mt-1 block">
                    Remote · Hybrid · On-site
                  </span>
                </div>
                <div className="col-span-2 pt-2 border-t border-border/15">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground/50 block">
                    RESPONSE TIME
                  </span>
                  <span className="text-accent font-light mt-1 block">
                    Usually within 24 hours
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Channels List (Refined Typography) */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground/60 block px-1">
                PREFERRED CONTACT CHANNELS
              </span>
              <div className="space-y-2">
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="group flex items-center justify-between rounded-2xl border border-border/30 bg-surface/15 p-5 transition-all duration-300 hover:border-accent/40 hover:bg-surface/30"
                >
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-accent font-semibold block">
                      EMAIL
                    </span>
                    <span className="text-sm font-mono text-foreground font-light">
                      {EMAIL_ADDRESS}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-border/30 bg-surface/15 p-5 transition-all duration-300 hover:border-accent/40 hover:bg-surface/30"
                >
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-accent font-semibold block">
                      LINKEDIN
                    </span>
                    <span className="text-sm font-mono text-foreground font-light">
                      /in/neeraj-kumar-gopi
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </a>

                <a
                  href={BEHANCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-border/30 bg-surface/15 p-5 transition-all duration-300 hover:border-accent/40 hover:bg-surface/30"
                >
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-accent font-semibold block">
                      BEHANCE
                    </span>
                    <span className="text-sm font-mono text-foreground font-light">
                      /neerajgopi
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </a>

                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="group flex items-center justify-between rounded-2xl border border-border/30 bg-surface/15 p-5 transition-all duration-300 hover:border-accent/40 hover:bg-surface/30"
                >
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-accent font-semibold block">
                      RESUME
                    </span>
                    <span className="text-sm font-mono text-foreground font-light">
                      Download PDF Document
                    </span>
                  </div>
                  <FileDown className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* ── RIGHT COLUMN: Conversational Contact Form ── */}
          <Reveal className="lg:col-span-7">
            {status === "success" ? (
              /* Calm, Human Success State */
              <div
                role="alert"
                aria-live="polite"
                className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.06] backdrop-blur-md p-10 md:p-14 flex flex-col items-center text-center gap-6"
              >
                <div className="h-12 w-12 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" strokeWidth={1.5} />
                </div>
                <div className="space-y-2 max-w-md">
                  <h3 className="font-display text-2xl text-foreground font-light">
                    Thank you for reaching out.
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    I'll read your message carefully and respond as soon as possible.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-accent hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-8 md:p-10 space-y-8 shadow-[var(--shadow-soft)]"
              >
                <div className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="c-name"
                        className="mb-2 block text-[9px] font-mono uppercase tracking-[0.25em] text-accent font-semibold"
                      >
                        Your Name
                      </label>
                      <input
                        id="c-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        required
                        autoComplete="name"
                        disabled={status === "submitting"}
                        className="w-full bg-transparent border-b border-border/30 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-accent transition-colors disabled:opacity-50 font-light"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="c-email"
                        className="mb-2 block text-[9px] font-mono uppercase tracking-[0.25em] text-accent font-semibold"
                      >
                        Your Email Address
                      </label>
                      <input
                        id="c-email"
                        name="email"
                        type="email"
                        placeholder="alex@company.com"
                        required
                        autoComplete="email"
                        disabled={status === "submitting"}
                        className="w-full bg-transparent border-b border-border/30 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-accent transition-colors disabled:opacity-50 font-light"
                      />
                    </div>
                  </div>

                  {/* Conversational Subject */}
                  <div>
                    <label
                      htmlFor="c-subject"
                      className="mb-2 block text-[9px] font-mono uppercase tracking-[0.25em] text-accent font-semibold"
                    >
                      What are you building?
                    </label>
                    <input
                      id="c-subject"
                      name="subject"
                      type="text"
                      placeholder="e.g. UI/UX Design Role / Enterprise Platform Redesign"
                      required
                      disabled={status === "submitting"}
                      className="w-full bg-transparent border-b border-border/30 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-accent transition-colors disabled:opacity-50 font-light"
                    />
                  </div>

                  {/* Conversational Message */}
                  <div>
                    <label
                      htmlFor="c-msg"
                      className="mb-2 block text-[9px] font-mono uppercase tracking-[0.25em] text-accent font-semibold"
                    >
                      Tell me about your project or opportunity.
                    </label>
                    <textarea
                      id="c-msg"
                      name="message"
                      rows={5}
                      placeholder="Share a few details about the product goals, scope, timeline, or open role."
                      required
                      disabled={status === "submitting"}
                      className="w-full bg-transparent border-b border-border/30 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-accent transition-colors resize-none disabled:opacity-50 font-light"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/[0.07] px-4 py-3 text-xs text-red-400"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    {errorMsg}
                  </div>
                )}

                {/* Submit Row */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-6 border-t border-border/20 pt-6">
                  <span className="text-xs font-mono text-muted-foreground/70">
                    Replies usually within 24 hours.
                  </span>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgb(220,120,80,0.25)] active:scale-[0.98] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
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
        </div>

        {/* ── WORKING PRINCIPLES: How I Like to Work ── */}
        <Reveal className="border-t border-border/20 pt-16 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent font-semibold block">
                COLLABORATION PHILOSOPHY
              </span>
              <h3 className="font-display text-3xl font-light text-foreground tracking-tight mt-2">
                How I Like to Work
              </h3>
            </div>
            <p className="text-xs text-muted-foreground font-light max-w-md">
              Core operating principles that guide my daily product design execution and cross-functional partnerships.
            </p>
          </div>

          {/* 4 Concise Principles Grid */}
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
            {WORKING_PRINCIPLES.map((item) => (
              <div
                key={item.num}
                className="rounded-3xl border border-border/30 bg-surface/20 p-7 space-y-3 hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between border-b border-border/20 pb-3">
                  <span className="font-mono text-xs font-semibold text-accent">{item.num}</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60">
                    {item.title}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/90 font-light pt-1">
                  {item.detail}
                </p>
              </div>
            ))}
          </Stagger>
        </Reveal>

        {/* ── THOUGHTFUL CLOSING FOOTER STATEMENT ── */}
        <Reveal className="border-t border-border/20 pt-16 pb-8 text-center space-y-4">
          <p className="font-display text-xl sm:text-2xl text-foreground font-light max-w-2xl mx-auto leading-snug">
            “Designed with curiosity. Refined through iteration. Every detail in this portfolio reflects how I approach product design.”
          </p>
          <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-accent/80 block">
            GOPI NEERAJ KUMAR · PRODUCT DESIGNER
          </span>
        </Reveal>

      </div>
    </PageShell>
  );
}
