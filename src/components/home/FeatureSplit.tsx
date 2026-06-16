"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const highlights = [
  "Certified technicians",
  "Reliable, well-tested equipment",
  "Transparent itemised quotes",
  "Dedicated after-service support",
  "Full documentation & handover",
  "Scheduled maintenance visits",
];

export default function FeatureSplit() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[580px]">
        {/* Left content */}
        <div className="relative bg-brand-darker flex flex-col justify-center px-8 py-20 lg:px-16 lg:py-28">
          {/* Orange accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange" />

          <div className="flex items-center gap-3 mb-6">
            <span className="h-0.5 w-10 bg-brand-orange block" />
            <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em]">
              Our Commitment
            </span>
          </div>

          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-700 text-white uppercase leading-none mb-8">
            Smart.
            <br />
            <span className="text-brand-green-muted">Reliable.</span>
            <br />
            Built to Last.
          </h2>

          <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md">
            We are committed to delivering reliable technical maintenance
            solutions built on trust, professionalism, and consistency. We
            prioritize continuous improvement and dependable support to ensure
            lasting value for every client we serve.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-3 text-white/80 text-xs font-medium"
              >
                <CheckCircle2 size={14} className="text-brand-green shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <Link
            href="/services"
            className="btn-fill bg-brand-green text-white text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 inline-flex items-center gap-2 hover:text-white transition-colors self-start"
          >
            View All Services <ArrowRight size={13} />
          </Link>
        </div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[420px] lg:min-h-0"
        >
          <Image
            src="https://res.cloudinary.com/dodivhwd8/image/upload/v1779099749/IMG_20250805_105810_usl328.jpg"
            alt="Myrmex certified technician at work"
            fill
            className="object-cover brightness-75"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Fade edge for desktop blending */}
          <div className="absolute inset-0 bg-linear-to-r from-brand-darker/60 to-transparent hidden lg:block" />

          {/* Badge — top right */}
          <div className="absolute top-8 right-8 bg-brand-orange text-brand-darker px-5 py-4 text-center z-10">
            <div className="font-display text-4xl font-700 leading-none">
              5+
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest mt-1">
              Years Active
            </div>
          </div>

          {/* Bottom strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-brand-green/90 backdrop-blur-sm px-8 py-5 flex items-center justify-between z-10">
            <span className="text-white font-display text-lg font-700 uppercase">
              500+ Projects Completed
            </span>
            <span className="text-white/70 text-xs font-medium tracking-widest uppercase">
              Nairobi, Kenya
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
