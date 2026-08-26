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
