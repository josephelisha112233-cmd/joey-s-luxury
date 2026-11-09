"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const supabase = createClient();
    if (!supabase) { setMessage("Connect Supabase by adding your project URL and anon key to .env.local."); setBusy(false); return; }
    const result = mode === "login" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/account` } });
    setMessage(result.error?.message || (mode === "signup" ? "Account created. Check your email if confirmation is enabled." : "Signed in successfully."));
    setBusy(false);
    if (!result.error && mode === "login") window.location.href = "/account";
  }
  return <div className="mx-auto flex min-h-[65vh] max-w-md flex-col justify-center px-4 py-16"><p className="eyebrow text-center">Joey&apos;s Luxury</p><h1 className="mt-3 text-center font-display text-4xl">{mode === "login" ? "Welcome back." : "Create your account."}</h1><div className="mt-8 flex border-b border-luxury-border"><button onClick={() => setMode("login")} className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider ${mode === "login" ? "border-b-2 border-luxury-gold" : "text-luxury-muted"}`}>Sign in</button><button onClick={() => setMode("signup")} className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider ${mode === "signup" ? "border-b-2 border-luxury-gold" : "text-luxury-muted"}`}>Create account</button></div><form onSubmit={submit} className="mt-7 space-y-4"><label><span className="field-label">Email address</span><input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="field-input" /></label><label><span className="field-label">Password</span><input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} className="field-input" /></label><button disabled={busy} className="gold-button w-full">{busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}</button></form>{message && <p role="status" className="mt-5 bg-luxury-cream p-3 text-sm leading-6">{message}</p>}<p className="mt-6 text-center text-xs text-luxury-muted">Need assistance? <Link href="/contact" className="underline">Contact us</Link></p></div>;
}
