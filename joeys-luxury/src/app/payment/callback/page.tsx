import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function PaymentCallback({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const { reference } = await searchParams;
  let message = "We could not confirm this payment. Please contact the store with your order reference.";
  if (reference && process.env.PAYSTACK_SECRET_KEY) {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }, cache: "no-store" });
    const result = await response.json() as { status?: boolean; data?: { status?: string; reference?: string; amount?: number } };
    if (response.ok && result.status && result.data?.status === "success") {
      const supabase = createAdminClient();
      if (supabase) {
        const { data: order } = await supabase.from("orders").select("id,total").eq("payment_reference", result.data.reference).single();
        if (order && result.data.amount === Math.round(Number(order.total) * 100)) {
          await supabase.from("orders").update({ payment_status: "paid", status: "processing" }).eq("id", order.id);
          message = "Your payment was successful. Thank you for shopping with Joey's Luxury.";
        }
      }
    }
  }
  return <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center"><p className="eyebrow">Payment update</p><h1 className="mt-3 font-display text-4xl">Thank you.</h1><p className="mt-5 text-sm leading-7 text-luxury-muted">{message}</p><Link href="/shop" className="gold-button mt-8">Continue shopping</Link></div>;
}
