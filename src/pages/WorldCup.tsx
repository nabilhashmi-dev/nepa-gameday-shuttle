import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/trips";

const FINAL_ID = "wc-nj-final";

const metlifeGames = [
  { id: "wc-nj-jun13", date: "June 13, 2026", match: "🇧🇷 Brazil vs. Morocco 🇲🇦", stage: "Group Stage", price: 245 },
  { id: "wc-nj-jun16", date: "June 16, 2026", match: "🇫🇷 France vs. Senegal 🇸🇳", stage: "Group Stage", price: 235 },
  { id: "wc-nj-jun25", date: "June 25, 2026", match: "🇩🇪 Germany vs. Ecuador", stage: "Group Stage", price: 235 },
  { id: "wc-nj-jun27", date: "June 27, 2026", match: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England vs. Panama", stage: "Group Stage", price: 245 },
  { id: "wc-nj-jun30", date: "June 30, 2026", match: "Round of 32 — TBD", stage: "Knockout", price: 265 },
  { id: "wc-nj-jul5", date: "July 5, 2026", match: "Round of 16 — TBD", stage: "Knockout", price: 275 },
];

const lincGames = [
  { id: "wc-phi-jun14", date: "June 14, 2026", match: "Côte d'Ivoire vs. Ecuador", stage: "Group Stage", price: 210 },
  { id: "wc-phi-jun19", date: "June 19, 2026", match: "🇧🇷 Brazil vs. Haiti", stage: "Group Stage", price: 230 },
  { id: "wc-phi-jun22", date: "June 22, 2026", match: "🇫🇷 France vs. Iraq", stage: "Group Stage", price: 225 },
  { id: "wc-phi-jul4", date: "July 4, 2026 🇺🇸", match: "Round of 16 — TBD", stage: "Knockout", price: 260 },
];

const faqs = [
  { q: "What's included?", a: "Round-trip transportation from all 3 NEPA pickup locations to the stadium and back. That's it — we handle the drive." },
  { q: "Do I need game tickets?", a: "Yes — the shuttle is transportation only. You'll need to source your own match tickets separately." },
  { q: "What time do we depart?", a: "Departure times are TBD and will be confirmed per trip based on kickoff time. You'll receive full details after booking." },
  { q: "How do I book?", a: "Click Book Now on any trip, fill out your info, and pay the deposit to lock in your seat. Balance is due 7 days before the trip." },
  { q: "What if the game is postponed?", a: "Full refund or reschedule to the rescheduled match date — your choice." },
];

export default function WorldCup() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-background to-yellow-950/30">
        <div className="container py-20 md:py-28 text-center">
          <span className="text-5xl">🌍</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight max-w-4xl mx-auto">
            Ride to the World Cup —{" "}
            <span className="text-gradient">No Passport Needed for the Drive.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Per-seat round-trip shuttles from NEPA to FIFA World Cup 2026 games at MetLife Stadium (East Rutherford, NJ) and Lincoln Financial Field (Philadelphia, PA).
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/trips?filter=world-cup">
              <Button variant="hero" size="xl">Browse All World Cup Trips</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* World Cup Final Featured Card */}
      <section className="container py-12">
        <div className="relative rounded-2xl overflow-hidden border border-yellow-500/40 bg-gradient-to-br from-yellow-950/40 via-background to-blue-950/30 p-8 md:p-10 text-center">
          <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            THE BIG ONE 🏆
          </div>
          <span className="text-6xl">🏆</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-foreground">FIFA World Cup Final</h2>
          <p className="mt-2 text-yellow-400 font-semibold text-lg">July 19, 2026 · MetLife Stadium, East Rutherford, NJ</p>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            The biggest sporting event on the planet — at the biggest stadium in the country, 2 hours from your front door. This is the one you'll tell your grandkids about.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <span className="text-3xl font-black text-primary">{formatPrice(375)}<span className="text-sm font-normal text-muted-foreground"> / seat</span></span>
            <span className="text-muted-foreground text-sm">{formatPrice(188)} deposit to reserve</span>
            <Link to={`/trips/${FINAL_ID}`}>
              <Button variant="hero" size="lg">Reserve My Seat</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* MetLife Games */}
      <section className="container py-8">
        <div className="flex items-center gap-3 mb-6">
          <MapPin size={20} className="text-primary" />
          <h2 className="text-2xl font-bold">MetLife Stadium — East Rutherford, NJ</h2>
          <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">7 trips</span>
        </div>
        <div className="space-y-3">
          {metlifeGames.map((g) => (
            <div key={g.id} className="glass-card rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[140px]">
                  <Calendar size={14} className="text-primary shrink-0" />
                  {g.date}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{g.match}</p>
                  <span className={`text-xs px-2 py-0.5 rounded ${g.stage === "Knockout" ? "bg-orange-500/10 text-orange-400" : "bg-primary/10 text-primary"}`}>
                    {g.stage}
                  </span>
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
          {/* Final row linking to the featured card */}
          <div className="glass-card rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-yellow-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[140px]">
                <Calendar size={14} className="text-primary shrink-0" />
                July 19, 2026
              </div>
              <div>
                <p className="font-semibold text-foreground">🏆 World Cup Final</p>
                <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400">Final</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-primary">{formatPrice(375)}<span className="text-xs text-muted-foreground font-normal"> / seat</span></span>
              <Link to={`/trips/${FINAL_ID}`}>
                <Button variant="hero" size="sm">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lincoln Financial Games */}
      <section className="container py-8">
        <div className="flex items-center gap-3 mb-6">
          <MapPin size={20} className="text-primary" />
          <h2 className="text-2xl font-bold">Lincoln Financial Field — Philadelphia, PA</h2>
          <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">4 trips</span>
        </div>
        <div className="space-y-3">
          {lincGames.map((g) => (
            <div key={g.id} className="glass-card rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[140px]">
                  <Calendar size={14} className="text-primary shrink-0" />
                  {g.date}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{g.match}</p>
                  <span className={`text-xs px-2 py-0.5 rounded ${g.stage === "Knockout" ? "bg-orange-500/10 text-orange-400" : "bg-primary/10 text-primary"}`}>
                    {g.stage}
                  </span>
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
      </section>

      {/* FAQ */}
      <section className="bg-card/50 py-16">
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
        <h2 className="text-3xl font-bold mb-4">Don't Miss Your Shot at the World Cup</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Seats are limited to 12 per trip. Reserve yours with a deposit today.</p>
        <Link to="/trips">
          <Button variant="hero" size="xl">View All Trips <ArrowRight size={16} className="ml-1" /></Button>
        </Link>
      </section>
    </div>
  );
}
