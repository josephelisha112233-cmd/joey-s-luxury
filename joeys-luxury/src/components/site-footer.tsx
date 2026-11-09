import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-luxury-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="md:col-span-2 lg:col-span-1">
          <div className="font-display text-3xl">JOEY&apos;S</div>
          <div className="mt-1 text-[9px] font-semibold tracking-[0.5em] text-luxury-gold">L U X U R Y</div>
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">Thoughtfully selected footwear for the modern gentleman. Refined style, lasting comfort.</p>
        </div>
        <div>
          <h3 className="footer-heading">Explore</h3>
          <div className="footer-links"><Link href="/shop">Shop all</Link><Link href="/shop">Formal shoes</Link><Link href="/shop">Loafers</Link><Link href="/shop">Sneakers</Link></div>
        </div>
        <div>
          <h3 className="footer-heading">Customer care</h3>
          <div className="footer-links"><Link href="/contact">Contact us</Link><Link href="/shipping">Shipping & delivery</Link><Link href="/returns">Returns & exchanges</Link><Link href="/faq">FAQs</Link></div>
        </div>
        <div>
          <h3 className="footer-heading">Get in touch</h3>
          <div className="mt-5 space-y-4 text-sm text-white/70">
            <p className="flex gap-3"><Phone size={16} className="shrink-0 text-luxury-gold" />08034784901</p>
            <p className="flex gap-3 break-all"><Mail size={16} className="shrink-0 text-luxury-gold" />josephelisha112233@gmail.com</p>
            <p className="flex gap-3"><MapPin size={16} className="shrink-0 text-luxury-gold" />Jos, Plateau State, Nigeria</p>
            <p className="flex gap-3"><Instagram size={16} className="shrink-0 text-luxury-gold" />Instagram</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-[10px] tracking-[0.12em] text-white/45">© {new Date().getFullYear()} JOEY&apos;S LUXURY. ALL RIGHTS RESERVED.</div>
    </footer>
  );
}
