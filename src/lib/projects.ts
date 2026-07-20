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
    title: "StockAI — AI-Powered Product Experience Concept",
    category: "AI Product Design",
    description:
      "A product design concept exploring how explainable AI, clean information architecture, and structured design systems can replace overwhelming financial data with transparent investment signals.",
    role: "UI/UX Designer (Solo Concept)",
    tools: ["Figma", "FigJam", "Lovable", "Framer Motion", "Tailwind CSS"],
    year: "2026",
    cover: "StockAI Dashboard",
    coverImage: "/images/stockai/cover.png",
    problem:
      "Most retail investment platforms overwhelm users with raw candlestick charts, technical indicators, and cluttered tables. First-time investors struggle to make informed decisions. StockAI explores how user-centered interface design can translate complex financial models into transparent, explainable recommendations.",
    constraints: [
      "End-to-end design ownership — responsible for user journey mapping, information architecture, component specifications, and interactive prototyping",
      "Designing for trust in a complex domain — every AI recommendation displays transparent reasoning chains to ensure user confidence",
      "Creating scalable component structures and dark-theme design tokens for data visualization"
    ],
    decisions: [
      {
        title: "AI Picks with Explainable Signals",
        detail:
          "Designed clear recommendation cards featuring confidence scores, plain-language reasoning, and action badges. The interface prioritizes explainability over authority, ensuring users understand why each signal was generated.",
        image: "/images/stockai/dashboard.png",
        caption: "AI Picks panel showing confidence scores, signal badges, and one-line plain-language reasoning for each recommendation."
      },
      {
        title: "Market Sentiment Visualization",
        detail:
          "Translated complex market flow data into a readable circular sentiment score. Supporting contextual metrics are hierarchically structured as secondary information below the primary score.",
        image: "/images/stockai/dashboard.png",
        caption: "Market Sentiment gauge — translates raw market data into a single, scannable directional score."
      },
      {
        title: "Dashboard Information Architecture",
        detail:
          "Structured the dashboard with a strict information hierarchy: macro index overview → market movers → portfolio → alerts → AI picks. This mirrors how users naturally scan financial data.",
        image: "/images/stockai/dashboard.png",
        caption: "Full dashboard layout — scannable canvas prioritizing primary market indicators and AI insights."
      }
    ],
    outcomes: [
      "Designed an end-to-end AI product experience concept from low-fidelity wireframes to interactive high-fidelity prototype",
      "Replaced complex financial tables with structured, plain-language AI recommendations designed for intuitive user decision-making",
      "Created a reusable design system with scalable component specifications for seamless developer handoff"
    ],
    learnings: [
      "AI explainability is fundamentally a UX design challenge — interfaces must make model reasoning legible before users will trust AI outputs",
      "Information hierarchy in complex dashboards directly drives usability — the sequence of data presentation determines how quickly users interpret information",
      "Designing with implementation awareness leads to cleaner component specifications and smoother engineering collaboration"
    ]
  }
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
