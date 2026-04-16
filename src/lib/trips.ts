import { Trip } from "@/types/trip";

export function getSeatsUrgency(remaining: number, total: number) {
  const ratio = remaining / total;
  if (remaining <= 2) return { label: `Only ${remaining} left!`, level: "critical" as const };
  if (ratio <= 0.33) return { label: `${remaining} seats left`, level: "low" as const };
  return { label: `${remaining} seats available`, level: "available" as const };
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatPrice(price: number) {
  return `$${price.toFixed(2).replace(/\.00$/, "")}`;
}

export function calculateTotal(pricePerSeat: number, seats: number) {
  return pricePerSeat * seats;
}

export function calculateDeposit(depositPerSeat: number, seats: number) {
  return depositPerSeat * seats;
}

export function calculateDriverTip(baseTotal: number) {
  return Math.round(baseTotal * 0.20 * 100) / 100;
}

export function calculateGrandTotal(pricePerSeat: number, seats: number, extraTip: number) {
  const base = calculateTotal(pricePerSeat, seats);
  const mandatoryTip = calculateDriverTip(base);
  return base + mandatoryTip + extraTip;
}
