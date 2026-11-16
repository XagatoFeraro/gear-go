import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MapArt from "@/components/MapArt";
import PageHero from "@/components/PageHero";
import ProcessVisual from "@/components/ProcessVisual";
import SectionHead from "@/components/SectionHead";
import { business, getPhoneHref, getPhoneLabel, getWhatsAppHref, isExternalUrl } from "@/data/business";
import { getBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Our Car Garage in Aya Nagar",
  description: `About ${business.name}, a multi-brand car service garage in Aya Nagar, New Delhi offering transparent, inspection-first car servicing and repairs.`,
  path: "/about/",
});

const whatsappMessage = "Hi Gear Go Automobiles, I’d like to know more about the garage and services.";

export default function AboutPage() {
  const whatsapp = getWhatsAppHref(whatsappMessage);

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ])}
      />

      <PageHero
        eyebrow="About us"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "About" }]}
        title={
          <>
            A local garage built on <em>clear communication.</em>
          </>
        }
        lede={`${business.name} is a multi-brand car service garage in Aya Nagar, New Delhi — focused on inspection-first recommendations, plain-language explanations, and work you approve.`}
        actions={
          <>
            <a
              className="btn btn-lime"
              href={whatsapp}
              target={isExternalUrl(whatsapp) ? "_blank" : undefined}
              rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            >
              Talk to us <Icon name="whatsapp" size="sm" />
            </a>
            <Link className="btn btn-outline-light" href="/services/">
              View services
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead
              eyebrow="Who we are"
              title="Car care for Aya Nagar and nearby South Delhi"
              lede={`We serve car owners in Aya Nagar and surrounding South Delhi/NCR areas with servicing, mechanic repairs, car wash, dent removal, diagnostics and more. ${business.brandsServicedNote}`}
            />
            <p className="lead">
              The workshop is in Phase 4, H Block, Aya Nagar, behind Fitness Club Gym. Whether it’s a
              routine service, a warning light, a weak AC or a dent you want fixed, the starting point is
              the same: look at the vehicle, explain what we find, and agree the work before it begins.
            </p>
            <div className="checklist">
              <div className="checklist-row">
                <span className="check-icon">
                  <Icon name="check" />
                </span>
                <div>
                  <strong>Multi-brand workshop</strong>
                  <span>Servicing and repairs for all car brands and models.</span>
                </div>
              </div>
              <div className="checklist-row">
                <span className="check-icon">
                  <Icon name="check" />
                </span>
                <div>
                  <strong>Inspection-first approach</strong>
                  <span>Recommendations follow what we find on the vehicle.</span>
                </div>
              </div>
              <div className="checklist-row">
                <span className="check-icon">
                  <Icon name="check" />
                </span>
                <div>
                  <strong>Approval before paid work</strong>
                  <span>Scope and estimate are shared before anything proceeds.</span>
                </div>
              </div>
            </div>
          </div>
          <ProcessVisual />
        </div>
      </section>

      <section className="section cream">
        <div className="container">
          <SectionHead
            eyebrow="How we work"
            title="Straight answers, practical options"
            lede="A few principles that shape every visit, from a quick check to bodywork."
            center
          />
          <div className="feature-grid">
            {[
              {
                icon: "search" as const,
                title: "Look before recommending",
                text: "We check the vehicle and the concern you reported, so the recommendation matches the actual condition.",
              },
              {
                icon: "message" as const,
                title: "Explain in plain language",
                text: "Findings and options are explained simply, without pressure or jargon.",
              },
              {
                icon: "shield" as const,
                title: "Agree the estimate first",
                text: "Paid work begins only after you’ve seen the scope and estimate and given approval.",
              },
              {
                icon: "wrench" as const,
                title: "Do the agreed work",
                text: "The approved work is completed and the handover is explained clearly.",
              },
              {
                icon: "checkCircle" as const,
                title: "Parts you approve",
                text: business.policies.parts,
              },
              {
                icon: "route" as const,
                title: "Practical support",
                text: `${business.policies.pickupDropoff} ${business.policies.towing}`,
              },
            ].map((item) => (
              <div className="feature-card" key={item.title}>
                <span className="icon-box">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split-map">
          <div>
            <SectionHead
              eyebrow="Visit"
              title="Find the workshop"
              lede="Use directions for the current route and travel time. If you’re unsure about parking or arrival, call or WhatsApp before you leave."
            />
            <div className="visit-row">
              <Icon name="pin" />
              <div>
                <strong>Address</strong>
                <span>{business.address.full}</span>
              </div>
            </div>
            <div className="visit-row">
              <Icon name="clock" />
              <div>
                <strong>Hours</strong>
                <span>{business.hours.display.join(" · ")}</span>
              </div>
            </div>
            <div className="visit-row">
              <Icon name="info" />
              <div>
                <strong>Pricing</strong>
                <span>{business.policies.pricing}</span>
              </div>
            </div>
            <div className="btn-group mt-6">
              <a
                className="btn btn-dark"
                href={business.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <Icon name="external" size="sm" />
              </a>
              <a className="btn btn-outline" href={getPhoneHref()}>
                {getPhoneLabel()}
              </a>
            </div>
          </div>
          <MapArt />
        </div>
      </section>

      <CtaBand
        title="Have a question before you visit?"
        text="Tell us your car and concern. We’ll guide you on the likely next step and what to expect."
        actions={
          <>
            <a
              className="btn btn-dark"
              href={whatsapp}
              target={isExternalUrl(whatsapp) ? "_blank" : undefined}
              rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            >
              WhatsApp us <Icon name="whatsapp" size="sm" />
            </a>
            <Link className="btn btn-outline" href="/contact/">
              Contact the garage
            </Link>
          </>
        }
      />
    </>
  );
}
