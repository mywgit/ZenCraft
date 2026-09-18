import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated Heirloom Malas & Sacred Wood Carvings | ZenCraft Market",
  description:
    "Explore ready-to-ship artisan Buddhist malas, tea pets, worry hand carvings, and natural incense vessels crafted from authentic aged sacred woods.",
  alternates: {
    canonical: "/market",
  },
  openGraph: {
    title: "ZenCraft Market - Curated Ready-to-Ship Artifacts",
    description: "Authentic aged sandalwood, gold nanmu malas, and hand-carved tea pets.",
    url: "https://zen.puretoolhub.com/market",
  },
};

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
