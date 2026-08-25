# Contact Modal + Slate Form — Design

Date: 2026-08-25
Status: approved (revised — service pages embed inline form, modal is home-only)

## Goal

One contact form design, the film slate, used two ways: embedded inline in each service page's `#contact` section, and in a modal opened by home's general "Start a project" CTAs.

## Decisions

- **Submission:** `mailto:` compose now. `FORMSPREE_ENDPOINT = ""` constant at top of `contact-form.js`. Empty → intercept submit, build mailto URL. Non-empty → plain POST to Formspree, no interception. Later migration = edit one string.
- **Scope:** service pages keep their `#contact` sections and embed the slate form inline. The modal exists only on home.
- **Look:** film-slate form. Clapper-stripe header, fields as slate rows, submit reads "MARK IT". Clap animation on modal open, gated by `prefers-reduced-motion`.

## Files

- `site/js/contact-form.js` — new. Exposes `WCMContact.init()`. No dependencies. Handles submit for all slate forms (inline + modal) and modal open/close on home. Loaded on all five pages.
- `css/contact.css` — new. Slate form + modal styles, loaded by all five pages (home loads `site.css`, service pages load `pages.css` — no shared sheet exists).

## CTA wiring

- Home: nav bar "Start a project", hero CTA, and `#start` CTA open the modal (`data-wcm-contact="home"`). `#start`'s "Or write directly: hello@wildcampmedia.com" mailto line stays as no-JS path.
- Home service cards (`proj__cta`): link to each service page's `#contact` (e.g. `dp-videographer.html#contact`).
- Service pages: p-cta stays an anchor to own-page `#contact`. Nav "Start a project" links change from `index.html#start` to own-page `#contact`.
- Inline forms carry `data-wcm-service="dp|drone|jobsite|events"`; modal sets its hidden `service` field from the opener attribute.

## Form (shared markup: modal on home, inline ×4)

- Native `<dialog>` for the modal — focus trap, Escape, `::backdrop` scrim for free. No library.
- Header: clapper stripe, "WILD CAMP MEDIA · START A PROJECT".
- Fields as slate rows: NAME (SCENE), EMAIL (CONTACT), PROJECT (NOTES, textarea). Hidden `service`.
- Inline copies on service pages use the same field markup with page-specific headings (existing h2s stay).
- Scrim click + visible close button close the modal.

## Submit flow

1. `FORMSPREE_ENDPOINT` non-empty → native form POST, done.
2. Empty → intercept, build `mailto:hello@wildcampmedia.com?subject=[service] project inquiry&body=<name, email, details>`, open via `location.href`, show "opened your mail app" note in modal.

## Testing

- Minimal check: mailto URL builder — field order, `encodeURIComponent` on user input, subject format.
