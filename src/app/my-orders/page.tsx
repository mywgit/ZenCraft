"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OrderRecord, BeadSequenceItem } from "@/types/order";
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
  MessageCircle,
} from "lucide-react";

export default function MyOrdersPage() {
  const { lang } = useLanguage();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<OrderRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loaded = getOrdersFromStorage();
    setOrders(loaded);
    if (loaded.length > 0) {
      setSearchedOrder(loaded[0]);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchedOrder(orders[0] || null);
      return;
    }

    const found = orders.find(
      (o) =>
        o.orderId.toLowerCase() === q ||
        o.shippingAddress.email.toLowerCase() === q ||
        o.trackingNumber.toLowerCase() === q
    );

    setSearchedOrder(found || null);
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
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === "zh" ? "ZenCraft 东方手作 · 客户结缘工单查询中心" : "ZenCraft Atelier · Order & Craftsmanship Tracker"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100 tracking-tight">
          {lang === "zh" ? "我的手串工单 · 物流实时追踪" : "Track My Mala & Dispatch"}
        </h1>

        <p className="text-xs sm:text-sm text-amber-200/70 font-serif max-w-xl mx-auto leading-relaxed">
          {lang === "zh"
            ? "输入您的工单编号 (如 ZC-20260902-XXXX) 或结缘邮箱，实时查看大城工坊选料穿制进度、烫金证书题名与国际顺丰/DHL空运动态。"
            : "Enter your Order ID (e.g. ZC-20260902-XXXX) or email to check your custom bead crafting status and global courier dispatch."}
        </p>
      </div>

      {/* 2. Order Search Box */}
      <form
        onSubmit={handleSearch}
        className="max-w-2xl mx-auto bg-[#140b06] p-2.5 sm:p-3 rounded-2xl border border-amber-500/40 shadow-2xl flex flex-col sm:flex-row gap-2.5 items-center"
      >
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === "zh"
                ? "输入工单号 (如 ZC-20260902-XXXX) 或 邮箱 / 运单号..."
                : "Enter Order ID (e.g. ZC-20260902-XXXX) or Email..."
            }
            className="w-full pl-10 pr-3 py-2 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-mono focus:outline-none focus:border-amber-400"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-serif font-bold text-xs rounded-xl shadow transition-all whitespace-nowrap"
        >
          {lang === "zh" ? "查询工单" : "Track Order"}
        </button>
      </form>

      {/* 3. Searched Order Details */}
      {searchedOrder ? (
        <div className="zen-wood-card p-6 sm:p-8 rounded-3xl space-y-8 animate-fadeIn border-amber-500/50 shadow-2xl">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/50 pb-5">
            <div className="space-y-1">
              <span className="text-[11px] font-serif text-amber-400">
                {lang === "zh" ? "当前查询工单编号" : "Order Identification"}
              </span>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-100">
                  {searchedOrder.orderId}
                </h2>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  {lang === "zh" ? "已结缘付款" : "Paid"}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <p className="text-xs font-serif text-amber-200/60">
                {lang === "zh" ? "下单时间" : "Order Date"}: {new Date(searchedOrder.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm font-mono font-bold text-amber-300">
                {lang === "zh" ? "实付总额" : "Total"}: ${searchedOrder.totalAmount} USD
              </p>
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
                {getStatusText(searchedOrder.productionStatus)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-[#0d0603] rounded-full overflow-hidden border border-amber-900/50 relative">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-400 rounded-full transition-all duration-700 shadow-md shadow-amber-500/50"
                style={{ width: `${getProgressPercent(searchedOrder.productionStatus)}%` }}
              />
            </div>

            {/* Timeline Steps Icons */}
            <div className="grid grid-cols-5 gap-2 text-center pt-2">
              {[
                { step: "1", titleZh: "订单确认", titleEn: "Confirmed" },
                { step: "2", titleZh: "选料穿制", titleEn: "Handcrafting" },
                { step: "3", titleZh: "烫金证书", titleEn: "Certificate" },
                { step: "4", titleZh: "实木封装", titleEn: "Box Sealed" },
                { step: "5", titleZh: "国际空运", titleEn: "Air Dispatch" },
              ].map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div
                    className={`w-6 h-6 mx-auto rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${
                      idx * 20 < getProgressPercent(searchedOrder.productionStatus)
                        ? "bg-amber-500 text-slate-950"
                        : "bg-[#0d0603] text-amber-200/40 border border-amber-900/40"
                    }`}
                  >
                    {idx * 20 < getProgressPercent(searchedOrder.productionStatus) ? "✓" : s.step}
                  </div>
                  <p className="text-[10px] font-serif text-amber-200/70 truncate">
                    {lang === "zh" ? s.titleZh : s.titleEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Product & Inscription Summary */}
          <div className="p-4 sm:p-5 bg-[#0d0603] rounded-2xl border border-amber-900/60 space-y-3">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-amber-800/60 bg-black/60 flex-shrink-0">
                <img
                  src={searchedOrder.items[0].image}
                  alt={searchedOrder.items[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold font-serif text-amber-100">
                  {lang === "zh" ? searchedOrder.items[0].titleZh : searchedOrder.items[0].title}
                </h4>
                <p className="text-xs text-amber-300 font-serif mt-0.5">
                  ✦ {lang === "zh" ? "专属题名持有人" : "Wearer Inscription"}:{" "}
                  <span className="font-bold underline text-amber-100">
                    {searchedOrder.items[0].details?.wearerName || searchedOrder.shippingAddress.fullName}
                  </span>
                </p>
                <p className="text-[11px] text-amber-200/70 font-serif truncate mt-0.5">
                  ✦ {lang === "zh" ? "珠体搭配" : "Materials"}: {searchedOrder.items[0].details?.materialsSummaryZh || "大城正统老料与纯银三通"}
                </p>
              </div>
            </div>

            {/* Courier Dispatch Card */}
            <div className="pt-3 border-t border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-serif">
              <div className="flex items-center gap-2 text-amber-200/80">
                <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  {lang === "zh" ? "国际物流运单号" : "Courier Tracking"}:{" "}
                  <span className="font-mono text-amber-300 font-bold">
                    {searchedOrder.trackingNumber || "顺丰国际 / DHL 单号生成中..."}
                  </span>
                </span>
              </div>

              <Link
                href={`/order-success?orderId=${searchedOrder.orderId}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-xs font-serif font-bold transition-all self-start sm:self-auto"
              >
                <span>{lang === "zh" ? "查看工坊防伪证书" : "View Digital Certificate"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="zen-wood-card p-12 rounded-3xl text-center space-y-3 text-amber-200/60">
          <Package className="w-12 h-12 text-amber-500/40 mx-auto" />
          <h3 className="text-base font-serif font-bold text-amber-100">
            {lang === "zh" ? "未查询到对应工单" : "No Order Found"}
          </h3>
          <p className="text-xs font-serif max-w-sm mx-auto">
            {lang === "zh"
              ? "请核对您的订单编号 (如 ZC-20260902-XXXX) 或联系客服掌柜为您人工查询。"
              : "Please verify your Order ID format or contact our concierge for assistance."}
          </p>
        </div>
      ) : null}

      {/* 4. Recent Orders List on this Device */}
      {orders.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-amber-900/40">
          <h3 className="text-sm font-bold font-serif text-amber-100 flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-400" />
            <span>{lang === "zh" ? "您在此设备上结缘的历史手串" : "Your Recent Orders"}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                onClick={() => setSearchedOrder(order)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  searchedOrder?.orderId === order.orderId
                    ? "bg-amber-950/80 border-amber-400 shadow-xl"
                    : "bg-[#140b06]/80 border-amber-900/40 hover:border-amber-700/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {order.orderId}
                  </span>
                  <span className="text-[10px] font-serif text-amber-400">
                    {getStatusText(order.productionStatus)}
                  </span>
                </div>
                <h4 className="text-xs font-bold font-serif text-amber-100 truncate">
                  {lang === "zh" ? order.items[0].titleZh : order.items[0].title}
                </h4>
                <div className="flex items-center justify-between pt-1 text-[11px] font-serif text-amber-200/60">
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="font-mono text-amber-400 font-bold">${order.totalAmount} USD</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
