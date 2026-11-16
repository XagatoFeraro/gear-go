import type { IconName } from "@/components/Icon";
import type { Service } from "@/data/business";

const bySlug: Record<string, IconName> = {
  "periodic-car-service": "gauge",
  "car-inspection": "search",
  "engine-diagnostics": "spark",
  "mechanical-repairs": "wrench",
  "brake-suspension": "shield",
  "suspension-fitments": "route",
  "clutch-body-parts": "tools",
  "electrical-repairs": "battery",
  "battery-service": "battery",
  "tyres-wheel-care": "tyre",
  "ac-service-repair": "snow",
  "car-spa-cleaning": "droplet",
  "interior-cleaning": "sparkle",
  "detailing-services": "sparkle",
  "denting-painting": "paint",
  "accidental-damage-inspection": "camera",
  "insurance-claims": "file",
  "windshield-lights": "windshield",
  "lights-replacement": "light",
  "custom-repair": "wrench",
};

const byGroup: Record<Service["group"], IconName> = {
  Maintenance: "gauge",
  Diagnostics: "search",
  Repairs: "wrench",
  Safety: "shield",
  Comfort: "snow",
  Care: "droplet",
  Bodywork: "paint",
};

export function getServiceIcon(service: Pick<Service, "slug" | "group">): IconName {
  return bySlug[service.slug] ?? byGroup[service.group] ?? "car";
}
