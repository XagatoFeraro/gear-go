import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { business, serviceAreas, services } from "@/data/business";
import { getBreadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};
  return {
    title: `Car Service & Mechanic in ${area.name}`,
    description: `Need a car mechanic or garage near ${area.name}? ${business.name} in Aya Nagar, New Delhi offers car servicing, repairs, car wash and dent removal for ${area.name}. Call or WhatsApp.`,
    alternates: { canonical: `/service-areas/${slug}/` },
  };
}

export default async function AreaDetail({ params }: Props) {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();
  const wa = business.whatsapp.url.includes("{{")
    ? "/contact"
    : `${business.whatsapp.url}?text=${encodeURIComponent(`Hi Gear Go Automobiles, I need car service near ${area.name}. My car is ____ and the issue/service is ____.`)}`;

  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Service areas", path: "/service-areas/" }, { name: area.name, path: `/service-areas/${area.slug}/` }])} />
      <section className="section">
        <div className="container" style={{ maxWidth: 1000 }}>
          <p className="breadcrumb"><Link href="/">Home</Link> / <Link href="/service-areas/">Service areas</Link> / {area.name}</p>
          <span className="eyebrow">Service area</span>
          <h1>Car service & mechanic in {area.name}</h1>
          <p className="lead">
            Looking for a reliable car mechanic, garage, car wash or dent removal near {area.name}? {business.name} is
            based at {business.address.full} (Aya Nagar, New Delhi) and serves customers from {area.name} with
            inspection-first, multi-brand car care. Share your car details on WhatsApp or call to confirm the next step.
          </p>
          <div className="btn-row" style={{ marginTop: "1.25rem" }}>
            <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp for {area.name}</a>
            <a className="btn btn-secondary" href={business.phone.telHref}>Call</a>
            <a className="btn btn-secondary" href={business.maps.directionsUrl} target="_blank" rel="noopener noreferrer">Directions</a>
          </div>

          <div className="grid grid-2" style={{ marginTop: "2rem" }}>
            <div className="card">
              <h2>Getting to us from {area.name}</h2>
              <p>Our workshop is in Aya Nagar, New Delhi. Use directions for the best route and current travel time from {area.name}.</p>
              <p className="form-note">{business.parkingNote.includes("{{") ? "Parking/arrival details: to be confirmed." : business.parkingNote}</p>
              <a className="btn btn-primary" href={business.maps.directionsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
            </div>
            <div className="card">
              <h2>Contact & hours</h2>
              <p><strong>Address:</strong> {business.address.full}</p>
              <p><strong>Hours:</strong> {business.hours.display.join(" · ")}</p>
              <p><strong>Phone:</strong> <a href={business.phone.telHref}>{business.phone.display}</a></p>
              <p className="muted" style={{ marginBottom: 0 }}>{business.policies.pricing}</p>
            </div>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h2>Services we can help with</h2>
            <p className="muted">Car servicing, mechanic repairs, AC service, car wash, dent removal/painting, brakes, battery, tyres, diagnostics and more. {business.brandsServicedNote}</p>
            <div className="grid grid-3" style={{ marginTop: "0.75rem" }}>
              {services.slice(0, 9).map((s) => (
                <Link href={`/services/${s.slug}/`} className="card card-hover service-tile" key={s.slug}>
                  <h3>{s.name}</h3>
                  <p>{s.shortDescription}</p>
                  <span className="meta">View details →</span>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: "1rem" }}><Link href="/services/">View all services →</Link></p>
          </div>

          <div className="callout" style={{ marginTop: "2rem" }}>
            <ul className="list-check">
              <li>{business.policies.parts}</li>
              <li>{business.policies.pickupDropoff}</li>
              <li>{business.policies.towing}</li>
              <li>{business.policies.insurance}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
