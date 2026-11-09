import { CheckoutForm } from "@/components/checkout-form";
export const metadata = { title: "Checkout" };
export default function CheckoutPage() {
  return <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><p className="eyebrow">Almost yours</p><h1 className="mt-3 font-display text-4xl">Checkout</h1><p className="mt-3 text-sm text-luxury-muted">Enter your delivery details and choose how you would like to pay.</p><div className="mt-10"><CheckoutForm /></div></div>;
}
