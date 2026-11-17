import Link from "next/link";
import { Fragment, type ReactNode } from "react";

export type Crumb = { name: string; href?: string };

type Props = {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  breadcrumb?: Crumb[];
  actions?: ReactNode;
  compact?: boolean;
  plain?: boolean;
};

export default function PageHero({
  label,
  title,
  lede,
  breadcrumb,
  actions,
  compact = false,
  plain = false,
}: Props) {
  return (
    <section
      className={`page-head${compact ? " page-head--compact" : ""}${plain ? " page-head--plain" : ""}`}
    >
      <div className="wrap">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav className="crumbs" aria-label="Breadcrumb">
            {breadcrumb.map((item, i) => (
              <Fragment key={`${item.name}-${i}`}>
                {i > 0 ? (
                  <span className="crumbs__sep" aria-hidden="true">
                    /
                  </span>
                ) : null}
                {item.href ? (
                  <Link href={item.href}>{item.name}</Link>
                ) : (
                  <span aria-current="page">{item.name}</span>
                )}
              </Fragment>
            ))}
          </nav>
        ) : null}
        {label ? <span className="label">{label}</span> : null}
        <h1>{title}</h1>
        {lede ? <p className="page-head__lede">{lede}</p> : null}
        {actions ? <div className="btn-row page-head__actions">{actions}</div> : null}
      </div>
    </section>
  );
}
