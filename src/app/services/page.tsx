import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Figure from "@/components/Figure";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import {
  business,
  getWhatsAppHref,
  isExternalUrl,
  services,
} from "@/data/business";
import { photos } from "@/lib/photos";
import { getBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Car Services, Repairs & Car Wash in Aya Nagar",
  description: `Car servicing, mechanic repairs, car wash, dent removal, AC repair, brakes, battery and tyres at ${business.name}, Aya Nagar, New Delhi. Price confirmed after inspection.`,
  path: "/services/",
});

const groups = ["Maintenance", "Diagnostics", "Repairs", "Safety", "Comfort", "Care", "Bodywork"] as const;

const groupCopy: Record<(typeof groups)[number], string> = {
  Maintenance: "Scheduled servicing and condition checks that keep the car on the road.",
  Diagnostics: "Warning lights and running faults traced before parts are replaced.",
  Repairs: "Mechanical, electrical and body-part work for a specific concern.",
  Safety: "Brakes, suspension, tyres, battery and lights checked as safety items.",
  Comfort: "Air conditioning and cabin issues that affect how the car feels to use.",
  Care: "Washing, interior cleaning and detailing for appearance and condition.",
  Bodywork: "Dents, paint, glass and damage assessed and repaired.",
};

const symptoms = [
  ["AC not cooling", "AC Service & Repair", "ac-service-repair"],
  ["Brake noise or a soft pedal", "Brake & Suspension Checks", "brake-suspension"],
  ["Warning light on the dash", "Engine Diagnostics", "engine-diagnostics"],
  ["Dent or scrape after a knock", "Denting & Painting", "denting-painting"],
  ["Car will not start", "Battery Service", "battery-service"],
  ["Car needs a wash or interior clean", "Car Spa & Cleaning", "car-spa-cleaning"],
];

const whatsappMessage =
  "Hi Gear Go Automobiles, I need help choosing the right service for my car. My car is ____ and the issue is ____.";

export default function ServicesPage() {
  const whatsapp = getWhatsAppHref(whatsappMessage);
  const waAttrs = {
    ...(isExternalUrl(whatsapp) ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
        ])}
      />

      <PageHero
        label={`${services.length} services · All car brands`}
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Services" }]}
        title="Car services and repairs in Aya Nagar"
        lede="Maintenance, diagnostics, repairs, bodywork and cleaning. Each service starts with the car being checked, a clear scope, and your approval before paid work."
        actions={
          <>
            <a className="btn btn--primary" href={whatsapp} {...waAttrs}>
              Ask what you need <Icon name="whatsapp" size="sm" />
            </a>
            <Link className="btn btn--light" href="/book/">
              Request a service
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            label="Not sure where to start"
            title="Start with the symptom"
            lede="Pick the problem you are noticing. If it is not listed, describe it on WhatsApp and we will point you to the right service."
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
      </section>

      <section className="section section--paper">
        <div className="wrap split">
          <div>
            <SectionHead
              title="Price follows inspection"
              lede="A service page can tell you what a job usually involves. It cannot tell you the price of your car without seeing it."
            />
            <p className="lede">
              Make, model, condition and parts availability all change the scope. We check the car,
              explain the findings, and share the estimate before work begins. If something extra is
              found, it is discussed separately.
            </p>
            <ul className="spec spec--dots mt-6">
              <li>{business.policies.parts}</li>
              <li>{business.policies.pricing}</li>
              <li>{business.policies.warranty}</li>
            </ul>
          </div>
          <Figure
            photo={photos.engineBay}
            className="photo--4x3"
            sizes="(max-width: 980px) 100vw, 540px"
            showCaption
          />
        </div>
      </section>

      {groups.map((group, groupIndex) => {
        const items = services.filter((service) => service.group === group);
        return (
          <section
            className={`section section--tight${groupIndex % 2 === 1 ? " section--paper" : ""}`}
            key={group}
            id={group.toLowerCase()}
          >
            <div className="wrap">
              <div className="sec-head-row">
                <div className="sec-head">
                  <span className="label">{String(groupIndex + 1).padStart(2, "0")}</span>
                  <h2 className="sec-head__title">{group}</h2>
                  <p className="sec-head__lede">{groupCopy[group]}</p>
                </div>
                <span className="small muted">
                  {items.length} {items.length === 1 ? "service" : "services"}
                </span>
              </div>
              <div className="ledger">
                {items.map((service) => (
                  <Link className="lrow" href={`/services/${service.slug}/`} key={service.slug}>
                    <span>
                      <span className="lrow__title">{service.name}</span>
                      <span className="lrow__text">{service.shortDescription}</span>
                    </span>
                    <span className="lrow__meta">
                      Inspect &amp; quote <Icon name="arrow" size="sm" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand
        title="Describe the car and the problem."
        text="A short message is enough. We will confirm availability, inspect the car, and share the scope and estimate before work."
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
