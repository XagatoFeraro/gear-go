import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { getChannelHref, isExternalUrl, type Channel } from "@/data/business";

type Props = {
  channel: Channel;
  message?: string;
  className?: string;
  /** Label rendered when the channel has real contact details. */
  children: ReactNode;
  /** Honest label rendered when the channel is not configured yet. */
  fallback?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  ariaLabel?: string;
};

/**
 * Renders a real WhatsApp / tel / mailto link when that channel is configured.
 * Until then it points to the contact page with an honest, non-channel label —
 * never back to the page it is already on.
 */
export default function ChannelLink({
  channel,
  message,
  className,
  children,
  fallback = "Send an enquiry",
  onClick,
  ariaLabel,
}: Props) {
  const href = getChannelHref(channel, message);

  if (!href) {
    return (
      <Link href="/contact/#enquiry" className={className} onClick={onClick} aria-label={ariaLabel}>
        {fallback}
      </Link>
    );
  }

  const external = isExternalUrl(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
