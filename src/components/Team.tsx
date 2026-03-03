"use client";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: "active" | "idle" | "busy";
  model: string;
  device: string;
  avatar: string;
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Mr Q",
    role: "Chief of Staff",
    status: "active",
    model: "Qwen 3.5 Plus",
    device: "Server (Ubuntu)",
    avatar: "🎩",
  },
  {
    id: "2",
    name: "Analyst Q",
    role: "Investment Analyst",
    status: "busy",
    model: "Qwen 3.5 Plus",
    device: "Server (Ubuntu)",
    avatar: "📊",
  },
  {
    id: "3",
    name: "Scout",
    role: "Trend Hunter / Research",
    status: "active",
    model: "Qwen 3.5 Plus",
    device: "Server (Ubuntu)",
    avatar: "🔭",
  },
  {
    id: "4",
    name: "Doc Q",
    role: "Health & Wellness",
    status: "idle",
    model: "Qwen 3.5 Plus",
    device: "Server (Ubuntu)",
    avatar: "🧬",
  },
];

export default function Team() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-[#22c55e]";
      case "busy": return "bg-[#f59e0b]";
      case "idle": return "bg-[#71717a]";
      default: return "bg-[#27272a]";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-[#27272a]">
        <h2 className="text-2xl font-bold">👥 Team</h2>
        <p className="text-[#71717a] text-sm mt-1">Agent org chart and mission</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Mission Statement */}
        <div className="mb-8 p-6 bg-[#121214] rounded-lg border border-[#27272a]">
          <h3 className="text-sm font-semibold text-[#a1a1aa] mb-3">🎯 Mission Statement</h3>
          <p className="text-lg">
            Build an autonomous organization of AI agents that produce value 24/7, 
            driving toward <span className="text-[#7c3aed] font-bold">$10K MRR</span> through 
            byqqa empire building, investment excellence, and content systems.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-2 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="project-card">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{agent.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                  </div>
                  <p className="text-sm text-[#71717a] mt-1">{agent.role}</p>
                  
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#a1a1aa]">Model</span>
                      <span className="text-[#fafafa]">{agent.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a1a1aa]">Device</span>
                      <span className="text-[#fafafa]">{agent.device}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a1a1aa]">Status</span>
                      <span className={`font-medium ${
                        agent.status === "active" ? "text-[#22c55e]" :
                        agent.status === "busy" ? "text-[#f59e0b]" :
                        "text-[#71717a]"
                      }`}>
                        {agent.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Org Structure */}
        <div className="mt-8 p-6 bg-[#121214] rounded-lg border border-[#27272a]">
          <h3 className="text-sm font-semibold text-[#a1a1aa] mb-4">🏗️ Org Structure</h3>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-lg bg-[#7c3aed]/20 border-2 border-[#7c3aed] flex items-center justify-center text-3xl">
                🎩
              </div>
              <p className="mt-2 text-sm font-medium">Mr Q</p>
              <p className="text-xs text-[#71717a]">Chief of Staff</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-[#3b82f6]/20 border-2 border-[#3b82f6] flex items-center justify-center text-2xl">
                  📊
                </div>
                <p className="mt-2 text-xs font-medium">Analyst</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-[#22c55e]/20 border-2 border-[#22c55e] flex items-center justify-center text-2xl">
                  🔭
                </div>
                <p className="mt-2 text-xs font-medium">Scout</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-[#ef4444]/20 border-2 border-[#ef4444] flex items-center justify-center text-2xl">
                  🧬
                </div>
                <p className="mt-2 text-xs font-medium">Doc</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
