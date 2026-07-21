import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Sparkles, Activity, ShieldCheck } from "lucide-react";

export function AiWaveform({
  className = "",
}: {
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [activeBar, setActiveBar] = useState<number | null>(null);

  // 16 reactive audio frequency bar values
  const [bars, setBars] = useState([
    35, 65, 40, 85, 55, 95, 70, 45, 80, 60, 90, 50, 75, 30, 85, 60
  ]);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map((b) => Math.min(100, Math.max(15, b + (Math.random() * 30 - 15))))
      );
    }, 450);

    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <div className={`rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-md p-6 sm:p-8 space-y-6 ${className}`}>
      {/* Header & Intelligent Signal Status */}
      <div className="flex items-center justify-between border-b border-border/20 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
            <Cpu className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="font-mono text-xs font-semibold text-accent block leading-none">
              EXPLAINABLE AI SIGNAL
            </span>
            <span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest">
              CONFIDENCE 98.4%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-border/30 bg-background/40 px-3 py-1 text-[10px] font-mono text-muted-foreground">
          <Activity className="h-3 w-3 text-accent animate-pulse" />
          LIVE MONITORING
        </div>
      </div>

      {/* Voice Waveform & Frequency Canvas */}
      <div className="h-24 w-full flex items-end justify-between gap-1 sm:gap-1.5 pt-2">
        {bars.map((height, i) => (
          <div
            key={i}
            onMouseEnter={() => setActiveBar(i)}
            onMouseLeave={() => setActiveBar(null)}
            className="flex-1 rounded-full bg-accent/25 hover:bg-accent transition-all duration-300 relative group cursor-pointer"
            style={{ height: `${height}%` }}
          >
            {activeBar === i && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-[9px] text-accent font-semibold bg-background/80 px-1.5 py-0.5 rounded border border-border/40 whitespace-nowrap z-10">
                {height}Hz
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Intelligent Reasoning Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] font-mono text-muted-foreground/80">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-accent" />
          <span>Transparent decision weights</span>
        </div>
        <div className="text-[10px] text-accent/90">
          Model: Soft-Graphite-v2.4
        </div>
      </div>
    </div>
  );
}
