"use client";

import { FormEvent, useMemo, useState } from "react";
import { business, getWhatsAppHref, services } from "@/data/business";

type Props = {
  initialService?: string;
  compact?: boolean;
};

type Status = "idle" | "submitting" | "success" | "error";

function isConfiguredEndpoint(endpoint: string) {
  return !!endpoint && !endpoint.includes("{{") && /^https?:\/\//.test(endpoint);
}

export default function EnquiryForm({ initialService, compact }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    car: "",
    registration: "",
    service: initialService || "",
    preferredDate: "",
    concern: "",
    consent: false,
    company: "", // honeypot
  });

  const waFallback = useMemo(() => {
    const msg = `Hi ${business.name}, I would like to request a service.\nName: ${form.name}\nPhone: ${form.phone}\nCar: ${form.car}\nRegistration: ${form.registration || "-"}\nService needed: ${form.service || "-"}\nPreferred date: ${form.preferredDate || "-"}\nConcern: ${form.concern}`;
    return getWhatsAppHref(msg);
  }, [form]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (form.company) return; // honeypot
    if (!form.name || !form.phone || !form.car || !form.concern || !form.consent) {
      setError("Please fill in name, mobile number, car details, concern and consent.");
      return;
    }
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) {
      setError("Please enter a valid mobile number.");
      return;
    }

    const endpoint = business.form.endpoint;
    if (!isConfiguredEndpoint(endpoint)) {
      // Useful fallback: hand off filled details to WhatsApp so the garage receives them.
      if (/^https?:\/\//.test(waFallback)) {
        window.open(waFallback, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = waFallback;
      }
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        car: form.car,
        registration: form.registration,
        service: form.service,
        preferredDate: form.preferredDate,
        concern: form.concern,
        consent: form.consent ? "yes" : "no",
        source: "gear-go-website",
        _subject: `New enquiry: ${form.service || "Car service"} - ${form.name}`,
      };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm({ name: "", phone: "", car: "", registration: "", service: "", preferredDate: "", concern: "", consent: false, company: "" });
    } catch {
      setStatus("error");
      setError("We couldn’t send the form right now. Please WhatsApp or call us so we don’t miss your enquiry.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>Enquiry details shared</h3>
        <p style={{ marginBottom: 0 }}>
          {isConfiguredEndpoint(business.form.endpoint)
            ? "Thank you — we’ve received your enquiry. We’ll contact you to confirm availability and the next step. (No payment taken; no automatic booking.)"
            : "Your details were opened in WhatsApp so the garage can receive them quickly. If WhatsApp didn’t open, please call or use the WhatsApp button. We’ll confirm availability directly — no payment taken, no automatic booking."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="form-grid" noValidate>
      {!compact && (
        <p className="form-note">
          Fill in your details and we’ll confirm availability directly. No payment is taken on this website.
        </p>
      )}
      <div className="visually-hidden" aria-hidden="true">
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => update("company", e.target.value)} /></label>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" autoComplete="name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Mobile number *</label>
          <input id="phone" name="phone" autoComplete="tel" inputMode="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="car">Car make &amp; model *</label>
          <input id="car" name="car" required value={form.car} onChange={(e) => update("car", e.target.value)} placeholder="e.g. Maruti Swift, Hyundai Creta" />
        </div>
        <div className="form-field">
          <label htmlFor="registration">Registration number (optional)</label>
          <input id="registration" name="registration" value={form.registration} onChange={(e) => update("registration", e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="service">Service needed</label>
          <select id="service" name="service" value={form.service} onChange={(e) => update("service", e.target.value)}>
            <option value="">Select a service (or describe below)</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
            <option value="Not sure">Not sure / need guidance</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="preferredDate">Preferred date (optional)</label>
          <input id="preferredDate" name="preferredDate" type="date" value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="concern">Concern / notes *</label>
        <textarea id="concern" name="concern" required value={form.concern} onChange={(e) => update("concern", e.target.value)} placeholder="Describe the issue, symptoms, or what you need help with" />
      </div>
      <div className="form-field checkbox-field">
        <label>
          <input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} required />{" "}
          I agree to be contacted by {business.name} about this enquiry. *
        </label>
      </div>
      {status === "error" && error && <div className="form-error" role="alert">{error}</div>}
      {status === "idle" && error && <div className="form-error" role="alert">{error}</div>}
      <div className="btn-row">
        <button type="submit" className="btn btn-lime" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send enquiry"}
        </button>
        <a
          className="btn btn-outline"
          href={waFallback}
          target={/^https?:\/\//.test(waFallback) ? "_blank" : undefined}
          rel={/^https?:\/\//.test(waFallback) ? "noopener noreferrer" : undefined}
        >
          Send details on WhatsApp instead
        </a>
      </div>
      {!isConfiguredEndpoint(business.form.endpoint) && (
        <p className="form-note">
          The enquiry form opens WhatsApp with your filled details so the garage receives them
          quickly. You can also call or WhatsApp anytime.
        </p>
      )}
    </form>
  );
}
