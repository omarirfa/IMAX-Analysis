/* IMAX through the years — accessibility settings + cinematic reveals.
   Builds the gear panel (font size, dyslexia-friendly font, high-contrast),
   persists choices, and runs the staggered scroll reveals + hero word reveal.
   All motion respects prefers-reduced-motion AND the user's motion setting. */
(function(){
  if (window.__imaxSettingsInit) return;
  window.__imaxSettingsInit = true;
  "use strict";

  var K = {
    scale: 'imax-font-scale',
    font:  'imax-font',
    contrast: 'imax-contrast',
    motion: 'imax-motion'
  };
  var root = document.documentElement;
  function get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function set(k,v){ try { localStorage.setItem(k,v); } catch(e){} }

  var osReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- apply persisted settings (also done pre-paint in <head>) ----------
  var SCALES = { s:'0.9', m:'1', l:'1.15', xl:'1.3' };
  function applyScale(key){
    root.style.setProperty('--font-scale', SCALES[key] || '1');
  }
  function applyFont(v){
    if (v === 'dyslexic') root.setAttribute('data-a11y-font','dyslexic');
    else root.removeAttribute('data-a11y-font');
  }
  function applyContrast(v){
    if (v === 'high') root.setAttribute('data-a11y-contrast','high');
    else root.removeAttribute('data-a11y-contrast');
  }
  // motion: default ON unless the OS asks for reduced or the user turned it off
  function motionEnabled(){
    var stored = get(K.motion);
    if (stored === 'off') return false;
    if (stored === 'on') return true;
    return !osReduced;            // no explicit choice → follow the OS
  }
  function applyMotion(){
    if (motionEnabled()) root.setAttribute('data-motion','on');
    else root.removeAttribute('data-motion');
  }

  var curScale = get(K.scale) || 'm';
  applyScale(curScale);
  applyFont(get(K.font) || 'default');
  applyContrast(get(K.contrast) || 'normal');
  applyMotion();

  // ---------- build the gear button + panel ----------
  var gear = document.createElement('button');
  gear.className = 'a11y-gear';
  gear.type = 'button';
  gear.id = 'a11yGear';
  gear.setAttribute('aria-label','Text & display settings');
  gear.setAttribute('aria-expanded','false');
  gear.setAttribute('aria-controls','a11yPanel');
  gear.setAttribute('title','Text & display settings');
  gear.innerHTML = '\u2699';   // ⚙
  document.body.appendChild(gear);

  var panel = document.createElement('div');
  panel.className = 'a11y-panel';
  panel.id = 'a11yPanel';
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-label','Text and display settings');
  panel.innerHTML =
    '<h3>Text &amp; display</h3>' +
    '<div class="a11y-row">' +
      '<span class="a11y-lab" id="a11y-size-lab">Text size</span>' +
      '<div class="a11y-seg" role="group" aria-labelledby="a11y-size-lab" id="a11ySize">' +
        '<button type="button" data-s="s" aria-pressed="false">A</button>' +
        '<button type="button" data-s="m" aria-pressed="false"><span class="big">A</span></button>' +
        '<button type="button" data-s="l" aria-pressed="false"><span class="big">A</span></button>' +
        '<button type="button" data-s="xl" aria-pressed="false"><span class="huge">A</span></button>' +
      '</div>' +
    '</div>' +
    '<div class="a11y-row">' +
      '<button type="button" class="a11y-switch" id="a11yFont" aria-pressed="false">' +
        '<span>Dyslexia-friendly font</span><span class="track" aria-hidden="true"></span>' +
      '</button>' +
    '</div>' +
    '<div class="a11y-row">' +
      '<button type="button" class="a11y-switch" id="a11yContrast" aria-pressed="false">' +
        '<span>High contrast &amp; bold</span><span class="track" aria-hidden="true"></span>' +
      '</button>' +
    '</div>' +
    '<div class="a11y-row">' +
      '<button type="button" class="a11y-switch" id="a11yMotion" aria-pressed="false">' +
        '<span>Motion &amp; reveals</span><span class="track" aria-hidden="true"></span>' +
      '</button>' +
    '</div>' +
    '<button type="button" class="a11y-reset" id="a11yReset">Reset to defaults</button>';
  document.body.appendChild(panel);

  // live region for announcements
  var say = document.getElementById('nav-live');
  function announce(msg){ if (say) say.textContent = msg; }

  // ---------- panel open/close ----------
  function openPanel(){ panel.classList.add('open'); gear.setAttribute('aria-expanded','true');
    var first = panel.querySelector('button'); if(first) first.focus(); }
  function closePanel(focusGear){ panel.classList.remove('open'); gear.setAttribute('aria-expanded','false');
    if (focusGear) gear.focus(); }
  gear.addEventListener('click', function(){
    if (panel.classList.contains('open')) closePanel(); else openPanel();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && panel.classList.contains('open')) closePanel(true);
  });
  document.addEventListener('click', function(e){
    if (!panel.classList.contains('open')) return;
    if (!panel.contains(e.target) && e.target !== gear) closePanel();
  });

  // ---------- font size segmented control ----------
  var sizeBtns = Array.prototype.slice.call(panel.querySelectorAll('#a11ySize button'));
  function syncSize(){
    sizeBtns.forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.s === curScale ? 'true':'false'); });
  }
  sizeBtns.forEach(function(b, i){
    b.addEventListener('click', function(){
      curScale = b.dataset.s; applyScale(curScale); set(K.scale, curScale); syncSize();
      announce('Text size ' + ({s:'small',m:'default',l:'large',xl:'extra large'}[curScale]));
      // charts live inside the zoomed content; nudge a resize so they stay crisp
      window.dispatchEvent(new Event('resize'));
    });
    b.addEventListener('keydown', function(e){
      if(e.key==='ArrowRight'){e.preventDefault(); sizeBtns[(i+1)%sizeBtns.length].focus();}
      else if(e.key==='ArrowLeft'){e.preventDefault(); sizeBtns[(i-1+sizeBtns.length)%sizeBtns.length].focus();}
    });
  });
  syncSize();

  // ---------- switch helper ----------
  function wireSwitch(btn, isOnFn, onToggle){
    function sync(){ btn.setAttribute('aria-pressed', isOnFn() ? 'true':'false'); }
    btn.addEventListener('click', function(){ onToggle(); sync(); });
    sync();
    return sync;
  }
  wireSwitch(document.getElementById('a11yFont'),
    function(){ return root.getAttribute('data-a11y-font') === 'dyslexic'; },
    function(){
      var on = root.getAttribute('data-a11y-font') === 'dyslexic';
      applyFont(on ? 'default':'dyslexic'); set(K.font, on ? 'default':'dyslexic');
      announce(on ? 'Standard font' : 'Dyslexia-friendly font on');
    });
  wireSwitch(document.getElementById('a11yContrast'),
    function(){ return root.getAttribute('data-a11y-contrast') === 'high'; },
    function(){
      var on = root.getAttribute('data-a11y-contrast') === 'high';
      applyContrast(on ? 'normal':'high'); set(K.contrast, on ? 'normal':'high');
      announce(on ? 'Standard contrast' : 'High contrast on');
    });
  var syncMotion = wireSwitch(document.getElementById('a11yMotion'),
    function(){ return motionEnabled(); },
    function(){
      var on = motionEnabled();
      set(K.motion, on ? 'off':'on'); applyMotion();
      announce(on ? 'Motion off' : 'Motion on');
      if (!on) runReveals(true);   // turning motion on: reveal what's already onscreen
      if (typeof window.__imaxRefreshMotion === 'function') window.__imaxRefreshMotion();
    });

  // ---------- reset ----------
  document.getElementById('a11yReset').addEventListener('click', function(){
    curScale='m'; applyScale('m'); set(K.scale,'m'); syncSize();
    applyFont('default'); set(K.font,'default');
    applyContrast('normal'); set(K.contrast,'normal');
    set(K.motion,''); applyMotion();
    panel.querySelectorAll('.a11y-switch').forEach(function(s){
      var id=s.id;
      if(id==='a11yFont') s.setAttribute('aria-pressed','false');
      if(id==='a11yContrast') s.setAttribute('aria-pressed','false');
      if(id==='a11yMotion') s.setAttribute('aria-pressed', motionEnabled()?'true':'false');
    });
    announce('Settings reset to defaults');
    window.dispatchEvent(new Event('resize'));
  });

  // =====================================================================
  // Cinematic reveals
  // =====================================================================

  // Tag sections + hero blocks as reveal targets with a stagger index.
  function tagReveals(){
    var targets = [];
    var hero = document.querySelector('.hero');
    var dsIntro = document.querySelector('.dataset-intro');
    var metrics = document.querySelector('.metrics');
    var index = document.getElementById('sectionIndex');
    var primer = document.querySelector('.primer');
    [dsIntro, metrics, index, primer].forEach(function(el){ if(el) targets.push(el); });
    Array.prototype.forEach.call(document.querySelectorAll('section[id]'), function(sec){
      targets.push(sec);
    });
    targets.forEach(function(el, i){
      el.classList.add('reveal');
      el.style.setProperty('--rev-i', String(i % 4));  // cap stagger so late items aren't slow
    });
    return targets;
  }

  // Wrap the hero headline words so they can rise one at a time.
  function wrapHeroWords(){
    var h1 = document.querySelector('.hero h1');
    if (!h1 || h1.dataset.wrapped) return;
    h1.dataset.wrapped = '1';
    var wi = 0;
    Array.prototype.forEach.call(h1.childNodes, function(node){
      if (node.nodeType === 3 && node.textContent.trim()){       // text node
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function(tok){
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
          if (!tok) return;
          var sp = document.createElement('span');
          sp.className = 'word'; sp.style.setProperty('--w', String(wi++));
          sp.textContent = tok;
          frag.appendChild(sp);
        });
        h1.replaceChild(frag, node);
      } else if (node.nodeType === 1 && node.classList && node.classList.contains('thin')){
        // wrap the "measured." span's words too, keeping the .thin styling
        var words = node.textContent.split(/(\s+)/);
        node.textContent = '';
        words.forEach(function(tok){
          if (/^\s+$/.test(tok)){ node.appendChild(document.createTextNode(tok)); return; }
          if (!tok) return;
          var sp = document.createElement('span');
          sp.className = 'word'; sp.style.setProperty('--w', String(wi++));
          sp.textContent = tok;
          node.appendChild(sp);
        });
      }
    });
  }

  var revealTargets = tagReveals();
  var io = null;
  function runReveals(showAllVisible){
    if (root.getAttribute('data-motion') !== 'on'){
      // motion off: everything already sits in final state (CSS handles it)
      revealTargets.forEach(function(el){ el.classList.add('is-in'); });
      return;
    }
    wrapHeroWords();
    if ('IntersectionObserver' in window){
      if (io) io.disconnect();
      io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
      revealTargets.forEach(function(el){
        // if already in view on load, reveal immediately (no wait for scroll)
        var r = el.getBoundingClientRect();
        if (showAllVisible && r.top < window.innerHeight && r.bottom > 0){ el.classList.add('is-in'); }
        else io.observe(el);
      });
    } else {
      revealTargets.forEach(function(el){ el.classList.add('is-in'); });
    }
  }
  // initial run after layout settles
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ runReveals(true); }); });

  // ---------------------------------------------------------------
  // Acronym auto-glossing: wrap known acronyms in <abbr title="…"> so
  // hovering (or focusing) any of them anywhere on the page shows the
  // full term — readers never have to hunt for the glossary. Done once,
  // only on the first occurrence per element, skipping headings and any
  // text already inside an <abbr>, a link, or the glossary itself.
  // ---------------------------------------------------------------
  var ACRONYMS = {
    'DMR': 'Digital Media Remastering — IMAX\u2019s process for converting a non-IMAX film to giant-screen format',
    'PLF': 'Premium Large Format — branded big-screen auditoriums with a ticket surcharge',
    'GT Laser': 'Grand Theatre dual-laser projector — IMAX\u2019s top-tier system, the only digital setup showing the full 1.43:1 frame',
    'SEC': 'U.S. Securities and Exchange Commission — the financial regulator whose filings are the source for screen counts and financials',
    'EDGAR': 'The SEC\u2019s public database of company filings',
    'GBO': 'Gross box office — total ticket revenue before costs',
    'ROI': 'Return on investment — here, worldwide gross divided by production budget',
    'TMDB': 'The Movie Database — public source for budgets and original-language data',
    '4DX': 'A premium format with moving seats, wind, water and scent (CJ 4DPLEX)',
    'ScreenX': 'A premium format projecting onto side walls for a 270\u00b0 panoramic image'
  };
  function glossAcronyms(){
    var glossaryEl = document.querySelector('details.gloss');
    // longest keys first so "GT Laser" is matched before "GT"
    var keys = Object.keys(ACRONYMS).sort(function(a,b){ return b.length - a.length; });
    var seen = {};   // gloss each acronym once (first visible occurrence)
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node){
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        // skip headings, existing abbr/links, code, the glossary, and controls
        if (p.closest('h1,h2,h3,abbr,a,button,code,.a11y-panel,.rail,.mobile-jump,.sec-num') )
          return NodeFilter.FILTER_REJECT;
        if (glossaryEl && glossaryEl.contains(p)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var textNodes = [];
    var n;
    while ((n = walker.nextNode())) textNodes.push(n);

    textNodes.forEach(function(node){
      var text = node.nodeValue;
      for (var i = 0; i < keys.length; i++){
        var key = keys[i];
        if (seen[key]) continue;
        // whole-word match (acronyms are case-sensitive; keep it strict)
        var re = new RegExp('(^|[^\\w])(' + key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')(?![\\w])');
        var m = re.exec(text);
        if (m){
          var before = text.slice(0, m.index + m[1].length);
          var after = text.slice(m.index + m[1].length + key.length);
          var abbr = document.createElement('abbr');
          abbr.title = ACRONYMS[key];
          abbr.textContent = key;
          var frag = document.createDocumentFragment();
          if (before) frag.appendChild(document.createTextNode(before));
          frag.appendChild(abbr);
          if (after) frag.appendChild(document.createTextNode(after));
          node.parentNode.replaceChild(frag, node);
          seen[key] = true;
          return;   // node consumed; move on
        }
      }
    });
  }
  requestAnimationFrame(glossAcronyms);
})();
