import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { business } from "@/data/business";
import { getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Why Choose Our Garage",
  description: `Why car owners choose ${business.name}: inspection-first service, clear estimates, approved parts, and transparent communication in Aya Nagar, New Delhi.`,
  alternates: { canonical: "/why-gear-go/" },
};

const points = [
  { title: "Inspection before recommendation", text: "We check the vehicle and concern first, so recommendations are based on what we find — not assumptions." },
  { title: "Estimate & approval before work", text: "Scope and estimate are shared clearly. Paid work proceeds only after your approval." },
  { title: "Plain-language explanations", text: "We explain issues and options in simple terms so you can decide confidently." },
  { title: "All car brands & models", text: business.brandsServicedNote },
  { title: "Parts you approve", text: business.policies.parts },
  { title: "Convenience support", text: `${business.policies.pickupDropoff} ${business.policies.towing}` },
  { title: "Insurance coordination", text: business.policies.insurance },
  { title: "Workmanship warranty", text: business.policies.warranty },
];

export default function WhyPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Why Gear Go", path: "/why-gear-go/" }])} />
      <section className="section">
        <div className="container">
          <p className="breadcrumb"><Link href="/">Home</Link> / Why Gear Go</p>
          <div className="section-head">
            <span className="eyebrow">Why Gear Go</span>
            <h1>Transparent car care you can trust</h1>
            <p className="lead">Honest inspection, clear estimates, your approval before work, and practical support for car owners in Aya Nagar and nearby areas.</p>
          </div>
          <div className="grid grid-2">
            {points.map((p) => (
              <div className="card" key={p.title}>
                <h2 style={{ fontSize: "1.15rem" }}>{p.title}</h2>
                <p className="muted" style={{ marginBottom: 0 }}>{p.text}</p>
              </div>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: "2rem" }}>
            <Link className="btn btn-primary" href="/contact">Talk to us</Link>
            <Link className="btn btn-secondary" href="/services">Explore services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
