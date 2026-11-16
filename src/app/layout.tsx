import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import JsonLd from "@/components/JsonLd";
import { business } from "@/data/business";
import { getLocalBusinessJsonLd, getSiteUrl } from "@/lib/seo";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const site = getSiteUrl();
const siteUrl = site.includes("example.com") ? undefined : site;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: `Car Service & Mechanic in Aya Nagar, New Delhi | ${business.name}`,
    template: `%s | ${business.name}`,
  },
  description:
    "Trusted multi-brand car garage in Aya Nagar, New Delhi. Car servicing, mechanic repairs, AC service, car wash, denting & painting, brakes, battery, tyres and diagnostics. Call or WhatsApp for a quick response.",
  keywords: [
    "car service Aya Nagar",
    "mechanic near me",
    "garage near me",
    "car servicing New Delhi",
    "car wash Aya Nagar",
    "dent removal Aya Nagar",
    "denting painting New Delhi",
    "car AC repair",
    "multi-brand car service",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: business.name,
    title: `Car Service & Mechanic in Aya Nagar, New Delhi | ${business.name}`,
    description:
      "Multi-brand car service, repairs, car wash, denting & painting in Aya Nagar, New Delhi. Call or WhatsApp for quick help.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
  category: "automotive",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1410",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${bodyFont.variable}`}>
      <body>
        <JsonLd data={getLocalBusinessJsonLd()} />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main" className="site-main">{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
