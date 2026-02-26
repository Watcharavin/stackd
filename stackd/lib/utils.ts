// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date to human-readable string */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  });
}

/** Calculate days remaining from now until end date */
export function daysRemaining(endDate: string | Date): number {
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/** Calculate progress percentage (0–100) */
export function calcProgress(logged: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(100, Math.round((logged / total) * 100));
}

/** Get member status color class */
export function statusColor(status: "safe" | "risk" | "dead"): string {
  return {
    safe: "text-green",
    risk: "text-yellow",
    dead: "text-red",
  }[status];
}
