"use client";

import { useState } from "react";
import TaskBoard from "@/components/TaskBoard";

const navItems = [
  { id: "tasks", label: "Tasks", icon: "▦" },
  { id: "agents", label: "Agents", icon: "◉" },
  { id: "content", label: "Content", icon: "📝" },
  { id: "approvals", label: "Approvals", icon: "✓" },
  { id: "council", label: "Council", icon: "◈" },
  { id: "calendar", label: "Calendar", icon: "📅" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "memory", label: "Memory", icon: "🧠" },
  { id: "docs", label: "Docs", icon: "📄" },
  { id: "people", label: "People", icon: "👥" },
  { id: "office", label: "Office", icon: "🏢" },
  { id: "team", label: "Team", icon: "👔" },
  { id: "system", label: "System", icon: "⚙" },
  { id: "radar", label: "Radar", icon: "📡" },
  { id: "factory", label: "Factory", icon: "🏭" },
  { id: "pipeline", label: "Pipeline", icon: "◫" },
  { id: "feedback", label: "Feedback", icon: "💬" },
];

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <aside className="w-56 bg-black border-r border-[#1a1a1a] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#1a1a1a] flex items-center justify-center text-sm">
              
            </div>
            <div>
              <h1 className="text-sm font-semibold">Mission Control</h1>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#2a2a2a] text-[#a1a1aa]"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#525252]">⌘K</span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-auto">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
            >
              <span className="text-sm">{item.icon}</span>
              <span>{item.label}</span>
            </div>
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

      {/* Main content - Task Board */}
      <main className="flex-1 overflow-auto">
        {activeTab === "tasks" ? <TaskBoard /> : (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p className="text-[#525252] text-sm">Coming soon</p>
          </div>
        )}
      </main>
    </div>
  );
}
