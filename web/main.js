'use strict';

/* ---- Project data: edit this list to add/remove works ---- */
const PROJECTS = Object.freeze([
  { title: 'La Radio Barbara', cat: 'design', year: '2023', desc: 'Poster series and identity for a weekly music set. Outline type over x-ray imagery.', glyph: 'orbit', href: '#' },
  { title: 'Pen Plotter Robot', cat: 'robotics', year: '2026', desc: 'ABB arm drawing slots, ovals and rounded frames on box faces from parametric RAPID routines.', glyph: 'arm', href: '#' },
  { title: 'Picky', cat: 'code', year: '2026', desc: 'Desktop colour-picker utility. Small tool, sharp edges.', glyph: 'pixel', href: '#' },
  { title: 'Design Scheme', cat: 'design', year: '2026', desc: 'This system: pixel marks, outline geometry, medieval subjects read by machine eyes.', glyph: 'shield', href: '#' },
  { title: 'PLC Remote Run', cat: 'code', year: '2025', desc: 'Fleet tool to run and track PLC jobs across a site.', glyph: 'grid', href: '#' },
  { title: 'Iron Study', cat: 'design', year: '2026', desc: 'Placeholder - armoured figure. Replace with a real piece.', glyph: 'reticle', href: '#' },
]);
const CAT_LABEL = Object.freeze({ design: 'design', robotics: 'robotica', code: 'codice' });

/* ---- Outline glyphs for project cards (stroke-only, 96x96) ---- */
const GLYPHS = Object.freeze({
  orbit: '<ellipse cx="48" cy="48" rx="44" ry="18"/><circle cx="48" cy="48" r="10"/>',
  arm: '<path d="M8 88h40M28 88V60l24-24 24 8M52 36l-8-20"/><rect x="72" y="40" width="12" height="12"/>',
  pixel: '<rect x="8" y="8" width="24" height="24"/><rect x="40" y="8" width="24" height="24"/><rect x="8" y="40" width="24" height="24"/><rect x="64" y="64" width="24" height="24"/>',
  shield: '<path d="M16 12h64v36L48 88 16 48z"/><path d="M48 12v76M16 40h64"/>',
  grid: '<path d="M8 8h80v80H8zM8 34h80M8 62h80M34 8v80M62 8v80"/>',
  reticle: '<circle cx="48" cy="48" r="36"/><path d="M48 4v24M48 68v24M4 48h24M68 48h24"/>',
});

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const catLabel = c => CAT_LABEL[c] || c;

/* ---- BARBARA BARBARA mark: Guisol, 3 outline copies per letter (see style.css) ---- */
const LOGO_LINES = Object.freeze(['BARBARA', 'BARBARA']);
function drawMark() {
  const letter = ch => `<span class="bb-ch"><i>${ch}</i><i>${ch}</i><i>${ch}</i></span>`;
  const html = LOGO_LINES.map(w => `<span class="bb-row">${[...w].map(letter).join('')}</span>`).join('');
  document.querySelectorAll('.bb-logo').forEach(el => { el.innerHTML = html; });
}

/* ---- Today's date + clock, flyer style: 26 • 09 • 26 — 21:34 ---- */
function showToday(el) {
  const p = n => String(n).padStart(2, '0');
  const tick = () => {
    const d = new Date();
    el.textContent = `${p(d.getDate())} \u2022 ${p(d.getMonth() + 1)} \u2022 ${p(d.getFullYear() % 100)}`
      + `  \u2014  ${p(d.getHours())}:${p(d.getMinutes())}`;
  };
  tick();
  // re-sync on each minute boundary so the clock never drifts
  setTimeout(() => { tick(); setInterval(tick, 60000); }, (60 - new Date().getSeconds()) * 1000);
}

/* ---- Site updates feed ----
   Reads feed.xml (RSS 2.0). Browsers block fetch() on file:// pages, so when the
   page is opened by double-click the fallback list is shown instead. */
const FEED_FALLBACK = Object.freeze([
  { title: 'Homepage online', date: '2026-09-26', link: '#' },
  { title: 'Design scheme v2', date: '2026-09-26', link: '#work' },
  { title: 'Pen plotter slots', date: '2026-09-25', link: '#work' },
]);
const FEED_MAX = 4;

function parseFeed(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('feed.xml is not valid XML');
  return [...doc.querySelectorAll('item')].map(it => ({
    title: it.querySelector('title')?.textContent.trim() || 'Untitled',
    link: it.querySelector('link')?.textContent.trim() || '#',
    date: it.querySelector('pubDate')?.textContent.trim() || '',
  }));
}

function fmtDate(d) {
  const t = Date.parse(d);
  if (Number.isNaN(t)) return d;
  const x = new Date(t), p = n => String(n).padStart(2, '0');
  return `${p(x.getDate())} \u2022 ${p(x.getMonth() + 1)} \u2022 ${p(x.getFullYear() % 100)}`;
}

function safeHref(h) {
  return /^(https?:|#|\.?\/|[\w-]+\.html)/i.test(h) ? h : '#';
}

function renderFeed(el, items) {
  if (!items.length) { el.innerHTML = '<li class="muted">nessuna novit\u00e0</li>'; return; }
  el.innerHTML = items.slice(0, FEED_MAX).map(it => `
    <li><a class="feed-item" href="${escapeHtml(safeHref(it.link))}">
      <span class="d">${escapeHtml(fmtDate(it.date))}</span><span class="t">${escapeHtml(it.title)}</span>
    </a></li>`).join('');
}

async function loadFeed(el) {
  try {
    const res = await fetch('feed.xml', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    renderFeed(el, parseFeed(await res.text()));
  } catch (err) {
    console.warn('Feed unavailable, showing fallback:', err.message);
    renderFeed(el, FEED_FALLBACK);
  }
}

/* ---- Latest-works slider: newest first ---- */
const LATEST_MAX = 8;

function renderLatest(track) {
  const latest = [...PROJECTS].sort((a, b) => Number(b.year) - Number(a.year)).slice(0, LATEST_MAX);
  track.innerHTML = latest.map(p => `
    <li class="slide">
      <div class="meta"><span>${escapeHtml(catLabel(p.cat))}</span><span>${escapeHtml(p.year)}</span></div>
      <h3><a href="${escapeHtml(p.href)}">${escapeHtml(p.title)}</a></h3>
    </li>`).join('');
}

function wireSlider(track, prev, next) {
  const step = () => (track.querySelector('.slide')?.offsetWidth || 240) + 16;
  const sync = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -step() }));
  next.addEventListener('click', () => track.scrollBy({ left: step() }));
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: step() }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -step() }); }
  });
  track.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);

  // mouse drag (touch already scrolls natively); a real drag cancels the click
  let startX = 0, startLeft = 0, moved = false, down = false;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
  });
  window.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 5) { moved = true; track.classList.add('dragging'); }
    if (moved) track.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => { down = false; track.classList.remove('dragging'); });
  track.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } }, true);
  track.addEventListener('dragstart', e => e.preventDefault());
  sync();
}

/* ---- Works grid ---- */
function renderCards(list) {
  document.getElementById('cards').innerHTML = list.map(p => `
    <li class="card" data-cat="${escapeHtml(p.cat)}">
      <div class="meta"><span>${escapeHtml(catLabel(p.cat))}</span><span>${escapeHtml(p.year)}</span></div>
      <svg class="glyph" viewBox="0 0 96 96" aria-hidden="true">${GLYPHS[p.glyph] || GLYPHS.reticle}</svg>
      <div>
        <h3><a href="${escapeHtml(p.href)}">${escapeHtml(p.title)}</a></h3>
        <p>${escapeHtml(p.desc)}</p>
      </div>
    </li>`).join('');
}

function wireFilters() {
  const buttons = document.querySelectorAll('.filters button');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    buttons.forEach(b => { const on = b === btn; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
    document.querySelectorAll('.card').forEach(c => { c.hidden = f !== 'all' && c.dataset.cat !== f; });
  }));
}

drawMark();
showToday(document.getElementById('today'));
loadFeed(document.getElementById('feed-list'));
renderLatest(document.getElementById('latest'));
wireSlider(document.getElementById('latest'), document.getElementById('latest-prev'), document.getElementById('latest-next'));
renderCards(PROJECTS);
wireFilters();
