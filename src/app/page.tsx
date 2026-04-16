import Nav from "@/features/marketing/components/nav";
import Mockup from "@/features/marketing/components/mockup";
import FeaturesGrid from "@/features/marketing/components/features-grid";
import AiSection from "@/features/marketing/components/ai-section";
import StackSection from "@/features/marketing/components/stack-section";
import CtaSection from "@/features/marketing/components/cta-section";
import { Hero } from "../features/marketing/components/hero";
import { MarketingFooter } from "../features/marketing/components/marketing-footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Mockup />
        <FeaturesGrid />
        <AiSection />
        <StackSection />
        <CtaSection />
      </main>
      <MarketingFooter />
    </>
  );
}
