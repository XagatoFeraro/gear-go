import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ContactFormClient from "@/components/ContactFormClient";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MapArt from "@/components/MapArt";
import PageHero from "@/components/PageHero";
import {
  business,
  getEmailHref,
  getEmailLabel,
  getMapEmbedUrl,
  getPhoneHref,
  getPhoneLabel,
  getWhatsAppHref,
  isExternalUrl,
} from "@/data/business";
import { getBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Car Mechanic & Garage in Aya Nagar",
  description: `Contact ${business.name} in Aya Nagar, New Delhi. Call, WhatsApp, get directions or send an enquiry for car service, repairs, car wash or dent removal.`,
  path: "/contact/",
});

const whatsappMessage =
  "Hi Gear Go Automobiles, I need help with car service. My car is ____ and the issue/service is ____. My location is ____.";

export default function ContactPage() {
  const whatsapp = getWhatsAppHref(whatsappMessage);
  const mapEmbed = getMapEmbedUrl();

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ])}
      />

      <PageHero
        compact
        eyebrow="Contact"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        title={
          <>
            Talk to the garage <em>directly.</em>
          </>
        }
        lede="Fastest response on WhatsApp. You can also call, get directions, or send an enquiry form — we’ll confirm availability and next steps."
      />

      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="contact-methods">
              <a
                className="contact-method contact-method-primary"
                href={whatsapp}
                target={isExternalUrl(whatsapp) ? "_blank" : undefined}
                rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
              >
                <span className="icon-box">
                  <Icon name="whatsapp" />
                </span>
                <div>
                  <strong>WhatsApp</strong>
                  <span>Fastest for questions, photos and prefilled enquiries.</span>
                </div>
                <Icon name="arrow" size="sm" />
              </a>

              <a className="contact-method" href={getPhoneHref()}>
                <span className="icon-box">
                  <Icon name="phone" />
                </span>
                <div>
                  <strong>{getPhoneLabel()}</strong>
                  <span>Call during workshop hours to confirm availability.</span>
                </div>
                <Icon name="arrow" size="sm" />
              </a>

              <a
                className="contact-method"
                href={business.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon-box">
                  <Icon name="pin" />
                </span>
                <div>
                  <strong>Directions</strong>
                  <span>{business.address.full}</span>
                </div>
                <Icon name="external" size="sm" />
              </a>

              <a className="contact-method" href={getEmailHref()}>
                <span className="icon-box">
                  <Icon name="mail" />
                </span>
                <div>
                  <strong>{getEmailLabel()}</strong>
                  <span>For enquiries that aren’t urgent.</span>
                </div>
                <Icon name="arrow" size="sm" />
              </a>
            </div>

            <div className="hours-card">
              <span className="eyebrow">Workshop hours</span>
              <div className="hours-grid">
                {business.hours.display.map((row) => {
                  const [day, time] = row.split(": ").length > 1 ? [row.split(": ")[0], row.split(": ").slice(1).join(": ")] : [row, ""];
                  return (
                    <div className="hours-row" key={row}>
                      <strong>{day}</strong>
                      <span>{time}</span>
                    </div>
                  );
                })}
              </div>
              <p className="inline-note mt-4">
                <Icon name="info" size="sm" />
                <span>
                  Hours can change on holidays. Call or WhatsApp before travelling if you’re unsure.
                </span>
              </p>
            </div>

            <div className="mt-6">
              <MapArt />
            </div>

            {mapEmbed ? (
              <div className="map-embed">
                <iframe
                  title={`${business.name} location map`}
                  src={mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}

            <p className="mt-4">
              <Link className="text-link" href="/service-areas/">
                See all service areas <Icon name="arrow" size="sm" />
              </Link>
            </p>
          </div>

          <div className="contact-panel" id="enquiry">
            <span className="badge badge-lime no-dot">Enquiry form</span>
            <h2>Send your details</h2>
            <p className="section-lede">
              Share your car, concern and preferred date. We’ll get back to confirm availability. No
              payment is taken and no booking is confirmed automatically.
            </p>
            <Suspense fallback={<p className="form-note">Loading form…</p>}>
              <ContactFormClient />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
