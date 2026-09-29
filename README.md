# SAS Construction · website

Marketing site for **SAS Construction Services and Equipment Rentals – Cebu**. It is built with SvelteKit (Svelte 5 and TypeScript) and prerendered to static HTML with `adapter-static`.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in /build
npm run preview    # serve the built site
npm run check      # svelte-check (types + a11y)
```

`/build` can go on any static host, such as Netlify, Vercel, Cloudflare Pages, or GitHub Pages. For GitHub Pages under a sub-path, set `paths.base` (see the SvelteKit adapter-static docs).

## Where things live

| What | File |
|---|---|
| Phone numbers, email, address, hours, service area, Facebook link | `src/lib/content/site.ts` (the JSON-LD block in `src/app.html` mirrors it, so update both) |
| Services, permits, process steps | `src/lib/content/services.ts` |
| Projects | `src/lib/content/projects.ts` |
| Rental equipment | `src/lib/content/equipment.ts` |
| Photos (stock placeholders) | `src/lib/content/photos.ts` |
| Colours, type, geometry tokens | `src/app.css` |
| Inquiry form logic (validation, SMS/email hand-off) | `src/lib/inquiry.ts` · UI in `src/lib/components/JobOrder.svelte` |
| Product facts and what must never be claimed | `PRODUCT.md` |
| Visual system | `DESIGN.md` |

## Replace before launch

Everything below is a clearly marked placeholder on the live pages.

1. **Equipment photos:** `src/lib/content/equipment.ts`. The 8 rental items are real: mixer, plate compactor, concrete cutter, generator, water pump, jackhammer, chipping gun and concrete vibrator. Their photos are still stock stand-ins showing each machine on its own, in colour, from Unsplash, Pexels and Wikimedia Commons (Commons files show a licence credit on the card). Put SAS's own photos in `static/equipment/`, point each entry's `photo` at them (keep them wrapped in `kit()` so they stay in colour, and drop the `credit`), and set `stockPhoto: false`. Each card's "Sample photo" tag disappears once that flag is `false`. The Rentals hero (an orange mixer) and the home rental band (mixer crew) are set in `photos.ts`.
2. **Project photos:** `src/lib/content/projects.ts`. Six real jobs use SAS's own photos, taken from their Facebook posts (each entry links its post) and saved in `static/projects/<slug>/` as `<n>-800.jpg` plus a full-size `<n>-<width>.jpg` (at most 1600w). Add a job with `withGallery()` and `shot()`; the first photo is the card cover and the card opens the photo viewer. The `sample` flag and "Sample photo" tag remain for any future entry that has to use a stand-in.
3. **Stock photography:** `src/lib/content/photos.ts`. The hero, page, and band images are free Unsplash photos, hotlinked. Swap in SAS site photos as they come in and keep the same keys. Everything except equipment renders in grayscale, so colour phone photos work fine.
4. **Facebook page URL:** set `facebookUrl` in `site.ts`. The footer link appears automatically.
5. **Wordmark:** the header typesets "SAS" in Chakra Petch beside a vector redraw of the roof mark. If SAS has an official vector logo, drop it into `LogoMark.svelte` and the header.

## Inquiry form

The form is **front-end only**, as agreed. It validates and builds a "job order", then hands it to SAS in one tap: by SMS to 0915 448 3783, by email to alvinsasing97@gmail.com (both prefilled), or by phone call. To deliver submissions directly, implement `submitInquiry()` in `src/lib/inquiry.ts` so it returns `{ delivered: true }`, for example by calling Formspree or a SvelteKit endpoint that uses Resend. The confirmation screen then switches to "Job order sent".

Link prefill works from anywhere: `/contact?type=rent&item=<name>` or `/contact?type=build&project=<type>`.

## Entry loader

`src/lib/components/EntryLoader.svelte` is a port of the Claude Design "SAS Loader". It runs about 7 seconds: blueprint, then the crane hoist, the roof build, the wordmark, a hold, and the lift-out.

- It plays **once per browser session**, on whichever page the visitor lands on. It never runs on in-site navigation.
- It is skipped for `prefers-reduced-motion`.
- Any click or key press skips straight to the lift-out.
- The pre-paint gate is the inline script in `src/app.html`. If the app bundle fails, it also releases the page after 15 seconds.
- To replay it while testing, add `?intro` to any URL (e.g. `/?intro`) or open a new tab.
- The scene timings are the `CUES` constant at the top of the component.

## Honesty rules (from the business profile)

Do not add a PCAB licence or licence number, SEC registration, founding year or story, project counts, years in business, satisfaction figures, testimonials, or rental rates unless SAS supplies them and they can be verified.
