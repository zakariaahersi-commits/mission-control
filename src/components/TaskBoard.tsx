"use client";

import { useState } from "react";

interface Task {
  id: string;
  title: string;
  assignee: "Zak" | "Mr Q" | "Analyst" | "Scout" | "Doc";
  status: "backlog" | "inprogress" | "review" | "done";
  priority: "low" | "medium" | "high";
}

const initialTasks: Task[] = [
  { id: "1", title: "Build Mission Control dashboard", assignee: "Mr Q", status: "inprogress", priority: "high" },
  { id: "2", title: "Review Q1 portfolio performance", assignee: "Analyst", status: "backlog", priority: "medium" },
  { id: "3", title: "Research AI trends for newsletter", assignee: "Scout", status: "backlog", priority: "medium" },
  { id: "4", title: "Update WHOOP recovery analysis", assignee: "Doc", status: "review", priority: "low" },
  { id: "5", title: "Draft byqqa newsletter #7", assignee: "Zak", status: "backlog", priority: "high" },
  { id: "6", title: "Sync Affinity CRM contacts", assignee: "Analyst", status: "done", priority: "high" },
];

const columns = [
  { id: "backlog", label: "Backlog", color: "#71717a" },
  { id: "inprogress", label: "In Progress", color: "#3b82f6" },
  { id: "review", label: "Review", color: "#f59e0b" },
  { id: "done", label: "Done", color: "#22c55e" },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-[#ef4444]";
      case "medium": return "bg-[#f59e0b]";
      case "low": return "bg-[#22c55e]";
      default: return "bg-[#71717a]";
    }
  };

  const getAssigneeBadge = (assignee: string) => {
    const initials = assignee.charAt(0);
    return (
      <span className="w-5 h-5 rounded-full bg-[#7c3aed] text-xs flex items-center justify-center font-bold">
        {initials}
      </span>
    );
  };

  return (
    <div className="h-full flex">
      {/* Kanban Board */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex gap-4 h-full">
          {columns.map((col) => (
            <div key={col.id} className="kanban-column bg-[#121214] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                <h3 className="font-semibold">{col.label}</h3>
                <span className="text-xs text-[#71717a] ml-auto">
                  {tasks.filter(t => t.status === col.id).length}
                </span>
              </div>
              
              <div className="space-y-3">
                {tasks.filter(t => t.status === col.id).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`task-card p-3 cursor-pointer ${selectedTask?.id === task.id ? "border-[#7c3aed]" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                      {getAssigneeBadge(task.assignee)}
                    </div>
                    <p className="text-sm font-medium">{task.title}</p>
                    <div className="mt-2 text-xs text-[#71717a]">
                      {task.assignee}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="w-80 bg-[#121214] border-l border-[#27272a] p-4 overflow-auto">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span>⚡</span> Live Activity
        </h3>
        <div className="space-y-0">
          <div className="activity-item">
            <p className="text-[#a1a1aa]">
              <span className="text-[#7c3aed] font-medium">Mr Q</span> deployed Mission Control
            </p>
            <p className="text-xs text-[#71717a] mt-1">2 min ago</p>
          </div>
          <div className="activity-item">
            <p className="text-[#a1a1aa]">
              <span className="text-[#7c3aed] font-medium">Analyst</span> synced 23 Affinity contacts
            </p>
            <p className="text-xs text-[#71717a] mt-1">15 min ago</p>
          </div>
          <div className="activity-item">
            <p className="text-[#a1a1aa]">
              <span className="text-[#7c3aed] font-medium">Scout</span> found 5 trending AI topics
            </p>
            <p className="text-xs text-[#71717a] mt-1">1 hour ago</p>
          </div>
          <div className="activity-item">
            <p className="text-[#a1a1aa]">
              <span className="text-[#7c3aed] font-medium">Doc</span> updated WHOOP recovery score
            </p>
            <p className="text-xs text-[#71717a] mt-1">2 hours ago</p>
          </div>
          <div className="activity-item">
            <p className="text-[#a1a1aa]">
              <span className="text-[#7c3aed] font-medium">Mr Q</span> completed OAuth for Google Drive
            </p>
            <p className="text-xs text-[#71717a] mt-1">3 hours ago</p>
          </div>
        </div>

        <button className="w-full mt-6 py-2 bg-[#7c3aed] hover:bg-[#8b5cf6] text-white rounded-lg text-sm font-medium transition-colors">
          + New Task
        </button>
      </div>
    </div>
  );
}
