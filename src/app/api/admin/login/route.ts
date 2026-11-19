import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminToken,
  isAdminConfigured,
  isValidAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin password is not set yet." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as { password?: string };
  if (!isValidAdminPassword(body.password ?? "")) {
    return NextResponse.json(
      { error: "That password is not correct." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminToken(), adminCookieOptions);
  return response;
}
