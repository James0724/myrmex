import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/home/CTABanner";
import PageHero from "@/components/ui/PageHero";
import StatsSection from "@/components/home/StatsSection";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Target,
  Eye,
  CheckCircle2,
  Wrench,
  ShieldCheck,
  FileText,
  Clock4,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Myrmex Property Maintenance — our mission, vision, and commitment to raising maintenance standards in Kenya.",
};

const values = [
  "Integrity in every project",
  "Skilled, certified workmanship",
  "Genuine, quality products only",
  "Transparent pricing & communication",
  "Long-term client relationships",
  "Safety-first approach",
  "On-time delivery",
  "Detailed handover documentation",
];

const team = [
  {
    name: "David",
    role: "Operations Lead",
    img: "https://res.cloudinary.com/dodivhwd8/image/upload/v1781257592/David_egomze.png",
  },
  {
    name: "Emmanuel",
    role: "Lead Security Technician",
    img: "https://res.cloudinary.com/dodivhwd8/image/upload/v1781257592/Emmanuel_flnpya.png",
  },
  {
    name: "Nelson",
    role: "Network Engineer",
    img: "https://res.cloudinary.com/dodivhwd8/image/upload/v1781257592/Nelson_wmqhxy.png",
  },
  {
    name: "Ken",
    role: "Quality Assurance",
    img: "https://res.cloudinary.com/dodivhwd8/image/upload/v1781257591/Ken_zjwaro.png",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Who We Are"
          title="About"
          highlight="Myrmex"
          image="https://res.cloudinary.com/dodivhwd8/image/upload/v1779093389/IMG_20251211_140522_te6iyy.jpg"
        />

        {/* Overview */}
        <section className="py-24 lg:py-36 bg-white">
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <SectionHeading
                  eyebrow="Our Story"
                  title="Built on One"
                  highlight="Purpose"
                />
                <div className="space-y-5 text-gray-500 text-base leading-relaxed">
                  <p>
                    Myrmex Property Maintenance was founded to raise the
                    standard of maintenance services in an industry often
                    affected by unreliable workmanship and poor after-service
                    support.
                  </p>
                  <p>
                    We understand that property maintenance is about ensuring
                    long-term functionality, safety, and value. Every project we
                    handle — whether it&apos;s a power system, a security
                    system, or a networking infrastructure — is carried out with
                    precision and a commitment to excellence.
                  </p>
                  <p>
                    Our goal is to become the leading name in property
                    maintenance across Kenya and beyond, recognized for
                    integrity, quality, and customer satisfaction.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="bg-brand-off-white p-8 border border-gray-100">
                <h3 className="font-display text-2xl font-700 text-brand-darker uppercase mb-6 pb-4 border-b border-gray-200">
                  Core Values
                </h3>
                <ul className="space-y-3">
                  {values.map((v) => (
                    <li
                      key={v}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-brand-green shrink-0"
                      />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-brand-off-white">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
              <div className="bg-white p-10 group hover:bg-brand-darker transition-colors duration-500">
                <div className="w-12 h-12 border border-brand-green/30 group-hover:border-brand-green flex items-center justify-center mb-6 transition-colors">
                  <Target size={22} className="text-brand-green" />
                </div>
                <h3 className="font-display text-3xl font-700 text-brand-darker group-hover:text-white uppercase mb-4 transition-colors">
                  Our Mission
                </h3>
                <p className="text-gray-500 group-hover:text-white/60 text-base leading-relaxed transition-colors">
                  To deliver professional, smart, and lasting maintenance
                  solutions through skilled workmanship, genuine products, and
                  transparent service delivery.
                </p>
              </div>
              <div className="bg-brand-green p-10">
                <div className="w-12 h-12 border border-white/30 flex items-center justify-center mb-6">
                  <Eye size={22} className="text-white" />
                </div>
                <h3 className="font-display text-3xl font-700 text-white uppercase mb-4">
                  Our Vision
                </h3>
                <p className="text-white/80 text-base leading-relaxed">
                  To become a leading name in property maintenance across Kenya
                  and beyond, recognized for integrity, quality, and customer
                  satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bold Statement — inspired by ProCare giant-text style */}
        <section className="bg-brand-darker py-20 lg:py-28 overflow-hidden relative">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(56,142,60,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,142,60,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="container-main relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-0.5 w-10 bg-brand-orange block" />
              <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em]">
                Our Standard
              </span>
            </div>
            <div className="overflow-hidden">
              <h2 className="font-display text-6xl sm:text-8xl lg:text-[120px] font-700 text-white uppercase leading-none tracking-tight">
                RAISING
              </h2>
            </div>
            <div className="overflow-hidden -mt-2 lg:-mt-4">
              <h2 className="font-display text-6xl sm:text-8xl lg:text-[120px] font-700 text-brand-green-mid uppercase leading-none tracking-tight">
                THE
              </h2>
            </div>
            <div className="overflow-hidden -mt-2 lg:-mt-4">
              <h2 className="font-display text-6xl sm:text-8xl lg:text-[120px] font-700 text-white uppercase leading-none tracking-tight">
                STANDARD
              </h2>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <p className="text-white/50 text-sm leading-relaxed max-w-lg border-l-2 border-brand-orange pl-5">
                In an industry plagued by unreliable workmanship and poor
                after-service support, Myrmex was built on one clear purpose —
                to deliver maintenance solutions that actually last.
              </p>
              <div className="flex gap-10 shrink-0">
                {[
                  { v: "500+", l: "Projects Done" },
                  { v: "98%", l: "Satisfaction" },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center">
                    <div className="font-display text-4xl font-700 text-brand-orange leading-none">
                      {v}
                    </div>
                    <div className="text-white/40 text-[10px] uppercase tracking-widest mt-1">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <StatsSection />

        {/* Team */}
        <section className="py-24 lg:py-36 bg-white">
          <div className="container-main">
            <SectionHeading
              eyebrow="Our People"
              title="The"
              highlight="Team"
              description="Certified professionals committed to quality and precision."
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
              {team.map((member, i) => (
                <div key={i} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  </div>
                  <h4 className="font-display text-sm font-700 text-brand-darker uppercase">
                    {member.name}
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment strip — Dankallah-inspired icon row */}
        <section className="bg-brand-off-white py-16 border-t border-gray-200">
          <div className="container-main">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-0.5 w-8 bg-brand-orange block" />
                <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em]">
                  Why Choose Us
                </span>
                <span className="h-0.5 w-8 bg-brand-orange block" />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-700 text-brand-darker uppercase">
                What Drives Our Work
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
              {[
                {
                  icon: Wrench,
                  title: "Skilled Workmanship",
                  desc: "Precision-executed projects using certified techniques and best practices.",
                },
                {
                  icon: ShieldCheck,
                  title: "Genuine Products",
                  desc: "Only authentic, quality-assured materials — never counterfeit.",
                },
                {
                  icon: FileText,
                  title: "Transparent Service",
                  desc: "Clear communication, detailed reports, and honest pricing throughout.",
                },
                {
                  icon: Clock4,
                  title: "After-Service Support",
                  desc: "Your long-term partner — scheduled visits and rapid response included.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white p-8 group hover:bg-brand-darker transition-colors duration-500"
                >
                  <div className="w-12 h-12 border border-brand-green/30 group-hover:border-brand-green flex items-center justify-center mb-5 transition-colors">
                    <Icon size={20} className="text-brand-green" />
                  </div>
                  <h4 className="font-display text-base font-700 text-brand-darker group-hover:text-white uppercase mb-2 transition-colors">
                    {title}
                  </h4>
                  <p className="text-gray-400 group-hover:text-white/50 text-xs leading-relaxed transition-colors">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
