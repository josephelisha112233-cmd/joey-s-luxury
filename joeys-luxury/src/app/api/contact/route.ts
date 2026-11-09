import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; phone?: string; message?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!body.name?.trim() || !body.email?.includes("@") || !body.message?.trim()) return NextResponse.json({ error: "Please provide your name, a valid email and a message." }, { status: 400 });
  const supabase = createAdminClient();
  if (!supabase) return NextResponse.json({ error: "Contact form is not connected yet. Please email josephelisha112233@gmail.com." }, { status: 503 });
  const { error } = await supabase.from("contact_messages").insert({ name: body.name.trim(), email: body.email.trim(), phone: body.phone || null, message: body.message.trim() });
  if (error) return NextResponse.json({ error: "Message could not be sent. Please email us directly." }, { status: 500 });
  return NextResponse.json({ message: "Thank you. Your message has been received." });
}
