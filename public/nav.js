/* IMAX through the years — navigation + accessibility layer.
   Side-rail, hero index, mobile jumper, progress bar, back-to-top, plus
   ARIA wiring for the scroll-spy and the chart view-toggles.
   Independent of Chart.js by design: wayfinding works even if charts fail. */
(function(){
  if (window.__imaxNavInit) return;
  window.__imaxNavInit = true;
  "use strict";

  function prefersReduced(){
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  var baseTitle = document.title;

  // Collect the 15 study sections in document order, read straight from the
  // markup so navigation never drifts out of sync with the content.
  var sections = Array.prototype.map.call(
    document.querySelectorAll('section[id]'),
    function(sec){
      var num = sec.querySelector('.sec-num');
      var h   = sec.querySelector('.sec-head h2');
      return {
        el: sec,
        id: sec.id,
        num: num ? num.textContent.trim() : '',
        name: h ? h.textContent.trim() : sec.id,
        act: sec.getAttribute('data-act') || ''
      };
    }
  );

  // Act metadata (roman → title), read from the act-divider blocks so the nav
  // labels stay in sync with the document.
  var actTitles = {};
  Array.prototype.forEach.call(document.querySelectorAll('.act-divider'), function(d){
    var r = d.getAttribute('data-act');
    var t = d.querySelector('.act-title');
    if (r) actTitles[r] = t ? t.textContent.trim() : r;
  });

  var rail      = document.getElementById('rail');
  var indexGrid = document.getElementById('indexGrid');
  var jumpSel   = document.getElementById('jumpSelect');
  var progress  = document.getElementById('scrollProgress');
  var toTop     = document.getElementById('toTop');

  // ---- a11y: a visually-hidden live region announces the current section ----
  var live = document.createElement('div');
  live.setAttribute('aria-live', 'polite');
  live.setAttribute('aria-atomic', 'true');
  live.className = 'sr-only';
  live.id = 'nav-live';
  document.body.appendChild(live);

  // ---- theme toggle (dark default, remembers the user's choice) ----
  var THEME_KEY = 'imax-theme';
  function currentTheme(){
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }
  function sunIcon(){ return '\u263C'; }   // ☼  (shown in dark mode: tap for light)
  function moonIcon(){ return '\u263E'; }  // ☾  (shown in light mode: tap for dark)

  var themeBtn = document.createElement('button');
  themeBtn.id = 'themeToggle';
  themeBtn.className = 'theme-toggle';
  themeBtn.type = 'button';
  function syncThemeBtn(){
    var t = currentTheme();
    themeBtn.textContent = t === 'light' ? moonIcon() : sunIcon();
    themeBtn.setAttribute('aria-label', t === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    themeBtn.setAttribute('title', t === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    themeBtn.setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
  }
  syncThemeBtn();
  document.body.appendChild(themeBtn);

  themeBtn.addEventListener('click', function(){
    var next = currentTheme() === 'light' ? 'dark' : 'light';
    if (next === 'light') { document.documentElement.setAttribute('data-theme', 'light'); }
    else { document.documentElement.removeAttribute('data-theme'); }
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    syncThemeBtn();
    live.textContent = next === 'light' ? 'Light theme on' : 'Dark theme on';
    // rebuild the charts with the new theme's colours
    if (typeof window.__imaxRefreshCharts === 'function') { window.__imaxRefreshCharts(); }
  });

  // ---- progress bar as an ARIA progressbar ----
  if (progress) {
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-label', 'Reading progress');
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');
    progress.setAttribute('aria-valuenow', '0');
  }

  // ---- rail as a semantic list of section links ----
  if (rail) { rail.setAttribute('role', 'list'); }

  var railLinks = [];
  var lastAct = null;
  var jumpGroup = null;
  sections.forEach(function(s, i){
    var newAct = s.act && s.act !== lastAct;

    // side-rail: a small act marker before the first section of each act
    if (rail && newAct){
      var sep = document.createElement('span');
      sep.className = 'rail-act';
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = s.act;
      rail.appendChild(sep);
    }

    // side-rail dot + label
    var a = document.createElement('a');
    a.href = '#' + s.id;
    a.setAttribute('role', 'listitem');
    a.setAttribute('aria-label', 'Section ' + s.num + ', ' + s.name + (s.act ? ', act ' + s.act : ''));
    // roving tabindex: only the active/first item is tabbable, arrows move within
    a.tabIndex = i === 0 ? 0 : -1;
    a.dataset.idx = String(i);
    a.innerHTML = '<span class="dot" aria-hidden="true"></span>' +
      '<span class="rlabel"><span class="rn">' + s.num + '</span>' + s.name + '</span>';
    if (rail) rail.appendChild(a);
    railLinks.push(a);

    // hero index: an act header row before the first section of each act
    if (indexGrid && newAct){
      var head = document.createElement('div');
      head.className = 'index-act';
      head.innerHTML = '<span class="ia-roman">' + s.act + '</span>' +
        '<span class="ia-title">' + (actTitles[s.act] || '') + '</span>';
      indexGrid.appendChild(head);
    }
    // hero index card
    if (indexGrid) {
      var c = document.createElement('a');
      c.href = '#' + s.id;
      c.setAttribute('aria-label', 'Section ' + s.num + ', ' + s.name);
      c.innerHTML = '<span class="in-num">' + s.num + '</span>' +
        '<span class="in-name">' + s.name + '</span>';
      indexGrid.appendChild(c);
    }

    // mobile <select>: group sections under <optgroup> per act
    if (jumpSel) {
      if (newAct){
        jumpGroup = document.createElement('optgroup');
        jumpGroup.label = s.act + ' \u00b7 ' + (actTitles[s.act] || '');
        jumpSel.appendChild(jumpGroup);
      }
      var opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.num + ' \u00b7 ' + s.name;
      (jumpGroup || jumpSel).appendChild(opt);
    }

    if (s.act) lastAct = s.act;
  });

  // placeholder-first option so the mobile select reads as a prompt
  if (jumpSel) {
    var lead = document.createElement('option');
    lead.value = '';
    lead.textContent = 'Jump to section\u2026';
    jumpSel.insertBefore(lead, jumpSel.firstChild);
    jumpSel.value = '';

    jumpSel.addEventListener('change', function(){
      var t = document.getElementById(jumpSel.value);
      if (t) { focusSection(t); }
      jumpSel.value = '';
    });
  }

  // ---- keyboard: arrow keys move between rail dots (roving tabindex) ----
  function focusRail(idx){
    if (idx < 0) idx = 0;
    if (idx >= railLinks.length) idx = railLinks.length - 1;
    railLinks.forEach(function(a, i){ a.tabIndex = i === idx ? 0 : -1; });
    railLinks[idx].focus();
  }
  if (rail) {
    rail.addEventListener('keydown', function(e){
      var target = e.target.closest ? e.target.closest('a') : null;
      if (!target) return;
      var idx = parseInt(target.dataset.idx, 10);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault(); focusRail(idx + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault(); focusRail(idx - 1);
      } else if (e.key === 'Home') {
        e.preventDefault(); focusRail(0);
      } else if (e.key === 'End') {
        e.preventDefault(); focusRail(railLinks.length - 1);
      }
    });
  }

  // ---- smooth-scroll to a section and move focus there for keyboard users ----
  function focusSection(el){
    el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' });
    // make the section heading programmatically focusable, then focus it so
    // screen-reader / keyboard users land at the new content, not page top
    var h = el.querySelector('.sec-head h2') || el;
    var prev = h.getAttribute('tabindex');
    h.setAttribute('tabindex', '-1');
    // focus after the scroll settles a touch
    setTimeout(function(){
      h.focus({ preventScroll: true });
      if (prev === null) {
        h.addEventListener('blur', function once(){ h.removeAttribute('tabindex'); h.removeEventListener('blur', once); });
      }
    }, prefersReduced() ? 0 : 320);
  }

  // Intercept clicks on rail + index links so we also manage focus.
  function wireInternalLinks(container){
    if (!container) return;
    container.addEventListener('click', function(e){
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      var t = document.getElementById(id);
      if (t) { e.preventDefault(); history.replaceState(null, '', '#' + id); focusSection(t); }
    });
  }
  wireInternalLinks(rail);
  wireInternalLinks(indexGrid);

  // ---- scroll-spy: mark the section nearest the top as active ----
  var current = null;
  function setActive(id){
    if (id === current) return;
    current = id;
    var activeSection = null;
    railLinks.forEach(function(a){
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', on);
      if (on) { a.setAttribute('aria-current', 'true'); }
      else { a.removeAttribute('aria-current'); }
    });
    sections.forEach(function(s){ if (s.id === id) activeSection = s; });
    if (activeSection) {
      live.textContent = 'Now viewing: Section ' + activeSection.num + ', ' + activeSection.name;
      document.title = activeSection.num + ' ' + activeSection.name + ' \u00b7 ' + baseTitle;
    }
  }

  function computeActive(threshold){
    var best = null, bestTop = -Infinity;
    sections.forEach(function(s){
      var r = s.el.getBoundingClientRect();
      // the last section whose top has crossed the threshold line is "current"
      if (r.top <= threshold && r.top > bestTop) { bestTop = r.top; best = s.id; }
    });
    return best;
  }

  // The final section (e.g. Act V) plus the footer can be shorter than one
  // viewport, so on tall/wide screens the page bottoms out before that section's
  // top ever reaches the 140px activation line — computeActive() then never
  // selects it and the previous section's rail dot stays lit. Detect the bottom
  // of the document (with a cushion for sub-pixel rounding and momentum that
  // stops a hair short) and force the last on-screen section active there.
  function atPageBottom(){
    var doc = document.documentElement;
    var scrolled = doc.scrollTop || document.body.scrollTop || 0;
    var max = (doc.scrollHeight || 0) - (doc.clientHeight || 0);
    if (max <= 0) return false;
    var cushion = Math.max(4, Math.round(doc.clientHeight * 0.02));
    return (max - scrolled) <= cushion;
  }

  function pickActive(){
    if (atPageBottom() && sections.length) {
      var vh = document.documentElement.clientHeight;
      // last section that has actually entered the viewport wins at the bottom
      for (var i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.getBoundingClientRect().top < vh) { return sections[i].id; }
      }
      return sections[sections.length - 1].id;
    }
    return computeActive(140);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(){
      var best = pickActive();
      if (best) setActive(best);
    }, { rootMargin: '-100px 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] });
    sections.forEach(function(s){ io.observe(s.el); });
  }

  // ---- progress bar + rail/back-to-top visibility on scroll ----
  var ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      var doc = document.documentElement;
      var scrolled = doc.scrollTop || document.body.scrollTop;
      var height = doc.scrollHeight - doc.clientHeight;
      var pct = height > 0 ? Math.min(100, Math.max(0, (scrolled / height) * 100)) : 0;
      if (progress) {
        progress.style.width = pct + '%';
        progress.setAttribute('aria-valuenow', String(Math.round(pct)));
      }

      var past = scrolled > 320;
      if (rail) rail.classList.toggle('show', past);
      if (toTop) toTop.classList.toggle('show', past);

      // Re-evaluate on every scroll too: once the last section is fully in
      // view the IntersectionObserver stops firing, so the bottom-of-page case
      // must be handled here as well (setActive() no-ops if nothing changed).
      var best = pickActive();
      if (best) setActive(best);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // ---- back to top: return focus to the top of the document ----
  if (toTop) {
    toTop.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: prefersReduced() ? 'auto' : 'smooth' });
      var h1 = document.querySelector('h1');
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        setTimeout(function(){ h1.focus({ preventScroll: true }); }, prefersReduced() ? 0 : 300);
      }
      document.title = baseTitle;
      current = null;
    });
  }

  // ---- a11y for the chart view-toggles (.seg groups of buttons) ----
  // The original toggles are <button aria-pressed>; make each group a keyboard-
  // operable toolbar and announce the active view to screen readers.
  Array.prototype.forEach.call(document.querySelectorAll('.seg'), function(seg){
    var btns = Array.prototype.slice.call(seg.querySelectorAll('button'));
    if (!btns.length) return;
    seg.setAttribute('role', 'group');
    btns.forEach(function(btn, i){
      btn.addEventListener('keydown', function(e){
        var idx = i;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); btns[(idx + 1) % btns.length].focus(); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); btns[(idx - 1 + btns.length) % btns.length].focus(); }
      });
      btn.addEventListener('click', function(){
        // announce the selected view (label text) shortly after the chart updates
        setTimeout(function(){
          var label = btn.textContent.trim();
          live.textContent = 'View: ' + label;
        }, 30);
      });
    });
  });
})();
