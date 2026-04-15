import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import trips from "@/data/trips.json";
import { Trip } from "@/types/trip";
import { formatDate, formatPrice, calculateTotal, calculateDeposit, getSeatsUrgency } from "@/lib/trips";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Clock, Users, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const typedTrips = trips as Trip[];

export default function TripDetail() {
  const { id } = useParams();
  const trip = typedTrips.find((t) => t.id === id);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState(1);
  const [pickup, setPickup] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!trip) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Trip Not Found</h1>
        <Link to="/trips"><Button variant="hero">Back to Trips</Button></Link>
      </div>
    );
  }

  const urgency = getSeatsUrgency(trip.seats_remaining, trip.seats_total);
  const total = calculateTotal(trip.price_per_seat, seats);
  const deposit = calculateDeposit(trip.deposit_amount, seats);

  const handleBooking = async () => {
    if (!name || !phone || !email || !pickup) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!agreed) {
      toast.error("You must agree to the terms.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_N8N_RESERVATION_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: trip.id,
          name,
          phone,
          email,
          seats,
          pickupLocation: pickup,
          totalPrice: total,
          depositAmount: deposit,
        }),
      });

      if (res.ok) {
        toast.success("Reservation submitted! We'll contact you within 24 hours to confirm and collect your deposit.");
        setName(""); setPhone(""); setEmail(""); setSeats(1); setPickup(""); setAgreed(false);
      } else {
        let errorMessage = "Unable to submit reservation. Please try again.";
        try {
          const data = await res.json();
          if (data?.error) errorMessage = data.error;
        } catch { /* non-JSON response */ }
        toast.error(errorMessage);
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 pb-24 md:pb-12 max-w-4xl">
      <Link to="/trips" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft size={16} /> Back to Trips
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Trip Info */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
              {trip.category === "sports" ? "🏈 Sports" : "🏙️ City Trip"}
            </span>
            <h1 className="text-3xl font-bold mt-3">{trip.title}</h1>
            <p className="text-muted-foreground mt-2">{trip.description}</p>
          </div>

          <div className="glass-card rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-primary" />
              <span>{formatDate(trip.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-primary" />
              <span>{trip.destination}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users size={16} className="text-primary" />
              <span className={urgency.level === "critical" ? "text-urgency font-bold" : ""}>
                {urgency.label}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-card rounded-lg p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock size={16} className="text-primary" /> Trip Timeline
            </h3>
            <div className="space-y-4 relative pl-6 border-l-2 border-primary/20">
              {[
                { label: "Departure", value: trip.departure_time },
                { label: "Estimated Arrival", value: trip.arrival_window },
                { label: "Return", value: trip.return_time },
              ].map((item) => (
                <div key={item.label} className="relative">
                  <div className="absolute -left-[1.6rem] w-3 h-3 rounded-full bg-primary" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pickup Locations */}
          <div className="glass-card rounded-lg p-5">
            <h3 className="font-semibold mb-3">📍 Park & Ride Pickup Locations</h3>
            <div className="space-y-3">
              {trip.pickup_locations.map((loc) => (
                <div key={loc.name} className="flex items-start gap-3 text-sm">
                  <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{loc.name}</p>
                    <p className="text-muted-foreground">{loc.address} · Departs {loc.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-lg p-6 sticky top-20 space-y-5">
            <div className="text-center pb-4 border-b border-border">
              <span className="text-3xl font-bold text-primary">{formatPrice(trip.price_per_seat)}</span>
              <span className="text-muted-foreground"> / seat</span>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(570) 555-0100" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@email.com" type="email" />
              </div>
              <div>
                <Label>Number of Seats</Label>
                <Select value={String(seats)} onValueChange={(v) => setSeats(Number(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: Math.min(trip.seats_remaining, 6) }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>{i + 1} seat{i > 0 ? "s" : ""}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Pickup Location</Label>
                <Select value={pickup} onValueChange={setPickup}>
                  <SelectTrigger><SelectValue placeholder="Select pickup" /></SelectTrigger>
                  <SelectContent>
                    {trip.pickup_locations.map((loc) => (
                      <SelectItem key={loc.name} value={loc.name}>
                        {loc.name} ({loc.time})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-secondary/50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total ({seats} seat{seats > 1 ? "s" : ""})</span>
                <span className="font-bold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-primary font-bold">
                <span>Deposit Due Now</span>
                <span>{formatPrice(deposit)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Balance Due 7 Days Before</span>
                <span>{formatPrice(total - deposit)}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} className="mt-1" />
              <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                I agree to the terms & conditions. Deposits are non-refundable. No glass containers. Driver has final say on alcohol policy. Remaining balance due 7 days before trip.
              </label>
            </div>

            <Button variant="hero" size="lg" className="w-full" onClick={handleBooking} disabled={loading}>
              {loading ? "Submitting..." : `Reserve ${seats} Seat${seats > 1 ? "s" : ""} — ${formatPrice(deposit)} Deposit`}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Your reservation is not confirmed until we follow up to collect your deposit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
