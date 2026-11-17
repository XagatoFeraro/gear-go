import type { ReactNode } from "react";
import Icon from "@/components/Icon";
import { getChannelHref, isExternalUrl, type Channel } from "@/data/business";

type Props = {
  channel: Channel;
  message?: string;
  label: string;
  value: ReactNode;
};

const icons: Record<Channel, "whatsapp" | "phone" | "mail"> = {
  whatsapp: "whatsapp",
  phone: "phone",
  email: "mail",
};

/** Contact-page row: a real channel link, or an explicit pending state that never self-links. */
export default function ContactChannelRow({ channel, message, label, value }: Props) {
  const href = getChannelHref(channel, message);
  const icon = icons[channel];

  if (!href) {
    return (
      <div className="crow crow--pending">
        <span className="crow__icon">
          <Icon name={icon} size="sm" />
        </span>
        <span className="crow__main">
          <span className="crow__label">{label}</span>
          <span className="crow__value">Details to be confirmed — use the enquiry form</span>
        </span>
      </div>
    );
  }

  const external = isExternalUrl(href);
  return (
    <a
      className="crow"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="crow__icon">
        <Icon name={icon} size="sm" />
      </span>
      <span className="crow__main">
        <span className="crow__label">{label}</span>
        <span className="crow__value">{value}</span>
      </span>
      <Icon name={external ? "external" : "arrow"} size="sm" />
    </a>
  );
}
