import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { FloatingNav } from "../components/floating-nav";
import { GeometricBackground } from "../components/geometric-background";
import { ScrollProgress } from "../components/scroll-progress";
import { SmoothScroll } from "../components/smooth-scroll";
import { CustomCursor } from "../components/custom-cursor";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gopi Neeraj Kumar — UI/UX Designer" },
      {
        name: "description",
        content:
          "Portfolio of Gopi Neeraj Kumar, a junior UI/UX designer focused on calm, considered interfaces, design systems, and shipped product work.",
      },
      { property: "og:title", content: "Gopi Neeraj Kumar — UI/UX Designer" },
      {
        property: "og:description",
        content:
          "Portfolio of Gopi Neeraj Kumar, a junior UI/UX designer focused on calm, considered interfaces, design systems, and shipped product work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gopi Neeraj Kumar — UI/UX Designer" },
      { name: "twitter:description", content: "Portfolio of Gopi Neeraj Kumar, a junior UI/UX designer focused on calm, considered interfaces." },
      { property: "og:image", content: "/images/cover.png" },
      { name: "twitter:image", content: "/images/cover.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  pendingComponent: PagePendingComponent,
});

/* ─── Global Pending Component (prevents blank screen) ─────── */
function PagePendingComponent() {
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-accent/20 z-[90] overflow-hidden">
      <motion.div
        className="h-full bg-accent"
        initial={{ width: "0%", opacity: 1 }}
        animate={{ width: "90%" }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
    </div>
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.remove('light');
                localStorage.setItem('theme', 'dark');
              })();
            `,
          }}
        />
        <HeadContent />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [booted, setBooted] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Disable default browser scroll restoration to prevent jumps and layout freezing
    if (typeof window !== "undefined" && "history" in window) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Smooth, guaranteed 0% -> 100% preloader animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setBooted(true), 300);
          return 100;
        }
        // Increment smoothly by 2-4% every 25ms (~1.0s to 1.2s duration)
        const next = prev + Math.floor(Math.random() * 3) + 2;
        return next >= 100 ? 100 : next;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <CustomCursor />
      <GeometricBackground />
      <ScrollProgress />
      <FloatingNav />

      <AnimatePresence>
        {!booted && (
          <motion.div
            key="boot"
            initial={{ y: 0 }}
            exit={{ y: "-100%", filter: reduced ? "none" : "blur(10px)" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden="true"
            role="status"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background px-6"
          >
            <div className="flex flex-col items-center gap-6 max-w-sm w-full">
              {/* Luxury Minimalist Text */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <span className="font-display text-3xl font-light tracking-[0.2em] text-foreground block uppercase">
                    Gopi Neeraj
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-accent mt-2 block">
                    Portfolio · 2026
                  </span>
                </motion.div>
              </div>

              {/* Sleek Line Progress Bar */}
              <div className="h-[2px] w-48 bg-border/40 relative overflow-hidden rounded-full mt-4">
                <motion.div
                  className="h-full bg-accent absolute left-0 top-0"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Progress Percentage */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground uppercase"
              >
                {Math.min(progress, 100)}%
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative min-h-screen">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: reduced ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet />
        </motion.div>
      </main>
    </QueryClientProvider>
  );
}

