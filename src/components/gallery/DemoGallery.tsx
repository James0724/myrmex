"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const IMAGES = [
  { id: "1",  cat: "power",      title: "Distribution Board Installation",       url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=75" },
  { id: "2",  cat: "security",   title: "CCTV Camera Network Setup",             url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75" },
  { id: "3",  cat: "power",      title: "Solar Panel Array — Residential",       url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=75" },
  { id: "4",  cat: "networking", title: "Server Room Structured Cabling",        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=75" },
  { id: "5",  cat: "security",   title: "Access Control & Biometric Entry",      url: "https://images.unsplash.com/photo-1580894908361-967195033215?w=800&q=75" },
  { id: "6",  cat: "networking", title: "Network Cabinet & Patch Panel",         url: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=75" },
  { id: "7",  cat: "power",      title: "Electrical Wiring Installation",        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=75" },
  { id: "8",  cat: "security",   title: "Electric Perimeter Fence System",       url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=75" },
  { id: "9",  cat: "networking", title: "Wi-Fi Access Point Deployment",         url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=75" },
  { id: "10", cat: "power",      title: "Solar Inverter & Battery Bank",         url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=75" },
  { id: "11", cat: "security",   title: "NVR Setup & Remote Monitoring",         url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=75" },
  { id: "12", cat: "networking", title: "Fibre Optic Termination",               url: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=75" },
];

const FILTERS = [
  { key: "all",        label: "All Projects" },
  { key: "power",      label: "Power & Electrical" },
  { key: "security",   label: "Security" },
  { key: "networking", label: "Networking" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function DemoGallery() {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<(typeof IMAGES)[0] | null>(null);

  const filtered = active === "all" ? IMAGES : IMAGES.filter((i) => i.cat === active);

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={cn(
              "px-5 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-200",
              active === f.key
                ? "bg-brand-green text-white border-brand-green"
                : "bg-white text-gray-400 border-gray-200 hover:border-brand-green hover:text-brand-green"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        key={active}
        variants={container}
        initial="hidden"
        animate="show"
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
      >
        {filtered.map((img) => (
          <motion.button
            key={img.id}
            variants={item}
            onClick={() => setLightbox(img)}
            className="break-inside-avoid w-full group relative overflow-hidden block"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-brand-darker/0 group-hover:bg-brand-darker/60 transition-all duration-400 flex items-end">
                <div className="p-4 text-white translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="font-display text-sm font-700 uppercase">{img.title}</p>
                  <p className="text-white/60 text-xs capitalize mt-0.5">{img.cat}</p>
                </div>
              </div>
              {/* Corner tag */}
              <span className="absolute top-3 left-3 bg-brand-green text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.cat}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-white/60 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              >
                <X size={16} /> Close
              </button>
              <div className="relative w-full aspect-video">
                <Image
                  src={lightbox.url}
                  alt={lightbox.title}
                  fill
                  className="object-cover"
                  sizes="90vw"
                />
              </div>
              <div className="bg-brand-darker px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-display font-700 uppercase text-sm">{lightbox.title}</p>
                  <p className="text-white/40 text-xs capitalize tracking-widest mt-0.5">{lightbox.cat}</p>
                </div>
                <span className="bg-brand-green text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                  {lightbox.cat}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
