# Photos

This site is a static export (`images.unoptimized: true`), so every image in `public/images/` is pre-sized. The source originals are disposable and are not kept in the repo.

## Current status

All 12 photo slots are **illustrative placeholders**, not photographs of the Gear Go workshop. Each one is captioned on the page so a visitor is never misled. The captions stay until a real Gear Go photo replaces the placeholder.

`src/lib/photos.ts` is the single source of truth for slots, alt text, captions, sizes and widths. Set `placeholder: false` on a slot only after a real photo of that subject is in place.

Illustrative images must **never** be used for:

- the owner, team or staff portraits
- before/after comparisons
- reviews or testimonials
- the Open Graph card (`public/og-image.png` is branded, not photographic)
- any image implying a real customer vehicle or a real job

## Slots and derivatives

Each slot ships as `<slot>-<width>.jpg` (quality 78) and `<slot>-<width>.webp` (quality 74).

| Slot | Current files (widths) | Intended real photo |
| --- | --- | --- |
| `band-lift` | 1200, 1800 | Wide 21:9 shot of a car raised on a lift inside the workshop, mechanic in frame. Home page band. |
| `engine-bay` | 800, 1200 | 3:2 shot over an open engine bay while work is happening. Used on services and area pages. |
| `tile-periodic` | 800, 1200, 1600 | 16:10 shot of a car in a service bay, bonnet up or on a lift. |
| `tile-brakes` | 800, 1200, 1600 | 16:10 close shot of a wheel and brake assembly being checked. |
| `tile-suspension` | 800, 1200, 1600 | 16:10 shot of suspension or a raised wheel being worked on. |
| `tile-electrical` | 800, 1200, 1600 | 16:10 shot of electrical diagnostics, wiring or a scan tool. |
| `tile-spa` | 800, 1200, 1600 | 16:10 shot of a car being washed or cleaned. |
| `tile-parts` | 800, 1200, 1600 | 16:10 shot of the parts store or shelving. |
| `aside-wheel` | 600, 900 | 4:5 portrait close-up of a wheel and tyre. Service detail sidebar. |
| `about-frontage` | 800, 1200 | 3:2 shot of the workshop entrance and signage from the road. |
| `about-desk` | 800, 1200 | 3:2 shot of the reception or desk area. |
| `about-workshop` | 800, 1200 | 3:2 interior shot showing bays and the workshop floor. |

Nothing in the UI depends on the illustrative subject matching the page exactly. A like-for-like replacement in the same orientation is enough.

## Shot list for the owner

About 20 phone photos is enough to replace every placeholder and improve the pages. Shoot landscape unless noted, in daylight if possible, and keep the phone steady.

1. Workshop entrance from the road, signage readable.
2. Reception / customer desk.
3. Wide interior showing the bays.
4. Car raised on a lift.
5. Engine bay with bonnet open during work.
6. Oil or filter change in progress.
7. Brake or disc being checked, wheel off.
8. Suspension or steering work.
9. Wheel alignment or tyre work.
10. AC service or dashboard/vent work.
11. Battery testing or replacement.
12. Diagnostic scan tool connected.
13. Denting work in progress.
14. Painting or paint prep area.
15. Car being washed or polished.
16. Interior cleaning.
17. Parts store / shelving.
18. Keys handover or customer conversation (only with permission).
19. A clean finished car outside the workshop.
20. Wide exterior of the building and parking area.

Optional: a short phone video of the workshop for WhatsApp use. Not for the website.

Ask before photographing customers, number plates or staff. Blur number plates if they will be visible. Do not stage a photo as "before/after" or as a customer review.

## Replacing a placeholder

1. Put the originals in a temporary folder outside the repo.
2. Crop each photo to the slot orientation listed above.
3. Generate derivatives at the slot's widths as `.jpg` (quality 78) and `.webp` (quality 74), named `<slot>-<width>.<ext>`.
4. Drop the derivatives into `public/images/`, replacing the placeholder files.
5. Update `src/lib/photos.ts` if the aspect ratio changed, and set `placeholder: false` for that slot.
6. Remove the caption note for that slot, or replace it with a factual caption.
7. Rebuild and check the page at 320, 375, 768, 1024 and 1440 px.

The repository does not keep originals. Keep them in the owner's own storage, not in git.

## Notes

- No image may contain invented signage, certifications, awards or prices.
- Do not add `aggregateRating` or review markup based on photos.
- Keep total image weight lean. The current placeholder set is about 6.8 MB across 60 files; a real set should aim to stay near that or lower.
