import { withBasePath } from "@/data/business";
import type { Photo } from "@/lib/photos";

type Props = {
  photo: Photo;
  sizes?: string;
  className?: string;
  eager?: boolean;
  showCaption?: boolean;
  ratio?: string;
};

function srcSet(photo: Photo, ext: "jpg" | "webp") {
  return photo.widths
    .map((w) => `${withBasePath(`/images/${photo.id}-${w}.${ext}`)} ${w}w`)
    .join(", ");
}

export default function Figure({
  photo,
  sizes = "100vw",
  className = "",
  eager = false,
  showCaption = true,
  ratio,
}: Props) {
  const fallbackWidth = photo.widths[Math.floor(photo.widths.length / 2)] ?? photo.widths[0];
  return (
    <figure className={`photo${className ? ` ${className}` : ""}`} style={ratio ? { ["--photo-ratio" as string]: ratio } : undefined}>
      <picture>
        <source type="image/webp" srcSet={srcSet(photo, "webp")} sizes={sizes} />
        <img
          src={withBasePath(`/images/${photo.id}-${fallbackWidth}.jpg`)}
          srcSet={srcSet(photo, "jpg")}
          sizes={sizes}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
        />
      </picture>
      {showCaption && photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
    </figure>
  );
}
