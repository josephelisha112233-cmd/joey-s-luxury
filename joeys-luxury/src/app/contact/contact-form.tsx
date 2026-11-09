"use client";
import { useState } from "react";
export function ContactForm() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form.entries())) });
      const result = await response.json() as { error?: string; message?: string };
      if (!response.ok) throw new Error(result.error || "Unable to send message.");
      setMessage(result.message || "Message received."); event.currentTarget.reset();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to send message."); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="mt-10 max-w-2xl space-y-4"><h2 className="font-display text-2xl">Send us a message</h2><div className="grid gap-4 sm:grid-cols-2"><label><span className="field-label">Your name</span><input name="name" required className="field-input" /></label><label><span className="field-label">Email</span><input name="email" required type="email" className="field-input" /></label></div><label><span className="field-label">Phone (optional)</span><input name="phone" className="field-input" /></label><label><span className="field-label">Message</span><textarea name="message" required rows={5} className="field-input" /></label><button disabled={busy} className="gold-button">{busy ? "Sending..." : "Send message"}</button>{message && <p role="status" className="bg-luxury-cream p-3 text-sm">{message}</p>}</form>;
}
