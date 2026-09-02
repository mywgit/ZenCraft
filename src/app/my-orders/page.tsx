"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OrderRecord, BeadSequenceItem, MaterialCountItem } from "@/types/order";
import { getOrdersFromStorage } from "@/lib/orderStorage";
import { useLanguage } from "@/context/LanguageContext";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Printer,
  Search,
  ExternalLink,
  ShieldCheck,
  Gift,
  Hammer,
  Sparkles,
  ArrowRight,
  Layers,
  ChevronRight,
  Mail,
  Send,
  Check,
  HelpCircle,
} from "lucide-react";

export default function MyOrdersPage() {
  const { lang } = useLanguage();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [searchEmailOrId, setSearchEmailOrId] = useState("");
  const [matchingOrders, setMatchingOrders] = useState<OrderRecord[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  useEffect(() => {
    const loaded = getOrdersFromStorage();
    setOrders(loaded);
    if (loaded.length > 0) {
      setMatchingOrders(loaded);
      setSelectedOrder(loaded[0]);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const q = searchEmailOrId.trim().toLowerCase();

    if (!q) {
      setMatchingOrders(orders);
      setSelectedOrder(orders[0] || null);
      return;
    }

    const matched = orders.filter(
      (o) =>
        o.orderId.toLowerCase().includes(q) ||
        o.shippingAddress.email.toLowerCase().includes(q) ||
        o.trackingNumber.toLowerCase().includes(q) ||
        o.shippingAddress.fullName.toLowerCase().includes(q)
    );

    setMatchingOrders(matched);
    setSelectedOrder(matched[0] || null);
  };

  const handleSendMagicLink = async () => {
    if (!selectedOrder) return;
    setMagicLinkSent(true);
    try {
      await fetch("/api/email/order-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order-confirmation",
          order: selectedOrder,
        }),
      });
    } catch (e) {
      console.warn("Magic link trigger:", e);
    }
    setTimeout(() => setMagicLinkSent(false), 4000);
  };

  const getStatusText = (status: OrderRecord["productionStatus"]) => {
    switch (status) {
      case "confirmed":
        return lang === "zh" ? "工坊已接单" : "Order Confirmed";
      case "crafting":
        return lang === "zh" ? "大城老师傅选料穿制中" : "Hand-stringing in Atelier";
      case "certificate-stamping":
        return lang === "zh" ? "烫金能量证书题名盖印中" : "Gold-foil Inscription & Blessing";
      case "packaged":
        return lang === "zh" ? "实木礼盒密封封装" : "Wooden Gift Box Sealed";
      case "shipped":
        return lang === "zh" ? "国际航空快递直邮中" : "International Air Courier in Transit";
      default:
        return lang === "zh" ? "工坊制作中" : "In Production";
    }
  };

  const getProgressPercent = (status: OrderRecord["productionStatus"]) => {
    switch (status) {
      case "confirmed":
        return 20;
      case "crafting":
        return 45;
      case "certificate-stamping":
        return 70;
      case "packaged":
        return 85;
      case "shipped":
        return 100;
      default:
        return 40;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold shadow">
          <Mail className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === "zh" ? "ZenCraft 东方手作 · 免密邮箱快速查单" : "ZenCraft Atelier · 1-Click Email Order Lookup"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100 tracking-tight">
          {lang === "zh" ? "我的结缘手串 · 工艺与物流追踪" : "Track My Custom Mala"}
        </h1>

        <p className="text-xs sm:text-sm text-amber-200/70 font-serif max-w-xl mx-auto leading-relaxed">
          {lang === "zh"
            ? "无需繁琐注册与记忆密码！只需输入您的【结缘邮箱】或【工单号】，即可一键调取名下所有手串的大城工坊制作动态与顺丰/DHL运单。"
            : "No registration or password needed. Simply enter your checkout email or Order ID to view real-time atelier craftsmanship and global tracking."}
        </p>
      </div>

      {/* 2. Email-First Search Box */}
      <form
        onSubmit={handleSearch}
        className="max-w-2xl mx-auto bg-[#140b06] p-2.5 sm:p-3 rounded-2xl border border-amber-500/40 shadow-2xl flex flex-col sm:flex-row gap-2.5 items-center"
      >
        <div className="relative flex-1 w-full">
          <Mail className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchEmailOrId}
            onChange={(e) => setSearchEmailOrId(e.target.value)}
            placeholder={
              lang === "zh"
                ? "输入您的结缘邮箱 (如 jax20000314@gmail.com) 或 工单号..."
                : "Enter your checkout email (e.g. name@example.com) or Order ID..."
            }
            className="w-full pl-10 pr-3 py-2 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-serif focus:outline-none focus:border-amber-400"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-serif font-bold text-xs rounded-xl shadow transition-all whitespace-nowrap"
        >
          {lang === "zh" ? "一键查单" : "Lookup Orders"}
        </button>
      </form>

      {/* 3. Matching Orders Selector (If multiple orders found for this email) */}
      {matchingOrders.length > 1 && (
        <div className="space-y-2">
          <span className="text-xs font-serif text-amber-300">
            {lang === "zh" ? `找到此邮箱下的 ${matchingOrders.length} 笔手串工单 (点击切换查看)：` : `Found ${matchingOrders.length} orders for this email:`}
          </span>
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {matchingOrders.map((order) => (
              <button
                key={order.orderId}
                onClick={() => setSelectedOrder(order)}
                className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold border transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedOrder?.orderId === order.orderId
                    ? "bg-amber-600 text-slate-950 border-amber-400 shadow-md"
                    : "bg-[#140b06] text-amber-200/70 border-amber-900/40 hover:text-amber-100"
                }`}
              >
                <span>{order.orderId}</span>
                <span className="text-[10px] font-mono">(${order.totalAmount})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Active Order Detail Card */}
      {selectedOrder ? (
        <div className="zen-wood-card p-6 sm:p-8 rounded-3xl space-y-8 animate-fadeIn border-amber-500/50 shadow-2xl">
          {/* Order Header & Magic Link Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/50 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-[11px] font-serif">
                <span>{lang === "zh" ? "工单状态" : "Order Status"}</span>
                <span>•</span>
                <span>{selectedOrder.shippingAddress.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-100">
                  {selectedOrder.orderId}
                </h2>
                {selectedOrder.paymentStatus === "paid" ? (
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    {lang === "zh" ? "已结缘付款 (Paid)" : "Paid"}
                  </span>
                ) : (
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-500/40 animate-pulse">
                    {lang === "zh" ? "待完成付款 (Pending Payment)" : "Pending Payment"}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedOrder.paymentStatus === "pending" && selectedOrder.stripeCheckoutUrl && (
                <a
                  href={selectedOrder.stripeCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 text-slate-950 font-serif font-black text-xs flex items-center gap-1.5 shadow"
                >
                  <span>{lang === "zh" ? "前往 Stripe 完成付款 ➔" : "Complete Payment on Stripe ➔"}</span>
                </a>
              )}

              {selectedOrder.paymentStatus === "paid" && (
                <>
                  <button
                    onClick={handleSendMagicLink}
                    disabled={magicLinkSent}
                    className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-xs font-serif font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>{magicLinkSent ? (lang === "zh" ? "✓ 邮件已发送！" : "✓ Email Dispatched!") : (lang === "zh" ? "重发凭证到邮箱" : "Resend to Email")}</span>
                  </button>

                  <Link
                    href={`/order-success?orderId=${selectedOrder.orderId}`}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 text-slate-950 font-serif font-black text-xs flex items-center gap-1.5 shadow"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === "zh" ? "查看烫金防伪证书" : "View Certificate"}</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* 5-Stage Live Craftsmanship Timeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-serif text-amber-300 flex items-center gap-1.5">
                <Hammer className="w-4 h-4 text-amber-400" />
                <span>{lang === "zh" ? "大城红木工坊制作流水线实时动态" : "Atelier Production & Courier Dispatch Progress"}</span>
              </h3>
              <span className="text-xs font-bold text-amber-400 font-serif">
                {getStatusText(selectedOrder.productionStatus)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-[#0d0603] rounded-full overflow-hidden border border-amber-900/50 relative">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-400 rounded-full transition-all duration-700 shadow-md shadow-amber-500/50"
                style={{ width: `${getProgressPercent(selectedOrder.productionStatus)}%` }}
              />
            </div>

            {/* Timeline Steps Icons */}
            <div className="grid grid-cols-5 gap-2 text-center pt-2">
              {[
                { step: "1", titleZh: "结缘确认", titleEn: "Confirmed" },
                { step: "2", titleZh: "选料穿制", titleEn: "Handcrafting" },
                { step: "3", titleZh: "烫金证书", titleEn: "Certificate" },
                { step: "4", titleZh: "实木礼盒", titleEn: "Box Sealed" },
                { step: "5", titleZh: "国际空运", titleEn: "Air Dispatch" },
              ].map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div
                    className={`w-6 h-6 mx-auto rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${
                      idx * 20 < getProgressPercent(selectedOrder.productionStatus)
                        ? "bg-amber-500 text-slate-950"
                        : "bg-[#0d0603] text-amber-200/40 border border-amber-900/40"
                    }`}
                  >
                    {idx * 20 < getProgressPercent(selectedOrder.productionStatus) ? "✓" : s.step}
                  </div>
                  <p className="text-[10px] font-serif text-amber-200/70 truncate">
                    {lang === "zh" ? s.titleZh : s.titleEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Product & Inscription Summary */}
          <div className="p-5 bg-[#0d0603] rounded-2xl border border-amber-900/60 space-y-4">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-amber-800/60 bg-black/60 flex-shrink-0">
                <img
                  src={selectedOrder.items[0].image}
                  alt={selectedOrder.items[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold font-serif text-amber-100">
                  {lang === "zh" ? selectedOrder.items[0].titleZh : selectedOrder.items[0].title}
                </h4>
                <p className="text-xs text-amber-300 font-serif mt-0.5">
                  ✦ {lang === "zh" ? "专属题名持有人" : "Wearer Inscription"}:{" "}
                  <span className="font-bold underline text-amber-100">
                    {selectedOrder.items[0].details?.wearerName || selectedOrder.shippingAddress.fullName}
                  </span>
                </p>
                <p className="text-[11px] text-amber-200/70 font-serif truncate mt-0.5">
                  ✦ {lang === "zh" ? "珠体搭配" : "Materials"}: {selectedOrder.items[0].details?.materialsSummaryZh || "大城正统老料与纯银三通"}
                </p>
              </div>
            </div>

            {/* Courier Dispatch Card */}
            <div className="pt-3 border-t border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-serif">
              <div className="flex items-center gap-2 text-amber-200/80">
                <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  {lang === "zh" ? "国际物流单号" : "Courier Tracking"}:{" "}
                  <span className="font-mono text-amber-300 font-bold">
                    {selectedOrder.trackingNumber || "顺丰国际 / DHL 揽收中..."}
                  </span>
                </span>
              </div>

              <div className="text-amber-200/60 text-[11px]">
                {lang === "zh" ? "目的地" : "Destination"}: {selectedOrder.shippingAddress.country} ({selectedOrder.shippingAddress.city})
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="zen-wood-card p-12 rounded-3xl text-center space-y-3 text-amber-200/60">
          <Package className="w-12 h-12 text-amber-500/40 mx-auto" />
          <h3 className="text-base font-serif font-bold text-amber-100">
            {lang === "zh" ? "未查询到对应工单" : "No Orders Found"}
          </h3>
          <p className="text-xs font-serif max-w-sm mx-auto">
            {lang === "zh"
              ? "请检查您的邮箱地址是否与结账时填写的一致。"
              : "Please make sure you entered the same email address used during checkout."}
          </p>
        </div>
      ) : null}
    </div>
  );
}
