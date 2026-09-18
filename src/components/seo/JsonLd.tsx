import React from "react";

export function JsonLd() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ZenCraft Studio",
    url: "https://zen.puretoolhub.com",
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    inLanguage: "en",
    description:
      "Interactive 360° Buddhist prayer mala and energy bead bracelet customizer. Real-time patina aging simulation, wrist sizing guide, and Five Elements balance calculation.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "ZenCraft Atelier",
      url: "https://zen.puretoolhub.com",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZenCraft Atelier",
    url: "https://zen.puretoolhub.com",
    logo: "https://zen.puretoolhub.com/icon.svg",
    sameAs: ["https://github.com/mywgit/ZenCraft"],
    description:
      "Atelier preserving imperial court woodworking standards, providing authentic handcrafted Buddhist malas, rare timber, and healing crystal jewelry.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Patina Time Slider, and will the wooden beads really change color?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Authentic wild timbers such as Green Sandalwood and Gold Phoebe are rich in natural essential oils. As you wear and meditate with them, they absorb body warmth and natural oils, developing a lustrous, amber-like protective glass sheen (patina). Our time slider simulates this natural aging transformation from Day 1 to Year 10.",
        },
      },
      {
        "@type": "Question",
        name: "Where are your sacred woods sourced, and how do you guarantee 100% authenticity?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All our sacred woods are ethically sourced according to historic Imperial Court Atelier standards. Every bead is cut from authentic wild, century-seasoned old stock with zero chemical dyes, zero artificial fragrances, and verified botanical purity.",
        },
      },
      {
        "@type": "Question",
        name: "How is the 7-Chakras & Five Elements Energy Profile calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our energy engine combines Eastern Five Elements (Wu Xing) and Ayurvedic 7-Chakra crystal resonance principles. Each sacred wood and gemstone emits unique energetic frequencies. As you arrange your beads, the system dynamically analyzes and scores your balance.",
        },
      },
      {
        "@type": "Question",
        name: "How long does shipping take, and what is included in the parcel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every bracelet is custom strung by hand in our atelier within 24 hours. We offer Free Worldwide Express (7-10 business days to US/EU/UK). Each parcel includes your custom mala, a wooden presentation gift box, silk preservation pouch, and a gold-foil stamped Certificate of Authenticity.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize wrist size and bead diameters in the studio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, ZenCraft's 3D studio automatically calculates bead counts and circle spacing based on your selected wrist circumference (14cm to 20cm) and bead sizes (8mm, 10mm, 12mm, 15mm) to ensure an exact, comfortable fit.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
