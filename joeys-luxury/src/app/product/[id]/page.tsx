import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { formatNaira } from "@/lib/utils";
import { AddToCart } from "@/components/add-to-cart";

export function generateStaticParams() { return products.map((product) => ({ id: product.id })); }

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();
  return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <p className="text-[10px] uppercase tracking-[0.15em] text-luxury-muted"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {product.name}</p>
    <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
      <div className="relative aspect-square bg-luxury-sand"><Image src={product.image} alt={product.name} fill className="object-cover" priority /></div>
      <div className="flex flex-col justify-center"><p className="eyebrow">{product.category}</p><h1 className="mt-3 font-display text-4xl text-luxury-ink sm:text-5xl">{product.name}</h1><p className="mt-5 text-xl font-semibold">{formatNaira(product.price)}</p><p className="mt-6 max-w-lg text-sm leading-7 text-luxury-muted">A refined addition to your footwear collection. Designed to bring together confident style, versatility and all-day appeal.</p><div className="mt-8 border-y border-luxury-border py-5"><p className="text-[10px] font-bold uppercase tracking-[0.15em]">Product details</p><p className="mt-2 text-sm text-luxury-muted">Selected footwear · Available in EU sizes 39–46, subject to stock.</p></div><AddToCart product={product} /><p className="mt-4 text-xs leading-6 text-luxury-muted">For assistance, call 08034784901 or email josephelisha112233@gmail.com.</p></div>
    </div>
  </div>;
}
