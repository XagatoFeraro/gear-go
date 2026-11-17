import Link from "next/link";
import Icon from "@/components/Icon";
import { withBasePath } from "@/data/business";
import type { Photo } from "@/lib/photos";

type Props = {
  href: string;
  title: string;
  text: string;
  photo: Photo;
  idx: number;
};

export default function PhotoTile({ href, title, text, photo, idx }: Props) {
  const mid = photo.widths[Math.floor(photo.widths.length / 2)] ?? photo.widths[0];
  const jpg = photo.widths
    .map((w) => `${withBasePath(`/images/${photo.id}-${w}.jpg`)} ${w}w`)
    .join(", ");
  const webp = photo.widths
    .map((w) => `${withBasePath(`/images/${photo.id}-${w}.webp`)} ${w}w`)
    .join(", ");
  const sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 370px";

  return (
    <Link href={href} className="tile">
      <span className="tile__media">
        {photo.placeholder ? (
          <span className="photo__panel photo__panel--tile" role="img" aria-label={photo.alt}>
            <span className="photo__panel-label">Photo to be added</span>
            <span className="photo__panel-slot">{photo.id}</span>
          </span>
        ) : (
          <picture>
            <source type="image/webp" srcSet={webp} sizes={sizes} />
            <img
              src={withBasePath(`/images/${photo.id}-${mid}.jpg`)}
              srcSet={jpg}
              sizes={sizes}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              loading={idx < 3 ? "eager" : "lazy"}
              decoding="async"
            />
          </picture>
        )}
      </span>
      <span className="tile__body">
        <span className="tile__title">{title}</span>
        <span className="tile__text">{text}</span>
        <span className="tile__foot">
          Inspect &amp; quote <Icon name="arrow" size="sm" />
        </span>
      </span>
    </Link>
  );
}
