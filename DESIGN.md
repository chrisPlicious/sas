---
name: SAS Construction
description: Concrete paper, charcoal ink and SAS safety orange, built from chamfered plates cut at the 31° roof pitch of the SAS chevron.
colors:
  orange: "#f7890c"
  orange-deep: "#e27a02"
  on-orange: "#1c1b19"
  on-orange-2: "#4a3312"
  mark-lit: "#FF8D06"
  mark-shade: "#EB8205"
  paper: "#f2f1ec"
  paper-2: "#e8e7e1"
  concrete: "#cbcac4"
  field: "#fbfbf8"
  paper-lift: "#ffffff"
  ink: "#1c1b19"
  ink-2: "#262522"
  ink-3: "#34332f"
  steel: "#5d5b55"
  steel-on-dark: "#a9a79f"
  line: "rgb(28 27 25 / 0.16)"
  line-strong: "rgb(28 27 25 / 0.34)"
  line-dark: "rgb(242 241 236 / 0.14)"
  line-orange: "rgb(28 27 25 / 0.22)"
  error: "#9c1f18"
  error-line: "#b3261e"
typography:
  display:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "clamp(2.35rem, 1.1rem + 4.4vw, 5.6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 1.25rem + 2.7vw, 4rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "clamp(1.3rem, 1.05rem + 0.9vw, 1.85rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "normal"
  lead:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "clamp(1.1rem, 1rem + 0.35vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  body:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-small:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  button:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.04em"
  control:
    fontFamily: "Chakra Petch, Arial Narrow, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.05em"
  data:
    fontFamily: "Azeret Mono Variable, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 450
    lineHeight: 1.5
    letterSpacing: "0.04em"
  tag:
    fontFamily: "Azeret Mono Variable, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  none: "0px"
spacing:
  cluster: "0.35rem"
  seam: "0.5rem"
  gutter: "clamp(1rem, 0.6rem + 1.8vw, 2.5rem)"
  section: "clamp(4.5rem, 3rem + 6vw, 9rem)"
  frame-max: "1520px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1rem 0.7rem 1.1rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.orange-deep}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1rem 0.7rem 1.1rem"
    height: "3rem"
  button-ink-hover:
    backgroundColor: "{colors.ink-3}"
  button-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1rem 0.7rem 1.1rem"
    height: "3rem"
  button-paper-hover:
    backgroundColor: "{colors.paper-lift}"
  button-sm:
    padding: "0.45rem 0.7rem 0.45rem 0.8rem"
    height: "2.25rem"
  button-lg:
    padding: "1rem 1.25rem 1rem 1.35rem"
    height: "3.75rem"
  tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.55rem 0.28rem"
  tag-sample:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.orange}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.55rem 0.28rem"
  nav-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "0.55rem 0.85rem"
  nav-chip-hover:
    backgroundColor: "{colors.paper-lift}"
  nav-chip-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  filter-chip:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    height: "2.5rem"
  filter-chip-on-dark:
    backgroundColor: "{colors.ink-3}"
    textColor: "{colors.paper}"
  filter-chip-pressed:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
  choice-chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.95rem"
    height: "2.75rem"
  choice-chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  choice-plate:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  choice-plate-selected:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.7rem 0.85rem"
    height: "3.1rem"
  input-hover:
    backgroundColor: "{colors.paper-lift}"
  plate-dark:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
  plate-orange:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  plate-paper:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  plate-concrete:
    backgroundColor: "{colors.concrete}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  equipment-card:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
  project-title-plate:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  signboard:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
---

# Design System: SAS Construction

## Overview

**Creative North Star: "The Signboard on the Frame"**

The site looks like a Cebu job site. Grayscale photographs of concrete frames, rebar and machinery form the ground. SAS safety orange is bolted onto that ground as signboard plates. It appears as whole fields: the Rent panel, the footer, the mobile menu, permit tiles and the first plate of a set. Charcoal ink carries the dark bands and plates, and a faint 18px blueprint grid runs over it. Every large panel is cut on the diagonal of the SAS roof chevron (31°, tan ≈ 0.6), so a photo and the plate beside it share one roof line. Corners are chamfered, never rounded. Nothing casts a shadow.

Density is generous between sections (4.5–9rem of air) and tight inside them. Plates, cards and tiles meet at 8px seams, like panels on a site hoarding. Everything that speaks is uppercase Chakra Petch. Everything that measures is set in Azeret Mono: addresses, hours, specs and job numbers. Body copy stays in sentence case and in the same squared sans.

The world comes from the client-pinned GravisPoint concept boards, recoloured from their red to SAS orange. The build keeps the boards' plates, chamfers, blueprint grid, grayscale photography, mono data layer, poster-scale footer mark and orange shoulder footer. It rejects their stat counters. The orange tile grid lists the permits SAS handles, with no numbers. Placeholder content carries a visible "Sample" tag until the client supplies the real thing.

**Key Characteristics:**
- Concrete paper ground, charcoal ink bands, safety orange used as whole panels.
- Chamfered plates plus a single 31° roof-pitch cut per large panel or photo.
- Grayscale photography throughout, except rental equipment and the project photo viewer, which show one subject alone and in colour. SAS orange is the only other saturated colour on the page.
- Chakra Petch uppercase for signage. Azeret Mono only for data.
- Flat: no radius, no shadows. Depth comes from tone steps, overlap and the cut.
- Honest placeholders: Sample tags on stock photos and unconfirmed listings.

## Colors

The palette is one committed accent on a warm concrete-and-charcoal neutral ramp. Orange is used at field scale, and every text pairing has a measured contrast ratio.

### Primary
- **Chevron Safety Orange** (`orange`): the field colour. Used for the Rent panel, footer, mobile menu, permit tiles, rate note, the first plate of a set, primary buttons, pressed filters, selected choice plates, the project card "+" action and text selection. It is also the only figure colour allowed on ink: phone numbers in the phone notch, the job-order number and Sample tag text.
- **Shaded Chevron** (`orange-deep`): only the hover state of the orange button. It never serves as a surface for secondary text.
- **Rust** (`on-orange-2`): secondary text on orange (4.8:1). Covers addresses, hours, notes, captions, footer labels and legal lines. Primary text on orange is ink (`on-orange`, 7.0:1).
- **Chevron Lit Face / Chevron Shade Face** (`mark-lit`, `mark-shade`): the two faces of the SAS logo mark (lit left, shaded right). They appear only inside the mark. The UI orange tokens are separate, slightly deeper values. The stylesheet comments describe the UI tokens as "the chevron faces", but the build uses distinct values, and those are what this file records.

### Neutral
- **Concrete Paper** (`paper`): page ground, the signboard logo plate, nav chips, paper buttons, tags and project title plates. Also primary text on ink (15.2:1).
- **Worn Paper** (`paper-2`): quiet plates on paper. Rental steps, the build/rent choice plates, idle project filters and chip hover.
- **Poured Concrete** (`concrete`): the ground photos sit on while they load, the permits panel, and hover on worn-paper controls.
- **Field White** (`field`): form inputs and the job-order slip.
- **Lift White** (`paper-lift`): the hover/focus state of paper surfaces only (paper buttons, nav chips, inputs).
- **Charcoal Ink** (`ink`): text on light grounds (15.2:1), dark bands, ink buttons, the current nav chip, selected chips, the project card ground, square arrow controls.
- **Plate Charcoal** (`ink-2`): plates inside a band. Service plates, service captions, equipment cards.
- **Lifted Charcoal** (`ink-3`): hover on ink surfaces, and idle filters on dark bands.
- **Rebar Steel** (`steel`): secondary text on paper (6.0:1) and worn paper (5.5:1). Leads, hints, locations, step counters.
- **Galvanized Steel** (`steel-on-dark`): secondary text on ink (7.1:1) and plate charcoal (6.4:1).
- **Hairlines**: `line` for dividers and column spines on paper. `line-strong` for list and table rules, input borders and chip outlines. `line-dark` for rules on ink and for the blueprint grid. `line-orange` for rules on orange.
- **Brick** (`error` text at 7.1:1 on paper, `error-line` for the invalid field border): form validation only.

### Named Rules
**The Field, Not Frosting Rule.** Orange arrives as whole panels, plates and buttons. It is never a tint, a gradient, a glow or a thin decorative stroke. The only small-scale orange is the roof-marker bullet on service item lists.

**The Measured Pairing Rule.** Text pairings are fixed: ink or rust on orange; steel on paper or worn paper; galvanized steel on ink or plate charcoal; orange text only on ink or plate charcoal (7.0:1 / 6.2:1). Orange text on paper (2.2:1), steel on concrete (4.1:1) and rust on shaded orange (4.0:1) are not allowed.

**The First Plate Rule.** In a sequence or menu of plates (service plates, rental steps), only the first plate is orange and the rest are ink or worn paper. A block of orange tiles (the permit tiles) counts as one field and always sits beside a neutral panel.

## Typography

**Display Font:** Chakra Petch (with Arial Narrow, sans-serif), self-hosted at 400/500/600/700
**Body Font:** Chakra Petch (same family)
**Label/Mono Font:** Azeret Mono Variable (with ui-monospace, monospace)

**Character:** Chakra Petch is a squared sans with cut corners. In uppercase it reads like stencilled site signage, and in sentence case it stays plain enough for body copy. Azeret Mono is the surveyor's notation layered on top: small, spaced, uppercase, and only for facts.

### Hierarchy
- **Display** (500, `display` clamp, 0.98, -0.01em, uppercase, balanced): the page H1 only. Individual heroes tune their size within this range, cap the measure around 10–15ch, and stagger their lines in.
- **Headline** (500, `headline` clamp, 0.98, uppercase, balanced): section H2s, capped at roughly 11–16ch so they break into short stacked lines.
- **Title** (500, `title` clamp, 1.0–1.05, uppercase): plate titles, step titles and permit names. Card names use the same weight one step smaller (about 1–1.35rem).
- **Lead** (400, `lead` clamp, 1.45, max 44ch): the paragraph under a headline, usually in steel. On the closing band it becomes uppercase 500.
- **Body** (400, 17px, 1.55–1.6, max 62ch): running copy, `text-wrap: pretty`.
- **Body small** (400, 15px): hero sub-copy, trade details, error messages. Hints drop to 14px.
- **Button / Control** (600, 14–15px, 0.04–0.06em, uppercase): buttons, nav chips, filters, form labels and the "Edit" text control.
- **Data** (Azeret Mono 450, 12px, 0.04em, uppercase, 1.5): addresses, hours, spec rows, step counters ("Step 2 of 4"), locations, `dt` labels, job numbers, the legal line.
- **Tag** (Azeret Mono, 11px, 0.06em, uppercase): category and Sample tags on photos, filter counts, the "optional" marker on form labels.

### Named Rules
**The Mono Is Data Rule.** Azeret Mono is only for things you could measure, dial or file: addresses, hours, phone labels, specs, locations, step counters, job numbers and tags. It is never used for paragraph copy, and never as a kicker above a heading.

**The Uppercase Voice Rule.** Everything that works as signage is uppercase Chakra Petch: headings, plate titles, buttons, nav, labels. Everything that explains stays in sentence case: body, leads, form input text, details.

## Layout

Content sits in a centred frame (`frame-max`) with a fluid `gutter`. Sections breathe on the `section` rhythm. Photo bands, dark bands and orange bands run full-bleed. Some bands deliberately break the frame. The permits band insets its plates only a seam from the viewport edge. The rentals split aligns its copy to the frame while its photo bleeds to the edge.

The header is absolutely positioned over the first band. The signboard logo plate hangs flush from the top-left, the nav chips sit along the top, and the call and menu buttons are top-right. Pages either start under a photo, or start their H1 with enough top padding (about 8–10rem) to clear the plates.

Columns are asymmetric: 4:7 and 5:7 for intro/content, 7:5 for the contact hero, 7:4 for the form beside its slip. Photo/copy splits are 1:1. At desktop the intro column is sticky, and a 1px hairline spine separates it from the content column.

The layout is mobile-first, with three breakpoints: 40rem (two-up grids, the header call button appears), 56rem (permit, closing-band and footer splits, three-up steps) and 64rem (desktop nav, asymmetric splits, pitched photo cuts). Split heroes stack in the order photo, text, orange panel. Call buttons stay one tap away at every width.

Horizontal project tracks use scroll-snap, with cards at min(85vw, 36rem) aligned to the frame edge. The scrollbar is hidden and square arrow buttons drive the track.

Survey marks act as grid furniture. Over a hero photo, 1px paper hairlines (55% opacity) and a 9px crosshair tick mark where the panels meet.

### Named Rules
**The Bolted Seam Rule.** Plates, cards and tiles meet at a `seam` (8px). Button and chip clusters sit at a `cluster` gap (0.35–0.4rem), and nav chips at 2px. Wide gutters never separate plates in the same set.

**The Hairline Spine Rule.** Two-column sections divide on a 1px `line` spine instead of cards or background changes. The intro side stays sticky while the content side scrolls.

## Elevation & Depth

The system is flat. No element uses a box-shadow, drop-shadow or text-shadow. Depth comes from four things:
- Tonal steps: paper to worn paper to concrete, and ink to plate charcoal to lifted charcoal.
- Overlap: the signboard, tags, project title plates and the phone notch sit directly on photos, and orange panels rise into photos.
- The cut: a pitched or chamfered edge shows the layer beneath.
- One scrim: a horizontal ink gradient (92% to 50%) over the closing-band photo.

Hover changes tone. It never changes elevation.

### Named Rules
**The No-Shadow Rule.** Surfaces are flat at rest and flat on hover. To separate two layers, step the tone, overlap them, or cut one of them.

## Shapes

Every UI surface is a sharp rectangle (`rounded.none`, and inputs explicitly reset to 0). Corners are cut with `clip-path`, never curved.

- **Chamfers** (45° corner cuts), on a three-step scale:
  - Small (8–10px): buttons, on two opposite corners (top-right and bottom-left). Permit chips.
  - Plate (14px, `--cut`): all four corners of plates, tiles and the build/rent choice plates.
  - Large (22px, `--cut-lg`): large plates and the rate note.
  - Equipment cards use two opposite corners at about 18px.
- **Single-corner chamfer**: marks a plate that hangs from an edge. Used on the signboard logo plate (bottom-right), the job-order slip (bottom-right) and process thumbnails (bottom-left).
- **Roof-pitch cut**: the diagonal of the SAS chevron (31°, `--pitch` = 0.6). Every large diagonal follows *drop = run × 0.6*. Pairs in use include 8rem/4.8rem, 9rem/5.4rem, 16rem/9.6rem and the footer shoulder at 4.2rem/2.5rem. On mobile the run follows the viewport (42vw) and the drop is computed from `--pitch`. A panel or photo takes one pitched cut, on the corner facing its neighbour, so the two layers read as a single roof line.
- **Raking edges**: short upright edges also take the 0.6 ratio, measured from the vertical instead of the horizontal. Examples are the left edge of the phone notch and the right edge of the paper title plate on project cards.
- **Roof marker**: a small orange double-pitched chevron (about 0.7rem) serves as the bullet on service item lists.
- **Logo mark**: two nested chevrons at the 31° pitch, left face lit and right face shaded. Its tones are brand (on paper), ink (on orange: the menu, and the footer at poster scale) and currentColor.
- **Icons**: custom 24px SVGs with a 1.6 stroke, square caps and miter joins (arrow, arrow-left, plus, minus, phone, menu, close, pin, mail, SMS).
- **Service glyphs**: line drawings on a 120 grid in a 1.5 stroke, matching the blueprint grid they sit on: an RC frame under the roof, a plan sheet with its seal, a tile field, an excavator.

### Named Rules
**The Cut-Not-Curved Rule.** Corners are chamfered or square. A curve belongs only inside a drawn glyph or the logo's chevron feet, never on a box.

**The Roof-Pitch Rule.** Any diagonal larger than a chamfer is cut at the SAS pitch: 0.6 against the horizontal for roof lines, or against the vertical for raking edges. No other angle is used.

## Components

### Buttons
Buttons are plates that label an action: tactile and blunt.
- **Shape:** sharp rectangle with small chamfers on the top-right and bottom-left corners. Label on the left and arrow or phone icon on the right, pushed apart (`space-between`, 1.25rem gap). Minimum height 3rem (48px tap target).
- **Primary (orange):** orange field with ink label in `button` type (600, uppercase, 0.04em).
- **Ink:** ink field with paper label. Used for secondary actions on paper and primary actions on orange.
- **Paper:** paper field with ink label. Used on dark bands and in the header call button.
- **Sizes:** `button-sm` (2.25rem) for header, card and toolbar actions. `button-lg` (3.75rem) for hero doors, closing-band calls and form submit.
- **Hover / Focus:** a background swap over 180ms (orange to shaded orange, ink to lifted charcoal, paper to white), and the arrow nudges 4px right. Focus is a 2px outline inset 5px inside the plate: ink on light buttons, orange on ink buttons and dark bands.
- **Disabled:** 60% opacity with a progress cursor while a form submits.
- **Square arrow control:** a 2.25rem ink square holding only an arrow icon, for carousel paging. Hover lifts it to lifted charcoal.
- **Text control:** uppercase 600 label with a 1px underline, used for secondary actions such as "Edit job order".

### Tags
- **Style:** mono `tag` type on a paper chip with no chamfer. Tags sit top-left on photos with 4px gaps.
- **Sample tag:** ink chip with orange mono text reading "Sample photo" or "Sample listing". It renders whenever a content entry has `sample: true`.

### Chips
- **Nav chips:** paper plates that butt together at 2px, in `control` type (0.06em). Hover lifts to white. The current page inverts to ink with a paper label.
- **Filter chips** (toggle, `aria-pressed`): worn paper on paper, lifted charcoal on dark bands. Pressed turns orange with an ink label. A mono count may follow the label. Minimum height 2.5rem.
- **Choice chips** (form radios): transparent with a 1px `line-strong` outline. Selected fills ink with a paper label. Minimum height 2.75rem. Focus sits inside the chip.
- **Jump chips:** outlined like choice chips. On hover they invert to ink.
- **Permit chips:** static orange labels with small chamfers. Not interactive.

### Cards / Containers
- **Plates:** the base container, a chamfered block on a tone (dark, orange, worn paper or concrete) with generous padding (about 1.1–2.25rem). No border, no shadow.
- **Service plate:** a tall plate-charcoal block with the 18px blueprint grid. It has an uppercase title top-left and a centred service glyph that lifts 6px on hover. A separate caption plate hangs below it at a small seam, in mono steel-on-dark. The first plate of the set is orange, with an ink-tinted grid and rust caption.
- **Project card:** an ink card with a 4:3 grayscale photo. Tags sit top-left, a paper title plate with a slanted right edge sits bottom-left (uppercase title plus mono location in steel), and a 2.5rem orange square "+" action sits bottom-right. On hover the photo regains a trace of colour (grayscale 0.15) and zooms 3% over 900ms. The "+" action turns paper on hover. Cards for real SAS jobs add a mono "n photos" tag, and the whole card opens the project photo viewer.
- **Project photo viewer:** a full-screen ink dialog that opens with the menu's roof-pitch wipe. Uppercase title and mono location top-left, a paper Close button top-right. Photos sit one per slide on a scroll-snap track (swipe, arrow keys or square paper arrow buttons), in full colour with object-fit contain. Below: the alt text as caption, a mono "01 / 05" counter, and a mono line with any design credit and a paper link to the source Facebook post.
- **Equipment card:** plate charcoal with two opposite chamfers, a 4:3 colour photo of the machine alone with tags (and a licence credit bottom-right when the source needs one), an uppercase name, a mono spec list on dark hairlines, and a small orange "Ask availability" button. On hover the photo zooms 4%.
- **Spec list:** mono `dl` rows between hairlines. The label (`dt`) is in secondary steel and the value is right-aligned. Rates always read "Quoted per job".

### Inputs / Fields
- **Style:** a square field-white box with a 1px `line-strong` border and a 2px ink bottom rule, like an underlined form box. Minimum height 3.1rem, 17px text. The select uses a drawn CSS chevron in ink.
- **Labels:** uppercase `control` type above the field. Optional fields add a mono "optional" marker in steel.
- **Focus:** a 2px orange outline flush to the box (offset 0), with the field lifting to white. Hover also lifts to white.
- **Error:** the border and bottom rule turn brick red, and a 500-weight brick message sits below the field. Errors appear only after the first submit attempt. After that they update live, and a summary alert appears next to submit.
- **Choice plates:** the build/rent selector uses worn-paper plates with 14px chamfers, an uppercase name and a steel sub-line. Selected turns orange with a rust sub-line.

### Navigation
- **Header:** the signboard logo plate (paper, flush to the top edge, bottom-right chamfer; mark plus letter-spaced "SAS" at 700 with "CONSTRUCTION" in mono beneath), the nav chips, and a small paper call button carrying the phone number. The nav chips appear from 64rem, and the call button from 40rem.
- **Mobile menu:** a full-screen orange dialog that wipes in from the right. It contains the ink logo mark, a close button, giant uppercase links (clamp 2.2–4rem) between `line-orange` rules with the current page underlined at 3px, and ink call buttons plus mono hours and address pinned at the bottom.
- **Footer nav:** large uppercase links between `line-orange` rules. On hover the label slides 0.5rem right.

### Page Hero (signature)
Inner pages open with the same structure. A display H1 sits across the top. A mono meta column on the right is set off by a hairline spine. Below, an ink panel holds the lead and actions beside a grayscale photo. The photo's top-left corner is cut at the roof pitch, and the ink panel shows through the cut. On mobile it stacks: title, meta, ink panel, photo.

### Phone Notch (signature)
An ink trapezoid anchored to the bottom-right of an orange panel. Its left edge is raked, it holds a mono "Call or text" label, and the number is set in orange Chakra Petch 600. It is the tap-to-call endpoint of the Rent door.

### Job-Order Slip (signature)
A receipt-like summary of the inquiry form. It has a field-white body with a 1px border and one large chamfer at the bottom-right, an ink header strip with the orange mono job number, dashed hairline rows with mono labels, and a mono sign-off. At desktop it stays sticky beside the form, and it returns large on the confirmation step.

### Process Accordion
Hairline rows. Each row has a mono counter ("Step n of N"), an uppercase step name and a plus/minus icon. An open row reveals body copy and a chamfered grayscale thumbnail. Hovering a step underlines its name.

### Closing Band and Footer
The closing band is a grayscale site photo under an ink scrim, with a hairline across it, an uppercase lead, a headline, and two large buttons ("Start a job order", call). The orange footer rises into the band with a roof-pitch shoulder. It holds the legal name, mono address, footer nav, contact list, and the ink logo mark at poster scale.

### Photographs
- **Treatment:** every photo renders `grayscale(1) contrast(1.06) brightness(1.02)` with `object-fit: cover`, on a concrete ground while loading. Colour photos supplied by the client drop in and receive the same treatment.
- **Equipment exception:** rental equipment photos (the Rentals hero and every equipment card) show the machine on its own, in full colour, because renters need to see the actual unit. They set `color: true` in `photos.ts`, which adds `.photo-color`. Stand-ins come from Unsplash, Pexels and Wikimedia Commons. Commons files carry a small mono credit ("Photo: author · licence") at the bottom-right of the card, linked to the file page, as their licences require.
- **Framing:** 4:3 in cards and thumbnails. Bands and heroes fill their area and take the pitched cut.
- **Motion on hover:** a slow zoom (3–4% over 900ms). On project cards the photo regains a trace of colour.

### Motion
- **Easing:** one curve for everything, `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-out`).
- **State changes:** 160–240ms background and colour swaps. Arrow nudge 4px, glyph lift 6px, footer link slide 0.5rem.
- **Entrances reveal by a cut:** headline lines rise 0.3–0.35em through a clip reveal (900ms, 70ms stagger). The orange Rent panel wipes open from its bottom-right corner into its own pitched polygon (1100ms). The menu wipes in from the right (420ms). Accordion panels open top-down (500ms).
- **Section reveals:** every section's content eases in once, the first time it scrolls into view, and never replays when scrolled back to. After it settles (about 1.7s), `data-reveal` is removed so no mask or transform lingers. There are two variants. `data-reveal` blocks such as headings, copy and lists rise 0.75rem while a mask uncovers them top-down (1000ms). `data-reveal="wipe"` plates, cards and photos are uncovered by a mask cut at the 31° roof pitch, sweeping from the bottom-right corner (1100ms), which echoes the Rent panel. Entrances use `--ease-out`. Stagger is `--i` × 90ms, capped at 5 steps. Reveals use masks, never clip-path, because IntersectionObserver reads a target through its own clip-path. They are enabled only by `html.reveal-ready` (set before first paint), wait for the entry loader, and have a failsafe that un-hides content if the app script never runs. Heroes are never reveal targets; they own their entrances. Engine: `src/lib/motion/reveal.ts`.
- **Page changes:** the SAS arrow carries every route change (ported from the Claude Design "Arrow Transition"). The tip peeks up from the bottom edge, dips, then sweeps up the screen with a slight stretch, dragging a paper page behind it while the outgoing page lifts away. The route swaps while the paper covers the viewport, then the paper fades off as the new page rises 30px into place (1.45s in total). New-page entrances and section reveals wait under the paper (`html.pt-cover`), and the scroll reset jumps instead of smooth-scrolling (`html.pt-run`). The overlay is a manual popover so it also covers the open menu dialog. Same-path changes (query, hash) don't trigger it, and it stands down while the entry loader is up. Engine: `src/lib/components/PageTransition.svelte`.
- **Reduced motion:** all animations and transitions collapse to near zero, smooth scrolling turns off, the page transition is skipped, and section reveals and the entry loader never engage.

### Named Rules
**The Visible Sample Rule.** Stock photography and unconfirmed entries (projects, equipment) carry an ink Sample tag with orange text, driven by the content's `sample` flag. The tag stays until real SAS content replaces the entry. It is never hidden to make a layout look finished.

**The Grayscale Site Rule.** Every photograph gets the same grayscale treatment, so SAS orange is the only saturated colour on the page. The exceptions are rental equipment, shown alone and in colour so renters see the actual machine, and the project photo viewer, which shows one SAS photo at a time in colour so clients see the real finishes. Project cards and page heroes stay grayscale.

**The Cut Reveal Rule.** Things enter by being uncovered along a cut: a clip or mask reveal with a short travel of 0.35em (lines) or 0.75rem (blocks) at most. Plates are cut open at the roof pitch. Nothing flies in from a distance or bounces.

## Do's and Don'ts

### Do:
- **Do** cut large panels and photos at the SAS roof pitch (drop = run × 0.6), once per panel, on the corner that meets its neighbour.
- **Do** chamfer plates at 14px, large plates at 22px, and buttons at small two-corner cuts; keep every box's radius at 0.
- **Do** use orange as a whole field (panel, plate, button, tile block) with ink (7.0:1) or rust (4.8:1) text on it.
- **Do** make only the first plate orange in a sequence of plates; the rest are ink or worn paper.
- **Do** run every photo through the shared grayscale treatment, except equipment shots (`color: true`) and the project photo viewer, which show one subject alone and in colour.
- **Do** set signage in uppercase Chakra Petch and data (addresses, hours, specs, counters, job numbers, tags) in Azeret Mono.
- **Do** join plates and cards at 8px seams, and split desktop columns on a 1px hairline spine.
- **Do** end every page at a phone number: the closing band, footer and menu carry call actions at full button height (3rem or more), and a compact header call joins them from 40rem up.
- **Do** mark stock photos and unconfirmed listings with the Sample tag until SAS supplies the real content.

### Don't:
- **Don't** round corners on any box, button, chip, input or card.
- **Don't** use box, drop or text shadows; separate layers by tone, overlap or cut.
- **Don't** set orange text on paper (2.2:1), steel text on concrete (4.1:1), or rust text on shaded orange (4.0:1).
- **Don't** use orange as a tint, a gradient, a glow or a thin accent line; the only gradients are the blueprint grid, the select chevron and the closing-band scrim.
- **Don't** fill the orange tile grid with counters, percentages, years in business, ratings or client logos; the tiles carry verifiable facts such as permit types.
- **Don't** show a photo in full colour or tint it orange.
- **Don't** put a mono line above a heading as a kicker or eyebrow; mono carries data only.
- **Don't** cut a diagonal larger than a chamfer at any angle other than the roof pitch.
- **Don't** remove or restyle away a Sample tag while the entry is still a placeholder.
