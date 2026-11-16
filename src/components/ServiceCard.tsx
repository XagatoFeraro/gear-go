import Link from "next/link";
import Icon from "@/components/Icon";
import { getServiceIcon } from "@/lib/serviceIcons";
import type { Service } from "@/data/business";

type Props = {
  service: Service;
  index?: number;
  showGroup?: boolean;
};

export default function ServiceCard({ service, index, showGroup = true }: Props) {
  return (
    <Link href={`/services/${service.slug}/`} className="service-card">
      {typeof index === "number" ? <span className="num">{String(index + 1).padStart(2, "0")}</span> : null}
      <span className="service-icon">
        <Icon name={getServiceIcon(service)} />
      </span>
      {showGroup ? (
        <div className="service-tags">
          <span className="badge no-dot">{service.group}</span>
        </div>
      ) : null}
      <h3>{service.name}</h3>
      <p>{service.shortDescription}</p>
      <div className="meta">
        <span className="price">Price after inspection</span>
        <span className="arrow">
          <Icon name="arrow" size="sm" />
        </span>
      </div>
    </Link>
  );
}
