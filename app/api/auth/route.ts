import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, SESSION_MAX_AGE } from "@/lib/admin-auth";

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

    const token = createAdminSession();
    const response = NextResponse.json({
      success: true,
      token,
      message: "Connexion réussie",
    });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", "", { httpOnly: true, expires: new Date(0), path: "/" });
  return response;
}
