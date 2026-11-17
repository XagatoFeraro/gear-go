import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Terms of Use",
  description: `Website terms of use for ${business.name}.`,
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        compact
        label="Legal"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Terms" }]}
        title="Terms of Use"
        lede={`The basis for using this website and contacting ${business.name}.`}
      />

      <section className="section">
        <div className="wrap">
          <div className="prose">
            <p className="content-meta">Last updated: 16 November 2026</p>
            <p>
              This website provides information about {business.name} and a way to contact or request
              service. By using this website, you agree to these terms.
            </p>

            <h2>No online booking or payment</h2>
            <p>
              Submitting an enquiry or contacting us via WhatsApp or phone does not create a confirmed
              booking, contract, or payment. Availability, scope, pricing and timelines are confirmed
              directly by the garage.
            </p>

            <h2>Information accuracy</h2>
            <p>
              We aim to keep information accurate, but services, availability, pricing and policies may
              change and are confirmed on enquiry or inspection. Content is provided for general
              information only.
            </p>

            <h2>Intellectual property</h2>
            <p>
              Website content, branding and materials are owned by or licensed to {business.name} unless
              stated otherwise.
            </p>

            <h2>Contact</h2>
            <p>
              Questions? Contact {business.name} at{" "}
              <a href={getPhoneHref()}>{getPhoneLabel()}</a> or{" "}
              <a href={getEmailHref()}>{getEmailLabel()}</a>.
            </p>
          </div>

          <p className="note mt-6">
            <Icon name="info" size="sm" />
            <span>These terms are a working draft. Final legal review is required before launch.</span>
          </p>

          <p className="mt-6">
            <Link className="text-link" href="/privacy/">
              Read the privacy policy <Icon name="arrow" size="sm" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
