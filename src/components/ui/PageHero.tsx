"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxNDE0MTQiLz48L3N2Zz4=";

interface Props {
  eyebrow: string;
  title: string;
  highlight?: string;
  image: string;
}

export default function PageHero({ eyebrow, title, highlight, image }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative w-full h-[58vh] min-h-[420px] flex items-end overflow-hidden bg-brand-darker group">
      <Image
        src={image}
        alt={title}
        fill
        priority
        quality={80}
        placeholder="blur"
        blurDataURL={BLUR}
        sizes="100vw"
        className={`object-cover brightness-[0.32] scale-105 group-hover:scale-100 transition-all duration-[1.5s] ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/80 z-10" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent z-10" />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)] z-10 pointer-events-none" />

      <div className="relative z-20 container-main pb-14 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-0.5 w-10 bg-brand-orange" />
          <span className="text-brand-orange text-xs font-bold uppercase tracking-[0.3em]">
            {eyebrow}
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl font-700 text-white uppercase leading-none"
          >
            {title}{" "}
            {highlight && <span className="text-brand-green-light">{highlight}</span>}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
