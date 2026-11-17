export type Service = {
  name: string;
  slug: string;
  group: "Maintenance" | "Diagnostics" | "Repairs" | "Safety" | "Comfort" | "Care" | "Bodywork";
  shortDescription: string;
  included: string[];
  signs: string[];
  priceNote: string;
};

export const services: Service[] = [
  {
    name: "Periodic Car Service",
    slug: "periodic-car-service",
    group: "Maintenance",
    shortDescription: "Routine service with oil, filters, fluids and a multi-point safety check.",
    included: ["Engine oil and filter check/replacement (as approved)", "Fluid top-ups and inspection", "Multi-point safety and condition check", "Service recommendations shared before work"],
    signs: ["Service due by time or mileage", "Reduced smoothness or mileage", "It’s been a while since the last check"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Car Inspection",
    slug: "car-inspection",
    group: "Maintenance",
    shortDescription: "Condition check for peace of mind, pre-service or pre-purchase decisions.",
    included: ["Visual and functional inspection", "Key systems and safety points reviewed", "Findings explained in plain language", "Next steps recommended if needed"],
    signs: ["Buying a used car", "Planning a long trip", "Unsure about current condition"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Engine Diagnostics",
    slug: "engine-diagnostics",
    group: "Diagnostics",
    shortDescription: "Warning light and fault finding with scan and diagnosis.",
    included: ["Warning light and symptom assessment", "Diagnostic scan and fault checks", "Cause explained before repair", "Repair options shared for approval"],
    signs: ["Check engine or warning light on", "Poor performance or starting issues", "Unusual engine behaviour"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Mechanical Repairs",
    slug: "mechanical-repairs",
    group: "Repairs",
    shortDescription: "Repairs for noises, vibration, leaks and drivability concerns.",
    included: ["Inspection of reported concern", "Root-cause diagnosis", "Estimate shared before paid work", "Repair carried out after approval"],
    signs: ["New noises or vibration", "Leaks under the car", "Driving doesn’t feel right"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Brake & Suspension Checks",
    slug: "brake-suspension",
    group: "Safety",
    shortDescription: "Safety-focused inspection of braking, steering and suspension.",
    included: ["Brake pads, discs and fluid check", "Steering and suspension inspection", "Safety findings explained clearly", "Replacement recommended only if needed and approved"],
    signs: ["Squealing or grinding brakes", "Soft or vibrating brake pedal", "Bumpy ride or pulling"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Suspension & Fitments",
    slug: "suspension-fitments",
    group: "Safety",
    shortDescription: "Suspension wear, fitment and related alignment concerns.",
    included: ["Suspension components inspected for wear/play", "Fitment-related issues checked", "Alignment-related concerns assessed", "Options shared before work"],
    signs: ["Uneven tyre wear", "Clunks over bumps", "Car sits unevenly"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Clutch & Body Parts",
    slug: "clutch-body-parts",
    group: "Repairs",
    shortDescription: "Clutch operation concerns and body panel part repairs/replacement.",
    included: ["Clutch operation assessed", "Affected body parts inspected", "Repair or replacement options explained", "Work done after approval"],
    signs: ["Slipping or hard clutch", "Difficulty shifting", "Damaged or loose body parts"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Electrical Repairs",
    slug: "electrical-repairs",
    group: "Repairs",
    shortDescription: "Battery, starting, charging, wiring and lighting fault diagnosis.",
    included: ["Electrical symptom diagnosis", "Starting/charging/wiring checks as relevant", "Faults explained with options", "Repairs after approval"],
    signs: ["Starting trouble", "Lights or accessories not working", "Blown fuses or intermittent faults"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Battery Service",
    slug: "battery-service",
    group: "Safety",
    shortDescription: "Battery health test, terminals, jump-start help and replacement guidance.",
    included: ["Battery health and charging check", "Terminal inspection/cleaning as needed", "Replacement options if required", "Fitment after approval"],
    signs: ["Slow or no crank", "Battery warning light", "Old or weak battery"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Tyres & Wheel Care",
    slug: "tyres-wheel-care",
    group: "Safety",
    shortDescription: "Tyre condition, pressure, damage checks and wheel care.",
    included: ["Tread, pressure and damage inspection", "Wheel and balance/alignment concerns assessed", "Recommendations explained", "Work after approval"],
    signs: ["Low tread or punctures", "Vibration at speed", "Uneven wear"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "AC Service & Repair",
    slug: "ac-service-repair",
    group: "Comfort",
    shortDescription: "Cooling performance checks, leak inspection and AC repairs.",
    included: ["Cooling performance assessment", "Leak and component inspection", "Gas/cabin filter needs checked (as applicable)", "Estimate before repair"],
    signs: ["AC not cooling", "Bad odour from vents", "Weak airflow or unusual noise"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Car Spa & Cleaning",
    slug: "car-spa-cleaning",
    group: "Care",
    shortDescription: "Exterior wash, wheels, glass and quick interior refresh.",
    included: ["Exterior wash and dry", "Wheels and glass cleaned", "Basic interior vacuum/refresh (as applicable)", "Scope confirmed on arrival"],
    signs: ["Car needs a thorough clean", "Dusty interior or dull exterior", "Pre-event or routine refresh"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Interior Cleaning",
    slug: "interior-cleaning",
    group: "Care",
    shortDescription: "Seats, carpets, panels and vents cleaned for a fresher cabin.",
    included: ["Seats, carpets and mats cleaned (as applicable)", "Panels, glass and vents attended", "Condition assessed before work", "Scope confirmed before start"],
    signs: ["Stains or odours inside", "Dusty vents and panels", "Cabin needs deep refresh"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Detailing Services",
    slug: "detailing-services",
    group: "Care",
    shortDescription: "Decontamination, polish and finish enhancement for appearance.",
    included: ["Surface condition assessment", "Cleaning/decontamination as agreed", "Polish/finish work as applicable", "Results and care advice shared"],
    signs: ["Dull paint or swirl marks", "Wanting enhanced finish", "Preparing car for sale/event"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Denting & Painting",
    slug: "denting-painting",
    group: "Bodywork",
    shortDescription: "Panel repair and paint work matched to the vehicle’s finish.",
    included: ["Damage assessed and scope defined", "Panel repair/denting as required", "Paint and finish work as agreed", "Estimate shared before work"],
    signs: ["Dents, scratches or paint damage", "Minor collision marks", "Panels needing cosmetic repair"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Accidental Damage Inspection",
    slug: "accidental-damage-inspection",
    group: "Bodywork",
    shortDescription: "Damage documentation, safety check and repair scope after an incident.",
    included: ["Visible damage and safety check", "Repair scope documented", "Findings explained clearly", "Next steps/estimate guidance shared"],
    signs: ["After a minor or major accident", "Unsure if damage is only cosmetic", "Need clarity before repair decisions"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Insurance Claims",
    slug: "insurance-claims",
    group: "Bodywork",
    shortDescription: "Insurance claim coordination support (availability/details to be confirmed).",
    included: ["Damage assessment support", "Coordination guidance for claim process", "Documentation/photos as applicable", "Repair scope discussed with you"],
    signs: ["Accident-related repair", "Need help understanding claim steps", "Insurer requires inspection/estimate"],
    priceNote: "Coordination available; claim approval remains with the insurer.",
  },
  {
    name: "Windshield & Lights",
    slug: "windshield-lights",
    group: "Bodywork",
    shortDescription: "Windshield/glass damage and lighting system assessment.",
    included: ["Glass damage assessed", "Lighting condition checked", "Repair/replacement options explained", "Work after approval"],
    signs: ["Chipped or cracked glass", "Dim, broken or misaligned lights", "Visibility concerns"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Lights & Replacement",
    slug: "lights-replacement",
    group: "Safety",
    shortDescription: "Lighting faults diagnosed and bulbs/units replaced as needed.",
    included: ["Lighting fault diagnosis", "Bulb/unit condition checked", "Replacement options shared", "Fitment after approval"],
    signs: ["Headlight/taillight not working", "Flickering or dim lights", "Warning indicator for lights"],
    priceNote: "Price confirmed after inspection.",
  },
  {
    name: "Custom Repair",
    slug: "custom-repair",
    group: "Repairs",
    shortDescription: "Non-standard or modified vehicle concerns assessed case by case.",
    included: ["Concern discussed and inspected", "Feasibility and scope assessed", "Estimate/options shared before work", "Work undertaken only if agreed"],
    signs: ["Modified/custom vehicle issue", "Unusual repair requirement", "Needs case-by-case assessment"],
    priceNote: "Assessed case by case.",
  },
];

export const serviceAreas = [
  {
    name: "Aya Nagar",
    slug: "aya-nagar",
    context:
      "Our own neighbourhood. The workshop is in Phase 4, H Block, behind Fitness Club Gym, so Aya Nagar residents are usually close to us for a routine service or a quick check.",
    focus: ["periodic-car-service", "brake-suspension", "ac-service-repair"],
  },
  {
    name: "Chhatarpur",
    slug: "chhatarpur",
    context:
      "Chhatarpur is one of the nearest localities to the workshop, making it a practical visit for periodic servicing, cleaning or a specific concern you want checked.",
    focus: ["periodic-car-service", "car-spa-cleaning", "battery-service"],
  },
  {
    name: "Mehrauli",
    slug: "mehrauli",
    context:
      "Mehrauli car owners often visit us for AC checks, brake work and general mechanical concerns. Share the symptom first so we can confirm what the visit should cover.",
    focus: ["ac-service-repair", "brake-suspension", "mechanical-repairs"],
  },
  {
    name: "Saket",
    slug: "saket",
    context:
      "From Saket, the workshop is a straightforward visit for scheduled maintenance, detailing or bodywork.",
    focus: ["periodic-car-service", "detailing-services", "denting-painting"],
  },
  {
    name: "Malviya Nagar",
    slug: "malviya-nagar",
    context:
      "Malviya Nagar owners use the workshop for AC service, tyre checks and electrical faults. A quick WhatsApp with your car details helps us prepare for the visit.",
    focus: ["ac-service-repair", "tyres-wheel-care", "electrical-repairs"],
  },
  {
    name: "Vasant Kunj",
    slug: "vasant-kunj",
    context:
      "Vasant Kunj customers often plan detailing, denting or periodic service with us. Confirm the scope and timing before travelling so the visit is useful.",
    focus: ["detailing-services", "denting-painting", "periodic-car-service"],
  },
  {
    name: "Gurugram",
    slug: "gurugram",
    context:
      "Gurugram customers often combine a workshop visit with other errands. Message us with your concern and preferred day so we can confirm whether the trip makes sense.",
    focus: ["periodic-car-service", "engine-diagnostics", "ac-service-repair"],
  },
  {
    name: "Faridabad",
    slug: "faridabad",
    context:
      "Faridabad is further out, so it helps to share photos or a short video of the issue on WhatsApp before making the trip. We’ll tell you what we can assess.",
    focus: ["denting-painting", "ac-service-repair", "car-inspection"],
  },
  {
    name: "South Delhi",
    slug: "south-delhi",
    context:
      "If you’re elsewhere in South Delhi, send your locality and car details. We’ll confirm whether a visit to Aya Nagar makes sense for the work you need.",
    focus: ["car-inspection", "brake-suspension", "car-spa-cleaning"],
  },
];

/** Public config only — phone/email/WhatsApp are public business details, never secrets. */
function fromEnv(key: string, fallback: string) {
  const value = process.env[key];
  return value && value.trim() ? value.trim() : fallback;
}

const hoursFromEnv = fromEnv("NEXT_PUBLIC_BUSINESS_HOURS", "");
const hoursConfigured = Boolean(hoursFromEnv);
export const hoursDisplay: readonly string[] = hoursConfigured
  ? hoursFromEnv.split("|").map((row) => row.trim()).filter(Boolean)
  : ["Hours: Confirm when you enquire"];

export function getHoursText() {
  return hoursConfigured ? hoursDisplay.join("; ") : "Confirm hours when you enquire";
}

type OpeningHours = { dayOfWeek: string[]; opens: string; closes: string };
function parseStructuredHours(raw: string): OpeningHours[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is OpeningHours => {
      if (!item || typeof item !== "object") return false;
      const row = item as Partial<OpeningHours>;
      return Array.isArray(row.dayOfWeek) && typeof row.opens === "string" && typeof row.closes === "string";
    });
  } catch {
    return [];
  }
}

export const business = {
  name: "Gear Go Automobiles",
  legalName: "{{LEGAL_ENTITY_NAME}}",
  tagline: "Transparent car care for Delhi NCR",
  description:
    "Multi-brand car service garage in Aya Nagar, New Delhi. Inspection-first service, clear estimates, and work approved before we proceed.",
  address: {
    line1: "Phase 4, H Block, Aya Nagar",
    line2: "behind Fitness Club Gym",
    locality: "Aya Nagar",
    city: "New Delhi",
    region: "Delhi",
    postalCode: "110047",
    country: "IN",
    full: "Phase 4, H Block, Aya Nagar, behind Fitness Club Gym, New Delhi, Delhi 110047",
  },
  parkingNote: fromEnv("NEXT_PUBLIC_PARKING_NOTE", "{{PARKING_NOTE}}"),
  geo: { latitude: "{{LATITUDE}}", longitude: "{{LONGITUDE}}" },
  phone: {
    display: fromEnv("NEXT_PUBLIC_PHONE_DISPLAY", "{{PHONE}}"),
    e164: fromEnv("NEXT_PUBLIC_PHONE_E164", "{{PHONE_E164}}"),
  },
  whatsapp: {
    display: fromEnv("NEXT_PUBLIC_WHATSAPP_DISPLAY", "{{WHATSAPP}}"),
    e164: fromEnv("NEXT_PUBLIC_WHATSAPP_E164", "{{WHATSAPP_E164}}"),
  },
  email: fromEnv("NEXT_PUBLIC_EMAIL", "{{EMAIL}}"),
  hours: {
    display: hoursDisplay,
    note: fromEnv("NEXT_PUBLIC_HOLIDAY_NOTE", "{{HOLIDAY_NOTE}}"),
    // Only publish structured hours when the owner supplies them explicitly.
    openingHoursSpecification: parseStructuredHours(fromEnv("NEXT_PUBLIC_OPENING_HOURS_JSON", "")),
  },
  maps: {
    placeUrl: fromEnv("NEXT_PUBLIC_GOOGLE_MAPS_URL", "{{GOOGLE_MAPS_URL}}"),
    directionsUrl: fromEnv(
      "NEXT_PUBLIC_DIRECTIONS_URL",
      "https://www.google.com/maps/dir/?api=1&destination=Gear+Go+Automobiles+Phase+4+H+Block+Aya+Nagar+New+Delhi+110047",
    ),
    embedUrl: fromEnv("NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL", "{{GOOGLE_MAPS_EMBED_URL}}"),
  },
  profiles: {
    googleBusiness: fromEnv("NEXT_PUBLIC_GBP_URL", "{{GBP_URL}}"),
    instagram: fromEnv("NEXT_PUBLIC_INSTAGRAM_URL", "{{INSTAGRAM_URL}}"),
    facebook: fromEnv("NEXT_PUBLIC_FACEBOOK_URL", "{{FACEBOOK_URL}}"),
    youtube: fromEnv("NEXT_PUBLIC_YOUTUBE_URL", "{{YOUTUBE_URL}}"),
  },
  domain: "{{DOMAIN}}",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://{{DOMAIN}}",
  owner: {
    name: "{{OWNER_NAME}}",
    showPublicly: false,
  },
  establishedYear: "{{ESTABLISHED_YEAR}}",
  brandsServicedNote: "All car brands and models serviced.",
  policies: {
    parts:
      "Parts options are explained and priced before fitment. Any part proposed is shared for your approval first.",
    warranty:
      "Ask about current warranty terms, coverage and exclusions before work begins.",
    pickupDropoff:
      "Ask about pickup and drop-off, including coverage, timing and charges for your location.",
    towing: "Ask about towing, including coverage, timing and charges.",
    insurance:
      "Insurance claim coordination can be discussed. Claim approval and coverage decisions remain with the insurer.",
    pricing: "Price is confirmed after inspection.",
  },
  trustHighlights: [
    "All car brands & models",
    "Parts options approved before fitment",
    "Ask about pickup, drop-off, towing and insurance coordination",
    "Ask about current warranty terms",
  ],
  form: {
    // Public form key/provider only (e.g. Formspree/Web3Forms endpoint). Never a secret.
    provider: fromEnv("NEXT_PUBLIC_FORM_PROVIDER", "{{FORM_PROVIDER}}"),
    endpoint: fromEnv("NEXT_PUBLIC_FORM_ENDPOINT", "{{FORM_ENDPOINT}}"),
    operatorNote: "Submissions must reach the operator (email/dashboard/sheet) once configured.",
  },
  services,
  serviceAreas,
} as const;

export type Business = typeof business;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) return path;
  if (!basePath || basePath === "/") return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}

export function isPlaceholder(value: string | undefined | null) {
  return !value || value.includes("{{");
}

export function isExternalUrl(url: string) {
  return /^https?:\/\//.test(url);
}

export type Channel = "whatsapp" | "phone" | "email";

export function isPhoneConfigured() {
  return !isPlaceholder(business.phone.e164);
}

export function isWhatsAppConfigured() {
  return !isPlaceholder(business.whatsapp.e164);
}

export function isEmailConfigured() {
  return !isPlaceholder(business.email);
}

export function isChannelConfigured(channel: Channel) {
  return channel === "whatsapp"
    ? isWhatsAppConfigured()
    : channel === "phone"
      ? isPhoneConfigured()
      : isEmailConfigured();
}

export function hasFormEndpoint() {
  const endpoint = business.form.endpoint;
  return Boolean(endpoint) && !isPlaceholder(endpoint) && isExternalUrl(endpoint);
}

/** Returns null when the channel is not configured. Never silently routes to another page. */
export function getPhoneHref(): string | null {
  return isPhoneConfigured() ? `tel:${business.phone.e164}` : null;
}

export function getPhoneLabel() {
  if (!isPlaceholder(business.phone.display)) return business.phone.display;
  return isPhoneConfigured() ? business.phone.e164 : "Contact us";
}

export function getWhatsAppUrl(message?: string): string | null {
  if (!isWhatsAppConfigured()) return null;
  const base = `https://wa.me/${business.whatsapp.e164.replace(/[^\d]/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const getWhatsAppHref = getWhatsAppUrl;

export function getWhatsAppLabel() {
  if (!isPlaceholder(business.whatsapp.display)) return business.whatsapp.display;
  return isWhatsAppConfigured() ? business.whatsapp.e164 : "WhatsApp";
}

export function getEmailLabel() {
  return isEmailConfigured() ? business.email : "Send an enquiry";
}

/** Returns null when the channel is not configured. */
export function getEmailHref(): string | null {
  return isEmailConfigured() ? `mailto:${business.email}` : null;
}

export function getChannelHref(channel: Channel, message?: string): string | null {
  return channel === "whatsapp"
    ? getWhatsAppUrl(message)
    : channel === "phone"
      ? getPhoneHref()
      : getEmailHref();
}

export function getDirectionsHref() {
  return business.maps.directionsUrl;
}

/** Real Google Maps embed built from the confirmed address; no API key required. */
export function getMapEmbedUrl() {
  if (!isPlaceholder(business.maps.embedUrl)) return business.maps.embedUrl;
  const query = `${business.name}, ${business.address.full}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
