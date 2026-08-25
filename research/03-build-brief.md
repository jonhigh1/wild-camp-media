# 03 — Build Brief · Wild Camp Media

Merge of brand intake + competitor analysis. Master doc for the build.

## Design Direction

**Concept: "the site is the camera."** Dark cinema cold-open (Freshman grammar:
black canvas, ultralight/light type, one accent, hairlines) hard-cuts to warm
cream editorial body (Creative Giants grammar: weight-300 display 54–84px,
tight tracking, sharp-corner documentary photography, no shadows). Signature
move: persistent viewfinder HUD (corner brackets, REC dot, scroll-driven
timecode, slate-per-scene navigation).

### Palette (from logo, rationed per Freshman rules)

| Role | Dark ground | Cream ground |
|---|---|---|
| Canvas | #0E0D0B (warm off-black) | #F7F1E3 (brand cream, family of #F5EFE0) |
| Surface | #171410 | #EFE7D5 |
| Ink | #F5EFE0 | #171412 |
| Ink-soft | #A79C8C (warm, tinted) | #5A5348 |
| Accent | #D35400 burnt orange (one hue both grounds) | same |
| Punctuation | #C0392B REC red — HUD only, one element per viewport |

### Typography

- Display: **Archivo 300** (Creative Giants weight-300 rule; true 300, never
  bold; tracking tightens with size). 500 for small UI only.
- Text: **Geist 400**.
- HUD/labels/timecode: **Geist Mono** (data, not costume — timecode and slate
  are genuine camera metadata).

### Motion

Scrollcraft engine. Device score in `builds/home/BRIEF.md`. GSAP not needed;
engine covers it. Reduced-motion: HUD static, clips become posters, rail
becomes scroll region.

### Avoid (competitor failures)

Service-description headlines, gear lists above proof, Vimeo-link portfolios,
mailto-only contact, no pricing anywhere, generic template looks.

## Site Architecture

| Page | Purpose | Primary CTA |
|---|---|---|
| index.html | Reel-first brand intro, route to services | Start a project |
| dp-videographer.html | Hire the DP | Check Availability |
| drone.html | Aerial work | Get a Quote [TODO confirm] |
| jobsite.html | Construction documentation | Discuss Your Jobsite |
| events.html | WCM-hosted events | RSVP / Tickets |

No About/Portfolio/Contact pages (outline rule): each service page carries
selected work, short bio, contact form. Nav: logo + 4 services + CTA.
Shared footer. Privacy page if needed.

## Content Framework

**Home hero (outcome formula, from competitor pattern 1):**
"Show the work. Win the work." Sub: "Breweries. Job sites. Drones. Events.
One camera operator who shows up ready."

Alternates: "Your best work deserves a camera." / "Documented work sells
itself."

**Trust stack (competitor gap 3/9):** FAA Part 107 · Insured · [region] —
elevated to proof act, badge treatment, not footnote.

**Pricing (competitor gap 6):** service pages get an engagement menu (one-time
visit / progress series / monthly content etc. from outline) with "from $X"
ranges once cousin supplies numbers. No invented figures anywhere.

**Work by trade (gap 8):** service pages naturally segment; keep galleries
labeled by trade.

**SEO targets:** videographer [region], construction video documentation,
drone photography [region], brewery video, jobsite progress video, FAA Part
107 videographer. One H1 per page, service names in titles.

## Conversion Playbook

- Primary conversion: project inquiry (email for v1 [TODO: form endpoint —
  Netlify Forms or Formspree on deploy]).
- Every page: work first, proof second, one CTA repeated with ONE label per
  page.
- Social proof: client names/logos [TODO list], testimonials [TODO].

## Placeholders

All generated imagery PLACEHOLDER-* prefixed. Swap with real reel/photos by
same filename in assets/. TODOs in copy: name, region, email, client list,
pricing, socials, captions.
