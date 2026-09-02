import "server-only";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { site } from "@/lib/site";

export interface InvoiceData {
  orderRef: string;
  email: string;
  title: string;
  dataLabel: string;
  days: number;
  priceCents: number;
  issuedAt: Date;
}

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

/** Generates a branded A4 PDF invoice and returns the raw bytes. */
export async function generateInvoicePdf(data: InvoiceData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]); // A4 in points
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const ink = rgb(0.08, 0.13, 0.22);
  const muted = rgb(0.41, 0.44, 0.54);
  const emerald = rgb(0.9, 0.35, 0.28);
  const hair = rgb(0.85, 0.83, 0.78);
  const M = 56;
  let y = 786;

  const text = (s: string, x: number, yy: number, f = font, size = 10, color = ink) =>
    page.drawText(s, { x, y: yy, size, font: f, color });
  const right = (s: string, xRight: number, yy: number, f = font, size = 10, color = ink) =>
    page.drawText(s, { x: xRight - f.widthOfTextAtSize(s, size), y: yy, size, font: f, color });

  // Header
  text(site.name, M, y, bold, 24, ink);
  right("INVOICE", 595 - M, y + 4, bold, 18, emerald);
  y -= 20;
  text("Travel eSIMs, connected in one tap", M, y, font, 9, muted);
  y -= 34;

  // Company + invoice meta
  text(site.company, M, y, bold, 10, ink);
  right(`Invoice  ${data.orderRef}`, 595 - M, y, font, 10, ink);
  y -= 14;
  text(`Company reg. no. ${site.regNumber}`, M, y, font, 9, muted);
  right(`Date  ${data.issuedAt.toISOString().slice(0, 10)}`, 595 - M, y, font, 9, muted);
  y -= 13;
  for (const line of wrap(site.address, 46)) {
    text(line, M, y, font, 9, muted);
    y -= 12;
  }
  y -= 10;

  // Bill to
  text("BILLED TO", M, y, bold, 8, muted);
  y -= 14;
  text(data.email, M, y, font, 11, ink);
  y -= 30;

  // Table header
  page.drawLine({ start: { x: M, y }, end: { x: 595 - M, y }, thickness: 1, color: hair });
  y -= 16;
  text("DESCRIPTION", M, y, bold, 8, muted);
  right("AMOUNT", 595 - M, y, bold, 8, muted);
  y -= 18;

  // Line item
  text(data.title, M, y, font, 11, ink);
  right(money(data.priceCents), 595 - M, y, font, 11, ink);
  y -= 15;
  text(`${data.dataLabel} · ${data.days} days validity · eSIM data plan`, M, y, font, 9, muted);
  y -= 22;
  page.drawLine({ start: { x: M, y }, end: { x: 595 - M, y }, thickness: 1, color: hair });
  y -= 22;

  // Total
  right("Total paid", 460, y, bold, 11, ink);
  right(money(data.priceCents), 595 - M, y, bold, 13, emerald);
  y -= 40;

  text("Payment received. This eSIM has been issued and delivered by email.", M, y, font, 9, muted);
  y -= 13;
  text(`Questions? Contact ${site.supportEmail}`, M, y, font, 9, muted);

  // Footer
  right(`${site.company} · ${site.url}`, 595 - M, 48, font, 8, muted);

  return pdf.save();
}

export interface TopUpData {
  ref: string;
  email: string;
  amountCents: number;
  balanceCents: number;
  issuedAt: Date;
}

/** Generates a branded A4 PDF receipt for a wallet top-up and returns the bytes. */
export async function generateTopUpPdf(data: TopUpData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const ink = rgb(0.08, 0.13, 0.22);
  const muted = rgb(0.41, 0.44, 0.54);
  const emerald = rgb(0.9, 0.35, 0.28);
  const hair = rgb(0.85, 0.83, 0.78);
  const M = 56;
  let y = 786;

  const text = (s: string, x: number, yy: number, f = font, size = 10, color = ink) =>
    page.drawText(s, { x, y: yy, size, font: f, color });
  const right = (s: string, xRight: number, yy: number, f = font, size = 10, color = ink) =>
    page.drawText(s, { x: xRight - f.widthOfTextAtSize(s, size), y: yy, size, font: f, color });

  text(site.name, M, y, bold, 24, ink);
  right("RECEIPT", 595 - M, y + 4, bold, 18, emerald);
  y -= 20;
  text("Wallet top-up confirmation", M, y, font, 9, muted);
  y -= 34;

  text(site.company, M, y, bold, 10, ink);
  right(`Receipt  ${data.ref}`, 595 - M, y, font, 10, ink);
  y -= 14;
  text(`Company reg. no. ${site.regNumber}`, M, y, font, 9, muted);
  right(`Date  ${data.issuedAt.toISOString().slice(0, 10)}`, 595 - M, y, font, 9, muted);
  y -= 13;
  for (const line of wrap(site.address, 46)) {
    text(line, M, y, font, 9, muted);
    y -= 12;
  }
  y -= 10;

  text("ACCOUNT", M, y, bold, 8, muted);
  y -= 14;
  text(data.email, M, y, font, 11, ink);
  y -= 30;

  page.drawLine({ start: { x: M, y }, end: { x: 595 - M, y }, thickness: 1, color: hair });
  y -= 16;
  text("DESCRIPTION", M, y, bold, 8, muted);
  right("AMOUNT", 595 - M, y, bold, 8, muted);
  y -= 18;
  text("Wallet top-up", M, y, font, 11, ink);
  right(money(data.amountCents), 595 - M, y, font, 11, ink);
  y -= 22;
  page.drawLine({ start: { x: M, y }, end: { x: 595 - M, y }, thickness: 1, color: hair });
  y -= 22;

  right("Amount added", 460, y, bold, 11, ink);
  right(money(data.amountCents), 595 - M, y, bold, 13, emerald);
  y -= 18;
  right("New balance", 460, y, font, 10, muted);
  right(money(data.balanceCents), 595 - M, y, font, 10, ink);
  y -= 40;

  text("Funds are available immediately and can be spent on any eSIM at checkout.", M, y, font, 9, muted);
  y -= 13;
  text(`Questions? Contact ${site.supportEmail}`, M, y, font, 9, muted);

  right(`${site.company} · ${site.url}`, 595 - M, 48, font, 8, muted);

  return pdf.save();
}

function wrap(s: string, max: number): string[] {
  const words = s.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}
