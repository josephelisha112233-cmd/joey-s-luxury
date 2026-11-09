import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

const categories = [
  { title: "Formal shoes", detail: "For every important occasion", image: "/products/oxford.svg" },
  { title: "Everyday sneakers", detail: "Comfort with character", image: "/products/monaco.svg" },
  { title: "Loafers", detail: "Effortlessly well dressed", image: "/products/verona.svg" }
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-luxury-cream">
        <div className="mx-auto grid min-h-[570px] max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1.02fr_0.98fr] md:py-20 lg:px-8">
          <div className="relative z-10 max-w-xl">
            <p className="eyebrow">The art of dressing well</p>
            <h1 className="mt-5 font-display text-[46px] leading-[1.08] text-luxury-ink sm:text-6xl lg:text-[68px]">Step into <span className="italic text-luxury-goldHover">distinction.</span></h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-luxury-muted sm:text-base">Discover thoughtfully selected footwear that brings timeless elegance and everyday confidence to every step.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/shop" className="gold-button">Shop the collection <ArrowRight size={15} className="ml-3" /></Link>
              <Link href="/shop" className="outline-button">Explore styles</Link>
            </div>
            <div className="mt-12 flex items-center gap-5 border-t border-luxury-border pt-6">
              <div><p className="font-display text-2xl text-luxury-ink">01</p><p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-luxury-muted">Curated style</p></div>
              <div className="h-9 w-px bg-luxury-border" />
              <div><p className="font-display text-2xl text-luxury-ink">02</p><p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-luxury-muted">Made to impress</p></div>
              <div className="h-9 w-px bg-luxury-border" />
              <div><p className="font-display text-2xl text-luxury-ink">03</p><p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-luxury-muted">Nigeria-wide</p></div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[570px]">
            <div className="absolute -right-5 top-8 h-[78%] w-[78%] border border-luxury-gold/50" />
            <div className="relative aspect-[5/5.3] overflow-hidden bg-[#E8E1D2]">
              <Image src="/products/regent.svg" alt="Premium leather shoe from Joey's Luxury" fill priority className="object-cover" />
              <div className="absolute bottom-5 left-5 bg-white/90 px-5 py-4 backdrop-blur">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-luxury-goldHover">Joey&apos;s edit</p>
                <p className="mt-1 font-display text-xl text-luxury-ink">The Regent Collection</p>
              </div>
            </div>
            <div className="absolute -left-5 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[9px] font-semibold uppercase tracking-[0.3em] text-luxury-muted md:block">Elegance in every detail</div>
          </div>
        </div>
      </section>

      <section className="border-y border-luxury-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 py-2"><Truck size={19} className="text-luxury-goldHover" /><span className="text-[10px] font-semibold uppercase tracking-[0.13em]">Delivery across Nigeria</span></div>
          <div className="flex items-center justify-center gap-3 border-y border-luxury-border py-4 sm:border-x sm:border-y-0"><ShieldCheck size={19} className="text-luxury-goldHover" /><span className="text-[10px] font-semibold uppercase tracking-[0.13em]">A considered shopping experience</span></div>
          <div className="flex items-center justify-center gap-3 py-2"><Sparkles size={19} className="text-luxury-goldHover" /><span className="text-[10px] font-semibold uppercase tracking-[0.13em]">Curated for modern gentlemen</span></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="eyebrow">Find your signature</p><h2 className="section-title">Shop by category</h2></div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-luxury-ink hover:text-luxury-goldHover">View all styles <ArrowUpRight size={15} /></Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {categories.map((category, index) => (
            <Link href="/shop" key={category.title} className="group relative overflow-hidden bg-luxury-sand">
              <div className="relative aspect-[4/4.7]">
                <Image src={category.image} alt={category.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-ink/55 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div><p className="font-display text-2xl">{category.title}</p><p className="mt-1 text-xs text-white/75">{category.detail}</p></div>
                  <span className="rounded-full border border-white/70 p-2 transition group-hover:bg-white group-hover:text-luxury-ink"><ArrowUpRight size={17} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-luxury-cream py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="eyebrow">Selected for you</p><h2 className="section-title">The considered collection</h2><p className="mt-3 text-sm text-luxury-muted">Distinctive pairs. Timeless appeal.</p></div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-luxury-ink hover:text-luxury-goldHover">Shop all footwear <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-luxury-ink px-7 py-14 text-center sm:px-12 sm:py-20">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full border border-luxury-gold/20" />
          <p className="eyebrow">A better way to get dressed</p>
          <h2 className="relative mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-white sm:text-5xl">The right pair changes the way you arrive.</h2>
          <p className="relative mx-auto mt-5 max-w-lg text-sm leading-7 text-white/60">Find footwear that feels as considered as the rest of your wardrobe.</p>
          <Link href="/shop" className="gold-button relative mt-8">Discover Joey&apos;s Luxury <ArrowRight size={15} className="ml-3" /></Link>
        </div>
      </section>
    </>
  );
}
