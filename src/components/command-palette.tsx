import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import { Home, Layers, Workflow, Palette, User, Mail, FileDown, Sun, Moon, Search, BookOpen, Sliders } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
      setTheme(activeTheme);
    }
  }, [open]);

  const handleSelect = (action: () => void) => {
    action();
    setOpen(false);
  };

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

  // Advanced keyboard chords for Vercel/Linear-like hotkey interactions
  useEffect(() => {
    let lastKey = "";
    let timeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      if (lastKey === "g") {
        if (key === "h") {
          e.preventDefault();
          handleSelect(() => navigate({ to: "/" }));
        } else if (key === "p") {
          e.preventDefault();
          handleSelect(() => navigate({ to: "/projects" }));
        } else if (key === "w") {
          e.preventDefault();
          handleSelect(() => navigate({ to: "/process" }));
        } else if (key === "s") {
          e.preventDefault();
          handleSelect(() => navigate({ to: "/design-system" }));
        } else if (key === "a") {
          e.preventDefault();
          handleSelect(() => navigate({ to: "/about" }));
        } else if (key === "c") {
          e.preventDefault();
          handleSelect(() => navigate({ to: "/contact" }));
        }
        lastKey = "";
      } else if (lastKey === "t") {
        if (key === "t") {
          e.preventDefault();
          handleSelect(() => toggleTheme());
        }
        lastKey = "";
      } else if (lastKey === "d") {
        if (key === "r") {
          e.preventDefault();
          handleSelect(() => window.open("/neeraj_ui_ux_resume_updaetd_v1_7148.pdf", "_blank"));
        }
        lastKey = "";
      } else {
        if (key === "g" || key === "t" || key === "d") {
          lastKey = key;
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            lastKey = "";
          }, 1000);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [navigate, theme, open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Command Menu"
          container={typeof window !== "undefined" ? document.body : undefined}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/50 backdrop-blur-[8px]"
            onClick={() => setOpen(false)}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[540px] rounded-2xl glass-panel shadow-premium border border-border/45 bg-surface/85 backdrop-blur-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 border-b border-border/30">
              <Search className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
              <Command.Input
                placeholder="Type a command or search..."
                className="w-full bg-transparent py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <span className="text-[10px] bg-surface-elevated border border-border/50 text-muted-foreground px-2 py-0.5 rounded font-mono select-none">
                ESC
              </span>
            </div>

            {/* List results */}
            <Command.List className="max-h-[320px] overflow-y-auto p-2 space-y-1">
              <Command.Empty className="text-xs text-muted-foreground px-4 py-8 text-center">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="text-[10px] font-semibold text-accent/70 uppercase tracking-widest px-3 py-2 mt-2 first:mt-0">
                <Command.Item
                  onSelect={() => handleSelect(() => navigate({ to: "/" }))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all select-none hover:bg-accent/10 aria-selected:bg-accent/10 aria-selected:text-accent border border-transparent aria-selected:border-accent/20"
                >
                  <span className="flex items-center gap-3">
                    <Home className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    Home
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">G H</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => navigate({ to: "/projects" }))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all select-none hover:bg-accent/10 aria-selected:bg-accent/10 aria-selected:text-accent border border-transparent aria-selected:border-accent/20"
                >
                  <span className="flex items-center gap-3">
                    <Layers className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    Projects Gallery
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">G P</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => navigate({ to: "/process" }))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all select-none hover:bg-accent/10 aria-selected:bg-accent/10 aria-selected:text-accent border border-transparent aria-selected:border-accent/20"
                >
                  <span className="flex items-center gap-3">
                    <Workflow className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    My Design Process
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">G W</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => navigate({ to: "/design-system" }))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all select-none hover:bg-accent/10 aria-selected:bg-accent/10 aria-selected:text-accent border border-transparent aria-selected:border-accent/20"
                >
                  <span className="flex items-center gap-3">
                    <Palette className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    Design System Tokens
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">G S</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => navigate({ to: "/writing" }))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all select-none hover:bg-accent/10 aria-selected:bg-accent/10 aria-selected:text-accent border border-transparent aria-selected:border-accent/20"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    Writing &amp; Essays
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">G E</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => navigate({ to: "/playground" }))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all select-none hover:bg-accent/10 aria-selected:bg-accent/10 aria-selected:text-accent border border-transparent aria-selected:border-accent/20"
                >
                  <span className="flex items-center gap-3">
                    <Sliders className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    Experimental Lab
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">G L</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => navigate({ to: "/about" }))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all select-none hover:bg-accent/10 aria-selected:bg-accent/10 aria-selected:text-accent border border-transparent aria-selected:border-accent/20"
                >
                  <span className="flex items-center gap-3">
                    <User className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    About Me
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">G A</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => navigate({ to: "/contact" }))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all select-none hover:bg-accent/10 aria-selected:bg-accent/10 aria-selected:text-accent border border-transparent aria-selected:border-accent/20"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    Contact &amp; Hire
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">G C</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Preferences &amp; Actions" className="text-[10px] font-semibold text-accent/70 uppercase tracking-widest px-3 py-2 border-t border-border/30 mt-3 pt-3">
                <Command.Item
                  onSelect={() => handleSelect(() => toggleTheme())}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all select-none hover:bg-accent/10 aria-selected:bg-accent/10 aria-selected:text-accent border border-transparent aria-selected:border-accent/20"
                >
                  <span className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    ) : (
                      <Moon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    )}
                    Toggle Color Theme
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">T T</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect(() => window.open("/neeraj_ui_ux_resume_updaetd_v1_7148.pdf", "_blank"))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all select-none hover:bg-accent/10 aria-selected:bg-accent/10 aria-selected:text-accent border border-transparent aria-selected:border-accent/20"
                >
                  <span className="flex items-center gap-3">
                    <FileDown className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    Download Resume PDF
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">D R</span>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}
