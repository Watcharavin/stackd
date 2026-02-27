// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode !== "subscription") break;

      const userId = session.metadata?.supabase_user_id;
      if (!userId) break;

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      const periodEnd = subscription.items.data[0]?.current_period_end;

      await supabaseAdmin.from("users").update({
        is_pro: true,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscription.id,
        stripe_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      }).eq("id", userId);
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const isActive = sub.status === "active" || sub.status === "trialing";
      const periodEnd = sub.items.data[0]?.current_period_end;
      await supabaseAdmin.from("users").update({
        is_pro: isActive,
        stripe_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      }).eq("stripe_subscription_id", sub.id);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await supabaseAdmin.from("users").update({
        is_pro: false,
        stripe_subscription_id: null,
        stripe_period_end: null,
      }).eq("stripe_subscription_id", sub.id);
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = invoice.parent?.subscription_details?.subscription;
      if (!subId) break;
      const sub = await stripe.subscriptions.retrieve(subId as string);
      const periodEnd = sub.items.data[0]?.current_period_end;
      await supabaseAdmin.from("users").update({
        is_pro: true,
        stripe_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      }).eq("stripe_subscription_id", sub.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
