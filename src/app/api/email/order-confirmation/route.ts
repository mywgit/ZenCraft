import { NextRequest, NextResponse } from "next/server";
import {
  generateOrderConfirmationEmailHtml,
  generateShippingNotificationEmailHtml,
  generateWorkshopWorkOrderEmailHtml,
} from "@/lib/emailService";
import { OrderRecord } from "@/types/order";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type,
      order,
    }: {
      type: "order-confirmation" | "shipping-dispatch" | "workshop-workorder";
      order: OrderRecord;
    } = body;

    const origin = req.nextUrl.origin || "http://localhost:3000";
    let recipient = order.shippingAddress.email;

    let emailHtml = "";
    let subject = "";

    if (type === "shipping-dispatch") {
      emailHtml = generateShippingNotificationEmailHtml(order, origin);
      subject = `✈️ Your ZenCraft Sacred Mala Has Dispatched! (${order.trackingNumber})`;
    } else if (type === "workshop-workorder") {
      recipient = process.env.WORKSHOP_NOTIFY_EMAIL || "workshop@zencraft.art";
      emailHtml = generateWorkshopWorkOrderEmailHtml(order, origin);
      subject = `🪵【大城工坊配货工单】新定制手串 #${order.orderId} - ${order.shippingAddress.fullName}`;
    } else {
      emailHtml = generateOrderConfirmationEmailHtml(order, origin);
      subject = `✦ Order Confirmed: ZenCraft Bespoke Mala [${order.orderId}]`;
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // If RESEND_API_KEY is configured, dispatch real email
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ZenCraft Atelier <orders@zencraft.art>",
          to: [recipient],
          subject,
          html: emailHtml,
        }),
      });

      const data = await res.json();
      return NextResponse.json({ success: true, liveSent: true, data });
    }

    // Default: Log generated transactional email (zero setup required)
    console.log(`[Email Dispatch Log] To: ${recipient} | Subject: ${subject}`);
    return NextResponse.json({
      success: true,
      liveSent: false,
      message: "Email generated successfully. Configure RESEND_API_KEY for live delivery.",
      previewHtml: emailHtml,
    });
  } catch (error: any) {
    console.error("Email API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
