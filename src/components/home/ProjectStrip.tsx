"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    category: "Electrical",
    title: "Power Systems & Solar",
    desc: "Panel installations, solar setup, and electrical audits for homes and businesses.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=75",
    href: "/services#power",
    count: "180+",
    countLabel: "Installations",
  },
  {
    category: "Security",
    title: "CCTV & Access Control",
    desc: "Surveillance cameras, alarms, electric fencing, and gate automation.",
    image:
      "https://res.cloudinary.com/dodivhwd8/image/upload/v1779091976/20251206_112757_efxiqc.jpg",
    href: "/services#security",
    count: "200+",
    countLabel: "Systems Installed",
  },
  {
    category: "Networking",
    title: "Structured Cabling & Wi-Fi",
    desc: "Cat6 cabling, access point deployment, and full network infrastructure.",
    image:
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=75",
    href: "/services#networking",
    count: "120+",
    countLabel: "Networks Built",
  },
];

export default function ProjectStrip() {
  return (
    <section className="overflow-hidden">
      {/* Section header */}
      <div className="bg-brand-off-white py-12 border-t border-gray-200">
        <div className="container-main flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-0.5 w-8 bg-brand-orange block" />
              <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em]">
                Service Areas
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-700 text-brand-darker uppercase leading-none">
              What We <span className="text-brand-green-mid">Specialise</span>{" "}
              In
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden sm:flex items-center gap-2 text-brand-green text-xs font-bold uppercase tracking-widest hover:text-brand-green-mid transition-colors"
          >
            All Services <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Image panels */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="relative h-[480px] group overflow-hidden"
          >
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover object-top scale-110 group-hover:scale-100 transition-all duration-700 brightness-50 group-hover:brightness-40"
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Category badge */}
            <div className="absolute top-6 left-6 z-10">
              <span className="bg-brand-orange text-brand-darker text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                {p.category}
              </span>
            </div>

            {/* Project count — top right */}
            <div className="absolute top-6 right-6 z-10 text-right">
              <div className="font-display text-3xl font-700 text-white leading-none">
                {p.count}
              </div>
              <div className="text-white/60 text-[10px] uppercase tracking-widest">
                {p.countLabel}
              </div>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-8 bg-linear-to-t from-black/90 via-black/50 to-transparent">
              <h3 className="font-display text-2xl font-700 text-white uppercase mb-2">
                {p.title}
              </h3>
              <p className="text-white/60 text-xs leading-relaxed mb-5">
                {p.desc}
              </p>
              <Link
                href={p.href}
                className="inline-flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all"
              >
                Learn more <ArrowUpRight size={13} />
              </Link>
            </div>

            {/* Orange bottom border on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
