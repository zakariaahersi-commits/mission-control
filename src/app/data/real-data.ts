// REAL DATA — Pulled from MEMORY.md, daily notes, and workspace

export const agents = [
  { id: "mrq", name: "Mr Q", role: "Chief of Staff", icon: "🎩", status: "active" },
  { id: "scout", name: "LauncherQ", role: "Moonshot Builder", icon: "🚀", status: "active" },
  { id: "analyst", name: "AnalystQ", role: "Investment Analyst", icon: "📊", status: "active" },
  { id: "doc", name: "Doc", role: "Health & Wellness", icon: "🧬", status: "idle" },
];

export const metrics = {
  mrr: { current: 0, target: 10000, currency: "USD" },
  costs: { total: 107.27, thisWeek: 12.45, currency: "USD" },
  pipeline: { total: 337, invested: 5, conversion: 1.5 },
  beehiiv: { subscribers: 2900, target: 10000 },
  audience: {
    linkedin: 10000,
    instagram: 10000,
    facebook: 14000,
    x: 3200,
  },
};

export const tasks = {
  recurring: [] as Task[],
  backlog: [
    {
      id: "1",
      title: "Agent ROI Tracker",
      description: "Build dashboard tab tracking ROI per agent (sessions, cost, output quality)",
      project: "Mission Control",
      agent: "scout",
      timeAgo: "2 days ago",
      priority: "low",
    },
    {
      id: "2",
      title: "Exo Labs Research",
      description: "Prep guide for running large models distributed across devices",
      project: "Infrastructure",
      agent: "scout",
      timeAgo: "3 days ago",
      priority: "low",
    },
    {
      id: "3",
      title: "Pre-train Local Model",
      description: "Fine-tune open-source model on Zak's writing voice and investment memos",
      project: "AI",
      agent: "mrq",
      timeAgo: "4 days ago",
      priority: "low",
    },
    {
      id: "4",
      title: "Vercel Webhook",
      description: "Set up auto-deploy hook for mission-control repo",
      project: "DevOps",
      agent: "mrq",
      timeAgo: "1 day ago",
      priority: "low",
    },
  ] as Task[],
  inProgress: [
    {
      id: "5",
      title: "BlackAI Event Prep",
      description: "Finalize speakers, promo content, and run-of-show for March 24 event",
      project: "Off Plan #001",
      agent: "mrq",
      timeAgo: "2 hours ago",
      priority: "high",
    },
    {
      id: "6",
      title: "TopUpScout Deploy",
      description: "Deploy landing page to Vercel — 977 emails ready, $11.6M TAM validated",
      project: "TopUpScout",
      agent: "scout",
      timeAgo: "1 hour ago",
      priority: "high",
    },
    {
      id: "7",
      title: "Portfolio Monitoring Setup",
      description: "Populate Affinity portfolio monitoring list (currently empty, 40 companies)",
      project: "Inner Foundation",
      agent: "analyst",
      timeAgo: "3 hours ago",
      priority: "medium",
    },
    {
      id: "8",
      title: "LinkedIn Newsletter Strategy",
      description: "Repost byqqa content to LinkedIn → funnel to Beehiiv (2.9K subs dormant)",
      project: "Growth",
      agent: "mrq",
      timeAgo: "4 hours ago",
      priority: "medium",
    },
    {
      id: "9",
      title: "WHOOP Recovery Analysis",
      description: "Analyze strain/recovery trends, identify patterns affecting performance",
      project: "Health",
      agent: "doc",
      timeAgo: "5 hours ago",
      priority: "medium",
    },
  ] as Task[],
  review: [
    {
      id: "10",
      title: "$10K Revenue Roadmap",
      description: "AI consulting + digital products + content systems path to $10K MRR",
      project: "byqqa",
      agent: "mrq",
      timeAgo: "1 day ago",
      priority: "high",
    },
  ] as Task[],
};

export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  agent: string;
  timeAgo: string;
  priority: "high" | "medium" | "low";
}

export const projects = [
  {
    name: "byqqa Empire Building",
    progress: 67,
    tasks: { done: 16, total: 24 },
    icon: "🏗️",
  },
  {
    name: "Inner Foundation",
    progress: 33,
    tasks: { apps: 337, invested: 5, conversion: "1.5%" },
    icon: "💼",
  },
  {
    name: "Off Plan Events",
    progress: 25,
    next: "BlackAI — March 24",
    speakers: "Yasaar, Binette + TBA",
    icon: "🎤",
  },
  {
    name: "TopUpScout",
    progress: 85,
    emails: 977,
    tam: "$11.6M",
    icon: "📱",
  },
];

export const recentActivity = [
  { agent: "Mr Q", action: "Morning brief: Norrsken Angel Session at 08:30 CET", time: "2 hours ago" },
  { agent: "Scout", action: "Research: 4 trending AI pain points on X + Reddit", time: "3 hours ago" },
  { agent: "AnalystQ", action: "Inbox triage: 10 unread, 3 high priority", time: "4 hours ago" },
  { agent: "Mr Q", action: "Deployed Mission Control Next.js build", time: "5 hours ago" },
  { agent: "Scout", action: "Tweet thread: AI due diligence trends", time: "6 hours ago" },
  { agent: "Doc", action: "Sleep analysis: 7h 12m, recovery 72%", time: "8 hours ago" },
];

export const weeklyStats = {
  total: 42,
  inProgress: 5,
  thisWeek: 19,
  completion: 45,
};
