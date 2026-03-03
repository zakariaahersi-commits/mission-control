"use client";

import { useState } from "react";

interface Doc {
  id: string;
  title: string;
  type: "newsletter" | "briefing" | "research" | "prd" | "content";
  agent: string;
  date: string;
  status: "draft" | "review" | "published";
  preview: string;
}

const docs: Doc[] = [
  {
    id: "1",
    title: "byqqa Newsletter #7: The Invisible Tax",
    type: "newsletter",
    agent: "Mr Q",
    date: "2026-03-02",
    status: "published",
    preview: "There's a tax on founders that nobody talks about. It's not revenue share, not equity dilution...",
  },
  {
    id: "2",
    title: "Morning Briefing 2026-03-03",
    type: "briefing",
    agent: "Analyst",
    date: "2026-03-03",
    status: "published",
    preview: "Good morning Zak. Here's what's happening today: Portfolio Sync at 14:00, 3 new inbound leads...",
  },
  {
    id: "3",
    title: "AI Due Diligence Copilot — Market Research",
    type: "research",
    agent: "Scout",
    date: "2026-03-01",
    status: "review",
    preview: "Market size: $2.3B TAM. Top competitors: Visible.vc, Affinity, Preqin. Key pain point: 73% of VCs...",
  },
  {
    id: "4",
    title: "Off Plan #1 — Black in AI Sweden (Event Brief)",
    type: "briefing",
    agent: "Mr Q",
    date: "2026-02-28",
    status: "published",
    preview: "Date: March 24, 2026. Speakers: Yasaar (Eggsplain), Binette (ChangersTech). Venue TBD...",
  },
  {
    id: "5",
    title: "The Playbook — AI Business Launch Guide",
    type: "newsletter",
    agent: "Mr Q",
    date: "2026-02-26",
    status: "draft",
    preview: "Step 1: Find the pain. Step 2: Build the solution. Step 3: Ship in public. Repeat...",
  },
  {
    id: "6",
    title: "TopUpScout — Product Requirements Doc",
    type: "prd",
    agent: "Scout",
    date: "2026-02-25",
    status: "review",
    preview: "Problem: Expats overpay for airtime. Solution: Real-time comparison engine. MVP scope...",
  },
  {
    id: "7",
    title: "WHOOP Recovery Analysis — Feb 2026",
    type: "research",
    agent: "Doc",
    date: "2026-02-28",
    status: "published",
    preview: "Average recovery: 71%. Sleep consistency: 67%. HRV trend: +12% vs Jan. Key insight...",
  },
  {
    id: "8",
    title: "Content Calendar Q2 2026",
    type: "content",
    agent: "Mr Q",
    date: "2026-02-24",
    status: "draft",
    preview: "Week 1: Launch manifesto. Week 2: Builder spotlight. Week 3: Behind the scenes...",
  },
];

const typeColors = {
  newsletter: "bg-[#7c3aed]/20 text-[#a78bfa] border-[#7c3aed]/30",
  briefing: "bg-[#3b82f6]/20 text-[#93c5fd] border-[#3b82f6]/30",
  research: "bg-[#10b981]/20 text-[#6ee7b7] border-[#10b981]/30",
  prd: "bg-[#f59e0b]/20 text-[#fcd34d] border-[#f59e0b]/30",
  content: "bg-[#ef4444]/20 text-[#fca5a5] border-[#ef4444]/30",
};

const statusColors = {
  draft: "bg-[#27272f] text-[#a1a1aa] border-[#3a3a45]",
  review: "bg-[#f59e0b]/20 text-[#fcd34d] border-[#f59e0b]/30",
  published: "bg-[#10b981]/20 text-[#6ee7b7] border-[#10b981]/30",
};

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType ? doc.type === selectedType : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="h-full flex">
      {/* Main list */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            <span className="gradient-text">📄 Documents</span>
          </h2>
          <p className="text-[#6b6b75] text-sm">All agent-created documents, searchable and categorized</p>
        </div>

        {/* Search and filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search documents..."
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

        {/* Docs list */}
        <div className="space-y-3">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`card p-4 cursor-pointer ${selectedDoc?.id === doc.id ? "border-[#5e6ad2]" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded border ${typeColors[doc.type as keyof typeof typeColors]}`}>
                      {doc.type}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${statusColors[doc.status as keyof typeof statusColors]}`}>
                      {doc.status}
                    </span>
                    <span className="text-xs text-[#6b6b75]">{doc.date}</span>
                  </div>
                  <h3 className="font-medium mb-1">{doc.title}</h3>
                  <p className="text-sm text-[#6b6b75] line-clamp-2">{doc.preview}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5e6ad2] to-[#7c3aed] flex items-center justify-center text-xs font-bold ml-4">
                  {doc.agent.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6b6b75]">No documents found</p>
          </div>
        )}
      </div>

      {/* Preview panel */}
      {selectedDoc && (
        <div className="w-[480px] bg-[#151519] border-l border-[#27272f] p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Preview</h3>
            <button
              onClick={() => setSelectedDoc(null)}
              className="text-[#6b6b75] hover:text-[#a1a1aa] text-sm"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-0.5 rounded border ${typeColors[selectedDoc.type as keyof typeof typeColors]}`}>
                  {selectedDoc.type}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded border ${statusColors[selectedDoc.status as keyof typeof statusColors]}`}>
                  {selectedDoc.status}
                </span>
              </div>
              <h2 className="text-lg font-semibold mb-2">{selectedDoc.title}</h2>
              <div className="flex items-center gap-2 text-xs text-[#6b6b75] mb-4">
                <span>By {selectedDoc.agent}</span>
                <span>•</span>
                <span>{selectedDoc.date}</span>
              </div>
            </div>

            <div className="p-4 bg-[#1a1a20] rounded-lg border border-[#27272f]">
              <p className="text-sm text-[#a1a1aa] leading-relaxed">
                {selectedDoc.preview}
              </p>
            </div>

            <div className="pt-4 border-t border-[#27272f]">
              <button className="btn-primary w-full mb-3">
                Open Full Document
              </button>
              <button className="btn-secondary w-full">
                Copy Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
