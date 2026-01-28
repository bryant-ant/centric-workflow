import { NextResponse } from "next/server";

// ─── Must match the password in middleware.js ─────────────────────────────────
const PASSWORD = "centric2026";

export async function POST(request) {
  const { password } = await request.json();

  if (password === PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("site-auth", PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}