"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { ShieldCheck, Wrench, Clock4, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Reliable Products",
    desc: "We use reliable, well-tested equipment from trusted manufacturers to ensure durable and stable systems, reducing failures and minimizing downtime.",
  },
  {
    icon: Wrench,
    title: "Skilled Technicians",
    desc: "Our skilled technicians apply industry best practices and technical expertise to deliver safe, efficient, and reliable solutions across power, security, and networking systems.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    desc: "We continuously learn, adapt, and embrace new technologies to improve our services and deliver more effective, reliable, and future-ready solutions.",
  },
  {
    icon: Clock4,
    title: "After-Service Support",
    desc: "We provide dedicated after-service support to ensure our solutions continue to perform reliably, offering assistance, maintenance, and guidance whenever clients need it.",
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
          description="We work with carefully selected products from reliable manufacturers, and our technicians are trained to maintain the balance between quality equipment and professional execution — delivering lasting value for every client."
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
                &ldquo;To provide reliable solutions that enhance safety,
                connectivity, and efficiency for homeowners, businesses, and
                property managers through professional workmanship, dedicated
                support, and lasting value.&rdquo;
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
