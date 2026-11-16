import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { business, getPhoneHref, getPhoneLabel, getWhatsAppHref, isExternalUrl } from "@/data/business";
import { getBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request Car Service",
  description: `Request car servicing, repair, car wash or dent removal at ${business.name}. WhatsApp or send an enquiry — we’ll confirm availability directly.`,
  path: "/book/",
});

const whatsappMessage =
  "Hi Gear Go Automobiles, I would like to request a service.\nName:\nCar:\nService needed:\nPreferred date:\nConcern:\nLocation:";

export default function BookPage() {
  const whatsapp = getWhatsAppHref(whatsappMessage);

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
        eyebrow="Request service"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Request service" }]}
        title={
          <>
            Tell us what your car <em>needs.</em>
          </>
        }
        lede="Choose what’s easiest: WhatsApp for the fastest response, or send your details by form. We’ll confirm availability directly — no payment taken and no automatic booking."
      />

      <section className="section">
        <div className="container book-grid">
          <aside className="book-aside">
            <span className="badge badge-lime no-dot">Fastest</span>
            <h2>WhatsApp</h2>
            <p>
              Message us with your car, the service needed and your preferred time. Great for quick
              questions and for sharing photos or videos of the issue.
            </p>
            <a
              className="btn btn-lime btn-block"
              href={whatsapp}
              target={isExternalUrl(whatsapp) ? "_blank" : undefined}
              rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            >
              <Icon name="whatsapp" size="sm" /> Open WhatsApp
            </a>
            <p className="form-note mt-4">
              Opens with a prefilled message — you can edit it before sending. No payment is taken in
              WhatsApp either.
            </p>

            <div className="book-aside-divider" />

            <p className="book-aside-label">Prefer to talk?</p>
            <a className="btn btn-outline btn-block" href={getPhoneHref()}>
              <Icon name="phone" size="sm" /> {getPhoneLabel()}
            </a>

            <div className="book-aside-divider" />

            <ul className="book-steps">
              <li>
                <span>01</span> We review your details.
              </li>
              <li>
                <span>02</span> We confirm availability and timing.
              </li>
              <li>
                <span>03</span> You visit for inspection and estimate.
              </li>
              <li>
                <span>04</span> Work begins only after your approval.
              </li>
            </ul>

            <p className="inline-note mt-4">
              <Icon name="info" size="sm" />
              <span>
                This form is an enquiry, not a confirmed slot. {business.policies.pricing}
              </span>
            </p>
          </aside>

          <div className="contact-panel book-form-panel">
            <span className="badge no-dot">Enquiry form</span>
            <h2>Send your service details</h2>
            <p className="section-lede">
              Fill in what you know. If the form provider isn’t configured, your details will open in
              WhatsApp so the garage still receives them.
            </p>
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section className="section compact cream">
        <div className="container">
          <div className="callout callout-wide">
            <div>
              <span className="eyebrow">What happens next</span>
              <h2>An enquiry, then a conversation</h2>
              <p>
                We review your details, confirm availability/timing, and guide you on the next step.
                Inspection and estimate come before any paid work. There is no online payment and no
                automatic booking. {business.policies.pricing}
              </p>
            </div>
            <div className="btn-group">
              <Link className="btn btn-outline" href="/services/">
                Browse services <Icon name="arrow" size="sm" />
              </Link>
              <Link className="btn btn-ghost" href="/contact/">
                Contact &amp; directions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
