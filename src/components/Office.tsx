"use client";

import { useEffect, useRef, useState } from "react";

export default function Office() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pixel art style rendering
    const pixelSize = 4;
    const scale = pixelSize;

    // Clear canvas
    ctx.fillStyle = "#121214";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw floor
    ctx.fillStyle = "#1a1a1d";
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

    // Draw desks
    const desks = [
      { x: 100, y: canvas.height - 140, agent: "🎩", name: "Mr Q", active: true },
      { x: 250, y: canvas.height - 140, agent: "📊", name: "Analyst", active: true },
      { x: 400, y: canvas.height - 140, agent: "🔭", name: "Scout", active: false },
      { x: 550, y: canvas.height - 140, agent: "🧬", name: "Doc", active: false },
    ];

    desks.forEach((desk) => {
      // Desk
      ctx.fillStyle = "#27272a";
      ctx.fillRect(desk.x, desk.y, 120, 60);

      // Computer monitor
      ctx.fillStyle = "#3f3f46";
      ctx.fillRect(desk.x + 30, desk.y - 40, 60, 40);

      // Screen glow
      if (desk.active) {
        ctx.fillStyle = "#7c3aed30";
        ctx.fillRect(desk.x + 35, desk.y - 35, 50, 30);
      }

      // Agent (pixel art emoji)
      ctx.font = "24px Arial";
      ctx.fillText(desk.agent, desk.x + 48, desk.y - 60);

      // Name tag
      ctx.fillStyle = "#71717a";
      ctx.font = "10px Arial";
      ctx.fillText(desk.name, desk.x + 40, desk.y + 80);

      // Active indicator
      if (desk.active) {
        ctx.fillStyle = "#22c55e";
        ctx.beginPath();
        ctx.arc(desk.x + 110, desk.y + 10, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw water cooler
    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(700, canvas.height - 120, 40, 60);
    ctx.fillStyle = "#60a5fa";
    ctx.fillRect(705, canvas.height - 115, 30, 50);

    // Draw plants
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(50, canvas.height - 80, 30, 20);
    ctx.fillRect(60, canvas.height - 100, 10, 20);

  }, [time]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeAgents = 2;
  const totalAgents = 4;

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-[#27272a]">
        <h2 className="text-2xl font-bold">🏢 Office</h2>
        <p className="text-[#71717a] text-sm mt-1">Live view of agent activity</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="bg-[#121214] rounded-lg border border-[#27272a] p-6">
          <canvas
            ref={canvasRef}
            id="office-canvas"
            width={800}
            height={400}
            className="w-full rounded-lg"
            style={{ imageRendering: "pixelated" }}
          />

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                <span className="text-xs text-[#a1a1aa]">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#71717a]" />
                <span className="text-xs text-[#a1a1aa]">Idle</span>
              </div>
            </div>

            <div className="text-sm text-[#a1a1aa]">
              {activeAgents}/{totalAgents} agents working
            </div>
          </div>
        </div>

        {/* Activity Status */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="project-card text-center">
            <div className="text-2xl mb-2">🎩</div>
            <p className="text-sm font-medium">Mr Q</p>
            <p className="text-xs text-[#22c55e] mt-1">Building dashboard</p>
          </div>
          <div className="project-card text-center">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-medium">Analyst</p>
            <p className="text-xs text-[#22c55e] mt-1">Syncing Affinity</p>
          </div>
          <div className="project-card text-center">
            <div className="text-2xl mb-2">🔭</div>
            <p className="text-sm font-medium">Scout</p>
            <p className="text-xs text-[#71717a] mt-1">Idle</p>
          </div>
          <div className="project-card text-center">
            <div className="text-2xl mb-2">🧬</div>
            <p className="text-sm font-medium">Doc</p>
            <p className="text-xs text-[#71717a] mt-1">Idle</p>
          </div>
        </div>
      </div>
    </div>
  );
}
