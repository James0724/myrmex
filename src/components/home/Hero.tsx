"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1800&q=75",
    eyebrow: "Electrical & Solar",
    headline: "Reliable Electrical Solutions",
    sub: "From distribution boards to solar — built to last.",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=75",
    eyebrow: "Security Systems",
    headline: "Complete Property Protection",
    sub: "CCTV surveillance and electric fencing for layered property protection.",
  },
  {
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1800&q=75",
    eyebrow: "Solar Energy",
    headline: "Sustainable Power for Your Property",
    sub: "Off-grid and backup solar systems, designed for critical loads.",
  },
  {
    img: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1800&q=75",
    eyebrow: "Networking",
    headline: "Connected Infrastructure",
    sub: "Structured cabling, Wi-Fi, and network management.",
  },
  {
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=75",
    eyebrow: "Property Maintenance",
    headline: "Protect Your Property",
    sub: "Professional, smart, and lasting maintenance solutions.",
  },
];

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxNDE0MTQiLz48L3N2Zz4=";

function Slide({
  slide,
  priority,
  active,
}: {
  slide: (typeof slides)[0];
  priority: boolean;
  active: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="embla__slide relative h-dvh min-h-150 overflow-hidden">
      <Image
        src={slide.img}
        alt={slide.headline}
        fill
        priority={priority}
        quality={75}
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        sizes="100vw"
        className={`object-cover animate-camera-pan brightness-[0.38] transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/70 z-10" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent z-10" />

      {/* Slide content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container-main w-full">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={slide.headline}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl ml-0 sm:ml-12 lg:ml-16"
              >
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-3 mb-5"
                >
                  <span className="h-0.5 w-10 bg-brand-orange" />
                  <span className="text-brand-orange text-xs font-bold uppercase tracking-[0.3em]">
                    {slide.eyebrow}
                  </span>
                </motion.div>

                {/* Headline */}
                <div className="overflow-hidden mb-4">
                  <motion.h1
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-display text-6xl sm:text-7xl lg:text-8xl font-800 text-white uppercase leading-none"
                  >
                    {slide.headline}
                  </motion.h1>
                </div>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-white/70 text-base sm:text-lg mb-10 leading-relaxed"
                >
                  {slide.sub}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    href="/contact"
                    className="btn-fill bg-brand-green text-white text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-none inline-flex items-center gap-2 hover:text-white transition-colors"
                  >
                    Free Consultation <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/services"
                    className="text-white text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 border border-white/30 hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                  >
                    Our Services
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
    Fade(),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setActiveIdx(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section className="relative h-dvh min-h-150 overflow-hidden bg-brand-darker">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide, i) => (
            <Slide
              key={i}
              slide={slide}
              priority={i === 0}
              active={activeIdx === i}
            />
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:bg-brand-green hover:border-brand-green transition-all duration-200"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:bg-brand-green hover:border-brand-green transition-all duration-200"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-0.75 transition-all duration-500 ${
              activeIdx === i ? "w-8 bg-brand-green" : "w-3 bg-white/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Stats strip at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 hidden lg:block">
        <div className="container-main">
          <div className="flex gap-0 w-fit ml-auto mb-12">
            {[
              { v: "500+", l: "Projects" },
              { v: "5+", l: "Years" },
              { v: "98%", l: "Satisfaction" },
            ].map(({ v, l }, i) => (
              <div
                key={l}
                className={`text-center px-8 py-4 ${i < 2 ? "border-r border-white/15" : ""} bg-black/30 backdrop-blur-sm`}
              >
                <div className="font-display text-2xl font-800 text-white">
                  {v}
                </div>
                <div className="text-white/50 text-[10px] uppercase tracking-widest font-medium">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
