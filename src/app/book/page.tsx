import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ChannelLink from "@/components/ChannelLink";
import ContactFormClient from "@/components/ContactFormClient";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { business, getPhoneLabel, hasFormEndpoint, isWhatsAppConfigured } from "@/data/business";
import { getBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request Car Service",
  description: `Request car servicing, repair, car wash or dent removal at ${business.name}. Send an enquiry or use the contact options.`,
  path: "/book/",
});

const whatsappMessage =
  "Hi Gear Go Automobiles, I would like to request a service.\nName:\nCar:\nService needed:\nPreferred date:\nConcern:\nLocation:";

export default function BookPage() {
  const lede = isWhatsAppConfigured()
    ? "Choose what is easiest: WhatsApp for the fastest response, or send your details by form. No payment is taken and no booking is confirmed automatically."
    : "Send your details by form, or check the contact page for phone and WhatsApp options. No payment is taken and no booking is confirmed automatically.";

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Request service", path: "/book/" },
        ])}
      />

      <PageHero
        compact
        label="Request service"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Request service" }]}
        title="Tell us what your car needs"
        lede={lede}
      />

      <section className="section">
        <div className="wrap split split--wide">
          <div className="form-panel">
            <span className="label">Enquiry form</span>
            <h2>Send your service details</h2>
            <p className="lede">
              Fill in what you know. {hasFormEndpoint() ? "We will receive the enquiry directly." : "Online delivery is not set up yet; submitting keeps your details on this page so you can copy them."}{" "}
              No payment is taken and no booking is confirmed automatically.
            </p>
            <Suspense fallback={<p className="form__note">Loading form...</p>}>
              <ContactFormClient />
            </Suspense>
          </div>
          <aside className="aside">
            <div className="aside-card">
              <span className="label">Fastest</span>
              <h3 className="mt-4">WhatsApp</h3>
              <p>
                Message us with your car, the service needed and your preferred time. Great for quick
                questions and for sharing photos or videos of the issue.
              </p>
              <div className="aside-actions">
                <ChannelLink
                  channel="whatsapp"
                  message={whatsappMessage}
                  className="btn btn--primary btn--block"
                  fallback="Send an enquiry"
                >
                  <Icon name="whatsapp" size="sm" /> Open WhatsApp
                </ChannelLink>
                <ChannelLink channel="phone" className="btn btn--outline btn--block" fallback="Contact options">
                  <Icon name="phone" size="sm" /> {getPhoneLabel()}
                </ChannelLink>
              </div>
              <p className="aside-note">
                {isWhatsAppConfigured()
                  ? "Opens with a prefilled message you can edit before sending. No payment is taken in WhatsApp either."
                  : "Phone and WhatsApp details are confirmed on the contact page. Nothing is paid on this website."}
              </p>
            </div>

            <div className="aside-card">
              <h3>What happens next</h3>
              <div className="hours">
                <div className="hours__row">
                  <strong>01</strong>
                  <span>We review your details.</span>
                </div>
                <div className="hours__row">
                  <strong>02</strong>
                  <span>We reply about your enquiry.</span>
                </div>
                <div className="hours__row">
                  <strong>03</strong>
                  <span>You visit for inspection and estimate.</span>
                </div>
                <div className="hours__row">
                  <strong>04</strong>
                  <span>Work begins only after your approval.</span>
                </div>
              </div>
              <p className="aside-note">
                This form is an enquiry, not a confirmed slot. {business.policies.pricing}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tight section--paper">
        <div className="wrap">
          <div className="sec-head-row">
            <div className="sec-head">
              <span className="label">Not sure what to ask for</span>
              <h2 className="sec-head__title">Browse services or describe the symptom</h2>
              <p className="sec-head__lede">
                Every service starts with the car being checked. If you are unsure, the services list
                and the symptom table will point you to the right place.
              </p>
            </div>
            <div className="btn-row">
              <Link className="btn btn--outline" href="/services/">
                Browse services <Icon name="arrow" size="sm" />
              </Link>
              <Link className="btn btn--outline" href="/contact/">
                Contact &amp; directions
              </Link>
            </div>
          </div>
          <p className="note">
            <Icon name="info" size="sm" />
            <span>
              There is no online payment and no automatic booking on this website. Inspection and
              estimate come before any paid work.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
