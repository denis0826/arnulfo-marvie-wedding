import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SITE_COOKIE = "am_guest";

const getSitePassword = () => process.env.SITE_PASSWORD ?? "";

export const isSiteConfigured = () => Boolean(getSitePassword());

const safeEqual = (left: string, right: string) => {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
};

export const createSiteToken = () => {
  const secret = getSitePassword();
  return createHmac("sha256", secret).update("arnulfo-marvie-site").digest("hex");
};

export const isValidSitePassword = (password: string) => {
  const secret = getSitePassword();
  const value = password.trim();
  if (!secret || !value) {
    return false;
  }
  return safeEqual(value, secret);
};

export const isSiteSession = async () => {
  if (!isSiteConfigured()) {
    return false;
  }

  const token = (await cookies()).get(SITE_COOKIE)?.value;
  if (!token) {
    return false;
  }

  return safeEqual(token, createSiteToken());
};

export const siteCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};
