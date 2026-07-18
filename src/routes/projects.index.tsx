import { createFileRoute } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import { PageShell } from "@/components/page-shell";
import { Stagger } from "@/components/reveal";
import { ComingSoonCard } from "@/components/coming-soon-card";
import { projects } from "@/lib/projects";

/* ─── Route ──────────────────────────────────────────────── */
export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Case studies — Gopi Neeraj Kumar" },
      {
        name: "description",
        content:
          "Explore full case studies for production modules, SaaS design systems, and AI stock assistants built by Gopi.",
      },
      { property: "og:title", content: "Case studies — Gopi Neeraj Kumar" },
      {
        property: "og:description",
        content:
          "Explore full case studies for production modules, SaaS design systems, and AI stock assistants built by Gopi.",
      },
    ],
  }),
  component: ProjectsIndex,
});

/* ─── Page ───────────────────────────────────────────────── */
function ProjectsIndex() {
  /* Passed into ComingSoonCard so reduced-motion is honoured inside it */
  useReducedMotion();

  return (
    <PageShell
      eyebrow="Portfolio"
      title="Sleek layouts, proven utility."
      description="Detailed case studies of digital products. Scroll down to experience each project's story."
    >
      <div className="mt-20">
        <Stagger className="divide-y divide-border/20" stagger={0.14}>
          {/* One placeholder per project in projects.ts (currently 2) */}
          {projects.map((p, i) => (
            <div key={p.slug} className="py-16 flex justify-center">
              <ComingSoonCard
                colSpan=""
                aspect={i % 2 === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}
                variant="row"
              />
            </div>
          ))}
        </Stagger>
      </div>
    </PageShell>
  );
}
