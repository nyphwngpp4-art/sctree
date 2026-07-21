/* SC Tree Service - front-end behavior.
   No backend: the estimate request becomes a prefilled SMS to Saul's phone.
   Nothing typed here is sent to any server or analytics endpoint. */
(function () {
  'use strict';

  var PHONE_E164 = '+13256427438';

  /* ---------- analytics: event names only, never field contents ---------- */
  function track(name) {
    try { (window.dataLayer = window.dataLayer || []).push({ event: name }); } catch (e) { /* no-op */ }
  }

  /* ---------- platform detection ---------- */
  var ua = navigator.userAgent || '';
  var isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  var isPhoneLike = isIOS || isAndroid || /Mobile|Windows Phone/i.test(ua);

  function smsHref(body) {
    // iOS expects "&body=", Android and most others expect "?body=".
    var sep = isIOS ? '&' : '?';
    return 'sms:' + PHONE_E164 + sep + 'body=' + encodeURIComponent(body);
  }

  /* ====================================================================
     Quote drawer
     ==================================================================== */
  var drawer = document.getElementById('quote-drawer');
  var form = document.getElementById('quote-form');
  var progress = document.getElementById('drawer-progress');
  var opener = null;
  var DRAFT_KEY = 'sctree-quote-draft'; // sessionStorage only: cleared when the tab closes

  function stepEls() { return Array.prototype.slice.call(drawer.querySelectorAll('.step')); }

  function showStep(n) {
    stepEls().forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-step') === String(n));
    });
    if (progress) {
      progress.textContent = n === 3 ? 'Ready to send' : 'Step ' + n + ' of 2';
    }
    var active = drawer.querySelector('.step.is-active');
    if (active) {
      var first = active.querySelector('input, select, textarea, a.btn, button');
      if (first) { try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }
    }
    drawer.querySelector('.drawer__body').scrollTop = 0;
  }

  function openDrawer(service, trigger) {
    opener = trigger || document.activeElement;
    restoreDraft();
    if (service) {
      var sel = document.getElementById('q-service');
      sel.value = service;
    }
    showStep(1);
    if (typeof drawer.showModal === 'function') { drawer.showModal(); }
    else { drawer.setAttribute('open', ''); }
    track('quote_form_opened');
  }

  function closeDrawer() {
    if (typeof drawer.close === 'function' && drawer.open) { drawer.close(); }
    else { drawer.removeAttribute('open'); }
  }

  drawer.addEventListener('close', function () {
    if (opener && typeof opener.focus === 'function') { opener.focus(); }
  });

  // openers (hero, header, services, storm, final CTA, sticky bar)
  document.querySelectorAll('[data-quote-open]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openDrawer(btn.getAttribute('data-service') || '', btn);
    });
  });
  drawer.querySelector('[data-quote-close]').addEventListener('click', closeDrawer);
  // click on the backdrop closes
  drawer.addEventListener('click', function (e) {
    if (e.target === drawer) { closeDrawer(); }
  });

  /* ---------- draft persistence (session only) ---------- */
  function serializeForm() {
    var data = {};
    ['service', 'location', 'desc'].forEach(function (k) {
      var el = form.elements[k];
      if (el) { data[k] = el.value; }
    });
    data.near = Array.prototype.filter.call(form.querySelectorAll('input[name="near"]'), function (c) { return c.checked; })
      .map(function (c) { return c.value; });
    var urg = form.querySelector('input[name="urgency"]:checked');
    data.urgency = urg ? urg.value : '';
    var rep = form.querySelector('input[name="reply"]:checked');
    data.reply = rep ? rep.value : '';
    return data;
  }

  function saveDraft() {
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(serializeForm())); } catch (e) { /* storage unavailable */ }
  }

  function restoreDraft() {
    var raw = null;
    try { raw = sessionStorage.getItem(DRAFT_KEY); } catch (e) { /* storage unavailable */ }
    if (!raw) { return; }
    try {
      var d = JSON.parse(raw);
      ['service', 'location', 'desc'].forEach(function (k) {
        if (form.elements[k] && typeof d[k] === 'string') { form.elements[k].value = d[k]; }
      });
      form.querySelectorAll('input[name="near"]').forEach(function (c) {
        c.checked = Array.isArray(d.near) && d.near.indexOf(c.value) !== -1;
      });
      if (d.urgency) {
        var u = form.querySelector('input[name="urgency"][value="' + CSS.escape(d.urgency) + '"]');
        if (u) { u.checked = true; }
      }
      if (d.reply) {
        var r = form.querySelector('input[name="reply"][value="' + CSS.escape(d.reply) + '"]');
        if (r) { r.checked = true; }
      }
      updateDescCount();
    } catch (e) { /* corrupt draft: ignore */ }
  }

  form.addEventListener('input', saveDraft);
  form.addEventListener('change', saveDraft);

  /* ---------- description counter ---------- */
  var desc = document.getElementById('q-desc');
  var descCount = document.getElementById('q-desc-count');
  function updateDescCount() {
    if (desc && descCount) { descCount.textContent = desc.value.length + ' / 400'; }
  }
  if (desc) { desc.addEventListener('input', updateDescCount); }

  /* ---------- validation ---------- */
  function validateStep1() {
    var ok = true;
    ['service', 'location'].forEach(function (k) {
      var el = form.elements[k];
      var wrap = el.closest('.field');
      var valid = !!(el.value && el.value.trim());
      wrap.classList.toggle('is-invalid', !valid);
      el.setAttribute('aria-invalid', valid ? 'false' : 'true');
      if (!valid && ok) { el.focus(); ok = false; }
    });
    return ok;
  }

  drawer.querySelector('[data-step-next]').addEventListener('click', function () {
    if (validateStep1()) { showStep(2); }
  });
  drawer.querySelector('[data-step-back]').addEventListener('click', function () { showStep(1); });

  /* ---------- build the message ---------- */
  function buildMessage() {
    var d = serializeForm();
    var near = d.near.length ? d.near.join(', ') : 'Not specified';
    var lines = [
      'SC TREE ESTIMATE REQUEST',
      '',
      'Location: ' + d.location.trim(),
      'Service: ' + d.service,
      'Near: ' + near,
      'Urgency: ' + (d.urgency || 'Not specified'),
      'Reply by: Text or call this number'
    ];
    if (d.desc.trim()) {
      lines.push('', 'Details:', d.desc.trim());
    }
    lines.push('', "I'll attach photos in this message.");
    return lines.join('\n');
  }

  /* ---------- submit -> handoff ---------- */
  var handoffText = document.getElementById('handoff-text');
  var handoffSms = document.getElementById('handoff-sms');
  var handoffDesktop = document.getElementById('handoff-desktop');
  var handoffMobileRow = document.getElementById('handoff-mobile-row');
  var handoffMobileNote = document.getElementById('handoff-mobile-note');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateStep1()) { showStep(1); return; }
    var msg = buildMessage();
    var href = smsHref(msg);
    track('quote_form_completed');

    handoffText.textContent = msg;
    handoffSms.setAttribute('href', href);

    if (isPhoneLike) {
      handoffDesktop.hidden = true;
      handoffMobileRow.hidden = false;
      handoffMobileNote.hidden = false;
      showStep(3);
      // open Messages directly; the handoff panel stays behind as the fallback
      track('sms_link_opened');
      window.location.href = href;
    } else {
      handoffMobileRow.hidden = true;
      handoffMobileNote.hidden = true;
      handoffDesktop.hidden = false;
      renderQr(href);
      showStep(3);
    }
  });

  handoffSms.addEventListener('click', function () { track('sms_link_opened'); });

  /* ---------- desktop: copy + QR ---------- */
  var copyBtn = document.getElementById('copy-request');
  var copyOk = document.getElementById('copy-ok');
  var copyFail = document.getElementById('copy-fail');

  function flash(el) {
    copyOk.classList.remove('show');
    copyFail.classList.remove('show');
    el.classList.add('show');
    window.setTimeout(function () { el.classList.remove('show'); }, 4000);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = handoffText.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { flash(copyOk); },
          function () { legacyCopy(text); }
        );
      } else {
        legacyCopy(text);
      }
    });
  }

  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    flash(ok ? copyOk : copyFail);
  }

  function renderQr(href) {
    var box = document.getElementById('handoff-qr');
    if (!box || typeof window.qrcode !== 'function') { return; }
    try {
      var qr = window.qrcode(0, 'M');
      qr.addData(href);
      qr.make();
      box.innerHTML = qr.createSvgTag({ cellSize: 3, margin: 2, scalable: true });
      var svg = box.querySelector('svg');
      if (svg) { svg.setAttribute('aria-hidden', 'true'); svg.removeAttribute('width'); svg.removeAttribute('height'); }
    } catch (e) {
      box.hidden = true;
    }
  }

  /* ====================================================================
     Lightbox for work photos
     ==================================================================== */
  // Order matches the data-lightbox indices on the service images.
  var WORK = [
    {
      src: 'assets/work-climber-roof-600.jpg', w: 600, h: 800,
      alt: 'Climber roped into a bare tree directly above a house with a solar-panel roof, taking down limbs section by section',
      cap: 'Tree removal: roped in over a house and a solar roof, dropping limbs clear of both.'
    },
    {
      src: 'assets/work-lift-oak-600.jpg', w: 600, h: 800,
      alt: 'Worker in a red bucket lift reaching into a large tree being reduced, working above a wooden privacy fence under a clear blue sky',
      cap: 'Trimming: taking a big tree down in pieces from the lift, over a fence line.'
    },
    {
      src: 'assets/work-stump-600.jpg', w: 600, h: 800,
      alt: 'Red tracked stump grinder positioned next to a ground-down stump in an open pasture with a white fence line behind',
      cap: 'Stump grinding: taken down below grade so the ground is usable again.'
    },
    {
      src: 'assets/work-cleanup-1067.jpg', w: 1067, h: 800,
      alt: 'Two crew members feeding cut branches into a chipper beside a loaded dump truck on a residential street in front of a brick home',
      cap: 'Storm cleanup: hauling downed limbs off site through the chipper.'
    },
    {
      src: 'assets/work-chipper-1067.jpg', w: 1067, h: 800,
      alt: 'Worker dragging cut brush toward a yellow wood chipper and dump trailer on a cleared, leaf-covered lot among bare oaks',
      cap: 'Debris removal: brush and limbs run straight through the chipper and hauled off.'
    }
  ];
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var lbCap = document.getElementById('lightbox-cap');
  var lbOpener = null;

  document.querySelectorAll('[data-lightbox]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = WORK[parseInt(btn.getAttribute('data-lightbox'), 10)];
      if (!item) { return; }
      lbOpener = btn;
      lbImg.src = item.src;
      lbImg.width = item.w;
      lbImg.height = item.h;
      lbImg.alt = item.alt;
      lbCap.textContent = item.cap;
      if (typeof lightbox.showModal === 'function') { lightbox.showModal(); }
      else { lightbox.setAttribute('open', ''); }
    });
  });
  lightbox.querySelector('[data-lightbox-close]').addEventListener('click', function () {
    if (typeof lightbox.close === 'function' && lightbox.open) { lightbox.close(); }
    else { lightbox.removeAttribute('open'); }
  });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) { lightbox.close(); }
  });
  lightbox.addEventListener('close', function () {
    lbImg.src = '';
    if (lbOpener) { lbOpener.focus(); }
  });

  /* Keep the direct HTML video fast, while respecting reduced motion/data saver. */
  (function heroVideo() {
    var media = document.getElementById('hero-media');
    var video = media && media.querySelector('video');
    if (!media || !video) { return; }
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var conn = navigator.connection || {};
    if (reduced || conn.saveData || /(^|-)2g/.test(conn.effectiveType || '')) {
      video.remove();
      return;
    }
    video.addEventListener('playing', function () { media.classList.add('is-video-playing'); }, { once: true });
    video.play().catch(function () { video.remove(); });
  })();
})();
