import { NextRequest, NextResponse } from "next/server";

const OTP_CODE = process.env.OTP_CODE || "987654";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "Code requis" }, { status: 400 });
    }

    if (code !== OTP_CODE) {
      return NextResponse.json({ error: "Code incorrect" }, { status: 401 });
    }

    const token = Buffer.from(`admin:${Date.now()}`).toString("base64");

    return NextResponse.json({
      success: true,
      token,
      message: "Connexion réussie",
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
