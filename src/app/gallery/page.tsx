import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/home/CTABanner";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import DemoGallery from "@/components/gallery/DemoGallery";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore our portfolio of completed projects — electrical installations, security systems, networking infrastructure, and more.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Our Work"
          title="Project"
          highlight="Gallery"
          image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=75"
        />

        <section className="py-20 lg:py-28 bg-white">
          <div className="container-main">
            <SectionHeading
              eyebrow="Completed Projects"
              title="Work We're"
              highlight="Proud Of"
              description="Browse installations across power, security, and networking — every project delivered with precision."
            />
            <DemoGallery />
          </div>
        </section>

        {/* Project categories visual — real estate multi-panel style */}
        <section className="bg-brand-darker py-16 lg:py-20 overflow-hidden">
          <div className="container-main mb-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-0.5 w-8 bg-brand-orange block" />
                  <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em]">
                    Project Categories
                  </span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-700 text-white uppercase leading-none">
                  Work Across <span className="text-brand-green-muted">Every</span> Domain
                </h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Electrical",
                sub: "Wiring, solar, DB boards",
                image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=75",
                count: "180+",
              },
              {
                label: "Security",
                sub: "CCTV, alarms, fencing",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75",
                count: "200+",
              },
              {
                label: "Networking",
                sub: "Cabling, Wi-Fi, VoIP",
                image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=600&q=75",
                count: "120+",
              },
              {
                label: "System Design",
                sub: "AutoCAD layouts, plans",
                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=75",
                count: "50+",
              },
            ].map((cat) => (
              <div key={cat.label} className="relative h-64 group overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover brightness-50 group-hover:brightness-40 scale-105 group-hover:scale-100 transition-all duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Orange top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-linear-to-t from-black/80 to-transparent">
                  <div className="font-display text-3xl font-700 text-brand-orange leading-none mb-0.5">
                    {cat.count}
                  </div>
                  <h4 className="font-display text-xl font-700 text-white uppercase leading-tight">
                    {cat.label}
                  </h4>
                  <p className="text-white/50 text-xs mt-1">{cat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
