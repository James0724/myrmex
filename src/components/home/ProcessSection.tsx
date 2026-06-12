"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    num: "01",
    title: "Site Assessment",
    description: "We visit your property for a thorough inspection of all existing systems — power, security, and networking.",
    icon: "🔍",
  },
  {
    num: "02",
    title: "Solution Design",
    description: "We design a tailored plan including AutoCAD layouts and a transparent itemised quotation.",
    icon: "📐",
  },
  {
    num: "03",
    title: "Professional Installation",
    description: "Our certified technicians execute the installation using only genuine, quality-assured equipment.",
    icon: "⚡",
  },
  {
    num: "04",
    title: "Testing & Handover",
    description: "Full system testing, documentation, and a detailed handover briefing so you know exactly what's installed.",
    icon: "✅",
  },
  {
    num: "05",
    title: "Ongoing Support",
    description: "Scheduled maintenance visits, rapid emergency response, and a direct line to our technical team.",
    icon: "🛡️",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 lg:py-36 bg-white overflow-hidden">
      <div className="container-main">
        <SectionHeading
          eyebrow="How We Work"
          title="Our"
          highlight="Process"
          description="A clear, structured approach from first contact to long-term support."
        />

        <div className="relative mt-4">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-gray-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Circle node */}
                <div className="relative z-10 w-[104px] h-[104px] mx-auto lg:mx-0 mb-6 flex items-center justify-center border-2 border-gray-200 group-hover:border-brand-green-mid bg-white group-hover:bg-brand-off-white transition-all duration-400 rounded-none">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h4 className="font-display text-lg font-700 text-brand-darker uppercase mb-2 group-hover:text-brand-green-mid transition-colors">
                  {step.title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
