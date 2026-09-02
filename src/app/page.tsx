import { Hero } from "@/components/home/Hero";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyUs } from "@/components/home/WhyUs";
import { Reviews } from "@/components/home/Reviews";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { getCurrentUser } from "@/lib/auth/dal";

export default async function Home() {
  if (await getCurrentUser()) redirect("/account");
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <Hero />
      <PopularDestinations />
      <HowItWorks />
      <WhyUs />
      <Reviews />
      <FaqSection />
      <FinalCta />
    </>
  );
}
