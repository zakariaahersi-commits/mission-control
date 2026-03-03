"use client";

import { useState, useEffect } from "react";

// Real data placeholders (will be populated from API)
const realData = {
  beehiiv: {
    byqqaSubs: 342, // Current newsletter subs
    playbookSubs: 156,
    totalSubs: 498,
    growth: 23, // New subs this week
  },
  x: {
    followers: 3253,
    growth: 47, // New followers this week
    impressions: 12400,
    engagement: 4.2,
  },
  costs: {
    openrouter: 12.45, // This month
    vercel: 0, // Free tier
    beehiiv: 0, // Free tier
    total: 12.45,
  },
  mrr: {
    target: 10000,
    projected: 0, // Not live yet
  },
  drq: {
    age: 41,
    whoopAge: 44.4,
    garminAge: 43,
    weight: 108,
    targetWeight: 98,
    targetDate: "2026-05-09", // Hyrox
    hrv: 40.9,
    sleepConsistency: 68,
    recovery: 71,
    workouts: 15,
  },
};

interface AgentStats {
  name: string;
  avatar: string;
  tasksCompleted: number;
  tasksPending: number;
  efficiency: number;
  apiCost: number;
}

const agentStats: AgentStats[] = [
  {
    name: "Mr Q",
    avatar: "🎩",
    tasksCompleted: 47,
    tasksPending: 8,
    efficiency: 94,
    apiCost: 4.23,
  },
  {
    name: "Analyst",
    avatar: "📊",
    tasksCompleted: 156,
    tasksPending: 12,
    efficiency: 87,
    apiCost: 3.87,
  },
  {
    name: "Scout",
    avatar: "🔭",
    tasksCompleted: 89,
    tasksPending: 5,
    efficiency: 91,
    apiCost: 2.91,
  },
  {
    name: "Doc",
    avatar: "🧬",
    tasksCompleted: 34,
    tasksPending: 3,
    efficiency: 96,
    apiCost: 1.44,
  },
];

const weeklyActivity = [
  { day: "Mon", tasks: 23, cost: 1.8 },
  { day: "Tue", tasks: 31, cost: 2.4 },
  { day: "Wed", tasks: 19, cost: 1.2 },
  { day: "Thu", tasks: 42, cost: 3.1 },
  { day: "Fri", tasks: 38, cost: 2.6 },
  { day: "Sat", tasks: 12, cost: 0.7 },
  { day: "Sun", tasks: 8, cost: 0.65 },
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maxTasks = Math.max(...weeklyActivity.map(d => d.tasks));
  const totalTasks = agentStats.reduce((sum, a) => sum + a.tasksCompleted + a.tasksPending, 0);
  const avgEfficiency = Math.round(agentStats.reduce((sum, a) => sum + a.efficiency, 0) / agentStats.length);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          <span className="gradient-text">📊 Dashboard</span>
        </h2>
        <p className="text-[#6b6b75] text-sm">Real-time metrics across revenue, costs, audience, and health</p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {/* MRR Target */}
        <div className="stat-card">
          <div className="stat-value">${realData.mrr.target.toLocaleString()}</div>
          <div className="stat-label">MRR Target (June 2026)</div>
          <div className="mt-3 progress-bar" style={{ height: '4px' }}>
            <div className="progress-fill" style={{ width: '0%' }} />
          </div>
          <div className="mt-2 text-xs text-[#6b6b75]">Pre-revenue — launching soon</div>
        </div>

        {/* Total Audience */}
        <div className="stat-card">
          <div className="stat-value">{(realData.beehiiv.totalSubs + realData.x.followers).toLocaleString()}</div>
          <div className="stat-label">Total Audience</div>
          <div className="mt-3 flex flex-col gap-1 text-xs">
            <div className="flex justify-between">
              <span className="text-[#6b6b75]">Beehiiv</span>
              <span className="text-[#a1a1aa]">{realData.beehiiv.totalSubs} subs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b6b75]">X/Twitter</span>
              <span className="text-[#a1a1aa]">{realData.x.followers} followers</span>
            </div>
          </div>
        </div>

        {/* API Costs */}
        <div className="stat-card">
          <div className="stat-value text-[#ef4444]">${realData.costs.total.toFixed(2)}</div>
          <div className="stat-label">API Costs (This Month)</div>
          <div className="mt-3 flex flex-col gap-1 text-xs">
            <div className="flex justify-between">
              <span className="text-[#6b6b75]">OpenRouter</span>
              <span className="text-[#a1a1aa]">${realData.costs.openrouter.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b6b75]">Runway</span>
              <span className="text-[#10b981]">${(50 - realData.costs.total).toFixed(2)} left</span>
            </div>
          </div>
        </div>

        {/* Agent Efficiency */}
        <div className="stat-card">
          <div className="stat-value">{avgEfficiency}%</div>
          <div className="stat-label">Avg Agent Efficiency</div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[#10b981] text-xs">+12% vs last week</span>
          </div>
          <div className="mt-2 text-xs text-[#6b6b75]">{totalTasks} total tasks</div>
        </div>
      </div>

      {/* Audience Growth */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="graph-container">
          <h3 className="text-sm font-semibold text-[#a1a1aa] mb-4 flex items-center gap-2">
            <span>📧</span> Beehiiv Newsletter Growth
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div>
              <div className="text-2xl font-bold text-[#fafafa]">{realData.beehiiv.totalSubs}</div>
              <div className="text-xs text-[#6b6b75]">Total subscribers</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-lg font-bold text-[#10b981]">+{realData.beehiiv.growth}</div>
              <div className="text-xs text-[#6b6b75]">This week</div>
            </div>
          </div>
          <div className="flex items-end justify-between h-24 gap-2">
            {[65, 78, 82, 95, 112, 134, 156].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#7c3aed] to-[#a78bfa] opacity-80"
                  style={{ height: `${(val / 156) * 100}%` }}
                />
                <span className="text-xs text-[#6b6b75]">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="graph-container">
          <h3 className="text-sm font-semibold text-[#a1a1aa] mb-4 flex items-center gap-2">
            <span>🐦</span> X/Twitter Growth
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div>
              <div className="text-2xl font-bold text-[#fafafa]">{realData.x.followers.toLocaleString()}</div>
              <div className="text-xs text-[#6b6b75]">Followers</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-lg font-bold text-[#10b981]">+{realData.x.growth}</div>
              <div className="text-xs text-[#6b6b75]">This week</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-3 bg-[#1a1a20] rounded-lg">
              <div className="text-sm font-bold text-[#fafafa]">{realData.x.impressions.toLocaleString()}</div>
              <div className="text-xs text-[#6b6b75]">Impressions (7d)</div>
            </div>
            <div className="p-3 bg-[#1a1a20] rounded-lg">
              <div className="text-sm font-bold text-[#fafafa]">{realData.x.engagement}%</div>
              <div className="text-xs text-[#6b6b75]">Engagement rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Performance */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-[#a1a1aa] mb-4 flex items-center gap-2">
          <span>👥</span> Agent Performance
        </h3>
        <div className="grid grid-cols-4 gap-6">
          {agentStats.map((agent, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5e6ad2] to-[#7c3aed] flex items-center justify-center text-xl">
                  {agent.avatar}
                </div>
                <div>
                  <div className="font-semibold">{agent.name}</div>
                  <div className="text-xs text-[#6b6b75]">Agent</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b6b75]">Tasks Done</span>
                  <span className="font-medium">{agent.tasksCompleted}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b6b75]">Pending</span>
                  <span className="font-medium">{agent.tasksPending}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b6b75]">Efficiency</span>
                  <span className={`font-medium ${agent.efficiency >= 90 ? 'text-[#10b981]' : 'text-[#f59e0b]'}`}>
                    {agent.efficiency}%
                  </span>
                </div>
                <div className="pt-3 border-t border-[#27272f]">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6b6b75]">API Cost</span>
                    <span className="text-[#ef4444]">${agent.apiCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Cost Tracker */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="graph-container">
          <h3 className="text-sm font-semibold text-[#a1a1aa] mb-4">💸 API Costs (This Week)</h3>
          <div className="flex items-end justify-between h-32 gap-2">
            {weeklyActivity.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#ef4444] to-[#f87171] opacity-80"
                  style={{ height: `${(day.cost / 3.1) * 100}%` }}
                />
                <span className="text-xs text-[#6b6b75]">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-[#6b6b75]">Total this week</span>
            <span className="font-medium text-[#ef4444]">$12.45</span>
          </div>
        </div>

        <div className="graph-container">
          <h3 className="text-sm font-semibold text-[#a1a1aa] mb-4">📈 Tasks Completed (This Week)</h3>
          <div className="flex items-end justify-between h-32 gap-2">
            {weeklyActivity.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#5e6ad2] to-[#7c3aed] opacity-80"
                  style={{ height: `${(day.tasks / maxTasks) * 100}%` }}
                />
                <span className="text-xs text-[#6b6b75]">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-[#6b6b75]">Total this week</span>
            <span className="font-medium">173 tasks</span>
          </div>
        </div>
      </div>

      {/* Dr Q Health Metrics */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-[#a1a1aa] flex items-center gap-2">
            <span>🧬</span> Dr Q — Health & Longevity Targets
          </h3>
          <span className="text-xs text-[#f59e0b]">Hyrox goal: May 9, 2026</span>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Biological Age */}
          <div className="p-4 bg-[#1a1a20] rounded-lg border border-[#27272f]">
            <div className="text-xs text-[#6b6b75] mb-2">Biological Age</div>
            <div className="flex items-baseline gap-2 mb-3">
              <div className="text-3xl font-bold text-[#f59e0b]">{realData.drq.whoopAge}</div>
              <div className="text-sm text-[#6b6b75]">years</div>
            </div>
            <div className="text-xs text-[#6b6b75] mb-1">Chronological: {realData.drq.age} years</div>
            <div className="text-xs text-[#ef4444]">+{((realData.drq.whoopAge - realData.drq.age) * 10).toFixed(0)} months older</div>
            
            <div className="mt-4 pt-4 border-t border-[#27272f]">
              <div className="text-xs text-[#6b6b75] mb-1">Target</div>
              <div className="text-lg font-bold text-[#10b981]">&lt;{realData.drq.age} years</div>
            </div>
          </div>

          {/* Weight */}
          <div className="p-4 bg-[#1a1a20] rounded-lg border border-[#27272f]">
            <div className="text-xs text-[#6b6b75] mb-2">Weight</div>
            <div className="flex items-baseline gap-2 mb-3">
              <div className="text-3xl font-bold text-[#fafafa]">{realData.drq.weight}</div>
              <div className="text-sm text-[#6b6b75]">kg</div>
            </div>
            <div className="text-xs text-[#6b6b75] mb-1">Target: {realData.drq.targetWeight} kg</div>
            <div className="text-xs text-[#ef4444]">{realData.drq.weight - realData.drq.targetWeight} kg to lose</div>
            
            <div className="mt-4 pt-4 border-t border-[#27272f]">
              <div className="progress-bar" style={{ height: '4px' }}>
                <div className="progress-fill" style={{ width: `${((120 - realData.drq.weight) / (120 - realData.drq.targetWeight)) * 100}%` }} />
              </div>
              <div className="text-xs text-[#6b6b75] mt-2">Deadline: {realData.drq.targetDate}</div>
            </div>
          </div>

          {/* HRV & Recovery */}
          <div className="p-4 bg-[#1a1a20] rounded-lg border border-[#27272f]">
            <div className="text-xs text-[#6b6b75] mb-2">HRV / Recovery</div>
            <div className="flex items-baseline gap-2 mb-3">
              <div className="text-3xl font-bold text-[#fafafa]">{realData.drq.hrv}</div>
              <div className="text-sm text-[#6b6b75]">ms</div>
            </div>
            <div className="text-xs text-[#6b6b75] mb-1">Recovery: {realData.drq.recovery}%</div>
            <div className="text-xs text-[#10b981]">Good recovery trend</div>
            
            <div className="mt-4 pt-4 border-t border-[#27272f]">
              <div className="text-xs text-[#6b6b75] mb-1">Sleep consistency</div>
              <div className="text-lg font-bold text-[#f59e0b]">{realData.drq.sleepConsistency}%</div>
              <div className="text-xs text-[#6b6b75] mt-1">Target: &gt;85%</div>
            </div>
          </div>

          {/* Workouts */}
          <div className="p-4 bg-[#1a1a20] rounded-lg border border-[#27272f]">
            <div className="text-xs text-[#6b6b75] mb-2">Training Load</div>
            <div className="flex items-baseline gap-2 mb-3">
              <div className="text-3xl font-bold text-[#fafafa]">{realData.drq.workouts}</div>
              <div className="text-sm text-[#6b6b75]">workouts/month</div>
            </div>
            <div className="text-xs text-[#6b6b75] mb-1">Target: 20/month</div>
            <div className="text-xs text-[#f59e0b]">5 short of target</div>
            
            <div className="mt-4 pt-4 border-t border-[#27272f]">
              <div className="progress-bar" style={{ height: '4px' }}>
                <div className="progress-fill" style={{ width: '75%' }} />
              </div>
              <div className="text-xs text-[#6b6b75] mt-2">Hyrox prep in progress</div>
            </div>
          </div>
        </div>

        {/* Health Roadmap */}
        <div className="mt-6 p-4 bg-[#1a1a20] rounded-lg border border-[#27272f]">
          <div className="text-xs text-[#6b6b75] mb-3">Longevity Roadmap</div>
          <div className="flex justify-between">
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-[#10b981] mx-auto mb-2" />
              <div className="text-xs font-medium">WHOOP &lt;44</div>
              <div className="text-xs text-[#10b981] mt-1">✅ Done</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-[#10b981] mx-auto mb-2" />
              <div className="text-xs font-medium">98kg</div>
              <div className="text-xs text-[#f59e0b] mt-1">In progress</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-[#7c3aed] mx-auto mb-2 animate-pulse" />
              <div className="text-xs font-medium">WHOOP &lt;41</div>
              <div className="text-xs text-[#6b6b75] mt-1">By Hyrox</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-[#27272f] mx-auto mb-2" />
              <div className="text-xs font-medium">HRV &gt;60ms</div>
              <div className="text-xs text-[#6b6b75] mt-1">Q3 2026</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-[#27272f] mx-auto mb-2" />
              <div className="text-xs font-medium">Sleep 85%+</div>
              <div className="text-xs text-[#6b6b75] mt-1">Ongoing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-[#a1a1aa] mb-4 flex items-center gap-2">
          <span>⚡</span> Live Activity
        </h3>
        <div className="space-y-0">
          <div className="activity-item flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#10b981] mt-1.5" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium text-[#5e6ad2]">Mr Q</span> deployed Mission Control v2
              </p>
              <p className="text-xs text-[#6b6b75] mt-0.5">Just now</p>
            </div>
          </div>
          <div className="activity-item flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#10b981] mt-1.5" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium text-[#5e6ad2]">Analyst</span> synced 47 Affinity contacts
              </p>
              <p className="text-xs text-[#6b6b75] mt-0.5">18 min ago</p>
            </div>
          </div>
          <div className="activity-item flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#10b981] mt-1.5" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium text-[#5e6ad2]">Scout</span> published trend report: AI Due Diligence
              </p>
              <p className="text-xs text-[#6b6b75] mt-0.5">1 hour ago</p>
            </div>
          </div>
          <div className="activity-item flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1.5" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium text-[#5e6ad2]">Doc</span> updated WHOOP recovery analysis
              </p>
              <p className="text-xs text-[#6b6b75] mt-0.5">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
