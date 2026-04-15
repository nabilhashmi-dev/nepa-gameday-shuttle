import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border p-3 flex gap-2">
      <Link to="/trips" className="flex-1">
        <Button variant="hero" className="w-full">View Trips</Button>
      </Link>
      <Link to="/charters" className="flex-1">
        <Button variant="hero-outline" className="w-full">Get a Quote</Button>
      </Link>
    </div>
  );
}
