import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { business, services } from "@/data/business";
import { getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Car Services, Repairs & Car Wash in Aya Nagar",
  description: `Car servicing, mechanic repairs, car wash, dent removal, AC repair, brakes, battery, tyres and more at ${business.name}, Aya Nagar, New Delhi. Price confirmed after inspection. Call or WhatsApp.`,
  alternates: { canonical: "/services/" },
};

const popular = ["periodic-car-service", "ac-service-repair", "denting-painting", "car-spa-cleaning", "brake-suspension", "engine-diagnostics", "battery-service", "tyres-wheel-care"];

export default function ServicesPage() {
  const groups = Array.from(new Set(services.map((s) => s.group)));
  const popularServices = popular.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean) as typeof services;
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }])} />
      <section className="section">
        <div className="container">
          <p className="breadcrumb"><Link href="/">Home</Link> / Services</p>
          <span className="eyebrow">Our services</span>
          <h1>Car service, mechanic & car care in Aya Nagar</h1>
          <p className="lead">
            Looking for a car mechanic, garage, car servicing, car wash or dent removal near you? {business.name} offers multi-brand car services in Aya Nagar, New Delhi. {business.policies.pricing}
          </p>

          <div className="section-head" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            <h2>Popular services</h2>
          </div>
          <div className="grid grid-4">
            {popularServices.map((s) => (
              <Link href={`/services/${s.slug}/`} className="card card-hover service-tile" key={s.slug}>
                <span className="badge">{s.group}</span>
                <h3>{s.name}</h3>
                <p>{s.shortDescription}</p>
                <span className="meta">View details →</span>
              </Link>
            ))}
          </div>

          {groups.map((group) => (
            <div key={group} style={{ marginTop: "2.5rem" }}>
              <h2>{group}</h2>
              <div className="grid grid-3" style={{ marginTop: "0.75rem" }}>
                {services.filter((s) => s.group === group).map((s) => (
                  <Link href={`/services/${s.slug}/`} className="card card-hover service-tile" key={s.slug}>
                    <h3>{s.name}</h3>
                    <p>{s.shortDescription}</p>
                    <span className="meta">Price after inspection →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="callout" style={{ marginTop: "2.5rem" }}>
            <h2>Not sure what you need?</h2>
            <p className="muted">Describe the issue or share a photo/video on WhatsApp — we’ll help you understand the likely next step. {business.brandsServicedNote}</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/contact">WhatsApp / Contact</Link>
              <Link className="btn btn-secondary" href="/book">Request a service</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
