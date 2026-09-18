import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Interactive Mala Beads & Energy Bracelet Customizer Studio",
  description:
    "Design custom handcrafted Buddhist prayer malas and crystal healing bracelets on a real-time 360° circular canvas. Instant wrist sizing and Five Elements balance.",
  alternates: {
    canonical: "/studio",
  },
  openGraph: {
    title: "ZenCraft 3D Mala Bead Customizer Studio",
    description:
      "Interactive 360° canvas, real-time patina aging simulation, and Five Elements energy profile.",
    url: "https://zen.puretoolhub.com/studio",
  },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
