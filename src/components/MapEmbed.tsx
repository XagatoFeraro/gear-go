import Icon from "@/components/Icon";
import { business, getMapEmbedUrl } from "@/data/business";

type Props = {
  title?: string;
  className?: string;
  caption?: boolean;
};

/**
 * Real Google Maps embed. No API key needed; the query is built from the
 * confirmed workshop address. Loaded lazily so it never blocks first paint.
 */
export default function MapEmbed({
  title = `${business.name} location map`,
  className = "",
  caption = true,
}: Props) {
  return (
    <div className={`map${className ? ` ${className}` : ""}`}>
      <iframe
        src={getMapEmbedUrl()}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      {caption ? (
        <p className="map__caption">
          <Icon name="pin" size="sm" />
          <span>{business.address.full}</span>
        </p>
      ) : null}
    </div>
  );
}
