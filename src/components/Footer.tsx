import Link from "next/link";
import ChannelLink from "@/components/ChannelLink";
import Icon from "@/components/Icon";
import { business, getEmailLabel, getPhoneLabel, services } from "@/data/business";

export default function Footer() {
  const featured = services.slice(0, 5);
  const whatsappMessage = "Hi Gear Go Automobiles, I need help with my car.";

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label={`${business.name} home`}>
              <span className="brand__name">Gear Go</span>
              <span className="brand__sub">Automobiles · Aya Nagar</span>
            </Link>
            <p>
              Multi-brand car workshop in Aya Nagar, New Delhi. Inspection first, estimate before
              work, your approval before anything starts.
            </p>
            <p>{business.address.full}</p>
            <div className="footer-contacts">
              <ChannelLink channel="phone" fallback="Contact options">
                {getPhoneLabel()}
              </ChannelLink>
              <ChannelLink channel="whatsapp" message={whatsappMessage} fallback="Enquire">
                WhatsApp
              </ChannelLink>
              <ChannelLink channel="email" fallback="Send an enquiry">
                {getEmailLabel()}
              </ChannelLink>
            </div>
            <a
              className="footer-directions"
              href={business.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions <Icon name="arrow" size="sm" />
            </a>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <Link href="/services/">All services</Link>
            <Link href="/service-areas/">Service areas</Link>
            <Link href="/why-gear-go/">Why Gear Go</Link>
            <Link href="/about/">About</Link>
            <Link href="/faq/">FAQ</Link>
            <Link href="/contact/">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Popular services</h4>
            {featured.map((service) => (
              <Link href={`/services/${service.slug}/`} key={service.slug}>
                {service.name}
              </Link>
            ))}
            <Link href="/services/">All {services.length} services</Link>
          </div>

          <div className="footer-col">
            <h4>Workshop</h4>
            {business.hours.display.map((row) => (
              <p key={row}>{row}</p>
            ))}
            <Link href="/book/">Request a service</Link>
            <Link href="/privacy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
            <p className="footer-note">
              Prices are confirmed after inspection. No payment or booking is taken on this website.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>Aya Nagar, New Delhi · Multi-brand car service</p>
        </div>
      </div>
    </footer>
  );
}
