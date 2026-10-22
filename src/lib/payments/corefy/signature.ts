import "server-only";
import crypto from "node:crypto";

/**
 * Computes and verifies the X-Signature header sent by Corefy webhooks.
 *
 * Algorithm per specification:
 * base64_encode(sha1(secret + rawBody + secret, true))
 *
 * IMPORTANT: rawBody MUST be the exact, unmodified raw string of the HTTP request body.
 */
export function calculateCorefySignature(rawBody: string, secret: string): string {
  return crypto
    .createHash("sha1")
    .update(secret + rawBody + secret)
    .digest("base64");
}

export function verifyCorefySignature(rawBody: string, signature: string | null | undefined, secret: string): boolean {
  if (!signature || !secret) return false;

  try {
    const expected = calculateCorefySignature(rawBody, secret);
    const expectedBuf = Buffer.from(expected, "utf8");
    const signatureBuf = Buffer.from(signature.trim(), "utf8");

    if (expectedBuf.length !== signatureBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
  } catch {
    return false;
  }
}
