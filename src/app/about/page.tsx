import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { business } from "@/data/business";
import { getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Our Car Garage in Aya Nagar",
  description: `About ${business.name}, a multi-brand car service garage in Aya Nagar, New Delhi offering transparent, inspection-first car servicing and repairs.`,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }])} />
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">About us</span>
            <h1>Local, transparent car care in Aya Nagar</h1>
            <p className="lead">{business.name} is a multi-brand car service garage in Aya Nagar, New Delhi — focused on clear communication, inspection-first recommendations, and work you approve.</p>
            <div className="btn-row" style={{ marginTop: "1.25rem" }}>
              <Link className="btn btn-primary" href="/contact">Contact us</Link>
              <Link className="btn btn-secondary" href="/services">View services</Link>
            </div>
          </div>
          <div className="placeholder-photo" role="img" aria-label="Placeholder for real team or workshop photo">Real owner/team/workshop photo placeholder — add with consent before launch.</div>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <h2>Who we are</h2>
          <p>We serve car owners in Aya Nagar and nearby South Delhi/NCR areas with car servicing, mechanic repairs, car wash, dent removal, diagnostics and more. {business.brandsServicedNote}</p>
          <p><strong>Location:</strong> {business.address.full}<br /><strong>Hours:</strong> {business.hours.display.join(" · ")}</p>
          <h2>How we work</h2>
          <ul className="list-check">
            <li>Inspection before recommendation.</li>
            <li>Findings and options explained in plain language.</li>
            <li>Estimate shared before paid work; your approval comes first.</li>
            <li>{business.policies.parts}</li>
            <li>{business.policies.warranty}</li>
          </ul>
          <h2>Support & convenience</h2>
          <p>{business.policies.pickupDropoff} {business.policies.towing} {business.policies.insurance}</p>
          <div className="callout" style={{ marginTop: "1.5rem" }}>
            <p className="form-note" style={{ margin: 0 }}>Owner name, story, team members and photos to be added with confirmation/consent (placeholders: {`{{OWNER_NAME}}`}, {`{{ESTABLISHED_YEAR}}`}, {`{{TEAM_SIZE}}`}).</p>
          </div>
        </div>
      </section>
    </>
  );
}
