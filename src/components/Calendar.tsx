"use client";

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  day: string;
  type: "cron" | "meeting" | "deadline";
  agent?: string;
}

const events: CalendarEvent[] = [
  { id: "1", title: "Morning briefing", time: "06:00", day: "Mon", type: "cron", agent: "Mr Q" },
  { id: "2", title: "Inbox triage", time: "09:00", day: "Mon", type: "cron", agent: "Analyst" },
  { id: "3", title: "Portfolio Sync", time: "14:00", day: "Mon", type: "meeting" },
  { id: "4", title: "Trend research", time: "10:00", day: "Tue", type: "cron", agent: "Scout" },
  { id: "5", title: "WHOOP analysis", time: "07:00", day: "Wed", type: "cron", agent: "Doc" },
  { id: "6", title: "Newsletter draft", time: "16:00", day: "Thu", type: "deadline", agent: "Mr Q" },
  { id: "7", title: "Deal flow review", time: "11:00", day: "Fri", type: "cron", agent: "Analyst" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 24 }, (_, i) => i);

export default function Calendar() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "cron": return "bg-[#7c3aed]/20 border-[#7c3aed] text-[#a78bfa]";
      case "meeting": return "bg-[#3b82f6]/20 border-[#3b82f6] text-[#93c5fd]";
      case "deadline": return "bg-[#ef4444]/20 border-[#ef4444] text-[#fca5a5]";
      default: return "bg-[#27272a] border-[#3f3f46]";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-[#27272a]">
        <h2 className="text-2xl font-bold">📅 Scheduled Routines</h2>
        <p className="text-[#71717a] text-sm mt-1">Track all automated cron jobs and scheduled tasks</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="bg-[#121214] rounded-lg border border-[#27272a] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-[#27272a]">
            <div className="p-3 text-xs text-[#71717a] border-r border-[#27272a]">Time</div>
            {days.map((day) => (
              <div key={day} className="p-3 text-xs font-medium text-[#a1a1aa] border-r border-[#27272a] text-center">
                {day}
              </div>
            ))}
          </div>

          {/* Grid */}
          {hours.slice(6, 20).map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-[#27272a]/50">
              <div className="p-3 text-xs text-[#71717a] border-r border-[#27272a]">
                {hour.toString().padStart(2, "0")}:00
              </div>
              {days.map((day) => {
                const event = events.find(e => e.day === day && parseInt(e.time) === hour);
                return (
                  <div key={day} className="p-1 border-r border-[#27272a] min-h-[60px]">
                    {event && (
                      <div className={`calendar-event ${getTypeColor(event.type)} cursor-pointer`}>
                        <div className="font-medium">{event.title}</div>
                        {event.agent && (
                          <div className="text-xs mt-1 opacity-75">
                            {event.agent}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#7c3aed]/20 border border-[#7c3aed]" />
            <span className="text-[#a1a1aa]">Cron Job</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#3b82f6]/20 border border-[#3b82f6]" />
            <span className="text-[#a1a1aa]">Meeting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#ef4444]/20 border border-[#ef4444]" />
            <span className="text-[#a1a1aa]">Deadline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
