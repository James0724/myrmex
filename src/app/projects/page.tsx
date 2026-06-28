import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/home/CTABanner";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore our portfolio of completed projects — electrical installations, security systems, and networking infrastructure.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Our Work"
          title="Our"
          highlight="Projects"
          image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=75"
        />

        <section className="py-20 lg:py-28 bg-white">
          <div className="container-main">
            <SectionHeading
              eyebrow="Completed Projects"
              title="Work We're"
              highlight="Proud Of"
              description="Browse installations across power & electricals, security, and networking — every project delivered with precision."
            />
            <ProjectsExplorer />
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
