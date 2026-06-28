import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/home/CTABanner";
import PageHero from "@/components/ui/PageHero";
import ServicesVisualIntro from "@/components/services/ServicesVisualIntro";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Shield,
  Wifi,
  ClipboardCheck,
  PencilRuler,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive property maintenance services: Electrical & Solar, Security Systems & CCTV, Networking & Communication, Routine Maintenance, and System Design.",
};

const services = [
  {
    id: "power",
    icon: Zap,
    num: "01",
    title: "Electrical & Solar Services",
    intro:
      "Reliable electrical & solar solutions based on safety, efficiency, and long-term performance.",
    items: [
      {
        name: "Wiring & Circuit Repairs",
        detail:
          "Diagnosing and repairing wiring faults, replacing damaged circuits, and ensuring safe electrical connections throughout the property.",
      },
      {
        name: "Electrical Panel Upgrades",
        detail:
          "Upgrading distribution boards and circuit breakers for improved capacity, safety, and compliance with current standards.",
      },
      {
        name: "Lighting Installation",
        detail:
          "Installing indoor and outdoor lighting systems including energy-efficient LED upgrades and outdoor security lighting.",
      },
      {
        name: "Emergency Electrical Services",
        detail:
          "Rapid response to electrical faults to restore power and address safety risks promptly.",
      },
      {
        name: "Solar Consultation & Design",
        detail:
          "Assessment of energy needs and design of solar systems tailored for backup or off-grid applications.",
      },
      {
        name: "Solar Installation & Maintenance",
        detail:
          "Installation of solar panels, inverters, and battery storage, along with scheduled maintenance to keep systems performing reliably.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=75",
    extraImages: [
      {
        src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=75",
        label: "Solar Energy Systems",
      },
      {
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=75",
        label: "Site Installation",
      },
      {
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=75",
        label: "System Audits",
      },
    ],
  },
  {
    id: "security",
    icon: Shield,
    num: "02",
    title: "Security Systems & CCTV",
    intro:
      "Layered security solutions combining monitoring, detection, and controlled access.",
    items: [
      {
        name: "IP & Analog Camera Systems",
        detail:
          "Full-featured IP and analog camera installations with structured cabling, NVR/DVR setup, and both indoor and outdoor mounting. Includes remote access viewing on mobile and desktop, smart monitoring platform integration, system troubleshooting, component repairs, and footage recovery from backup storage devices.",
      },
      {
        name: "Intruder Alarm Installation",
        detail:
          "Supply, installation, and commissioning of wired and wireless intruder alarm systems including motion sensors, door/window contacts, sirens, and control panels.",
      },
      {
        name: "Electric Fencing",
        detail:
          "Active perimeter intruder deterrent system for protecting properties, livestock, and farm crops.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75",
    extraImages: [
      {
        src: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=700&q=75",
        label: "CCTV Monitoring",
      },
      {
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=75",
        label: "Camera Systems",
      },
      {
        src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=75",
        label: "Perimeter Security",
      },
    ],
  },
  {
    id: "networking",
    icon: Wifi,
    num: "03",
    title: "Networking & Communication",
    intro:
      "Networking and communication systems are the digital highways that allow your devices to talk to each other seamlessly. We install and maintain these essential systems so your business stays fast, secure, and always online.",
    items: [
      {
        name: "Structured Cabling",
        detail:
          "Installing high-speed fiber or Ethernet cables to connect office hardware with proper routing, labeling, and termination for stable data transmission.",
      },
      {
        name: "Wi-Fi Optimization",
        detail:
          "Mapping and setting up wireless access points (APs) to eliminate dead zones and support multiple connected devices across the premises.",
      },
      {
        name: "Routers & Switches Setup",
        detail:
          "Installing and configuring routers and switches to manage data flow, including bandwidth allocation, network security, and system segmentation.",
      },
      {
        name: "VoIP Systems (Internet Calling)",
        detail:
          "Replacing old phone lines with internet-based voice calling systems for efficient internal and external communication.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=75",
    extraImages: [
      {
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=75",
        label: "Network Infrastructure",
      },
      {
        src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=75",
        label: "Fiber Optic Cabling",
      },
      {
        src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=75",
        label: "Wi-Fi Optimization",
      },
    ],
  },
  {
    id: "assessment",
    icon: ClipboardCheck,
    num: "04",
    title: "Routine Maintenance & Support",
    intro:
      "Ongoing system maintenance to maintain performance and reliability.",
    items: [
      {
        name: "UPS Battery Testing",
        detail:
          "Testing battery backup systems to ensure they seamlessly engage during power outages and maintain consistent protection.",
      },
      {
        name: "Camera Lens Cleaning",
        detail:
          "Routine cleaning of CCTV camera lenses to maintain image clarity and recording quality.",
      },
      {
        name: "CCTV Storage Health Checks",
        detail:
          "Inspecting hard drive health and storage capacity to ensure continuous and uninterrupted recording.",
      },
      {
        name: "NVR/DVR Software Updates",
        detail:
          "Applying firmware and software updates to network and digital video recorders to maintain system security and performance.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=75",
    extraImages: [
      {
        src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&q=75",
        label: "System Inspection",
      },
      {
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=75",
        label: "Detailed Reporting",
      },
      {
        src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&q=75",
        label: "Technical Review",
      },
    ],
  },
  {
    id: "design",
    icon: PencilRuler,
    num: "05",
    title: "System Design",
    intro:
      "Professional technical documentation for accurate installation and future maintenance.",
    items: [
      {
        name: "Security System Layouts",
        detail:
          "Planning and positioning of cameras and security perimeter devices for full coverage and effective monitoring.",
      },
      {
        name: "Network Infrastructure Design",
        detail:
          "Wi-Fi access points (APs) placement for optimal coverage and performance.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=75",
    extraImages: [
      {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=75",
        label: "Blueprint Drawings",
      },
      {
        src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=700&q=75",
        label: "Technical Planning",
      },
      {
        src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=75",
        label: "Site Documentation",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="What We Offer"
          title="Our"
          highlight="Services"
          image="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=75"
        />

        <ServicesVisualIntro />

        {/* Quick nav */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
          <div className="container-main">
            <div className="flex gap-0 overflow-x-auto no-scrollbar">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2 px-5 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-green hover:bg-brand-off-white whitespace-nowrap shrink-0 border-r border-gray-100 transition-all"
                >
                  <s.icon size={13} />
                  {s.title.split(" ")[0]}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Service sections */}
        {services.map((service, i) => {
          const Icon = service.icon;
          const isEven = i % 2 === 0;
          return (
            <section
              key={service.id}
              id={service.id}
              className={isEven ? "bg-white" : "bg-brand-off-white"}
            >
              {/* ── Content row ── */}
              <div className="container-main py-20 lg:py-28">
                <div className="grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-16 items-start">
                  {/* Left sidebar: meta + main image */}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300 block mb-4">
                      {service.num}
                    </span>
                    <div className="w-14 h-14 border-2 border-brand-green/30 flex items-center justify-center mb-5">
                      <Icon size={26} className="text-brand-green" />
                    </div>
                    <h2 className="font-display text-3xl font-700 text-brand-darker uppercase mb-4 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {service.intro}
                    </p>
                    <Link
                      href="/contact"
                      className="btn-fill bg-brand-green text-white text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 inline-flex items-center gap-2 hover:text-white transition-colors self-start"
                    >
                      Get a Quote <ArrowRight size={13} />
                    </Link>

                    {/* Main service image below CTA */}
                    <div className="relative h-52 mt-8 overflow-hidden group lg:hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
                        sizes="360px"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-brand-darker/70 via-transparent to-transparent" />
                      {/* Service label badge */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="bg-brand-orange text-brand-darker text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                          {service.title.split(" ")[0]} Service
                        </span>
                      </div>
                      {/* Service number watermark */}
                      <div className="absolute top-3 right-4 font-display text-6xl font-700 text-white/10 leading-none select-none">
                        {service.num}
                      </div>
                    </div>
                  </div>

                  {/* Right: items grid */}
                  <div className="grid sm:grid-cols-2 gap-4 content-start">
                    {service.items.map((item) => (
                      <div
                        key={item.name}
                        className={`border p-5 group hover:shadow-sm transition-all duration-300 ${
                          isEven
                            ? "bg-white border-gray-100 hover:border-brand-green/30"
                            : "bg-white border-gray-100 hover:border-brand-green/30"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 bg-brand-green shrink-0" />
                          <h4 className="font-semibold text-xs uppercase tracking-wide text-brand-dark">
                            {item.name}
                          </h4>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed pl-4">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Full-width image strip ── */}
              <div className="hidden lg:grid grid-cols-1 sm:grid-cols-3 h-56 lg:h-72">
                {service.extraImages.map((img, idx) => (
                  <div key={img.src} className="relative overflow-hidden group">
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover brightness-60 group-hover:brightness-75 scale-105 group-hover:scale-100 transition-all duration-700"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Label overlay — bottom */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                      <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mb-0.5">
                        {service.title.split(" ")[0]}
                      </p>
                      <h4 className="font-display text-lg font-700 text-white uppercase leading-tight">
                        {img.label}
                      </h4>
                    </div>

                    {/* Orange number — top left only on first panel */}
                    {idx === 0 && (
                      <div className="absolute top-4 left-5 z-10">
                        <span className="font-display text-5xl font-700 text-brand-orange/80 leading-none">
                          {service.num}
                        </span>
                      </div>
                    )}

                    {/* Orange bottom border on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                  </div>
                ))}
              </div>

              {/* Section divider */}
              <div className="h-px bg-gray-200" />
            </section>
          );
        })}

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
