"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reviews = [
  {
    name: "John Mwangi",
    role: "Property Manager · Westlands",
    text: "Myrmex installed our entire CCTV and access control system. Professional from start to finish — cables are neatly managed, cameras are perfectly positioned, and the handover was thorough. Highly recommended.",
    rating: 5,
  },
  {
    name: "Sarah Kamau",
    role: "Homeowner · Karen",
    text: "They rewired our entire house and installed a solar backup system. The team was punctual, clean, and explained everything clearly. Six months later, zero issues. That's the quality I was looking for.",
    rating: 5,
  },
  {
    name: "David Ochieng",
    role: "Business Owner · Industrial Area",
    text: "Myrmex did our office structured cabling, server room setup, and electric fence. Every job done right the first time. Their after-service support is second to none.",
    rating: 5,
  },
  {
    name: "Fatuma Hassan",
    role: "Real Estate Developer · Kilimani",
    text: "We've used Myrmex across four of our residential developments. Consistent quality, transparent quotes, and they always work within schedule. Our go-to maintenance partner.",
    rating: 5,
  },
  {
    name: "Peter Njoroge",
    role: "Facilities Manager · Gigiri",
    text: "From power system audit to preventive maintenance schedules — Myrmex handles everything for our commercial complex. The thermal imaging reports give us peace of mind.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 6500, stopOnInteraction: false })]
  );
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-24 lg:py-36 bg-brand-off-white overflow-hidden">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-0">
          <SectionHeading
            eyebrow="Client Reviews"
            title="Stories of"
            highlight="Trust"
          />
          {/* Rating + Controls */}
          <div className="flex items-center gap-8 shrink-0 pb-6 border-b border-gray-200 self-end w-full lg:w-auto">
            <div className="flex items-center gap-4 border-l border-brand-green/30 pl-5">
              <span className="font-display text-4xl font-700 text-brand-darker">5.0</span>
              <div>
                <div className="flex gap-0.5 text-amber-500 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Client Rating
                </p>
              </div>
            </div>
            <div className="flex gap-3 ml-auto">
              <button
                onClick={prev}
                className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-brand-dark transition-colors"
              >
                <div className="w-8 h-px bg-gray-300 group-hover:bg-brand-dark transition-colors" />
                Prev
              </button>
              <button
                onClick={next}
                className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-brand-dark transition-colors"
              >
                Next
                <div className="w-8 h-px bg-gray-300 group-hover:bg-brand-dark transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="flex-[0_0_calc(100%-1.5rem)] sm:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(33.33%-1rem)] min-w-0 group"
              >
                <div className="relative bg-white border border-gray-100 p-8 h-full hover:border-brand-green/30 hover:shadow-[0_12px_40px_-8px_rgba(43,95,43,0.12)] transition-all duration-500">
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-brand-green group-hover:w-full transition-all duration-500" />

                  <div className="flex gap-0.5 mb-6 text-amber-500">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} size={13} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>

                  <blockquote className="text-gray-600 text-sm leading-relaxed mb-8 italic">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-none bg-brand-green/10 border border-brand-green/20 flex items-center justify-center font-display font-700 text-brand-green text-sm">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wide text-brand-darker">{r.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{r.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
