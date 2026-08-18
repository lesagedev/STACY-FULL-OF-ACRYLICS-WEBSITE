import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest } from "next/server";

const SESSION_MAX_AGE = 60 * 60 * 8;

function signature(timestamp: string) {
  return createHmac("sha256", process.env.ADMIN_SECRET || "invalid-admin-secret")
    .update(timestamp)
    .digest("hex");
}

export function createAdminSession() {
  const timestamp = String(Date.now());
  return `${timestamp}.${signature(timestamp)}`;
}

export function isAdminRequest(request: NextRequest) {
  if (!process.env.ADMIN_SECRET) return false;
  const value = request.cookies.get("admin_session")?.value;
  if (!value) return false;

  const [timestamp, providedSignature] = value.split(".");
  if (!timestamp || !providedSignature || !/^\d+$/.test(timestamp)) return false;
  if (Date.now() - Number(timestamp) > SESSION_MAX_AGE * 1000) return false;

  const expected = signature(timestamp);
  const provided = Buffer.from(providedSignature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  return provided.length === expectedBuffer.length && timingSafeEqual(provided, expectedBuffer);
}

export { SESSION_MAX_AGE };
