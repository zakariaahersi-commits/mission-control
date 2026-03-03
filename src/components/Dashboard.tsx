"use client";

import { useState, useEffect } from "react";

interface AgentStats {
  name: string;
  avatar: string;
  tasksCompleted: number;
  tasksPending: number;
  efficiency: number;
  targetMRR: number;
  currentMRR: number;
}

const agentStats: AgentStats[] = [
  {
    name: "Mr Q",
    avatar: "🎩",
    tasksCompleted: 47,
    tasksPending: 8,
    efficiency: 94,
    targetMRR: 4000,
    currentMRR: 1200,
  },
  {
    name: "Analyst",
    avatar: "📊",
    tasksCompleted: 156,
    tasksPending: 12,
    efficiency: 87,
    targetMRR: 3000,
    currentMRR: 800,
  },
  {
    name: "Scout",
    avatar: "🔭",
    tasksCompleted: 89,
    tasksPending: 5,
    efficiency: 91,
    targetMRR: 2000,
    currentMRR: 400,
  },
  {
    name: "Doc",
    avatar: "🧬",
    tasksCompleted: 34,
    tasksPending: 3,
    efficiency: 96,
    targetMRR: 1000,
    currentMRR: 200,
  },
];

const weeklyActivity = [
  { day: "Mon", tasks: 23, revenue: 120 },
  { day: "Tue", tasks: 31, revenue: 180 },
  { day: "Wed", tasks: 19, revenue: 95 },
  { day: "Thu", tasks: 42, revenue: 310 },
  { day: "Fri", tasks: 38, revenue: 265 },
  { day: "Sat", tasks: 12, revenue: 40 },
  { day: "Sun", tasks: 8, revenue: 15 },
];

const mrrProgress = {
  target: 10000,
  current: 2600,
  lastMonth: 1800,
  growth: 44.4,
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maxTasks = Math.max(...weeklyActivity.map(d => d.tasks));

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          <span className="gradient-text">Dashboard</span>
        </h2>
        <p className="text-[#6b6b75] text-sm">Real-time agent performance and revenue tracking</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-5 gap-6 mb-8">
        <div className="stat-card">
          <div className="stat-value">${mrrProgress.current.toLocaleString()}</div>
          <div className="stat-label">Current MRR</div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[#10b981] text-xs font-medium">+${mrrProgress.current - mrrProgress.lastMonth}</span>
            <span className="text-[#10b981] text-xs">({mrrProgress.growth}% this month)</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">${mrrProgress.target.toLocaleString()}</div>
          <div className="stat-label">Target MRR</div>
          <div className="mt-3 progress-bar" style={{ height: '4px' }}>
            <div
              className="progress-fill"
              style={{ width: `${(mrrProgress.current / mrrProgress.target) * 100}%` }}
            />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">
            {agentStats.reduce((sum, a) => sum + a.tasksCompleted + a.tasksPending, 0)}
          </div>
          <div className="stat-label">Total Tasks</div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[#10b981] text-xs">{agentStats.reduce((sum, a) => sum + a.tasksCompleted, 0)} done</span>
            <span className="text-[#6b6b75] text-xs">{agentStats.reduce((sum, a) => sum + a.tasksPending, 0)} pending</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">
            {Math.round(agentStats.reduce((sum, a) => sum + a.efficiency, 0) / agentStats.length)}%
          </div>
          <div className="stat-label">Avg Efficiency</div>
          <div className="mt-3 text-xs text-[#10b981]">
            +12% vs last week
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">4</div>
          <div className="stat-label">Active Agents</div>
          <div className="mt-3 flex -space-x-2">
            {agentStats.map((agent, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5e6ad2] to-[#7c3aed] flex items-center justify-center text-xs border-2 border-[#151519]">
                {agent.avatar}
              </div>
            ))}
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
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#6b6b75]">MRR Progress</span>
                    <span className="text-[#a1a1aa]">${agent.currentMRR}/${agent.targetMRR}</span>
                  </div>
                  <div className="progress-bar" style={{ height: '3px' }}>
                    <div
                      className="progress-fill"
                      style={{ width: `${(agent.currentMRR / agent.targetMRR) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="graph-container">
          <h3 className="text-sm font-semibold text-[#a1a1aa] mb-4">📈 Tasks Completed (This Week)</h3>
          <div className="flex items-end justify-between h-32 gap-2">
            {weeklyActivity.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#5e6ad2] to-[#7c3aed] opacity-80 hover:opacity-100 transition-opacity"
                  style={{
                    height: mounted ? `${(day.tasks / maxTasks) * 100}%` : '0%',
                    minHeight: day.tasks > 0 ? '20px' : '0',
                  }}
                />
                <span className="text-xs text-[#6b6b75]">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="graph-container">
          <h3 className="text-sm font-semibold text-[#a1a1aa] mb-4">💰 Revenue Generated (This Week)</h3>
          <div className="flex items-end justify-between h-32 gap-2">
            {weeklyActivity.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#10b981] to-[#34d399] opacity-80 hover:opacity-100 transition-opacity"
                  style={{
                    height: mounted ? `${(day.revenue / 310) * 100}%` : '0%',
                    minHeight: day.revenue > 0 ? '20px' : '0',
                  }}
                />
                <span className="text-xs text-[#6b6b75]">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MRR Roadmap */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-[#a1a1aa] flex items-center gap-2">
            <span>🎯</span> Path to $10K MRR
          </h3>
          <span className="text-xs text-[#10b981]">On track to hit target by June 2026</span>
        </div>

        <div className="relative">
          <div className="progress-bar" style={{ height: '8px' }}>
            <div
              className="progress-fill"
              style={{ width: `${(mrrProgress.current / mrrProgress.target) * 100}%` }}
            />
          </div>

          <div className="flex justify-between mt-3 text-xs">
            <span className="text-[#6b6b75]">$0</span>
            <span className="text-[#6b6b75]">$2,500</span>
            <span className="text-[#6b6b75]">$5,000</span>
            <span className="text-[#6b6b75]">$7,500</span>
            <span className="text-[#6b6b75]">$10,000</span>
          </div>

          {/* Milestones */}
          <div className="flex justify-between mt-6">
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-[#10b981] mx-auto mb-2" />
              <div className="text-xs font-medium">$1K</div>
              <div className="text-xs text-[#6b6b75] mt-1">✅ Done</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-[#10b981] mx-auto mb-2" />
              <div className="text-xs font-medium">$2.5K</div>
              <div className="text-xs text-[#6b6b75] mt-1">Current</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-[#7c3aed] mx-auto mb-2 animate-pulse" />
              <div className="text-xs font-medium">$5K</div>
              <div className="text-xs text-[#6b6b75] mt-1">April</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-[#27272f] mx-auto mb-2" />
              <div className="text-xs font-medium">$7.5K</div>
              <div className="text-xs text-[#6b6b75] mt-1">May</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-[#27272f] mx-auto mb-2" />
              <div className="text-xs font-medium">$10K</div>
              <div className="text-xs text-[#6b6b75] mt-1">June</div>
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
                <span className="font-medium text-[#5e6ad2]">Mr Q</span> deployed Mission Control dashboard
              </p>
              <p className="text-xs text-[#6b6b75] mt-0.5">2 min ago</p>
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
