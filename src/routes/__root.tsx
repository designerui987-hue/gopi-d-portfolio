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
                var theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                }
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
    // Fast-forward loader if document is already fully loaded
    const isLoaded = typeof document !== "undefined" && document.readyState === "complete";
    
    // Failsafe: force completion after 2s max to optimize speed
    const failsafe = setTimeout(() => setBooted(true), 2000);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setBooted(true), 200);
          return 100;
        }
        // Step faster if already loaded
        const step = isLoaded ? 25 : Math.floor(Math.random() * 15) + 5;
        return p + step;
      });
    }, isLoaded ? 20 : 60);

    const handleLoad = () => {
      setProgress(100);
      setBooted(true);
    };

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
      }
    }

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleLoad);
      }
    };
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
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: reduced ? 0 : 12, filter: reduced ? "blur(0px)" : "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: reduced ? 0 : -12, filter: reduced ? "blur(0px)" : "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </QueryClientProvider>
  );
}

