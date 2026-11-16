import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p className="lead">The page you’re looking for doesn’t exist or may have moved.</p>
        <div className="btn-row" style={{ marginTop: "1rem" }}>
          <Link className="btn btn-primary" href="/">Go to home</Link>
          <Link className="btn btn-secondary" href="/services">View services</Link>
          <Link className="btn btn-secondary" href="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
