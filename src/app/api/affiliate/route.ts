import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const endpoint = process.env.RENGO_AFFILIATE_ENDPOINT; // <- server only
    if (!endpoint) {
      return NextResponse.json(
        { ok: false, error: "Missing RENGO_AFFILIATE_ENDPOINT env var" },
        { status: 500 }
      );
    }

    // Enviamos como JSON al Apps Script
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await upstream.text();

    // Intentamos parsear JSON; si no, devolvemos texto
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status: upstream.status });
    } catch {
      return NextResponse.json(
        { ok: upstream.ok, status: upstream.status, raw: text },
        { status: upstream.status }
      );
    }
 } catch (err: unknown) {
  const message = err instanceof Error ? err.message : "Unknown error";
  return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}