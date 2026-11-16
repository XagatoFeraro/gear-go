"use client";

import Link from "next/link";
import { business } from "@/data/business";

export default function Footer() {
  const tel = business.phone.telHref;
  const wa = business.whatsapp.url.includes("{{") ? "/contact" : business.whatsapp.url;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2 className="footer-brand">{business.name}</h2>
          <p className="footer-tag">{business.tagline}</p>
          <p className="footer-nap">
            {business.address.full}<br />
            <a href={tel}>{business.phone.display}</a> · <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp {business.whatsapp.display}</a><br />
            <span>{business.email}</span>
          </p>
          <p><a href={business.maps.directionsUrl} target="_blank" rel="noopener noreferrer">Get directions →</a></p>
        </div>
        <div>
          <h3>Hours</h3>
          <ul>{business.hours.display.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
        <div>
          <h3>Explore</h3>
          <ul className="footer-links">
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/service-areas">Service areas</Link></li>
            <li><Link href="/why-gear-go">Why Gear Go</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/book">Request service</Link></li>
          </ul>
        </div>
        <div>
          <h3>Legal</h3>
          <ul className="footer-links">
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <p>Prices and availability confirmed directly with the garage.</p>
      </div>
      <style jsx>{`
        .site-footer { background: var(--night); color: #c8d2c2; padding: 3.5rem 0 6.5rem; }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 0.8fr; gap: 2rem; }
        .footer-brand, h3 { color: var(--white); font-family: var(--font-display), sans-serif; }
        .footer-brand { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .footer-tag { color: #aebaa8; margin-bottom: 0.75rem; }
        h3 { font-size: 0.95rem; margin-bottom: 0.6rem; letter-spacing: 0.01em; }
        ul { list-style: none; padding: 0; margin: 0; }
        li { margin-bottom: 0.4rem; font-size: 0.95rem; }
        a:hover { color: var(--lime); }
        .footer-nap { font-size: 0.95rem; line-height: 1.7; }
        .footer-links a { color: #c8d2c2; }
        .footer-bottom {
          border-top: 1px solid #263328; margin-top: 2.25rem; padding-top: 1.1rem;
          display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: space-between; font-size: 0.9rem; color: #9aa795;
        }
        .footer-bottom p { margin: 0; }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr; } .site-footer { padding-bottom: 7rem; } }
      `}</style>
    </footer>
  );
}
