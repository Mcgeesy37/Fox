/* ============================================
ANDREAS FUCHS — PORTFOLIO
main.js
============================================ */

document.addEventListener(‘DOMContentLoaded’, function () {

/* ──────────────────────────────────────────
1. CUSTOM CURSOR
────────────────────────────────────────── */
var cursorEl = document.getElementById(‘cursor’);
var dot  = cursorEl.querySelector(’.cursor-dot’);
var ring = cursorEl.querySelector(’.cursor-ring’);

var mx = 0, my = 0;
var rx = 0, ry = 0;

document.addEventListener(‘mousemove’, function (e) {
mx = e.clientX;
my = e.clientY;
dot.style.transform = ‘translate(’ + mx + ’px, ’ + my + ‘px) translate(-50%, -50%)’;
});

function animateRing () {
rx += (mx - rx) * 0.12;
ry += (my - ry) * 0.12;
ring.style.transform = ‘translate(’ + rx + ’px, ’ + ry + ‘px) translate(-50%, -50%)’;
requestAnimationFrame(animateRing);
}
animateRing();

/* Enlarge ring on interactive elements */
var interactives = document.querySelectorAll(‘a, .card, button’);
interactives.forEach(function (el) {
el.addEventListener(‘mouseenter’, function () {
ring.style.width  = ‘68px’;
ring.style.height = ‘68px’;
ring.style.borderColor = ‘rgba(184, 74, 42, 0.9)’;
});
el.addEventListener(‘mouseleave’, function () {
ring.style.width  = ‘40px’;
ring.style.height = ‘40px’;
ring.style.borderColor = ‘#f0ece4’;
});
});

/* ──────────────────────────────────────────
2. SCROLL REVEAL — sections
────────────────────────────────────────── */
var reveals = document.querySelectorAll(’.reveal’);

var sectionObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add(‘visible’);
sectionObserver.unobserve(entry.target);
}
});
}, { threshold: 0.08 });

reveals.forEach(function (el) {
sectionObserver.observe(el);
});

/* ──────────────────────────────────────────
3. STAGGERED CARD REVEAL
────────────────────────────────────────── */
var cards = document.querySelectorAll(’.card’);

var cardObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
var i = Array.prototype.indexOf.call(cards, entry.target);
entry.target.style.transitionDelay = (i * 0.08) + ‘s’;
entry.target.classList.add(‘visible’);
cardObserver.unobserve(entry.target);
}
});
}, { threshold: 0.04 });

cards.forEach(function (card) {
cardObserver.observe(card);
});

/* ──────────────────────────────────────────
4. ANIMATED STAT COUNTER
────────────────────────────────────────── */
var statNums = document.querySelectorAll(’.stat-num’);

function animateCounter (el) {
var target = parseInt(el.getAttribute(‘data-target’), 10);
var suffix = el.getAttribute(‘data-suffix’) || ‘’;
var start  = 0;
var duration = 1400;
var startTime = null;

```
function step (timestamp) {
  if (!startTime) startTime = timestamp;
  var progress = Math.min((timestamp - startTime) / duration, 1);
  var eased    = 1 - Math.pow(1 - progress, 3); /* ease out cubic */
  el.textContent = Math.round(eased * target) + suffix;
  if (progress < 1) requestAnimationFrame(step);
}
requestAnimationFrame(step);
```

}

var statObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
animateCounter(entry.target);
statObserver.unobserve(entry.target);
}
});
}, { threshold: 0.5 });

statNums.forEach(function (el) {
statObserver.observe(el);
});

/* ──────────────────────────────────────────
5. HEADER SCROLL EFFECT
────────────────────────────────────────── */
var headerEl = document.querySelector(‘header’);

window.addEventListener(‘scroll’, function () {
if (window.scrollY > 60) {
headerEl.style.borderBottomColor = ‘rgba(240, 236, 228, 0.14)’;
} else {
headerEl.style.borderBottomColor = ‘rgba(240, 236, 228, 0.08)’;
}
});

/* ──────────────────────────────────────────
6. TIMELINE ITEM STAGGER
────────────────────────────────────────── */
var tlItems = document.querySelectorAll(’.tl-item’);

tlItems.forEach(function (item) {
item.style.opacity  = ‘0’;
item.style.transform = ‘translateX(-20px)’;
item.style.transition = ‘opacity 0.6s ease, transform 0.6s ease’;
});

var tlObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
var i = Array.prototype.indexOf.call(tlItems, entry.target);
setTimeout(function () {
entry.target.style.opacity   = ‘1’;
entry.target.style.transform = ‘translateX(0)’;
}, i * 80);
tlObserver.unobserve(entry.target);
}
});
}, { threshold: 0.1 });

tlItems.forEach(function (item) {
tlObserver.observe(item);
});

});
