import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import ChannelLink from "@/components/ChannelLink";
import Figure from "@/components/Figure";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import MapEmbed from "@/components/MapEmbed";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import { business, getPhoneLabel } from "@/data/business";
import { photos } from "@/lib/photos";
import { getBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Our Car Garage in Aya Nagar",
  description: `About ${business.name}, a multi-brand car service garage in Aya Nagar, New Delhi offering transparent, inspection-first car servicing and repairs.`,
  path: "/about/",
});

const whatsappMessage = "Hi Gear Go Automobiles, I'd like to know more about the garage and services.";

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ])}
      />

      <PageHero
        label="About us"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "About" }]}
        title="A local garage built on clear communication"
        lede={`${business.name} is a multi-brand car service garage in Aya Nagar, New Delhi. Inspection-first recommendations, plain-language explanations, and work you approve.`}
        actions={
          <>
            <ChannelLink
              channel="whatsapp"
              message={whatsappMessage}
              className="btn btn--primary"
              fallback="Send an enquiry"
            >
              Talk to us <Icon name="whatsapp" size="sm" />
            </ChannelLink>
            <Link className="btn btn--light" href="/services/">
              View services
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="wrap split">
          <div>
            <SectionHead
              label="Who we are"
              title="Car care for Aya Nagar and nearby South Delhi"
              lede={`We serve car owners in Aya Nagar and surrounding South Delhi and NCR areas with servicing, mechanic repairs, car wash, dent removal, diagnostics and more. ${business.brandsServicedNote}`}
            />
            <p className="lede">
              The workshop is in Phase 4, H Block, Aya Nagar, behind Fitness Club Gym. Whether it is a
              routine service, a warning light, a weak AC or a dent you want fixed, the starting point is
              the same: look at the vehicle, explain what we find, and agree the work before it begins.
            </p>
            <ol className="spec mt-6">
              {[
                ["Multi-brand workshop", "Servicing and repairs for all car brands and models."],
                ["Inspection-first approach", "Recommendations follow what we find on the vehicle."],
                ["Approval before paid work", "Scope and estimate are shared before anything proceeds."],
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
          <div className="plate">
            <Figure photo={photos.aboutFrontage} sizes="(max-width: 760px) 100vw, 260px" showCaption={false} />
            <Figure photo={photos.aboutDesk} sizes="(max-width: 760px) 100vw, 260px" showCaption={false} />
            <Figure photo={photos.aboutWorkshop} sizes="(max-width: 760px) 100vw, 260px" showCaption={false} />
          </div>
        </div>
        <div className="wrap">
          <p className="photo-note">
            Photo slots for real Gear Go photos.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap">
          <SectionHead
            label="How we work"
            title="Straight answers, practical options"
            lede="A few principles that shape every visit, from a quick check to bodywork."
          />
          <div className="ledger">
            {[
              [
                "Look before recommending",
                "We check the vehicle and the concern you reported, so the recommendation matches the actual condition.",
              ],
              [
                "Explain in plain language",
                "Findings and options are explained simply, without pressure or jargon.",
              ],
              [
                "Agree the estimate first",
                "Paid work begins only after you have seen the scope and estimate and given approval.",
              ],
              [
                "Do the agreed work",
                "The approved work is completed and the handover is explained clearly.",
              ],
              ["Parts you approve", business.policies.parts],
              [
                "Practical support",
                `${business.policies.pickupDropoff} ${business.policies.towing}`,
              ],
            ].map(([title, text], i) => (
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

      <section className="section">
        <div className="wrap split split--wide">
          <div>
            <SectionHead
              label="Visit"
              title="Find the workshop"
              lede="Use directions for the current route and travel time. If you are unsure about parking or arrival, ask when you enquire."
            />
            <div className="hours">
              <div className="hours__row">
                <strong>Address</strong>
                <span>{business.address.full}</span>
              </div>
              {business.hours.display.map((row) => {
                const [day, ...rest] = row.split(": ");
                return (
                  <div className="hours__row" key={row}>
                    <strong>{day}</strong>
                    <span>{rest.join(": ")}</span>
                  </div>
                );
              })}
            </div>
            <p className="note mt-6">
              <Icon name="info" size="sm" />
              <span>{business.policies.pricing}</span>
            </p>
            <div className="btn-row mt-6">
              <a
                className="btn btn--dark"
                href={business.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <Icon name="external" size="sm" />
              </a>
              <ChannelLink channel="phone" className="btn btn--outline" fallback="Contact options">
                <Icon name="phone" size="sm" /> {getPhoneLabel()}
              </ChannelLink>
            </div>
          </div>
          <MapEmbed title="Gear Go Automobiles workshop location in Aya Nagar, New Delhi" />
        </div>
      </section>

      <CtaBand
        title="Have a question before you visit?"
        text="Tell us your car and concern. We will explain what the visit should cover."
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
            <Link className="btn btn--outline" href="/contact/">
              Contact the garage
            </Link>
          </>
        }
      />
    </>
  );
}
