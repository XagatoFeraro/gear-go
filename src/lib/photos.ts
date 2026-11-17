/**
 * Photo slots used by the Phase 1 site.
 *
 * Every entry here is currently an illustrative placeholder, not a photograph of
 * the Gear Go workshop. The caption is rendered under each image so visitors are
 * never misled. When real workshop photos are supplied, replace the derivative
 * files in `public/images/` and set `placeholder: false` to remove the note.
 *
 * Files are pre-sized because the site is a static export (`images.unoptimized`).
 * Each slot has JPEG + WebP derivatives at the listed widths.
 */

export type Photo = {
  /** File stem in `public/images/` — `<id>-<width>.jpg|webp`. */
  id: string;
  /** Describe what is actually in the frame, not a marketing claim. */
  alt: string;
  caption?: string;
  /** Intrinsic size of the largest derivative, for width/height attributes. */
  width: number;
  height: number;
  /** Available derivative widths, ascending. */
  widths: number[];
  /** True until the owner supplies a real photo for this slot. */
  placeholder: boolean;
};

const NOTE = "Photo slot — a real Gear Go photo will be added here.";

function photo(
  id: string,
  alt: string,
  width: number,
  height: number,
  widths: number[],
): Photo {
  return { id, alt, caption: NOTE, width, height, widths: [...widths].sort((a, b) => a - b), placeholder: true };
}

export const photos = {
  /** Car raised on a lift in a workshop bay. Cropped to 3:2 where used. */
  bandLift: photo(
    "band-lift",
    "A car raised on a lift inside a workshop bay, with a mechanic working nearby",
    1800,
    771,
    [1200, 1800],
  ),
  /** 3:2. Mechanic working over an open engine bay. */
  engineBay: photo(
    "engine-bay",
    "A mechanic working over an open engine bay",
    1200,
    800,
    [800, 1200],
  ),
  /** 16:10 tiles for the home page service grid. */
  tilePeriodic: photo(
    "tile-periodic",
    "A mechanic standing beside a car in a workshop",
    1600,
    1000,
    [800, 1200, 1600],
  ),
  tileBrakes: photo(
    "tile-brakes",
    "Close view of a car wheel and tyre being worked on",
    1600,
    1000,
    [800, 1200, 1600],
  ),
  tileSuspension: photo(
    "tile-suspension",
    "A technician beside the raised wheel of a car",
    1600,
    1000,
    [800, 1200, 1600],
  ),
  tileElectrical: photo(
    "tile-electrical",
    "Hands working with a tool and cable at a workbench",
    1600,
    1000,
    [800, 1200, 1600],
  ),
  tileSpa: photo(
    "tile-spa",
    "A person cleaning a car in a workshop",
    1600,
    1000,
    [800, 1200, 1600],
  ),
  tileParts: photo(
    "tile-parts",
    "Shelving and boxes in a parts store",
    1600,
    1000,
    [800, 1200, 1600],
  ),
  /** 4:5 portrait for the service detail sidebar. */
  asideWheel: photo(
    "aside-wheel",
    "Close-up of a car wheel and tyre",
    900,
    1125,
    [600, 900],
  ),
  /** 3:2 photos for the About plate. */
  aboutFrontage: photo(
    "about-frontage",
    "Workshop entrance and building",
    1200,
    800,
    [800, 1200],
  ),
  aboutDesk: photo(
    "about-desk",
    "A desk and seating inside a workshop office",
    1200,
    800,
    [800, 1200],
  ),
  aboutWorkshop: photo(
    "about-workshop",
    "Workshop interior with a window and parked car",
    1200,
    800,
    [800, 1200],
  ),
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
