"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { ShieldCheck, Wrench, FileText, Clock4 } from "lucide-react";

const reasons = [
  {
    icon: Wrench,
    title: "Skilled Workmanship",
    desc: "Every project executed with precision using industry best practices and certified techniques.",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    desc: "We source only authentic, quality-assured materials — no counterfeit or substandard equipment.",
  },
  {
    icon: FileText,
    title: "Transparent Service",
    desc: "Clear communication, detailed reports, and honest pricing from first quote to final handover.",
  },
  {
    icon: Clock4,
    title: "After-Service Support",
    desc: "We remain your maintenance partner long after installation — scheduled visits and rapid response.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-36 bg-brand-darker overflow-hidden">
      <div className="container-main">
        <SectionHeading
          eyebrow="Why Myrmex"
          title="What Sets Us"
          highlight="Apart"
          light
          description="The property maintenance industry is plagued by poor workmanship. We built Myrmex to change that."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-4">
          {/* Left image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-120 hidden lg:block"
          >
            <Image
              src="https://res.cloudinary.com/dodivhwd8/image/upload/v1779099998/IMG_20250805_110922_1_hqbra9.jpg"
              alt="Myrmex technician at work"
              fill
              className="object-cover brightness-90"
              sizes="50vw"
            />
            {/* Quote overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-brand-green p-8">
              <p className="text-white text-sm leading-relaxed italic font-medium">
                &ldquo;To deliver professional, smart, and lasting maintenance
                solutions through skilled workmanship, genuine products, and
                transparent service delivery.&rdquo;
              </p>
              <span className="text-white/60 text-xs uppercase tracking-widest mt-2 block font-bold">
                — Our Mission
              </span>
            </div>
          </motion.div>

          {/* Right reasons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group bg-white/5 border border-white/10 p-6 hover:bg-brand-green/10 hover:border-brand-green/40 transition-all duration-400"
                >
                  <div className="w-10 h-10 border border-brand-green/40 flex items-center justify-center mb-4 group-hover:bg-brand-green group-hover:border-brand-green transition-all duration-300">
                    <Icon
                      size={18}
                      className="text-brand-green group-hover:text-white transition-colors"
                    />
                  </div>
                  <h4 className="font-display text-base font-700 text-white uppercase mb-2">
                    {r.title}
                  </h4>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {r.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
