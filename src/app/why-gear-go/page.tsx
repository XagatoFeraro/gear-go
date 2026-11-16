import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import { business, getWhatsAppHref, isExternalUrl } from "@/data/business";
import { getBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Why Choose Our Garage",
  description: `Why car owners choose ${business.name}: inspection-first service, clear estimates, approved parts, and transparent communication in Aya Nagar, New Delhi.`,
  path: "/why-gear-go/",
});

const whatsappMessage = "Hi Gear Go Automobiles, I’d like to understand how your service process works.";

const points = [
  {
    icon: "search" as const,
    title: "Inspection before recommendation",
    text: "We check the vehicle and concern first, so recommendations are based on what we find — not assumptions.",
  },
  {
    icon: "shield" as const,
    title: "Estimate & approval before work",
    text: "Scope and estimate are shared clearly. Paid work proceeds only after your approval.",
  },
  {
    icon: "message" as const,
    title: "Plain-language explanations",
    text: "We explain issues and options in simple terms so you can decide confidently.",
  },
  {
    icon: "car" as const,
    title: "All car brands & models",
    text: business.brandsServicedNote,
  },
  {
    icon: "checkCircle" as const,
    title: "Parts you approve",
    text: business.policies.parts,
  },
  {
    icon: "route" as const,
    title: "Convenience support",
    text: `${business.policies.pickupDropoff} ${business.policies.towing}`,
  },
  {
    icon: "file" as const,
    title: "Insurance coordination",
    text: business.policies.insurance,
  },
  {
    icon: "wrench" as const,
    title: "Workmanship warranty",
    text: business.policies.warranty,
  },
];

export default function WhyPage() {
  const whatsapp = getWhatsAppHref(whatsappMessage);

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Why Gear Go", path: "/why-gear-go/" },
        ])}
      />

      <PageHero
        eyebrow="Why Gear Go"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Why Gear Go" }]}
        title={
          <>
            Car care you can <em>follow, question and approve.</em>
          </>
        }
        lede="Honest inspection, clear estimates, your approval before work, and practical support for car owners in Aya Nagar and nearby areas."
        actions={
          <>
            <a
              className="btn btn-lime"
              href={whatsapp}
              target={isExternalUrl(whatsapp) ? "_blank" : undefined}
              rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            >
              Ask us anything <Icon name="whatsapp" size="sm" />
            </a>
            <Link className="btn btn-outline-light" href="/services/">
              Explore services
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What’s different"
            title="The process is the promise"
            lede="We can’t promise every repair will be cheap or quick. We can be clear about how decisions are made, what’s included and what needs your approval."
            center
          />
          <div className="feature-grid">
            {points.map((point) => (
              <div className="feature-card" key={point.title}>
                <span className="icon-box">
                  <Icon name={point.icon} />
                </span>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="container split align-start">
          <div>
            <SectionHead
              eyebrow="Before and during"
              title="What you should expect"
              lede="A simple standard for every job, whether it’s a routine service or a specific repair."
            />
            <div className="checklist">
              {[
                ["You describe the concern", "Share the symptom, car details and any photos or videos that help."],
                ["We inspect the vehicle", "The condition and reported concern are checked before recommendations."],
                ["You see the scope and estimate", "Findings and options are explained; the estimate is shared for approval."],
                ["Only approved work proceeds", "Additional findings are discussed separately, not added silently."],
                ["Handover is explained", "You’re told what was done and what to watch for next."],
              ].map(([title, text]) => (
                <div className="checklist-row" key={title}>
                  <span className="check-icon">
                    <Icon name="check" />
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="compare-card">
            <span className="badge badge-lime no-dot">Clear from the start</span>
            <h2>Questions we’d rather answer upfront</h2>
            <div className="compare-row">
              <strong>What will it cost?</strong>
              <p>
                Price depends on the vehicle and scope, so it’s confirmed after inspection. {business.policies.pricing}
              </p>
            </div>
            <div className="compare-row">
              <strong>Will extra work happen without asking?</strong>
              <p>No. Paid work needs your approval. Additional findings are discussed separately.</p>
            </div>
            <div className="compare-row">
              <strong>Which parts will be used?</strong>
              <p>{business.policies.parts}</p>
            </div>
            <div className="compare-row">
              <strong>Can I get help collecting the car?</strong>
              <p>{business.policies.pickupDropoff}</p>
            </div>
            <Link className="text-link mt-4" href="/faq/">
              Read all FAQs <Icon name="arrow" size="sm" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a concern you want checked?"
        text="Send your car details on WhatsApp or call. We’ll confirm availability and the next step."
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
            <Link className="btn btn-outline" href="/book/">
              Request a service
            </Link>
          </>
        }
      />
    </>
  );
}
