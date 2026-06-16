"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Shield, Wifi, ClipboardCheck, PencilRuler, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    id: "power", icon: Zap, num: "01",
    title: "Electrical & Solar Services",
    description: "Wiring, circuit repairs, panel upgrades, lighting installation, and end-to-end solar energy systems.",
    tags: ["Wiring & Repairs", "Solar Panels", "LED Lighting", "Panel Upgrades"],
  },
  {
    id: "security", icon: Shield, num: "02",
    title: "Security Systems & CCTV",
    description: "CCTV surveillance, electric fencing, remote access viewing, and smart integration — layered protection.",
    tags: ["CCTV Cameras", "Electric Fencing", "Remote Access", "Smart Integration"],
  },
  {
    id: "networking", icon: Wifi, num: "03",
    title: "Networking & Communication",
    description: "Structured cabling, Wi-Fi optimization, hardware provisioning, and VoIP systems for reliable connectivity.",
    tags: ["Structured Cabling", "Wi-Fi APs", "VoIP Systems", "Hardware Setup"],
  },
  {
    id: "assessment", icon: ClipboardCheck, num: "04",
    title: "Routine Maintenance & Support",
    description: "UPS battery testing, camera lens cleaning, CCTV storage health checks, and NVR/DVR software updates.",
    tags: ["UPS Testing", "Camera Cleaning", "HDD Checks", "Software Updates"],
  },
  {
    id: "design", icon: PencilRuler, num: "05",
    title: "System Design",
    description: "Security system layouts and network infrastructure design for accurate installation and future maintenance.",
    tags: ["Security Layout", "Wi-Fi AP Design", "Network Planning", "Documentation"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function ServicesSection() {
  return (
    <section className="py-24 lg:py-36 bg-brand-off-white" id="services">
      <div className="container-main">
        <SectionHeading
          eyebrow="What We Do"
          title="Our"
          highlight="Services"
          description="End-to-end property maintenance — power, security, networking and more."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200"
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                variants={item}
                className="group relative bg-white p-8 hover:bg-brand-darker transition-colors duration-500 cursor-default"
              >
                {/* Number */}
                <span className="text-[10px] font-bold text-gray-300 group-hover:text-white/20 uppercase tracking-[0.4em] mb-5 block transition-colors">
                  {s.num}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-none border border-brand-green/30 group-hover:border-brand-green flex items-center justify-center mb-5 transition-colors">
                  <Icon size={22} className="text-brand-green" />
                </div>

                <h3 className="font-display text-xl font-700 text-brand-darker group-hover:text-white uppercase mb-3 transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-500 group-hover:text-white/60 text-sm leading-relaxed mb-6 transition-colors">
                  {s.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {s.tags.map((t) => (
                    <span key={t} className="text-[10px] font-semibold uppercase tracking-wide border border-gray-200 group-hover:border-white/15 text-gray-400 group-hover:text-white/50 px-2 py-1 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/services#${s.id}`}
                  className="inline-flex items-center gap-2 text-brand-green group-hover:text-brand-green-muted text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Learn more <ArrowUpRight size={13} />
                </Link>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-green group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            variants={item}
            className="bg-brand-green p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-5 block">06</span>
              <h3 className="font-display text-2xl font-800 text-white uppercase mb-4 leading-tight">
                Need a Tailored Solution?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Every property is unique. Get a free on-site assessment and custom quote.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-white text-brand-green text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-brand-cream transition-colors"
            >
              Get Free Quote <ArrowUpRight size={13} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
