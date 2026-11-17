import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import ChannelLink from "@/components/ChannelLink";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import { business, getPhoneLabel } from "@/data/business";
import { getBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Why Choose Our Garage",
  description: `Why car owners choose ${business.name}: inspection-first service, clear estimates, approved parts, and transparent communication in Aya Nagar, New Delhi.`,
  path: "/why-gear-go/",
});

const whatsappMessage =
  "Hi Gear Go Automobiles, I'd like to understand how your service process works.";

const points = [
  [
    "Inspection before recommendation",
    "We check the vehicle and concern first, so recommendations are based on what we find, not assumptions.",
  ],
  [
    "Estimate and approval before work",
    "Scope and estimate are shared clearly. Paid work proceeds only after your approval.",
  ],
  [
    "Plain-language explanations",
    "We explain issues and options in simple terms so you can decide confidently.",
  ],
  ["All car brands and models", business.brandsServicedNote],
  ["Parts you approve", business.policies.parts],
  ["Practical support", `${business.policies.pickupDropoff} ${business.policies.towing}`],
  ["Insurance coordination", business.policies.insurance],
  ["Workmanship warranty", business.policies.warranty],
];

export default function WhyPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Why Gear Go", path: "/why-gear-go/" },
        ])}
      />

      <PageHero
        label="Why Gear Go"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Why Gear Go" }]}
        title="Car care you can follow, question and approve"
        lede="Honest inspection, clear estimates, your approval before work, and practical support for car owners in Aya Nagar and nearby areas."
        actions={
          <>
            <ChannelLink
              channel="whatsapp"
              message={whatsappMessage}
              className="btn btn--primary"
              fallback="Send an enquiry"
            >
              Ask us anything <Icon name="whatsapp" size="sm" />
            </ChannelLink>
            <Link className="btn btn--light" href="/services/">
              Explore services
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            label="What is different"
            title="The process is the promise"
            lede="We cannot promise every repair will be cheap or quick. We can be clear about how decisions are made, what is included, and what needs your approval."
          />
          <div className="ledger">
            {points.map(([title, text], i) => (
              <div className="lrow" key={title}>
                <span>
                  <span className="lrow__title">
                    <span className="mono muted small">{String(i + 1).padStart(2, "0")} · </span>
                    {title}
                  </span>
                  <span className="lrow__text">{text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap split">
          <div>
            <SectionHead
              label="Before and during"
              title="What you should expect"
              lede="A simple standard for every job, whether it is a routine service or a specific repair."
            />
            <ol className="spec">
              {[
                [
                  "You describe the concern",
                  "Share the symptom, car details and any photos or videos that help.",
                ],
                [
                  "We inspect the vehicle",
                  "The condition and reported concern are checked before recommendations.",
                ],
                [
                  "You see the scope and estimate",
                  "Findings and options are explained; the estimate is shared for approval.",
                ],
                [
                  "Only approved work proceeds",
                  "Additional findings are discussed separately, not added silently.",
                ],
                [
                  "Handover is explained",
                  "You are told what was done and what to watch for next.",
                ],
              ].map(([title, text], i) => (
                <li key={title}>
                  <span className="spec__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{title}.</strong> {text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="aside">
            <div className="aside-card">
              <h3>Questions we would rather answer upfront</h3>
              <div className="hours">
                <div className="hours__row">
                  <strong>What will it cost?</strong>
                  <span>Confirmed after inspection.</span>
                </div>
                <div className="hours__row">
                  <strong>Extra work without asking?</strong>
                  <span>No. Paid work needs approval.</span>
                </div>
                <div className="hours__row">
                  <strong>Which parts?</strong>
                  <span>Only what you approve.</span>
                </div>
                <div className="hours__row">
                  <strong>Collecting the car?</strong>
                  <span>Ask; it depends on the arrangement.</span>
                </div>
              </div>
              <p className="aside-note">{business.policies.pricing}</p>
              <Link className="text-link mt-4" href="/faq/">
                Read all FAQs <Icon name="arrow" size="sm" />
              </Link>
            </div>
            <div className="aside-card">
              <h3>Talk it through</h3>
              <p>Share your car make, model and concern. We will tell you what we can help with.</p>
              <div className="aside-actions">
                <ChannelLink
                  channel="whatsapp"
                  message={whatsappMessage}
                  className="btn btn--primary btn--block"
                  fallback="Send an enquiry"
                >
                  <Icon name="whatsapp" size="sm" /> WhatsApp us
                </ChannelLink>
                <ChannelLink channel="phone" className="btn btn--outline btn--block" fallback="Contact options">
                  <Icon name="phone" size="sm" /> {getPhoneLabel()}
                </ChannelLink>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Have a concern you want checked?"
        text="Send your car details through the contact options. A person will reply directly."
        actions={
          <>
            <ChannelLink
              channel="whatsapp"
              message={whatsappMessage}
              className="btn btn--dark"
              fallback="Send an enquiry"
            >
              WhatsApp us <Icon name="whatsapp" size="sm" />
            </ChannelLink>
            <Link className="btn btn--outline" href="/book/">
              Request a service
            </Link>
          </>
        }
      />
    </>
  );
}
