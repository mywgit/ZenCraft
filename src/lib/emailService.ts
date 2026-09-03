/**
 * ZenCraft Atelier Email Notification Engine
 * Generates bespoke gold-foil HTML emails for:
 * 1. Customer Order Confirmation (结缘确认函 + 1-Click Magic Link)
 * 2. Workshop Manufacturing Blueprint (大城工坊顺时针穿制工单 + 领料单 + 收件地址)
 * 3. International Dispatch Notice (国际航空发货通知 + 顺丰/DHL轨迹)
 */

import { OrderRecord } from "@/types/order";

export function generateOrderConfirmationEmailHtml(order: OrderRecord, origin: string = "http://localhost:3000"): string {
  const item = order.items[0];
  const magicTrackingUrl = `${origin}/order-success?orderId=${order.orderId}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ZenCraft Atelier - Sacred Order Confirmation</title>
  <style>
    body { font-family: 'Cinzel', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, serif; background-color: #0b0604; color: #fdf8eb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #140b06; border: 1px solid #92652b; border-radius: 20px; overflow: hidden; }
    .header { background: linear-gradient(180deg, #2a160b, #140b06); padding: 30px; text-align: center; border-bottom: 1px solid #78350f; }
    .seal { width: 50px; height: 50px; background: linear-gradient(135deg, #b91c1c, #7f1d1d); border: 2px solid #f59e0b; border-radius: 14px; display: inline-flex; align-items: center; justify-content: center; color: #fff; font-size: 24px; font-weight: bold; margin-bottom: 12px; line-height: 50px; }
    .title { color: #fef3c7; font-size: 22px; font-weight: bold; margin: 0; }
    .subtitle { color: #f59e0b; font-size: 13px; margin-top: 6px; letter-spacing: 1px; }
    .content { padding: 30px; }
    .card { background: #0d0603; border: 1px solid #451a03; border-radius: 16px; padding: 20px; margin-bottom: 24px; }
    .order-id { font-family: monospace; font-size: 16px; color: #fde68a; font-weight: bold; }
    .price { font-size: 20px; color: #34d399; font-weight: bold; }
    .button-container { text-align: center; margin: 30px 0; }
    .magic-button { display: inline-block; background: linear-gradient(135deg, #d97706, #b45309); color: #000 !important; font-weight: bold; font-size: 14px; text-decoration: none; padding: 14px 32px; border-radius: 12px; border: 1px solid #fde68a; box-shadow: 0 4px 15px rgba(217, 119, 6, 0.4); }
    .footer { text-align: center; padding: 20px; color: #78350f; font-size: 11px; border-top: 1px solid #271206; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="seal">禅</div>
      <h1 class="title">ZenCraft Atelier · 结缘确认函</h1>
      <p class="subtitle">CERTIFIED BESPOKE SACRED WOOD & HEIRLOOM JEWELRY</p>
    </div>
    
    <div class="content">
      <p>Dear <strong>${order.shippingAddress.fullName}</strong>,</p>
      <p style="color: #d4a373; font-size: 13px; line-height: 1.6;">
        感谢您的结缘！您的工单已正式下达中国红木之乡·河北大城制作工坊。资深木作与珠宝工艺师正在为您精选一手保真老料并手工穿制。
      </p>

      <div class="card">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #271206; padding-bottom: 10px; margin-bottom: 12px;">
          <span style="color: #a8a29e; font-size: 12px;">工单编号 (Order ID):</span>
          <span class="order-id">${order.orderId}</span>
        </div>
        <div style="font-size: 14px; font-weight: bold; color: #fef3c7; margin-bottom: 6px;">
          ${item.titleZh} (${item.title})
        </div>
        <div style="color: #f59e0b; font-size: 12px; margin-bottom: 8px;">
          ✦ 专属烫金证书题名持有人: <strong>${item.details?.wearerName || order.shippingAddress.fullName}</strong>
        </div>
        <div style="color: #d4a373; font-size: 12px; margin-bottom: 12px;">
          ✦ 材质构成: ${item.details?.materialsSummaryZh || "天然老料精选"}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #271206; padding-top: 10px; margin-top: 10px;">
          <span style="color: #a8a29e; font-size: 12px;">结缘实付总额:</span>
          <span class="price">$${order.totalAmount.toFixed(2)} USD</span>
        </div>
      </div>

      <div class="button-container">
        <a href="${magicTrackingUrl}" class="magic-button" target="_blank">
          📦 一键免密查看工坊制作进度与电子证书 ➔
        </a>
      </div>

      <div style="font-size: 12px; color: #a8a29e; line-height: 1.6;">
        <p><strong>随包裹专属礼遇包含：</strong></p>
        <ul style="padding-left: 20px; margin-top: 4px;">
          <li>天然沉香实木珍藏礼盒 (Bespoke Wooden Gift Box)</li>
          <li>大城工坊烫金七脉轮能量防伪证书 (Gold-Foil Certificate)</li>
          <li>进口高弹力水晶穿绳与备用引线配件包</li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <p>ZenCraft Atelier · Certified Dacheng Timber & Healing Gems</p>
      <p>如有任何定制咨询，请随时回复此邮件与工坊掌柜联络。</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateWorkshopWorkOrderEmailHtml(order: OrderRecord, origin: string = "http://localhost:3000"): string {
  const item = order.items[0];
  const adminUrl = `${origin}/admin/orders`;

  const sequenceRows = (item.details?.beadsSequence || [])
    .map((s) => `<li style="margin-bottom: 4px;"><strong>#${s.position}</strong>: ${s.nameZh} (${s.sizeMm}mm)</li>`)
    .join("");

  const materialCountRows = (item.details?.materialCounts || [])
    .map((m) => `<li style="margin-bottom: 4px;">${m.nameZh} (${m.sizeMm}mm) x <strong>${m.count}颗</strong></li>`)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>【工单通知】大城工坊全新穿制工单 #${order.orderId}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #1a110a; color: #fdf8eb; margin: 0; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background: #24160e; border: 2px solid #b45309; border-radius: 16px; padding: 24px; }
    .badge { background: #b45309; color: #000; font-weight: bold; font-size: 12px; padding: 4px 10px; border-radius: 8px; }
    .box { background: #140b06; border: 1px solid #78350f; border-radius: 12px; padding: 16px; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h2>🪵 大城工坊 · 新定制手串生产配货单</h2>
    <p>工单号: <strong style="color: #fde68a; font-family: monospace;">${order.orderId}</strong> | 实付: <strong style="color: #34d399;">$${order.totalAmount} USD</strong></p>

    <div class="box">
      <h3 style="color: #f59e0b; margin-top: 0;">📦 客户收件信息 (国际面单标准)</h3>
      <p style="margin: 4px 0;"><strong>收件人:</strong> ${order.shippingAddress.fullName}</p>
      <p style="margin: 4px 0;"><strong>联系电话:</strong> ${order.shippingAddress.phone || "无"}</p>
      <p style="margin: 4px 0;"><strong>邮箱:</strong> ${order.shippingAddress.email}</p>
      <p style="margin: 4px 0;"><strong>详细地址:</strong> ${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.state || ""} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}</p>
      <p style="margin: 4px 0; color: #fbbf24;"><strong>烫金证书题名姓名:</strong> ${item.details?.wearerName || order.shippingAddress.fullName}</p>
    </div>

    <div class="box">
      <h3 style="color: #f59e0b; margin-top: 0;">📋 物料领料汇总</h3>
      <ul style="padding-left: 20px; color: #fde68a;">
        ${materialCountRows || "<li>按默认 18 颗配方领料</li>"}
      </ul>
    </div>

    <div class="box">
      <h3 style="color: #f59e0b; margin-top: 0;">📿 顺时针穿制工序图谱 (第 1 颗至第 ${item.details?.beadCount || 18} 颗)</h3>
      <ol style="padding-left: 20px; color: #d4a373;">
        ${sequenceRows || "<li>第 1 颗: 纯银莲花佛头三通 ➔ 顺时针穿制</li>"}
      </ol>
    </div>

    <div style="text-align: center; margin-top: 24px;">
      <a href="${adminUrl}" style="background: #f59e0b; color: #000; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none;">
        进入工坊管理后台录入发货单号 ➔
      </a>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateShippingNotificationEmailHtml(order: OrderRecord, origin: string = "http://localhost:3000"): string {
  const item = order.items[0];
  const magicTrackingUrl = `${origin}/order-success?orderId=${order.orderId}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ZenCraft Atelier - Your Mala Has Dispatched</title>
  <style>
    body { font-family: 'Cinzel', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, serif; background-color: #0b0604; color: #fdf8eb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #140b06; border: 1px solid #92652b; border-radius: 20px; overflow: hidden; }
    .header { background: linear-gradient(180deg, #1e3a29, #140b06); padding: 30px; text-align: center; border-bottom: 1px solid #065f46; }
    .seal { width: 50px; height: 50px; background: linear-gradient(135deg, #059669, #065f46); border: 2px solid #34d399; border-radius: 14px; display: inline-flex; align-items: center; justify-content: center; color: #fff; font-size: 24px; font-weight: bold; margin-bottom: 12px; line-height: 50px; }
    .title { color: #ecfdf5; font-size: 22px; font-weight: bold; margin: 0; }
    .subtitle { color: #34d399; font-size: 13px; margin-top: 6px; }
    .content { padding: 30px; }
    .card { background: #0d0603; border: 1px solid #451a03; border-radius: 16px; padding: 20px; margin-bottom: 24px; }
    .tracking-code { font-family: monospace; font-size: 18px; color: #34d399; font-weight: bold; }
    .button-container { text-align: center; margin: 30px 0; }
    .magic-button { display: inline-block; background: linear-gradient(135deg, #059669, #047857); color: #fff !important; font-weight: bold; font-size: 14px; text-decoration: none; padding: 14px 32px; border-radius: 12px; border: 1px solid #34d399; box-shadow: 0 4px 15px rgba(5, 150, 105, 0.4); }
    .footer { text-align: center; padding: 20px; color: #78350f; font-size: 11px; border-top: 1px solid #271206; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="seal">✈️</div>
      <h1 class="title">您的手串已由国际航空快递发出</h1>
      <p class="subtitle">YOUR SACRED MALA IS ON ITS WAY TO YOU</p>
    </div>
    
    <div class="content">
      <p>Dear <strong>${order.shippingAddress.fullName}</strong>,</p>
      <p style="color: #d4a373; font-size: 13px; line-height: 1.6;">
        大城工坊已完成选料穿制、烫金证书题名与实木礼盒封装！您的手串现已交付国际航空快递寄出。
      </p>

      <div class="card">
        <div style="margin-bottom: 10px;">
          <span style="color: #a8a29e; font-size: 12px;">国际物流运单号 (Courier Tracking):</span>
          <div class="tracking-code" style="margin-top: 4px;">${order.trackingNumber || "SF9823741829INT"}</div>
        </div>
        <div style="font-size: 13px; color: #fef3c7; margin-bottom: 6px;">
          承运快递: <strong>顺丰国际 / DHL VIP Express</strong>
        </div>
        <div style="font-size: 12px; color: #d4a373;">
          目的地: ${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.country}
        </div>
      </div>

      <div class="button-container">
        <a href="${magicTrackingUrl}" class="magic-button" target="_blank">
          ✈️ 实时追踪物流轨迹与工艺档案 ➔
        </a>
      </div>
    </div>

    <div class="footer">
      <p>ZenCraft Atelier · Certified Direct Dispatch</p>
    </div>
  </div>
</body>
</html>
  `;
}
