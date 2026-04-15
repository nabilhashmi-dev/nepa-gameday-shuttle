import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TripCard from "@/components/TripCard";
import trips from "@/data/trips.json";
import { Trip } from "@/types/trip";
import { MapPin, CreditCard, Star, ArrowRight, Bus } from "lucide-react";
import { heroVan } from "@/lib/tripImages";
import worldcupImg from "@/assets/trip-worldcup.jpg";
import psuImg from "@/assets/trip-psu-football.jpg";
import eaglesImg from "@/assets/trip-eagles.jpg";

const typedTrips = trips as Trip[];

const steps = [
  { icon: <MapPin size={24} />, title: "Choose a Trip", desc: "Browse upcoming per-seat gameday trips from NEPA." },
  { icon: <CreditCard size={24} />, title: "Reserve with Deposit", desc: "Pay a deposit to lock in your seat. Balance due 7 days before." },
  { icon: <Bus size={24} />, title: "Show Up & Ride", desc: "Meet at your chosen park & ride location. We handle the rest." },
];

const eventCategories = [
  {
    image: worldcupImg,
    imageAlt: "MetLife Stadium — FIFA World Cup 2026 venue",
    title: "FIFA World Cup 2026",
    desc: "11 trips to MetLife Stadium (NJ) and Lincoln Financial Field (Philly). Group stage through the Final.",
    path: "/world-cup",
    accent: "border-blue-500/30",
    badge: "bg-blue-500/10 text-blue-400",
    badgeText: "11 Trips Available",
  },
  {
    image: psuImg,
    imageAlt: "Beaver Stadium — Penn State Football",
    title: "Penn State Football",
    desc: "7 home games at Beaver Stadium, State College, PA. Tailgating time included. We arrive 3+ hours early.",
    path: "/penn-state",
    accent: "border-blue-900/40",
    badge: "bg-blue-900/30 text-blue-200",
    badgeText: "7 Home Games",
  },
  {
    image: eaglesImg,
    imageAlt: "Lincoln Financial Field — Philadelphia Eagles",
    title: "Philadelphia Eagles",
    desc: "Eagles 2026 home schedule drops in May. Get on the list now and be the first to know when trips go live.",
    path: "/eagles",
    accent: "border-green-800/30",
    badge: "bg-green-900/20 text-green-400",
    badgeText: "Schedule Coming May 2026",
  },
];

// Show only open/announced trips (not coming-soon), first 3
const featuredTrips = typedTrips.filter((t) => t.status !== "coming-soon").slice(0, 3);

export default function Home() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={heroVan} alt="NEPA Gameday Shuttle 15-passenger van" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="container relative py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl mx-auto">
            Game Day Shuttles from NEPA —{" "}
            <span className="text-gradient">No Driving. No Parking. Just the Game.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Per-seat round-trip shuttle service from Scranton/Dickson City to World Cup 2026, Penn State Football, and Philadelphia Eagles games.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/trips">
              <Button variant="hero" size="xl">View All Trips</Button>
            </Link>
            <Link to="/world-cup">
              <Button variant="hero-outline" size="xl">World Cup 2026</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Event Category Cards */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Where Are We Going?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventCategories.map((cat) => (
            <div key={cat.title} className={`glass-card rounded-xl overflow-hidden flex flex-col border ${cat.accent} hover:border-primary/30 transition-colors`}>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <span className={`absolute bottom-3 left-3 text-xs font-bold px-2 py-1 rounded ${cat.badge}`}>
                  {cat.badgeText}
                </span>
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{cat.desc}</p>
                </div>
                <Link to={cat.path} className="mt-auto">
                  <Button variant="hero" size="sm" className="w-full">
                    View Trips <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Trips Preview */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Upcoming Trips</h2>
          <Link to="/trips" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card/50 py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-primary">Step {i + 1}</span>
                <h3 className="text-lg font-bold mt-1 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pickup Locations */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Convenient Pickup Locations</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          All trips depart from park & ride locations in the Scranton/Dickson City area. Select your preferred pickup when booking.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {["Viewmont Mall Park & Ride", "Dunmore Park & Ride", "Dickson City Walmart"].map((loc) => (
            <div key={loc} className="glass-card rounded-lg p-4 text-center">
              <MapPin size={20} className="text-primary mx-auto mb-2" />
              <span className="text-sm font-medium text-foreground">{loc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-card/50 py-16">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">What Riders Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Mike R.", text: "Super easy booking. Van was clean and on time. Will definitely ride again for the next Eagles game." },
              { name: "Sarah T.", text: "Took the World Cup shuttle to MetLife. No stress about traffic or parking. This is the only way to go." },
              { name: "Jason K.", text: "Took the Penn State trip. Driver was awesome, price was fair. This is the way to travel to games." },
            ].map((r) => (
              <div key={r.name} className="glass-card rounded-lg p-6">
                <div className="flex gap-1 text-primary mb-3 justify-center">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm text-muted-foreground italic">"{r.text}"</p>
                <p className="text-sm font-semibold mt-3 text-foreground">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ride?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Browse all upcoming gameday trips and reserve your seat today.
        </p>
        <Link to="/trips">
          <Button variant="hero" size="xl">View Upcoming Trips</Button>
        </Link>
      </section>
    </div>
  );
}
