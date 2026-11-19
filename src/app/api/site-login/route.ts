import { NextResponse } from "next/server";
import {
  SITE_COOKIE,
  createSiteToken,
  isSiteConfigured,
  isValidSitePassword,
  siteCookieOptions,
} from "@/lib/site-auth";

export async function POST(request: Request) {
  if (!isSiteConfigured()) {
    return NextResponse.json(
      { error: "The invitation password is not set yet." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as { password?: string };
  if (!isValidSitePassword(body.password ?? "")) {
    return NextResponse.json(
      { error: "That code is not correct." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SITE_COOKIE, createSiteToken(), siteCookieOptions);
  return response;
}
