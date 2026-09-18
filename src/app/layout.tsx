import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { StudioProvider } from "@/context/StudioContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://zen.puretoolhub.com"),
  title: {
    template: "%s | ZenCraft",
    default: "ZenCraft - Interactive Zen Mala & Energy Bead Bracelet Atelier (2026)",
  },
  description:
    "Design custom handcrafted Zen energy bracelets and mala beads in real-time 360° canvas. Powered by authentic imperial court sacred wild timber, healing crystals, and 7-Chakras balance.",
  keywords: [
    "mala beads",
    "custom wood bracelet",
    "sandalwood bracelet",
    "buddhist prayer beads",
    "chakra healing bracelet",
    "diy bead customizer",
    "green sandalwood mala",
    "gold phoebe bracelet",
    "zen jewelry",
    "energy bracelet design",
  ],
  authors: [{ name: "ZenCraft Atelier Team", url: "https://zen.puretoolhub.com" }],
  creator: "ZenCraft",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ZenCraft - Interactive Zen Mala & Custom Energy Bracelet Atelier",
    description:
      "Design your personal energy guardian with authentic sacred timber & healing crystals. 360° canvas, real-time patina aging, and 7-chakras profile.",
    url: "https://zen.puretoolhub.com",
    siteName: "ZenCraft",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZenCraft - Custom Zen Mala & Energy Bracelet Atelier",
    description: "Interactive 360° bead customizer, sacred wild timber & 7-chakras alignment.",
    creator: "@puretoolhub",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
        <LanguageProvider>
          <StudioProvider>
            <Analytics />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </StudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
