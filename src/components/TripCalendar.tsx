import { useState } from "react";
import { Link } from "react-router-dom";
import { Trip } from "@/types/trip";
import { ChevronLeft, ChevronRight, Users, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TripCalendarProps {
  trips: Trip[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const categoryStyle: Record<string, { bar: string; dot: string; text: string; label: string }> = {
  "world-cup": {
    bar: "bg-blue-600/20 border-l-2 border-blue-500 text-blue-300",
    dot: "bg-blue-500",
    text: "text-blue-400",
    label: "World Cup",
  },
  "penn-state": {
    bar: "bg-indigo-600/20 border-l-2 border-indigo-400 text-indigo-300",
    dot: "bg-indigo-400",
    text: "text-indigo-400",
    label: "Penn State",
  },
  "eagles": {
    bar: "bg-green-700/20 border-l-2 border-green-500 text-green-300",
    dot: "bg-green-500",
    text: "text-green-400",
    label: "Eagles",
  },
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
  // Pad to complete the last row
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function shortTitle(title: string): string {
  // Strip "FIFA World Cup — " prefix for brevity
  return title
    .replace(/^FIFA World Cup — /, "")
    .replace(/^Penn State Football — /, "")
    .replace(/^Philadelphia Eagles — /, "");
}

export default function TripCalendar({ trips }: TripCalendarProps) {
  const tripsByDate = getTripsByDate(trips);
  const months = getMonthsWithTrips(trips);
  const [monthIndex, setMonthIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (months.length === 0) return null;

  const { year, month } = months[monthIndex];
  const cells = getDaysInMonth(year, month);
  const selectedTrips = selectedDate ? (tripsByDate[selectedDate] ?? []) : [];

  const handleDayClick = (dateKey: string) => {
    if (tripsByDate[dateKey]) {
      setSelectedDate((prev) => (prev === dateKey ? null : dateKey));
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden mb-8">
      {/* ── Calendar header ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/60">
        <button
          onClick={() => { setMonthIndex((i) => Math.max(0, i - 1)); setSelectedDate(null); }}
          disabled={monthIndex === 0}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary disabled:opacity-25 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <h3 className="text-base font-bold text-foreground tracking-tight">
            {MONTH_NAMES[month]} {year}
          </h3>
          {/* Month pills */}
          <div className="flex gap-1 flex-wrap justify-center">
            {months.map((m, i) => (
              <button
                key={i}
                onClick={() => { setMonthIndex(i); setSelectedDate(null); }}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                  i === monthIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {MONTH_NAMES[m.month].slice(0, 3)} {m.year !== year ? m.year : ""}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => { setMonthIndex((i) => Math.min(months.length - 1, i + 1)); setSelectedDate(null); }}
          disabled={monthIndex === months.length - 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary disabled:opacity-25 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* ── Calendar grid ── */}
        <div className="flex-1 min-w-0">
          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 border-b border-border">
            {DAYS.map((d) => (
              <div
                key={d}
                className="py-2 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {cells.map((day, idx) => {
              const isLastRow = idx >= cells.length - 7;
              const isLastCol = (idx + 1) % 7 === 0;

              if (!day) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className={`min-h-[72px] bg-secondary/10 ${!isLastRow ? "border-b border-border" : ""} ${!isLastCol ? "border-r border-border" : ""}`}
                  />
                );
              }

              const dateKey = toDateKey(year, month, day);
              const dayTrips = tripsByDate[dateKey] ?? [];
              const hasTrips = dayTrips.length > 0;
              const isSelected = selectedDate === dateKey;

              return (
                <div
                  key={dateKey}
                  onClick={() => handleDayClick(dateKey)}
                  className={`min-h-[72px] p-1.5 flex flex-col gap-1 transition-colors
                    ${!isLastRow ? "border-b border-border" : ""}
                    ${!isLastCol ? "border-r border-border" : ""}
                    ${hasTrips ? "cursor-pointer" : ""}
                    ${isSelected ? "bg-primary/8 ring-1 ring-inset ring-primary/40" : hasTrips ? "hover:bg-secondary/40" : ""}
                  `}
                >
                  {/* Day number */}
                  <span
                    className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full self-start leading-none
                      ${isSelected ? "bg-primary text-primary-foreground" : hasTrips ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {day}
                  </span>

                  {/* Event bars */}
                  <div className="flex flex-col gap-0.5">
                    {dayTrips.slice(0, 2).map((t) => {
                      const style = categoryStyle[t.category];
                      return (
                        <div
                          key={t.id}
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded-sm truncate leading-tight ${style?.bar ?? "bg-primary/10 text-primary"}`}
                        >
                          {shortTitle(t.title)}
                        </div>
                      );
                    })}
                    {dayTrips.length > 2 && (
                      <span className="text-[10px] text-muted-foreground px-1">+{dayTrips.length - 2} more</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Detail panel ── */}
        <div className={`lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l border-border flex flex-col`}>
          {selectedTrips.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 py-10 px-6 text-center">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-3">
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Select a trip date</p>
              <p className="text-xs text-muted-foreground mt-1">Click any highlighted date to see trip details and availability.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border">
              {selectedTrips.map((t) => {
                const style = categoryStyle[t.category];
                return (
                  <div key={t.id} className="p-5 flex flex-col gap-4">
                    {/* Category tag */}
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${style?.dot ?? "bg-primary"}`} />
                      <span className={`text-xs font-semibold uppercase tracking-wider ${style?.text ?? "text-primary"}`}>
                        {style?.label ?? t.category}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="text-sm font-bold text-foreground leading-snug">{t.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{t.destination}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <DollarSign size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Per seat</span>
                        </div>
                        <p className="text-base font-bold text-primary">${t.price_per_seat}</p>
                        <p className="text-[10px] text-muted-foreground">${t.deposit_amount} deposit</p>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Users size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Availability</span>
                        </div>
                        <p className={`text-base font-bold ${t.seats_remaining <= 3 ? "text-orange-400" : "text-green-400"}`}>
                          {t.seats_remaining}
                        </p>
                        <p className="text-[10px] text-muted-foreground">of {t.seats_total} seats left</p>
                      </div>
                    </div>

                    {/* Status badge + CTA */}
                    <div className="flex items-center justify-between gap-2">
                      {t.status === "announced" && (
                        <span className="text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-1 rounded-full uppercase tracking-wider">
                          Teams TBD
                        </span>
                      )}
                      <Link to={`/trips/${t.id}`} className="ml-auto">
                        <Button variant="hero" size="sm" className="gap-1">
                          Book Now <ArrowRight size={12} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-6 py-3 border-t border-border bg-card/40">
        <span className="text-xs text-muted-foreground font-medium mr-1">Events:</span>
        {Object.entries(categoryStyle).map(([cat, s]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${s.dot}`} />
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
        <span className="ml-auto text-xs text-muted-foreground italic">Click a date to see details</span>
      </div>
    </div>
  );
}
