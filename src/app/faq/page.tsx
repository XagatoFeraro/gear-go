import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import {
  business,
  getPhoneHref,
  getPhoneLabel,
  getWhatsAppHref,
  isExternalUrl,
} from "@/data/business";
import { getBreadcrumbJsonLd, getFaqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Car Service FAQs",
  description: `Answers about car servicing, mechanic repairs, pricing, booking, parts, warranty and visiting ${business.name} in Aya Nagar, New Delhi.`,
  path: "/faq/",
});

const faqs = [
  {
    q: "How do I request a car service or mechanic near Aya Nagar?",
    a: "WhatsApp us, call, or submit the enquiry form. We will confirm availability and the next step directly. This website does not take payments or confirm bookings automatically.",
  },
  {
    q: "Do you give an estimate before work?",
    a: "Yes. We inspect the vehicle, explain findings in plain language, and share the scope and estimate. Paid work begins only after your approval.",
  },
  {
    q: "How much does car service, car wash or dent removal cost?",
    a: `${business.policies.pricing} Cost depends on the vehicle, condition and scope, which is confirmed after inspection.`,
  },
  { q: "Which car brands do you service?", a: business.brandsServicedNote },
  { q: "What parts do you use?", a: business.policies.parts },
  {
    q: "Do you offer pickup and drop-off or towing?",
    a: `${business.policies.pickupDropoff} ${business.policies.towing}`,
  },
  { q: "Do you help with insurance claims after an accident?", a: business.policies.insurance },
  { q: "Is there a workmanship warranty?", a: business.policies.warranty },
  {
    q: "How long will the service take?",
    a: "Time depends on the vehicle and work required. We will share an expected timeline after inspection or assessment.",
  },
  {
    q: "Where is the garage and what are your hours?",
    a: `${business.address.full}. Hours: ${business.hours.display.join(" · ")}.`,
  },
];

const whatsappMessage = "Hi Gear Go Automobiles, I have a question about car service.";

export default function FaqPage() {
  const whatsapp = getWhatsAppHref(whatsappMessage);
  const waAttrs = {
    ...(isExternalUrl(whatsapp) ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };

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
        label="FAQ"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "FAQ" }]}
        title="Answers before you visit"
        lede={`Clear answers about servicing, repairs, pricing, parts, warranty and visiting ${business.name} in Aya Nagar, New Delhi.`}
      />

      <section className="section">
        <div className="wrap split split--wide">
          <div>
            <SectionHead
              label="Common questions"
              title="Car service, explained"
              lede="If your question is not here, send it on WhatsApp. We will answer directly."
            />
            <div className="faqs">
              {faqs.map((item) => (
                <details className="faq" key={item.q}>
                  <summary>
                    {item.q}
                    <Icon name="plus" size="sm" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="aside">
            <div className="aside-card">
              <span className="label">Still curious</span>
              <h3 className="mt-4">Ask the garage directly</h3>
              <p>
                Share your car make, model and concern. We will tell you what we can help with and what
                happens next.
              </p>
              <div className="aside-actions">
                <a className="btn btn--primary btn--block" href={whatsapp} {...waAttrs}>
                  <Icon name="whatsapp" size="sm" /> WhatsApp us
                </a>
                <a className="btn btn--outline btn--block" href={getPhoneHref()}>
                  <Icon name="phone" size="sm" /> {getPhoneLabel()}
                </a>
                <Link className="btn btn--outline btn--block" href="/book/">
                  Send an enquiry form
                </Link>
              </div>
            </div>

            <div className="aside-card">
              <h3>Workshop hours</h3>
              <div className="hours">
                {business.hours.display.map((row) => {
                  const [day, ...rest] = row.split(": ");
                  return (
                    <div className="hours__row" key={row}>
                      <strong>{day}</strong>
                      <span>{rest.join(": ")}</span>
                    </div>
                  );
                })}
              </div>
              <p className="aside-note">{business.address.full}</p>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Prefer a conversation?"
        text="Call or WhatsApp with your car details. No payment is taken online and no booking is confirmed automatically."
        actions={
          <>
            <a className="btn btn--dark" href={whatsapp} {...waAttrs}>
              WhatsApp us <Icon name="whatsapp" size="sm" />
            </a>
            <Link className="btn btn--outline" href="/contact/">
              Contact &amp; directions
            </Link>
          </>
        }
      />
    </>
  );
}
