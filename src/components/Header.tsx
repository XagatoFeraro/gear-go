"use client";

import Link from "next/link";
import { useState } from "react";
import { business } from "@/data/business";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service areas" },
  { href: "/why-gear-go", label: "Why Gear Go" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const wa = business.whatsapp.url.includes("{{") ? "/contact" : business.whatsapp.url;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label={`${business.name} home`}>
          <span className="brand-mark" aria-hidden="true">GG</span>
          <span className="brand-text">
            <strong>{business.name}</strong>
            <small>Aya Nagar, New Delhi</small>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>

        <nav id="site-nav" className={`site-nav ${open ? "open" : ""}`} aria-label="Primary">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="nav-ctas">
            <a className="btn btn-secondary" href={business.phone.telHref}>Call</a>
            <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </nav>
      </div>
      <style jsx>{`
        .site-header {
          position: sticky; top: 0; z-index: 50;
          background: rgba(245, 244, 237, 0.92);
          backdrop-filter: saturate(140%) blur(10px);
          border-bottom: 1px solid var(--line-soft);
        }
        .header-inner {
          min-height: var(--header-h); display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        .brand { display: inline-flex; align-items: center; gap: 0.65rem; min-width: 0; }
        .brand-mark {
          width: 40px; height: 40px; border-radius: 12px; background: var(--night); color: var(--lime);
          display: inline-flex; align-items: center; justify-content: center;
          font-weight: 800; font-family: var(--font-display), sans-serif; flex: 0 0 auto;
        }
        .brand-text { display: flex; flex-direction: column; line-height: 1.1; }
        .brand-text strong { font-family: var(--font-display), sans-serif; font-size: 1rem; letter-spacing: -0.01em; }
        .brand-text small { color: var(--muted); font-size: 0.78rem; margin-top: 2px; }
        .menu-toggle {
          display: none; min-height: 44px; min-width: 44px; border: 1px solid var(--line);
          background: var(--surface); border-radius: 12px; font-size: 1.1rem; cursor: pointer;
        }
        .site-nav { display: flex; align-items: center; gap: 0.75rem; }
        .site-nav ul { list-style: none; display: flex; gap: 0.15rem; padding: 0; margin: 0; }
        .site-nav ul a {
          display: inline-flex; align-items: center; min-height: 40px; padding: 0.4rem 0.7rem;
          border-radius: 10px; font-weight: 600; font-size: 0.93rem; color: var(--ink-soft);
        }
        .site-nav ul a:hover { background: rgba(13,20,16,0.05); color: var(--ink); }
        .nav-ctas { display: flex; gap: 0.5rem; }
        .nav-ctas :global(.btn) { min-height: 40px; padding: 0.5rem 1rem; font-size: 0.9rem; }
        @media (max-width: 980px) {
          .menu-toggle { display: inline-flex; align-items: center; justify-content: center; }
          .site-nav {
            position: absolute; left: 0; right: 0; top: 100%; background: var(--paper);
            border-bottom: 1px solid var(--line); padding: 1rem 1.25rem 1.25rem;
            display: none; flex-direction: column; align-items: stretch; gap: 0.75rem;
            box-shadow: 0 12px 24px rgba(13,20,16,0.06);
          }
          .site-nav.open { display: flex; }
          .site-nav ul { flex-direction: column; gap: 0.1rem; }
          .site-nav ul a { min-height: 44px; font-size: 1rem; }
          .nav-ctas { flex-direction: column; }
          .nav-ctas :global(.btn) { width: 100%; min-height: 48px; }
        }
      `}</style>
    </header>
  );
}
