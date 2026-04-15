import { Link } from "react-router-dom";
import { Trip } from "@/types/trip";
import { formatDate, formatPrice, getSeatsUrgency } from "@/lib/trips";
import { tripImageMap } from "@/lib/tripImages";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

const categoryBadge: Record<string, { label: string; className: string }> = {
  "world-cup": { label: "⚽ World Cup", className: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
  "penn-state": { label: "🦁 Penn State", className: "bg-blue-900/30 text-blue-200 border border-blue-900/30" },
  "eagles": { label: "🦅 Eagles", className: "bg-green-900/20 text-green-400 border border-green-800/20" },
};

export default function TripCard({ trip }: { trip: Trip }) {
  const urgency = getSeatsUrgency(trip.seats_remaining, trip.seats_total);
  const image = tripImageMap[trip.id];
  const badge = categoryBadge[trip.category] ?? { label: trip.category, className: "bg-primary/10 text-primary" };

  return (
    <div className="glass-card rounded-lg overflow-hidden flex flex-col hover:border-primary/30 transition-colors">
      {image && (
        <img src={image} alt={trip.title} loading="lazy" width={1280} height={720} className="w-full h-44 object-cover" />
      )}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex items-start justify-between gap-2">
          <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded ${badge.className}`}>
            {badge.label}
          </span>
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              urgency.level === "critical"
                ? "bg-urgency/20 text-urgency animate-pulse-glow"
                : urgency.level === "low"
                ? "bg-warning/20 text-warning"
                : "bg-success/20 text-success"
            }`}
          >
            {urgency.label}
          </span>
        </div>

        <h3 className="text-xl font-bold text-foreground">{trip.title}</h3>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-primary" />
            {formatDate(trip.date)}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-primary" />
            {trip.destination}
          </span>
          <span className="flex items-center gap-2">
            <Users size={14} className="text-primary" />
            {trip.seats_remaining} of {trip.seats_total} seats
          </span>
        </div>

        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">{formatPrice(trip.price_per_seat)}</span>
            <span className="text-sm text-muted-foreground"> / seat</span>
          </div>
          <Link to={`/trips/${trip.id}`}>
            <Button variant="hero" size="sm">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
