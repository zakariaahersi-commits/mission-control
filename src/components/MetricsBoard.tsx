"use client";

import { metrics, projects } from "@/app/data/real-data";

export default function MetricsBoard() {
  return (
    <div className="p-6">
      {/* MRR Target */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-[#fafafa] mb-2">Revenue Target</h2>
        <div className="flex items-end gap-3 mb-2">
          <span className="text-4xl font-bold text-[#22c55e]">${metrics.mrr.current.toLocaleString()}</span>
          <span className="text-sm text-[#525252] mb-1">/ ${metrics.mrr.target.toLocaleString()} MRR</span>
        </div>
        <div className="w-full bg-[#1a1a1a] rounded-full h-2">
          <div 
            className="bg-[#22c55e] h-2 rounded-full transition-all"
            style={{ width: `${(metrics.mrr.current / metrics.mrr.target) * 100}%` }}
          />
        </div>
        <p className="text-xs text-[#525252] mt-2">
          {((metrics.mrr.current / metrics.mrr.target) * 100).toFixed(1)}% to $10K target
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Total Spent"
          value={`$${metrics.costs.total}`}
          subtext={`$${metrics.costs.thisWeek} this week`}
          icon="💸"
        />
        <MetricCard
          label="Deal Pipeline"
          value={metrics.pipeline.total.toString()}
          subtext={`${metrics.pipeline.invested} invested • ${metrics.pipeline.conversion}% conversion`}
          icon="💼"
        />
        <MetricCard
          label="Beehiiv Subs"
          value={metrics.beehiiv.subscribers.toLocaleString()}
          subtext={`Target: ${metrics.beehiiv.target.toLocaleString()}`}
          icon="📧"
        />
        <MetricCard
          label="Total Audience"
          value={(metrics.audience.linkedin + metrics.audience.instagram + metrics.audience.facebook + metrics.audience.x).toLocaleString()}
          subtext="Across all platforms"
          icon="👥"
        />
      </div>

      {/* Projects Progress */}
      <h2 className="text-lg font-bold text-[#fafafa] mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{project.icon}</span>
              <span className="text-sm font-semibold text-[#fafafa]">{project.name}</span>
            </div>
            
            {/* Progress or Stats */}
            {project.progress !== undefined ? (
              <>
                <div className="w-full bg-[#1a1a1a] rounded-full h-2 mb-2">
                  <div 
                    className="bg-[#3b82f6] h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="text-xs text-[#525252]">{project.progress}% complete</p>
              </>
            ) : (
              <div className="text-xs text-[#525252]">
                {Object.entries(project).filter(([k]) => k !== 'name' && k !== 'icon').map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1">
                    <span className="capitalize">{key}:</span>
                    <span className="text-[#fafafa]">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ label, value, subtext, icon }: { label: string; value: string; subtext?: string; icon: string }) {
  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <span className="text-xs text-[#525252]">{label}</span>
      </div>
      <div className="text-2xl font-bold text-[#fafafa] mb-1">{value}</div>
      {subtext && <div className="text-xs text-[#525252]">{subtext}</div>}
    </div>
  );
}
