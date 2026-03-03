"use client";

import { useState } from "react";
import TaskBoard from "@/components/TaskBoard";
import Calendar from "@/components/Calendar";
import Projects from "@/components/Projects";
import Docs from "@/components/Docs";
import Memory from "@/components/Memory";
import Dashboard from "@/components/Dashboard";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "tasks", label: "Tasks", icon: "📋" },
  { id: "calendar", label: "Calendar", icon: "📅" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "docs", label: "Docs", icon: "📄" },
  { id: "memory", label: "Memory", icon: "🧠" },
];

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "tasks":
        return <TaskBoard />;
      case "calendar":
        return <Calendar />;
      case "projects":
        return <Projects />;
      case "docs":
        return <Docs />;
      case "memory":
        return <Memory />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0d0d0f]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#151519] border-r border-[#27272f] flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-[#27272f]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5e6ad2] to-[#7c3aed] flex items-center justify-center">
              <span className="text-white font-bold text-sm">⚡</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold">Mission Control</h1>
              <p className="text-xs text-[#6b6b75]">Agent Command Center</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-all ${
                activeTab === item.id
                  ? "bg-[#1f1f26] text-white"
                  : "text-[#a1a1aa] hover:bg-[#1a1a20] hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[#27272f]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5e6ad2] to-[#7c3aed] flex items-center justify-center text-xs font-bold">
              Z
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Zak</p>
              <p className="text-xs text-[#6b6b75]">Chief Builder</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto gradient-bg">
        {renderContent()}
      </main>
    </div>
  );
}
