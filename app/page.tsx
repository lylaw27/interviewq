import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import CareerSection from "@/components/career-section";
import FeatureSection from "@/components/feature-section";
import CTASection from "@/components/cta-section";
import LinkSection from "@/components/link-section";
import ATSSection from "@/components/ats-section";
import PreviewSection from "@/components/preview-section";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <HeroSection/>
      <LinkSection/>
      <ATSSection/>
      <CareerSection/>
      <FeatureSection/>
      <PreviewSection/>
      <CTASection/>
    </main>
  );
}
