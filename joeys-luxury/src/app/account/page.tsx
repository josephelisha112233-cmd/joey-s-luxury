import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "My Account" };
export default async function AccountPage() {
  const supabase = await createClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!data.user) return <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center"><p className="eyebrow">Welcome to Joey&apos;s</p><h1 className="mt-3 font-display text-4xl">Your account</h1><p className="mt-4 text-sm leading-7 text-luxury-muted">Sign in to manage your profile and view your orders.</p><Link href="/login" className="gold-button mt-8">Sign in or register</Link></div>;
  return <div className="mx-auto min-h-[55vh] max-w-4xl px-4 py-16"><p className="eyebrow">Your Joey&apos;s account</p><h1 className="mt-3 font-display text-4xl">Welcome back.</h1><p className="mt-4 text-sm text-luxury-muted">{data.user.email}</p><div className="mt-8 border border-luxury-border p-6"><h2 className="font-display text-2xl">Your orders</h2><p className="mt-3 text-sm text-luxury-muted">Your order history will appear here once linked to your customer profile. Guest orders can be looked up by contacting our team.</p></div><form action="/auth/signout" method="post" className="mt-6"><button className="outline-button">Sign out</button></form></div>;
}
