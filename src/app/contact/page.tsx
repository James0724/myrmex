import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import AppointmentForm from "@/components/contact/AppointmentForm";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin, CheckCircle2 } from "lucide-react";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Myrmex Property Maintenance — book a free consultation or send us a message.",
};

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+254 704 184 932",
    href: "tel:+254704184932",
  },
  {
    icon: Mail,
    label: "Email",
    value: "myrmexpropertymaintenance@gmail.com",
    href: "mailto:myrmexpropertymaintenance@gmail.com",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon–Sat: 8AM – 6PM",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Get In Touch"
          title="Contact"
          highlight="Us"
          image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=75"
        />

        {/* Contact info strip */}
        <div className="bg-brand-green">
          <div className="container-main">
            <div className="grid  lg:grid-cols-3 divide-x divide-white/20">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 py-6 px-4 lg:px-8 text-white group hover:bg-white/10 transition-colors"
                >
                  <div className="w-9 h-9 border border-white/30 flex items-center justify-center shrink-0 group-hover:border-white transition-colors">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">
                      {label}
                    </p>
                    <p className="font-semibold text-sm leading-tight">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Forms */}
        <section className="py-24 lg:py-32 bg-brand-off-white">
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Send a message */}
              <div className="bg-white border border-gray-100 p-8 lg:p-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-300 block mb-4">
                  01
                </span>
                <h2 className="font-display text-4xl font-700 text-brand-darker uppercase leading-tight mb-2">
                  Send a Message
                </h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Have a question or need more information? Drop us a message
                  and we&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>

              {/* Book consultation */}
              <div className="bg-brand-darker border border-gray-800 p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-600 block">
                    02
                  </span>
                  <span className="bg-brand-green text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
                    Free
                  </span>
                </div>
                <h2 className="font-display text-4xl font-700 text-white uppercase leading-tight mb-2">
                  Book a Consultation
                </h2>
                <p className="text-white/40 text-sm mb-8 leading-relaxed">
                  Schedule an on-site visit for a full assessment of your
                  property systems — no obligation.
                </p>
                <AppointmentForm dark />
              </div>
            </div>
          </div>
        </section>
        {/* Location + Why Contact Us strip */}
        <section className="relative overflow-hidden mb-40">
          <div className="grid lg:grid-cols-2 min-h-[460px]">
            {/* Left: image with overlay */}
            <div className="relative min-h-[320px] lg:min-h-0">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80"
                alt="Myrmex service area Nairobi"
                fill
                className="object-cover brightness-50"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-brand-darker/60 hidden lg:block" />
              <div className="absolute inset-0 flex flex-col justify-end p-10 z-10">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="text-brand-orange mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-wide">
                      Service Area
                    </p>
                    <p className="text-white/60 text-xs mt-1 leading-relaxed">
                      Nairobi and surrounding regions, Kenya.
                      <br />
                      Available for residential & commercial properties.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: why contact us */}
            <div className="bg-brand-darker flex flex-col justify-center px-8 py-16 lg:px-14">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-0.5 w-8 bg-brand-orange block" />
                <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em]">
                  Why Reach Out
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-700 text-white uppercase leading-tight mb-6">
                We&apos;re Ready
                <br />
                <span className="text-brand-green-muted">When You Are</span>
              </h3>
              <ul className="space-y-4">
                {[
                  "Free on-site assessment within Nairobi — a commitment fee applies outside",
                  "Same-day response for urgent faults",
                  "Transparent itemised quotes before any work",
                  "Certified technicians for every job",
                  "After-service support included",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-white/70 text-xs"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-brand-green shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-6">
                <a
                  href="tel:+254704184932"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 border border-brand-orange/40 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300 shrink-0">
                    <Phone
                      size={14}
                      className="text-brand-orange group-hover:text-brand-darker transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">
                      Call Us
                    </p>
                    <p className="text-white text-xs font-semibold">
                      +254 704 184 932
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:myrmexpropertymaintenance@gmail.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 border border-brand-green/40 flex items-center justify-center group-hover:bg-brand-green group-hover:border-brand-green transition-all duration-300 shrink-0">
                    <Mail
                      size={14}
                      className="text-brand-green group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">
                      Email Us
                    </p>
                    <p className="text-white text-xs font-semibold truncate">
                      myrmexpropertymaintenance@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
