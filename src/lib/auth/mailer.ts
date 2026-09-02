import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/lib/site";

interface Attachment {
  filename: string;
  content: Uint8Array;
}

interface Mail {
  to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: Attachment[];
}

let transporter: Transporter | null = null;

/** Lazily builds a reusable SMTP transport from SMTP_* env vars. Returns null
 *  when credentials are missing so sendMail can fall back to console logging. */
function getTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return transporter;
}

/**
 * Sends transactional email over SMTP when SMTP_HOST/USER/PASS are set,
 * otherwise logs to the server console so local development works without a
 * mail server.
 */
export async function sendMail(mail: Mail): Promise<void> {
  const tx = getTransporter();
  const from = process.env.MAIL_FROM ?? `Velusim <${process.env.SMTP_USER ?? "info@velusimesim.com"}>`;

  if (!tx) {
    const files = mail.attachments?.length
      ? `\n[mail:dev] Attachments: ${mail.attachments.map((a) => `${a.filename} (${a.content.byteLength} bytes)`).join(", ")}`
      : "";
    console.info(`\n[mail:dev] To: ${mail.to}\n[mail:dev] Subject: ${mail.subject}\n${mail.text}${files}\n`);
    return;
  }

  try {
    await tx.sendMail({
      from,
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      attachments: mail.attachments?.map((a) => ({
        filename: a.filename,
        content: Buffer.from(a.content),
      })),
    });
  } catch (err) {
    console.error("[mail] SMTP send failed:", err);
  }
}

export function welcomeEmail(firstName: string): Pick<Mail, "subject" | "html" | "text"> {
  const subject = "Welcome to Velusim";
  const text = `Hi ${firstName},\n\nYour Velusim account is ready. You can now buy travel eSIMs, top up your balance and manage everything from your wallet.\n\nSafe travels,\nThe Velusim team`;
  return { subject, text, html: `<p>Hi ${firstName},</p><p>Your Velusim account is ready. You can now buy travel eSIMs, top up your balance and manage everything from your wallet.</p><p>Safe travels,<br/>The Velusim team</p>` };
}

export function resetEmail(link: string): Pick<Mail, "subject" | "html" | "text"> {
  const subject = "Reset your Velusim password";
  const text = `We received a request to reset your password.\n\nReset it here (valid for 1 hour):\n${link}\n\nIf you didn't request this, you can ignore this email.`;
  return { subject, text, html: `<p>We received a request to reset your password.</p><p><a href="${link}">Reset your password</a> (valid for 1 hour).</p><p>If you didn't request this, you can ignore this email.</p>` };
}

export function welcomeBackEmail(firstName: string): Pick<Mail, "subject" | "html" | "text"> {
  const subject = "Welcome back to Velusim";
  const text = `Hi ${firstName},\n\nYou just signed in to your Velusim account. If this was you, there's nothing to do — your eSIMs and wallet are ready in your account.\n\nIf this wasn't you, please reset your password right away.\n\nThe Velusim team`;
  return { subject, text, html: `<p>Hi ${firstName},</p><p>You just signed in to your Velusim account. If this was you, there's nothing to do — your eSIMs and wallet are ready in your account.</p><p>If this wasn't you, please reset your password right away.</p><p>The Velusim team</p>` };
}

export function topUpEmail(firstName: string | undefined, amountCents: number, balanceCents: number): Pick<Mail, "subject" | "html" | "text"> {
  const amount = `$${(amountCents / 100).toFixed(2)}`;
  const balance = `$${(balanceCents / 100).toFixed(2)}`;
  const hi = firstName ? `Hi ${firstName},` : "Hi there,";
  const subject = `Your Velusim top-up receipt — ${amount}`;
  const text = `${hi}\n\nWe've added ${amount} to your Velusim balance.\n\nAmount added: ${amount}\nNew balance: ${balance}\n\nYou can spend it on any eSIM at checkout.\n\nSafe travels,\nThe Velusim team\n${site.company} · ${site.url}`;
  const html = `<p>${hi}</p><p>We've added <strong>${amount}</strong> to your Velusim balance.</p><table style="border-collapse:collapse"><tr><td style="padding:2px 12px 2px 0;color:#697">Amount added</td><td>${amount}</td></tr><tr><td style="padding:2px 12px 2px 0;color:#697">New balance</td><td><strong>${balance}</strong></td></tr></table><p>You can spend it on any eSIM at checkout.</p><p>Safe travels,<br/>The Velusim team<br/><span style="color:#697">${site.company} · ${site.url}</span></p>`;
  return { subject, text, html };
}

interface InvoiceEmailData {
  firstName?: string;
  orderRef: string;
  title: string;
  dataLabel: string;
  days: number;
  priceCents: number;
}

export function invoiceEmail(data: InvoiceEmailData): Pick<Mail, "subject" | "html" | "text"> {
  const price = `$${(data.priceCents / 100).toFixed(2)}`;
  const hi = data.firstName ? `Hi ${data.firstName},` : "Hi there,";
  const subject = `Your Velusim invoice ${data.orderRef}`;
  const text = `${hi}\n\nThank you for your purchase. Your eSIM has been issued and is ready to install from your account.\n\nOrder: ${data.orderRef}\nPlan: ${data.title}\nData: ${data.dataLabel} · ${data.days} days validity\nTotal paid: ${price}\n\nA PDF invoice is attached to this email.\n\nSafe travels,\nThe Velusim team\n${site.company} · ${site.url}`;
  const html = `<p>${hi}</p><p>Thank you for your purchase. Your eSIM has been issued and is ready to install from your account.</p><table style="border-collapse:collapse"><tr><td style="padding:2px 12px 2px 0;color:#697">Order</td><td>${data.orderRef}</td></tr><tr><td style="padding:2px 12px 2px 0;color:#697">Plan</td><td>${data.title}</td></tr><tr><td style="padding:2px 12px 2px 0;color:#697">Data</td><td>${data.dataLabel} · ${data.days} days validity</td></tr><tr><td style="padding:2px 12px 2px 0;color:#697">Total paid</td><td><strong>${price}</strong></td></tr></table><p>A PDF invoice is attached to this email.</p><p>Safe travels,<br/>The Velusim team<br/><span style="color:#697">${site.company} · ${site.url}</span></p>`;
  return { subject, text, html };
}
