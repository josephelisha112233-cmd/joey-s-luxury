import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type OrderPayload = {
  customer_name: string; email: string; phone: string; address: string; city: string; state: string;
  notes?: string; payment_method: string; subtotal: number;
  items: { product_id: string; product_name: string; quantity: number; size: string; unit_price: number }[];
};

export async function POST(request: Request) {
  let body: OrderPayload;
  try { body = await request.json() as OrderPayload; } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!body.customer_name || !body.email || !body.phone || !body.address || !body.city || !body.state || !Array.isArray(body.items) || !body.items.length) {
    return NextResponse.json({ error: "Please complete all required fields and add an item to your bag." }, { status: 400 });
  }
  if (!["pay_on_delivery", "bank_transfer", "paystack"].includes(body.payment_method)) return NextResponse.json({ error: "Invalid payment method." }, { status: 400 });

  // Current UI catalogue prices are validated server-side against this demo catalogue.
  // Before launch, switch this lookup to Supabase products + variants and reserve stock atomically.
  const { products } = await import("@/lib/products");
  const verifiedItems = body.items.map((item) => {
    const product = products.find((entry) => entry.id === item.product_id);
    if (!product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20 || !["39","40","41","42","43","44","45","46"].includes(item.size)) return null;
    return { ...item, product_name: product.name, unit_price: product.price };
  });
  if (verifiedItems.some((item) => !item)) return NextResponse.json({ error: "One or more products are unavailable. Refresh your bag and try again." }, { status: 400 });
  const total = verifiedItems.reduce((sum, item) => sum + item!.unit_price * item!.quantity, 0);

  const supabase = createAdminClient();
  if (!supabase) return NextResponse.json({ error: "Orders are not connected yet. Configure Supabase URL, anon key and server-only service role key in .env.local." }, { status: 503 });

  const orderNumber = `JL-${Date.now().toString().slice(-8)}`;
  const { data: order, error } = await supabase.from("orders").insert({
    order_number: orderNumber, customer_name: body.customer_name, email: body.email, phone: body.phone,
    delivery_address: body.address, city: body.city, state: body.state, notes: body.notes || null,
    payment_method: body.payment_method, subtotal: total, total, status: "pending", payment_status: "pending"
  }).select("id, order_number").single();
  if (error || !order) return NextResponse.json({ error: "Unable to save your order. Please contact Joey's Luxury directly." }, { status: 500 });

  const rows = verifiedItems.map((item) => ({
    order_id: order.id, product_id: null, product_name: item!.product_name,
    quantity: item!.quantity, size: item!.size, unit_price: item!.unit_price
  }));
  const { error: itemError } = await supabase.from("order_items").insert(rows);
  if (itemError) {
    await supabase.from("orders").delete().eq("id", order.id);
    return NextResponse.json({ error: "Your order could not be completed. Please try again." }, { status: 500 });
  }

  if (body.payment_method === "paystack") {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) return NextResponse.json({ error: "Paystack is not configured yet. Choose another payment method or contact the store." }, { status: 503 });
    const payment = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST", headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email: body.email, amount: total * 100, reference: order.order_number, callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin}/payment/callback`, metadata: { order_id: order.id, order_number: order.order_number } })
    });
    const result = await payment.json() as { status?: boolean; message?: string; data?: { authorization_url?: string; reference?: string } };
    if (!payment.ok || !result.status || !result.data?.authorization_url) return NextResponse.json({ error: result.message || "Could not start Paystack payment." }, { status: 502 });
    await supabase.from("orders").update({ payment_reference: result.data.reference }).eq("id", order.id);
    return NextResponse.json({ order_number: order.order_number, authorization_url: result.data.authorization_url });
  }
  return NextResponse.json({ order_number: order.order_number, message: body.payment_method === "bank_transfer" ? "Please contact us for bank transfer details." : "Payment is due on delivery." });
}
