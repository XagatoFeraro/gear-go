import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MapArt from "@/components/MapArt";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import {
  business,
  getPhoneHref,
  getPhoneLabel,
  getWhatsAppHref,
  isExternalUrl,
  isPlaceholder,
  serviceAreas,
  services,
} from "@/data/business";
import { getBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};
  return pageMetadata({
    title: `Car Service & Mechanic in ${area.name}`,
    description: `Need a car mechanic or garage near ${area.name}? ${business.name} in Aya Nagar, New Delhi offers car servicing, repairs, car wash and dent removal for ${area.name}. Call or WhatsApp.`,
    path: `/service-areas/${slug}/`,
  });
}

export default async function AreaDetail({ params }: Props) {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const whatsapp = getWhatsAppHref(
    `Hi Gear Go Automobiles, I need car service near ${area.name}. My car is ____ and the issue/service is ____.`,
  );
  const focusServices = area.focus
    .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
    .filter(Boolean) as typeof services;

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Service areas", path: "/service-areas/" },
          { name: area.name, path: `/service-areas/${area.slug}/` },
        ])}
      />

      <PageHero
        eyebrow="Service area"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Service areas", href: "/service-areas/" },
          { name: area.name },
        ]}
        title={
          <>
            Car service &amp; mechanic in <em>{area.name}</em>
          </>
        }
        lede={`Looking for a reliable car mechanic, garage, car wash or dent removal near ${area.name}? ${area.context}`}
        actions={
          <>
            <a
              className="btn btn-lime"
              href={whatsapp}
              target={isExternalUrl(whatsapp) ? "_blank" : undefined}
              rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            >
              WhatsApp about {area.name} <Icon name="whatsapp" size="sm" />
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
              Directions
            </a>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="split split-map">
            <div>
              <span className="eyebrow">Getting here</span>
              <h2 className="section-title">From {area.name} to our Aya Nagar workshop</h2>
              <p className="section-lede">
                Our workshop is in Phase 4, H Block, Aya Nagar, behind Fitness Club Gym. Use directions
                for the most accurate route and current travel time from {area.name}.
              </p>
              <div className="visit-row">
                <Icon name="pin" />
                <div>
                  <strong>Workshop address</strong>
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
                <Icon name="car" />
                <div>
                  <strong>Arriving by car</strong>
                  <span>
                    {isPlaceholder(business.parkingNote)
                      ? "Parking and arrival details are confirmed when you call or WhatsApp."
                      : business.parkingNote}
                  </span>
                </div>
              </div>
              <div className="btn-group mt-6">
                <a
                  className="btn btn-dark"
                  href={business.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions <Icon name="external" size="sm" />
                </a>
                <Link className="btn btn-outline" href="/contact/">
                  Contact &amp; map
                </Link>
              </div>
            </div>
            <MapArt label={`Gear Go Automobiles · Aya Nagar · serving ${area.name}`} />
          </div>
        </div>
      </section>

      <section className="section compact cream">
        <div className="container">
          <div className="section-head-row">
            <div className="section-head">
              <span className="eyebrow">What we can help with</span>
              <h2 className="section-title">Services for {area.name} car owners</h2>
              <p className="section-lede">
                A few services {area.name} owners ask about most. Every price is confirmed after
                inspection, and all car brands are welcome.
              </p>
            </div>
            <div className="section-head-action">
              <Link className="btn btn-outline btn-sm" href="/services/">
                All services <Icon name="arrow" size="sm" />
              </Link>
            </div>
          </div>
          <div className="service-grid">
            {focusServices.map((service, index) => (
              <ServiceCard service={service} index={index} key={service.slug} showGroup={false} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="callout callout-wide">
            <div>
              <span className="eyebrow">Before you visit</span>
              <h2>What to expect from a {area.name} enquiry</h2>
              <p>
                Send your car make/model, the concern and your locality. We’ll confirm availability and
                the next step. Once you arrive, we inspect, explain the findings and share the estimate.
                Paid work begins only after your approval. {business.policies.pricing}
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
                Enquiry form
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={`Car care for ${area.name}, without the guesswork.`}
        text="Inspection first, clear estimate, your approval before work. Call or WhatsApp to confirm availability."
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
            <Link className="btn btn-outline" href="/service-areas/">
              All service areas
            </Link>
          </>
        }
      />
    </>
  );
}
