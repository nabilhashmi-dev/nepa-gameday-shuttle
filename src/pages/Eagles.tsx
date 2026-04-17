import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const faqs = [
  { q: "What's included?", a: "Round-trip transportation from all 3 NEPA pickup locations to Lincoln Financial Field and back." },
  { q: "Do I need game tickets?", a: "Yes — the shuttle is transportation only. You'll source your own Eagles tickets separately." },
  { q: "What time do we depart?", a: "Times are confirmed per trip based on game time. You'll get full details after booking." },
  { q: "Where do we park?", a: "You park free at your chosen NEPA pickup location. No Philly parking required." },
  { q: "What if a game is rescheduled?", a: "Full refund or reschedule to the new date — your choice." },
];

export default function Eagles() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please enter your name and email.");
      return;
    }
    // Placeholder — would connect to email list in production
    const existing = JSON.parse(localStorage.getItem("eagles_waitlist") || "[]");
    existing.push({ name, email, createdAt: new Date().toISOString() });
    localStorage.setItem("eagles_waitlist", JSON.stringify(existing));
    setSubmitted(true);
    toast.success("You're on the list! We'll notify you when Eagles trips go live.");
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-background to-gray-900/30">
        <div className="container py-20 md:py-28 text-center">
          <span className="text-5xl">🦅</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight max-w-4xl mx-auto">
            Fly to the Linc —{" "}
            <span className="text-gradient">Skip the I-95 Nightmare.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Per-seat round-trip shuttles from Scranton/Dickson City, PA to Lincoln Financial Field, Philadelphia for Eagles home games. No traffic. No parking. Just football.
          </p>
        </div>
      </section>

      {/* Schedule coming soon banner */}
      <section className="container py-12 max-w-2xl">
        <div className="rounded-2xl border border-green-700/40 bg-green-950/20 p-8 text-center">
          <span className="text-4xl">📅</span>
          <h2 className="mt-4 text-2xl font-bold text-foreground">2026 Eagles Schedule Coming in May</h2>
          <p className="mt-3 text-muted-foreground">
            The NFL releases the 2026 regular season schedule in mid-May. The moment it drops, we'll finalize our trip lineup and open bookings. Get on the list now and be the first to reserve.
          </p>
        </div>
      </section>

      {/* Interest form */}
      <section className="container pb-12 max-w-md">
        {!submitted ? (
          <div className="glass-card rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-2">Notify Me When Eagles Trips Drop</h3>
            <p className="text-sm text-muted-foreground mb-6">Be first in line when the schedule is released and trips open for booking.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@email.com"
                  className="mt-1"
                />
              </div>
              <Button variant="hero" size="lg" className="w-full" type="submit">
                Notify Me When Eagles Schedule Drops
              </Button>
            </form>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-8 text-center border-green-700/30">
            <span className="text-4xl">✅</span>
            <h3 className="text-xl font-bold text-foreground mt-4">You're on the list!</h3>
            <p className="text-muted-foreground mt-2">We'll email you the moment Eagles trips are open for booking.</p>
          </div>
        )}
      </section>

      {/* What to expect */}
      <section className="bg-card/50 py-12">
        <div className="container grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
          <div className="glass-card rounded-lg p-5">
            <span className="text-3xl">🚐</span>
            <h3 className="font-bold mt-3 text-foreground">4 Pickup Spots</h3>
            <p className="text-sm text-muted-foreground mt-1">Extra Space Storage Dickson City · PennDOT P&R Pittston · Sam's Club Wilkes-Barre · Allentown Service Plaza</p>
          </div>
          <div className="glass-card rounded-lg p-5">
            <span className="text-3xl">🅿️</span>
            <h3 className="font-bold mt-3 text-foreground">Free Parking</h3>
            <p className="text-sm text-muted-foreground mt-1">Park at your pickup spot for free. No $50 Philly game day lots.</p>
          </div>
          <div className="glass-card rounded-lg p-5">
            <span className="text-3xl">💚</span>
            <h3 className="font-bold mt-3 text-foreground">Starting at ~$195</h3>
            <p className="text-sm text-muted-foreground mt-1">Per seat, round-trip. Exact pricing confirmed with schedule.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">FAQ</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass-card rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
