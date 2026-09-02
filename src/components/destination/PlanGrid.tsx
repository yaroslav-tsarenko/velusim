import type { Country, Plan } from "@/lib/types";
import { PlanCard } from "@/components/cards/PlanCard";
import { Reveal } from "@/components/ui/Reveal";

export function PlanGrid({ country, plans }: { country: Country; plans: Plan[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((p, i) => (
        <Reveal key={p.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
          <PlanCard plan={p} country={country} featured={p.badge === "BESTSELLER"} />
        </Reveal>
      ))}
    </div>
  );
}
