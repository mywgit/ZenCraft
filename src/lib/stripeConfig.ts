/**
 * ZenCraft Global Payment Configuration
 * Modeled after PureToolHub / SnapBio Stripe Architecture
 */

export const STRIPE_CONFIG = {
  // Direct Stripe Payment Link (Default / Fallback)
  defaultStripeLink: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL || "https://buy.stripe.com/28EaEYg7f6T83sIcRQ0Ny00",
  // PayPal Gateway URL
  paypalClientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
};
