"use client";

import { useState } from "react";
import { tasks, agents, weeklyStats } from "@/app/data/real-data";

interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  agent: string;
  timeAgo: string;
  priority: "high" | "medium" | "low";
}

const columns = {
  recurring: {
    label: "Recurring",
    color: "purple",
    tasks: tasks.recurring,
  },
  backlog: {
    label: "Backlog",
    color: "white",
    tasks: tasks.backlog,
  },
  inProgress: {
    label: "In Progress",
    color: "blue",
    tasks: tasks.inProgress,
  },
  review: {
    label: "Review",
    color: "orange",
    tasks: tasks.review,
  },
};

export default function TaskBoard() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const getAgent = (agentId: string) => agents.find(a => a.id === agentId);

  const getPriorityDot = (priority: string, size = "small") => {
    const colors = {
      high: "#ef4444",
      medium: "#f59e0b",
      low: "#525252",
    };
    const sizes = {
      small: "w-1.5 h-1.5",
      medium: "w-2 h-2",
    };
    return (
      <div
        className={`${sizes[size as keyof typeof sizes]} rounded-full`}
        style={{ background: colors[priority as keyof typeof colors] }}
      />
    );
  };

  const getAgentBadge = (agentId: string) => {
    const agent = getAgent(agentId);
    if (!agent) return null;
    
    const colors: Record<string, string> = {
      mrq: "from-[#f59e0b] to-[#d97706]",
      scout: "from-[#22c55e] to-[#16a34a]",
      analyst: "from-[#3b82f6] to-[#2563eb]",
      doc: "from-[#8b5cf6] to-[#7c3aed]",
    };

    return (
      <div 
        className="w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center bg-gradient-to-br text-white"
        style={{ backgroundImage: `linear-gradient(to bottom right, ${colors[agentId] || 'from-gray-400 to-gray-500'})` }}
        title={agent.name}
      >
        {agent.icon}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Top Stats */}
      <div className="flex items-center gap-8 mb-6">
        <div>
          <span className="text-2xl font-bold text-[#22c55e]">{weeklyStats.thisWeek}</span>
          <span className="text-sm text-[#525252] ml-2">This week</span>
        </div>
        <div>
          <span className="text-2xl font-bold text-[#3b82f6]">{weeklyStats.inProgress}</span>
          <span className="text-sm text-[#525252] ml-2">In progress</span>
        </div>
        <div>
          <span className="text-2xl font-bold">{weeklyStats.total}</span>
          <span className="text-sm text-[#525252] ml-2">Total</span>
        </div>
        <div>
          <span className="text-2xl font-bold text-[#8b5cf6]">{weeklyStats.completion}%</span>
          <span className="text-sm text-[#525252] ml-2">Completion</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 mb-6">
        <button className="bg-[#fafafa] text-black px-4 py-2 rounded text-sm font-semibold hover:bg-[#e4e4e7] transition-colors">
          + New task
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-[#a1a1aa]">Filter by agent:</span>
          {agents.map(agent => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
              className={`w-7 h-7 rounded text-xs font-bold flex items-center justify-center bg-gradient-to-br from-[#22c55e] to-[#34d399] text-white transition-opacity ${
                selectedAgent && selectedAgent !== agent.id ? "opacity-30" : "opacity-100"
              }`}
              title={agent.name}
            >
              {agent.icon}
            </button>
          ))}
        </div>
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-1.5 text-xs text-[#a1a1aa]">
          All projects
        </div>
      </div>

      {/* Board */}
      <div className="flex gap-6 h-[calc(100vh-300px)]">
        {Object.entries(columns).map(([key, col]) => {
          const filteredTasks = selectedAgent
            ? col.tasks.filter(t => t.agent === selectedAgent)
            : col.tasks;

          return (
            <div key={key} className="flex-1 min-w-[320px]">
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${
                  col.color === "purple" ? "bg-[#8b5cf6]" :
                  col.color === "blue" ? "bg-[#3b82f6]" :
                  col.color === "orange" ? "bg-[#f59e0b]" :
                  "bg-[#22c55e]"
                }`} />
                <span className="text-xs font-semibold text-[#525252] uppercase tracking-wide">
                  {col.label}
                </span>
                <span className="text-xs text-[#525252] ml-auto">
                  {filteredTasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-8 text-[#525252] text-sm">
                    No tasks
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <div key={task.id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 hover:border-[#2a2a2a] transition-colors">
                      {/* Priority dot + Title */}
                      <div className="flex items-center gap-2 mb-3">
                        {getPriorityDot(task.priority)}
                        <span className="text-xs font-medium text-[#fafafa]">{task.title}</span>
                      </div>

                      {/* Description */}
                      {task.description && (
                        <p className="text-xs text-[#525252] mb-3 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getAgentBadge(task.agent)}
                        </div>
                        <span className="text-[10px] text-[#525252]">{task.timeAgo}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}

        {/* Live Activity */}
        <div className="w-72 border-l border-[#1a1a1a] pl-6">
          <h3 className="text-xs font-semibold text-[#525252] uppercase tracking-wide mb-4">
            Live Activity
          </h3>
          <div className="space-y-4">
            {[
              { agent: "Mr Q", action: "Morning brief: Norrsken Angel Session at 08:30 CET", time: "2 hours ago", color: "text-[#f59e0b]" },
              { agent: "Scout", action: "Research: 4 trending AI pain points on X + Reddit", time: "3 hours ago", color: "text-[#22c55e]" },
              { agent: "AnalystQ", action: "Inbox triage: 10 unread, 3 high priority", time: "4 hours ago", color: "text-[#3b82f6]" },
              { agent: "Mr Q", action: "Deployed Mission Control Next.js build", time: "5 hours ago", color: "text-[#f59e0b]" },
              { agent: "Scout", action: "Tweet thread: AI due diligence trends", time: "6 hours ago", color: "text-[#22c55e]" },
              { agent: "Doc", action: "Sleep analysis: 7h 12m, recovery 72%", time: "8 hours ago", color: "text-[#8b5cf6]" },
            ].map((item, i) => (
              <div key={i} className="pb-2 border-b border-[#1a1a1a] last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${item.color}`}>
                    {item.agent}
                  </span>
                </div>
                <p className="text-xs text-[#a1a1aa] leading-snug">{item.action}</p>
                <p className="text-[10px] text-[#525252] mt-0.5">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
