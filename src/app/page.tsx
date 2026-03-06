"use client";

import { useState } from "react";
import TaskBoard from "@/components/TaskBoard";
import MetricsBoard from "@/components/MetricsBoard";
import { agents, projects, recentActivity } from "@/app/data/real-data";

const navItems = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "tasks", label: "Tasks", icon: "▦" },
  { id: "metrics", label: "Metrics", icon: "📊" },
  { id: "agents", label: "Agents", icon: "🤖" },
  { id: "memory", label: "Memory", icon: "🧠" },
  { id: "docs", label: "Docs", icon: "📄" },
];

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "tasks":
        return <TaskBoard />;
      case "metrics":
        return <MetricsBoard />;
      case "agents":
        return <AgentsView />;
      default:
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p className="text-[#525252] text-sm">Coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <aside className="w-56 bg-black border-r border-[#1a1a1a] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#1a1a1a] flex items-center justify-center text-sm">
              🎩
            </div>
            <div>
              <h1 className="text-sm font-semibold">Mission Control</h1>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                activeTab === item.id
                  ? "bg-[#1a1a1a] text-[#fafafa]"
                  : "text-[#a1a1aa] hover:bg-[#0a0a0a] hover:text-[#fafafa]"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-xs font-bold">
              Z
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium">Zak</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

function Overview() {
  return (
    <div className="p-6">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#fafafa] mb-2">Good morning, Zak</h1>
        <p className="text-sm text-[#525252]">Here's what's happening across your empire</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard label="MRR" value="$0" target="/ $10K" icon="💰" />
        <StatCard label="In Progress" value="5" subtext="tasks" icon="🔄" />
        <StatCard label="This Week" value="19" subtext="completed" icon="✓" />
        <StatCard label="Pipeline" value="337" subtext="deals" icon="💼" />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Activity - 2 columns */}
        <div className="col-span-2">
          <h2 className="text-sm font-semibold text-[#525252] uppercase tracking-wide mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium ${
                    activity.agent === "Mr Q" ? "text-[#f59e0b]" :
                    activity.agent === "Scout" ? "text-[#22c55e]" :
                    activity.agent === "AnalystQ" ? "text-[#3b82f6]" :
                    "text-[#8b5cf6]"
                  }`}>
                    {activity.agent}
                  </span>
                  <span className="text-xs text-[#525252]">•</span>
                  <span className="text-xs text-[#525252]">{activity.time}</span>
                </div>
                <p className="text-sm text-[#a1a1aa]">{activity.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects - 1 column */}
        <div>
          <h2 className="text-sm font-semibold text-[#525252] uppercase tracking-wide mb-4">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{project.icon}</span>
                  <span className="text-xs font-medium text-[#fafafa]">{project.name}</span>
                </div>
                {project.progress !== undefined && (
                  <>
                    <div className="w-full bg-[#1a1a1a] rounded-full h-1.5 mb-2">
                      <div 
                        className="bg-[#3b82f6] h-1.5 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#525252]">{project.progress}% complete</p>
                  </>
                )}
                {project.emails && (
                  <p className="text-xs text-[#525252]">{project.emails} emails • {project.tam}</p>
                )}
                {project.next && (
                  <p className="text-xs text-[#525252]">Next: {project.next}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, target, subtext, icon }: { label: string; value: string; target?: string; subtext?: string; icon: string }) {
  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <span className="text-xs text-[#525252]">{label}</span>
      </div>
      <div className="text-2xl font-bold text-[#fafafa]">
        {value}
        {target && <span className="text-sm font-normal text-[#525252] ml-1">{target}</span>}
      </div>
      {subtext && <div className="text-xs text-[#525252] mt-1">{subtext}</div>}
    </div>
  );
}

function AgentsView() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Agent Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {agents.map(agent => (
          <div key={agent.id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 text-center">
            <div className="text-5xl mb-4">{agent.icon}</div>
            <h3 className="text-lg font-bold text-[#fafafa] mb-1">{agent.name}</h3>
            <p className="text-sm text-[#525252] mb-3">{agent.role}</p>
            <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${
              agent.status === "active" 
                ? "bg-[#22c55e]/10 text-[#22c55e]" 
                : "bg-[#525252]/10 text-[#525252]"
            }`}>
              {agent.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
