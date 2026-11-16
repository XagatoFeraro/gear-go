import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { business } from "@/data/business";
import { getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Car Service FAQs",
  description: `Answers about car servicing, mechanic repairs, pricing, booking, parts, warranty and visiting ${business.name} in Aya Nagar, New Delhi.`,
  alternates: { canonical: "/faq/" },
};

const faqs = [
  { q: "How do I request a car service or mechanic near Aya Nagar?", a: "WhatsApp us, call, or submit the enquiry form. We’ll confirm availability and the next step directly. This website does not take payments or confirm bookings automatically." },
  { q: "Do you give an estimate before work?", a: "Yes. We inspect the vehicle, explain findings in plain language, and share the scope and estimate. Paid work begins only after your approval." },
  { q: "How much does car service, car wash or dent removal cost?", a: `${business.policies.pricing} Cost depends on the vehicle, condition and scope — confirmed after inspection.` },
  { q: "Which car brands do you service?", a: business.brandsServicedNote },
  { q: "What parts do you use?", a: business.policies.parts },
  { q: "Do you offer pickup and drop-off or towing?", a: `${business.policies.pickupDropoff} ${business.policies.towing}` },
  { q: "Do you help with insurance claims after an accident?", a: business.policies.insurance },
  { q: "Is there a workmanship warranty?", a: business.policies.warranty },
  { q: "How long will the service take?", a: "Time depends on the vehicle and work required. We’ll share an expected timeline after inspection/assessment." },
  { q: "Where is the garage and what are your hours?", a: `${business.address.full}. Hours: ${business.hours.display.join(" · ")}.` },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[getBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq/" }]), getFaqJsonLd(faqs)]} />
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <p className="breadcrumb"><Link href="/">Home</Link> / FAQ</p>
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h1>Frequently asked questions</h1>
            <p className="lead">Clear answers about car servicing, repairs, pricing, parts, warranty and visiting {business.name} in Aya Nagar, New Delhi.</p>
          </div>
          <div className="faq">
            {faqs.map((item) => (
              <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>
            ))}
          </div>
          <div className="callout" style={{ marginTop: "2rem" }}>
            <h2>Still have a question?</h2>
            <p className="muted">Send your car details and concern — we’ll guide you on the next step.</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/contact">Contact / WhatsApp</Link>
              <Link className="btn btn-secondary" href="/book">Request service</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
