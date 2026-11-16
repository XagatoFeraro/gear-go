import Link from "next/link";
import CarArt from "@/components/CarArt";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MapArt from "@/components/MapArt";
import ProcessVisual from "@/components/ProcessVisual";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import {
  business,
  getPhoneHref,
  getPhoneLabel,
  getWhatsAppHref,
  isExternalUrl,
  services,
  serviceAreas,
} from "@/data/business";
import { getFaqJsonLd } from "@/lib/seo";

const homeFaqs = [
  {
    q: "How do I book a car service?",
    a: "Message us on WhatsApp, call, or send an enquiry form with your car and concern. We’ll confirm availability and the next step directly. No online payment or automatic booking.",
  },
  {
    q: "Do you provide an estimate before work?",
    a: "Yes. We inspect the vehicle, explain findings in plain language, and share the scope and estimate. Work begins only after your approval.",
  },
  {
    q: "What car services do you offer near Aya Nagar?",
    a: "We offer periodic car servicing, mechanic and electrical repairs, AC service, car wash and detailing, denting and painting (dent removal), brakes, battery, tyres, diagnostics, inspections and more for all car brands.",
  },
  {
    q: "What parts do you use and is there a warranty?",
    a: `${business.policies.parts} ${business.policies.warranty}`,
  },
  {
    q: "Do you offer pickup, drop-off, towing or insurance help?",
    a: `${business.policies.pickupDropoff} ${business.policies.towing} ${business.policies.insurance}`,
  },
];

const trustItems = [
  { icon: "search" as const, text: "Inspection before recommendations" },
  { icon: "shield" as const, text: "Your approval before paid work" },
  { icon: "checkCircle" as const, text: "All car brands & models" },
  { icon: "pin" as const, text: "Aya Nagar · South Delhi" },
];

const whyPoints = [
  { title: "See the reason behind the repair", text: "We check the vehicle first, then explain what we found and why it matters — in plain language." },
  { title: "Approve the scope and estimate", text: "Paid work starts only after you’ve seen the scope and estimate. No surprise additions." },
  { title: "Parts agreed before fitment", text: business.policies.parts },
  { title: "One local garage, most car needs", text: "Servicing, repairs, AC, brakes, battery, tyres, car wash, denting and painting in one place." },
];

const featuredSlugs = [
  "periodic-car-service",
  "ac-service-repair",
  "denting-painting",
  "car-spa-cleaning",
  "brake-suspension",
  "engine-diagnostics",
];

const whatsappMessage =
  "Hi Gear Go Automobiles, I need car service. My car is ____ and the issue/service needed is ____. My location is ____.";

export default function Home() {
  const whatsapp = getWhatsAppHref(whatsappMessage);
  const featured = featuredSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter(Boolean) as typeof services;
  const otherAreas = serviceAreas.slice(0, 9);

  return (
    <>
      <JsonLd data={getFaqJsonLd(homeFaqs)} />

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-lime">Aya Nagar · Multi-brand car service</span>
            <h1>
              Car service in Aya Nagar, <em>without the guesswork.</em>
            </h1>
            <p className="hero-lede">
              Servicing, mechanic repairs, AC, brakes, car wash, denting and painting — with a proper
              inspection first and your approval before any paid work begins.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-lime"
                href={whatsapp}
                target={isExternalUrl(whatsapp) ? "_blank" : undefined}
                rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
              >
                WhatsApp us <Icon name="whatsapp" size="sm" />
              </a>
              <a className="btn btn-outline-light" href={getPhoneHref()}>
                <Icon name="phone" size="sm" />
                {getPhoneLabel()}
              </a>
              <a
                className="btn btn-outline-light"
                href={business.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Directions <Icon name="arrow" size="sm" />
              </a>
            </div>
            <div className="hero-meta">
              <div className="item">
                <Icon name="pin" />
                <span>
                  <strong>Aya Nagar, New Delhi</strong>
                  {business.address.line1}, {business.address.line2}
                </span>
              </div>
              <div className="item">
                <Icon name="shield" />
                <span>
                  <strong>Approval before work</strong>
                  Scope and estimate shared first
                </span>
              </div>
              <div className="item">
                <Icon name="clock" />
                <span>
                  <strong>Workshop hours</strong>
                  {business.hours.display.join(" · ")}
                </span>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-glow" aria-hidden="true" />
            <div className="hero-car">
              <CarArt />
            </div>
            <div className="hero-note">
              <Icon name="shield" />
              <span>
                <strong>Inspection-first workshop</strong>
                <span>No surprise additions</span>
              </span>
            </div>
            <div className="hero-card">
              <div className="head">
                <span className="badge badge-dark no-dot">How a visit works</span>
                <span className="tiny muted">4 steps</span>
              </div>
              {[
                ["Inspect", "We check the vehicle and the concern you reported."],
                ["Explain", "Findings and options in plain language."],
                ["Approve", "You see the scope and estimate before paid work."],
                ["Repair", "Agreed work completed and handed over clearly."],
              ].map(([title, text], i) => (
                <div className="hero-card-row" key={title}>
                  <span className="hero-card-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </div>
              ))}
              <p className="hero-card-note">
                No payment is taken on this website. Enquiries are confirmed directly by the garage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="container trust-strip-inner">
          {trustItems.map((item) => (
            <span className="item" key={item.text}>
              <Icon name={item.icon} />
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title={
              <>
                Complete car care, <em className="title-em">clearly explained.</em>
              </>
            }
            lede="Twenty services covering routine maintenance, diagnostics, repairs, bodywork and cleaning. Pick a service to see what’s included and how to enquire."
            action={
              <Link className="btn btn-outline" href="/services/">
                View all {services.length} services <Icon name="arrow" size="sm" />
              </Link>
            }
          />
          <div className="service-grid">
            {featured.map((service, index) => (
              <ServiceCard service={service} index={index} key={service.slug} />
            ))}
          </div>
          <p className="pricing-note">
            Price is confirmed after inspection. Call or WhatsApp for a current estimate.
          </p>
        </div>
      </section>

      <section className="section cream">
        <div className="container split">
          <div>
            <SectionHead
              eyebrow="The Gear Go way"
              title={
                <>
                  No mystery. <em className="title-em">No surprise line items.</em>
                </>
              }
              lede="A garage visit should leave you knowing exactly what was found, what was agreed, and what you are paying for."
            />
            <div className="checklist">
              {whyPoints.map((point) => (
                <div className="checklist-row" key={point.title}>
                  <span className="check-icon">
                    <Icon name="check" />
                  </span>
                  <div>
                    <strong>{point.title}</strong>
                    <span>{point.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="btn-group mt-6">
              <Link className="btn btn-dark" href="/why-gear-go/">
                Why Gear Go <Icon name="arrow" size="sm" />
              </Link>
              <Link className="btn btn-outline" href="/book/">
                Request a service
              </Link>
            </div>
          </div>
          <ProcessVisual />
        </div>
      </section>

      <section className="section dark area-section">
        <div className="container split">
          <div>
            <SectionHead
              eyebrow="Where we serve"
              title={
                <>
                  Rooted in Aya Nagar. <br />
                  Connected across South Delhi &amp; NCR.
                </>
              }
              lede="Our workshop is in Aya Nagar, New Delhi. Customers from nearby South Delhi and NCR localities can request service — call or WhatsApp to confirm coverage and timing."
            />
            <div className="area-list">
              {otherAreas.map((area) => (
                <Link className="chip" href={`/service-areas/${area.slug}/`} key={area.slug}>
                  {area.name}
                </Link>
              ))}
              <Link className="chip chip-lime" href="/service-areas/">
                All areas <Icon name="arrow" size="sm" />
              </Link>
            </div>
            <div className="btn-group mt-6">
              <a
                className="btn btn-lime"
                href={business.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <Icon name="external" size="sm" />
              </a>
              <Link className="btn btn-outline-light" href="/contact/">
                Contact the garage
              </Link>
            </div>
          </div>
          <MapArt />
        </div>
      </section>

      <section className="section">
        <div className="container faq-cta-grid">
          <div>
            <SectionHead
              eyebrow="Common questions"
              title="Answers before you visit"
              lede="How enquiries, inspection, estimates and approvals work at Gear Go Automobiles."
            />
            <div className="faq-list">
              {homeFaqs.map((faq) => (
                <details className="faq-item" key={faq.q}>
                  <summary>
                    {faq.q}
                    <Icon name="plus" size="sm" />
                  </summary>
                  <p className="faq-a">{faq.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-4">
              <Link className="text-link" href="/faq/">
                Read all FAQs <Icon name="arrow" size="sm" />
              </Link>
            </p>
          </div>

          <aside className="visit-card">
            <span className="badge badge-lime no-dot">Visit or contact</span>
            <h2>Reach Gear Go Automobiles</h2>
            <div className="visit-row">
              <Icon name="pin" />
              <div>
                <strong>Address</strong>
                <span>{business.address.full}</span>
              </div>
            </div>
            <div className="visit-row">
              <Icon name="clock" />
              <div>
                <strong>Hours</strong>
                <span>{business.hours.display.join(" · ")}</span>
              </div>
            </div>
            <div className="visit-row">
              <Icon name="info" />
              <div>
                <strong>Pricing</strong>
                <span>{business.policies.pricing}</span>
              </div>
            </div>
            <div className="btn-group mt-4">
              <a
                className="btn btn-lime"
                href={whatsapp}
                target={isExternalUrl(whatsapp) ? "_blank" : undefined}
                rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
              >
                WhatsApp now
              </a>
              <a className="btn btn-outline" href={getPhoneHref()}>
                {getPhoneLabel()}
              </a>
            </div>
            <Link className="visit-form-link" href="/book/">
              Or send an enquiry form <Icon name="arrow" size="sm" />
            </Link>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Ready to see what your car actually needs?"
        text="Start with a message or an enquiry. You’ll see the inspection findings and estimate before any paid work begins."
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
            <Link className="btn btn-outline" href="/book/">
              Request a service <Icon name="arrow" size="sm" />
            </Link>
          </>
        }
      />
    </>
  );
}
