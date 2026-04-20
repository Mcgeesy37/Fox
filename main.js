/* ============================================
ANDREAS FUCHS — PORTFOLIO  |  main.js
============================================ */

document.addEventListener(‘DOMContentLoaded’, function () {

/* ── CURSOR ── */
var cursorEl = document.getElementById(‘cursor’);
if (cursorEl) {
var dot  = cursorEl.querySelector(’.cursor-dot’);
var ring = cursorEl.querySelector(’.cursor-ring’);
var mx = window.innerWidth / 2, my = window.innerHeight / 2;
var rx = mx, ry = my;

```
document.addEventListener('mousemove', function (e) {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
});

(function loop() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, .card').forEach(function (el) {
  el.addEventListener('mouseenter', function () { ring.classList.add('big'); });
  el.addEventListener('mouseleave', function () { ring.classList.remove('big'); });
});
```

}

/* ── SCROLL REVEAL (fade-in elements) ──
Cards are VISIBLE by default in HTML/CSS.
JS fade-in is only applied to section wrappers. */
var faders = document.querySelectorAll(’.fade-in’);

if (‘IntersectionObserver’ in window) {
var io = new IntersectionObserver(function (entries) {
entries.forEach(function (e) {
if (e.isIntersecting) {
e.target.classList.add(‘visible’);
io.unobserve(e.target);
}
});
}, { threshold: 0.06, rootMargin: ‘0px 0px -40px 0px’ });
faders.forEach(function (el) { io.observe(el); });
} else {
/* Fallback: just show everything */
faders.forEach(function (el) { el.classList.add(‘visible’); });
}

/* ── STAGGER CARDS (CSS class + delay, no opacity trap) ── */
var cards = document.querySelectorAll(’.card’);
cards.forEach(function (card, i) {
card.style.animationDelay = (i * 0.07) + ‘s’;
});

/* ── STAT COUNTER ── */
var stats = document.querySelectorAll(’.stat-num[data-target]’);
if (‘IntersectionObserver’ in window && stats.length) {
var so = new IntersectionObserver(function (entries) {
entries.forEach(function (e) {
if (!e.isIntersecting) return;
var el     = e.target;
var target = parseInt(el.getAttribute(‘data-target’), 10);
var suffix = el.getAttribute(‘data-suffix’) || ‘’;
var t0 = null;
var dur = 1200;
(function step(ts) {
if (!t0) t0 = ts;
var p = Math.min((ts - t0) / dur, 1);
var v = Math.round((1 - Math.pow(1 - p, 3)) * target);
el.textContent = v + suffix;
if (p < 1) requestAnimationFrame(step);
})(performance.now());
so.unobserve(el);
});
}, { threshold: 0.5 });
stats.forEach(function (el) { so.observe(el); });
}

/* ── HEADER SHADOW ON SCROLL ── */
var hdr = document.querySelector(‘header’);
if (hdr) {
window.addEventListener(‘scroll’, function () {
hdr.style.borderBottomColor =
window.scrollY > 50
? ‘rgba(240,236,228,0.14)’
: ‘rgba(240,236,228,0.07)’;
}, { passive: true });
}

/* ── TIMELINE SLIDE-IN ── */
var rows = document.querySelectorAll(’.tl-row’);
rows.forEach(function (r) {
r.style.opacity = ‘0’;
r.style.transform = ‘translateX(-16px)’;
r.style.transition = ‘opacity 0.5s ease, transform 0.5s ease’;
});

if (‘IntersectionObserver’ in window && rows.length) {
var tio = new IntersectionObserver(function (entries) {
entries.forEach(function (e) {
if (!e.isIntersecting) return;
var i = Array.prototype.indexOf.call(rows, e.target);
setTimeout(function () {
e.target.style.opacity = ‘1’;
e.target.style.transform = ‘translateX(0)’;
}, i * 75);
tio.unobserve(e.target);
});
}, { threshold: 0.1 });
rows.forEach(function (r) { tio.observe(r); });
} else {
rows.forEach(function (r) {
r.style.opacity = ‘1’; r.style.transform = ‘none’;
});
}

});
