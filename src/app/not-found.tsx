import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="page-hero not-found-hero">
      <div className="container page-hero-inner">
        <span className="eyebrow eyebrow-lime">404</span>
        <h1>
          That page isn’t <em>here.</em>
        </h1>
        <p className="page-hero-lede">
          The page you’re looking for doesn’t exist or may have moved. Try the services list, or go
          straight to contact and directions.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-lime" href="/">
            Go to home
          </Link>
          <Link className="btn btn-outline-light" href="/services/">
            View services <Icon name="arrow" size="sm" />
          </Link>
          <Link className="btn btn-outline-light" href="/contact/">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
