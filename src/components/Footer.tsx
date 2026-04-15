import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">NEPA Gameday Shuttle</h3>
            <p className="text-sm text-muted-foreground">
              Per-seat gameday shuttle service from NEPA.<br />
              Based in Dickson City, PA.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/world-cup" className="hover:text-primary transition-colors">World Cup 2026</Link>
              <Link to="/penn-state" className="hover:text-primary transition-colors">Penn State Football</Link>
              <Link to="/eagles" className="hover:text-primary transition-colors">Philadelphia Eagles</Link>
              <Link to="/trips" className="hover:text-primary transition-colors">All Trips</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link to="/charters" className="hover:text-primary transition-colors">Private Charters</Link>
              <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>(570) 555-0100</span>
              <span>info@nepagamedayshuttle.com</span>
              <span>Dickson City, PA</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NEPA Gameday Shuttle. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
