import { NextRequest, NextResponse } from "next/server";
import { getOrderByRef } from "@/lib/payments/orders";
import { generateInvoicePdf, generateTopUpPdf } from "@/lib/auth/invoice";
import { readSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params;
  if (!ref) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  const order = await getOrderByRef(ref);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // According to spec section 8: Pending downloads are hidden/blocked
  if (order.status !== "processed") {
    return NextResponse.json({ error: "Invoice is only available for paid orders" }, { status: 403 });
  }

  // Authorization check: if order belongs to a user, verify session
  if (order.userId) {
    const session = await readSession();
    if (!session || session.userId !== order.userId) {
      // Allow fallback if verification query matches customer email
      const verifyEmail = req.nextUrl.searchParams.get("email");
      if (!verifyEmail || verifyEmail.toLowerCase() !== order.customer.email.toLowerCase()) {
        return NextResponse.json({ error: "Unauthorized to access this invoice" }, { status: 401 });
      }
    }
  }

  try {
    if (order.planId === "wallet-topup") {
      const receiptBytes = await generateTopUpPdf({
        ref: order.transactionRef,
        email: order.customer.email,
        amountCents: order.amountCents,
        balanceCents: order.amountCents,
        issuedAt: order.completedAt ? new Date(order.completedAt) : new Date(order.createdAt),
      });

      return new NextResponse(Buffer.from(receiptBytes), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="receipt-${order.transactionRef}.pdf"`,
          "Cache-Control": "private, max-age=3600",
        },
      });
    }

    const pdfBytes = await generateInvoicePdf({
      orderRef: order.transactionRef,
      email: order.customer.email,
      customerName: `${order.customer.firstName} ${order.customer.lastName}`,
      customerAddress: order.customer.street,
      customerCity: order.customer.city,
      customerPostalCode: order.customer.postalCode,
      customerCountry: order.customer.country,
      currency: order.currency,
      title: order.planTitle,
      dataLabel: order.planData,
      days: order.planDays,
      priceCents: order.amountCents,
      issuedAt: order.completedAt ? new Date(order.completedAt) : new Date(order.createdAt),
    });

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${order.transactionRef}.pdf"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (err) {
    console.error("[invoice-route] Failed to generate PDF:", err);
    return NextResponse.json({ error: "Failed to generate invoice PDF" }, { status: 500 });
  }
}
