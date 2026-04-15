import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "World Cup 2026", path: "/world-cup" },
  { label: "Penn State", path: "/penn-state" },
  { label: "Eagles", path: "/eagles" },
  { label: "All Trips", path: "/trips" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold text-primary tracking-tight">
          NEPA Gameday Shuttle
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/trips">
            <Button variant="hero" size="sm" className="ml-2">Book Now</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium ${
                location.pathname === item.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Link to="/trips" onClick={() => setOpen(false)}>
              <Button variant="hero" className="w-full">Book Now</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
