"use client";

import { business } from "@/data/business";

export default function MobileCtaBar() {
  const wa = business.whatsapp.url.includes("{{") ? "/contact" : business.whatsapp.url;
  return (
    <div className="mobile-cta" role="region" aria-label="Quick actions">
      <a href={business.phone.telHref} className="mcta">
        <span className="mcta-icon" aria-hidden="true">📞</span>
        <span>Call</span>
      </a>
      <a href={wa} className="mcta primary" target="_blank" rel="noopener noreferrer">
        <span className="mcta-icon" aria-hidden="true">💬</span>
        <span>WhatsApp</span>
      </a>
      <a href={business.maps.directionsUrl} className="mcta" target="_blank" rel="noopener noreferrer">
        <span className="mcta-icon" aria-hidden="true">📍</span>
        <span>Directions</span>
      </a>
      <style jsx>{`
        .mobile-cta {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 60;
          display: none; grid-template-columns: 1fr 1.2fr 1fr; gap: 0.5rem;
          padding: 0.5rem 0.75rem calc(0.5rem + env(safe-area-inset-bottom));
          background: rgba(13, 20, 16, 0.97); backdrop-filter: blur(8px);
          border-top: 1px solid #263328;
        }
        .mcta {
          min-height: 48px; border-radius: 14px; display: inline-flex; align-items: center; justify-content: center;
          gap: 0.4rem; font-weight: 700; font-family: var(--font-display), sans-serif;
          color: #f3f6f0; background: #1b271e; font-size: 0.92rem;
        }
        .mcta.primary { background: var(--lime); color: var(--night); }
        .mcta-icon { font-size: 1rem; line-height: 1; }
        @media (max-width: 900px) { .mobile-cta { display: grid; } }
      `}</style>
    </div>
  );
}
