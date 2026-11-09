"use client";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { formatNaira } from "@/lib/utils";

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const [method, setMethod] = useState("pay_on_delivery");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) return;
    setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = {
      customer_name: String(form.get("name")),
      email: String(form.get("email")),
      phone: String(form.get("phone")),
      address: String(form.get("address")),
      city: String(form.get("city")),
      state: String(form.get("state")),
      notes: String(form.get("notes") || ""),
      payment_method: method,
      items: items.map((item) => ({ product_id: item.product.id, product_name: item.product.name, quantity: item.quantity, size: item.size, unit_price: item.product.price })),
      subtotal
    };
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json() as { error?: string; order_number?: string; reference?: string; authorization_url?: string; message?: string };
      if (!response.ok) throw new Error(data.error || "Could not place your order.");
      if (method === "paystack" && data.authorization_url) { window.location.href = data.authorization_url; return; }
      clearCart();
      setMessage(`Order ${data.order_number || ""} received. ${data.message || "Our team will contact you to confirm delivery."}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally { setBusy(false); }
  }

  if (!items.length && !message) return <div className="border border-luxury-border p-8 text-center"><p className="font-display text-2xl">Your bag is empty</p><a href="/shop" className="gold-button mt-5">Shop footwear</a></div>;
  return <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_340px]">
    <div><h2 className="font-display text-2xl">Delivery information</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">
      <Field name="name" label="Full name" required /><Field name="email" label="Email address" type="email" required /><Field name="phone" label="Phone number" required /><Field name="city" label="City" required /><Field name="state" label="State" required />
      <label className="sm:col-span-2"><span className="field-label">Delivery address</span><textarea name="address" required rows={3} className="field-input" /></label>
      <label className="sm:col-span-2"><span className="field-label">Delivery notes (optional)</span><textarea name="notes" rows={2} className="field-input" /></label>
    </div>
    <h2 className="mt-10 font-display text-2xl">Payment method</h2><div className="mt-5 space-y-3">
      {[["pay_on_delivery", "Pay on delivery", "Pay when your order arrives."], ["bank_transfer", "Bank transfer", "Our team will share transfer details to confirm your order."], ["paystack", "Pay online with Paystack", "Secure online payment. Requires Paystack configuration."]].map(([value, title, desc]) => <label key={value} className={`flex cursor-pointer gap-3 border p-4 ${method === value ? "border-luxury-gold bg-luxury-cream" : "border-luxury-border"}`}><input type="radio" name="payment" checked={method === value} onChange={() => setMethod(value)} /><span><strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs text-luxury-muted">{desc}</span></span></label>)}
    </div>
    {message && <p role="status" className="mt-6 border border-luxury-gold bg-luxury-cream p-4 text-sm leading-6">{message}</p>}
    <button disabled={busy || !items.length} className="gold-button mt-7 w-full disabled:opacity-50">{busy ? "Processing..." : "Place order"}</button>
    </div>
    <aside className="h-fit border border-luxury-border p-6"><h2 className="font-display text-2xl">Your order</h2>{items.map((item) => <div key={`${item.product.id}-${item.size}`} className="mt-4 flex justify-between gap-4 text-sm"><span className="text-luxury-muted">{item.product.name} · {item.size} × {item.quantity}</span><strong className="whitespace-nowrap">{formatNaira(item.product.price * item.quantity)}</strong></div>)}<div className="mt-6 flex justify-between border-t border-luxury-border pt-5"><span className="font-semibold">Subtotal</span><strong>{formatNaira(subtotal)}</strong></div><p className="mt-3 text-xs text-luxury-muted">Delivery fees, if applicable, will be confirmed before dispatch.</p></aside>
  </form>;
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return <label><span className="field-label">{label}</span><input name={name} type={type} required={required} className="field-input" /></label>;
}
