/* WCM viewfinder HUD — the signature move. Engine untouched.
   Corner brackets, scroll timecode, slate nav, scene tracking, cut blink,
   and the hard-cut montage in act 3, all driven off page scroll. */
window.WCMHud = (function () {
  var FPS = 24;
  var TOTAL_SECONDS = 92.55; // the page runs the length of Chris's actual reel

  function init() {
    var corners = Array.prototype.slice.call(document.querySelectorAll('[data-vf-corner]'));
    var tcEl = document.querySelector('[data-vf-tc]');
    var vf = document.querySelector('.vf');
    var slates = Array.prototype.slice.call(document.querySelectorAll('[data-vf-slate]'));
    var scenes = Array.prototype.slice.call(document.querySelectorAll('[data-scene]'));
    var tris = Array.prototype.slice.call(document.querySelectorAll('.tri'));
    var peak = document.getElementById('scene-3');
    var projSec = document.getElementById('scene-5');
    var projFill = document.querySelector('[data-vf-fill]');
    var projCount = document.querySelector('[data-vf-count]');
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
    var sheet = document.getElementById('sheet');
    var su = 0; // scene-2 strip unroll progress

    var px = 0, py = 0, tx = 0, ty = 0; // corner targets / lerped positions

    if (finePointer) {
      addEventListener('pointermove', function (e) {
        var nx = e.clientX / innerWidth - 0.5;
        var ny = e.clientY / innerHeight - 0.5;
        // each corner leans a few px toward the pointer, opposite in x/y
        tx = nx * 10; ty = ny * 8;
      }, { passive: true });
    }

    // slate buttons jump to their scene
    slates.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var t = document.getElementById(btn.getAttribute('data-vf-slate'));
        if (!t) return;
        t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
    });

    function pad(n, w) { n = String(Math.floor(n)); return n.length < w ? '0'.repeat(w - n.length) + n : n; }

    function timecode(frac) {
      var total = Math.max(0, Math.min(1, frac)) * TOTAL_SECONDS * FPS;
      var f = Math.floor(total % FPS);
      var s = Math.floor(total / FPS) % 60;
      var m = Math.floor(total / (FPS * 60)) % 60;
      var h = Math.floor(total / (FPS * 3600));
      return pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(f, 2);
    }

    function currentScene() {
      // deepest scene whose top is above mid-viewport
      var best = null;
      scenes.forEach(function (s) {
        if (s.getBoundingClientRect().top < innerHeight * 0.5) best = s;
      });
      return best;
    }

    function act3cuts() {
      if (!peak || reduce || !tris.length) return;
      var p = parseFloat(getComputedStyle(peak).getPropertyValue('--sc-p')) || 0;
      // static cue for the developing strip: REC dot marks the latest developed frame
      var idx = p < 0.34 ? 0 : p < 0.64 ? 1 : 2;
      tris.forEach(function (t, i) { t.classList.toggle('is-live', i === idx); });
    }

    var lastScene = null, lastTc = '';

    function frame() {
      // timecode: scroll is the playhead
      var frac = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      var tc = timecode(frac);
      if (tcEl && tc !== lastTc) { tcEl.textContent = tc; lastTc = tc; }

      act3cuts();

      // selected-work rail: progress fill + [n/4] pagination
      if (projSec && projFill) {
        var pp = parseFloat(getComputedStyle(projSec).getPropertyValue('--sc-p')) || 0;
        projFill.style.transform = 'scaleX(' + pp.toFixed(4) + ')';
        if (projCount) {
          var n = Math.min(4, Math.floor(pp * 4) + 1);
          var t = '[' + n + '/4]';
          if (projCount.textContent !== t) projCount.textContent = t;
        }
      }

      // scene tracking: slate + ground class + cut blink
      var sc = currentScene();
      if (sc && sc !== lastScene) {
        lastScene = sc;
        var id = sc.id;
        slates.forEach(function (b) {
          b.setAttribute('aria-current', b.getAttribute('data-vf-slate') === id ? 'true' : 'false');
        });
        var light = sc.classList.contains('ground-cream');
        if (light) document.body.setAttribute('data-vf-light', '');
        else document.body.removeAttribute('data-vf-light');
        if (vf && !reduce) {
          vf.classList.add('is-cutting');
          setTimeout(function () { vf.classList.remove('is-cutting'); }, 90);
        }
      }

      // corners breathe toward the pointer
      if (finePointer && !reduce) {
        px += (tx - px) * 0.08; py += (ty - py) * 0.08;
        corners.forEach(function (c, i) {
          var sx = (i === 0 || i === 2) ? -1 : 1;  // left corners lean opposite
          var sy = (i < 2) ? -1 : 1;
          c.style.transform = 'translate(' + (px * sx).toFixed(2) + 'px,' + (py * sy).toFixed(2) + 'px)';
        });
      }
      // scene 2: the strip unrolls as ITS OWN center climbs the viewport.
      // (section-anchored timing played the animation before the sheet was visible)
      if (sheet && !reduce) {
        var r2 = sheet.getBoundingClientRect();
        var c = r2.top + r2.height / 2;
        var suT = Math.max(0, Math.min(1, (innerHeight * 0.72 - c) / (innerHeight * 0.38)));
        su += (suT - su) * 0.18;
        sheet.style.clipPath = 'inset(-20px -20px ' + (72 * (1 - su)).toFixed(2) + '% -20px)';
        sheet.classList.toggle('is-in', su > 0.85); // grease pencil lands after the film pays out
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // hero reel: autoplay is attribute-driven, but Safari Low Power Mode and
  // cold caches need an explicit nudge. Retry on first interaction if blocked.
  function armHeroReel() {
    var v = document.querySelector('.hero-loop');
    if (!v) return;
    // source selection lives inline next to the <video>; this arm only retries play()
    var tryPlay = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    if (v.readyState >= 3) tryPlay(); else v.addEventListener('canplay', tryPlay, { once: true });
    ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(function (ev) {
      addEventListener(ev, tryPlay, { once: true, passive: true });
    });
  }
  armHeroReel();

  return { init: init };})();
