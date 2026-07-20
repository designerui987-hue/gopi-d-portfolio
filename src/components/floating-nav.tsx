import { Link, useRouterState } from "@tanstack/react-router";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Home,
  Layers,
  Workflow,
  Palette,
  User,
  Mail,
  FileDown,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { useRef, useState, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/components/magnetic";
import { CommandPalette } from "@/components/command-palette";

/* ─── Magnetic wrapper ─────────────────────────────────────── */
function MagneticSlot({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useMagnetic(ref, { strength: 0.38, radius: 65 });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Nav items ────────────────────────────────────────────── */
const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: Layers },
  { to: "/process", label: "Process", icon: Workflow },
  { to: "/design-system", label: "System", icon: Palette },
  { to: "/about", label: "About", icon: User },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

const EASE_EDITORIAL = { duration: 0.45, ease: [0.16, 1, 0.3, 1] } as const;

/* ─── Main component ───────────────────────────────────────── */
export function FloatingNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [hovered, setHovered] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  // Raw scroll position → drives visual shrink
  const scrollProgress = useMotionValue(0);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const lastScrollY = useRef(0);

  // Smooth scroll progress (0 → 1 over first 120px)
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  // Derived visual values from scroll
  const navPaddingX = useTransform(smoothProgress, [0, 1], [6, 4]);
  const navPaddingY = useTransform(smoothProgress, [0, 1], [6, 4]);
  const navScale    = useTransform(smoothProgress, [0, 1], [1, 0.98]);
  const navOpacity  = useTransform(smoothProgress, [0, 1], [1, 0.94]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Update scroll progress for visual shrink (capped at 120px)
    scrollProgress.set(Math.min(latest / 120, 1));

    const diff = latest - lastScrollY.current;
    if (latest < 40) {
      setVisible(true);
    } else if (diff > 12) {
      setVisible(false);
    } else if (diff < -12) {
      setVisible(true);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeTheme = document.documentElement.classList.contains("light")
        ? "light"
        : "dark";
      setTheme(activeTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -60, opacity: 0, x: "-50%" }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0, x: "-50%" }}
        style={{ scale: reduced ? 1 : navScale }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 z-50 w-full max-w-[92%] md:max-w-max"
      >
        {/* ── Glass pill shell ── */}
        <motion.nav
          aria-label="Primary"
          style={{
            paddingLeft:  reduced ? 6 : navPaddingX,
            paddingRight: reduced ? 6 : navPaddingX,
            paddingTop:   reduced ? 6 : navPaddingY,
            paddingBottom: reduced ? 6 : navPaddingY,
          }}
          className={cn(
            "flex items-center gap-1",
            "rounded-full",
            // glass refinement: slightly tighter border + inner highlight ring
            "border border-border/30 ring-1 ring-white/[0.04]",
            "bg-surface/55 backdrop-blur-2xl",
            "shadow-[0_4px_24px_rgb(0,0,0,0.22),0_1px_0_rgb(255,255,255,0.04)_inset]",
          )}
        >
          {/* ── Logo / Home ── */}
          <Link
            to="/"
            aria-label="Home"
            className="shrink-0 mr-0.5"
          >
            <motion.div
              className="flex items-center justify-center h-9 w-9 rounded-full text-accent"
              whileHover={{ scale: reduced ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={EASE_EDITORIAL}
            >
              <Sparkles className="h-3.5 w-3.5" />
            </motion.div>
          </Link>

          {/* ── Separator ── */}
          <span className="h-4 w-px bg-border/35 shrink-0 mr-0.5" aria-hidden="true" />

          {/* ── Nav links ── */}
          <div className="flex items-center gap-0.5">
            {items.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              const isHovered = hovered === item.to;
              const Icon = item.icon;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  onMouseEnter={() => setHovered(item.to)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative flex items-center"
                >
                  <MagneticSlot className="relative">
                    <motion.div
                      className={cn(
                        "relative flex h-9 items-center justify-center rounded-full px-3 md:px-3.5",
                        "text-[11px] font-medium tracking-wide",
                        active
                          ? "text-accent"
                          : "text-muted-foreground",
                      )}
                      whileHover={{ scale: reduced ? 1 : 1.02 }}
                      whileTap={{ scale: reduced ? 1 : 0.98 }}
                      transition={EASE_EDITORIAL}
                    >
                      {/* Hover ghost pill — slides between items */}
                      {isHovered && !active && (
                        <motion.div
                          layoutId="nav-hover-bg"
                          className="absolute inset-0 rounded-full bg-white/[0.06]"
                          transition={EASE_EDITORIAL}
                        />
                      )}

                      {/* Active capsule — slides with route changes */}
                      {active && (
                        <motion.div
                          layoutId="nav-active-capsule"
                          className="absolute inset-0 rounded-full bg-accent/[0.12] border border-accent/30"
                          transition={EASE_EDITORIAL}
                        />
                      )}

                      {/* Label (desktop) / Icon (mobile) */}
                      <span className="hidden md:inline relative z-10 transition-colors duration-200">
                        {item.label}
                      </span>
                      <Icon
                        className={cn(
                          "md:hidden relative z-10 h-3.5 w-3.5 transition-colors duration-200",
                          isHovered && !active ? "text-foreground" : "",
                        )}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </motion.div>
                  </MagneticSlot>
                </Link>
              );
            })}
          </div>

          {/* ── Separator ── */}
          <span className="mx-1 h-4 w-px bg-border/35 shrink-0" aria-hidden="true" />

          {/* ── Action tools ── */}
          <div className="flex items-center gap-0.5">
            <a
              href="/neeraj_ui_ux_resume_updaetd_v1_7148.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              aria-label="Download resume PDF"
            >
              <MagneticSlot>
                <motion.div
                  className="relative flex h-8 items-center justify-center rounded-full px-3 text-[10px] font-semibold tracking-wider uppercase border border-border/50 bg-surface/30 text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-surface/50"
                  whileHover={{ scale: reduced ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={EASE_EDITORIAL}
                >
                  <span className="hidden md:inline">Resume</span>
                  <FileDown className="md:hidden h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                </motion.div>
              </MagneticSlot>
            </a>
          </div>
        </motion.nav>
      </motion.div>

      {/* Command Palette */}
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
