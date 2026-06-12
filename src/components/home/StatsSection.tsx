"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { end: 500, suffix: "+", label: "Projects Completed", sub: "Residential & commercial" },
  { end: 5,   suffix: "+", label: "Years of Excellence", sub: "In property maintenance" },
  { end: 98,  suffix: "%", label: "Client Satisfaction", sub: "Positive feedback rate" },
  { end: 24,  suffix: "/7", label: "Emergency Support",  sub: "Always available" },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(ease * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-brand-darker py-20 overflow-hidden relative border-t-4 border-brand-orange">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,142,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,142,60,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-main relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-brand-green-mid/25">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center px-6 py-8"
            >
              <div className="font-display text-5xl sm:text-6xl font-700 text-brand-orange mb-1 leading-none">
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-white font-semibold text-sm mt-1">{s.label}</div>
              <div className="text-brand-green-muted text-xs mt-0.5">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
