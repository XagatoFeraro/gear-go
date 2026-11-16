import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { business, serviceAreas } from "@/data/business";
import { getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Car Service & Mechanic Near Aya Nagar, South Delhi",
  description: `${business.name} serves Aya Nagar and nearby areas including Chhatarpur, Mehrauli, Saket, Malviya Nagar, Vasant Kunj, Gurugram and Faridabad.`,
  alternates: { canonical: "/service-areas/" },
};

export default function AreasPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Service areas", path: "/service-areas/" }])} />
      <section className="section">
        <div className="container">
          <p className="breadcrumb"><Link href="/">Home</Link> / Service areas</p>
          <div className="section-head">
            <span className="eyebrow">Service areas</span>
            <h1>Car mechanic & garage near you</h1>
            <p className="lead">Located in {business.address.locality}, {business.address.city}, we serve customers from nearby South Delhi and NCR localities for car servicing, repairs, car wash, dent removal and more.</p>
          </div>
          <div className="grid grid-3">
            {serviceAreas.map((a) => (
              <Link href={`/service-areas/${a.slug}/`} className="card card-hover" key={a.slug}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "0.25rem" }}>Car service in {a.name}</h2>
                <p className="muted small" style={{ margin: 0 }}>Mechanic & garage near {a.name} — directions and services →</p>
              </Link>
            ))}
          </div>
          <div className="callout" style={{ marginTop: "2rem" }}>
            <h2>Don’t see your area?</h2>
            <p className="muted">Share your location on WhatsApp or call to confirm if we can assist.</p>
            <Link className="btn btn-primary" href="/contact">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
