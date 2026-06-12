import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import IntroSection from "@/components/home/IntroSection";
import FeatureSplit from "@/components/home/FeatureSplit";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectStrip from "@/components/home/ProjectStrip";
import ProcessSection from "@/components/home/ProcessSection";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntroSection />
        <FeatureSplit />
        <ServicesSection />
        <ProjectStrip />
        <StatsSection />
        <ProcessSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
