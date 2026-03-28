import { CTASection } from '@/components/client/CTASection';
import { HeroSection } from '@/components/client/HeroSection';
import { SellingSection } from '@/components/client/SellingSection';
import SectionCategories from '@/components/client/SectionCategories';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionCategories />
      <SellingSection />
      <CTASection />
    </>
  );
}
