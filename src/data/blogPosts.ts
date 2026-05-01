import caseFintech from "@/assets/case-fintech.jpg";
import caseEcommerce from "@/assets/case-ecommerce.jpg";
import caseAi from "@/assets/case-ai.jpg";
import heroVisual from "@/assets/hero-visual.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  cover: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-mvps-that-scale",
    title: "Building MVPs That Scale: Lessons from 50+ Launches",
    excerpt: "Most MVPs collapse the moment they get traction. Here's how we design lean products that survive their first 10,000 users.",
    category: "Product",
    author: "Jonathan O.",
    date: "Apr 22, 2026",
    readTime: "6 min read",
    cover: heroVisual,
    content: [
      "An MVP is not a stripped-down product — it is a focused product. The mistake most founders make is shipping a thin version of everything instead of a complete version of one thing.",
      "Across 50+ launches at Appi Technologies, the products that scaled shared three traits: a single hero workflow, an architecture that allowed swapping internals without rewriting the surface, and a feedback loop wired in from day one.",
      "Start with the workflow your user would pay for tomorrow. Build it end-to-end with production-grade infrastructure even if the UI looks rough. You can polish pixels in week three; you cannot retrofit reliability.",
      "Finally, instrument everything. The teams that scale aren't the ones with the best ideas — they're the ones who notice signal early and act on it faster than anyone else.",
    ],
  },
  {
    slug: "ai-automation-for-african-businesses",
    title: "AI & Automation: A Practical Playbook for African Businesses",
    excerpt: "Forget the hype. Here are the automation wins that move the needle for SMEs and enterprises operating across the continent.",
    category: "AI & Automation",
    author: "Amaka Udo",
    date: "Apr 9, 2026",
    readTime: "8 min read",
    cover: caseAi,
    content: [
      "AI adoption in Africa is accelerating, but the wins that matter are rarely the flashy ones. They live in operations: customer support triage, document parsing, reconciliation, lead qualification.",
      "We help teams identify the 3–5 workflows where automation removes the most friction without disrupting trust. The pattern is consistent — start with assistive AI, graduate to autonomous AI only when accuracy is measured and acceptable.",
      "The infrastructure side matters too. Latency, data residency, and offline-first design shape what's actually deployable in Lagos, Nairobi, or Accra. Build for your real environment, not Silicon Valley's.",
    ],
  },
  {
    slug: "designing-fintech-products-people-trust",
    title: "Designing Fintech Products People Actually Trust",
    excerpt: "Trust in fintech isn't earned through compliance badges — it's earned through interface clarity, transparency, and tiny moments of reassurance.",
    category: "Design",
    author: "Sarah Okonkwo",
    date: "Mar 28, 2026",
    readTime: "5 min read",
    cover: caseFintech,
    content: [
      "Users decide whether to trust a financial product within seconds. That decision is rarely rational — it's a sum of micro-signals: typography weight, motion smoothness, copy tone, and how confidently the app handles errors.",
      "When designing for fintech, we treat trust as a first-class design constraint. Every transaction screen earns its place. Every confirmation explains exactly what just happened, in human language.",
      "The result is products that feel calm. And calm products convert.",
    ],
  },
  {
    slug: "from-idea-to-launch-in-90-days",
    title: "From Idea to Launch in 90 Days: Our Sprint Framework",
    excerpt: "A look inside the discovery, design, and engineering sprints we use to take products from blank page to App Store in a single quarter.",
    category: "Process",
    author: "David Adebayo",
    date: "Mar 14, 2026",
    readTime: "7 min read",
    cover: caseEcommerce,
    content: [
      "90 days sounds aggressive until you realize most of the timeline is spent on decisions, not code. Our sprint framework collapses indecision by front-loading discovery and locking scope hard before week three.",
      "Weeks 1–2 are pure discovery: user interviews, competitive teardown, and a single-page product brief that everyone signs off on.",
      "Weeks 3–8 are design and parallel engineering. By the time the final screens are approved, half the backend is already in staging.",
      "Weeks 9–13 are integration, beta, and launch. Boring on purpose — surprises this late are expensive.",
    ],
  },
  {
    slug: "scalable-architecture-startups",
    title: "Scalable Architecture for Startups Without Overengineering",
    excerpt: "How to build systems that survive 100x growth without the AWS bill — or the complexity — that usually comes with it.",
    category: "Engineering",
    author: "Tunde Bello",
    date: "Feb 27, 2026",
    readTime: "9 min read",
    cover: heroVisual,
    content: [
      "Premature scaling is expensive, but unscalable foundations are more expensive. The trick is choosing primitives that grow with you instead of locking you in.",
      "Managed Postgres, edge functions, object storage, and a queue. That's the kit. 95% of startups never need more, and the ones that do can migrate piece by piece without rewrites.",
      "Architecture is a series of bets. Bet on boring, well-understood components. Save the novelty for the product itself.",
    ],
  },
  {
    slug: "why-ux-still-wins",
    title: "Why UX Still Wins in a World of AI-Generated Apps",
    excerpt: "When anyone can generate a working app in minutes, the differentiator collapses back to taste, judgment, and craft.",
    category: "Design",
    author: "Amaka Udo",
    date: "Feb 11, 2026",
    readTime: "4 min read",
    cover: caseAi,
    content: [
      "AI lowered the cost of building. It did not lower the cost of building well. The bottleneck shifted from implementation to judgment — what to build, what to leave out, and how it should feel.",
      "Great UX is now a moat, not a polish step. The teams that win the next decade will be the ones that pair generative speed with editorial restraint.",
    ],
  },
];
