import { useState } from "react";
import TripCard from "@/components/TripCard";
import TripCalendar from "@/components/TripCalendar";
import trips from "@/data/trips.json";
import { Trip } from "@/types/trip";

const typedTrips = trips as Trip[];

// Hide coming-soon trips from the main listing
const visibleTrips = typedTrips.filter((t) => t.status !== "coming-soon");

const filters = [
  { label: "All", value: "all" },
  { label: "⚽ World Cup", value: "world-cup" },
  { label: "🦁 Penn State", value: "penn-state" },
  { label: "🦅 Eagles", value: "eagles" },
];

export default function UpcomingTrips() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? visibleTrips : visibleTrips.filter((t) => t.category === filter);
  const calendarTrips = filter === "all" ? visibleTrips : filtered;

  return (
    <div className="container py-12 pb-24 md:pb-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Trips</h1>
      <p className="text-muted-foreground mb-8">Reserve your seats for per-seat gameday shuttles from NEPA.</p>

      {/* Calendar */}
      <TripCalendar trips={calendarTrips} />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No trips found in this category.</p>
      )}
    </div>
  );
}
