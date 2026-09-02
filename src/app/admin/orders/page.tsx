"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OrderRecord, BeadSequenceItem, MaterialCountItem } from "@/types/order";
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
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  Sparkles,
  Layers,
} from "lucide-react";

export default function AdminOrdersPage() {
  const { lang } = useLanguage();

  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [pinError, setPinError] = useState("");

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [trackingInput, setTrackingInput] = useState("");
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  // Check existing session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("zencraft_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master password / PIN: zencraft888 or 888888
    if (adminPin === "zencraft888" || adminPin === "888888" || adminPin === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("zencraft_admin_auth", "true");
      setPinError("");
    } else {
      setPinError("密钥错误！请检查后重试 (默认密钥: zencraft888)");
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("zencraft_admin_auth");
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const loaded = getOrdersFromStorage();
    if (loaded.length === 0) {
      // Seed rich sample orders with full bead sequence if empty
      const sampleBeadsSeq: BeadSequenceItem[] = [
        { index: 1, materialId: "silver-lotus", nameZh: "925纯银莲花三通", nameEn: "Silver Lotus Guru", sizeMm: 12, color: "#cbd5e1", image: "/beads/silver-lotus.png" },
        { index: 2, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 3, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 4, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 5, materialId: "gold-phoebe", nameZh: "四川百年金丝楠", nameEn: "Gold Phoebe", sizeMm: 10, color: "#b4843b", image: "/beads/gold-phoebe.png" },
        { index: 6, materialId: "gold-phoebe", nameZh: "四川百年金丝楠", nameEn: "Gold Phoebe", sizeMm: 10, color: "#b4843b", image: "/beads/gold-phoebe.png" },
        { index: 7, materialId: "gold-phoebe", nameZh: "四川百年金丝楠", nameEn: "Gold Phoebe", sizeMm: 10, color: "#b4843b", image: "/beads/gold-phoebe.png" },
        { index: 8, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 9, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 10, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 11, materialId: "gold-phoebe", nameZh: "四川百年金丝楠", nameEn: "Gold Phoebe", sizeMm: 10, color: "#b4843b", image: "/beads/gold-phoebe.png" },
        { index: 12, materialId: "gold-phoebe", nameZh: "四川百年金丝楠", nameEn: "Gold Phoebe", sizeMm: 10, color: "#b4843b", image: "/beads/gold-phoebe.png" },
        { index: 13, materialId: "brass-ring", nameZh: "复古黄铜隔片", nameEn: "Brass Ring", sizeMm: 8, color: "#ca8a04", image: "/beads/brass-ring.png" },
        { index: 14, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 15, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 16, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 17, materialId: "gold-phoebe", nameZh: "四川百年金丝楠", nameEn: "Gold Phoebe", sizeMm: 10, color: "#b4843b", image: "/beads/gold-phoebe.png" },
        { index: 18, materialId: "gold-phoebe", nameZh: "四川百年金丝楠", nameEn: "Gold Phoebe", sizeMm: 10, color: "#b4843b", image: "/beads/gold-phoebe.png" },
        { index: 19, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 20, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 21, materialId: "green-sandalwood", nameZh: "天然野生绿檀", nameEn: "Green Sandalwood", sizeMm: 10, color: "#5f6f52", image: "/beads/green-sandalwood.png" },
        { index: 22, materialId: "gold-phoebe", nameZh: "四川百年金丝楠", nameEn: "Gold Phoebe", sizeMm: 10, color: "#b4843b", image: "/beads/gold-phoebe.png" },
        { index: 23, materialId: "gold-phoebe", nameZh: "四川百年金丝楠", nameEn: "Gold Phoebe", sizeMm: 10, color: "#b4843b", image: "/beads/gold-phoebe.png" },
        { index: 24, materialId: "brass-ring", nameZh: "复古黄铜隔片", nameEn: "Brass Ring", sizeMm: 8, color: "#ca8a04", image: "/beads/brass-ring.png" },
      ];

      const sampleCounts: MaterialCountItem[] = [
        { materialId: "green-sandalwood", nameZh: "天然野生老料绿檀", nameEn: "Green Sandalwood", count: 12, sizeMm: 10, image: "/beads/green-sandalwood.png" },
        { materialId: "gold-phoebe", nameZh: "四川百年老料金丝楠", nameEn: "Gold Phoebe", count: 9, sizeMm: 10, image: "/beads/gold-phoebe.png" },
        { materialId: "silver-lotus", nameZh: "925纯银浮雕莲花佛头三通", nameEn: "Silver Lotus Guru", count: 1, sizeMm: 12, image: "/beads/silver-lotus.png" },
        { materialId: "brass-ring", nameZh: "复古打磨黄铜隔片", nameEn: "Brass Ring", count: 2, sizeMm: 8, image: "/beads/brass-ring.png" },
      ];

      const sampleOrders: OrderRecord[] = [
        {
          orderId: "ZC-20260902-4267",
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
                materialsSummaryZh: "天然野生老料绿檀 10mm (12颗) + 四川百年金丝楠 10mm (9颗) + 纯银莲花三通 (1颗) + 黄铜隔片 (2颗)",
                beadsSequence: sampleBeadsSeq,
                materialCounts: sampleCounts,
              },
            },
          ],
          shippingAddress: {
            fullName: "Mindful Seeker",
            email: "jax20000314@gmail.com",
            phone: "19931333385",
            country: "United States (美国)",
            addressLine1: "742 Evergreen Terrace",
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
      ];
      setOrders(sampleOrders);
      setSelectedOrder(sampleOrders[0]);
    } else {
      setOrders(loaded);
      setSelectedOrder(loaded[0]);
    }
  }, [isAuthenticated]);

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
    alert("已成功录入国际运单号，订单已标记为【已发货直邮】！");
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

  // 1. Password Lock Gate Screen (If Not Authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#140b06] border border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-fadeIn relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-amber-100 mx-auto shadow-lg shadow-amber-950/60 border border-amber-400/40">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold font-serif text-amber-100">
              ZenCraft 大城工坊 · 商户履约后台
            </h2>
            <p className="text-xs text-amber-200/60 font-serif">
              此区域为工坊商户私密发货工作台，请输入管理员访问密钥进入。
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-serif text-amber-200/80">管理员访问密钥 (PIN):</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="输入管理密钥 (默认: zencraft888)"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
              {pinError && <p className="text-[11px] text-red-400 font-serif pt-1">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-serif font-black rounded-xl text-xs shadow-lg transition-all"
            >
              验证并进入工单后台
            </button>
          </form>

          <p className="text-[10px] text-amber-200/40 font-serif">
            提示：默认管理密钥为 <span className="text-amber-300 font-mono">zencraft888</span>
          </p>
        </div>
      </div>
    );
  }

  // 2. Full Admin Dashboard (When Authenticated)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* 1. Header & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ZenCraft 大城工坊 · 商户专属履约与发货后台 (已认证)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif text-amber-100">
            工单履约中心 · 选料配货与国际发货
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/70 font-serif mt-1">
            查看客户手串具体搭配样式、顺时针穿制工序图谱、物料领料清单与一键导出面单。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://dashboard.stripe.com/payments"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-serif font-bold shadow-lg transition-all"
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Stripe 官方结算</span>
            <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
          </a>

          <button
            onClick={handleAdminLogout}
            className="p-2.5 rounded-xl bg-[#140b06] hover:bg-amber-950/80 border border-amber-900/60 text-amber-200/70 hover:text-amber-100 transition-colors"
            title="锁定并安全退出后台"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
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

      {/* 4. Orders Workspace (Left: Order List, Right: Order Detail & Bead Blueprint Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Order List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-sm font-bold font-serif text-amber-100 border-b border-amber-900/40 pb-2">
            订单列表 ({filteredOrders.length})
          </h2>

          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1">
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
                      {order.productionStatus === "shipped" ? "已发货" : "待选料穿制"}
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

        {/* Order Detail & Bead Blueprint Panel (8 cols) */}
        {selectedOrder && (
          <div className="lg:col-span-8 zen-wood-card p-6 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
              <div>
                <span className="text-[11px] font-serif text-amber-400">大城工坊专属配货图纸与制作工单</span>
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
                  <span>打印配货单与图谱</span>
                </button>
              </div>
            </div>

            {/* 1. Masterpiece Header & Custom Wearer */}
            <div className="p-4 bg-[#0d0603] rounded-2xl border border-amber-900/60 space-y-2">
              <div className="flex justify-between items-center text-xs font-serif">
                <span className="text-amber-100 font-bold text-sm">
                  {selectedOrder.items[0].titleZh || selectedOrder.items[0].title}
                </span>
                <span className="text-amber-400 font-mono font-bold text-sm">
                  ${selectedOrder.items[0].priceUsd} USD
                </span>
              </div>
              {selectedOrder.items[0].details?.wearerName && (
                <p className="text-xs font-serif text-amber-300">
                  ✦ 专属烫金证书题名持有人: <span className="font-bold underline text-amber-100">{selectedOrder.items[0].details.wearerName}</span>
                </p>
              )}
              {selectedOrder.items[0].details?.materialsSummaryZh && (
                <p className="text-xs text-amber-200/80 font-serif leading-relaxed">
                  ✦ 搭配摘要: {selectedOrder.items[0].details.materialsSummaryZh}
                </p>
              )}
            </div>

            {/* 2. Materials Picking Summary (物料领料清单) */}
            {selectedOrder.items[0].details?.materialCounts && selectedOrder.items[0].details.materialCounts.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-serif text-amber-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>物料领料清单 (按材质核对领料)：</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {selectedOrder.items[0].details.materialCounts.map((mat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-[#0d0603] rounded-xl border border-amber-900/50 flex items-center gap-2.5"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-black/80 border border-amber-800/60 flex-shrink-0 p-0.5">
                        <img src={mat.image} alt={mat.nameZh} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold font-serif text-amber-100 truncate">{mat.nameZh}</p>
                        <p className="text-[11px] text-amber-400 font-mono font-bold">{mat.sizeMm}mm x {mat.count}颗</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Clockwise Stringing Sequence Diagram (顺时针具体穿制顺序图谱) */}
            {selectedOrder.items[0].details?.beadsSequence && selectedOrder.items[0].details.beadsSequence.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold font-serif text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>手串具体搭配样式 · 顺时针穿制工序图谱 (第1颗 ➔ 第{selectedOrder.items[0].details.beadsSequence.length}颗)：</span>
                  </h4>
                  <span className="text-[10px] text-amber-200/50 font-serif">按序号依次穿制</span>
                </div>

                <div className="p-3.5 bg-[#0d0603] rounded-2xl border border-amber-900/60 max-h-60 overflow-y-auto pr-1">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {selectedOrder.items[0].details.beadsSequence.map((bead) => (
                      <div
                        key={bead.index}
                        className="p-2 rounded-xl bg-[#140b06] border border-amber-900/40 text-center space-y-1 hover:border-amber-500/50 transition-colors"
                      >
                        <div className="relative w-8 h-8 mx-auto">
                          <img src={bead.image} alt={bead.nameZh} className="w-full h-full object-contain" />
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-slate-950 font-black text-[9px] flex items-center justify-center font-mono">
                            {bead.index}
                          </span>
                        </div>
                        <p className="text-[10px] font-serif text-amber-100 truncate">{bead.nameZh}</p>
                        <p className="text-[9px] text-amber-200/50 font-mono">{bead.sizeMm}mm</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Customer Shipping Destination (One-Click Copy for Courier) */}
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

            {/* 5. Dispatch & Tracking Number Input */}
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
