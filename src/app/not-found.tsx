import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="wrap">
        <span className="label">404</span>
        <h1>That page is not here</h1>
        <p>
          The page you are looking for does not exist or may have moved. Try the services list, or go
          straight to contact and directions.
        </p>
        <div className="btn-row">
          <Link className="btn btn--primary" href="/">
            Go to home
          </Link>
          <Link className="btn btn--light" href="/services/">
            View services <Icon name="arrow" size="sm" />
          </Link>
          <Link className="btn btn--light" href="/contact/">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
