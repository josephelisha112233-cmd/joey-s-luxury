import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatNaira } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden bg-luxury-sand">
        <Link href={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <div className="relative aspect-[4/4.7]">
            <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" />
          </div>
        </Link>
        {product.badge && <span className="absolute left-3 top-3 bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-luxury-ink">{product.badge}</span>}
        <button aria-label={`Add ${product.name} to wishlist`} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-luxury-ink transition hover:bg-luxury-highlight"><Heart size={16} /></button>
      </div>
      <div className="pt-4">
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-luxury-muted">{product.category}</p>
        <Link href={`/product/${product.id}`} className="mt-1.5 block font-display text-lg text-luxury-ink transition hover:text-luxury-goldHover">{product.name}</Link>
        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-luxury-ink">
          {formatNaira(product.price)}
          {product.oldPrice && <span className="text-xs font-normal text-luxury-muted line-through">{formatNaira(product.oldPrice)}</span>}
        </div>
      </div>
    </article>
  );
}
