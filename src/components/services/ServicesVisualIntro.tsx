"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, Shield, Wifi, ClipboardCheck, PencilRuler } from "lucide-react";

const servicesList = [
  { icon: Zap, label: "Power Systems & Electrical" },
  { icon: Shield, label: "Security Systems & CCTV" },
  { icon: Wifi, label: "Networking & Communication" },
  { icon: ClipboardCheck, label: "Routine Assessments & Support" },
  { icon: PencilRuler, label: "System Design & Technical Drawings" },
];

const stats = [
  { v: "500+", l: "Projects" },
  { v: "5+", l: "Years" },
  { v: "98%", l: "Satisfaction" },
];

export default function ServicesVisualIntro() {
  return (
    <section className="overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[520px]">
        {/* Left: service checklist */}
        <div className="relative bg-white flex flex-col justify-center px-8 py-16 lg:px-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-0.5 w-10 bg-brand-orange block" />
            <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em]">
              Services Offered
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-700 text-brand-darker uppercase leading-tight mb-4">
            End-to-End
            <br />
            <span className="text-brand-green-mid">Property</span>
            <br />
            Solutions
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
            From power and security to networking and system design — we cover
            every aspect of property maintenance under one roof.
          </p>

          <ul className="space-y-0">
            {servicesList.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-4 py-3.5 border-b border-gray-100 group"
              >
                <div className="w-9 h-9 border border-brand-green/30 flex items-center justify-center shrink-0 group-hover:bg-brand-green group-hover:border-brand-green transition-all duration-300">
                  <Icon
                    size={15}
                    className="text-brand-green group-hover:text-white transition-colors"
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-brand-dark">
                  {label}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: image + overlays */}
        <div className="relative min-h-[480px] lg:min-h-0">
          <Image
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1469&auto"
            alt="Myrmex services overview"
            fill
            className="object-cover brightness-75"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-brand-darker/70" />

          {/* "Devoted to Quality" badge — top right */}
          <div className="absolute top-8 right-8 bg-brand-orange text-brand-darker p-5 text-center max-w-[148px] z-10">
            <div className="font-display text-sm font-700 uppercase leading-tight">
              Devoted to
            </div>
            <div className="font-display text-3xl font-700 uppercase leading-none mt-0.5">
              # Quality
            </div>
          </div>

          {/* Stats strip — bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-brand-darker/90 backdrop-blur-sm px-8 py-6 z-10">
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {stats.map(({ v, l }) => (
                <div key={l} className="text-center px-4">
                  <div className="font-display text-3xl font-700 text-brand-orange leading-none">
                    {v}
                  </div>
                  <div className="text-white/50 text-[10px] uppercase tracking-widest mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
