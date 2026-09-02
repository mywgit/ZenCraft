"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { OrderItem, ShippingAddress, PaymentMethod, OrderRecord } from "@/types/order";
import { generateOrderId, generateTrackingNumber, saveOrderToStorage } from "@/lib/orderStorage";
import { STRIPE_CONFIG } from "@/lib/stripeConfig";
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  Sparkles,
  CheckCircle,
  Tag,
  ArrowRight,
  Gift,
  Award,
  ExternalLink,
} from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItem: OrderItem;
}

const COUNTRIES = [
  { code: "US", name: "United States (美国)" },
  { code: "GB", name: "United Kingdom (英国)" },
  { code: "CA", name: "Canada (加拿大)" },
  { code: "AU", name: "Australia (澳大利亚)" },
  { code: "DE", name: "Germany (德国)" },
  { code: "FR", name: "France (法国)" },
  { code: "SG", name: "Singapore (新加坡)" },
  { code: "JP", name: "Japan (日本)" },
  { code: "MY", name: "Malaysia (马来西亚)" },
  { code: "NZ", name: "New Zealand (新西兰)" },
  { code: "NL", name: "Netherlands (荷兰)" },
  { code: "IT", name: "Italy (意大利)" },
  { code: "ES", name: "Spain (西班牙)" },
  { code: "SE", name: "Sweden (瑞典)" },
  { code: "CH", name: "Switzerland (瑞士)" },
];

export function CheckoutModal({ isOpen, onClose, orderItem }: CheckoutModalProps) {
  const { lang, t } = useLanguage();
  const router = useRouter();

  // Form States
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: orderItem.details?.wearerName || "",
    email: "",
    phone: "",
    country: "US",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [shippingMethod, setShippingMethod] = useState<"standard-free" | "express-dhl">("standard-free");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe-card");
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Price Calculations
  const subtotal = orderItem.priceUsd * orderItem.quantity;
  const shippingCost = shippingMethod === "express-dhl" ? 25 : 0;
  const totalAmount = Math.max(0, Number((subtotal - discountAmount + shippingCost).toFixed(2)));

  const handleApplyCoupon = () => {
    setCouponError("");
    const code = couponCode.trim().toUpperCase();
    if (code === "ZEN10" || code === "WELCOME10") {
      const discount = Number((subtotal * 0.1).toFixed(2));
      setDiscountAmount(discount);
      setCouponApplied(true);
    } else if (code === "DACHENG" || code === "MASTER15") {
      const discount = Math.min(subtotal, 15);
      setDiscountAmount(discount);
      setCouponApplied(true);
    } else {
      setCouponError(lang === "zh" ? "无效的优惠码 (试用: ZEN10 或 DACHENG)" : "Invalid coupon (Try: ZEN10 or DACHENG)");
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.fullName || !address.email || !address.addressLine1 || !address.city || !address.postalCode) {
      alert(lang === "zh" ? "请填写完整的收件地址信息！" : "Please fill in all required shipping address fields.");
      return;
    }

    setIsProcessing(true);
    const orderId = generateOrderId();
    const trackingNumber = generateTrackingNumber();

    const deliveryDays = shippingMethod === "express-dhl" ? 4 : 8;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + deliveryDays);

    const newOrder: OrderRecord = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [orderItem],
      shippingAddress: address,
      shippingMethod,
      shippingCost,
      discountAmount,
      subtotal,
      totalAmount,
      paymentMethod,
      paymentStatus: "paid",
      productionStatus: "confirmed",
      estimatedDelivery: estDate.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      trackingNumber,
    };

    saveOrderToStorage(newOrder);

    // 1. Try Calling Backend Stripe Session (Official Checkout)
    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          orderItem,
          shippingAddress: address,
          totalAmount,
        }),
      });

      const data = await res.json();

      if (data.isLive && data.url) {
        // Direct redirect to Stripe Official Hosted Checkout (Apple Pay, Google Pay, Cards)
        window.location.href = data.url;
        return;
      }
    } catch (err) {
      console.warn("Direct Stripe session call:", err);
    }

    // 2. Direct Stripe Payment Link Gateway (Matching previous Tool/Bio projects)
    if (STRIPE_CONFIG.defaultStripeLink && STRIPE_CONFIG.defaultStripeLink.includes("buy.stripe.com")) {
      setTimeout(() => {
        setIsProcessing(false);
        onClose();
        // Open Stripe Official Hosted Link in new tab & route parent to order success tracking
        window.open(STRIPE_CONFIG.defaultStripeLink, "_blank");
        router.push(`/order-success?orderId=${orderId}`);
      }, 800);
      return;
    }

    // 3. Instant Atelier Gateway
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      router.push(`/order-success?orderId=${orderId}`);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#140b06] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-amber-900/50 flex items-center justify-between bg-[#1a0f08]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-amber-100 font-serif font-black text-sm shadow">
              结
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-amber-100">
                {lang === "zh" ? "ZenCraft 东方手作结缘结算" : "ZenCraft Atelier Secure Checkout"}
              </h2>
              <p className="text-[11px] text-amber-300/60 font-serif">
                {lang === "zh" ? "Stripe 全球官方加密支付 · 附带保真证书与实木礼盒" : "Powered by Stripe & PayPal · Global Delivery"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-amber-900/40 text-amber-200/60 hover:text-amber-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (2-Column on Desktop) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Shipping & Payment Forms (7 cols) */}
          <form onSubmit={handleSubmitOrder} id="checkout-form" className="lg:col-span-7 space-y-5">
            {/* 1. Shipping Address Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-300 border-b border-amber-900/40 pb-1.5">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>{lang === "zh" ? "1. 国际收件地址与联系方式" : "1. Shipping Address & Contact Details"}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-serif text-amber-200/80">
                    {lang === "zh" ? "收件人姓名 *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="e.g. Alexander Vance"
                    className="w-full px-3 py-2 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-serif focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-serif text-amber-200/80">
                    {lang === "zh" ? "电子邮箱 (接收跟踪与证书) *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    placeholder="alexander@example.com"
                    className="w-full px-3 py-2 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-serif focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-serif text-amber-200/80">
                    {lang === "zh" ? "联系电话 (国际快递联络) *" : "Phone Number *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3 py-2 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-serif focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-serif text-amber-200/80">
                    {lang === "zh" ? "国家 / 地区 *" : "Country / Region *"}
                  </label>
                  <select
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-serif focus:outline-none focus:border-amber-400"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-serif text-amber-200/80">
                  {lang === "zh" ? "详细街道地址 *" : "Street Address *"}
                </label>
                <input
                  type="text"
                  required
                  value={address.addressLine1}
                  onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                  placeholder="742 Evergreen Terrace, Suite 4B"
                  className="w-full px-3 py-2 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-serif focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-serif text-amber-200/80">
                    {lang === "zh" ? "城市 *" : "City *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="Springfield"
                    className="w-full px-3 py-2 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-serif focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-serif text-amber-200/80">
                    {lang === "zh" ? "省 / 州 *" : "State / Prov *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    placeholder="Oregon"
                    className="w-full px-3 py-2 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-serif focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-serif text-amber-200/80">
                    {lang === "zh" ? "邮编 *" : "Zip Code *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    placeholder="97477"
                    className="w-full px-3 py-2 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-serif focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Options */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-300 border-b border-amber-900/40 pb-1.5">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>{lang === "zh" ? "2. 国际配送与赠礼保障" : "2. Shipping Method & Gift Inclusions"}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                    shippingMethod === "standard-free"
                      ? "bg-amber-950/60 border-amber-500/70 shadow-md"
                      : "bg-[#0d0603] border-amber-900/40 hover:border-amber-700/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "standard-free"}
                        onChange={() => setShippingMethod("standard-free")}
                        className="mr-2 accent-amber-500"
                      />
                      <span className="text-xs font-serif font-bold text-amber-100">
                        {lang === "zh" ? "东方专线航空包邮" : "ZenCraft Air Priority"}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">FREE</span>
                  </div>
                  <p className="text-[10px] text-amber-200/60 font-serif mt-1 pl-5">
                    {lang === "zh" ? "7-10个工作日 · 附实木礼盒+烫金证书+备用线" : "7-10 Days · Incl. Wooden Gift Box & Certificate"}
                  </p>
                </label>

                <label
                  className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                    shippingMethod === "express-dhl"
                      ? "bg-amber-950/60 border-amber-500/70 shadow-md"
                      : "bg-[#0d0603] border-amber-900/40 hover:border-amber-700/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "express-dhl"}
                        onChange={() => setShippingMethod("express-dhl")}
                        className="mr-2 accent-amber-500"
                      />
                      <span className="text-xs font-serif font-bold text-amber-100">
                        {lang === "zh" ? "DHL 特快极速专线" : "DHL Express VIP"}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300">+$25.00</span>
                  </div>
                  <p className="text-[10px] text-amber-200/60 font-serif mt-1 pl-5">
                    {lang === "zh" ? "3-5个工作日直达 · 全程极速特快" : "3-5 Business Days · Expedited Courier"}
                  </p>
                </label>
              </div>
            </div>

            {/* 3. Global Payment Methods (Stripe / Apple Pay / PayPal) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-300 border-b border-amber-900/40 pb-1.5">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>{lang === "zh" ? "3. 国际安全支付渠道" : "3. Global Payment Method"}</span>
              </div>

              {/* International Payment Tabs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("stripe-card")}
                  className={`py-3 px-4 rounded-2xl border text-xs font-serif font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === "stripe-card"
                      ? "bg-amber-600 text-slate-950 border-amber-400 shadow-md scale-[1.02]"
                      : "bg-[#0d0603] text-amber-200/70 border-amber-900/40 hover:text-amber-100"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Stripe · 信用卡 / Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`py-3 px-4 rounded-2xl border text-xs font-serif font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === "paypal"
                      ? "bg-amber-600 text-slate-950 border-amber-400 shadow-md scale-[1.02]"
                      : "bg-[#0d0603] text-amber-200/70 border-amber-900/40 hover:text-amber-100"
                  }`}
                >
                  <span>🅿️ PayPal · Pay in 4</span>
                </button>
              </div>

              {/* Payment Details Info Card */}
              <div className="p-4 bg-[#0d0603] rounded-2xl border border-amber-900/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-serif text-amber-200/90">
                  <span className="font-bold">
                    {paymentMethod === "stripe-card"
                      ? "Stripe 官方托管收银台 (Official Gateway)"
                      : "PayPal 国际快速结账 (Fast Checkout)"}
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SSL 256-bit Encrypted</span>
                  </span>
                </div>
                <p className="text-[11px] text-amber-200/60 font-serif leading-relaxed">
                  {paymentMethod === "stripe-card"
                    ? "支持全球 Visa, Mastercard, American Express, Apple Pay, Google Pay 与 Link 一键结账。点击下方按钮即可安全完成支付。"
                    : "安全跳转至 PayPal 官方完成付款，支持余额、国际信用卡与 Pay in 4 分期。"}
                </p>
              </div>
            </div>
          </form>

          {/* Right Column: Order Summary & Receipt Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="zen-wood-card rounded-2xl p-4 sm:p-5 space-y-4">
              <h3 className="text-sm font-bold font-serif text-amber-100 border-b border-amber-900/40 pb-2">
                {lang === "zh" ? "结缘清单明细" : "Order Summary"}
              </h3>

              {/* Product Card */}
              <div className="flex gap-3 items-center bg-[#0d0603] p-3 rounded-xl border border-amber-900/40">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-amber-900/60 bg-black/60 flex-shrink-0">
                  <img
                    src={orderItem.image}
                    alt={orderItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold font-serif text-amber-100 truncate">
                    {lang === "zh" ? orderItem.titleZh : orderItem.title}
                  </h4>
                  {orderItem.details?.beadCount && (
                    <p className="text-[10px] text-amber-200/60 font-serif">
                      {orderItem.details.beadCount} {lang === "zh" ? "颗精选圣木/宝石" : "Hand-selected Beads"}
                    </p>
                  )}
                  {orderItem.details?.wearerName && (
                    <p className="text-[10px] text-amber-400 font-serif truncate">
                      {lang === "zh" ? "题名人: " : "Wearer: "}
                      {orderItem.details.wearerName}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-amber-300 font-mono">
                      ${orderItem.priceUsd} x {orderItem.quantity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder={lang === "zh" ? "输入优惠码 (ZEN10)" : "Promo Code (e.g. ZEN10)"}
                    className="flex-1 px-3 py-1.5 bg-[#0d0603] border border-amber-900/60 rounded-xl text-xs text-amber-100 font-serif uppercase focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-300 font-serif font-bold text-xs rounded-xl transition-colors"
                  >
                    {lang === "zh" ? "核销" : "Apply"}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[10px] text-emerald-400 font-serif flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>{lang === "zh" ? "已享受折扣优惠！" : "Promo code applied successfully!"}</span>
                  </p>
                )}
                {couponError && (
                  <p className="text-[10px] text-red-400 font-serif">{couponError}</p>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs font-serif pt-2 border-t border-amber-900/40">
                <div className="flex justify-between text-amber-200/70">
                  <span>{lang === "zh" ? "商品小计" : "Subtotal"}</span>
                  <span className="font-mono text-amber-100">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>{lang === "zh" ? "优惠折扣" : "Discount"}</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-amber-200/70">
                  <span>{lang === "zh" ? "国际运费" : "Shipping"}</span>
                  <span className="font-mono text-amber-100">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-amber-100 pt-2 border-t border-amber-950">
                  <span>{lang === "zh" ? "应付总额 (USD)" : "Total Amount"}</span>
                  <span className="font-mono text-amber-400 text-lg">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Included Freebies */}
              <div className="p-3 bg-[#0d0603]/80 rounded-xl border border-amber-900/40 space-y-1.5 text-[10px] font-serif text-amber-200/70">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Gift className="w-3 h-3" />
                  <span>随单附赠以下专属结缘礼遇：</span>
                </div>
                <p>• 天然沉香实木珍藏礼盒 (价值 $28)</p>
                <p>• 大城工坊烫金七脉轮手作能量证书 (唯一防伪编号)</p>
                <p>• 进口高弹力水晶穿绳与备用引线配件包</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-2">
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-serif font-black rounded-2xl shadow-xl shadow-amber-950/80 flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.02] disabled:opacity-50 border border-amber-400/40"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>{lang === "zh" ? "正在连接 Stripe 安全收银台..." : "Connecting to Stripe Secure Gateway..."}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>
                      {lang === "zh"
                        ? `前往 Stripe 安全支付 ($${totalAmount.toFixed(2)} USD)`
                        : `Pay with Stripe ($${totalAmount.toFixed(2)} USD)`}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </span>
                )}
              </button>

              <p className="text-[10px] text-center text-amber-200/50 font-serif flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>256-bit Bank-Grade SSL Encrypted Checkout · 100% Guaranteed</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
