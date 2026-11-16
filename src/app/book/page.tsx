import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import EnquiryForm from "@/components/EnquiryForm";
import { business } from "@/data/business";
import { getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request Car Service",
  description: `Request car servicing, repair, car wash or dent removal at ${business.name}. WhatsApp or send an enquiry — we’ll confirm availability directly.`,
  alternates: { canonical: "/book/" },
};

export default function BookPage() {
  const wa = business.whatsapp.url.includes("{{")
    ? "/contact"
    : `${business.whatsapp.url}?text=${encodeURIComponent("Hi Gear Go Automobiles, I would like to request a service.\nName:\nCar:\nService needed:\nPreferred date:\nConcern:\nLocation:")}`;

  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Request service", path: "/book/" }])} />
      <section className="section">
        <div className="container" style={{ maxWidth: 1040 }}>
          <p className="breadcrumb"><Link href="/">Home</Link> / Request service</p>
          <div className="section-head">
            <span className="eyebrow">Request service</span>
            <h1>Request a car service</h1>
            <p className="lead">Choose what’s easiest: <strong>WhatsApp for the fastest response</strong>, or send your details by form. We’ll confirm availability directly — no payment taken and no automatic booking.</p>
          </div>

          <div className="grid grid-2" style={{ alignItems: "start" }}>
            <div className="card" style={{ borderColor: "#cfe8b0", background: "#fbfff5" }}>
              <span className="badge">Fastest</span>
              <h2 style={{ marginTop: "0.5rem" }}>WhatsApp</h2>
              <p className="muted">Message us with your car, service needed (servicing, car wash, dent removal, AC, etc.) and preferred time. Great for quick questions and photos/videos.</p>
              <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>Open WhatsApp</a>
              <p className="form-note" style={{ marginTop: "0.75rem" }}>Opens with a prefilled message — you can edit before sending.</p>
            </div>

            <div className="card">
              <span className="badge" style={{ background: "var(--paper-2)", color: "var(--ink-soft)" }}>Option 2</span>
              <h2 style={{ marginTop: "0.5rem" }}>Enquiry form</h2>
              <EnquiryForm />
            </div>
          </div>

          <div className="callout" style={{ marginTop: "1.5rem" }}>
            <p style={{ margin: 0 }}><strong>What happens next?</strong> We review your details, confirm availability/timing, and guide you. Inspection and estimate come before any paid work. {business.policies.pricing}</p>
          </div>
        </div>
      </section>
    </>
  );
}
