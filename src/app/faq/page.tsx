import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import { business, getWhatsAppHref, isExternalUrl } from "@/data/business";
import { getBreadcrumbJsonLd, getFaqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Car Service FAQs",
  description: `Answers about car servicing, mechanic repairs, pricing, booking, parts, warranty and visiting ${business.name} in Aya Nagar, New Delhi.`,
  path: "/faq/",
});

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

const whatsappMessage = "Hi Gear Go Automobiles, I have a question about car service.";

export default function FaqPage() {
  const whatsapp = getWhatsAppHref(whatsappMessage);

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq/" },
          ]),
          getFaqJsonLd(faqs),
        ]}
      />

      <PageHero
        compact
        eyebrow="FAQ"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "FAQ" }]}
        title={
          <>
            Answers before <em>you visit.</em>
          </>
        }
        lede={`Clear answers about servicing, repairs, pricing, parts, warranty and visiting ${business.name} in Aya Nagar, New Delhi.`}
      />

      <section className="section">
        <div className="container faq-page-grid">
          <div>
            <SectionHead
              eyebrow="Common questions"
              title="Car service, explained"
              lede="If your question isn’t here, send it on WhatsApp — we’ll answer directly."
            />
            <div className="faq-list">
              {faqs.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>
                    {item.q}
                    <Icon name="plus" size="sm" />
                  </summary>
                  <p className="faq-a">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="faq-aside">
            <span className="badge badge-lime no-dot">Still curious?</span>
            <h2>Ask the garage directly</h2>
            <p>
              Share your car make/model and concern. We’ll tell you what we can help with and what
              happens next.
            </p>
            <a
              className="btn btn-lime btn-block"
              href={whatsapp}
              target={isExternalUrl(whatsapp) ? "_blank" : undefined}
              rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            >
              <Icon name="whatsapp" size="sm" /> WhatsApp us
            </a>
            <Link className="btn btn-outline btn-block mt-2" href="/book/">
              Send an enquiry form
            </Link>
            <div className="faq-aside-note">
              <Icon name="clock" size="sm" />
              <span>{business.hours.display.join(" · ")}</span>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Prefer a conversation?"
        text="Call or WhatsApp with your car details. No payment is taken online and no booking is confirmed automatically."
        actions={
          <>
            <a
              className="btn btn-dark"
              href={whatsapp}
              target={isExternalUrl(whatsapp) ? "_blank" : undefined}
              rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            >
              WhatsApp us <Icon name="whatsapp" size="sm" />
            </a>
            <Link className="btn btn-outline" href="/contact/">
              Contact &amp; directions
            </Link>
          </>
        }
      />
    </>
  );
}
