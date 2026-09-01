import { BeadMaterial, ChakraType, ElementType, BEAD_SIZES, getMaterialById } from "./materialsData";

export type { ChakraType, ElementType };

export interface SelectedBead {
  id: string; // Unique instance ID
  materialId: string;
  sizeMm: number;
}

export interface EnergyAnalysisResult {
  totalBeads: number;
  totalLengthCm: number;
  recommendedWristCm: number;
  totalPriceUsd: number;
  dominantElement: ElementType;
  elementCounts: Record<ElementType, number>;
  chakraScores: Record<ChakraType, number>; // 0 to 100
  topChakra: ChakraType;
  topZodiacs: string[];
  aromaScore: number; // 1 to 5
  aromaDescription: string;
  aromaDescriptionZh: string;
  blessingTitle: string;
  blessingTitleZh: string;
  blessingQuote: string;
  blessingQuoteZh: string;
}

export const CHAKRA_METADATA: Record<
  ChakraType,
  { name: string; nameZh: string; color: string; desc: string; descZh: string }
> = {
  root: {
    name: "Root Chakra (Muladhara)",
    nameZh: "海底轮 (安全感与根基)",
    color: "#dc2626",
    desc: "Grounding, physical stability, emotional security, and anxiety relief.",
    descZh: "建立稳固安全感，排出负能量，增强内在定力与生命根基。",
  },
  sacral: {
    name: "Sacral Chakra (Svadhisthana)",
    nameZh: "生殖轮/脐轮 (创造与热情)",
    color: "#ea580c",
    desc: "Creativity, passion, emotional flexibility, and vitality.",
    descZh: "激发内在创造力、灵感流动与生活热情。",
  },
  solar: {
    name: "Solar Plexus Chakra (Manipura)",
    nameZh: "太阳神经丛/胃轮 (自信与财富)",
    color: "#ca8a04",
    desc: "Willpower, confidence, wealth magnetism, and decisive leadership.",
    descZh: "增强决断力、个人自信气场与财富吸引磁场。",
  },
  heart: {
    name: "Heart Chakra (Anahata)",
    nameZh: "心轮 (慈悲与情绪疗愈)",
    color: "#16a34a",
    desc: "Compassion, emotional healing, inner peace, and unconditional love.",
    descZh: "抚平焦虑与情伤，打开包容慈悲之心，恢复内在宁静。",
  },
  throat: {
    name: "Throat Chakra (Vishuddha)",
    nameZh: "喉轮 (真诚表达与沟通)",
    color: "#0891b2",
    desc: "Clear communication, truthful self-expression, and creative voice.",
    descZh: "增强沟通表达力、口才逻辑与真实自我呈现。",
  },
  thirdEye: {
    name: "Third Eye Chakra (Ajna)",
    nameZh: "三眼轮/眉心轮 (直觉与洞察)",
    color: "#4f46e5",
    desc: "Intuition, foresight, mental clarity, and spiritual awareness.",
    descZh: "开启灵性直觉洞察，破除迷茫，提升深度思考专注力。",
  },
  crown: {
    name: "Crown Chakra (Sahasrara)",
    nameZh: "顶轮 (觉悟与高维智慧)",
    color: "#9333ea",
    desc: "Universal connection, spiritual wisdom, serenity, and mindfulness.",
    descZh: "链接高维觉知与安详智慧，超越烦恼，达到澄澈心境。",
  },
};

export function calculateEnergyProfile(beads: SelectedBead[]): EnergyAnalysisResult {
  if (beads.length === 0) {
    return {
      totalBeads: 0,
      totalLengthCm: 0,
      recommendedWristCm: 16,
      totalPriceUsd: 0,
      dominantElement: "wood",
      elementCounts: { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 },
      chakraScores: {
        root: 0,
        sacral: 0,
        solar: 0,
        heart: 0,
        throat: 0,
        thirdEye: 0,
        crown: 0,
      },
      topChakra: "heart",
      topZodiacs: ["Taurus", "Virgo", "Capricorn"],
      aromaScore: 1,
      aromaDescription: "Add sacred woods to awaken natural healing aroma.",
      aromaDescriptionZh: "加入天然圣木以唤醒植物芳香疗愈。",
      blessingTitle: "Awaiting Your Sacred Design",
      blessingTitleZh: "静候您的专属禅意设计",
      blessingQuote: "Select sacred beads to harmonize your spiritual energy.",
      blessingQuoteZh: "挑选心仪的天然圣木与晶石，调和身心脉轮能量。",
    };
  }

  let totalPrice = 0;
  let totalCircumferenceMm = 0;
  let totalAroma = 0;
  let woodCount = 0;

  const elementCounts: Record<ElementType, number> = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };

  const chakraCounts: Record<ChakraType, number> = {
    root: 0,
    sacral: 0,
    solar: 0,
    heart: 0,
    throat: 0,
    thirdEye: 0,
    crown: 0,
  };

  const zodiacCounts: Record<string, number> = {};

  beads.forEach((b) => {
    const mat = getMaterialById(b.materialId);
    if (!mat) return;

    // Price calculation with size multiplier
    const sizeObj = BEAD_SIZES.find((s) => s.mm === b.sizeMm) || BEAD_SIZES[1];
    totalPrice += mat.basePrice * sizeObj.multiplier;
    totalCircumferenceMm += b.sizeMm;

    // Elements
    elementCounts[mat.element]++;

    // Chakras
    mat.chakras.forEach((c) => {
      chakraCounts[c] += 1;
    });

    // Zodiacs
    mat.zodiacs.forEach((z) => {
      zodiacCounts[z] = (zodiacCounts[z] || 0) + 1;
    });

    // Aroma
    if (mat.category === "wood") {
      woodCount++;
      totalAroma += mat.aromaScore;
    }
  });

  // Calculate Chakra scores normalized to 10-100%
  const maxChakraCount = Math.max(...Object.values(chakraCounts), 1);
  const chakraScores: Record<ChakraType, number> = {
    root: Math.min(100, Math.round((chakraCounts.root / maxChakraCount) * 85 + 15)),
    sacral: Math.min(100, Math.round((chakraCounts.sacral / maxChakraCount) * 85 + 15)),
    solar: Math.min(100, Math.round((chakraCounts.solar / maxChakraCount) * 85 + 15)),
    heart: Math.min(100, Math.round((chakraCounts.heart / maxChakraCount) * 85 + 15)),
    throat: Math.min(100, Math.round((chakraCounts.throat / maxChakraCount) * 85 + 15)),
    thirdEye: Math.min(100, Math.round((chakraCounts.thirdEye / maxChakraCount) * 85 + 15)),
    crown: Math.min(100, Math.round((chakraCounts.crown / maxChakraCount) * 85 + 15)),
  };

  // Find dominant Chakra
  let topChakra: ChakraType = "heart";
  let maxScore = -1;
  (Object.keys(chakraCounts) as ChakraType[]).forEach((c) => {
    if (chakraCounts[c] > maxScore) {
      maxScore = chakraCounts[c];
      topChakra = c;
    }
  });

  // Find dominant Element
  let dominantElement: ElementType = "wood";
  let maxElemCount = -1;
  (Object.keys(elementCounts) as ElementType[]).forEach((e) => {
    if (elementCounts[e] > maxElemCount) {
      maxElemCount = elementCounts[e];
      dominantElement = e;
    }
  });

  // Top 3 Zodiacs
  const topZodiacs = Object.entries(zodiacCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([z]) => z);

  // Aroma average rating
  const avgAroma = woodCount > 0 ? Math.min(5, Math.round(totalAroma / woodCount)) : 1;

  // Length calculation (Circumference -> Inner Wrist size)
  const totalLengthCm = +(totalCircumferenceMm / 10).toFixed(1);
  // Subtract ~1.5cm for inner bead thickness to give realistic inner wrist circumference
  const recommendedWristCm = +(totalLengthCm - 1.2).toFixed(1);

  // Base Crafting & Packaging fee ($18 includes silk pouch, cert, wooden box)
  const finalPrice = +(totalPrice + 18).toFixed(2);

  return {
    totalBeads: beads.length,
    totalLengthCm,
    recommendedWristCm,
    totalPriceUsd: finalPrice,
    dominantElement,
    elementCounts,
    chakraScores,
    topChakra,
    topZodiacs: topZodiacs.length > 0 ? topZodiacs : ["Taurus", "Virgo", "Scorpio"],
    aromaScore: avgAroma,
    aromaDescription:
      woodCount > 0
        ? "Exudes organic sacred timber aroma. Rub beads to release essential oils for immediate nervous system grounding."
        : "Add sacred sandalwood or cypress beads to infuse natural aromatherapy.",
    aromaDescriptionZh:
      woodCount > 0
        ? "散发天然野生原木清香。双手轻揉珠体即可释放天然挥发油，抚平浮躁，深层安抚神经系统。"
        : "加入天然檀木或崖柏以获得植物芳香疗愈。",
    blessingTitle: "Harmonized Energy Guardian",
    blessingTitleZh: "天人合一 · 专属护身符",
    blessingQuote: `Blessed with the vitality of natural ${dominantElement.toUpperCase()} element and aligned with your ${CHAKRA_METADATA[topChakra].name}.`,
    blessingQuoteZh: `汇聚天地天然五行之【${dominantElement === "wood" ? "木" : dominantElement === "fire" ? "火" : dominantElement === "earth" ? "土" : dominantElement === "metal" ? "金" : "水"}】气场，深度共振您的【${CHAKRA_METADATA[topChakra].nameZh}】。`,
  };
}
