import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");
    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    if (!sessionId || !stripeSecret) {
      return NextResponse.json({ isPaid: false, error: "Missing session_id or secret key" });
    }

    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2025-02-24.acacia" as any,
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      isPaid: session.payment_status === "paid",
      status: session.status,
      customerEmail: session.customer_details?.email,
      amountTotal: session.amount_total ? session.amount_total / 100 : 0,
      orderId: session.metadata?.orderId,
    });
  } catch (error: any) {
    console.error("Verify session error:", error);
    return NextResponse.json({ isPaid: false, error: error.message }, { status: 500 });
  }
}
