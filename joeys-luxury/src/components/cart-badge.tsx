"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function CartBadge() {
  const { count } = useCart();
  return <Link aria-label={`Shopping bag, ${count} items`} href="/cart" className="icon-button relative">
    <ShoppingBag size={19} />
    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-[9px] font-bold text-luxury-ink">{count}</span>
  </Link>;
}
