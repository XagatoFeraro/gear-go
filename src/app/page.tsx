import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import EnquiryForm from "@/components/EnquiryForm";
import Figure from "@/components/Figure";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MapEmbed from "@/components/MapEmbed";
import PhotoTile from "@/components/PhotoTile";
import SectionHead from "@/components/SectionHead";
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
import { getFaqJsonLd } from "@/lib/seo";

const homeFaqs = [
  {
    q: "How do I request a car service?",
    a: "Message us on WhatsApp, call, or send the enquiry form with your car and concern. We will confirm availability and the next step directly. No online payment or automatic booking.",
  },
  {
    q: "Do you provide an estimate before work?",
    a: "Yes. We inspect the vehicle, explain the findings in plain language, and share the scope and estimate. Work begins only after your approval.",
  },
  {
    q: "What car services do you offer near Aya Nagar?",
    a: "Periodic servicing, mechanical and electrical repairs, AC service, car wash and detailing, denting and painting, brakes, battery, tyres, diagnostics and inspections. All car brands.",
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

const facts = [
  ["All car brands", "Servicing and repairs for any make or model"],
  ["Inspection first", "Findings checked before we recommend anything"],
  ["Estimate before work", "You approve the scope and price first"],
  ["Aya Nagar workshop", "Phase 4, H Block, behind Fitness Club Gym"],
];

const featured = [
  {
    slug: "periodic-car-service",
    title: "Periodic Car Service",
    text: "Oil, filters, fluids and a multi-point check, with the scope agreed before work.",
    photo: photos.tilePeriodic,
  },
  {
    slug: "ac-service-repair",
    title: "AC Service & Repair",
    text: "Cooling checks, leak inspection and repairs for weak airflow or warm air.",
    photo: photos.engineBay,
  },
  {
    slug: "brake-suspension",
    title: "Brake & Suspension",
    text: "Pads, discs, fluid, steering and suspension checked for safety and wear.",
    photo: photos.tileSuspension,
  },
  {
    slug: "engine-diagnostics",
    title: "Engine Diagnostics",
    text: "Warning lights and running faults traced with a scan and a physical check.",
    photo: photos.tileElectrical,
  },
  {
    slug: "denting-painting",
    title: "Denting & Painting",
    text: "Panel damage assessed, repaired and finished to match the car.",
    photo: photos.tileParts,
  },
  {
    slug: "car-spa-cleaning",
    title: "Car Spa & Cleaning",
    text: "Exterior wash, wheels, glass and a quick interior refresh in one visit.",
    photo: photos.tileSpa,
  },
];

const symptoms = [
  ["AC not cooling", "AC Service & Repair", "ac-service-repair"],
  ["Brake noise or a soft pedal", "Brake & Suspension Checks", "brake-suspension"],
  ["Warning light on the dash", "Engine Diagnostics", "engine-diagnostics"],
  ["Dent or scrape after a knock", "Denting & Painting", "denting-painting"],
  ["Car will not start", "Battery Service", "battery-service"],
  ["Service due by date or mileage", "Periodic Car Service", "periodic-car-service"],
];

const priceFactors = [
  {
    title: "The car",
    text: "Make, model, age and condition change what a job involves. A part that fits one variant may not fit another.",
  },
  {
    title: "The parts",
    text: "Grade and availability affect the price. We show the options and fit only what you approve.",
  },
  {
    title: "The damage",
    text: "What looks like one problem can involve related parts once the car is opened and checked properly.",
  },
];

const whatsappMessage =
  "Hi Gear Go Automobiles, I need car service. My car is ____ and the issue/service needed is ____. My location is ____.";

export default function Home() {
  const whatsapp = getWhatsAppHref(whatsappMessage);
  const waAttrs = {
    ...(isExternalUrl(whatsapp) ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };

  return (
    <>
      <JsonLd data={getFaqJsonLd(homeFaqs)} />

      <section className="hero">
        <div className="wrap hero__inner">
          <div>
            <span className="label">Multi-brand workshop · Aya Nagar, New Delhi</span>
            <h1>Car service and repairs in Aya Nagar.</h1>
            <p className="hero__lede">
              Servicing, mechanics, AC, brakes, bodywork and cleaning under one roof. We inspect the
              car, explain what it needs, and start only after you approve the estimate.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href={whatsapp} {...waAttrs}>
                <Icon name="whatsapp" size="sm" /> WhatsApp us
              </a>
              <a className="btn btn--light" href={getPhoneHref()}>
                <Icon name="phone" size="sm" /> {getPhoneLabel()}
              </a>
              <a
                className="btn btn--light"
                href={business.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Directions <Icon name="arrow" size="sm" />
              </a>
            </div>
            <div className="hero__meta">
              <span>
                <Icon name="pin" size="sm" />
                <span>
                  <strong>{business.address.line1}</strong>, {business.address.line2}, New Delhi{" "}
                  {business.address.postalCode}
                </span>
              </span>
              <span>
                <Icon name="clock" size="sm" />
                <span>{business.hours.display.join(" · ")}</span>
              </span>
            </div>
          </div>

          <div className="hero__card">
            <div className="form__head">
              <h2>Request a service</h2>
              <p className="hero__card-head-note">
                We reply by phone or WhatsApp. No payment is taken online.
              </p>
            </div>
            <EnquiryForm variant="hero" />
          </div>
        </div>
      </section>

      <div className="facts">
        <div className="wrap facts__inner">
          {facts.map(([k, v]) => (
            <div className="facts__item" key={k}>
              <span className="facts__k">{k}</span>
              <span className="facts__v">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bleed" style={{ paddingTop: 40 }}>
        <Figure photo={photos.bandLift} className="photo--band" sizes="100vw" />
      </div>

      <section className="section">
        <div className="wrap">
          <SectionHead
            label="Services"
            title="Twenty jobs, one workshop"
            lede="Routine maintenance, diagnostics, repairs, bodywork and cleaning. Every job starts with the car being checked, not with a guess over the phone."
            action={
              <Link className="btn btn--outline" href="/services/">
                All {services.length} services <Icon name="arrow" size="sm" />
              </Link>
            }
          />
          <div className="tiles">
            {featured.map((item, index) => (
              <PhotoTile
                key={item.slug}
                href={`/services/${item.slug}/`}
                title={item.title}
                text={item.text}
                photo={item.photo}
                idx={index}
              />
            ))}
          </div>
          <p className="photo-note">
            Illustrative images, not our workshop. They will be replaced with real Gear Go photos.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap split split--wide">
          <div>
            <SectionHead
              title="Start with the symptom"
              lede="If you are not sure which service you need, pick the problem you are noticing. Each link opens the relevant service page."
            />
            <div className="rows">
              {symptoms.map(([symptom, service, slug]) => (
                <Link className="row" href={`/services/${slug}/`} key={slug}>
                  <span className="row__main">
                    <span className="row__title">{symptom}</span>
                    <span className="row__meta">{service}</span>
                  </span>
                  <Icon name="arrow" size="sm" />
                </Link>
              ))}
            </div>
          </div>
          <aside className="note-card">
            <h3>Not on the list?</h3>
            <p>
              Describe the noise, warning light or behaviour on WhatsApp. A photo or short video
              helps us tell you what the visit should cover before you travel.
            </p>
            <div className="aside-actions">
              <a className="btn btn--primary btn--block" href={whatsapp} {...waAttrs}>
                <Icon name="whatsapp" size="sm" /> Ask on WhatsApp
              </a>
              <Link className="btn btn--outline btn--block" href="/book/">
                Send an enquiry form
              </Link>
            </div>
            <p className="aside-note">
              {business.brandsServicedNote}
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            title="How a visit works"
            lede="The same four steps for a routine service or a specific repair."
          />
          <div className="steps">
            {[
              ["Tell us the car and the problem", "WhatsApp, call or use the form. A photo or short video helps."],
              ["We inspect and diagnose", "At the workshop, we check the reported concern and related systems."],
              ["You see the scope and estimate", "Findings, parts options and price, explained before any work."],
              ["Approved work is completed", "We finish the agreed job and explain the handover clearly."],
            ].map(([title, text], i) => (
              <div className="step" key={title}>
                <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="step__title">{title}</h3>
                <p className="step__text">{text}</p>
              </div>
            ))}
          </div>
          <p className="note mt-6">
            <Icon name="info" size="sm" />
            <span>
              This website is an enquiry channel only. No payment is taken and no booking is confirmed
              automatically. {business.policies.pricing}
            </span>
          </p>
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap">
          <span className="label">Pricing</span>
          <h2 className="h2 mt-4" style={{ maxWidth: "30ch" }}>
            Why the price comes after inspection
          </h2>
          <p className="lede mt-4" style={{ color: "rgba(255,255,255,.72)" }}>
            A car is not a fixed menu. These three things decide the scope, which is why we look first
            and quote after.
          </p>
          <div className="price__grid">
            {priceFactors.map((factor, i) => (
              <div className="price__item" key={factor.title}>
                <span className="price__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="price__title">{factor.title}</h3>
                <p className="price__text">{factor.text}</p>
              </div>
            ))}
          </div>
          <div className="price__note">
            <span>
              <strong>What we will not do:</strong> quote a number before seeing the car, or add work
              you have not approved.
            </span>
            <Link className="btn btn--light btn--sm" href="/why-gear-go/">
              How we work <Icon name="arrow" size="sm" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap split split--wide">
          <div>
            <SectionHead
              title="One workshop in Aya Nagar"
              lede="Our workshop is in Phase 4, H Block, behind Fitness Club Gym. Car owners travel to us from nearby South Delhi and NCR localities."
            />
            <div className="area-links">
              {serviceAreas.map((area) => (
                <Link href={`/service-areas/${area.slug}/`} key={area.slug}>
                  {area.name}
                </Link>
              ))}
            </div>
            <h3 className="mb-4 mt-8" style={{ fontSize: 18 }}>
              Workshop hours
            </h3>
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
            <div className="btn-row mt-6">
              <a
                className="btn btn--dark"
                href={business.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <Icon name="external" size="sm" />
              </a>
              <Link className="btn btn--outline" href="/service-areas/">
                All service areas
              </Link>
            </div>
          </div>
          <MapEmbed title="Gear Go Automobiles workshop location in Aya Nagar, New Delhi" />
        </div>
      </section>

      <section className="section">
        <div className="wrap split split--wide">
          <div>
            <SectionHead
              title="Answers before you visit"
              lede="How enquiries, inspection, estimates and approvals work."
            />
            <div className="faqs">
              {homeFaqs.map((faq) => (
                <details className="faq" key={faq.q}>
                  <summary>
                    {faq.q}
                    <Icon name="plus" size="sm" />
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-4">
              <Link className="text-link" href="/faq/">
                Read all FAQs <Icon name="arrow" size="sm" />
              </Link>
            </p>
          </div>
          <aside className="aside-card">
            <h3>Reach the garage</h3>
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
            <div className="aside-actions">
              <a className="btn btn--primary btn--block" href={whatsapp} {...waAttrs}>
                <Icon name="whatsapp" size="sm" /> WhatsApp now
              </a>
              <a className="btn btn--outline btn--block" href={getPhoneHref()}>
                <Icon name="phone" size="sm" /> {getPhoneLabel()}
              </a>
              <Link className="btn btn--outline btn--block" href="/book/">
                Send an enquiry form
              </Link>
            </div>
            <p className="aside-note">{business.policies.pricing}</p>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Tell us what the car is doing."
        text="A message is enough to start. You will see the inspection findings and estimate before any paid work begins."
        actions={
          <>
            <a className="btn btn--dark" href={whatsapp} {...waAttrs}>
              WhatsApp us <Icon name="whatsapp" size="sm" />
            </a>
            <Link className="btn btn--outline" href="/book/">
              Request a service <Icon name="arrow" size="sm" />
            </Link>
          </>
        }
      />
    </>
  );
}
