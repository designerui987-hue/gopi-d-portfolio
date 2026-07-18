import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, FileDown, Linkedin, CheckCircle2, AlertCircle, Loader2, Mail, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { useState } from "react";

const LINKEDIN_URL = "https://www.linkedin.com/in/neeraj-kumar-gopi-b09391331";
const BEHANCE_URL = "https://www.behance.net/neerajgopi";
const EMAIL_ADDRESS = "neerajkumar.gopi2025@gmail.com";
const RESUME_URL = "/neeraj_ui_ux_resume_updaetd_v1_7148.pdf";

// Formspree endpoint — replace YOUR_FORM_ID with your actual Formspree form ID
// Get one free at https://formspree.io (no backend needed, works with static/SSR)
const FORMSPREE_URL = "https://formspree.io/f/xpwrjznp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Get in touch with Gopi Neeraj Kumar — available now for junior UI/UX roles, internships, and small freelance briefs.",
      },
      { property: "og:title", content: "Contact — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Get in touch with Gopi Neeraj Kumar — available now for junior UI/UX roles, internships, and small freelance briefs.",
      },
    ],
  }),
  component: Contact,
});

const scopes = ["Junior role", "Internship", "Freelance brief", "Just saying hi"];

type FormState = "idle" | "submitting" | "success" | "error";

function Contact() {
  const [scope, setScope]   = useState<string | null>(null);
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Attach the scope radio value manually (controlled state)
    if (scope) data.set("scope", scope);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setScope(null);
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
      eyebrow="Get in touch"
      title="Let's talk."
      description="I'm available now for junior UI/UX roles, internships, and small freelance briefs. Drop a note below or reach me on LinkedIn."
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 mt-12 items-start">

        {/* ── Form ── */}
        <Reveal className="md:col-span-7">
          {status === "success" ? (
            /* Success state */
            <div
              role="alert"
              aria-live="polite"
              className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.08] backdrop-blur-md p-10 md:p-14 flex flex-col items-center text-center gap-5"
            >
              <CheckCircle2 className="h-10 w-10 text-emerald-400" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-2xl text-foreground font-light">Message sent!</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Thanks for reaching out. I'll reply within a day or two.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs uppercase tracking-[0.2em] text-accent hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              className="rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-8 md:p-10 shadow-[var(--shadow-premium)]"
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="c-name"
                    className="mb-2 block text-[9px] uppercase tracking-[0.25em] text-accent font-semibold"
                  >
                    Name
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    autoComplete="name"
                    disabled={status === "submitting"}
                    className="w-full bg-transparent border-b border-border/40 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors disabled:opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="c-email"
                    className="mb-2 block text-[9px] uppercase tracking-[0.25em] text-accent font-semibold"
                  >
                    Email
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                    disabled={status === "submitting"}
                    className="w-full bg-transparent border-b border-border/40 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors disabled:opacity-50"
                  />
                </div>

                <div className="md:col-span-2 mt-2">
                  <fieldset>
                    <legend className="mb-4 block text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">
                      What's this about?
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {scopes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setScope(s === scope ? null : s)}
                          aria-pressed={scope === s}
                          disabled={status === "submitting"}
                          className={`cursor-pointer rounded-full border px-4 py-2 text-xs transition-all disabled:opacity-50 ${
                            scope === s
                              ? "border-accent bg-accent/15 text-accent"
                              : "border-border/40 bg-background/20 text-muted-foreground hover:border-accent/40 hover:text-foreground"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {/* hidden input carries value for FormData */}
                    <input type="hidden" name="scope" value={scope ?? ""} />
                  </fieldset>
                </div>

                <div className="md:col-span-2 mt-2">
                  <label
                    htmlFor="c-msg"
                    className="mb-2 block text-[9px] uppercase tracking-[0.25em] text-accent font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="c-msg"
                    name="message"
                    rows={4}
                    placeholder="A few sentences about what you're working on and how I can help."
                    required
                    disabled={status === "submitting"}
                    className="w-full bg-transparent border-b border-border/40 py-3 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors resize-none disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Error message */}
              {status === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-center gap-2 mt-6 rounded-xl border border-red-500/30 bg-red-500/[0.07] px-4 py-3 text-xs text-red-400"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col-reverse items-stretch justify-between gap-6 border-t border-border/30 mt-8 pt-8 md:flex-row md:items-center">
                <span className="text-xs text-muted-foreground">
                  I reply within a day or two.
                </span>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(220,120,80,0.2)] disabled:opacity-70 disabled:translate-y-0 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </Reveal>

        {/* ── Sidebar ── */}
        <Reveal className="md:col-span-5 space-y-4">
          <div
            className="rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-6 md:p-8"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Availability
            </div>
            <div className="mt-3 font-display text-2xl text-foreground font-light">
              Available now
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Open to junior UI/UX roles, internships, and small freelance briefs.
            </p>
          </div>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
            className="group flex items-center justify-between rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-6 transition-colors hover:border-accent/20"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center gap-3">
              <Linkedin className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">
                  LinkedIn
                </span>
                <span className="mt-1 font-display text-lg text-foreground font-light">
                  /in/neeraj-kumar-gopi
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-4.5 w-4.5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </a>

          <a
            href={BEHANCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Behance profile"
            className="group flex items-center justify-between rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-6 transition-colors hover:border-accent/20"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">
                  Behance
                </span>
                <span className="mt-1 font-display text-lg text-foreground font-light">
                  /neerajgopi
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-4.5 w-4.5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </a>

          <a
            href={`mailto:${EMAIL_ADDRESS}`}
            aria-label="Send email"
            className="group flex items-center justify-between rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-6 transition-colors hover:border-accent/20"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">
                  Email
                </span>
                <span className="mt-1 font-display text-base text-foreground font-light break-all">
                  {EMAIL_ADDRESS}
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-4.5 w-4.5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </a>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            download
            aria-label="Download resume PDF"
            className="group flex items-center justify-between rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-6 transition-colors hover:border-accent/20"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center gap-3">
              <FileDown className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">
                  Resume
                </span>
                <span className="mt-1 font-display text-lg text-foreground font-light">
                  Download PDF
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-4.5 w-4.5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
