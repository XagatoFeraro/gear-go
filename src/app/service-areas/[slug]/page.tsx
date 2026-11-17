import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Figure from "@/components/Figure";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MapEmbed from "@/components/MapEmbed";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
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
import { photos } from "@/lib/photos";
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
  const waAttrs = {
    ...(isExternalUrl(whatsapp) ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };
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
        compact
        label="Service area"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Service areas", href: "/service-areas/" },
          { name: area.name },
        ]}
        title={`Car service and mechanic in ${area.name}`}
        lede={area.context}
        actions={
          <>
            <a className="btn btn--primary" href={whatsapp} {...waAttrs}>
              WhatsApp about {area.name} <Icon name="whatsapp" size="sm" />
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
              Directions
            </a>
          </>
        }
      />

      <section className="section">
        <div className="wrap split split--wide">
          <div>
            <SectionHead
              label="Getting here"
              title={`From ${area.name} to the Aya Nagar workshop`}
              lede="Our workshop is in Phase 4, H Block, Aya Nagar, behind Fitness Club Gym. Use directions for the most accurate route and current travel time."
            />
            <div className="hours">
              <div className="hours__row">
                <strong>Workshop</strong>
                <span>{business.address.full}</span>
              </div>
              {business.hours.display.map((row) => {
                const [day, ...rest] = row.split(": ");
                return (
                  <div className="hours__row" key={row}>
                    <strong>{day}</strong>
                    <span>{rest.join(": ")}</span>
                  </div>
                );
              })}
              <div className="hours__row">
                <strong>Arriving by car</strong>
                <span>
                  {isPlaceholder(business.parkingNote)
                    ? "Parking and arrival details are confirmed when you call or WhatsApp."
                    : business.parkingNote}
                </span>
              </div>
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
              <Link className="btn btn--outline" href="/contact/">
                Contact &amp; map
              </Link>
            </div>
          </div>
          <MapEmbed title={`Gear Go Automobiles location, serving ${area.name}`} />
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap">
          <SectionHead
            label="What we can help with"
            title={`Services ${area.name} owners ask about`}
            lede="A few services that come up most often from this area. Every price is confirmed after inspection, and all car brands are welcome."
            action={
              <Link className="btn btn--outline btn--sm" href="/services/">
                All services <Icon name="arrow" size="sm" />
              </Link>
            }
          />
          <div className="ledger">
            {focusServices.map((service) => (
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

      <section className="section">
        <div className="wrap split split--wide">
          <div>
            <SectionHead
              label="Before you visit"
              title="What to expect from your enquiry"
              lede="Send your car make and model, the concern and your locality. We will confirm availability and the next step, then inspect the car before any paid work."
            />
            <ol className="spec">
              {[
                ["Send the car and concern", "WhatsApp, call or the enquiry form. A photo or short video helps."],
                ["We confirm availability", "You get a direct reply, not an automated booking confirmation."],
                ["Inspection and estimate", "Findings, options and price are explained at the workshop."],
                ["Approved work only", "Nothing extra is added without discussing it with you first."],
              ].map(([title, text], i) => (
                <li key={title}>
                  <span className="spec__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{title}.</strong> {text}
                  </span>
                </li>
              ))}
            </ol>
            <div className="btn-row mt-6">
              <a className="btn btn--primary" href={whatsapp} {...waAttrs}>
                <Icon name="whatsapp" size="sm" /> WhatsApp us
              </a>
              <Link className="btn btn--outline" href="/book/">
                Enquiry form
              </Link>
            </div>
            <p className="note mt-6">
              <Icon name="info" size="sm" />
              <span>
                No payment is taken online and no booking is confirmed automatically. {business.policies.pricing}
              </span>
            </p>
          </div>
          <Figure
            photo={photos.engineBay}
            className="photo--3x2 photo--card"
            sizes="(max-width: 980px) 100vw, 520px"
          />
        </div>
      </section>

      <CtaBand
        title={`Car care for ${area.name}, without the guesswork.`}
        text="Inspection first, a clear estimate, and your approval before work. Call or WhatsApp to confirm availability."
        actions={
          <>
            <a className="btn btn--dark" href={whatsapp} {...waAttrs}>
              WhatsApp now <Icon name="whatsapp" size="sm" />
            </a>
            <Link className="btn btn--outline" href="/service-areas/">
              All service areas
            </Link>
          </>
        }
      />
    </>
  );
}
