"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    num: "01",
    title: "Understanding Client Needs",
    description: "We begin with in-depth consultation to fully understand your requirements, goals, and property context.",
    icon: "💬",
  },
  {
    num: "02",
    title: "Site Visit & Assessment",
    description: "We visit the site to assess existing systems, identify requirements, and gather the information needed for accurate planning.",
    icon: "🔍",
  },
  {
    num: "03",
    title: "System Design",
    description: "We design the right solution and select appropriate equipment based on site assessment and client requirements.",
    icon: "📐",
  },
  {
    num: "04",
    title: "System Installation",
    description: "Our skilled technicians carry out the installation using quality-assured equipment and professional best practices.",
    icon: "⚡",
  },
  {
    num: "05",
    title: "Testing & Handover",
    description: "We test all installed systems, document the work, and walk you through a detailed handover briefing.",
    icon: "✅",
  },
  {
    num: "06",
    title: "Ongoing Support",
    description: "We provide scheduled maintenance visits to ensure continued system performance and long-term reliability.",
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
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
