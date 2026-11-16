import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { business, services, serviceAreas } from "@/data/business";
import { getFaqJsonLd } from "@/lib/seo";

const quickServices = [
  { label: "Periodic service", slug: "periodic-car-service" },
  { label: "AC repair", slug: "ac-service-repair" },
  { label: "Brakes & suspension", slug: "brake-suspension" },
  { label: "Denting & painting", slug: "denting-painting" },
  { label: "Car wash & spa", slug: "car-spa-cleaning" },
  { label: "Battery", slug: "battery-service" },
  { label: "Tyres & wheels", slug: "tyres-wheel-care" },
  { label: "Engine diagnostics", slug: "engine-diagnostics" },
  { label: "Not sure", slug: "" },
];

const homeFaqs = [
  { q: "How do I book a car service?", a: "Message us on WhatsApp, call, or send an enquiry form with your car and concern. We’ll confirm availability and the next step directly. No online payment or automatic booking." },
  { q: "Do you provide an estimate before work?", a: "Yes. We inspect the vehicle, explain findings in plain language, and share the scope and estimate. Work begins only after your approval." },
  { q: "What car services do you offer near Aya Nagar?", a: "We offer periodic car servicing, mechanic and electrical repairs, AC service, car wash and detailing, denting and painting (dent removal), brakes, battery, tyres, diagnostics, inspections and more for all car brands." },
  { q: "What parts do you use and is there a warranty?", a: `${business.policies.parts} ${business.policies.warranty}` },
  { q: "Do you offer pickup, drop-off, towing or insurance help?", a: `${business.policies.pickupDropoff} ${business.policies.towing} ${business.policies.insurance}` },
];

export default function Home() {
  const waBase = business.whatsapp.url.includes("{{") ? "/contact" : business.whatsapp.url;
  const wa = waBase === "/contact" ? "/contact" : `${waBase}?text=${encodeURIComponent("Hi Gear Go Automobiles, I need car service. My car is ____ and the issue/service needed is ____. My location is ____.")}`;
  const featured = services.slice(0, 8);

  return (
    <>
      <JsonLd data={getFaqJsonLd(homeFaqs)} />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Mechanic & car garage · Aya Nagar, New Delhi</span>
            <h1>Car service, repairs & car care near you</h1>
            <p className="lead">
              Multi-brand car servicing, mechanic repairs, AC service, car wash, dent removal &amp; detailing — with
              inspection first and your approval before work.
            </p>
            <div className="btn-row stack-mobile" style={{ marginTop: "1.25rem" }}>
              <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp — fastest response</a>
              <a className="btn btn-secondary" href={business.phone.telHref}>Call {business.phone.display}</a>
              <a className="btn btn-secondary" href={business.maps.directionsUrl} target="_blank" rel="noopener noreferrer">Directions</a>
            </div>
            <div className="trust-strip" aria-label="Highlights">
              <span className="trust-pill">All car brands</span>
              <span className="trust-pill">Inspection &amp; estimate first</span>
              <span className="trust-pill">Parts approved before fitment</span>
              <span className="trust-pill">Aya Nagar · South Delhi</span>
            </div>
            <p className="hero-meta">{business.hours.display.join(" · ")} · {business.address.full}</p>
          </div>
          <div className="stack">
            <div className="placeholder-photo" role="img" aria-label="Placeholder for real Gear Go Automobiles workshop photo">
              Real workshop photo — add actual garage/team photo before launch.
            </div>
            <div className="card" style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.14)" }}>
              <p style={{ margin: "0 0 0.6rem", color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)" }}>What do you need help with?</p>
              <div className="chip-row">
                {quickServices.map((s) => (
                  <Link key={s.label} href={s.slug ? `/services/${s.slug}/` : "/book"} className="chip">{s.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm alt">
        <div className="container">
          <div className="chip-row" style={{ justifyContent: "center", gap: "0.75rem 1rem" }}>
            {["Transparent inspection-first service", "Original or equivalent parts (approved)", "Pickup, drop-off & towing (confirm availability)", "Insurance coordination available", "Workmanship warranty — ask terms"].map((t) => (
              <span key={t} className="badge" style={{ background: "#fff", border: "1px solid var(--line)", color: "var(--ink-soft)", padding: "0.4rem 0.7rem", fontSize: "0.85rem" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Services</span>
            <h2>Car services for every need</h2>
            <p className="lead">Servicing, mechanic repairs, car wash, dent removal, AC, brakes, battery, tyres and more. Tap a service to see details or enquire.</p>
          </div>
          <div className="grid grid-4">
            {featured.map((s) => (
              <Link href={`/services/${s.slug}/`} className="card card-hover service-tile" key={s.slug}>
                <span className="badge">{s.group}</span>
                <h3>{s.name}</h3>
                <p>{s.shortDescription}</p>
                <span className="meta">Price after inspection →</span>
              </Link>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: "1.5rem" }}>
            <Link className="btn btn-primary" href="/services">View all 20 services</Link>
            <Link className="btn btn-secondary" href="/book">Request a service</Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">How it works</span>
            <h2>Simple, transparent process</h2>
          </div>
          <div className="steps">
            {[
              ["1", "Contact us", "WhatsApp, call or send details — tell us your car and concern."],
              ["2", "Inspect & diagnose", "We check the vehicle and explain what’s needed in plain language."],
              ["3", "Estimate & approval", "You get scope and estimate. Work starts only after your approval."],
              ["4", "Service & handover", "Agreed work completed and updates shared. Pickup/drop-off can be discussed."],
            ].map(([n, title, text]) => (
              <div className="step" key={title}>
                <div className="step-num">{n}</div>
                <h3 style={{ marginBottom: "0.35rem" }}>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why Gear Go</span>
            <h2>Clear, honest car care</h2>
            <p className="lead">A local garage in Aya Nagar for customers who want straight answers, fair process, and work they can approve.</p>
          </div>
          <div className="grid grid-2">
            <ul className="list-check">
              <li>Inspection before recommendation — no guesswork.</li>
              <li>Estimate shared before paid work; your approval comes first.</li>
              <li>{business.policies.parts}</li>
              <li>{business.brandsServicedNote}</li>
            </ul>
            <ul className="list-check">
              <li>{business.policies.pickupDropoff}</li>
              <li>{business.policies.towing}</li>
              <li>{business.policies.insurance}</li>
              <li>{business.policies.warranty}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Service areas</span>
            <h2>Garage near Aya Nagar & nearby areas</h2>
            <p className="lead">Convenient for Aya Nagar and surrounding South Delhi / NCR localities.</p>
          </div>
          <div className="grid grid-4">
            {serviceAreas.map((a) => (
              <Link href={`/service-areas/${a.slug}/`} className="card card-hover" key={a.slug}>
                <h3 style={{ marginBottom: "0.2rem" }}>{a.name}</h3>
                <p className="muted small" style={{ margin: 0 }}>Car service near {a.name} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "start" }}>
            <div>
              <div className="section-head">
                <span className="eyebrow">FAQ</span>
                <h2>Common questions</h2>
              </div>
              <div className="faq">
                {homeFaqs.map((f) => (
                  <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
                ))}
              </div>
              <p style={{ marginTop: "1rem" }}><Link href="/faq">View all FAQs →</Link></p>
            </div>
            <div className="stack">
              <div className="card">
                <span className="eyebrow">Visit or contact</span>
                <h3 style={{ fontSize: "1.35rem" }}>Reach Gear Go Automobiles</h3>
                <p style={{ marginBottom: "0.5rem" }}><strong>Address</strong><br />{business.address.full}</p>
                <p style={{ marginBottom: "0.5rem" }}><strong>Hours</strong><br />{business.hours.display.join(" · ")}</p>
                <p className="small muted" style={{ marginBottom: "1rem" }}>{business.policies.pricing}</p>
                <div className="btn-row stack-mobile">
                  <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp now</a>
                  <a className="btn btn-secondary" href={business.phone.telHref}>Call</a>
                  <a className="btn btn-secondary" href={business.maps.directionsUrl} target="_blank" rel="noopener noreferrer">Directions</a>
                </div>
              </div>
              <div className="callout">
                <h3 style={{ marginBottom: "0.25rem" }}>Need car wash, dent removal or servicing?</h3>
                <p className="muted" style={{ marginBottom: "0.75rem" }}>Pick a service or send your concern — we’ll guide you on the next step.</p>
                <Link className="btn btn-dark" href="/book">Request a service</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
