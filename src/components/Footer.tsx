import Link from "next/link";
import Icon from "@/components/Icon";
import {
  business,
  getEmailHref,
  getEmailLabel,
  getPhoneHref,
  getWhatsAppHref,
  isExternalUrl,
  isPlaceholder,
  services,
} from "@/data/business";

export default function Footer() {
  const featured = services.slice(0, 5);
  const whatsapp = getWhatsAppHref("Hi Gear Go Automobiles, I need help with my car.");

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <Link href="/" className="brand" aria-label={`${business.name} home`}>
              <span className="brand-mark">
                <Icon name="car" />
              </span>
              <span className="brand-name">
                Gear Go<small>Automobiles</small>
              </span>
            </Link>
            <p className="footer-address">{business.address.full}</p>
            <p className="footer-contact">
              <a href={getPhoneHref()}>{isPlaceholder(business.phone.display) ? "Call or WhatsApp" : business.phone.display}</a>
              <a
                href={whatsapp}
                target={isExternalUrl(whatsapp) ? "_blank" : undefined}
                rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
              >
                WhatsApp
              </a>
              <a href={getEmailHref()}>{getEmailLabel()}</a>
            </p>
            <a className="footer-directions" href={business.maps.directionsUrl} target="_blank" rel="noopener noreferrer">
              Get directions <Icon name="arrow" size="sm" />
            </a>
          </div>

          <div>
            <h4>Explore</h4>
            <Link href="/services/">All services</Link>
            <Link href="/service-areas/">Service areas</Link>
            <Link href="/why-gear-go/">Why Gear Go</Link>
            <Link href="/about/">About</Link>
            <Link href="/faq/">FAQ</Link>
            <Link href="/contact/">Contact</Link>
          </div>

          <div>
            <h4>Popular services</h4>
            {featured.map((service) => (
              <Link href={`/services/${service.slug}/`} key={service.slug}>
                {service.name}
              </Link>
            ))}
            <Link href="/services/">View all 20 services</Link>
          </div>

          <div>
            <h4>Visit</h4>
            <p className="footer-hours">{business.hours.display.join(" · ")}</p>
            <Link href="/book/">Request a service</Link>
            <Link href="/privacy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
            <p className="footer-note">Prices are confirmed after inspection. No payment or automatic booking is taken on this website.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p>Aya Nagar, New Delhi · Multi-brand car service</p>
        </div>
      </div>
    </footer>
  );
}
