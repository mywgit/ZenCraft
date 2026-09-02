import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, orderItem, shippingAddress, totalAmount } = body;

    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecret) {
      // If Stripe key is not configured, inform client to proceed with test mode
      return NextResponse.json({
        isLive: false,
        message: "Stripe API key not configured. Using ZenCraft Direct Atelier Gateway.",
        orderId,
      });
    }

    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2025-02-24.acacia" as any,
    });

    const origin = req.nextUrl.origin || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: shippingAddress.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: orderItem.title || "ZenCraft Custom Sacred Wood Mala",
              description: orderItem.details?.wearerName
                ? `Custom Inscription: ${orderItem.details.wearerName} | ${orderItem.details.beadCount || 18} Beads`
                : "Handcrafted Dacheng Timber & Healing Crystal Mala",
              images: [orderItem.image.startsWith("http") ? orderItem.image : `${origin}${orderItem.image}`],
            },
            unit_amount: Math.round(totalAmount * 100), // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/order-success?orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/studio`,
      metadata: {
        orderId,
        wearerName: orderItem.details?.wearerName || "",
        beadCount: String(orderItem.details?.beadCount || 18),
      },
    });

    return NextResponse.json({
      isLive: true,
      url: session.url,
      sessionId: session.id,
      orderId,
    });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
