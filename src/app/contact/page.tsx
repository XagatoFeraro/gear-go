import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ContactFormClient from "@/components/ContactFormClient";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MapEmbed from "@/components/MapEmbed";
import PageHero from "@/components/PageHero";
import {
  business,
  getEmailHref,
  getEmailLabel,
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
  const waAttrs = {
    ...(isExternalUrl(whatsapp) ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };

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
        label="Contact"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        title="Talk to the garage directly"
        lede="Fastest response on WhatsApp. You can also call, get directions, or send an enquiry form. We will confirm availability and the next step."
      />

      <section className="section">
        <div className="wrap split split--wide">
          <div>
            <div className="contact-rows">
              <a className="crow" href={whatsapp} {...waAttrs}>
                <span className="crow__icon">
                  <Icon name="whatsapp" size="sm" />
                </span>
                <span className="crow__main">
                  <span className="crow__label">WhatsApp</span>
                  <span className="crow__value">Fastest for questions, photos and enquiries</span>
                </span>
                <Icon name="arrow" size="sm" />
              </a>

              <a className="crow" href={getPhoneHref()}>
                <span className="crow__icon">
                  <Icon name="phone" size="sm" />
                </span>
                <span className="crow__main">
                  <span className="crow__label">Phone</span>
                  <span className="crow__value">{getPhoneLabel()}</span>
                </span>
                <Icon name="arrow" size="sm" />
              </a>

              <a
                className="crow"
                href={business.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="crow__icon">
                  <Icon name="pin" size="sm" />
                </span>
                <span className="crow__main">
                  <span className="crow__label">Directions</span>
                  <span className="crow__value">{business.address.full}</span>
                </span>
                <Icon name="external" size="sm" />
              </a>

              <a className="crow" href={getEmailHref()}>
                <span className="crow__icon">
                  <Icon name="mail" size="sm" />
                </span>
                <span className="crow__main">
                  <span className="crow__label">Email</span>
                  <span className="crow__value">{getEmailLabel()}</span>
                </span>
                <Icon name="arrow" size="sm" />
              </a>
            </div>

            <h2 className="h2 mt-8" style={{ fontSize: 24 }}>
              Workshop hours
            </h2>
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
            <p className="note mt-4">
              <Icon name="info" size="sm" />
              <span>
                Hours can change on holidays. Call or WhatsApp before travelling if you are unsure.
              </span>
            </p>

            <div className="mt-8">
              <MapEmbed title="Gear Go Automobiles location in Aya Nagar, New Delhi" />
            </div>

            <p className="mt-4">
              <Link className="text-link" href="/service-areas/">
                See all service areas <Icon name="arrow" size="sm" />
              </Link>
            </p>
          </div>

          <div className="form-panel" id="enquiry">
            <span className="label">Enquiry form</span>
            <h2>Send your details</h2>
            <p className="lede">
              Share your car, concern and preferred date. We will get back to confirm availability. No
              payment is taken and no booking is confirmed automatically.
            </p>
            <Suspense fallback={<p className="form__note">Loading form...</p>}>
              <ContactFormClient />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
