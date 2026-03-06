"use client";

import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  agent: string;
  timeAgo: string;
  hasAttachment?: string;
  projectIcon?: string;
  priority: "high" | "medium" | "low";
}

const columns = {
  recurring: {
    label: "Recurring",
    color: "purple",
    tasks: [] as Task[],
  },
  backlog: {
    label: "Backlog",
    color: "white",
    tasks: [
      {
        id: "1",
        title: "Record Claude Code ...",
        description: "Film the I deleted all my AI tools video",
        project: "YouTube",
        agent: "A",
        timeAgo: "less than a minute ago",
        hasAttachment: "YouTube",
        priority: "medium",
      },
      {
        id: "2",
        title: "Flesh out $10K Mac ...",
        description: "Develop and prioritize the use cases for the Mac Studio M3 Ultra upgrade",
        project: "Clawdbot",
        agent: "A",
        timeAgo: "less than a minute ago",
        hasAttachment: "Clawdbot",
        priority: "medium",
      },
      {
        id: "3",
        title: "Pre train a local model",
        description: "",
        project: "",
        agent: "",
        timeAgo: "less than a minute ago",
        priority: "low",
      },
      {
        id: "4",
        title: "Build activity feed for...",
        description: "",
        project: "",
        agent: "",
        timeAgo: "less than a minute ago",
        priority: "low",
      },
    ] as Task[],
  },
  inProgress: {
    label: "In Progress",
    color: "blue",
    tasks: [
      {
        id: "5",
        title: "Build Council - Societ...",
        description: "Multi-model deliberation system. (Kimi K2.5, etc.) distributed across...",
        project: "Council",
        agent: "H",
        projectIcon: "H",
        timeAgo: "less than a minute ago",
        priority: "high",
      },
      {
        id: "6",
        title: "Research Exo Labs du...",
        description: "Prep guide for running large models (Kimi K2.5, etc.) distributed across...",
        project: "Mac Studio Launch",
        agent: "H",
        projectIcon: "M",
        timeAgo: "less than a minute ago",
        priority: "medium",
      },
      {
        id: "7",
        title: "Build AI Employee Sc...",
        description: "New tab in Mission Control tracking the ROI of the AI employee setup...",
        project: "Mission Control",
        agent: "H",
        projectIcon: "M",
        timeAgo: "less than a minute ago",
        priority: "medium",
      },
    ] as Task[],
  },
  review: {
    label: "Review",
    color: "orange",
    tasks: [] as Task[],
  },
};

const weeklyStats = {
  total: 42,
  inProgress: 3,
  thisWeek: 19,
  completion: 45,
};

export default function TaskBoard() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

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
        <button className="btn-primary">+ New task</button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-[#a1a1aa]">Alex</span>
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-xs font-bold">
            A
          </div>
          <span className="text-xs text-[#a1a1aa]">Henry</span>
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-xs font-bold">
            H
          </div>
        </div>
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-1.5 text-xs text-[#a1a1aa]">
          All projects
        </div>
      </div>

      {/* Board */}
      <div className="flex gap-6 h-[calc(100vh-300px)]">
        {Object.entries(columns).map(([key, col]) => (
          <div key={key} className="flex-1 min-w-[320px]">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`status-dot ${
                col.color === "purple" ? "purple" :
                col.color === "blue" ? "blue" :
                col.color === "orange" ? "orange" :
                "green"
              }`} />
              <span className="text-xs font-semibold text-[#525252] uppercase tracking-wide">
                {col.label}
              </span>
              <span className="text-xs text-[#525252] ml-auto">
                {col.tasks.length}
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {col.tasks.length === 0 ? (
                <div className="text-center py-8 text-[#525252] text-sm">
                  No tasks
                </div>
              ) : (
                col.tasks.map((task) => (
                  <div key={task.id} className="task-card">
                    {/* Priority dot */}
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

                    {/* Attachments */}
                    {task.hasAttachment && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="tag">
                          <span className="text-[10px]">{task.hasAttachment}</span>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {task.agent && (
                          <div className="w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center bg-gradient-to-br from-[#22c55e] to-[#34d399] text-white">
                            {task.agent}
                          </div>
                        )}
                        {task.projectIcon && (
                          <div className="w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white">
                            {task.projectIcon}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-[#525252]">{task.timeAgo}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}

        {/* Live Activity */}
        <div className="w-72 bg-black border-l border-[#1a1a1a] pl-6">
          <h3 className="text-xs font-semibold text-[#525252] uppercase tracking-wide mb-4">
            Live Activity
          </h3>
          <div className="space-y-0">
            {[
              { agent: "Scout", action: "4 trends: Claude presentation", time: "Code finance app, UdI roasting" },
              { agent: "Quill", action: "Script: Claude Code Agent Te...", time: "Everything" },
              { agent: "Henry", action: "Completed: System Status D...", time: "" },
              { agent: "Scout", action: "Morning research: Claude Co...", time: "Teams, YC vs Accenture viral" },
              { agent: "Henry", action: "Evening wrap-up posted", time: "" },
              { agent: "Scout", action: "ChatGPT psychic witch viral + ClawBot UGC", time: "ads at scale" },
              { agent: "Scout", action: "Readout session replays for Claude Code", time: "about 23 hours" },
            ].map((item, i) => (
              <div key={i} className="activity-item">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${
                    item.agent === "Scout" ? "text-[#22c55e]" :
                    item.agent === "Henry" ? "text-[#3b82f6]" :
                    "text-[#8b5cf6]"
                  }`}>
                    {item.agent}
                  </span>
                </div>
                <p className="text-xs text-[#a1a1aa] leading-snug">{item.action}</p>
                {item.time && (
                  <p className="text-[10px] text-[#525252] mt-0.5">{item.time}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
