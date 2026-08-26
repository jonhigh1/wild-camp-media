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
