"use client";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/products";

export function AddToCart({ product }: { product: Product }) {
  const [size, setSize] = useState("42");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  return <div className="mt-7">
    <label htmlFor="shoe-size" className="text-[10px] font-bold uppercase tracking-[0.15em]">Choose your size</label>
    <select id="shoe-size" value={size} onChange={(event) => setSize(event.target.value)} className="mt-3 block w-full border border-luxury-border bg-white px-4 py-3 text-sm outline-none focus:border-luxury-gold">
      {["39", "40", "41", "42", "43", "44", "45", "46"].map((value) => <option key={value} value={value}>EU {value}</option>)}
    </select>
    <button onClick={() => { addItem(product, size); setAdded(true); }} className="gold-button mt-4 w-full">{added ? "Added to bag ✓" : "Add to bag"}</button>
  </div>;
}
