export interface PickupLocation {
  name: string;
  address: string;
  time: string;
}

export interface Trip {
  id: string;
  title: string;
  category: "world-cup" | "penn-state" | "eagles";
  date: string;
  pickup_locations: PickupLocation[];
  destination: string;
  venue?: string;
  price_per_seat: number;
  seats_total: number;
  seats_remaining: number;
  deposit_amount: number;
  departure_time: string;
  arrival_window: string;
  return_time: string;
  description: string;
  image_url: string;
  status?: "announced" | "coming-soon" | "open";
  featured?: boolean;
}

export interface Booking {
  tripId: string;
  name: string;
  phone: string;
  email: string;
  seats: number;
  pickupLocation: string;
  totalPrice: number;
  depositAmount: number;
  createdAt: string;
}
