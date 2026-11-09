import Link from "next/link";

export default function NotFound() {
  return <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-5 text-center"><p className="eyebrow">Page not found</p><h1 className="mt-4 font-display text-5xl">A little off the path.</h1><p className="mt-4 text-sm text-luxury-muted">The page you are looking for may have moved.</p><Link href="/" className="gold-button mt-8">Return home</Link></div>;
}
