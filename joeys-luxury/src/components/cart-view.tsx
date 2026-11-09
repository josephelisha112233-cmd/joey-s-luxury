"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatNaira } from "@/lib/utils";

export function CartView() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  if (!items.length) return <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center"><p className="eyebrow">Your selection</p><h1 className="mt-3 font-display text-4xl text-luxury-ink">Your bag is waiting.</h1><p className="mt-4 text-sm text-luxury-muted">Your shopping bag is currently empty. Explore the collection and find a pair that feels like you.</p><Link href="/shop" className="gold-button mt-8">Continue shopping</Link></div>;

  return <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
    <div><p className="eyebrow">Your selection</p><h1 className="mt-2 font-display text-4xl">Shopping bag</h1>
      <div className="mt-8 divide-y divide-luxury-border border-y border-luxury-border">
        {items.map(({ product, quantity, size }) => <div key={`${product.id}-${size}`} className="flex gap-4 py-5">
          <div className="relative h-28 w-24 shrink-0 bg-luxury-sand"><Image src={product.image} alt={product.name} fill className="object-cover" /></div>
          <div className="min-w-0 flex-1"><p className="font-display text-lg">{product.name}</p><p className="mt-1 text-xs text-luxury-muted">EU size {size}</p><p className="mt-2 text-sm font-semibold">{formatNaira(product.price)}</p>
            <div className="mt-3 flex items-center gap-3"><button aria-label="Decrease quantity" onClick={() => updateQuantity(product.id, size, quantity - 1)} className="rounded border border-luxury-border p-1"><Minus size={13} /></button><span className="text-xs">{quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(product.id, size, quantity + 1)} className="rounded border border-luxury-border p-1"><Plus size={13} /></button><button onClick={() => removeItem(product.id, size)} className="ml-2 text-luxury-muted hover:text-red-700"><Trash2 size={15} /></button></div>
          </div>
          <p className="text-sm font-semibold">{formatNaira(product.price * quantity)}</p>
        </div>)}
      </div>
    </div>
    <aside className="h-fit border border-luxury-border p-6"><h2 className="font-display text-2xl">Order summary</h2><div className="mt-6 flex justify-between text-sm"><span className="text-luxury-muted">Subtotal</span><strong>{formatNaira(subtotal)}</strong></div><p className="mt-3 text-xs leading-6 text-luxury-muted">Delivery charges are calculated based on your delivery location at checkout.</p><div className="mt-5 flex justify-between border-t border-luxury-border pt-5"><span className="text-sm font-semibold">Estimated total</span><strong>{formatNaira(subtotal)}</strong></div><Link href="/checkout" className="gold-button mt-7 w-full">Proceed to checkout</Link><Link href="/shop" className="mt-4 block text-center text-[10px] font-bold uppercase tracking-wider underline underline-offset-4">Continue shopping</Link></aside>
  </div>;
}
