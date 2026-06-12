"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  "Certified, Skilled Technicians",
  "Genuine Products Only",
  "Transparent Pricing",
  "After-Service Support",
  "Health & Safety Compliant",
  "Rapid Emergency Response",
];

const FadeImage = ({
  src,
  alt,
  sizes,
  priority = false,
  delay = 0,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  delay?: number;
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`relative h-full w-full overflow-hidden transition-all ease-out ${
        loaded ? "opacity-100 shadow-2xl" : "opacity-0 shadow-none"
      }`}
      style={{ transitionDuration: "900ms", transitionDelay: `${delay}ms` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-all ease-out ${
          loaded ? "scale-100 blur-0" : "scale-110 blur-xl"
        }`}
        style={{ transitionDuration: "1400ms" }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default function IntroSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const reveal = (delay: number) => ({
    transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
  });

  return (
    <section ref={ref} className="py-24 lg:py-36 bg-white overflow-hidden">
      <div className="container-main">
        <div style={reveal(200)}>
          <SectionHeading
            eyebrow="About Myrmex"
            title="Raising the Standard of"
            highlight="Maintenance"
            description="Built on one clear purpose — deliver professional, smart, and lasting property solutions."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center mt-4">
          {/* Image mosaic */}
          <div
            className="grid grid-cols-2 gap-3 w-full lg:w-[48%] shrink-0"
            style={reveal(0)}
          >
            <div className="col-span-1 row-span-2 relative min-h-[420px]">
              <FadeImage
                src="https://res.cloudinary.com/dodivhwd8/image/upload/v1779093389/IMG_20251211_140522_te6iyy.jpg"
                alt="Myrmex technician on site"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority
              />
            </div>
            <div className="relative h-52 md:h-64">
              <FadeImage
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=75"
                alt="Electrical panel installation"
                sizes="25vw"
                delay={150}
              />
            </div>
            <div className="relative h-52 md:h-64">
              <FadeImage
                src="https://res.cloudinary.com/dodivhwd8/image/upload/v1779091976/20251206_112757_efxiqc.jpg"
                alt="Myrmex technician on site"
                sizes="25vw"
                delay={300}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 w-full">
            <p
              className="text-gray-500 text-base leading-relaxed"
              style={reveal(500)}
            >
              Myrmex Property Maintenance exists to raise the standard of
              property services in an industry often affected by{" "}
              <strong className="text-brand-dark font-semibold">
                unreliable workmanship
              </strong>{" "}
              and poor after-service support. Every project — whether a power
              system, security installation, or networking infrastructure — is
              carried out with{" "}
              <strong className="text-brand-dark font-semibold">
                precision and commitment
              </strong>
              .
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div
                  key={f}
                  className="flex items-center gap-3 border border-gray-100 bg-brand-off-white px-4 py-3 rounded-sm hover:border-brand-green/30 hover:bg-white transition-all duration-300"
                  style={{
                    transition: `opacity 0.6s ease-out ${700 + i * 80}ms, transform 0.6s ease-out ${700 + i * 80}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-16px)",
                  }}
                >
                  <CheckCircle2
                    size={16}
                    className="text-brand-green shrink-0"
                  />
                  <span className="text-xs font-bold uppercase tracking-tight text-brand-dark">
                    {f}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="flex flex-wrap items-center gap-8 mt-2"
              style={reveal(1200)}
            >
              <Link
                href="/services"
                className="btn-fill bg-brand-dark text-white text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 inline-block hover:text-white transition-colors"
              >
                Explore Services
              </Link>
              <div className="flex gap-8">
                {[
                  { v: "500+", l: "Projects Done" },
                  { v: "5+", l: "Years Active" },
                ].map(({ v, l }) => (
                  <div key={l}>
                    <span className="font-display text-3xl font-700 text-brand-darker block">
                      {v}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                      {l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
