import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

const services = [
  { label: "Power Systems & Electrical", href: "/services#power" },
  { label: "Security Systems", href: "/services#security" },
  { label: "Networking & Communication", href: "/services#networking" },
  { label: "Routine Assessments", href: "/services#assessment" },
  { label: "System Design & Drawings", href: "/services#design" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-darker text-white">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <div className="relative shrink-0 h-14 w-64 -ml-8 overflow-visible">
                <Image
                  src="/logo.png"
                  alt="Myrmex Property Maintenance"
                  width={320}
                  height={100}
                  priority
                  className="
      absolute
      top-1/2
      -translate-y-1/2
      h-55
      w-auto
      object-contain
      brightness-0
      invert
    "
                />
              </div>
            </Link>

            <div className="flex gap-3">
              {[
                { label: "FB", href: "#" },
                { label: "IG", href: "#" },
                { label: "IN", href: "#" },
              ].map(({ label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors duration-200 text-xs font-bold text-gray-300"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-700 mb-5 text-white uppercase tracking-wide">
              Our Services
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-gray-400 text-sm hover:text-brand-green-muted transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-green group-hover:w-2 transition-all duration-200" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-700 mb-5 text-white uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-400 text-sm hover:text-brand-green-muted transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-green group-hover:w-2 transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-700 mb-5 text-white uppercase tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin
                  size={16}
                  className="text-brand-green mt-0.5 shrink-0"
                />
                <span>Nairobi, Kenya</span>
              </li>
              <li>
                <a
                  href="tel:+254704184932"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-brand-green-muted transition-colors"
                >
                  <Phone size={16} className="text-brand-green shrink-0" />
                  +254 704 184 932
                </a>
              </li>
              <li>
                <a
                  href="mailto:myrmexpropertymaintenance@gmail.com"
                  className="flex items-center gap-3 text-xs text-gray-400 hover:text-brand-green-muted transition-colors"
                >
                  <Mail size={16} className="text-brand-green  shrink-0" />
                  myrmexpropertymaintenance@gmail.com
                </a>
              </li>
            </ul>

            <Link
              href="/contact"
              className="btn-fill bg-brand-green text-white text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 inline-flex items-center gap-2 mt-3 hover:text-white transition-colors"
            >
              REQUEST A CALLBACK
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Myrmex Property Maintenance. All rights
            reserved.
          </p>
          <p className="text-gray-600 text-xs italic">
            &quot;Protect your property, Simplify your life.&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
