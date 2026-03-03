"use client";

import { useState } from "react";
import TaskBoard from "@/components/TaskBoard";
import Calendar from "@/components/Calendar";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import Office from "@/components/Office";

const navItems = [
  { id: "tasks", label: "Tasks", icon: "📋" },
  { id: "calendar", label: "Calendar", icon: "📅" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "team", label: "Team", icon: "👥" },
  { id: "office", label: "Office", icon: "🏢" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tasks");

  const renderContent = () => {
    switch (activeTab) {
      case "tasks":
        return <TaskBoard />;
      case "calendar":
        return <Calendar />;
      case "projects":
        return <Projects />;
      case "team":
        return <Team />;
      case "office":
        return <Office />;
      default:
        return <TaskBoard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0b]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121214] border-r border-[#27272a] flex flex-col">
        <div className="p-4 border-b border-[#27272a]">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Mission Control
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-[#27272a]">
          <div className="text-xs text-[#71717a]">
            <p>🎩 Mr Q</p>
            <p className="mt-1">Chief of Staff</p>
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
