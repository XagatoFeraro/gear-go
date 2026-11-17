"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  business,
  getWhatsAppUrl,
  hasFormEndpoint,
  isWhatsAppConfigured,
  services,
} from "@/data/business";

type Props = {
  initialService?: string;
  variant?: "full" | "hero";
};

type Status = "idle" | "submitting" | "success" | "handoff" | "error";

export default function EnquiryForm({ initialService, variant = "full" }: Props) {
  const isHero = variant === "hero";
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);
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

  const detailText = useMemo(
    () =>
      `${business.name} — service enquiry\nName: ${form.name}\nMobile: ${form.phone}\nCar: ${form.car}\nRegistration: ${form.registration || "-"}\nService: ${form.service || "-"}\nPreferred date: ${form.preferredDate || "-"}\nConcern: ${form.concern || "-"}`,
    [form],
  );
  const waFallback = useMemo(() => getWhatsAppUrl(`Hi ${business.name}. ${detailText}`), [detailText]);
  const whatsappReady = isWhatsAppConfigured();
  const endpointReady = hasFormEndpoint();

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (form.company) return; // honeypot

    const missingCore = !form.name || !form.phone || !form.car || !form.consent;
    const missingConcern = !isHero && !form.concern;
    if (missingCore || missingConcern) {
      setError(
        isHero
          ? "Please add your name, mobile number, car and consent."
          : "Please fill in name, mobile number, car details, concern and consent.",
      );
      return;
    }
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) {
      setError("Please enter a valid mobile number.");
      return;
    }

    if (!endpointReady) {
      if (whatsappReady && waFallback) {
        const opened = window.open(waFallback, "_blank", "noopener,noreferrer");
        setStatus(opened ? "success" : "handoff");
      } else {
        // Nothing is configured to receive the enquiry. Keep the details on
        // screen rather than navigating away or pretending they were sent.
        setStatus("handoff");
      }
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
      const res = await fetch(business.form.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm({
        name: "",
        phone: "",
        car: "",
        registration: "",
        service: "",
        preferredDate: "",
        concern: "",
        consent: false,
        company: "",
      });
    } catch {
      setStatus("error");
      setError(
        "We couldn't send the form right now. Please WhatsApp or call us so we don't miss your enquiry.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="form__success" role="status">
        <h3>{endpointReady ? "Enquiry sent" : "Open WhatsApp to send"}</h3>
        <p>
          {endpointReady
            ? "Thank you, we have received your enquiry. No payment was taken and no booking is confirmed automatically."
            : "Your details are ready in the WhatsApp message that opened. Check that it was sent before closing WhatsApp. No payment was taken and no booking is confirmed automatically."}
        </p>
      </div>
    );
  }

  if (status === "handoff") {
    return (
      <div className="form__success form__handoff" role="status">
        <h3>Your details are ready — nothing was sent</h3>
        <p>
          Online form delivery and WhatsApp are not configured yet. Copy the details below and send
          them through a confirmed channel. No payment was taken and no booking is confirmed.
        </p>
        <pre className="form__copy-text">{detailText}</pre>
        <button
          type="button"
          className="btn btn--dark btn--sm"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(detailText);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? "Copied" : "Copy details"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`form${isHero ? " form--hero" : ""}`} noValidate>
      <div className="visually-hidden" aria-hidden="true">
        <label>
          Company
          <input
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </label>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Mobile number *</label>
          <input
            id="phone"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </div>

      {isHero ? (
        <div className="field">
          <label htmlFor="car">Car make &amp; model *</label>
          <input
            id="car"
            name="car"
            required
            value={form.car}
            onChange={(e) => update("car", e.target.value)}
            placeholder="e.g. Maruti Swift, Hyundai Creta"
          />
        </div>
      ) : (
        <div className="form__row">
          <div className="field">
            <label htmlFor="car">Car make &amp; model *</label>
            <input
              id="car"
              name="car"
              required
              value={form.car}
              onChange={(e) => update("car", e.target.value)}
              placeholder="e.g. Maruti Swift, Hyundai Creta"
            />
          </div>
          <div className="field">
            <label htmlFor="registration">Registration number (optional)</label>
            <input
              id="registration"
              name="registration"
              value={form.registration}
              onChange={(e) => update("registration", e.target.value)}
            />
          </div>
        </div>
      )}

      {isHero ? (
        <div className="field">
          <label htmlFor="service">Service needed</label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="">Select a service (or describe below)</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Not sure">Not sure / need guidance</option>
          </select>
        </div>
      ) : (
        <div className="form__row">
          <div className="field">
            <label htmlFor="service">Service needed</label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={(e) => update("service", e.target.value)}
            >
              <option value="">Select a service (or describe below)</option>
              {services.map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Not sure">Not sure / need guidance</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="preferredDate">Preferred date (optional)</label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              value={form.preferredDate}
              onChange={(e) => update("preferredDate", e.target.value)}
            />
          </div>
        </div>
      )}

      {!isHero ? (
        <div className="field">
          <label htmlFor="concern">Concern / notes *</label>
          <textarea
            id="concern"
            name="concern"
            required
            value={form.concern}
            onChange={(e) => update("concern", e.target.value)}
            placeholder="Describe the issue, symptoms, or what you need help with"
          />
        </div>
      ) : null}

      <div className="field checkbox">
        <label>
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            required
          />{" "}
          I agree to be contacted by {business.name} about this enquiry. *
        </label>
      </div>

      {error ? (
        <div className="form__error" role="alert">
          {error}
        </div>
      ) : null}

      {isHero ? (
        <>
          <button type="submit" className="btn btn--dark btn--block" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send enquiry"}
          </button>
          <p className="form__alt">
            {whatsappReady && waFallback ? (
              <>
                Prefer WhatsApp?{" "}
                <a href={waFallback} target="_blank" rel="noopener noreferrer">
                  Send these details directly
                </a>
                .
              </>
            ) : (
              <>
                Need phone or directions?{" "}
                <Link href="/contact/">See contact options</Link>.
              </>
            )}
          </p>
        </>
      ) : (
        <>
          <div className="btn-row">
            <button type="submit" className="btn btn--dark" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending..." : "Send enquiry"}
            </button>
            {whatsappReady && waFallback ? (
              <a className="btn btn--outline" href={waFallback} target="_blank" rel="noopener noreferrer">
                Send details on WhatsApp instead
              </a>
            ) : (
              <Link className="btn btn--outline" href="/contact/">
                Contact options
              </Link>
            )}
          </div>
          {!endpointReady ? (
            <p className="form__note">
              {whatsappReady
                ? "Online form delivery is not set up yet. Submitting opens WhatsApp with your filled details. Check that the message was sent."
                : "Online delivery is not set up yet. Submitting keeps your details on this page so you can copy them — nothing is sent from the website."}
            </p>
          ) : null}
        </>
      )}
    </form>
  );
}
