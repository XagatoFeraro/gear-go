import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/Icon";

export type Crumb = { name: string; href?: string };

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  breadcrumb?: Crumb[];
  actions?: ReactNode;
  compact?: boolean;
};

export default function PageHero({ eyebrow, title, lede, breadcrumb, actions, compact = false }: Props) {
  return (
    <section className={`page-hero${compact ? " compact-hero" : ""}`}>
      <div className="container page-hero-inner">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav className="breadcrumb-site" aria-label="Breadcrumb">
            {breadcrumb.map((item, i) => (
              <span className="breadcrumb-part" key={`${item.name}-${i}`}>
                {item.href ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}
                {i < breadcrumb.length - 1 ? <Icon name="chevron" size="sm" /> : null}
              </span>
            ))}
          </nav>
        ) : null}
        {eyebrow ? <span className="eyebrow eyebrow-lime">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {lede ? <p className="page-hero-lede">{lede}</p> : null}
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
    </section>
  );
}
