"use client";

import { useState } from "react";

interface Memory {
  id: string;
  date: string;
  type: "daily" | "longterm" | "learning" | "decision";
  content: string;
  tags: string[];
}

const memories: Memory[] = [
  {
    id: "1",
    date: "2026-03-03",
    type: "daily",
    content: "OAuth re-auth completed for work Google account. All 7 services now live: Gmail, Calendar, Drive, Docs, Sheets, Contacts, Tasks. AnalystQ unblocked.",
    tags: ["infrastructure", "oauth", "analyst"],
  },
  {
    id: "2",
    date: "2026-03-03",
    type: "daily",
    content: "Mission Control dashboard deployed to Vercel. Linear-inspired design with real-time agent metrics, MRR tracking, and activity feed.",
    tags: ["dashboard", "deployment", "mission-control"],
  },
  {
    id: "3",
    date: "2026-03-02",
    type: "learning",
    content: "Calendar is READ + scheduling ONLY. Never write prep notes to event descriptions — external attendees can see them. Use local briefing files instead.",
    tags: ["rule", "calendar", "security"],
  },
  {
    id: "4",
    date: "2026-03-02",
    type: "decision",
    content: "Switched all agents to Qwen 3.5 Plus via OpenRouter. No more Claude dependency. OpenRouter credits (~$500+) now primary funding source.",
    tags: ["infrastructure", "model", "cost"],
  },
  {
    id: "5",
    date: "2026-03-01",
    type: "longterm",
    content: "Target: $10K MRR by June 2026. byqqa = community (not revenue). Revenue streams: The Playbook (newsletter), LauncherQ (research), AI consulting.",
    tags: ["goal", "revenue", "byqqa"],
  },
  {
    id: "6",
    date: "2026-02-28",
    type: "daily",
    content: "Off Plan #1 confirmed: Black in AI Sweden, March 24. Speakers: Yasaar (Eggsplain), Binette (ChangersTech). Luma page live.",
    tags: ["event", "off-plan", "blackai"],
  },
  {
    id: "7",
    date: "2026-02-27",
    type: "learning",
    content: "Heartbeat ≠ briefing. Heartbeat is triage only (urgent emails, calendar <4h, mentions). Morning briefing is cron's job at 06:00.",
    tags: ["rule", "heartbeat", "cron"],
  },
  {
    id: "8",
    date: "2026-02-26",
    type: "longterm",
    content: "Zak's writing voice: Confessional, data-backed, brutally honest. Opens with scenes → weaves research → sits with uncomfortable questions. Signs off as 'Zak'.",
    tags: ["voice", "content", "writing"],
  },
];

const typeColors = {
  daily: "bg-[#3b82f6]/20 text-[#93c5fd] border-[#3b82f6]/30",
  longterm: "bg-[#7c3aed]/20 text-[#a78bfa] border-[#7c3aed]/30",
  learning: "bg-[#10b981]/20 text-[#6ee7b7] border-[#10b981]/30",
  decision: "bg-[#f59e0b]/20 text-[#fcd34d] border-[#f59e0b]/30",
};

export default function Memory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "timeline">("timeline");

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType ? memory.type === selectedType : true;
    return matchesSearch && matchesType;
  });

  const groupedByDate = filteredMemories.reduce((acc, memory) => {
    if (!acc[memory.date]) {
      acc[memory.date] = [];
    }
    acc[memory.date].push(memory);
    return acc;
  }, {} as Record<string, Memory[]>);

  return (
    <div className="h-full flex">
      {/* Main list */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                <span className="gradient-text">🧠 Memory</span>
              </h2>
              <p className="text-[#6b6b75] text-sm">Daily notes + long-term memories — your digital journal</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === "list"
                    ? "bg-[#1f1f26] text-white"
                    : "bg-[#151519] text-[#6b6b75] border border-[#27272f]"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode("timeline")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === "timeline"
                    ? "bg-[#1f1f26] text-white"
                    : "bg-[#151519] text-[#6b6b75] border border-[#27272f]"
                }`}
              >
                Timeline
              </button>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#151519] border border-[#27272f] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5e6ad2] transition-colors"
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex gap-2">
            {Object.keys(typeColors).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                  selectedType === type
                    ? typeColors[type as keyof typeof typeColors]
                    : "bg-[#151519] text-[#6b6b75] border border-[#27272f] hover:border-[#3a3a45]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Memories */}
        {viewMode === "timeline" ? (
          <div className="space-y-6">
            {Object.entries(groupedByDate).map(([date, dateMemories]) => (
              <div key={date} className="relative">
                {/* Date marker */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#5e6ad2]" />
                  <span className="text-sm font-semibold text-[#a1a1aa]">{date}</span>
                  <span className="text-xs text-[#6b6b75]">{dateMemories.length} memories</span>
                </div>

                {/* Memories for this date */}
                <div className="space-y-3 ml-5">
                  {dateMemories.map((memory) => (
                    <div
                      key={memory.id}
                      onClick={() => setSelectedMemory(memory)}
                      className={`card p-4 cursor-pointer ${selectedMemory?.id === memory.id ? "border-[#5e6ad2]" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded border ${typeColors[memory.type as keyof typeof typeColors]}`}>
                              {memory.type}
                            </span>
                          </div>
                          <p className="text-sm text-[#a1a1aa] leading-relaxed">{memory.content}</p>
                          <div className="flex gap-2 mt-3">
                            {memory.tags.map((tag, i) => (
                              <span key={i} className="text-xs text-[#6b6b75]">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMemories.map((memory) => (
              <div
                key={memory.id}
                onClick={() => setSelectedMemory(memory)}
                className={`card p-4 cursor-pointer ${selectedMemory?.id === memory.id ? "border-[#5e6ad2]" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded border ${typeColors[memory.type as keyof typeof typeColors]}`}>
                        {memory.type}
                      </span>
                      <span className="text-xs text-[#6b6b75]">{memory.date}</span>
                    </div>
                    <p className="text-sm text-[#a1a1aa] leading-relaxed">{memory.content}</p>
                    <div className="flex gap-2 mt-3">
                      {memory.tags.map((tag, i) => (
                        <span key={i} className="text-xs text-[#6b6b75]">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredMemories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6b6b75]">No memories found</p>
          </div>
        )}
      </div>

      {/* Preview panel */}
      {selectedMemory && (
        <div className="w-[480px] bg-[#151519] border-l border-[#27272f] p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Memory Detail</h3>
            <button
              onClick={() => setSelectedMemory(null)}
              className="text-[#6b6b75] hover:text-[#a1a1aa] text-sm"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-0.5 rounded border ${typeColors[selectedMemory.type as keyof typeof typeColors]}`}>
                  {selectedMemory.type}
                </span>
                <span className="text-xs text-[#6b6b75]">{selectedMemory.date}</span>
              </div>
            </div>

            <div className="p-4 bg-[#1a1a20] rounded-lg border border-[#27272f]">
              <p className="text-sm text-[#a1a1aa] leading-relaxed">
                {selectedMemory.content}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedMemory.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-md bg-[#1a1a20] text-[#6b6b75] border border-[#27272f]">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-[#27272f]">
              <button className="btn-secondary w-full mb-3">
                Edit Memory
              </button>
              <button className="btn-secondary w-full">
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
