"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { OrderRecord } from "@/types/order";
import { getOrderById } from "@/lib/orderStorage";
import {
  CheckCircle,
  Truck,
  Package,
  Award,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Gift,
  Clock,
  Hammer,
} from "lucide-react";

function OrderSuccessContent() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");

  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifiedPaid, setVerifiedPaid] = useState(false);

  useEffect(() => {
    async function initOrder() {
      if (orderId) {
        let found = getOrderById(orderId);

        // If redirected from Stripe with a session_id, verify actual payment status
        if (sessionId) {
          try {
            const res = await fetch(`/api/checkout/verify-session?session_id=${sessionId}`);
            const data = await res.json();
            if (data.isPaid && found) {
              found = { ...found, paymentStatus: "paid" };
              const allOrders = JSON.parse(localStorage.getItem("zencraft_orders_db") || "[]");
              const updated = allOrders.map((o: OrderRecord) => (o.orderId === orderId ? { ...o, paymentStatus: "paid" } : o));
              localStorage.setItem("zencraft_orders_db", JSON.stringify(updated));
              setVerifiedPaid(true);

              // Auto-trigger confirmation email
              fetch("/api/email/order-confirmation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "order-confirmation", order: found }),
              }).catch(() => {});
            }
          } catch (err) {
            console.warn("Session verification error:", err);
          }
        }

        if (found) {
          setOrder(found);
        }
      }
      setLoading(false);
    }

    initOrder();
  }, [orderId, sessionId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Fallback if direct access or demo order
  const displayOrder: OrderRecord = order || {
    orderId: orderId || "ZC-20260902-8821",
    createdAt: new Date().toISOString(),
    items: [
      {
        id: "demo-custom-mala",
        title: "Bespoke Imperial Sacred Wood Mala (18 Beads)",
        titleZh: "紫禁宫廷造办正统老料高定手串 (18 颗)",
        category: "custom-mala",
        image: "/products/master-zitan.jpg",
        priceUsd: 118.0,
        quantity: 1,
        details: {
          wearerName: "Mindful Seeker",
          beadCount: 18,
          dominantElement: "wood",
        },
      },
    ],
    shippingAddress: {
      fullName: "Mindful Seeker",
      email: "seeker@zencraft.com",
      phone: "+1 (555) 019-2834",
      country: "US",
      addressLine1: "742 Evergreen Terrace",
      city: "Springfield",
      state: "Oregon",
      postalCode: "97477",
    },
    shippingMethod: "standard-free",
    shippingCost: 0,
    discountAmount: 10,
    subtotal: 118.0,
    totalAmount: 108.0,
    paymentMethod: "stripe-card",
    paymentStatus: "paid",
    productionStatus: "confirmed",
    estimatedDelivery: "Sep 10, 2026",
    trackingNumber: "SF9823741829INT",
  };

  const currentItem = displayOrder.items[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fadeIn">
      {/* 1. Success Hero Banner */}
      <div className="text-center space-y-3 zen-wood-card p-6 sm:p-10 rounded-3xl border border-amber-500/50 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/40">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-serif font-bold text-amber-400 uppercase tracking-widest">
            {lang === "zh" ? "✦ 结缘成功 · 工坊已接单 ✦" : "✦ Payment Confirmed & Transmitted ✦"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif text-amber-100">
            {lang === "zh" ? "感谢您的结缘！工单已下达京作宫廷工坊" : "Thank You for Your Sacred Order!"}
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-amber-200/70 font-serif max-w-xl mx-auto">
          {lang === "zh"
            ? "您的手串设计图纸、能量题名与收件信息已安全加密同步至京作宫廷非遗木作工坊，资深工艺师正在为您精选老料并亲手穿制。"
            : "Your bespoke design blueprint, astrological inscription, and shipping details have been securely synchronized to our Imperial Court Atelier."}
        </p>

        {/* Order Meta Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-serif">
          <span className="px-3.5 py-1.5 rounded-xl bg-[#0d0603] border border-amber-900/60 text-amber-300 font-mono">
            {lang === "zh" ? "订单编号: " : "Order ID: "}
            {displayOrder.orderId}
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === "zh" ? "支付状态: 已结清 (Paid)" : "Payment: Paid (Secured)"}</span>
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-[#0d0603] border border-amber-900/60 text-amber-200/80 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === "zh" ? "预计送达: " : "Est. Delivery: "} {displayOrder.estimatedDelivery}</span>
          </span>
        </div>
      </div>

      {/* 2. Atelier Craftsmanship Tracking Timeline */}
      <div className="zen-wood-card p-5 sm:p-7 rounded-3xl space-y-6">
        <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
          <div className="flex items-center gap-2">
            <Hammer className="w-4 h-4 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold font-serif text-amber-100">
              {lang === "zh" ? "京作宫廷工坊制作流水线实时追踪" : "Live Atelier Craftsmanship Progress"}
            </h2>
          </div>
          <span className="text-xs font-serif text-amber-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{lang === "zh" ? "工坊制作中" : "In Crafting"}</span>
          </span>
        </div>

        {/* 5-Step Craftsmanship Progress Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
          {/* Step 1: Confirmed */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 space-y-2 text-center">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center mx-auto shadow">
              ✓
            </div>
            <h3 className="text-xs font-bold font-serif text-emerald-300">
              {lang === "zh" ? "1. 订单确认" : "1. Confirmed"}
            </h3>
            <p className="text-[10px] text-amber-200/60 font-serif">
              {lang === "zh" ? "设计图纸已入库" : "Blueprint Saved"}
            </p>
          </div>

          {/* Step 2: Crafting (Active) */}
          <div className="p-3.5 rounded-2xl bg-amber-950/70 border-2 border-amber-400 space-y-2 text-center shadow-lg shadow-amber-950/60">
            <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center mx-auto animate-pulse">
              ⚙️
            </div>
            <h3 className="text-xs font-bold font-serif text-amber-200">
              {lang === "zh" ? "2. 选料穿制" : "2. Hand Stringing"}
            </h3>
            <p className="text-[10px] text-amber-300/80 font-serif font-bold">
              {lang === "zh" ? "老师傅手工穿制中" : "Active in Atelier"}
            </p>
          </div>

          {/* Step 3: Certificate */}
          <div className="p-3.5 rounded-2xl bg-[#0d0603] border border-amber-900/40 space-y-2 text-center opacity-75">
            <div className="w-7 h-7 rounded-full bg-[#1a0f08] border border-amber-800 text-amber-400 font-bold text-xs flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="text-xs font-bold font-serif text-amber-200/70">
              {lang === "zh" ? "3. 烫金证书" : "3. Inscription"}
            </h3>
            <p className="text-[10px] text-amber-200/50 font-serif">
              {lang === "zh" ? "专属题名与盖印" : "Energy Stamping"}
            </p>
          </div>

          {/* Step 4: Gift Box Packaging */}
          <div className="p-3.5 rounded-2xl bg-[#0d0603] border border-amber-900/40 space-y-2 text-center opacity-75">
            <div className="w-7 h-7 rounded-full bg-[#1a0f08] border border-amber-800 text-amber-400 font-bold text-xs flex items-center justify-center mx-auto">
              4
            </div>
            <h3 className="text-xs font-bold font-serif text-amber-200/70">
              {lang === "zh" ? "4. 实木封装" : "4. Packaging"}
            </h3>
            <p className="text-[10px] text-amber-200/50 font-serif">
              {lang === "zh" ? "天然实木礼盒密封" : "Wood Box Sealed"}
            </p>
          </div>

          {/* Step 5: Express Dispatch */}
          <div className="p-3.5 rounded-2xl bg-[#0d0603] border border-amber-900/40 space-y-2 text-center opacity-75">
            <div className="w-7 h-7 rounded-full bg-[#1a0f08] border border-amber-800 text-amber-400 font-bold text-xs flex items-center justify-center mx-auto">
              5
            </div>
            <h3 className="text-xs font-bold font-serif text-amber-200/70">
              {lang === "zh" ? "5. 国际航空" : "5. Air Express"}
            </h3>
            <p className="text-[10px] text-amber-200/50 font-serif">
              {displayOrder.trackingNumber}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Order Details & Recipient Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Product Information (7 cols) */}
        <div className="md:col-span-7 zen-wood-card p-5 sm:p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold font-serif text-amber-100 border-b border-amber-900/40 pb-2">
            {lang === "zh" ? "定制作品规格与礼遇明细" : "Custom Masterpiece & Inclusions"}
          </h3>

          <div className="flex gap-4 items-center bg-[#0d0603] p-4 rounded-2xl border border-amber-900/40">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-amber-900/60 bg-black/60 flex-shrink-0">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="text-sm font-bold font-serif text-amber-100">
                {lang === "zh" ? currentItem.titleZh : currentItem.title}
              </h4>
              {currentItem.details?.wearerName && (
                <p className="text-xs font-serif text-amber-400">
                  {lang === "zh" ? "专属题名持有人: " : "Wearer: "}
                  {currentItem.details.wearerName}
                </p>
              )}
              {currentItem.details?.beadCount && (
                <p className="text-xs text-amber-200/70 font-serif">
                  {currentItem.details.beadCount} {lang === "zh" ? "颗宫廷京作正统老料" : "Beads Imperial Old Stock"}
                </p>
              )}
              <div className="text-xs font-mono font-bold text-amber-300 pt-1">
                ${currentItem.priceUsd} USD
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#0d0603]/80 rounded-xl border border-amber-900/40 space-y-1 text-xs font-serif text-amber-200/80">
            <div className="flex justify-between text-amber-200/70">
              <span>{lang === "zh" ? "实付金额" : "Amount Paid"}</span>
              <span className="font-mono text-amber-300 font-bold">${displayOrder.totalAmount} USD</span>
            </div>
            <div className="flex justify-between text-amber-200/70">
              <span>{lang === "zh" ? "配送服务" : "Delivery"}</span>
              <span className="text-emerald-400 font-bold">
                {displayOrder.shippingMethod === "express-dhl" ? "DHL Express VIP" : "ZenCraft Air Priority (Free)"}
              </span>
            </div>
            <div className="flex justify-between text-amber-200/70">
              <span>{lang === "zh" ? "国际快递单号" : "Tracking Number"}</span>
              <span className="font-mono text-amber-100">{displayOrder.trackingNumber}</span>
            </div>
          </div>
        </div>

        {/* Right: Shipping Address & Action Buttons (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="zen-wood-card p-5 rounded-3xl space-y-3">
            <h3 className="text-sm font-bold font-serif text-amber-100 border-b border-amber-900/40 pb-2">
              {lang === "zh" ? "收件人信息" : "Shipping Destination"}
            </h3>
            <div className="text-xs font-serif text-amber-200/80 space-y-1 leading-relaxed">
              <p className="font-bold text-amber-100">{displayOrder.shippingAddress.fullName}</p>
              <p>{displayOrder.shippingAddress.addressLine1}</p>
              <p>
                {displayOrder.shippingAddress.city}, {displayOrder.shippingAddress.state} {displayOrder.shippingAddress.postalCode}
              </p>
              <p className="text-amber-300">{displayOrder.shippingAddress.country}</p>
              <p className="text-[11px] text-amber-200/50 pt-1">
                {displayOrder.shippingAddress.email} · {displayOrder.shippingAddress.phone}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handlePrint}
              className="w-full py-2.5 px-4 bg-[#140b06] hover:bg-amber-950/80 border border-amber-500/40 text-amber-300 font-serif font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>{lang === "zh" ? "打印结缘订单凭证" : "Print Order Receipt"}</span>
            </button>

            <Link
              href="/studio"
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-100 font-serif font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>{lang === "zh" ? "返回设计台继续造物" : "Back to Customizer Studio"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
