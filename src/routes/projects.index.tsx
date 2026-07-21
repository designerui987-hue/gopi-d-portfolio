import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Layers, Cpu } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Stagger, staggerItem } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

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

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "SaaS Dashboard": Layers,
  "AI Product Design": Cpu,
  "Fintech / Dashboard": Cpu,
};

/* ─── Page ───────────────────────────────────────────────── */
function ProjectsIndex() {
  useReducedMotion();

  return (
    <PageShell
      eyebrow="SELECTED CASE STUDIES"
      title="Products Designed for Complexity & Calm."
      description="In-depth design documentation of shipped modules, enterprise business applications, and AI product concepts."
    >
      <div className="mt-16 space-y-12">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </PageShell>
  );
}
