import { OrderRecord } from "@/types/order";

const STORAGE_KEY = "zencraft_orders_db";

export function saveOrderToStorage(order: OrderRecord): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getOrdersFromStorage();
    const updated = [order, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save order to localStorage:", err);
  }
}

export function getOrdersFromStorage(): OrderRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to get orders from localStorage:", err);
    return [];
  }
}

export function getOrderById(orderId: string): OrderRecord | undefined {
  const orders = getOrdersFromStorage();
  return orders.find((o) => o.orderId === orderId);
}

export function generateOrderId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ZC-${dateStr}-${randomSuffix}`;
}

export function generateTrackingNumber(): string {
  const prefix = "SF";
  const num = Math.floor(1000000000 + Math.random() * 9000000000);
  return `${prefix}${num}INT`;
}
