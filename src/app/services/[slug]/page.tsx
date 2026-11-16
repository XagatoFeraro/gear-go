import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { business, services, serviceAreas } from "@/data/business";
import { getBreadcrumbJsonLd, getFaqJsonLd, getServiceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const intentKeywords: Record<string, string> = {
  "periodic-car-service": "car servicing, periodic service, car maintenance",
  "car-inspection": "car inspection, pre-purchase inspection, vehicle check",
  "engine-diagnostics": "engine diagnostics, check engine light, car scan",
  "mechanical-repairs": "car mechanic, mechanical repair, car repair near me",
  "brake-suspension": "brake repair, suspension check, brake service",
  "suspension-fitments": "suspension repair, fitments, wheel alignment concerns",
  "clutch-body-parts": "clutch repair, body parts replacement",
  "electrical-repairs": "car electrical repair, wiring, starting issues",
  "battery-service": "car battery replacement, battery service, jump start",
  "tyres-wheel-care": "tyre service, wheel care, puncture, alignment",
  "ac-service-repair": "car AC repair, AC service, AC gas, cooling",
  "car-spa-cleaning": "car wash, car spa, car cleaning near me",
  "interior-cleaning": "interior car cleaning, seat and carpet cleaning",
  "detailing-services": "car detailing, polish, paint protection care",
  "denting-painting": "dent removal, denting and painting, scratch repair",
  "accidental-damage-inspection": "accident damage inspection, car damage assessment",
  "insurance-claims": "car insurance claim help, accident repair coordination",
  "windshield-lights": "windshield repair, glass and lights check",
  "lights-replacement": "car light replacement, headlight bulb",
  "custom-repair": "custom car repair, modified vehicle repair",
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const intent = intentKeywords[slug] ? ` ${intentKeywords[slug]}.` : "";
  return {
    title: `${service.name} in Aya Nagar, New Delhi`,
    description: `${service.name} at ${business.name}, Aya Nagar, New Delhi. ${service.shortDescription} Call or WhatsApp to confirm availability.${intent}`,
    alternates: { canonical: `/services/${slug}/` },
    openGraph: {
      title: `${service.name} in Aya Nagar, New Delhi | ${business.name}`,
      description: `${service.shortDescription} Price confirmed after inspection. Call or WhatsApp.`,
      url: `/services/${slug}/`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const waBase = business.whatsapp.url.includes("{{") ? "/contact" : business.whatsapp.url;
  const wa = waBase === "/contact" ? "/contact" : `${waBase}?text=${encodeURIComponent(`Hi Gear Go Automobiles, I need ${service.name} for my car (____). My location is ____. Concern: ____`)}`;

  const related = services.filter((s) => s.group === service.group && s.slug !== service.slug).slice(0, 3);
  const faqs = [
    { q: `How do I enquire about ${service.name.toLowerCase()}?`, a: `WhatsApp or call ${business.name} with your car make/model and concern. We’ll confirm availability and the next step. You can also send an enquiry form.` },
    { q: `What is the price for ${service.name.toLowerCase()}?`, a: service.priceNote },
    { q: "Do you explain and get approval before work?", a: "Yes. We inspect, explain findings in plain language, and share the scope and estimate. Work proceeds only after your approval." },
    { q: "Which areas do you serve?", a: `We are in Aya Nagar, New Delhi and serve nearby areas including ${business.serviceAreas.slice(0, 6).map(a => a.name).join(", ")} and more. Call or WhatsApp to confirm.` },
  ];

  return (
    <>
      <JsonLd data={[
        getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
          { name: service.name, path: `/services/${service.slug}/` },
        ]),
        getServiceJsonLd(service),
        getFaqJsonLd(faqs),
      ]} />

      <section className="section">
        <div className="container" style={{ maxWidth: 1000 }}>
          <p className="breadcrumb"><Link href="/">Home</Link> / <Link href="/services/">Services</Link> / {service.name}</p>
          <span className="eyebrow">{service.group} · Aya Nagar, New Delhi</span>
          <h1>{service.name} in Aya Nagar, New Delhi</h1>
          <p className="lead">
            {service.shortDescription} At {business.name}, we follow an inspection-first approach: we assess the issue,
            explain options clearly, and proceed only after your approval. Serving Aya Nagar and nearby South Delhi/NCR areas.
          </p>
          <div className="btn-row" style={{ marginTop: "1.25rem" }}>
            <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp for {service.name}</a>
            <a className="btn btn-secondary" href={business.phone.telHref}>Call {business.phone.display}</a>
            <Link className="btn btn-secondary" href={`/book?service=${encodeURIComponent(service.name)}`}>Request via form</Link>
          </div>

          <div className="grid grid-2" style={{ marginTop: "2rem", alignItems: "start" }}>
            <div className="card">
              <h2>Signs you may need this</h2>
              <ul className="list-check">
                {service.signs.map((s) => <li key={s}>{s}</li>)}
                <li>Not sure? Share your concern on WhatsApp for guidance.</li>
              </ul>
            </div>
            <div className="card">
              <h2>What’s included</h2>
              <ul className="list-check">
                {service.included.map((i) => <li key={i}>{i}</li>)}
              </ul>
              <p className="form-note" style={{ marginTop: "0.75rem" }}><strong>Pricing:</strong> {service.priceNote}</p>
            </div>
          </div>

          <div className="card" style={{ marginTop: "1rem" }}>
            <h2>How it works</h2>
            <div className="steps" style={{ marginTop: "0.75rem" }}>
              {[
                ["1", "Contact & share concern", "Tell us your car details and what you’re experiencing."],
                ["2", "Inspect & diagnose", "We check the vehicle/service need and identify the scope."],
                ["3", "Estimate & approval", "We explain findings and share estimate. You approve before work."],
                ["4", "Service & handover", "Agreed work is completed with clear communication."],
              ].map(([n, t, d]) => (
                <div className="step" key={t}><div className="step-num">{n}</div><h3>{t}</h3><p>{d}</p></div>
              ))}
            </div>
          </div>

          <div className="callout" style={{ marginTop: "1rem" }}>
            <h2 style={{ fontSize: "1.2rem" }}>Good to know</h2>
            <ul className="list-check">
              <li>{business.brandsServicedNote}</li>
              <li>{business.policies.parts}</li>
              <li>{business.policies.pricing}</li>
            </ul>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h2>Frequently asked questions</h2>
            <div className="faq" style={{ marginTop: "0.75rem" }}>
              {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <h2>Related services</h2>
              <div className="grid grid-3" style={{ marginTop: "0.75rem" }}>
                {related.map((r) => (
                  <Link href={`/services/${r.slug}/`} className="card card-hover service-tile" key={r.slug}>
                    <span className="badge">{r.group}</span>
                    <h3>{r.name}</h3>
                    <p>{r.shortDescription}</p>
                    <span className="meta">View details →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: "2rem" }}>
            <h2>Serving Aya Nagar & nearby areas</h2>
            <div className="chip-row" style={{ marginTop: "0.5rem" }}>
              {serviceAreas.slice(0, 8).map((a) => (
                <Link key={a.slug} href={`/service-areas/${a.slug}/`} className="chip">{a.name}</Link>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginTop: "2rem", background: "var(--night)", color: "#dce4d6", borderColor: "#263328" }}>
            <h2 style={{ color: "#fff" }}>Ready to get {service.name.toLowerCase()}?</h2>
            <p style={{ color: "#c9d3c3" }}>Fastest response on WhatsApp. You can also call or send details by form — we’ll confirm availability directly.</p>
            <div className="btn-row">
              <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp now</a>
              <a className="btn btn-secondary" href={business.phone.telHref}>Call</a>
              <Link className="btn btn-secondary" href="/book">Request service</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
