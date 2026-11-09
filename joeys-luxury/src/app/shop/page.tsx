import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import Link from "next/link";

export const metadata = { title: "Shop Men's Footwear" };

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; sort?: string }> }) {
  const params = await searchParams;
  const filtered = products.filter(p => !params.category || p.category.toLowerCase().includes(params.category!.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => params.sort === "price-low" ? a.price - b.price : params.sort === "price-high" ? b.price - a.price : params.sort === "name" ? a.name.localeCompare(b.name) : 0);
  return <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
    <p className="eyebrow">Joey&apos;s collection</p><h1 className="mt-3 font-display text-4xl text-luxury-ink sm:text-5xl">Men&apos;s footwear</h1>
    <p className="mt-4 max-w-xl text-sm leading-7 text-luxury-muted">Explore refined footwear selected for work, weekends and every occasion in between.</p>
    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-luxury-border py-4"><span className="text-[10px] font-semibold uppercase tracking-[0.15em]">{sorted.length} styles</span><div className="flex flex-wrap items-center gap-3"><Link href="/shop" className="text-[10px] font-bold uppercase tracking-wider underline">All</Link>{["Formal Shoes", "Loafers", "Casual Sneakers"].map(c => <Link key={c} href={`/shop?category=${encodeURIComponent(c)}`} className="text-[10px] uppercase tracking-wider text-luxury-muted hover:text-luxury-ink">{c}</Link>)}<form><select name="sort" defaultValue={params.sort || ""} onChange={e => e.currentTarget.form?.requestSubmit()} className="border border-luxury-border bg-white px-3 py-2 text-[10px] uppercase tracking-wider"><option value="">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></form></div></div>
    <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">{sorted.map(product => <ProductCard key={product.id} product={product} />)}</div>
    {!sorted.length && <p className="py-20 text-center text-sm text-luxury-muted">No products in this category yet.</p>}
  </div>;
}
