import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myrmex.co.ke"),
  title: {
    default: "Myrmex Property Maintenance | Nairobi, Kenya",
    template: "%s | Myrmex Property Maintenance",
  },
  description:
    "Myrmex Property Maintenance — professional electrical & solar services, security systems (CCTV, electric fencing), networking, and system design in Nairobi, Kenya. Reliable technicians. Trusted equipment. Lasting results.",
  keywords: [
    "property maintenance Nairobi",
    "electrical services Kenya",
    "CCTV installation Nairobi",
    "solar panel installation Kenya",
    "security systems Nairobi",
    "electric fence installation",
    "structured cabling Kenya",
    "network installation Nairobi",
    "Wi-Fi installation Kenya",
    "system design Nairobi",
    "Myrmex Property Maintenance",
    "property maintenance Kenya",
  ],
  authors: [{ name: "Myrmex Property Maintenance" }],
  creator: "Myrmex Property Maintenance",
  publisher: "Myrmex Property Maintenance",
  openGraph: {
    title: "Myrmex Property Maintenance | Nairobi, Kenya",
    description:
      "Professional power, security, and networking maintenance services in Nairobi, Kenya. Protect your property. Simplify your life.",
    url: "https://myrmex.co.ke",
    siteName: "Myrmex Property Maintenance",
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Myrmex Property Maintenance — Professional Services in Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Myrmex Property Maintenance | Nairobi, Kenya",
    description:
      "Professional power, security, and networking maintenance services in Nairobi, Kenya.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  alternates: {
    canonical: "https://myrmex.co.ke",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Myrmex Property Maintenance",
  description:
    "Professional property maintenance services including electrical & solar, security systems (CCTV, electric fencing), networking, and system design in Nairobi, Kenya.",
  url: "https://myrmex.co.ke",
  telephone: "+254704184932",
  email: "myrmexpropertymaintenance@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: {
    "@type": "Country",
    name: "Kenya",
  },
  priceRange: "$$",
  openingHours: "Mo-Sa 08:00-18:00",
  serviceType: [
    "Electrical Services",
    "Security Systems",
    "CCTV Installation",
    "Solar Panel Installation",
    "Networking & Cabling",
    "Wi-Fi Optimization Kenya",
    "Electric Fencing",
    "System Design",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
