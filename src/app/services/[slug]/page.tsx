import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import { getServiceIcon } from "@/lib/serviceIcons";
import {
  business,
  getPhoneHref,
  getPhoneLabel,
  getWhatsAppHref,
  isExternalUrl,
  services,
  serviceAreas,
} from "@/data/business";
import { getBreadcrumbJsonLd, getFaqJsonLd, getServiceJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const intentKeywords: Record<string, string> = {
  "periodic-car-service": "car servicing, periodic service, car maintenance",
  "car-inspection": "car inspection, pre-purchase inspection, vehicle check",
  "engine-diagnostics": "engine diagnostics, check engine light, car scan",
  "mechanical-repairs": "car mechanic, mechanical repair, car repair near me",
  "brake-suspension": "brake repair, suspension check, brake service",
  "suspension-fitments": "suspension repair, fitments, wheel alignment concerns",
  "clutch-body-parts": "clutch repair, body parts replacement",
  "electrical-repairs": "car electrical repair, wiring, starting issues",
  "battery-service": "car battery replacement, battery service, jump start",
  "tyres-wheel-care": "tyre service, wheel care, puncture, alignment",
  "ac-service-repair": "car AC repair, AC service, AC gas, cooling",
  "car-spa-cleaning": "car wash, car spa, car cleaning near me",
  "interior-cleaning": "interior car cleaning, seat and carpet cleaning",
  "detailing-services": "car detailing, polish, paint protection care",
  "denting-painting": "dent removal, denting and painting, scratch repair",
  "accidental-damage-inspection": "accident damage inspection, car damage assessment",
  "insurance-claims": "car insurance claim help, accident repair coordination",
  "windshield-lights": "windshield repair, glass and lights check",
  "lights-replacement": "car light replacement, headlight bulb",
  "custom-repair": "custom car repair, modified vehicle repair",
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const intent = intentKeywords[slug] ? ` ${intentKeywords[slug]}.` : "";
  return pageMetadata({
    title: `${service.name} in Aya Nagar, New Delhi`,
    description: `${service.name} at ${business.name}, Aya Nagar, New Delhi. ${service.shortDescription} Call or WhatsApp to confirm availability.${intent}`,
    path: `/services/${slug}/`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const whatsapp = getWhatsAppHref(
    `Hi Gear Go Automobiles, I need ${service.name} for my car (____). My location is ____. Concern: ____`,
  );

  const related = services
    .filter((s) => s.group === service.group && s.slug !== service.slug)
    .slice(0, 3);
  const fallbackRelated = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const relatedServices = related.length > 0 ? related : fallbackRelated;

  const faqs = [
    {
      q: `How do I enquire about ${service.name.toLowerCase()}?`,
      a: `WhatsApp or call ${business.name} with your car make/model and concern. We’ll confirm availability and the next step. You can also send an enquiry form.`,
    },
    {
      q: `What is the price for ${service.name.toLowerCase()}?`,
      a: service.priceNote,
    },
    {
      q: "Do you explain and get approval before work?",
      a: "Yes. We inspect, explain findings in plain language, and share the scope and estimate. Work proceeds only after your approval.",
    },
    {
      q: "Which areas do you serve?",
      a: `We are in Aya Nagar, New Delhi and serve nearby areas including ${business.serviceAreas
        .slice(0, 6)
        .map((a) => a.name)
        .join(", ")} and more. Call or WhatsApp to confirm.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: service.name, path: `/services/${service.slug}/` },
          ]),
          getServiceJsonLd(service),
          getFaqJsonLd(faqs),
        ]}
      />

      <PageHero
        eyebrow={`${service.group} · Aya Nagar, New Delhi`}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/" },
          { name: service.name },
        ]}
        title={
          <>
            {service.name} in <em>Aya Nagar, New Delhi.</em>
          </>
        }
        lede={
          <>
            {service.shortDescription} We inspect first, explain the findings and options, and proceed
            only after your approval — serving Aya Nagar and nearby South Delhi/NCR areas.
          </>
        }
        actions={
          <>
            <a
              className="btn btn-lime"
              href={whatsapp}
              target={isExternalUrl(whatsapp) ? "_blank" : undefined}
              rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            >
              WhatsApp about this <Icon name="whatsapp" size="sm" />
            </a>
            <a className="btn btn-outline-light" href={getPhoneHref()}>
              <Icon name="phone" size="sm" />
              {getPhoneLabel()}
            </a>
            <Link className="btn btn-outline-light" href={`/book/?service=${encodeURIComponent(service.name)}`}>
              Enquiry form
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="container service-detail-grid">
          <div className="service-detail-body">
            <div className="service-intro-card">
              <span className="service-icon">
                <Icon name={getServiceIcon(service)} size="lg" />
              </span>
              <div>
                <span className="badge no-dot">{service.group}</span>
                <p>
                  {service.name} at {business.name}. {business.brandsServicedNote}
                </p>
              </div>
            </div>

            <h2>What’s included</h2>
            <p>
              The exact scope depends on the vehicle and what the inspection finds. Here is what this
              service typically covers:
            </p>
            <ul className="list-check">
              {service.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Signs you may need this</h2>
            <p>
              You don’t need to diagnose the problem yourself. If you notice any of these, describe it
              when you contact us and we’ll take it from there.
            </p>
            <ul className="list-check">
              {service.signs.map((sign) => (
                <li key={sign}>{sign}</li>
              ))}
            </ul>

            <h2>How the visit works</h2>
            <div className="process-grid process-grid-sm">
              {[
                ["Contact & share concern", "Tell us your car details and what you’re experiencing."],
                ["Inspect & diagnose", "We check the vehicle/service need and identify the scope."],
                ["Estimate & approval", "We explain findings and share the estimate. You approve before work."],
                ["Service & handover", "Agreed work is completed with clear communication."],
              ].map(([title, text], i) => (
                <div className="process-card" key={title}>
                  <span className="process-index">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            <div className="callout mt-8">
              <h2>Good to know</h2>
              <ul className="list-check">
                <li>{business.policies.parts}</li>
                <li>{business.policies.pricing}</li>
                <li>{business.policies.warranty}</li>
              </ul>
            </div>

            <h2>Frequently asked questions</h2>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details className="faq-item" key={faq.q}>
                  <summary>
                    {faq.q}
                    <Icon name="plus" size="sm" />
                  </summary>
                  <p className="faq-a">{faq.a}</p>
                </details>
              ))}
            </div>

            <h2>Serving Aya Nagar &amp; nearby areas</h2>
            <p>
              Our workshop is in Aya Nagar, New Delhi. Customers travel to us from across South Delhi
              and NCR for this service.
            </p>
            <div className="chip-row">
              {serviceAreas.slice(0, 8).map((area) => (
                <Link className="chip" href={`/service-areas/${area.slug}/`} key={area.slug}>
                  {area.name}
                </Link>
              ))}
            </div>
          </div>

          <aside className="service-aside">
            <div className="card aside-card">
              <span className="eyebrow">At a glance</span>
              <h2>{service.name}</h2>
              <div className="detail-list">
                <div className="detail-row">
                  <span className="k">Category</span>
                  <span className="v">{service.group}</span>
                </div>
                <div className="detail-row">
                  <span className="k">Price</span>
                  <span className="v">Confirmed after inspection</span>
                </div>
                <div className="detail-row">
                  <span className="k">Vehicles</span>
                  <span className="v">All car brands</span>
                </div>
                <div className="detail-row">
                  <span className="k">Location</span>
                  <span className="v">Aya Nagar, New Delhi</span>
                </div>
              </div>
              <div className="aside-actions">
                <a
                  className="btn btn-lime btn-block"
                  href={whatsapp}
                  target={isExternalUrl(whatsapp) ? "_blank" : undefined}
                  rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
                >
                  <Icon name="whatsapp" size="sm" /> WhatsApp about this
                </a>
                <a className="btn btn-outline btn-block" href={getPhoneHref()}>
                  <Icon name="phone" size="sm" /> {getPhoneLabel()}
                </a>
                <Link className="btn btn-ghost btn-block" href={`/book/?service=${encodeURIComponent(service.name)}`}>
                  Send an enquiry form
                </Link>
              </div>
              <p className="aside-note">
                No payment is taken online. Availability, scope and estimate are confirmed directly by
                the garage.
              </p>
            </div>

            <div className="card aside-card aside-help">
              <h3>Not sure this is the right service?</h3>
              <p>
                Describe the symptom and share a photo or video on WhatsApp. We’ll guide you before you
                visit.
              </p>
              <a
                className="text-link"
                href={whatsapp}
                target={isExternalUrl(whatsapp) ? "_blank" : undefined}
                rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
              >
                Ask on WhatsApp <Icon name="arrow" size="sm" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section compact cream">
        <div className="container">
          <div className="section-head-row">
            <div className="section-head">
              <span className="eyebrow">Related</span>
              <h2 className="section-title">Other {service.group.toLowerCase()} services</h2>
            </div>
            <div className="section-head-action">
              <Link className="btn btn-outline btn-sm" href="/services/">
                All services <Icon name="arrow" size="sm" />
              </Link>
            </div>
          </div>
          <div className="service-grid">
            {relatedServices.map((item, index) => (
              <ServiceCard service={item} index={index} key={item.slug} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Ready to get ${service.name.toLowerCase()}?`}
        text="Fastest response on WhatsApp. You can also call or send details by form — we’ll confirm availability directly."
        actions={
          <>
            <a
              className="btn btn-dark"
              href={whatsapp}
              target={isExternalUrl(whatsapp) ? "_blank" : undefined}
              rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            >
              WhatsApp now <Icon name="whatsapp" size="sm" />
            </a>
            <Link className="btn btn-outline" href="/book/">
              Request service
            </Link>
          </>
        }
      />
    </>
  );
}
