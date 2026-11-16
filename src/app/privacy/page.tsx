import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import {
  business,
  getEmailHref,
  getEmailLabel,
  getPhoneHref,
  getPhoneLabel,
} from "@/data/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${business.name} website enquiries and contact.`,
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Legal"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Privacy" }]}
        title="Privacy Policy"
        lede={`How ${business.name} handles information shared through this website.`}
      />

      <section className="section">
        <div className="container">
          <div className="content-page">
            <p className="content-meta">Last updated: 16 November 2026</p>
            <p>
              {business.name} (“we”, “us”) respects your privacy. This page explains how we handle
              information you share through this website.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li>Details you submit in an enquiry form (such as name, phone number, vehicle details, service needed, and message).</li>
              <li>Information you share when you call, WhatsApp, or email us.</li>
              <li>Basic usage/analytics data if analytics are enabled on this website.</li>
            </ul>

            <h2>How we use information</h2>
            <ul>
              <li>To respond to your enquiry and confirm service availability.</li>
              <li>To provide requested service information and communicate about your visit or vehicle concern.</li>
              <li>To improve the website and understand general usage (if analytics are enabled).</li>
            </ul>

            <h2>Sharing</h2>
            <p>
              We do not sell your personal information. Enquiry details may be processed by the
              form/communication providers used to deliver your message to us. We may share information
              if required by law.
            </p>

            <h2>Retention</h2>
            <p>
              We keep enquiry information only as long as needed to respond and for legitimate
              business/record purposes, as applicable.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us to update or delete information you have shared by contacting us at{" "}
              <a href={getEmailHref()}>{getEmailLabel()}</a> or{" "}
              <a href={getPhoneHref()}>{getPhoneLabel()}</a>.
            </p>

            <h2>Contact</h2>
            <p>
              {business.name}
              <br />
              {business.address.full}
              <br />
              Phone / WhatsApp: <a href={getPhoneHref()}>{getPhoneLabel()}</a>
              <br />
              Email: <a href={getEmailHref()}>{getEmailLabel()}</a>
            </p>

            <div className="inline-note">
              <Icon name="info" size="sm" />
              <span>
                This policy is a working draft. Final legal review and confirmed provider details are
                required before launch.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
