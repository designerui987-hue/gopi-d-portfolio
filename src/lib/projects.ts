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
    slug: "hrms",
    title: "HRMS — Core module design and team collaboration",
    category: "SaaS Dashboard",
    description:
      "Designed core modules for an internal HRMS product used by an internal company team. Covered leave requests and approvals, attendance tracking, employee pre-onboarding flows, and payroll views.",
    role: "UI/UX Designer (team project)",
    tools: ["Figma", "Lovable"],
    year: "2025 – 2026",
    cover: "HRMS Dashboard",
    coverImage: "/images/hrms/cover.png",
    problem:
      "The company's internal HR processes (leaves, attendance, onboarding, and payroll) were scattered across separate third-party tools, spreadsheets, and manual emails. This caused high friction for employees and significant administrative overhead for HR managers.",
    constraints: [
      "Collaborating with developers and stakeholders as part of a team, requiring direct handoffs and feedback loops rather than solo work",
      "Translating complex multi-step HR business logic into clear, usable interface flows for both desktop and mobile views",
      "Working with a rapid turnaround timeline to transition from initial wireframes to high-fidelity functional prototypes using AI-assisted tooling (Lovable)"
    ],
    decisions: [
      {
        title: "Leaves Module: Calendar-first requesting",
        detail:
          "Designed a clean, visual leave request dashboard that centers around a team calendar, allowing employees to see who is out before requesting, and managers to approve requests directly from their daily schedule.",
        image: "/images/hrms/leaves.png",
        caption: "The Leaves module calendar view allows team members to check availability before requesting time off."
      },
      {
        title: "Attendance Module: Simplified daily check-ins",
        detail:
          "Created a low-friction clock-in/out widget for the main dashboard, reducing the tracking process to a single tap, while providing detailed visual logs for monthly verification.",
        image: "/images/hrms/attendance.png",
        caption: "The daily attendance clock-in widget simplifies check-ins to a single tap, with active visual verification logs."
      },
      {
        title: "Pre-onboarding Flow: Step-by-step checklist",
        detail:
          "Replaced long, intimidating PDF forms with a step-by-step pre-onboarding wizard for new hires, allowing them to upload documents and complete tasks at their own pace before their first day.",
        image: "/images/hrms/preonboarding.png",
        caption: "The digital pre-onboarding checklist enables new hires to complete tasks and securely upload documentation before day one."
      },
      {
        title: "Payroll Views: Clean salary breakdown",
        detail:
          "Designed a secure and clear salary breakdown layout, transforming complex tax and deduction lists into clean, readable cards with downloadable payslips.",
        image: "/images/hrms/payroll.png",
        caption: "The payroll view presents clear salary breakdowns, deductions, and quick access to downloadable payslips."
      }
    ],
    outcomes: [
      "Successfully designed and shipped all 4 core modules (Leaves, Attendance, Pre-onboarding, Payroll) to staging and production environments",
      "Significantly reduced new hire onboarding time by migrating from manual PDF forms to the digital checklist flow",
      "Established a unified design-to-code workflow that allowed the engineering team to reference Figma components directly in their React code"
    ],
    learnings: [
      "Collaborated with developers and stakeholders as part of a team (not solo work) to align on scope and technical feasibility",
      "Used AI-assisted tools (Lovable) to go from design to working prototypes faster",
      "Prompted AI tools effectively to iterate on UI layouts, states, and copy variations faster",
      "Translated complex HR business logic into clear, usable interface flows that reduce user cognitive load"
    ]
  },
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
