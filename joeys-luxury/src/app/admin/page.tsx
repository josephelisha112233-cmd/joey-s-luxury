import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Store Admin" };
export default async function AdminPage() {
  const supabase = await createClient();
  if (!supabase) return <div className="mx-auto max-w-3xl px-4 py-20"><h1 className="font-display text-4xl">Store admin</h1><p className="mt-4 text-sm">Configure Supabase before accessing the admin area.</p></div>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin" || user.email !== "josephelisha112233@gmail.com") redirect("/");
  const { data: orders } = await supabase.from("orders").select("id, order_number, customer_name, total, status, payment_status, created_at").order("created_at", { ascending: false }).limit(50);
  return <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><p className="eyebrow">Joey&apos;s Luxury</p><h1 className="mt-3 font-display text-4xl">Store dashboard</h1><p className="mt-3 text-sm text-luxury-muted">Signed in as {user.email}. Recent orders are listed below.</p><div className="mt-9 overflow-x-auto border border-luxury-border"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-luxury-cream text-[10px] uppercase tracking-wider"><tr>{["Order", "Customer", "Total", "Status", "Payment", "Date"].map(h => <th key={h} className="p-4">{h}</th>)}</tr></thead><tbody>{(orders || []).map(order => <tr key={order.id} className="border-t border-luxury-border"><td className="p-4 font-semibold">{order.order_number}</td><td className="p-4">{order.customer_name}</td><td className="p-4">₦{Number(order.total).toLocaleString("en-NG")}</td><td className="p-4">{order.status}</td><td className="p-4">{order.payment_status}</td><td className="p-4">{new Date(order.created_at).toLocaleDateString("en-NG")}</td></tr>)}</tbody></table>{!orders?.length && <p className="p-6 text-sm text-luxury-muted">No orders yet.</p>}</div><p className="mt-5 text-xs text-luxury-muted">Product management and order status editing can be extended from this protected dashboard.</p></div>;
}
