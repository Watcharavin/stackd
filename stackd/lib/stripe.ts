// lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID!;

// Free tier hard limits
export const FREE_CHALLENGE_LIMIT = 2;
export const FREE_MEMBER_LIMIT = 6;
