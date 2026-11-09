export const metadata = { title: "FAQs" };
const questions = [
["Where does Joey's Luxury deliver?", "We are based in Jos, Plateau State, and intend to serve customers across Nigeria. Delivery availability and timing should be confirmed with our team before launch."],
["How do I choose my shoe size?", "Product pages display available EU size options. If you are between sizes or need advice, contact us before placing your order."],
["Which payment methods are available?", "The checkout foundation supports pay on delivery, bank transfer and Paystack online payment once the relevant business account credentials are configured."],
["How can I track an order?", "Contact our team with your order number. Automated order notifications and customer order tracking should be enabled before the store launches."],
["Can I return or exchange an item?", "Please contact us before returning an item. The store's final return and exchange conditions must be confirmed and published by the business before launch."]
];
export default function FAQPage() { return <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6"><p className="eyebrow">A little help</p><h1 className="mt-3 font-display text-5xl">Frequently asked questions</h1><div className="mt-10 divide-y divide-luxury-border border-y border-luxury-border">{questions.map(([q,a]) => <details key={q} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-display text-xl marker:hidden">{q}</summary><p className="mt-3 text-sm leading-7 text-luxury-muted">{a}</p></details>)}</div></div>; }
