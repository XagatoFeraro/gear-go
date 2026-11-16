import { business, isPlaceholder } from "@/data/business";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const site = getSiteUrl();
  const contactDetails = isPlaceholder(business.phone.display) || isPlaceholder(business.whatsapp.display)
    ? ["Contact: see the contact page for current phone and WhatsApp details."]
    : [`Phone: ${business.phone.display}`, `WhatsApp: ${business.whatsapp.display}`];
  const email = isPlaceholder(business.email) ? "" : `Email: ${business.email}`;
  const owner =
    business.owner.showPublicly && !isPlaceholder(business.owner.name)
      ? `Owner: ${business.owner.name}`
      : "";

  const lines = [
    `# ${business.name}`,
    "",
    `> ${business.description}`,
    "",
    `Canonical: ${site}/`,
    ...contactDetails,
    email,
    `Address: ${business.address.full}`,
    `Hours: ${business.hours.display.join("; ")}`,
    `Service areas: ${business.serviceAreas.map((area) => area.name).join(", ")}`,
    owner,
    "",
    "## Key pages",
    `- Home: ${site}/`,
    `- Services: ${site}/services/`,
    `- Contact: ${site}/contact/`,
    `- About: ${site}/about/`,
    `- Service areas: ${site}/service-areas/`,
    `- FAQ: ${site}/faq/`,
    `- Request service: ${site}/book/`,
    "",
    "## Services",
    ...servicesList(),
    "",
    "## Notes",
    `- ${business.policies.pricing}`,
    `- ${business.policies.parts}`,
    `- ${business.policies.pickupDropoff}`,
    `- ${business.policies.towing}`,
    `- ${business.policies.insurance}`,
    `- ${business.policies.warranty}`,
    "- This website does not process online payments or confirm bookings automatically.",
    `- Last updated: ${new Date().toISOString().slice(0, 10)}`,
  ];

  return new Response(lines.join("\n").replace(/\n{3,}/g, "\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function servicesList() {
  return business.services.map((service) => `- ${service.name}`);
}
