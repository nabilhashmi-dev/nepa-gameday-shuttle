import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plane, PartyPopper, Building2, Bus } from "lucide-react";

const charterTypes = [
  { icon: <Building2 size={28} />, title: "NYC Trips", desc: "Day or night trips to Manhattan and beyond." },
  { icon: <Plane size={28} />, title: "Airport Transfers", desc: "Reliable rides to EWR, JFK, PHL, and more." },
  { icon: <PartyPopper size={28} />, title: "Parties & Events", desc: "Weddings, bachelor parties, concerts, and more." },
  { icon: <Bus size={28} />, title: "Custom Trips", desc: "Tell us where you need to go. We'll get you there." },
];

const pricingGuide = [
  { type: "Private Charter", price: "$150–$200/hr", note: "5 hour minimum" },
  { type: "City Day Trip", price: "$1,400–$2,000 flat", note: "10–12 hours included" },
  { type: "Airport Transfer", price: "$900–$1,200 round trip", note: "" },
  { type: "Cleaning Fee", price: "$150", note: "Applied to all charters" },
];

export default function PrivateCharters() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", tripType: "", date: "", pickup: "", destination: "", passengers: "", notes: "",
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.tripType) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const existing = JSON.parse(localStorage.getItem("nvh_quotes") || "[]");
    existing.push({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem("nvh_quotes", JSON.stringify(existing));
    toast.success("Quote request submitted! We'll be in touch within 24 hours.");
    setForm({ name: "", phone: "", email: "", tripType: "", date: "", pickup: "", destination: "", passengers: "", notes: "" });
  };

  return (
    <div className="pb-24 md:pb-0">
      {/* Hero */}
      <section className="container py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Private Charters</h1>
        <p className="text-muted-foreground max-w-xl">
          Book our 12-passenger van for your group. Your schedule, your destination.
        </p>
      </section>

      {/* Service Blocks */}
      <section className="container pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {charterTypes.map((s) => (
            <div key={s.title} className="glass-card rounded-lg p-6 text-center hover:border-primary/30 transition-colors">
              <div className="text-primary mx-auto mb-3">{s.icon}</div>
              <h3 className="font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Guide */}
      <section className="bg-card/50 py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Charter Pricing Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pricingGuide.map((p) => (
              <div key={p.type} className="glass-card rounded-lg p-5">
                <p className="text-sm text-muted-foreground">{p.type}</p>
                <p className="text-xl font-bold text-primary mt-1">{p.price}</p>
                {p.note && <p className="text-xs text-muted-foreground mt-1">{p.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Request a Quote</h2>
          <form onSubmit={handleSubmit} className="glass-card rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Name *</Label><Input value={form.name} onChange={(e) => update("name", e.target.value)} /></div>
              <div><Label>Phone *</Label><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
              <div><Label>Email *</Label><Input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" /></div>
              <div>
                <Label>Trip Type *</Label>
                <Select value={form.tripType} onValueChange={(v) => update("tripType", v)}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nyc">NYC Trip</SelectItem>
                    <SelectItem value="airport">Airport Transfer</SelectItem>
                    <SelectItem value="party">Party / Event</SelectItem>
                    <SelectItem value="custom">Custom Trip</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Date</Label><Input value={form.date} onChange={(e) => update("date", e.target.value)} type="date" /></div>
              <div><Label>Passenger Count</Label><Input value={form.passengers} onChange={(e) => update("passengers", e.target.value)} type="number" min="1" max="15" /></div>
              <div><Label>Pickup Location</Label><Input value={form.pickup} onChange={(e) => update("pickup", e.target.value)} placeholder="City or address" /></div>
              <div><Label>Destination</Label><Input value={form.destination} onChange={(e) => update("destination", e.target.value)} placeholder="City or address" /></div>
            </div>
            <div><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Any special requests?" /></div>
            <Button variant="hero" size="lg" type="submit" className="w-full">Submit Quote Request</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
