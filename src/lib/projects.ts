export type Project = {
  slug: string;
  title: string;
  category: "SaaS Dashboard" | "Landing Page" | "Mobile App" | "UI Exploration" | "Fintech / Dashboard" | "AI Product Design";
  description: string;
  role: string;
  tools: string[];
  year: string;
  cover: string;
  coverImage?: string;
  problem: string;
  constraints: string[];
  decisions: { title: string; detail: string; image?: string; caption?: string }[];
  outcomes: string[];
  learnings: string[];
};

export const projects: Project[] = [
  {
    slug: "stockai",
    title: "StockAI — AI-Powered Stock Analysis Platform",
    category: "AI Product Design",
    description:
      "A full-stack AI stock analysis platform designed to replace raw trading terminals with plain-language buy/hold/sell signals, explainable AI recommendations, and a calm, structured dashboard built for investors who are not professional traders.",
    role: "Designer & Developer (solo, full-stack)",
    tools: ["Figma", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "FastAPI", "Python"],
    year: "2026",
    cover: "StockAI Dashboard",
    coverImage: "/images/stockai/cover.png",
    problem:
      "Most retail stock apps are built for professional day traders. They show raw OHLC candlestick data, order books, and dozens of overlapping technical indicators that require years of domain knowledge to interpret. A first-time investor looking at NIFTY 50 has no way to answer the most basic question: 'Should I buy this stock today, and why?'. Existing platforms answer with more data, not with clarity.",
    constraints: [
      "Solo end-to-end ownership — responsible for UX research, component design, frontend React development, and a Python FastAPI backend that serves real market signals",
      "Designing for trust in a high-stakes domain — every AI recommendation needed to expose its confidence level and reasoning chain, not just output a result",
      "No external design validation: this was a personal prototype with no formal user research. Decisions were based on observed pain points and first-principles product thinking"
    ],
    decisions: [
      {
        title: "AI Picks with Explainable Signals",
        detail:
          "Each AI recommendation shows a confidence score, a plain-English reason string, and a colour-coded action badge. The design prioritises explainability over authority — the interface never tells users to trust the AI, it shows them exactly why the signal was generated.",
        image: "/images/stockai/dashboard.png",
        caption: "AI Picks panel showing confidence scores, signal badges, and one-line plain-English reasoning for each recommendation."
      },
      {
        title: "Market Sentiment System",
        detail:
          "Instead of showing raw FII/DII data in a table, designed a circular gauge showing a Bullish/Bearish score derived from institutional flows. Supporting metrics (FII Net, DII Net, PCR, VIX) appear below as secondary context, not primary information.",
        image: "/images/stockai/dashboard.png",
        caption: "Market Sentiment gauge — translates raw institutional flow data into a single, readable directional score."
      },
      {
        title: "Dashboard Information Architecture",
        detail:
          "Structured the dashboard with a strict information hierarchy: index overview → market movers → portfolio → alerts → AI picks → market status. The order was deliberate — it mirrors how a trader actually scans the market, moving from macro to micro.",
        image: "/images/stockai/dashboard.png",
        caption: "Full dashboard layout — indexes, top gainers/losers, portfolio, alerts, and AI picks in one scannable canvas."
      }
    ],
    outcomes: [
      "Designed and shipped a full-stack AI stock analysis platform from Figma to production deployment",
      "Replaced raw market data tables with structured, plain-language AI signals that are readable by non-expert investors",
      "Built a reusable component system that maps directly to TypeScript interfaces, making the design-to-code handoff straightforward"
    ],
    learnings: [
      "AI explainability is a design problem, not just an engineering one — the interface must make the model's reasoning legible before users will trust its output",
      "Information hierarchy in dashboards is more important than visual polish — the order in which data is presented determines how quickly users can act on it",
      "Owning the full stack (design + frontend + backend) exposed the real cost of design decisions at the implementation layer, which changed how I think about component scope and state management"
    ]
  }
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
