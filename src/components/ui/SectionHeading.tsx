"use client";

import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  light,
}: Props) {
  const textColor = light ? "text-white" : "text-brand-darker";
  const subColor = light ? "text-white/50" : "text-gray-400";

  return (
    <div
      className={`relative w-full pb-6 border-b mb-10 ${light ? "border-white/15" : "border-gray-200"}`}
    >
      {eyebrow && (
        <div className="flex items-center gap-4 mb-4">
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-0.5 bg-brand-orange block"
          />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]"
          >
            {eyebrow}
          </motion.p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
        <h2 className="relative flex flex-col items-start">
          <div className="overflow-hidden pb-1">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`block font-display text-5xl md:text-6xl lg:text-7xl font-700 uppercase tracking-tight ${textColor}`}
            >
              {title}
            </motion.span>
          </div>

          {highlight && (
            <div className="w-fit relative">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative z-10 block font-display text-5xl md:text-6xl lg:text-7xl font-700 uppercase tracking-tight text-brand-green-mid pr-3`}
              >
                {highlight}
              </motion.span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.55, ease: "circOut" }}
                className="absolute bottom-3 left-0 h-[18%] w-full bg-brand-orange/25 origin-left z-0"
              />
            </div>
          )}
        </h2>

        {description && (
          <div className="lg:max-w-lg overflow-hidden">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`text-xs uppercase leading-relaxed tracking-wide border-l-2 border-brand-orange pl-4 ${subColor}`}
            >
              {description}
            </motion.p>
          </div>
        )}
      </div>
    </div>
  );
}
