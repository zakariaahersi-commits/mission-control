"use client";

interface Project {
  id: string;
  name: string;
  progress: number;
  status: "active" | "on-hold" | "completed";
  priority: "high" | "medium" | "low";
  tasks: number;
  completedTasks: number;
  assignee: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "byqqa Empire Building",
    progress: 67,
    status: "active",
    priority: "high",
    tasks: 24,
    completedTasks: 16,
    assignee: "Mr Q",
  },
  {
    id: "2",
    name: "Inner Foundation Deal Flow",
    progress: 45,
    status: "active",
    priority: "high",
    tasks: 18,
    completedTasks: 8,
    assignee: "Analyst",
  },
  {
    id: "3",
    name: "Mission Control Dashboard",
    progress: 30,
    status: "active",
    priority: "high",
    tasks: 12,
    completedTasks: 4,
    assignee: "Mr Q",
  },
  {
    id: "4",
    name: "Health Optimization",
    progress: 82,
    status: "active",
    priority: "medium",
    tasks: 15,
    completedTasks: 12,
    assignee: "Doc",
  },
  {
    id: "5",
    name: "Content Pipeline",
    progress: 0,
    status: "on-hold",
    priority: "medium",
    tasks: 8,
    completedTasks: 0,
    assignee: "Scout",
  },
  {
    id: "6",
    name: "TopUpScout Research",
    progress: 100,
    status: "completed",
    priority: "low",
    tasks: 10,
    completedTasks: 10,
    assignee: "Scout",
  },
];

export default function Projects() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-[#22c55e]/20 text-[#86efac] border-[#22c55e]/30";
      case "on-hold": return "bg-[#f59e0b]/20 text-[#fcd34d] border-[#f59e0b]/30";
      case "completed": return "bg-[#3b82f6]/20 text-[#93c5fd] border-[#3b82f6]/30";
      default: return "bg-[#27272a]";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-[#ef4444]";
      case "medium": return "text-[#f59e0b]";
      case "low": return "text-[#22c55e]";
      default: return "text-[#71717a]";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-[#27272a]">
        <h2 className="text-2xl font-bold">📁 Projects</h2>
        <p className="text-[#71717a] text-sm mt-1">Track major initiatives and progress</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-xs text-[#71717a] mt-1">
                    {project.completedTasks}/{project.tasks} tasks complete
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#a1a1aa]">Progress</span>
                  <span className="text-[#a1a1aa]">{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill bg-[#7c3aed]"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className={`font-medium ${getPriorityColor(project.priority)}`}>
                  {project.priority.toUpperCase()} priority
                </span>
                <span className="text-[#71717a]">
                  👤 {project.assignee}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 px-6 py-3 bg-[#7c3aed] hover:bg-[#8b5cf6] text-white rounded-lg font-medium transition-colors">
          + New Project
        </button>
      </div>
    </div>
  );
}
