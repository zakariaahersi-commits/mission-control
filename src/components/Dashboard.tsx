"use client";

import { useState, useEffect } from "react";

// Real data
const realData = {
  beehiiv: {
    byqqaSubs: 342,
    playbookSubs: 156,
    totalSubs: 498,
    growth: 23,
  },
  x: {
    followers: 3253,
    growth: 47,
    impressions: 12400,
    engagement: 4.2,
  },
  costs: {
    openrouter: 12.45,
    claude: 175.00, // Pro plan + overage
    vercel: 0,
    beehiiv: 0,
    total: 187.45,
  },
  mrr: {
    target: 10000,
    projected: 0,
  },
  drq: {
    age: 41,
    whoopAge: 44.4,
    garminAge: 43,
    weight: 108,
    targetWeight: 98,
    targetDate: "2026-05-09",
    hrv: 40.9,
    sleepConsistency: 68,
    recovery: 71,
    workouts: 15,
  },
};

interface AgentStats {
  name: string;
  avatar: string;
  role: string;
  tasksCompleted: number;
  tasksPending: number;
  efficiency: number;
  apiCost: number;
  status: "active" | "idle" | "busy";
}

const agentStats: AgentStats[] = [
  {
    name: "Mr Q",
    avatar: "🎩",
    role: "Chief of Staff",
    tasksCompleted: 47,
    tasksPending: 8,
    efficiency: 94,
    apiCost: 4.23,
    status: "active",
  },
  {
    name: "Analyst",
    avatar: "📊",
    role: "Investment Analyst",
    tasksCompleted: 156,
    tasksPending: 12,
    efficiency: 87,
    apiCost: 3.87,
    status: "busy",
  },
  {
    name: "Scout",
    avatar: "🔭",
    role: "Trend Hunter",
    tasksCompleted: 89,
    tasksPending: 5,
    efficiency: 91,
    apiCost: 2.91,
    status: "active",
  },
  {
    name: "Doc",
    avatar: "🧬",
    role: "Health & Wellness",
    tasksCompleted: 34,
    tasksPending: 3,
    efficiency: 96,
    apiCost: 1.44,
    status: "idle",
  },
];

const weeklyData = [
  { day: "Mon", tasks: 23, cost: 12.4, revenue: 0 },
  { day: "Tue", tasks: 31, cost: 18.2, revenue: 0 },
  { day: "Wed", tasks: 19, cost: 9.8, revenue: 0 },
  { day: "Thu", tasks: 42, cost: 31.5, revenue: 0 },
  { day: "Fri", tasks: 38, cost: 26.1, revenue: 0 },
  { day: "Sat", tasks: 12, cost: 7.3, revenue: 0 },
  { day: "Sun", tasks: 8, cost: 5.65, revenue: 0 },
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maxTasks = Math.max(...weeklyData.map(d => d.tasks));
  const maxCost = Math.max(...weeklyData.map(d => d.cost));
  const totalTasks = agentStats.reduce((sum, a) => sum + a.tasksCompleted + a.tasksPending, 0);
  const avgEfficiency = Math.round(agentStats.reduce((sum, a) => sum + a.efficiency, 0) / agentStats.length);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-[#10b981]";
      case "busy": return "bg-[#f59e0b]";
      case "idle": return "bg-[#6b6b75]";
      default: return "bg-[#6b6b75]";
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#0d0d0f] via-[#0f0f13] to-[#111118]">
      {/* Animated background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#7c3aed] opacity-[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#5e6ad2] opacity-[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#fafafa] via-[#a78bfa] to-[#5e6ad2] bg-clip-text text-transparent">
              📊 Mission Control
            </h2>
            <p className="text-[#6b6b75] text-sm">Real-time command center for your AI organization</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-[#1a1a20] border border-[#27272f] text-xs">
              <span className="text-[#10b981]">●</span> All systems operational
            </div>
          </div>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {/* MRR Target */}
        <div
          className={`stat-card cursor-pointer transition-all duration-300 ${hoveredCard === 'mrr' ? 'glow-purple border-[#7c3aed]' : ''}`}
          onMouseEnter={() => setHoveredCard('mrr')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => setSelectedStat(selectedStat === 'mrr' ? null : 'mrr')}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#6b6b75]">Revenue Target</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30">
              June 2026
            </span>
          </div>
          <div className="stat-value text-left mb-2">${realData.mrr.target.toLocaleString()}</div>
          <div className="progress-bar" style={{ height: '3px' }}>
            <div className="progress-fill" style={{ width: '26%' }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-[#6b6b75]">Current: $0</span>
            <span className="text-[#10b981]">Pre-revenue</span>
          </div>
        </div>

        {/* Total Audience */}
        <div
          className={`stat-card cursor-pointer transition-all duration-300 ${hoveredCard === 'audience' ? 'glow-purple border-[#7c3aed]' : ''}`}
          onMouseEnter={() => setHoveredCard('audience')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => setSelectedStat(selectedStat === 'audience' ? null : 'audience')}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#6b6b75]">Total Audience</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30">
              +{realData.beehiiv.growth + realData.x.growth}
            </span>
          </div>
          <div className="stat-value text-left mb-4">{(realData.beehiiv.totalSubs + realData.x.followers).toLocaleString()}</div>
          <div className="flex items-center gap-3">
            <div className="flex-1 p-2 rounded-lg bg-[#1a1a20]">
              <div className="text-xs text-[#6b6b75]">Beehiiv</div>
              <div className="text-sm font-semibold">{realData.beehiiv.totalSubs}</div>
            </div>
            <div className="flex-1 p-2 rounded-lg bg-[#1a1a20]">
              <div className="text-xs text-[#6b6b75]">X</div>
              <div className="text-sm font-semibold">{realData.x.followers}</div>
            </div>
          </div>
        </div>

        {/* Total Costs */}
        <div
          className={`stat-card cursor-pointer transition-all duration-300 ${hoveredCard === 'costs' ? 'glow-purple border-[#7c3aed]' : ''}`}
          onMouseEnter={() => setHoveredCard('costs')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => setSelectedStat(selectedStat === 'costs' ? null : 'costs')}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#6b6b75]">Monthly Burn</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]/30">
              -$187.45
            </span>
          </div>
          <div className="stat-value text-left text-[#ef4444] mb-4">${realData.costs.total.toFixed(2)}</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6b6b75]">Claude API</span>
              <span className="font-medium text-[#fafafa]">${realData.costs.claude.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6b6b75]">OpenRouter</span>
              <span className="font-medium text-[#fafafa]">${realData.costs.openrouter.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Agent Efficiency */}
        <div
          className={`stat-card cursor-pointer transition-all duration-300 ${hoveredCard === 'efficiency' ? 'glow-purple border-[#7c3aed]' : ''}`}
          onMouseEnter={() => setHoveredCard('efficiency')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => setSelectedStat(selectedStat === 'efficiency' ? null : 'efficiency')}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#6b6b75]">Agent Efficiency</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30">
              +12%
            </span>
          </div>
          <div className="stat-value text-left mb-2">{avgEfficiency}%</div>
          <div className="progress-bar mb-2" style={{ height: '3px' }}>
            <div className="progress-fill" style={{ width: `${avgEfficiency}%` }} />
          </div>
          <div className="text-xs text-[#6b6b75]">{totalTasks} total tasks</div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-[#a1a1aa] flex items-center gap-2">
            <span>👥</span> Agent Fleet
          </h3>
          <span className="text-xs text-[#6b6b75]">Click to view details</span>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {agentStats.map((agent, i) => (
            <div
              key={i}
              className={`card p-5 cursor-pointer transition-all duration-300 hover:border-[#5e6ad2] ${selectedAgent === agent.name ? 'border-[#5e6ad2] ring-1 ring-[#5e6ad2]' : ''}`}
              onClick={() => setSelectedAgent(selectedAgent === agent.name ? null : agent.name)}
              onMouseEnter={() => setHoveredCard(`agent-${agent.name}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5e6ad2] to-[#7c3aed] flex items-center justify-center text-2xl shadow-lg">
                    {agent.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0d0d0f] ${getStatusColor(agent.status)}`} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{agent.name}</div>
                  <div className="text-xs text-[#6b6b75]">{agent.role}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[#1a1a20]">
                  <div className="text-xs text-[#6b6b75]">Done</div>
                  <div className="text-sm font-bold">{agent.tasksCompleted}</div>
                </div>
                <div className="p-2 rounded-lg bg-[#1a1a20]">
                  <div className="text-xs text-[#6b6b75]">Pending</div>
                  <div className="text-sm font-bold">{agent.tasksPending}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-[#6b6b75]">Efficiency</span>
                <span className={`font-medium ${agent.efficiency >= 90 ? 'text-[#10b981]' : 'text-[#f59e0b]'}`}>
                  {agent.efficiency}%
                </span>
              </div>

              <div className="pt-3 border-t border-[#27272f]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6b6b75]">API Cost</span>
                  <span className="font-medium text-[#ef4444]">${agent.apiCost.toFixed(2)}</span>
                </div>
                <div className="progress-bar mt-2" style={{ height: '2px' }}>
                  <div className="progress-fill bg-[#ef4444]" style={{ width: `${(agent.apiCost / 5) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Tasks Chart */}
        <div className="graph-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-[#a1a1aa] flex items-center gap-2">
              <span>📈</span> Tasks Completed
            </h3>
            <span className="text-xs text-[#10b981]">173 this week</span>
          </div>
          <div className="flex items-end justify-between h-32 gap-3">
            {weeklyData.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative w-full">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-[#5e6ad2] to-[#a78bfa] opacity-60 group-hover:opacity-100 transition-all duration-300"
                    style={{ height: mounted ? `${(day.tasks / maxTasks) * 100}%` : '0%', minHeight: '8px' }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1a1a20] border border-[#27272f] rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.tasks} tasks
                  </div>
                </div>
                <span className="text-xs text-[#6b6b75]">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Chart */}
        <div className="graph-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-[#a1a1aa] flex items-center gap-2">
              <span>💸</span> API Costs
            </h3>
            <span className="text-xs text-[#ef4444]">$110.95 this week</span>
          </div>
          <div className="flex items-end justify-between h-32 gap-3">
            {weeklyData.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative w-full">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-[#ef4444] to-[#f87171] opacity-60 group-hover:opacity-100 transition-all duration-300"
                    style={{ height: mounted ? `${(day.cost / maxCost) * 100}%` : '0%', minHeight: '8px' }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1a1a20] border border-[#27272f] rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${day.cost.toFixed(2)}
                  </div>
                </div>
                <span className="text-xs text-[#6b6b75]">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dr Q Health Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-[#a1a1aa] flex items-center gap-2">
            <span>🧬</span> Dr Q — Health & Longevity
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-[#f59e0b]/20 text-[#fcd34d] border border-[#f59e0b]/30">
            🎯 Hyrox: {realData.drq.targetDate}
          </span>
        </div>

        <div className="card p-6 overflow-hidden relative">
          {/* Background gradient */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#f59e0b]/5 to-transparent rounded-full blur-[80px]" />

          <div className="grid grid-cols-4 gap-6 relative">
            {/* Biological Age */}
            <div className="group cursor-pointer" onClick={() => setSelectedStat(selectedStat === 'bioage' ? null : 'bioage')}>
              <div className="p-4 rounded-xl bg-[#1a1a20] border border-[#27272f] group-hover:border-[#f59e0b] transition-all">
                <div className="text-xs text-[#6b6b75] mb-3">Biological Age</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="text-4xl font-bold text-[#f59e0b]">{realData.drq.whoopAge}</div>
                  <div className="text-sm text-[#6b6b75]">years</div>
                </div>
                <div className="text-xs text-[#6b6b75] mb-3">Chronological: {realData.drq.age} years</div>
                <div className="text-xs text-[#ef4444]">+{(realData.drq.whoopAge - realData.drq.age).toFixed(1)} years older</div>
                <div className="mt-4 pt-4 border-t border-[#27272f]">
                  <div className="text-xs text-[#6b6b75] mb-1">Target</div>
                  <div className="text-lg font-bold text-[#10b981]">&lt;{realData.drq.age} years</div>
                </div>
              </div>
            </div>

            {/* Weight */}
            <div className="group cursor-pointer" onClick={() => setSelectedStat(selectedStat === 'weight' ? null : 'weight')}>
              <div className="p-4 rounded-xl bg-[#1a1a20] border border-[#27272f] group-hover:border-[#5e6ad2] transition-all">
                <div className="text-xs text-[#6b6b75] mb-3">Weight</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="text-4xl font-bold text-[#fafafa]">{realData.drq.weight}</div>
                  <div className="text-sm text-[#6b6b75]">kg</div>
                </div>
                <div className="text-xs text-[#6b6b75] mb-1">Target: {realData.drq.targetWeight} kg</div>
                <div className="text-xs text-[#ef4444]">{realData.drq.weight - realData.drq.targetWeight} kg to lose</div>
                <div className="mt-4 pt-4 border-t border-[#27272f]">
                  <div className="progress-bar mb-2" style={{ height: '4px' }}>
                    <div className="progress-fill" style={{ width: `${((120 - realData.drq.weight) / 22) * 100}%` }} />
                  </div>
                  <div className="text-xs text-[#6b6b75]">{realData.drq.targetDate}</div>
                </div>
              </div>
            </div>

            {/* HRV & Recovery */}
            <div className="group cursor-pointer" onClick={() => setSelectedStat(selectedStat === 'hrv' ? null : 'hrv')}>
              <div className="p-4 rounded-xl bg-[#1a1a20] border border-[#27272f] group-hover:border-[#10b981] transition-all">
                <div className="text-xs text-[#6b6b75] mb-3">Recovery / HRV</div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <div className="text-2xl font-bold text-[#10b981]">{realData.drq.recovery}%</div>
                    <div className="text-xs text-[#6b6b75]">Recovery</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#5e6ad2]">{realData.drq.hrv}</div>
                    <div className="text-xs text-[#6b6b75]">HRV (ms)</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#27272f]">
                  <div className="text-xs text-[#6b6b75] mb-1">Sleep consistency</div>
                  <div className="text-lg font-bold text-[#f59e0b]">{realData.drq.sleepConsistency}%</div>
                  <div className="text-xs text-[#6b6b75] mt-1">Target: &gt;85%</div>
                </div>
              </div>
            </div>

            {/* Training */}
            <div className="group cursor-pointer" onClick={() => setSelectedStat(selectedStat === 'training' ? null : 'training')}>
              <div className="p-4 rounded-xl bg-[#1a1a20] border border-[#27272f] group-hover:border-[#7c3aed] transition-all">
                <div className="text-xs text-[#6b6b75] mb-3">Training Load</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="text-4xl font-bold text-[#fafafa]">{realData.drq.workouts}</div>
                  <div className="text-sm text-[#6b6b75]">/month</div>
                </div>
                <div className="text-xs text-[#6b6b75] mb-1">Target: 20/month</div>
                <div className="text-xs text-[#f59e0b]">{20 - realData.drq.workouts} short</div>
                <div className="mt-4 pt-4 border-t border-[#27272f]">
                  <div className="progress-bar mb-2" style={{ height: '4px' }}>
                    <div className="progress-fill bg-[#7c3aed]" style={{ width: '75%' }} />
                  </div>
                  <div className="text-xs text-[#6b6b75]">Hyrox prep</div>
                </div>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="mt-6 pt-6 border-t border-[#27272f]">
            <div className="text-xs text-[#6b6b75] mb-4">Longevity Roadmap</div>
            <div className="flex justify-between">
              {[
                { label: "WHOOP <44", status: "done", date: "Done" },
                { label: "98kg", status: "progress", date: "May 9" },
                { label: "WHOOP <41", status: "active", date: "Hyrox" },
                { label: "HRV >60ms", status: "pending", date: "Q3 2026" },
                { label: "Sleep 85%+", status: "pending", date: "Ongoing" },
              ].map((milestone, i) => (
                <div key={i} className="text-center group cursor-pointer">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-2 transition-all ${
                    milestone.status === 'done' ? 'bg-[#10b981]' :
                    milestone.status === 'progress' ? 'bg-[#f59e0b] animate-pulse' :
                    milestone.status === 'active' ? 'bg-[#7c3aed] animate-pulse' :
                    'bg-[#27272f] group-hover:bg-[#3a3a45]'
                  }`} />
                  <div className="text-xs font-medium">{milestone.label}</div>
                  <div className={`text-xs mt-1 ${
                    milestone.status === 'done' ? 'text-[#10b981]' :
                    milestone.status === 'progress' ? 'text-[#f59e0b]' :
                    'text-[#6b6b75]'
                  }`}>{milestone.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-[#a1a1aa] flex items-center gap-2">
            <span>⚡</span> Live Activity
          </h3>
          <button className="text-xs text-[#5e6ad2] hover:text-[#7c3aed] transition-colors">View all</button>
        </div>
        <div className="space-y-0">
          {[
            { agent: "Mr Q", action: "deployed Mission Control v4", time: "Just now", color: "#10b981" },
            { agent: "Analyst", action: "synced 47 Affinity contacts", time: "18 min ago", color: "#10b981" },
            { agent: "Scout", action: "published trend report: AI Due Diligence", time: "1 hour ago", color: "#10b981" },
            { agent: "Doc", action: "updated WHOOP recovery analysis", time: "3 hours ago", color: "#f59e0b" },
            { agent: "Mr Q", action: "completed OAuth for Google Drive", time: "5 hours ago", color: "#10b981" },
          ].map((item, i) => (
            <div key={i} className="group flex items-start gap-3 py-3 hover:bg-[#1a1a20] -mx-3 px-3 rounded-lg cursor-pointer transition-all">
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium text-[#5e6ad2] group-hover:text-[#7c3aed] transition-colors">{item.agent}</span>
                  <span className="text-[#a1a1aa]"> {item.action}</span>
                </p>
                <p className="text-xs text-[#6b6b75] mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
