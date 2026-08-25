# Wild Camp Media — Home Page Brief

Interviewed: Jon (on behalf of cousin/owner), 2026-08-25.

## The eight interview answers

1. **Vibe, three to five words + references.** "Adventurous, gritty." References:
   Freshman (styles.refero.design — cinema title card, black canvas, ultralight
   editorial type, ticker) for the hero; Creative Giants (styles.refero.design —
   cream editorial poster, weight-300 display, sharp-corner documentary
   photography) for the body. Brand marks: distressed WILD CAMP wordmark,
   viewfinder-with-mountains logo, REC dot.

2. **Scroll journey, in their words.** Short intro of Wild Camp Media. Four
   service areas (DP/Videographer, Drone, Jobsite, Events) each explained
   briefly. A few strong examples of work. Brief who-is-WCM intro. General
   contact invitation. (From the WCM Website Outline v1 — this is the client's
   own sequence, not a menu we offered.)

3. **Energy curve.** Loud cinematic open (hero). Calm down into the warm cream
   editorial body — quiet, confident. One intense spike at the range reveal
   (the peak). Resolve quiet at the close.

4. **Feeling + the ONE moment.** Stage by stage: "this is cinema" (hero) →
   "he's serious" (cream editorial intro) → "he does ALL of this" (range
   reveal — PEAK) → "he's one of us" (blue-collar work, jobsite) → "let's
   talk" (close). Peak sentence a visitor would tell a friend: *"One clip cuts
   from a brewery floor to a crane to a drone lift and back — one guy shoots
   all of that."*

5. **One thing no site does.** Seed chosen: **viewfinder frame**. The page
   chrome behaves like a camera viewfinder — framing corners that track the
   pointer, cuts between sections that read as A-roll/B-roll cuts, REC
   punctuation. (Exact bespoke move designed at Step 2; engine untouched.)

6. **Distance from premium-minimal.** Editorial with a gritty streak. Creative
   Giants structure (cream, light display type, documentary photography) but
   roughened: distressed wordmark, orange REC accents, no polish-for-polish's-
   sake. Not brutalist, not maximalist.

7. **One unbroken world or distinct scenes?** Distinct scenes. Each service is
   its own shoot; cuts between them are the point. The viewfinder chrome is
   the connective tissue, not a continuous camera flight.

8. **Assets already owned.** Real reel footage and photos (brewery, jobsite,
   drone, events). Logo file (transparent PNG, 2026 refresh). Full website
   outline PDF. Route: build from his own footage and photos; nothing needs
   generating except placeholder stills until files arrive.

## Feeling curve (written before the acts)

| Act | Feeling | Caused by |
|---|---|---|
| 1 Open | "This is cinema" | Full-bleed black canvas, ultralight type, his reel scrubbing under the wheel |
| 2 Intro | "He's serious" | Hard cut to cream editorial; light 300 display statement; who he is in two lines |
| 3 Range reveal (PEAK) | "He does ALL of this" | One clip hard-cutting brewery → jobsite → drone lift; viewfinder corners snap each cut |
| 4 Services | "One of us" | Documentary photos of blue-collar work; plain talk, four service blocks |
| 5 Proof | "Real clients trust him" | Selected work strip, client names, FAA Part 107 |
| 6 Close | "Let's talk" | Silence, one line, contact |

## Peak

Act 3, the range reveal. Largest scroll span on the page. Silence before it:
act 2 ends quiet. Sentence: *"One clip cuts from a brewery floor to a crane to
a drone lift and back — one guy shoots all of that."*

## Tell-someone sentence

"It's the site where scrolling his reel feels like operating the camera, and
one cut shows you he shoots breweries, job sites, and drones."

## Authored silence

Act 6 (close): page goes still, cream or black, one line of type, contact
link. No motion. Deliberate, not dead.

---

## Step 2 — grammar, signature, gate, score

### Grammar: filmic one-shot, with hard-cut grounds

Why filmic: the interview demands a scrub hero (the cinematic reel under the
wheel is the whole open) and a scrub peak. Only this grammar permits both.
Why the other seven lost:

- **Chaptered editorial** — forbids the full-bleed scrub hero. Dead on arrival.
- **Rhythmic cutlist** — caps acts at ~1.4vh; a scrub hero wants 2.4–3.0. Also bans pin, which the close needs.
- **Gallery/catalog** — hero must be "object one" with no title treatment; the brief demands a cinema title open.
- **Live surface** — no product to operate. Fails the honesty rule.
- **Typographic poster** — bans photographic ground; this brand IS photography.
- **Split stage** — no two-sided argument.
- **Continuous world** — interview answer 7 chose distinct scenes, not one flight.

Deviation from the filmic default shape, deliberately: **no drift between the
dark hero and the cream body.** Grounds are opaque per-section and change on a
hard cut (devices.md §10 cut rule). The cut is cinema language and it is the
point: dark cold-open, cut to cream editorial, cut back to dark at the peak,
cut to cream for services, close on black.

### Signature move: THE VIEWFINDER (camera chrome as the page)

A fixed HUD layer, present from first paint, that makes the whole page read as
a camera the visitor is operating:

- Four corner brackets frame the viewport, exactly like a camera viewfinder.
  On pointer devices they breathe toward the cursor (few px, lerped).
- A **live timecode** bottom-right, driven by scroll: at 24fps the page's total
  scroll maps to `HH:MM:SS:FF`. Scroll is the playhead. It never stops writing
  while the wheel moves.
- A **REC dot** (brand red #C0392B) top-left beside the logo, pulsing slow.
  Blinks once on every hard cut between scenes, like a cut in camera.
- Each section stamps a **slate** bottom-left as it takes over:
  `SCENE 02 · JOBSITE — 4K · 24FPS`. Slate text from real section metadata.
- The timecode rail doubles as navigation: click a slate stamp, jump to its
  scene.

Bespoke JS + CSS in the page. Engine untouched. Not a kit device; the kit has
no persistent HUD, no scroll-driven timecode, no slate.

### Fingerprint gate

Registry empty (first build). Nothing to clear. Recorded for the next one.

### Device score

| # | Beat | Device | Ground | Span | Why |
|---|---|---|---|---|---|
| 1 | Open "this is cinema" | `scrub` (reel) + kinetic greet | black | 2.6 | The reel under the wheel is the strongest open; dwell settles mid-act |
| 2 | Intro "he's serious" | `pin` + kinetic lines | cream (HARD CUT) | 1.6 | Statement assembles line by line on paper; the cut itself sells the range |
| 3 | Range reveal PEAK | `scrub` (montage clip: brewery→jobsite→drone) | black (HARD CUT) | 3.0 | Largest span; one clip hard-cutting three worlds = "he does all of this" |
| 4 | Services "one of us" | `pan` rail, 4 service cards + heading item | cream | 4.5 | Lateral = options; each service a scene with a slate label |
| 5 | Work "real projects" | `pan` (pinned horizontal, Creative Giants projects-scroll pattern): 4 full-viewport panels, differential column parallax, progress bar + [n/4] pagination, final panel inverts to cream ("Next one's yours") | black, cream rupture on last panel | 3.0 | Lateral travel = the range of real work; the inverted panel is the conversion ask |
| 6 | Close "let's talk" | `pin`, one held line + CTA | black (HARD CUT) | 1.4 | Authored silence; last cue holds; timecode freezes on the final frame |

2026-08-25 revision: act 5 replaced the cream proof flow with the Creative
Giants pinned horizontal projects scroll (deciphered live from
creativegiants.art: GSAP pin + scrub 1.2, per-column parallax, progress bar,
pagination, next-panel peek). Built on the engine's pan device + bespoke
--sc-p column transforms. Page now 13.90vh.

Checks: 5 device families (scrub/pin/pan/flow+reveal/pointer HUD) ✓ · no
repeat back-to-back ✓ · two scrubs, at the cap ✓ · adjacent feelings differ ✓ ·
peak is largest span and follows the quietest act ✓ · total ≈ 14.7vh, clears
the 13.6–13.8 band ✓ · 6 acts ✓.

### Assets

Route: cousin's real reel + photos when they land in `site/assets/incoming/`.
Until then: kie.ai photoreal PLACEHOLDER stills + 2 clips (hero, montage),
every filename prefixed `PLACEHOLDER-`, swap plan in README. Real footage
replaces placeholders without markup changes (same filenames, drop-in).
