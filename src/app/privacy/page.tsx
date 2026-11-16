import type { Metadata } from "next";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${business.name} website enquiries and contact.`,
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <h1>Privacy Policy</h1>
        <p className="muted">Last updated: {new Date().toISOString().slice(0, 10)} (placeholder — owner to review before launch)</p>
        <p>
          {business.name} (“we”, “us”) respects your privacy. This page explains how we handle information you share
          through this website.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li>Details you submit in an enquiry form (such as name, phone number, vehicle details, service needed, and message).</li>
          <li>Information you share when you call, WhatsApp, or email us.</li>
          <li>Basic usage/analytics data if analytics are enabled on this website (to be confirmed).</li>
        </ul>
        <h2>How we use information</h2>
        <ul>
          <li>To respond to your enquiry and confirm service availability.</li>
          <li>To provide requested service information and communicate about your visit/vehicle concern.</li>
          <li>To improve the website and understand general usage (if analytics enabled).</li>
        </ul>
        <h2>Sharing</h2>
        <p>
          We do not sell your personal information. Enquiry details may be processed by the form/communication providers
          used to deliver your message to us (to be confirmed before launch). We may share information if required by law.
        </p>
        <h2>Retention</h2>
        <p>We keep enquiry information only as long as needed to respond and for legitimate business/record purposes, as applicable.</p>
        <h2>Your choices</h2>
        <p>
          You can ask us to update or delete information you have shared by contacting us at {business.email} or{" "}
          {business.phone.display}.
        </p>
        <h2>Contact</h2>
        <p>
          {business.name}<br />
          {business.address.full}<br />
          Phone: {business.phone.display}<br />
          Email: {business.email}
        </p>
        <p className="form-note">This is a draft placeholder policy. Owner/legal review and final provider details are required before launch.</p>
      </div>
    </section>
  );
}
