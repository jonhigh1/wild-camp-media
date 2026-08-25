# Wild Camp Media — Website

Portfolio + services site for Wild Camp Media (WCM). Built 2026-08-25.

## Structure

```
site/                    ← the deliverable (static, no build step)
├── index.html           ← home: scrollcraft page, viewfinder HUD signature
├── dp-videographer.html ← DP/videography services
├── drone.html           ← drone photo/video
├── jobsite.html         ← construction video services
├── events.html          ← WCM-hosted events
├── privacy.html         ← stub, needs real policy
├── scrollcraft.js/.css  ← motion engine (do not edit per-project)
├── css/site.css         ← home theme
├── css/pages.css        ← service page system
├── js/hud.js            ← signature move: viewfinder HUD + montage cuts
└── assets/              ← img/, video/, incoming/ (raw drops)
research/                ← 12k-site-builder deliverables (01-03 done)
builds/home/BRIEF.md     ← scrollcraft brief: journey, feeling curve, score
scrollcraft/             ← fingerprint registry
```

## Run locally

```bash
cd site && npx serve .    # or: python3 -m http.server
```

Note: opening index.html via file:// will not load the scrub videos
(engine fetches them as blobs; needs http).

## Swap in real footage/photos

1. Drop raw files in `site/assets/incoming/`.
2. Grade + encode for scrubbing (hero clip only):
   ```bash
   ffmpeg -y -i raw.mov -vf "colorlevels=rimin=.09:gimin=.09:bimin=.09:rimax=.64:gimax=.64:bimax=.64,eq=saturation=1.08,fps=30,scale=1920:-2" -c:v libx264 -crf 16 -an graded.mp4
   bash ~/.claude/skills/scrollcraft/scripts/encode.sh graded.mp4 site/assets/video/PLACEHOLDER-hero.mp4
   ```
3. Replace stills by reusing the `PLACEHOLDER-*` filenames, then rename the
   prefix away once everything is real.

Rules for the hero clip: single continuous move, subject centered, no one
walks through frame, 24-30fps target before encode.

## TODO before launch (all marked [TODO] in pages)

- Name: Chris McDaniel. Bios written (DP, jobsite, events host). Region: Greensboro, NC.
- Real email + form endpoint (forms have `data-netlify`; on Netlify they just
  work, otherwise use Formspree and change `action`)
- Client list, selected work galleries, testimonials (real only — no invented
  quotes or numbers)
- Pricing for the 5 jobsite engagement types (competitor analysis: pricing
  transparency is the niche's biggest gap)
- Events: dates, titles, ticket links
- Real privacy policy
- Socials

## Deploy

Any static host. Netlify recommended (forms already wired):
drag `site/` to app.netlify.com, or connect the repo with publish
directory `site/`.

## Design system

- Dark cinema ground #0E0D0B + cream #F7F1E3, burnt orange #D35400 accent,
  REC red #C0392B (HUD only). From the logo.
- Archivo single-family (300 display, never bold; 400/500 text), IBM Plex Mono
  for camera metadata only (slates, timecode, captions).
- Hero: Freshman (styles.refero.design/a6284fcd). Body: Creative Giants
  (styles.refero.design/ff8f39ee). Hard cuts between grounds, no crossfades.
- Signature move: viewfinder HUD (corner brackets, REC, scroll timecode,
  slate nav) + scroll-driven hard-cut montage at the range-reveal peak.
