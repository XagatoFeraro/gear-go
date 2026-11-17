import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Figure from "@/components/Figure";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import {
  business,
  getPhoneHref,
  getPhoneLabel,
  getWhatsAppHref,
  isExternalUrl,
  services,
  serviceAreas,
} from "@/data/business";
import { photos } from "@/lib/photos";
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
  const waAttrs = {
    ...(isExternalUrl(whatsapp) ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };

  const related = services
    .filter((s) => s.group === service.group && s.slug !== service.slug)
    .slice(0, 3);
  const fallbackRelated = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const relatedServices = related.length > 0 ? related : fallbackRelated;

  const faqs = [
    {
      q: `How do I enquire about ${service.name.toLowerCase()}?`,
      a: `WhatsApp or call ${business.name} with your car make, model and concern. We will confirm availability and the next step. You can also send an enquiry form.`,
    },
    {
      q: `What is the price for ${service.name.toLowerCase()}?`,
      a: service.priceNote,
    },
    {
      q: "Do you explain and get approval before work?",
      a: "Yes. We inspect, explain the findings in plain language, and share the scope and estimate. Work proceeds only after your approval.",
    },
    {
      q: "Which areas do you serve?",
      a: `We are in Aya Nagar, New Delhi and serve nearby areas including ${serviceAreas
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
        compact
        label={`${service.group} · Aya Nagar, New Delhi`}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/" },
          { name: service.name },
        ]}
        title={`${service.name} in Aya Nagar`}
        lede={service.shortDescription}
        actions={
          <>
            <a className="btn btn--primary" href={whatsapp} {...waAttrs}>
              WhatsApp about this <Icon name="whatsapp" size="sm" />
            </a>
            <a className="btn btn--light" href={getPhoneHref()}>
              <Icon name="phone" size="sm" /> {getPhoneLabel()}
            </a>
            <Link
              className="btn btn--light"
              href={`/book/?service=${encodeURIComponent(service.name)}`}
            >
              Enquiry form
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="wrap detail">
          <div className="detail__main">
            <h2>What this service covers</h2>
            <p>
              {service.name} at {business.name}. {business.brandsServicedNote} The exact scope depends
              on your car and what the inspection finds. This is what the job typically includes:
            </p>
            <ol className="spec mt-6">
              {service.included.map((item, i) => (
                <li key={item}>
                  <span className="spec__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <Figure
              photo={photos.engineBay}
              className="photo--3x2 photo--card"
              sizes="(max-width: 1080px) 100vw, 760px"
            />

            <h2>Signs it may need attention</h2>
            <p>
              You do not need to diagnose the problem yourself. If you notice any of these, describe it
              when you contact us and we will take it from there.
            </p>
            <ul className="spec spec--dots mt-6">
              {service.signs.map((sign) => (
                <li key={sign}>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>

            <h2>What affects cost and time</h2>
            <ol className="spec mt-6">
              {[
                ["The car", "Make, model, age and condition change the parts and labour involved."],
                ["The parts", "Grade and availability affect the price. Options are shown before fitment."],
                ["What the inspection finds", "Related wear or damage can change the scope once the car is checked."],
              ].map(([title, text], i) => (
                <li key={title}>
                  <span className="spec__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{title}.</strong> {text}
                  </span>
                </li>
              ))}
            </ol>

            <h2>How the visit works</h2>
            <div className="steps steps--compact-mobile mt-6">
              {[
                ["Tell us the concern", "Share the car details and symptoms on WhatsApp or by form."],
                ["Inspection", "We check the reported concern and the related systems."],
                ["Estimate and approval", "Findings, options and price are shared. You approve before work."],
                ["Service and handover", "The agreed work is completed and explained clearly."],
              ].map(([title, text], i) => (
                <div className="step" key={title}>
                  <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="step__title">{title}</h3>
                  <p className="step__text">{text}</p>
                </div>
              ))}
            </div>

            <h2>Questions</h2>
            <div className="faqs">
              {faqs.map((faq) => (
                <details className="faq" key={faq.q}>
                  <summary>
                    {faq.q}
                    <Icon name="plus" size="sm" />
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>

            <h2>Nearby areas</h2>
            <p>
              Our workshop is in Aya Nagar, New Delhi. Customers travel to us from across South Delhi
              and NCR for this service.
            </p>
            <div className="area-links mt-4">
              {serviceAreas.slice(0, 8).map((area) => (
                <Link href={`/service-areas/${area.slug}/`} key={area.slug}>
                  {area.name}
                </Link>
              ))}
            </div>
          </div>

          <aside className="aside">
            <div className="aside-card">
              <h3>Request this service</h3>
              <p>Send the car details and concern. We will confirm availability and the next step.</p>
              <div className="aside-actions">
                <a className="btn btn--primary btn--block" href={whatsapp} {...waAttrs}>
                  <Icon name="whatsapp" size="sm" /> WhatsApp about this
                </a>
                <a className="btn btn--outline btn--block" href={getPhoneHref()}>
                  <Icon name="phone" size="sm" /> {getPhoneLabel()}
                </a>
                <Link
                  className="btn btn--outline btn--block"
                  href={`/book/?service=${encodeURIComponent(service.name)}`}
                >
                  Send an enquiry form
                </Link>
              </div>
              <p className="aside-note">
                No payment is taken online. Availability, scope and estimate are confirmed directly by
                the garage.
              </p>
            </div>

            <div className="aside-card">
              <h3>Workshop</h3>
              <p>{business.address.full}</p>
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
              <a
                className="text-link mt-4"
                href={business.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <Icon name="external" size="sm" />
              </a>
            </div>

            <Figure
              photo={photos.asideWheel}
              className="aside-photo photo--card"
              sizes="(max-width: 980px) 100vw, 360px"
            />
          </aside>
        </div>
      </section>

      <section className="section section--tight section--paper">
        <div className="wrap">
          <div className="sec-head-row">
            <div className="sec-head">
              <span className="label">Related</span>
              <h2 className="sec-head__title">Other {service.group.toLowerCase()} services</h2>
            </div>
            <Link className="btn btn--outline btn--sm" href="/services/">
              All services <Icon name="arrow" size="sm" />
            </Link>
          </div>
          <div className="ledger">
            {relatedServices.map((item) => (
              <Link className="lrow" href={`/services/${item.slug}/`} key={item.slug}>
                <span>
                  <span className="lrow__title">{item.name}</span>
                  <span className="lrow__text">{item.shortDescription}</span>
                </span>
                <span className="lrow__meta">
                  Inspect &amp; quote <Icon name="arrow" size="sm" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Need ${service.name.toLowerCase()}?`}
        text="Start with a message. We will confirm availability, inspect the car, and share the scope and estimate before work."
        actions={
          <>
            <a className="btn btn--dark" href={whatsapp} {...waAttrs}>
              WhatsApp now <Icon name="whatsapp" size="sm" />
            </a>
            <Link className="btn btn--outline" href="/book/">
              Request service
            </Link>
          </>
        }
      />
    </>
  );
}
