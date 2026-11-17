import type { Metadata } from "next";
import Link from "next/link";
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
  serviceAreas,
} from "@/data/business";
import { photos } from "@/lib/photos";
import { getBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Car Service & Mechanic Near Aya Nagar, South Delhi",
  description: `${business.name} serves Aya Nagar and nearby areas including Chhatarpur, Mehrauli, Saket, Malviya Nagar, Vasant Kunj, Gurugram and Faridabad.`,
  path: "/service-areas/",
});

const whatsappMessage =
  "Hi Gear Go Automobiles, I need car service. My area is ____. My car is ____ and the issue/service is ____.";

export default function AreasPage() {
  const whatsapp = getWhatsAppHref(whatsappMessage);
  const waAttrs = {
    ...(isExternalUrl(whatsapp) ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Service areas", path: "/service-areas/" },
        ])}
      />

      <PageHero
        label="Service areas"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Service areas" }]}
        title="Car service near Aya Nagar"
        lede="One workshop in Phase 4, H Block, Aya Nagar. Car owners come to us from across South Delhi and NCR because the inspection, scope and estimate happen before any paid work."
        actions={
          <>
            <a className="btn btn--primary" href={whatsapp} {...waAttrs}>
              Confirm your area <Icon name="whatsapp" size="sm" />
            </a>
            <a
              className="btn btn--light"
              href={business.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions <Icon name="arrow" size="sm" />
            </a>
          </>
        }
      />

      <section className="section">
        <div className="wrap split split--wide">
          <div>
            <SectionHead
              label="Find us"
              title="Easy to reach from South Delhi and NCR"
              lede="We are behind Fitness Club Gym in H Block. Use directions for the live route and travel time from where you are."
            />
            <div className="hours">
              <div className="hours__row">
                <strong>Address</strong>
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
            </div>
            <div className="btn-row mt-6">
              <a
                className="btn btn--dark"
                href={business.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open directions <Icon name="external" size="sm" />
              </a>
              <a className="btn btn--outline" href={getPhoneHref()}>
                <Icon name="phone" size="sm" /> {getPhoneLabel()}
              </a>
            </div>
            <p className="note mt-6">
              <Icon name="car" size="sm" />
              <span>
                Travelling from further out? Send your locality and concern first so we can confirm
                whether the trip makes sense for the work you need.
              </span>
            </p>
          </div>
          <MapEmbed title="Gear Go Automobiles location in Aya Nagar, New Delhi" />
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap">
          <SectionHead
            label="Localities"
            title="Areas we serve"
            lede="Pick your locality for a practical note on getting here and the services owners ask about most. If your area is not listed, call or WhatsApp and we will confirm."
          />
          <div className="ledger">
            {serviceAreas.map((area, index) => (
              <Link className="lrow" href={`/service-areas/${area.slug}/`} key={area.slug}>
                <span>
                  <span className="lrow__title">
                    <span className="mono muted small">{String(index + 1).padStart(2, "0")} · </span>
                    Car service in {area.name}
                  </span>
                  <span className="lrow__text">{area.context}</span>
                </span>
                <span className="lrow__meta">
                  View area <Icon name="arrow" size="sm" />
                </span>
              </Link>
            ))}
          </div>
          <p className="note mt-6">
            <Icon name="info" size="sm" />
            <span>
              The workshop address is fixed. Travel times vary with traffic, so always use directions
              before setting out.
            </span>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Figure
            photo={photos.bandLift}
            className="photo--3x2 photo--card"
            sizes="(max-width: 980px) 100vw, 560px"
          />
          <div>
            <SectionHead
              label="Before you visit"
              title="What to send us"
              lede="A short message with these details means we can tell you what the visit should cover before you travel."
            />
            <ol className="spec">
              {[
                ["Your area", "The locality you are travelling from, so we can judge the trip."],
                ["Car make, model and year", "Enough to check parts availability and typical scope."],
                ["The concern or service", "A symptom, warning light, or the service you want."],
                ["A photo or short video", "Useful for noises, leaks, warning lights or body damage."],
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
                <Icon name="whatsapp" size="sm" /> Send on WhatsApp
              </a>
              <Link className="btn btn--outline" href="/book/">
                Use the enquiry form
              </Link>
            </div>
            <p className="photo-note">
              The image on this page is illustrative and will be replaced with a real workshop photo.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Local garage, clear process."
        text="Inspection first, estimate before paid work, and your approval before anything begins."
        actions={
          <>
            <Link className="btn btn--dark" href="/book/">
              Request a service <Icon name="arrow" size="sm" />
            </Link>
            <Link className="btn btn--outline" href="/services/">
              Browse services
            </Link>
          </>
        }
      />
    </>
  );
}
