"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { QrCode } from "@/components/checkout/QrCode";
import { InstallSteps } from "@/components/how/InstallSteps";
import { Check, Bolt, ArrowRight, Shield } from "@/components/ui/icons";

interface OrderStatusResponse {
  transactionRef: string;
  status: "pending" | "processed" | "failed" | "refunded";
  planTitle: string;
  planData: string;
  planDays: number;
  amountCents: number;
  currency: string;
  customerEmail: string;
  completedAt: string | null;
  esimActivationCode: string | null;
  esimSmdpAddress: string | null;
}

export function ReturnStatusView({ initialRef }: { initialRef: string }) {
  const [ref] = useState(initialRef);
  const [order, setOrder] = useState<OrderStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function checkStatus() {
      if (!ref) {
        if (!ignore) {
          setError("No transaction reference provided.");
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(`/api/payments/orders/${encodeURIComponent(ref)}/status`, {
          cache: "no-store",
        });

        if (!res.ok) {
          if (!ignore) {
            setError(
              res.status === 404
                ? "Order not found. Please verify your reference or contact support."
                : "Failed to retrieve order status from server."
            );
            setLoading(false);
          }
          return;
        }

        const data: OrderStatusResponse = await res.json();
        if (!ignore) {
          setOrder(data);
          setLoading(false);
        }
      } catch {
        if (!ignore) {
          setError("Network error checking order status.");
          setLoading(false);
        }
      }
    }

    checkStatus();
    return () => {
      ignore = true;
    };
  }, [ref, pollCount]);

  // Polling while status is pending (up to 40 polls, every 2.5 seconds)
  useEffect(() => {
    if (!order || order.status !== "pending") return;
    if (pollCount > 40) return;

    const timer = setTimeout(() => {
      setPollCount((prev) => prev + 1);
    }, 2500);

    return () => clearTimeout(timer);
  }, [order, pollCount]);

  if (loading) {
    return (
      <div className="mx-auto max-w-lg rounded-panel glass p-8 text-center">
        <span className="relative inline-grid size-12 place-items-center rounded-full bg-surface">
          <span className="absolute inset-0 rounded-full border border-aurora-1/50 animate-pulse-ring" />
          <span className="size-2 rounded-full bg-emerald" />
        </span>
        <h2 className="mt-4 font-display text-2xl text-ink">Checking order status…</h2>
        <p className="mt-1 text-sm text-ink-muted">Verifying with secure banking gateway.</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-lg rounded-panel glass p-8 text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-danger-soft text-danger">!</div>
        <h2 className="mt-4 font-display text-2xl text-ink">Order lookup</h2>
        <p className="mt-2 text-sm text-danger">{error || "Could not retrieve order details."}</p>
        <div className="mt-6">
          <Link href="/destinations" className="inline-flex h-12 items-center gap-2 rounded-full bg-aurora px-6 text-sm font-medium text-on-aurora">
            Browse eSIM plans <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  // 1. Success state for Wallet Top-up
  if (order.status === "processed" && (!order.esimActivationCode || order.planTitle === "Wallet Top-up")) {
    const receiptUrl = `/api/payments/orders/${encodeURIComponent(order.transactionRef)}/invoice?email=${encodeURIComponent(order.customerEmail)}`;
    return (
      <div className="mx-auto max-w-lg rounded-panel glass p-8 text-center">
        <span className="relative inline-grid size-16 place-items-center rounded-full bg-emerald text-on-aurora animate-fade-up">
          <span aria-hidden className="absolute inset-0 rounded-full border border-aurora-1/60 animate-pulse-ring" />
          <Check className="size-7" />
        </span>
        <h1 className="mt-4 font-display text-3xl text-ink">Balance topped up!</h1>
        <p className="mt-2 text-ink-muted">
          Your wallet was credited with{" "}
          <span className="font-semibold text-ink">€{(order.amountCents / 100).toFixed(2)}</span>.
        </p>
        <div className="mt-6 rounded-field bg-night p-4 text-left font-mono text-xs">
          <p className="flex justify-between py-1">
            <span className="text-ink-muted">Reference:</span>
            <span className="text-ink">{order.transactionRef}</span>
          </p>
          <p className="flex justify-between py-1">
            <span className="text-ink-muted">Amount:</span>
            <span className="font-semibold text-teal">+ €{(order.amountCents / 100).toFixed(2)}</span>
          </p>
          <p className="flex justify-between py-1">
            <span className="text-ink-muted">Status:</span>
            <span className="text-emerald">Payment Confirmed</span>
          </p>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/account?tab=wallet"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-aurora px-6 text-sm font-medium text-on-aurora"
          >
            Go to My Account <ArrowRight className="size-4" />
          </Link>
          <a
            href={receiptUrl}
            download
            className="inline-flex h-11 items-center gap-2 rounded-full glass px-5 text-sm font-medium text-ink hover:border-emerald"
          >
            Download Receipt
          </a>
        </div>
      </div>
    );
  }

  // 2. Success state: eSIM purchase
  if (order.status === "processed" && order.esimActivationCode) {
    const invoiceUrl = `/api/payments/orders/${encodeURIComponent(order.transactionRef)}/invoice?email=${encodeURIComponent(order.customerEmail)}`;

    return (
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="relative inline-grid size-16 place-items-center rounded-full bg-emerald text-on-aurora animate-fade-up">
            <span aria-hidden className="absolute inset-0 rounded-full border border-aurora-1/60 animate-pulse-ring" />
            <span aria-hidden className="absolute -inset-2 rounded-full border border-aurora-2/30 animate-pulse-ring [animation-delay:0.6s]" />
            <Check className="size-7" />
          </span>
          <h1 className="mt-4 font-display text-4xl text-ink">Payment confirmed</h1>
          <p className="mt-2 text-ink-muted">
            Order <span className="font-mono text-ink">{order.transactionRef}</span> · a confirmation invoice was sent to{" "}
            <span className="font-medium text-ink">{order.customerEmail}</span>.
          </p>
        </div>

        {/* eSIM Delivery Card */}
        <div className="glass aurora-edge relative mt-8 grid gap-6 overflow-hidden rounded-panel p-6 shadow-aurora sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px animate-border-signal" />
          <div className="mx-auto animate-fade-up">
            <QrCode value={order.esimActivationCode} />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-1.5">
              <Bolt className="size-3.5 text-emerald" /> Scan to install immediately
            </p>
            <h2 className="mt-1 font-display text-2xl text-ink">{order.planTitle}</h2>
            <p className="mt-1 text-sm text-ink-muted">
              {order.planData} · {order.planDays} days validity
            </p>

            <div className="mt-4 space-y-1.5 rounded-field bg-surface p-4 font-mono text-xs text-ink">
              <p className="flex justify-between gap-2">
                <span className="text-ink-muted">SM-DP+</span>
                <span>{order.esimSmdpAddress ?? "smdp.velusim.io"}</span>
              </p>
              <p className="flex flex-col gap-1">
                <span className="text-ink-muted">Activation code</span>
                <span className="break-all">{order.esimActivationCode}</span>
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(order.esimActivationCode!);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="inline-flex h-10 items-center gap-2 rounded-full glass px-4 text-sm font-medium text-ink hover:border-emerald"
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-emerald" /> Copied
                  </>
                ) : (
                  "Copy activation code"
                )}
              </button>

              <a
                href={invoiceUrl}
                download
                className="inline-flex h-10 items-center gap-2 rounded-full glass px-4 text-sm font-medium text-ink hover:border-emerald"
              >
                Download PDF Invoice
              </a>
            </div>
          </div>
        </div>

        {/* Installation Guide */}
        <div className="mt-6 rounded-panel glass p-6 sm:p-8">
          <h3 className="font-display text-2xl text-ink">Install in about a minute</h3>
          <p className="mb-5 mt-1 text-sm text-ink-muted">Select your device operating system below.</p>
          <InstallSteps />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/account?tab=esims"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-aurora px-6 font-medium text-on-aurora hover:brightness-[1.06]"
          >
            Go to My Account <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex h-12 items-center rounded-full glass px-6 font-medium text-ink hover:border-hairline-strong"
          >
            Add another destination
          </Link>
        </div>
      </div>
    );
  }

  // 2. Pending confirmation state (Polling)
  if (order.status === "pending") {
    return (
      <div className="mx-auto max-w-lg rounded-panel glass p-8 text-center">
        <span className="relative inline-grid size-14 place-items-center rounded-full bg-emerald/10 text-emerald">
          <span className="absolute inset-0 rounded-full border border-emerald/40 animate-pulse-ring" />
          <Shield className="size-6" />
        </span>
        <h2 className="mt-4 font-display text-2xl text-ink">Awaiting payment confirmation</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Your payment is being confirmed by Corefy / Sterling Pay. This usually takes just a few seconds.
        </p>

        <div className="mt-6 rounded-field bg-surface p-4 text-left font-mono text-xs">
          <p className="flex justify-between py-1">
            <span className="text-ink-muted">Reference:</span>
            <span className="font-semibold text-ink">{order.transactionRef}</span>
          </p>
          <p className="flex justify-between py-1">
            <span className="text-ink-muted">Plan:</span>
            <span className="text-ink">{order.planTitle} ({order.planData})</span>
          </p>
          <p className="flex justify-between py-1">
            <span className="text-ink-muted">Total:</span>
            <span className="text-ink">€{(order.amountCents / 100).toFixed(2)}</span>
          </p>
          <p className="flex justify-between py-1">
            <span className="text-ink-muted">Status:</span>
            <span className="text-emerald animate-pulse">Waiting for gateway webhook…</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPollCount((p) => p + 1)}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full glass px-5 text-sm font-medium text-ink hover:border-hairline-strong"
        >
          Refresh status
        </button>
      </div>
    );
  }

  // 3. Failed or Terminated state
  if (order.status === "failed") {
    return (
      <div className="mx-auto max-w-lg rounded-panel glass p-8 text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-danger-soft text-danger">✕</div>
        <h2 className="mt-4 font-display text-2xl text-ink">Payment not completed</h2>
        <p className="mt-2 text-sm text-ink-muted">
          The payment provider reported that this transaction was not completed or was cancelled.
        </p>
        <div className="mt-4 rounded-field bg-night p-3 font-mono text-xs text-ink-muted">
          Reference: {order.transactionRef}
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/destinations"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-aurora px-6 text-sm font-medium text-on-aurora"
          >
            Try another plan <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/help"
            className="inline-flex h-12 items-center rounded-full glass px-6 text-sm font-medium text-ink"
          >
            Contact support
          </Link>
        </div>
      </div>
    );
  }

  // 4. Refunded state
  return (
    <div className="mx-auto max-w-lg rounded-panel glass p-8 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-full bg-surface text-ink-muted">↺</div>
      <h2 className="mt-4 font-display text-2xl text-ink">Order refunded</h2>
      <p className="mt-2 text-sm text-ink-muted">
        This transaction has been refunded. Associated eSIM credits were reversed.
      </p>
      <div className="mt-4 rounded-field bg-night p-3 font-mono text-xs text-ink-muted">
        Reference: {order.transactionRef}
      </div>
    </div>
  );
}
