import ChannelLink from "@/components/ChannelLink";
import Icon from "@/components/Icon";
import { business } from "@/data/business";

export default function MobileCtaBar() {
  const whatsappMessage = "Hi Gear Go Automobiles, I need help with my car.";

  return (
    <nav className="mobile-bar" aria-label="Quick contact">
      <ChannelLink channel="phone" fallback="Contact">
        <Icon name="phone" />
        <span>Call</span>
      </ChannelLink>
      <ChannelLink
        channel="whatsapp"
        message={whatsappMessage}
        className="is-primary"
        fallback="Enquire"
      >
        <Icon name="whatsapp" />
        <span>WhatsApp</span>
      </ChannelLink>
      <a href={business.maps.directionsUrl} target="_blank" rel="noopener noreferrer">
        <Icon name="pin" />
        <span>Directions</span>
      </a>
    </nav>
  );
}
