# Slate Contact Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One film-slate contact form design, embedded inline in each service page's contact section and in a home-only modal opened by home's general CTAs.

**Architecture:** Single ES module `site/js/contact-form.js` (pure mailto builder + form submit handling + modal wiring), single stylesheet `site/css/contact.css` loaded by all five pages. Form markup is hand-duplicated across the four service pages (static site, no build step — duplication is the pattern here). Native `<dialog>` for the modal.

**Tech Stack:** Vanilla HTML/CSS/JS, native `<dialog>`, `node --test` (Node ≥22 built-in) for the one pure function.

**Spec:** `docs/superpowers/specs/2026-08-25-contact-modal-design.md`

---

### Task 1: `buildMailto` pure function (TDD)

**Files:**
- Create: `site/js/contact-form.js`
- Test: `site/js/contact-form.test.js`

- [ ] **Step 1: Write the failing test**

```js
// site/js/contact-form.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMailto } from './contact-form.js';

test('builds mailto with encoded subject and body in fixed order', () => {
  const url = buildMailto({ service: 'drone', name: 'Jane Doe', email: 'jane@x.com', details: 'Aerial survey\nRaleigh site' });
  assert.equal(
    url,
    'mailto:hello@wildcampmedia.com' +
      '?subject=' + encodeURIComponent('[drone] project inquiry — Wild Camp Media') +
      '&body=' + encodeURIComponent('Name: Jane Doe\nEmail: jane@x.com\n\nAerial survey\nRaleigh site')
  );
});

test('handles empty optional fields', () => {
  const url = buildMailto({ service: 'home', name: 'J', email: 'j@x.com', details: '' });
  assert.ok(url.startsWith('mailto:hello@wildcampmedia.com?subject='));
  assert.ok(url.includes('&body='));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test site/js/`
Expected: FAIL — cannot resolve `./contact-form.js` (file does not exist)

- [ ] **Step 3: Write minimal implementation**

```js
// site/js/contact-form.js
/* Wild Camp Media — slate contact form.
   Inline on service pages, modal on home. No dependencies. */

// Formspree endpoint — empty means "mailto mode". Paste the endpoint here later;
// non-empty makes every slate form a plain POST (no interception).
const FORMSPREE_ENDPOINT = '';

export function buildMailto({ service, name, email, details }) {
  const subject = `[${service}] project inquiry — Wild Camp Media`;
  const body = `Name: ${name}\nEmail: ${email}\n\n${details}`;
  return `mailto:hello@wildcampmedia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test site/js/`
Expected: 2 PASS

- [ ] **Step 5: Commit**

```bash
git add site/js/contact-form.js site/js/contact-form.test.js
git commit -m "feat: buildMailto for slate contact form"
```

---

### Task 2: Slate form styles

**Files:**
- Create: `site/css/contact.css`

No automated test — CSS. Verified visually in Task 6.

- [ ] **Step 1: Write `site/css/contact.css`**

Uses tokens from `site.css` (`--sc-canvas`, `--sc-ink`, `--sc-ink-soft`, `--sc-accent`, `--wcm-rec`, `--wcm-mono`, `--sc-font-display`). Slate reads on both dark (modal, home `#start`) and cream (service pages) grounds.

```css
/* Wild Camp Media — slate contact form + modal.
   Loaded by all five pages (no shared sheet otherwise). */

.slate-form {
  display: grid; gap: 1.1rem;
  max-width: 34rem;
  font-family: var(--sc-font-text);
}

/* clapper stripe: angled black/off-white bars */
.slate-form__stripe {
  height: 14px; border-radius: 2px;
  background: repeating-linear-gradient(
    -45deg,
    var(--sc-canvas) 0 14px,
    var(--sc-ink) 14px 28px
  );
}
.slate-form__title {
  font-family: var(--wcm-mono); font-size: 12px;
  letter-spacing: .14em; text-transform: uppercase;
  color: var(--sc-ink-soft);
}

.slate-form__row { display: grid; gap: .4rem; }
.slate-form__row > span {
  font-family: var(--wcm-mono); font-size: 11px;
  letter-spacing: .12em; color: var(--sc-ink-soft);
}
.slate-form input, .slate-form textarea {
  font: inherit; color: inherit;
  background: transparent;
  border: 1px solid var(--sc-ink-soft);
  border-radius: 2px; padding: .65rem .75rem;
}
.slate-form input:focus-visible, .slate-form textarea:focus-visible {
  outline: 2px solid var(--sc-accent); outline-offset: 2px;
  border-color: var(--sc-accent);
}
.slate-form__note { font-size: .85rem; color: var(--sc-ink-soft); }

.slate-form__mark {
  justify-self: start;
  font-weight: 500; font-size: 16px;
  color: var(--sc-accent-ink); background: var(--sc-accent);
  border: 0; border-radius: 2px; padding: .7rem 1.4rem;
  cursor: pointer;
}
.slate-form__mark:hover { filter: brightness(1.08); }
.slate-form__mark:active { transform: scale(.97); }

/* ---- modal (home only) ---- */
.slate-modal {
  border: 0; border-radius: 4px; padding: 0;
  background: var(--sc-canvas); color: var(--sc-ink);
  max-width: min(92vw, 30rem);
}
.slate-modal::backdrop { background: rgba(14,13,11,.8); }
.slate-modal .slate-form { padding: 1.6rem; gap: 1rem; }
.slate-modal__close {
  position: absolute; top: 10px; right: 10px;
  background: none; border: 0; cursor: pointer;
  color: var(--sc-ink-soft); font-family: var(--wcm-mono);
  font-size: 14px; line-height: 1; padding: 6px;
}
.slate-modal__close:hover { color: var(--sc-ink); }

/* clap: stripe snaps once when the modal opens */
@keyframes slate-clap {
  0%   { transform: translateY(-6px) rotate(-2deg); }
  55%  { transform: translateY(2px) rotate(1deg); }
  100% { transform: translateY(0) rotate(0); }
}
.slate-modal[open] .slate-form__stripe { animation: slate-clap .28s ease-out; }
@media (prefers-reduced-motion: reduce) {
  .slate-modal[open] .slate-form__stripe { animation: none; }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/css/contact.css
git commit -m "feat: slate form styles"
```

---

### Task 3: Inline slate forms on the four service pages

**Files:**
- Modify: `site/dp-videographer.html` (head ~line 14, `#contact` ~lines 83–93)
- Modify: `site/drone.html` (head ~line 14, `#contact` ~lines 67–75)
- Modify: `site/jobsite.html` (head ~line 14, `#contact` ~lines 123–133)
- Modify: `site/events.html` (head ~line 14, `#updates` ~lines 81–89)

Each page: add `<link rel="stylesheet" href="css/contact.css">` after the `pages.css` link, add `<script type="module" src="js/contact-form.js"></script>` before `</body>`, replace the old `p-form` with the slate form. Keep each page's existing `h2`. The email-only updates form on events keeps its single field (it is a signup, not a project inquiry — no name/details).

- [ ] **Step 1: dp-videographer.html — replace form, keep `<h2>Check availability.</h2>`**

```html
  <section id="contact">
    <h2>Check availability.</h2>
    <form class="slate-form" data-wcm-service="dp" data-wcm-note="Check availability">
      <div class="slate-form__stripe" aria-hidden="true"></div>
      <p class="slate-form__title">WILD CAMP MEDIA · START A PROJECT</p>
      <label class="slate-form__row"><span>NAME (SCENE)</span>
        <input type="text" name="name" required autocomplete="name"></label>
      <label class="slate-form__row"><span>EMAIL (CONTACT)</span>
        <input type="email" name="email" required autocomplete="email"></label>
      <label class="slate-form__row"><span>PRODUCTION &amp; DATES (NOTES)</span>
        <textarea name="details" rows="4" placeholder="Dates, location, crew size, deliverables"></textarea></label>
      <input type="hidden" name="service" value="dp">
      <button class="slate-form__mark" type="submit">MARK IT</button>
      <p class="slate-form__note" data-wcm-note hidden>Opened your mail app — press send there.</p>
    </form>
  </section>
```

- [ ] **Step 2: drone.html — replace form, keep `<h2>Start an aerial project.</h2>`**

```html
  <section id="contact">
    <h2>Start an aerial project.</h2>
    <form class="slate-form" data-wcm-service="drone">
      <div class="slate-form__stripe" aria-hidden="true"></div>
      <p class="slate-form__title">WILD CAMP MEDIA · START A PROJECT</p>
      <label class="slate-form__row"><span>NAME (SCENE)</span>
        <input type="text" name="name" required autocomplete="name"></label>
      <label class="slate-form__row"><span>EMAIL (CONTACT)</span>
        <input type="email" name="email" required autocomplete="email"></label>
      <label class="slate-form__row"><span>SITE &amp; SCOPE (NOTES)</span>
        <textarea name="details" rows="4" placeholder="Location, what you need from the air, timing"></textarea></label>
      <input type="hidden" name="service" value="drone">
      <button class="slate-form__mark" type="submit">MARK IT</button>
      <p class="slate-form__note" data-wcm-note hidden>Opened your mail app — press send there.</p>
    </form>
  </section>
```

- [ ] **Step 3: jobsite.html — replace form, keep `<h2>Discuss your jobsite.</h2>`**

```html
  <section id="contact">
    <h2>Discuss your jobsite.</h2>
    <form class="slate-form" data-wcm-service="jobsite">
      <div class="slate-form__stripe" aria-hidden="true"></div>
      <p class="slate-form__title">WILD CAMP MEDIA · START A PROJECT</p>
      <label class="slate-form__row"><span>NAME (SCENE)</span>
        <input type="text" name="name" required autocomplete="name"></label>
      <label class="slate-form__row"><span>EMAIL (CONTACT)</span>
        <input type="email" name="email" required autocomplete="email"></label>
      <label class="slate-form__row"><span>COMPANY &amp; PROJECT (NOTES)</span>
        <textarea name="details" rows="4" placeholder="Company, project type, location, timing"></textarea></label>
      <input type="hidden" name="service" value="jobsite">
      <button class="slate-form__mark" type="submit">MARK IT</button>
      <p class="slate-form__note" data-wcm-note hidden>Opened your mail app — press send there.</p>
    </form>
  </section>
```

- [ ] **Step 4: events.html — replace updates form, keep `<h2>Stay posted.</h2>` and `id="updates"`**

```html
  <section id="updates">
    <h2>Stay posted.</h2>
    <form class="slate-form" data-wcm-service="events">
      <div class="slate-form__stripe" aria-hidden="true"></div>
      <p class="slate-form__title">WILD CAMP MEDIA · EVENT UPDATES</p>
      <label class="slate-form__row"><span>EMAIL (CONTACT)</span>
        <input type="email" name="email" required autocomplete="email" placeholder="you@example.com"></label>
      <input type="hidden" name="service" value="events">
      <button class="slate-form__mark" type="submit">MARK IT</button>
      <p class="slate-form__note" data-wcm-note hidden>Opened your mail app — press send there.</p>
    </form>
  </section>
```

- [ ] **Step 5: On all four pages, rewire nav "Start a project"**

`dp-videographer.html`, `drone.html`, `jobsite.html`, `events.html` — change

```html
    <li><a href="index.html#start">Start a project</a></li>
```

to

```html
    <li><a href="#contact">Start a project</a></li>
```

(`events.html` uses `href="#updates"` instead — it has no `#contact`.)

- [ ] **Step 6: On all four pages, add CSS + JS to head/foot**

After the `css/pages.css` link:

```html
<link rel="stylesheet" href="css/contact.css">
```

Before `</body>`:

```html
<script type="module" src="js/contact-form.js"></script>
```

- [ ] **Step 7: Run tests (unchanged, sanity) and commit**

Run: `node --test site/js/` — Expected: PASS

```bash
git add site/dp-videographer.html site/drone.html site/jobsite.html site/events.html
git commit -m "feat: inline slate contact forms on service pages"
```

---

### Task 4: Home modal + CTA wiring

**Files:**
- Modify: `site/index.html` (head ~line 13, nav line 36, hero line 75, proj card 4 line 248, `#start` ~lines 261–276)

- [ ] **Step 1: Head — add contact.css after `css/site.css`**

```html
<link rel="stylesheet" href="css/contact.css">
```

- [ ] **Step 2: Add the modal dialog just before `</body>` (after the hud.js script block)**

```html
<dialog class="slate-modal" id="wcm-contact" aria-labelledby="wcm-contact-title">
  <form class="slate-form" data-wcm-service="home" method="POST">
    <button class="slate-modal__close" type="button" value="cancel" aria-label="Close">✕</button>
    <div class="slate-form__stripe" aria-hidden="true"></div>
    <p class="slate-form__title" id="wcm-contact-title">WILD CAMP MEDIA · START A PROJECT</p>
    <label class="slate-form__row"><span>NAME (SCENE)</span>
      <input type="text" name="name" required autocomplete="name"></label>
    <label class="slate-form__row"><span>EMAIL (CONTACT)</span>
      <input type="email" name="email" required autocomplete="email"></label>
    <label class="slate-form__row"><span>PROJECT (NOTES)</span>
      <textarea name="details" rows="4" placeholder="What needs a camera? Where, when, roughly how big"></textarea></label>
    <input type="hidden" name="service" value="home">
    <button class="slate-form__mark" type="submit">MARK IT</button>
    <p class="slate-form__note" data-wcm-note hidden>Opened your mail app — press send there.</p>
  </form>
</dialog>
<script type="module" src="js/contact-form.js"></script>
```

- [ ] **Step 3: Rewire home CTAs to open the modal**

Four changes, each adds `data-wcm-contact` (anchors keep `href` as no-JS fallback):

Line 36 nav bar:
```html
  <a class="bar__cta" href="#start" data-wcm-contact>Start a project</a>
```

Line 75 hero:
```html
        <a class="hero-cta" href="#start" data-wcm-contact>Start a project</a>
```

Line 248, proj card 4 — service cards 1–3 already link to their service pages (`proj__link`), leave those:
```html
            <a class="proj__cta" href="#start" data-wcm-contact>Start a project</a>
```

Line 266, `#start` CTA — becomes a button:
```html
        <button class="cta" data-wcm-contact data-sc-cue="0.1" data-sc-rise="0">Start a project</button>
```

(The `data-sc-magnet` attribute is dropped — scrollcraft magnet applies to links that scroll; verify `.cta` styling still holds for `<button>`; if `.cta` uses `text-decoration`, add `.cta { cursor: pointer; }` handling in `contact.css`.)

Keep the `close__line` mailto line — it is the no-JS path.

- [ ] **Step 4: Commit**

```bash
git add site/index.html
git commit -m "feat: home contact modal + CTA wiring"
```

---

### Task 5: Submit handling + modal logic in `contact-form.js`

**Files:**
- Modify: `site/js/contact-form.js`

- [ ] **Step 1: Append wiring to `contact-form.js`** (keep `buildMailto` and its export intact)

```js
/* ---- wiring (browser only; node --test imports skip this) ---- */
if (typeof document !== 'undefined') {
  const modal = document.getElementById('wcm-contact');

  // submit: Formspree if configured, else mailto compose
  for (const form of document.querySelectorAll('.slate-form')) {
    if (FORMSPREE_ENDPOINT) {
      form.action = FORMSPREE_ENDPOINT;
      form.method = 'POST';
      continue;
    }
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) return; // let the browser show validation UI
      e.preventDefault();
      const data = new FormData(form);
      const url = buildMailto({
        service: data.get('service') || 'home',
        name: data.get('name') || '',
        email: data.get('email') || '',
        details: data.get('details') || '',
      });
      location.href = url;
      const note = form.querySelector('[data-wcm-note]');
      if (note) note.hidden = false;
    });
  }

  // modal open (home only)
  if (modal) {
    const serviceInput = modal.querySelector('input[name="service"]');
    for (const cta of document.querySelectorAll('[data-wcm-contact]')) {
      cta.addEventListener('click', (e) => {
        e.preventDefault();
        serviceInput.value = cta.dataset.wcmContact || 'home';
        modal.showModal();
      });
    }
    modal.querySelector('.slate-modal__close')
      .addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => { // scrim click: dialog covers scrim
      if (e.target === modal) modal.close();
    });
  }
}
```

- [ ] **Step 2: Run tests (must still pass — guard works)**

Run: `node --test site/js/`
Expected: 2 PASS (document undefined in node, wiring skipped)

- [ ] **Step 3: Commit**

```bash
git add site/js/contact-form.js
git commit -m "feat: slate form submit handling + modal wiring"
```

---

### Task 6: Verify in a real browser

- [ ] **Step 1: Serve the site**

```bash
cd site && python3 -m http.server 8090
```

- [ ] **Step 2: Drive it** (use the agent-browser skill)

1. `http://localhost:8090/` — click nav "Start a project" → modal opens, clap animation plays, Escape closes.
2. Fill modal, submit → mail app note appears, `location.href` is a `mailto:` (check via console).
3. Hero CTA + "Next one's yours" card → modal.
4. Service cards 1–3 → their service pages, `#contact` shows slate form.
5. Each service page: nav "Start a project" scrolls to own contact form; submit builds mailto.
6. Screenshot modal + one inline form. Look at them.
7. Keyboard: tab order in modal, focus trapped, Escape closes. Scrim click closes.

- [ ] **Step 3: Fix anything found, commit**

```bash
git add -A site
git commit -m "fix: contact form verification pass"
```

(Skip commit if nothing found.)
