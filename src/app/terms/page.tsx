import type { Metadata } from "next";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Website terms of use for ${business.name}.`,
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <h1>Terms of Use</h1>
        <p className="muted">Last updated: {new Date().toISOString().slice(0, 10)} (placeholder — owner to review before launch)</p>
        <p>
          This website provides information about {business.name} and a way to contact or request service. By using this
          website, you agree to these terms.
        </p>
        <h2>No online booking or payment</h2>
        <p>
          Submitting an enquiry or contacting us via WhatsApp/phone does not create a confirmed booking, contract, or
          payment. Availability, scope, pricing and timelines are confirmed directly by the garage.
        </p>
        <h2>Information accuracy</h2>
        <p>
          We aim to keep information accurate, but services, availability, pricing and policies may change and are
          confirmed on enquiry/inspection. Content is provided for general information only.
        </p>
        <h2>Intellectual property</h2>
        <p>Website content, branding and materials are owned by or licensed to {business.name} unless stated otherwise.</p>
        <h2>Contact</h2>
        <p>
          Questions? Contact {business.name} at {business.phone.display} or {business.email}.
        </p>
        <p className="form-note">This is a draft placeholder. Owner/legal review required before launch.</p>
      </div>
    </section>
  );
}
