import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type LinkTo = "/projects" | "/process" | "/design-system" | "/about" | "/contact";

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  linkTo,
  linkLabel,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  linkTo?: LinkTo;
  linkLabel?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="mb-10 relative">
      {/* Giant outline section background number */}
      <div className="absolute -top-10 -left-6 font-display text-[9rem] text-accent/[0.03] font-bold pointer-events-none select-none z-0 hidden md:block">
        {index}
      </div>
      <div className="relative z-10 mb-5 flex items-baseline gap-4 border-b border-border/60 pb-4">
        <span className="font-display text-sm text-accent">{index}</span>
        <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          {eyebrow}
        </span>
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
          {children}
        </div>
        {linkTo && linkLabel && (
          <Link
            to={linkTo}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-[var(--shadow-float)]"
          >
            {linkLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}
