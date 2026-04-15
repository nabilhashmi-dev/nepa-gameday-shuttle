import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Gameday Per-Seat Trips",
    items: [
      { label: "Penn State Games", price: "$125–$175 per seat" },
      { label: "NFL Games (Eagles, Giants, Jets)", price: "$150–$225 per seat" },
    ],
    note: "Deposit required to reserve. Balance due 7 days before trip.",
    cta: { label: "View Upcoming Trips", to: "/trips" },
  },
  {
    title: "Private Charters",
    items: [
      { label: "Hourly Rate", price: "$150–$200 per hour" },
      { label: "Minimum", price: "5 hour minimum" },
      { label: "Cleaning Fee", price: "$150" },
    ],
    note: "",
    cta: { label: "Get a Charter Quote", to: "/charters" },
  },
  {
    title: "City Day Trips",
    items: [
      { label: "Flat Rate", price: "$1,400–$2,000" },
      { label: "Includes", price: "10–12 hours" },
      { label: "Extra Hours", price: "$120 per hour" },
    ],
    note: "",
    cta: { label: "Get a Quote", to: "/charters" },
  },
  {
    title: "Airport Transfers",
    items: [
      { label: "Round Trip", price: "$900–$1,200" },
    ],
    note: "Pricing varies by airport (EWR, JFK, PHL, etc.)",
    cta: { label: "Get a Quote", to: "/charters" },
  },
];

export default function Pricing() {
  return (
    <div className="container py-12 pb-24 md:pb-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Pricing</h1>
      <p className="text-muted-foreground mb-10 max-w-xl">
        Transparent pricing for all our services. No hidden fees.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.title} className="glass-card rounded-lg p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-foreground">{section.title}</h2>
            <div className="space-y-3 flex-1">
              {section.items.map((item) => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-bold text-primary">{item.price}</span>
                </div>
              ))}
              {section.note && (
                <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">{section.note}</p>
              )}
            </div>
            <Link to={section.cta.to} className="mt-6">
              <Button variant="hero" size="default" className="w-full">{section.cta.label}</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
