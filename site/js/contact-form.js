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
        const note = modal.querySelector('[data-wcm-note]');
        if (note) note.hidden = true;
        modal.showModal();
      });
    }
    modal.querySelector('.slate-modal__close')
      .addEventListener('click', () => modal.close());
    let downOn = null;
    modal.addEventListener('mousedown', (e) => { downOn = e.target; });
    modal.addEventListener('click', (e) => { // scrim click: require down+up on backdrop
      if (e.target === modal && downOn === modal) modal.close();
      downOn = null;
    });
  }
}
