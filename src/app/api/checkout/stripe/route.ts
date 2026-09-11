import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, orderItem, shippingAddress, totalAmount } = body;

    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecret) {
      return NextResponse.json({
        isLive: false,
        message: "Stripe API key not configured.",
        orderId,
      });
    }

    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2025-02-24.acacia" as any,
    });

    const origin = req.nextUrl.origin || "http://localhost:3000";

    // Only pass publicly accessible HTTPS images to Stripe to avoid localhost validation errors
    const productImages: string[] = [];
    if (orderItem.image && orderItem.image.startsWith("https://")) {
      productImages.push(orderItem.image);
    } else {
      productImages.push("https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80");
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: shippingAddress.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: orderItem.title || "ZenCraft Custom Sacred Wood Mala",
              description: orderItem.details?.wearerName
                ? `Custom Inscription: ${orderItem.details.wearerName} | ${orderItem.details.beadCount || 18} Beads (${orderItem.details.dominantElement || "Zen"})`
                : "Handcrafted Imperial Timber & Healing Crystal Heirloom",
              images: productImages,
            },
            unit_amount: Math.round(totalAmount * 100), // in cents ($118.15 -> 11815)
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
        customerPhone: shippingAddress.phone || "",
        customerAddress: `${shippingAddress.addressLine1}, ${shippingAddress.city}, ${shippingAddress.country}`,
      },
    });

    return NextResponse.json({
      isLive: true,
      url: session.url,
      sessionId: session.id,
      orderId,
    });
  } catch (error: any) {
    console.error("Stripe Checkout Session Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create Stripe checkout session" },
      { status: 500 }
    );
  }
}
