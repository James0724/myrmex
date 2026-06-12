"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";

export default function CTABanner() {
  return (
    <section className="relative py-28 overflow-hidden bg-brand-darker">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=60"
        alt="Property maintenance"
        fill
        className="object-cover brightness-[0.18]"
        sizes="100vw"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-brand-darker/95 via-brand-darker/70 to-transparent z-10" />

      <div className="container-main relative z-20">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-0.5 w-10 bg-brand-orange" />
            <span className="text-brand-orange text-xs font-bold uppercase tracking-[0.3em]">
              Get Started Today
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-700 text-white uppercase leading-none"
            >
              Ready to Protect
              <br />
              <span className="text-brand-green">Your Property?</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 text-base leading-relaxed mb-10"
          >
            Schedule a free on-site consultation. We&apos;ll assess your power, security,
            and networking systems — with no obligation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="btn-fill bg-brand-green text-white text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <Calendar size={15} /> Book Free Consultation
            </Link>
            <Link
              href="/services"
              className="text-white text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 border border-white/25 hover:bg-white/10 inline-flex items-center gap-2 transition-colors"
            >
              View Services <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
