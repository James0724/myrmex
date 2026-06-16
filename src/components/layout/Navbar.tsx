"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
      {/* ── Desktop floating pill ── */}
      <motion.div
        animate={{
          width: scrolled ? "60%" : "100%",
          borderRadius: scrolled ? "9999px" : "0px",
          backgroundColor: scrolled ? "rgba(13,21,16,0.96)" : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          paddingTop: scrolled ? "4px" : "8px",
          paddingBottom: scrolled ? "4px" : "8px",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)"
            : "none",
        }}
        transition={{ type: "spring", stiffness: 180, damping: 30 }}
        className="hidden lg:flex items-center justify-between px-6 min-w-[800px]"
        style={{ maxWidth: "1280px" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="relative shrink-0 h-14 w-[220px] overflow-visible"
        >
          <Image
            src="/logo.png"
            alt="Myrmex Property Maintenance"
            width={320}
            height={80}
            priority
            className="
      absolute
      top-1/2
      -translate-y-1/2
      h-44
      w-auto
      object-contain
      brightness-0
      invert
    "
          />
        </Link>

        {/* Nav links — absolutely centred */}
        <nav
          className="absolute inset-0 flex items-center justify-center gap-1"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="relative px-4 py-2 text-sm font-medium text-white group"
            >
              {hoveredIdx === idx && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-brand-green/20 border border-brand-green-mid/40"
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                />
              )}
              {/* Flip text */}
              <span className="relative h-5 overflow-hidden flex items-center">
                <span className="flex flex-col transition-transform duration-300 group-hover:-translate-y-5">
                  <span className="block leading-5">{link.label}</span>
                  <span className="block leading-5 text-brand-green-muted absolute top-5">
                    {link.label}
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <a
            href="tel:+254704184932"
            className={`flex items-center gap-1.5 text-white/70 text-xs hover:text-white transition-colors ${scrolled ? "hidden" : ""}`}
          >
            <Phone size={12} className="text-brand-orange" />
            +254 704 184 932
          </a>
          <Link
            href="/contact"
            className="btn-fill bg-brand-green text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:text-white transition-colors"
          >
            Book Now
          </Link>
        </div>
      </motion.div>

      {/* ── Mobile floating pill ── */}
      <motion.div
        animate={{
          width: scrolled ? "92%" : "100%",
          borderRadius: scrolled ? "9999px" : "0px",
          backgroundColor: scrolled ? "rgba(13,21,16,0.96)" : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          paddingTop: scrolled ? "8px" : "12px",
          paddingBottom: scrolled ? "8px" : "12px",
        }}
        transition={{ type: "spring", stiffness: 180, damping: 30 }}
        className="lg:hidden flex items-center justify-between px-4"
      >
        <Link href="/" className="relative shrink-0 h-6 w-40 overflow-visible">
          <Image
            src="/logo.png"
            alt="Myrmex"
            width={320}
            height={80}
            priority
            className="absolute top-1/2 -translate-y-1/2 h-20 w-auto object-contain brightness-0 invert"
          />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-4 right-4 bg-brand-darker backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-white font-medium text-sm rounded-xl hover:bg-white/10 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="tel:+254704184932"
                className="flex items-center gap-2 text-white/80 text-xs px-4"
              >
                <Phone size={12} className="text-brand-orange" /> +254 704 184
                932
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="bg-brand-green text-white text-sm font-bold uppercase tracking-wider text-center py-3 rounded-xl hover:bg-brand-green-mid transition-colors"
              >
                Book Free Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
