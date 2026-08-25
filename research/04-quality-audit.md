# 04 — Quality Audit · Wild Camp Media

2026-08-25, after verification passes (desktop ×3, mobile, reduced-motion).

## Scrollcraft verification (home)

- Dead scroll: none (all passes).
- Scrub clip keeps moving whenever on screen: yes.
- Contrast, measured on composited render:
  - Hero headline 3.78:1 worst frame (large display type, ≥3:1 passes; fixed
    from 1.82 fail by extending the copy-band scrim).
  - Peak sub-line and montage copy: pass after bottom-band scrim.
  - "Start a project" 4.4:1 (UI control, ≥3:1 passes).
  - No fails remain on any pass.
- Pan rail overflow measured by hand (harness cannot catch this):
  1920px: 723px · 1440px: 691px · 390px: 1105px — all healthy after card
  basis widened to clamp(17rem, 26vw, 30rem).
- Focus order (Tab): bar logo → CTA → six slate buttons → page content.
  Sane. Focus-visible themed to accent.
- Page length 11.94 viewports, 6 acts — inside the 8–14 budget, outside the
  13.6–13.8 prior-build band. Peak act (3.5) holds the largest span.
- Mobile (390×844): cuts, rail, close all verified on the contact sheet.
  Hero headline wraps to two lines.
- Reduced motion: clips become posters (engine), montage becomes a stacked
  grid, HUD motion off, slate jump uses auto scroll. Verified.

## Not verified (state honestly)

- A real phone: headless Chrome cannot reproduce iOS video decode, autoplay
  policy, or Low Power Mode. Test on an actual iPhone before launch;
  device-diag.html from the skill is available if the hero clip freezes.
- The feel check was done against contact sheets, not a cold human scroll.

## 12k checklist

SEO: titles/descriptions unique per page ✓ · one H1 per page ✓ · OG tags on
home (inner pages: add OG before launch — noted) · alt text on all imgs ✓ ·
schema markup — NOT DONE, add LocalBusiness/VideoObject before launch ·
sitemap.xml/robots.txt — NOT DONE, generate at deploy · favicon set ✓.

Accessibility: contrast passes measured ✓ · keyboard accessible ✓ (native
buttons, details, forms) · focus indicators ✓ · reduced motion ✓ · semantic
HTML ✓ · form labels ✓.

Performance: images are 5-6MB PNGs (placeholder cost). Before launch convert
to WebP ≤400KB each. Videos: 4.7MB + 2.5MB, lazy-fetched by engine ✓ · GSAP
not used (engine only) · fonts via Google (self-host at launch for speed).

Client-ready: placeholders clearly prefixed PLACEHOLDER- ✓ · TODOs marked in
copy ✓ · forms wired for Netlify (data-netlify) with mailto fallback ·
README deploy steps ✓ · favicon ✓ · 404 page — NOT DONE (host-level) · OG
images — home only, TODO real still.

## Pre-launch punch list

1. Real footage + photos swap (drop-in by filename).
2. Fill every [TODO] in copy (name, region, email, bios, clients, pricing,
   events, socials, privacy).
3. Image optimization pass (WebP).
4. Schema markup + sitemap + robots + OG on all pages.
5. Real-device iOS test.
6. Form endpoint decision (Netlify forms or Formspree).
