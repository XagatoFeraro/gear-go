import Icon from "@/components/Icon";
import {
  business,
  getPhoneHref,
  getWhatsAppHref,
  isExternalUrl,
} from "@/data/business";

export default function MobileCtaBar() {
  const whatsapp = getWhatsAppHref("Hi Gear Go Automobiles, I need help with my car.");

  return (
    <nav className="mobile-cta" aria-label="Quick contact">
      <a href={getPhoneHref()} className="mcta">
        <Icon name="phone" size="sm" />
        <span>Call</span>
      </a>
      <a
        href={whatsapp}
        className="mcta primary"
        target={isExternalUrl(whatsapp) ? "_blank" : undefined}
        rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
      >
        <Icon name="whatsapp" size="sm" />
        <span>WhatsApp</span>
      </a>
      <a
        href={business.maps.directionsUrl}
        className="mcta"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="pin" size="sm" />
        <span>Directions</span>
      </a>
    </nav>
  );
}
