import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imperial Court & Jingzuo Woodworking Heritage | ZenCraft Atelier",
  description:
    "Learn about ZenCraft's centuries-old imperial court woodworking heritage, ethical sourcing of sacred wild timber, and commitment to authentic hand-turned craft.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "ZenCraft Atelier - Imperial Heritage & Sacred Timber",
    description: "Preserving royal woodworking traditions dating back to the Forbidden City.",
    url: "https://zen.puretoolhub.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
