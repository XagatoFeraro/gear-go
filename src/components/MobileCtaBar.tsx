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
    <nav className="mobile-bar" aria-label="Quick contact">
      <a href={getPhoneHref()}>
        <Icon name="phone" />
        <span>Call</span>
      </a>
      <a
        href={whatsapp}
        className="is-primary"
        target={isExternalUrl(whatsapp) ? "_blank" : undefined}
        rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
      >
        <Icon name="whatsapp" />
        <span>WhatsApp</span>
      </a>
      <a href={business.maps.directionsUrl} target="_blank" rel="noopener noreferrer">
        <Icon name="pin" />
        <span>Directions</span>
      </a>
    </nav>
  );
}
