# Contact Modal — Design

Date: 2026-08-25
Status: approved

## Goal

One contact form, in a modal, opened by any "Start a project" CTA on the site. Replaces the four inline `#contact` sections on service pages and the mailto CTA in home `#start`.

## Decisions

- **Submission:** `mailto:` compose now. `FORMSPREE_ENDPOINT = ""` constant at top of `contact-modal.js`. Empty → intercept submit, build mailto URL. Non-empty → plain POST to Formspree, no interception. Later migration = edit one string.
- **Scope:** modal replaces inline contact sections entirely. Service field records which page opened the modal.
- **Look:** film-slate modal. Clapper-stripe header, fields as slate rows, submit reads "MARK IT". Clap animation on open, gated by `prefers-reduced-motion`.

## Files

- `site/js/contact-modal.js` — new. Exposes `WCMContact.init()`. No dependencies. Loaded on all five pages.
- `css/modal.css` — new. Slate modal styles. Home loads `site.css`, service pages load `pages.css` — no shared sheet exists, so the modal gets its own small file loaded by all five pages.
- All five pages — CTA markup changes; service pages lose `#contact` sections (and their `data-netlify` forms).

## Markup contract

- Every CTA that should open the modal carries `data-wcm-contact="home|dp|drone|jobsite|events"`.
- JS intercepts click, `preventDefault`, opens modal, sets hidden `service` field.
- Anchors keep `href` (`index.html#start`) as no-JS fallback; home mailto CTA becomes a button but "Or write directly: hello@wildcampmedia.com" line stays.

## Modal

- Native `<dialog>` — focus trap, Escape, `::backdrop` scrim for free. No library.
- Header: clapper stripe, "WILD CAMP MEDIA · START A PROJECT".
- Fields as slate rows: NAME (SCENE), EMAIL (CONTACT), PROJECT (NOTES, textarea). Hidden `service`.
- Scrim click + visible close button close the modal.

## Submit flow

1. `FORMSPREE_ENDPOINT` non-empty → native form POST, done.
2. Empty → intercept, build `mailto:hello@wildcampmedia.com?subject=[service] project inquiry&body=<name, email, details>`, open via `location.href`, show "opened your mail app" note in modal.

## Testing

- Minimal check: mailto URL builder — field order, `encodeURIComponent` on user input, subject format.
