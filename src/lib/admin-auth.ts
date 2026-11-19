import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "am_admin";

const getAdminPassword = () => process.env.ADMIN_PASSWORD ?? "";

export const isAdminConfigured = () => Boolean(getAdminPassword());

const safeEqual = (left: string, right: string) => {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
};

export const createAdminToken = () => {
  const secret = getAdminPassword();
  return createHmac("sha256", secret).update("arnulfo-marvie-admin").digest("hex");
};

export const isValidAdminPassword = (password: string) => {
  const secret = getAdminPassword();
  if (!secret || !password) {
    return false;
  }
  return safeEqual(password, secret);
};

export const isAdminSession = async () => {
  if (!isAdminConfigured()) {
    return false;
  }

  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) {
    return false;
  }

  return safeEqual(token, createAdminToken());
};

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};
