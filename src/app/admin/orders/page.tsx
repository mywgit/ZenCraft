"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OrderRecord } from "@/types/order";
import { getOrdersFromStorage, saveOrderToStorage } from "@/lib/orderStorage";
import { useLanguage } from "@/context/LanguageContext";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Printer,
  Copy,
  ExternalLink,
  Search,
  Filter,
  DollarSign,
  ShieldCheck,
  Gift,
  Hammer,
  Eye,
  Send,
} from "lucide-react";

export default function AdminOrdersPage() {
  const { lang } = useLanguage();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [trackingInput, setTrackingInput] = useState("");
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const loaded = getOrdersFromStorage();
    if (loaded.length === 0) {
      // Seed sample orders for initial preview if storage is empty
      const sampleOrders: OrderRecord[] = [
        {
          orderId: "ZC-20260902-8821",
          createdAt: new Date().toISOString(),
          items: [
            {
              id: "item-1",
              title: "Bespoke Dacheng Zen Mala (24 Beads)",
              titleZh: "大城正统老料高定手串 (24 颗精选)",
              category: "custom-mala",
              image: "/products/master-zitan.jpg",
              priceUsd: 146.23,
              quantity: 1,
              details: {
                wearerName: "Mindful Seeker",
                beadCount: 24,
                dominantElement: "wood",
                materialsSummary: "Wild Green Sandalwood & Gold Phoebe with Silver Lotus",
                materialsSummaryZh: "野生绿檀 10mm (12颗) + 百年金丝楠 10mm (10颗) + 925纯银莲花三通 (2颗)",
              },
            },
          ],
          shippingAddress: {
            fullName: "Alexander Vance",
            email: "alexander.vance@gmail.com",
            phone: "+1 (555) 019-2834",
            country: "United States (美国)",
            addressLine1: "742 Evergreen Terrace, Suite 4B",
            city: "Springfield",
            state: "Oregon",
            postalCode: "97477",
          },
          shippingMethod: "standard-free",
          shippingCost: 0,
          discountAmount: 0,
          subtotal: 146.23,
          totalAmount: 146.23,
          paymentMethod: "stripe-card",
          paymentStatus: "paid",
          productionStatus: "crafting",
          estimatedDelivery: "Sep 10, 2026",
          trackingNumber: "SF9823741829INT",
        },
        {
          orderId: "ZC-20260901-4192",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          items: [
            {
              id: "item-2",
              title: "Grade-A Baoshan Persimmon Red Agate Mala",
              titleZh: "保山满肉转运南红玛瑙手串",
              category: "ready-mala",
              image: "/products/master-nanhong.jpg",
              priceUsd: 320.0,
              quantity: 1,
              details: {
                materialsSummary: "Baoshan Persimmon Red Agate 10mm x 19 Beads",
                materialsSummaryZh: "云南保山原矿老坑南红 10mm x 19颗 (满肉微透)",
              },
            },
          ],
          shippingAddress: {
            fullName: "Evelyn Reed",
            email: "evelyn.reed@zenmind.co.uk",
            phone: "+44 7911 123456",
            country: "United Kingdom (英国)",
            addressLine1: "221B Baker Street, Flat 2",
            city: "London",
            state: "Greater London",
            postalCode: "NW1 6XE",
          },
          shippingMethod: "express-dhl",
          shippingCost: 25,
          discountAmount: 15,
          subtotal: 320.0,
          totalAmount: 330.0,
          paymentMethod: "stripe-card",
          paymentStatus: "paid",
          productionStatus: "shipped",
          estimatedDelivery: "Sep 06, 2026",
          trackingNumber: "DHL9482103942GB",
        },
      ];
      setOrders(sampleOrders);
      setSelectedOrder(sampleOrders[0]);
    } else {
      setOrders(loaded);
      setSelectedOrder(loaded[0]);
    }
  }, []);

  const handleUpdateTracking = (orderId: string) => {
    if (!trackingInput.trim()) return;
    const updated = orders.map((o) => {
      if (o.orderId === orderId) {
        return {
          ...o,
          trackingNumber: trackingInput.trim(),
          productionStatus: "shipped" as const,
        };
      }
      return o;
    });
    setOrders(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("zencraft_orders_db", JSON.stringify(updated));
    }
    if (selectedOrder?.orderId === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        trackingNumber: trackingInput.trim(),
        productionStatus: "shipped",
      });
    }
    setTrackingInput("");
    alert("已成功更新物流单号并标记为【已发货】！客户将收到自动推送通知。");
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedOrderId(id);
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  const filteredOrders = orders.filter((o) => {
    const matchStatus = filterStatus === "all" || o.productionStatus === filterStatus;
    const matchQuery =
      o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchQuery;
  });

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* 1. Header & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ZenCraft 大城工坊 · 商户专属履约与发货后台</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif text-amber-100">
            工单履约中心 · 选料配货与国际发货
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/70 font-serif mt-1">
            实时查看客户已付款订单、定制珠子穿制明细、一键导出顺丰/DHL面单地址。
          </p>
        </div>

        {/* Stripe External Link Button */}
        <a
          href="https://dashboard.stripe.com/payments"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-serif font-bold shadow-lg transition-all"
        >
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>前往 Stripe 官方商户结算后台</span>
          <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
        </a>
      </div>

      {/* 2. Top Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="zen-wood-card p-4 rounded-2xl space-y-1">
          <span className="text-[11px] font-serif text-amber-200/60">总收款金额 (USD)</span>
          <p className="text-2xl font-black text-amber-400 font-mono">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="zen-wood-card p-4 rounded-2xl space-y-1">
          <span className="text-[11px] font-serif text-amber-200/60">工单总数</span>
          <p className="text-2xl font-black text-amber-100 font-mono">{orders.length} 笔</p>
        </div>
        <div className="zen-wood-card p-4 rounded-2xl space-y-1">
          <span className="text-[11px] font-serif text-amber-200/60">待配货穿制</span>
          <p className="text-2xl font-black text-amber-300 font-mono">
            {orders.filter((o) => o.productionStatus !== "shipped").length} 笔
          </p>
        </div>
        <div className="zen-wood-card p-4 rounded-2xl space-y-1">
          <span className="text-[11px] font-serif text-amber-200/60">已发货直邮</span>
          <p className="text-2xl font-black text-emerald-400 font-mono">
            {orders.filter((o) => o.productionStatus === "shipped").length} 笔
          </p>
        </div>
      </div>

      {/* 3. Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#120a06] p-3 rounded-2xl border border-amber-900/50">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-amber-200/50 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索订单号 / 客户姓名 / 邮箱..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-serif focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          {[
            { id: "all", label: "全部工单" },
            { id: "crafting", label: "⚙️ 待穿制/制作中" },
            { id: "shipped", label: "✈️ 已发货直邮" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all ${
                filterStatus === tab.id
                  ? "bg-amber-600 text-slate-950 font-black shadow"
                  : "bg-[#0d0603] text-amber-200/70 border border-amber-900/40 hover:text-amber-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Orders Workspace (Left: Order List, Right: Order Detail & Shipping Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Order List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-bold font-serif text-amber-100 border-b border-amber-900/40 pb-2">
            订单列表 ({filteredOrders.length})
          </h2>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {filteredOrders.map((order) => {
              const isSelected = selectedOrder?.orderId === order.orderId;
              const item = order.items[0];

              return (
                <div
                  key={order.orderId}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2.5 ${
                    isSelected
                      ? "bg-amber-950/70 border-amber-400 shadow-xl"
                      : "bg-[#140b06]/90 border-amber-900/40 hover:border-amber-700/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-300">
                      {order.orderId}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-serif font-bold ${
                        order.productionStatus === "shipped"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                          : "bg-amber-950 text-amber-300 border border-amber-500/40"
                      }`}
                    >
                      {order.productionStatus === "shipped" ? "已发货" : "工坊制作中"}
                    </span>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-amber-900/60 bg-black/60 flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold font-serif text-amber-100 truncate">
                        {item.titleZh || item.title}
                      </h4>
                      <p className="text-[11px] text-amber-200/70 font-serif truncate">
                        客户: {order.shippingAddress.fullName} · {order.shippingAddress.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-amber-950/80 text-xs font-serif">
                    <span className="text-amber-200/50 text-[10px]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span className="font-mono font-black text-amber-400 text-sm">
                      ${order.totalAmount} USD
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Detail & Fulfillment Action Panel (7 cols) */}
        {selectedOrder && (
          <div className="lg:col-span-7 zen-wood-card p-6 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
              <div>
                <span className="text-[11px] font-serif text-amber-400">工单详情与发货操作</span>
                <h3 className="text-lg font-bold font-serif text-amber-100">
                  {selectedOrder.orderId}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-[#0d0603] hover:bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>打印配货单</span>
                </button>
              </div>
            </div>

            {/* 1. Bead Recipe & Custom Specification */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-serif text-amber-300 flex items-center gap-1.5">
                <Hammer className="w-3.5 h-3.5" />
                <span>大城工坊选料穿制配方明细：</span>
              </h4>
              <div className="p-4 bg-[#0d0603] rounded-2xl border border-amber-900/60 space-y-2">
                <div className="flex justify-between text-xs font-serif">
                  <span className="text-amber-100 font-bold">
                    {selectedOrder.items[0].titleZh || selectedOrder.items[0].title}
                  </span>
                  <span className="text-amber-400 font-mono font-bold">
                    ${selectedOrder.items[0].priceUsd} USD
                  </span>
                </div>
                {selectedOrder.items[0].details?.wearerName && (
                  <p className="text-xs font-serif text-amber-300">
                    ✦ 专属烫金证书题名持有人: <span className="font-bold underline">{selectedOrder.items[0].details.wearerName}</span>
                  </p>
                )}
                {selectedOrder.items[0].details?.materialsSummaryZh && (
                  <p className="text-xs text-amber-200/80 font-serif leading-relaxed">
                    ✦ 珠体构成: {selectedOrder.items[0].details.materialsSummaryZh}
                  </p>
                )}
                <p className="text-[11px] text-amber-200/60 font-serif">
                  ✦ 随包裹装配: 天然沉香实木礼盒 + 烫金七脉轮防伪证书 + 备用高弹力穿线包
                </p>
              </div>
            </div>

            {/* 2. Customer Shipping Destination (One-Click Copy for Courier) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold font-serif text-amber-300 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>国际收件人地址（顺丰/DHL面单信息）：</span>
                </h4>
                <button
                  onClick={() => {
                    const addr = `${selectedOrder.shippingAddress.fullName}\n${selectedOrder.shippingAddress.phone}\n${selectedOrder.shippingAddress.addressLine1}\n${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state} ${selectedOrder.shippingAddress.postalCode}\n${selectedOrder.shippingAddress.country}`;
                    copyToClipboard(addr, selectedOrder.orderId);
                  }}
                  className="text-xs font-serif text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedOrderId === selectedOrder.orderId ? "已复制到剪贴板！" : "一键复制面单格式"}</span>
                </button>
              </div>

              <div className="p-4 bg-[#0d0603] rounded-2xl border border-amber-900/60 text-xs font-serif text-amber-200/90 space-y-1 leading-relaxed">
                <p className="text-amber-100 font-bold text-sm">{selectedOrder.shippingAddress.fullName}</p>
                <p>电话: {selectedOrder.shippingAddress.phone}</p>
                <p>邮箱: {selectedOrder.shippingAddress.email}</p>
                <p>地址: {selectedOrder.shippingAddress.addressLine1}</p>
                <p>城市/省州: {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}</p>
                <p className="text-amber-400 font-bold">国家/地区: {selectedOrder.shippingAddress.country}</p>
              </div>
            </div>

            {/* 3. Dispatch & Tracking Number Input */}
            <div className="space-y-3 pt-2 border-t border-amber-900/40">
              <h4 className="text-xs font-bold font-serif text-amber-300 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>录入国际运单号 · 更新发货状态</span>
              </h4>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder={`当前单号: ${selectedOrder.trackingNumber || "输入顺丰/DHL单号"}`}
                  className="flex-1 px-3.5 py-2 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-mono focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => handleUpdateTracking(selectedOrder.orderId)}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-serif font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap"
                >
                  确认发货
                </button>
              </div>

              <p className="text-[10px] text-amber-200/50 font-serif">
                提示：点击确认发货后，系统会将订单标记为【已发货】，客户访问流水线追踪页时将看到最新的物流追踪号。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
