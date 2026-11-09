import Link from "next/link";
import { Search, UserRound, Heart, Menu } from "lucide-react";
import { CartBadge } from "@/components/cart-badge";

const links = ["New Arrivals", "Formal Shoes", "Loafers", "Sneakers", "Collections"];
export function SiteHeader() {
  return <>
    <div className="bg-luxury-ink px-4 py-2 text-center text-[10px] font-medium tracking-[0.18em] text-white sm:text-[11px]">COMPLIMENTARY STYLE ADVICE · CONTACT 08034784901</div>
    <header className="sticky top-0 z-40 border-b border-luxury-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button aria-label="Open menu" className="rounded-full p-2 text-luxury-ink hover:bg-luxury-sand lg:hidden"><Menu size={21} /></button>
        <Link href="/" className="min-w-fit text-center"><span className="block font-display text-[25px] font-semibold leading-none tracking-[0.02em] text-luxury-ink sm:text-[29px]">JOEY&apos;S</span><span className="mt-1 block text-[8px] font-semibold tracking-[0.48em] text-luxury-gold">L U X U R Y</span></Link>
        <nav className="hidden items-center gap-7 lg:flex">{links.map(link => <Link key={link} href="/shop" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-luxury-ink transition hover:text-luxury-goldHover">{link}</Link>)}</nav>
        <div className="flex items-center gap-1 sm:gap-3"><Link aria-label="Search products" href="/shop" className="icon-button"><Search size={19} /></Link><Link aria-label="My account" href="/account" className="icon-button hidden sm:inline-flex"><UserRound size={19} /></Link><Link aria-label="Wishlist" href="/account" className="icon-button hidden sm:inline-flex"><Heart size={19} /></Link><CartBadge /></div>
      </div>
      <div className="border-t border-luxury-border px-4 py-2.5 lg:hidden"><div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto whitespace-nowrap">{links.map(link => <Link key={link} href="/shop" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-luxury-muted">{link}</Link>)}</div></div>
    </header>
  </>;
}
