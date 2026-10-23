import { NextRequest, NextResponse } from "next/server";
import { getOrderByRef } from "@/lib/payments/orders";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
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

  return NextResponse.json({
    transactionRef: order.transactionRef,
    status: order.status,
    planTitle: order.planTitle,
    planData: order.planData,
    planDays: order.planDays,
    amountCents: order.amountCents,
    currency: order.currency,
    customerEmail: order.customer.email,
    completedAt: order.completedAt,
    esimActivationCode: order.status === "processed" ? order.esimActivationCode : null,
    esimSmdpAddress: order.status === "processed" ? order.esimSmdpAddress : null,
  });
}
