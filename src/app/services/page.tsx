import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import {
  business,
  getWhatsAppHref,
  isExternalUrl,
  services,
} from "@/data/business";
import { getBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Car Services, Repairs & Car Wash in Aya Nagar",
  description: `Car servicing, mechanic repairs, car wash, dent removal, AC repair, brakes, battery, tyres and more at ${business.name}, Aya Nagar, New Delhi. Price confirmed after inspection. Call or WhatsApp.`,
  path: "/services/",
});

const popular = [
  "periodic-car-service",
  "ac-service-repair",
  "denting-painting",
  "car-spa-cleaning",
  "brake-suspension",
  "engine-diagnostics",
  "battery-service",
  "tyres-wheel-care",
];

const whatsappMessage =
  "Hi Gear Go Automobiles, I need help choosing the right service for my car. My car is ____ and the issue is ____.";

export default function ServicesPage() {
  const whatsapp = getWhatsAppHref(whatsappMessage);
  const groups = Array.from(new Set(services.map((s) => s.group)));
  const popularServices = popular
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as typeof services;

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
        ])}
      />

      <PageHero
        eyebrow="Service catalogue"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Services" }]}
        title={
          <>
            Care for the way you <em>actually drive.</em>
          </>
        }
        lede="Twenty services covering maintenance, diagnostics, repairs, bodywork and cleaning. Each one starts with an inspection, a clear scope and your approval before paid work."
        actions={
          <>
            <a
              className="btn btn-lime"
              href={whatsapp}
              target={isExternalUrl(whatsapp) ? "_blank" : undefined}
              rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            >
              Ask what you need <Icon name="whatsapp" size="sm" />
            </a>
            <Link className="btn btn-outline-light" href="/book/">
              Request a service
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="section-head-row">
            <div className="section-head">
              <span className="eyebrow">Most requested</span>
              <h2 className="section-title">Popular services</h2>
              <p className="section-lede">
                The jobs car owners ask for most often. Tap any service for what’s included, signs to
                watch for and how to enquire.
              </p>
            </div>
            <div className="section-head-action">
              <span className="badge no-dot">Price after inspection</span>
            </div>
          </div>
          <div className="service-grid">
            {popularServices.map((service, index) => (
              <ServiceCard service={service} index={index} key={service.slug} />
            ))}
          </div>
        </div>
      </section>

      {groups.map((group, groupIndex) => (
        <section
          className={`section compact${groupIndex % 2 === 0 ? " cream" : ""}`}
          key={group}
          id={group.toLowerCase()}
        >
          <div className="container">
            <div className="section-head-row">
              <div className="section-head">
                <span className="eyebrow">{group}</span>
                <h2 className="section-title">{group} services</h2>
              </div>
              <div className="section-head-action">
                <span className="badge no-dot">
                  {services.filter((s) => s.group === group).length} services
                </span>
              </div>
            </div>
            <div className="service-grid">
              {services
                .filter((s) => s.group === group)
                .map((service) => (
                  <ServiceCard service={service} showGroup={false} key={service.slug} />
                ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <div className="callout callout-wide">
            <div>
              <span className="eyebrow">Not sure what you need?</span>
              <h2>Describe the issue. We’ll guide the next step.</h2>
              <p>
                Share your car make, model and the symptom — a noise, warning light, weak AC, dent or
                anything else. A photo or short video on WhatsApp often helps us point you in the right
                direction before you visit. {business.brandsServicedNote}
              </p>
            </div>
            <div className="btn-group">
              <a
                className="btn btn-lime"
                href={whatsapp}
                target={isExternalUrl(whatsapp) ? "_blank" : undefined}
                rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
              >
                WhatsApp us <Icon name="whatsapp" size="sm" />
              </a>
              <Link className="btn btn-outline" href="/book/">
                Request a service
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Every price is confirmed after inspection."
        text="No online payment and no automatic booking. Send your car details and we’ll confirm availability, scope and estimate directly."
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
