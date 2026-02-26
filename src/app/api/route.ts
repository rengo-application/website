import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const endpoint = process.env.RENGO_AFFILIATE_ENDPOINT;
    if (!endpoint) {
      return NextResponse.json(
        { error: "Missing RENGO_AFFILIATE_ENDPOINT in .env.local" },
        { status: 500 }
      );
    }

    const payload = await req.json();

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();

    // Intentamos devolver JSON si aplica, si no, devolvemos texto.
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status: res.status });
    } catch {
      return new NextResponse(text, { status: res.status });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Affiliate proxy failed", details: String(err) },
      { status: 500 }
    );
  }
}