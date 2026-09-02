export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
}

export type PaymentMethod = "stripe-card" | "paypal" | "apple-pay";

export interface BeadSequenceItem {
  index: number;
  materialId: string;
  nameZh: string;
  nameEn: string;
  sizeMm: number;
  color: string;
  image: string;
}

export interface MaterialCountItem {
  materialId: string;
  nameZh: string;
  nameEn: string;
  count: number;
  sizeMm: number;
  image: string;
}

export interface OrderItem {
  id: string;
  title: string;
  titleZh: string;
  category: "custom-mala" | "ready-mala" | "carving" | "teapet" | "incense" | "amulet";
  image: string;
  priceUsd: number;
  quantity: number;
  details?: {
    beadCount?: number;
    wearerName?: string;
    dominantElement?: string;
    materialsSummary?: string;
    materialsSummaryZh?: string;
    beadsSequence?: BeadSequenceItem[];
    materialCounts?: MaterialCountItem[];
    blueprintSnapshotUrl?: string;
  };
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: "standard-free" | "express-dhl";
  shippingCost: number;
  discountAmount: number;
  subtotal: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "paid" | "pending";
  productionStatus: "confirmed" | "crafting" | "certificate-stamping" | "packaged" | "shipped";
  estimatedDelivery: string;
  trackingNumber: string;
}
