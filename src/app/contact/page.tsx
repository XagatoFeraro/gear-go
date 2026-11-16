import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import ContactFormClient from "@/components/ContactFormClient";
import { business } from "@/data/business";
import { getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Car Mechanic & Garage in Aya Nagar",
  description: `Contact ${business.name} in Aya Nagar, New Delhi. Call, WhatsApp, get directions or send an enquiry for car service, repairs, car wash or dent removal.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const wa = business.whatsapp.url.includes("{{")
    ? "#"
    : `${business.whatsapp.url}?text=${encodeURIComponent("Hi Gear Go Automobiles, I need help with car service. My car is ____ and the issue/service is ____. My location is ____.")}`;

  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }])} />
      <section className="section">
        <div className="container">
          <p className="breadcrumb"><Link href="/">Home</Link> / Contact</p>
          <div className="section-head">
            <span className="eyebrow">Contact</span>
            <h1>Contact your local car garage</h1>
            <p className="lead">Fastest response on WhatsApp. You can also call, get directions, or send an enquiry form — we’ll confirm availability and next steps directly.</p>
          </div>

          <div className="grid grid-2" style={{ alignItems: "start" }}>
            <div className="stack">
              <div className="card">
                <h2>Reach us directly</h2>
                <div className="stack-sm">
                  <p><strong>Address</strong><br />{business.address.full}</p>
                  <p><strong>Phone</strong><br /><a href={business.phone.telHref}>{business.phone.display}</a></p>
                  <p><strong>WhatsApp</strong><br /><a href={wa} target="_blank" rel="noopener noreferrer">{business.whatsapp.display}</a></p>
                  <p><strong>Email</strong><br />{business.email}</p>
                  <p style={{ marginBottom: 0 }}><strong>Hours</strong><br />{business.hours.display.join(" · ")}</p>
                </div>
                <div className="btn-row" style={{ marginTop: "1rem" }}>
                  <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  <a className="btn btn-secondary" href={business.phone.telHref}>Call</a>
                  <a className="btn btn-secondary" href={business.maps.directionsUrl} target="_blank" rel="noopener noreferrer">Directions</a>
                </div>
              </div>

              <div className="card">
                <h2>Map & directions</h2>
                <p className="form-note">Use directions for the most accurate route to the workshop.</p>
                {business.maps.embedUrl && !business.maps.embedUrl.includes("{{") ? (
                  <iframe
                    title={`${business.name} location map`}
                    src={business.maps.embedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ width: "100%", height: 260, border: 0, borderRadius: 12, marginTop: "0.5rem" }}
                  />
                ) : (
                  <div className="placeholder-photo" style={{ minHeight: 180, marginTop: "0.5rem" }}>Map placeholder — add embed URL or use directions.</div>
                )}
                <div style={{ marginTop: "0.75rem" }}>
                  <a className="btn btn-secondary" href={business.maps.directionsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
                </div>
              </div>
            </div>

            <div className="card">
              <span className="badge">Option 2</span>
              <h2 style={{ marginTop: "0.5rem" }}>Send an enquiry form</h2>
              <p className="muted">Share your details and we’ll get back to confirm availability. No payment or automatic booking.</p>
              <Suspense fallback={<p>Loading form…</p>}>
                <ContactFormClient />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
