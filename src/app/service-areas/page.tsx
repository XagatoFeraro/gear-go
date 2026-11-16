import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MapArt from "@/components/MapArt";
import PageHero from "@/components/PageHero";
import {
  business,
  getWhatsAppHref,
  isExternalUrl,
  serviceAreas,
} from "@/data/business";
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

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Service areas", path: "/service-areas/" },
        ])}
      />

      <PageHero
        eyebrow="Service areas"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Service areas" }]}
        title={
          <>
            Rooted in Aya Nagar. <em>Connected across NCR.</em>
          </>
        }
        lede={`Our workshop is in ${business.address.locality}, ${business.address.city}. Car owners from nearby South Delhi and NCR localities visit us for servicing, repairs, car wash and dent removal.`}
        actions={
          <>
            <a
              className="btn btn-lime"
              href={whatsapp}
              target={isExternalUrl(whatsapp) ? "_blank" : undefined}
              rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            >
              Confirm your area <Icon name="whatsapp" size="sm" />
            </a>
            <a
              className="btn btn-outline-light"
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
        <div className="container split split-map">
          <div>
            <span className="eyebrow">Find us</span>
            <h2 className="section-title">One workshop, easy to reach from South Delhi &amp; NCR</h2>
            <p className="section-lede">
              We’re in Phase 4, H Block, Aya Nagar, behind Fitness Club Gym. Use directions for the
              current route and travel time from your location.
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
            <div className="btn-group mt-6">
              <a
                className="btn btn-dark"
                href={business.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open directions <Icon name="external" size="sm" />
              </a>
              <Link className="btn btn-outline" href="/contact/">
                Contact the garage
              </Link>
            </div>
          </div>
          <MapArt />
        </div>
      </section>

      <section className="section compact cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Localities</span>
            <h2 className="section-title">Areas we serve</h2>
            <p className="section-lede">
              Pick your locality for directions, services and what to expect when you visit. If your
              area isn’t listed, call or WhatsApp to confirm.
            </p>
          </div>
          <div className="area-card-grid">
            {serviceAreas.map((area, index) => (
              <Link
                className="area-card"
                href={`/service-areas/${area.slug}/`}
                key={area.slug}
              >
                <span className="area-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="area-icon">
                  <Icon name="pin" />
                </span>
                <div>
                  <h3>Car service in {area.name}</h3>
                  <p>Mechanic, servicing, car wash &amp; dent removal near {area.name}.</p>
                </div>
                <span className="area-arrow">
                  <Icon name="arrow" size="sm" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="callout callout-wide">
            <div>
              <span className="eyebrow">Don’t see your area?</span>
              <h2>Share your location and we’ll confirm.</h2>
              <p>
                Pickup, drop-off, towing and insurance coordination are available subject to
                confirmation. Call or WhatsApp with your locality and car details so we can tell you
                what’s possible.
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
              <Link className="btn btn-outline" href="/contact/">
                Contact &amp; directions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Local garage, clear process."
        text="Inspection first, estimate before paid work, and your approval before anything begins."
        actions={
          <>
            <Link className="btn btn-dark" href="/book/">
              Request a service <Icon name="arrow" size="sm" />
            </Link>
            <Link className="btn btn-outline" href="/services/">
              Browse services
            </Link>
          </>
        }
      />
    </>
  );
}
