import { useState } from "react";
import { Link } from "react-router-dom";
import { Trip } from "@/types/trip";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TripCalendarProps {
  trips: Trip[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const categoryColor: Record<string, string> = {
  "world-cup": "bg-blue-500",
  "penn-state": "bg-blue-900",
  "eagles": "bg-green-700",
};

const categoryLabel: Record<string, string> = {
  "world-cup": "World Cup",
  "penn-state": "Penn State",
  "eagles": "Eagles",
};

function getTripsByDate(trips: Trip[]): Record<string, Trip[]> {
  const map: Record<string, Trip[]> = {};
  for (const trip of trips) {
    if (!map[trip.date]) map[trip.date] = [];
    map[trip.date].push(trip);
  }
  return map;
}

function getMonthsWithTrips(trips: Trip[]): { year: number; month: number }[] {
  const seen = new Set<string>();
  const months: { year: number; month: number }[] = [];
  for (const trip of trips) {
    const d = new Date(trip.date + "T12:00:00");
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!seen.has(key)) {
      seen.add(key);
      months.push({ year: d.getFullYear(), month: d.getMonth() });
    }
  }
  return months.sort((a, b) => a.year - b.year || a.month - b.month);
}

function getDaysInMonth(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function TripCalendar({ trips }: TripCalendarProps) {
  const tripsByDate = getTripsByDate(trips);
  const months = getMonthsWithTrips(trips);
  const [monthIndex, setMonthIndex] = useState(0);
  const [tooltip, setTooltip] = useState<{ dateKey: string; x: number; y: number } | null>(null);

  if (months.length === 0) return null;

  const { year, month } = months[monthIndex];
  const cells = getDaysInMonth(year, month);

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
          disabled={monthIndex === 0}
          className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-30 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-foreground">
            {MONTH_NAMES[month]} {year}
          </h3>
          {/* Month pills */}
          <div className="hidden sm:flex gap-1">
            {months.map((m, i) => (
              <button
                key={i}
                onClick={() => setMonthIndex(i)}
                className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
                  i === monthIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {MONTH_NAMES[m.month].slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setMonthIndex((i) => Math.min(months.length - 1, i + 1))}
          disabled={monthIndex === months.length - 1}
          className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-30 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const dateKey = toDateKey(year, month, day);
          const dayTrips = tripsByDate[dateKey] ?? [];
          const hasTrips = dayTrips.length > 0;

          return (
            <div
              key={dateKey}
              className="relative flex flex-col items-center"
              onMouseEnter={(e) => {
                if (hasTrips) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({ dateKey, x: rect.left, y: rect.bottom });
                }
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors
                  ${hasTrips
                    ? "bg-primary/15 text-primary font-bold cursor-pointer hover:bg-primary/25"
                    : "text-muted-foreground"
                  }`}
              >
                {day}
              </div>
              {/* Category dots */}
              {hasTrips && (
                <div className="flex gap-0.5 mt-0.5">
                  {dayTrips.slice(0, 3).map((t) => (
                    <div
                      key={t.id}
                      className={`w-1.5 h-1.5 rounded-full ${categoryColor[t.category] ?? "bg-primary"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Inline tooltip panel — shows below calendar when a date is hovered */}
      {tooltip && tripsByDate[tooltip.dateKey] && (
        <div className="mt-4 border-t border-border pt-4 space-y-2">
          {tripsByDate[tooltip.dateKey].map((t) => (
            <Link
              key={t.id}
              to={`/trips/${t.id}`}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${categoryColor[t.category] ?? "bg-primary"}`} />
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{categoryLabel[t.category]}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">${t.price_per_seat}<span className="text-xs font-normal text-muted-foreground">/seat</span></p>
                <p className={`text-xs font-medium ${t.seats_remaining <= 3 ? "text-orange-400" : "text-green-400"}`}>
                  {t.seats_remaining} seats left
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
        {Object.entries(categoryColor).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
            {categoryLabel[cat]}
          </div>
        ))}
      </div>
    </div>
  );
}
