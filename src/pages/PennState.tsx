import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/trips";

const games = [
  { id: "psu-sep5",  date: "September 5, 2026",  opponent: "Home Opener (Opponent TBD)", note: "Home Opener", price: 150 },
  { id: "psu-sep19", date: "September 19, 2026", opponent: "Opponent TBD", note: "", price: 150 },
  { id: "psu-sep26", date: "September 26, 2026", opponent: "Opponent TBD", note: "", price: 150 },
  { id: "psu-oct10", date: "October 10, 2026",   opponent: "Opponent TBD", note: "", price: 150 },
  { id: "psu-oct31", date: "October 31, 2026",   opponent: "Opponent TBD", note: "Halloween Weekend 🎃", price: 160 },
  { id: "psu-nov14", date: "November 14, 2026",  opponent: "Opponent TBD", note: "", price: 150 },
  { id: "psu-nov21", date: "November 21, 2026",  opponent: "Opponent TBD", note: "Regular Season Finale", price: 160 },
];

const faqs = [
  { q: "What's included?", a: "Round-trip transportation from your chosen pickup location to Beaver Stadium and back. No parking fees, no traffic stress." },
  { q: "What time do we leave?", a: "Departure times vary by kickoff. Exact times are confirmed per trip and displayed on each booking page. We always arrive 3+ hours early." },
  { q: "Where do we park?", a: "You park at your chosen pickup location — all three locations have free parking. We handle the drive from there." },
  { q: "Can I tailgate?", a: "Absolutely. We arrive 3+ hours before kickoff so you have plenty of time to tailgate before the game." },
  { q: "What if the game is a night game?", a: "Return trip departs 1 hour after the final whistle. Exact return timing is confirmed per trip." },
];

export default function PennState() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-background to-background">
        <div className="container py-20 md:py-28 text-center">
          <span className="text-5xl">🦁</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight max-w-4xl mx-auto">
            Ride to Happy Valley —{" "}
            <span className="text-gradient">Leave the Drive to Us.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Per-seat round-trip shuttles from NEPA to Beaver Stadium, State College, PA for all 2026 Penn State home games. No traffic, no parking. Just show up at your pickup spot.
          </p>
          <div className="mt-8">
            <Link to="/trips">
              <Button variant="hero" size="xl">View All Penn State Trips</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="container py-12">
        <div className="flex items-center gap-3 mb-6">
          <MapPin size={20} className="text-primary" />
          <h2 className="text-2xl font-bold">Beaver Stadium — State College, PA</h2>
          <span className="text-xs bg-blue-900/30 text-blue-200 px-2 py-1 rounded border border-blue-900/30">7 home games</span>
        </div>
        <div className="space-y-3">
          {games.map((g) => (
            <div key={g.id} className="glass-card rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[180px]">
                  <Calendar size={14} className="text-primary shrink-0" />
                  {g.date}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{g.opponent}</p>
                  {g.note && (
                    <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">{g.note}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-primary">{formatPrice(g.price)}<span className="text-xs text-muted-foreground font-normal"> / seat</span></span>
                <Link to={`/trips/${g.id}`}>
                  <Button variant="hero" size="sm">Book Now</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground text-center">
          Full 2026 opponent schedule TBD. Trips are bookable now — opponent revealed closer to game day.
        </p>
      </section>

      {/* Details strip */}
      <section className="bg-card/50 py-12">
        <div className="container grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
          <div className="glass-card rounded-lg p-5">
            <span className="text-3xl">🚐</span>
            <h3 className="font-bold mt-3 text-foreground">4 Pickup Spots</h3>
            <p className="text-sm text-muted-foreground mt-1">Extra Space Storage Dickson City · PennDOT P&R Pittston · Sam's Club Wilkes-Barre · Allentown Service Plaza</p>
          </div>
          <div className="glass-card rounded-lg p-5">
            <span className="text-3xl">🍺</span>
            <h3 className="font-bold mt-3 text-foreground">Tailgate Time</h3>
            <p className="text-sm text-muted-foreground mt-1">We arrive 3+ hours before kickoff — plenty of time to set up</p>
          </div>
          <div className="glass-card rounded-lg p-5">
            <span className="text-3xl">🅿️</span>
            <h3 className="font-bold mt-3 text-foreground">Free Parking</h3>
            <p className="text-sm text-muted-foreground mt-1">Park at your pickup location for free. No Happy Valley parking fees.</p>
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

      {/* CTA */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Head to Happy Valley?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">12 seats per trip. Reserve yours before they fill up.</p>
        <Link to="/trips">
          <Button variant="hero" size="xl">Book a Penn State Trip <ArrowRight size={16} className="ml-1" /></Button>
        </Link>
      </section>
    </div>
  );
}
