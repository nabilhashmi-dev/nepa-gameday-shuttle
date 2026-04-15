import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import UpcomingTrips from "./pages/UpcomingTrips";
import TripDetail from "./pages/TripDetail";
import WorldCup from "./pages/WorldCup";
import PennState from "./pages/PennState";
import Eagles from "./pages/Eagles";
import PrivateCharters from "./pages/PrivateCharters";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/trips" element={<UpcomingTrips />} />
            <Route path="/trips/:id" element={<TripDetail />} />
            <Route path="/world-cup" element={<WorldCup />} />
            <Route path="/penn-state" element={<PennState />} />
            <Route path="/eagles" element={<Eagles />} />
            <Route path="/charters" element={<PrivateCharters />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
