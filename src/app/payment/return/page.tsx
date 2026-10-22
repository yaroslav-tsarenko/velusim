import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, Container } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ReturnStatusView } from "./ReturnStatusView";

export const metadata: Metadata = {
  title: "Order status",
  description: "Check the status of your Velusim eSIM order.",
  robots: { index: false, follow: false },
};

export default async function PaymentReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; reference_id?: string; order_id?: string }>;
}) {
  const sp = await searchParams;
  const ref = sp.ref || sp.reference_id || sp.order_id || "";

  return (
    <Section band="night" starfield aurora>
      <Container className="py-10 sm:py-16">
        <Breadcrumbs
          trail={[
            { name: "Home", path: "/" },
            { name: "Checkout", path: "/checkout" },
            { name: "Order status", path: "/payment/return" },
          ]}
        />
        <div className="mt-8">
          <Suspense fallback={<div className="text-center text-ink-muted">Loading order status…</div>}>
            <ReturnStatusView initialRef={ref} />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
