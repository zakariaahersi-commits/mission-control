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
  { id: "backlog", label: "Backlog" },
  { id: "inprogress", label: "In Progress" },
  { id: "review", label: "Review" },
  { id: "done", label: "Done" },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <span className="badge badge-high">High</span>;
      case "medium": return <span className="badge badge-medium">Med</span>;
      case "low": return <span className="badge badge-low">Low</span>;
      default: return null;
    }
  };

  const getAssigneeAvatar = (assignee: string) => {
    const initials = assignee.charAt(0);
    return (
      <div className="avatar">
        {initials}
      </div>
    );
  };

  return (
    <div className="h-full flex">
      {/* Kanban Board */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            <span className="gradient-text">📋 Tasks</span>
          </h2>
          <p className="text-[#6b6b75] text-sm">Track what each agent is working on</p>
        </div>

        <div className="flex gap-6 h-full">
          {columns.map((col) => (
            <div key={col.id} className="flex-1 min-w-[280px]">
              <div className="column-header">
                <span>{col.label}</span>
                <span className="text-[#6b6b75] font-normal">
                  {tasks.filter(t => t.status === col.id).length}
                </span>
              </div>
              
              <div className="space-y-3">
                {tasks.filter(t => t.status === col.id).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`task-card ${selectedTask?.id === task.id ? "border-[#5e6ad2]" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      {getPriorityBadge(task.priority)}
                      {getAssigneeAvatar(task.assignee)}
                    </div>
                    <p className="text-sm font-medium mb-3">{task.title}</p>
                    <div className="flex items-center gap-2 text-xs text-[#6b6b75]">
                      <span>{task.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="w-80 bg-[#151519] border-l border-[#27272f] p-6 overflow-auto">
        <h3 className="text-sm font-semibold text-[#a1a1aa] mb-4 flex items-center gap-2">
          <span>⚡</span> Live Activity
        </h3>
        <div className="space-y-0">
          <div className="activity-item">
            <p className="text-sm">
              <span className="text-[#5e6ad2] font-medium">Mr Q</span> deployed Mission Control
            </p>
            <p className="text-xs text-[#6b6b75] mt-1">2 min ago</p>
          </div>
          <div className="activity-item">
            <p className="text-sm">
              <span className="text-[#5e6ad2] font-medium">Analyst</span> synced 47 Affinity contacts
            </p>
            <p className="text-xs text-[#6b6b75] mt-1">18 min ago</p>
          </div>
          <div className="activity-item">
            <p className="text-sm">
              <span className="text-[#5e6ad2] font-medium">Scout</span> found 5 trending AI topics
            </p>
            <p className="text-xs text-[#6b6b75] mt-1">1 hour ago</p>
          </div>
          <div className="activity-item">
            <p className="text-sm">
              <span className="text-[#5e6ad2] font-medium">Doc</span> updated WHOOP recovery score
            </p>
            <p className="text-xs text-[#6b6b75] mt-1">3 hours ago</p>
          </div>
          <div className="activity-item">
            <p className="text-sm">
              <span className="text-[#5e6ad2] font-medium">Mr Q</span> completed OAuth for Google Drive
            </p>
            <p className="text-xs text-[#6b6b75] mt-1">5 hours ago</p>
          </div>
        </div>

        <button className="btn-primary w-full mt-6">
          + New Task
        </button>
      </div>
    </div>
  );
}
