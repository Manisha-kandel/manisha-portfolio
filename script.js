/* ═══════════════════════════════════════════════════════
   MANISHA KANDEL — PORTFOLIO
   script.js — 24-Hour Shadow Engine + Interactions
════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────
   1. 24-HOUR SHADOW ENGINE
   Maps system local time (0–23h) to:
   - Sky colors (dawn, day, dusk, night)
   - Sun/moon orb position (arc across scene)
   - Leaf warmth in sunlight
   - Cast light onto the room interior
   - Stars visibility
   - Auto light/dark mode
────────────────────────────────────────────── */

// Color stops for sky at each key hour
const SKY_KEYFRAMES = [
  // hour, skyTop, skyBottom, orbColor, orbGlow, horizonColor, castColor, overlayRGBA, leafColor
  { h: 0,  skyTop: '#0a0d1a', skyBottom: '#0e1422', orb: '#d4d4f8', glow: 'rgba(180,180,255,0.25)', horizon: 'rgba(20,20,40,0)',   cast: 'rgba(0,0,0,0)',      overlay: 'rgba(5,8,22,0.6)',  leaf: '#2a4a24', stars: 1 },
  { h: 4,  skyTop: '#0f1428', skyBottom: '#1a1e38', orb: '#d0d0f0', glow: 'rgba(160,160,240,0.2)', horizon: 'rgba(30,20,60,0)',   cast: 'rgba(0,0,0,0)',      overlay: 'rgba(8,10,28,0.5)', leaf: '#2a4a24', stars: 1 },
  { h: 5,  skyTop: '#1e1a3a', skyBottom: '#3a2a5a', orb: '#e8c880', glow: 'rgba(230,180,80,0.3)',  horizon: 'rgba(100,60,120,0.3)',cast:'rgba(80,40,80,0.1)', overlay: 'rgba(20,10,40,0.35)',leaf: '#3a5e2e', stars: 0.4 },
  { h: 6,  skyTop: '#c87830', skyBottom: '#f4a060', orb: '#ffd860', glow: 'rgba(255,200,80,0.6)',  horizon: 'rgba(255,140,60,0.5)',cast:'rgba(255,120,40,0.18)',overlay:'rgba(80,40,10,0.15)', leaf: '#4a7040', stars: 0 },
  { h: 7,  skyTop: '#d4904a', skyBottom: '#f8c880', orb: '#ffe878', glow: 'rgba(255,220,100,0.5)', horizon: 'rgba(255,160,80,0.3)',cast:'rgba(255,150,60,0.12)',overlay:'rgba(40,20,5,0.08)', leaf: '#567842', stars: 0 },
  { h: 8,  skyTop: '#7ab4d8', skyBottom: '#b8d8f0', orb: '#ffe480', glow: 'rgba(255,220,80,0.45)',horizon:'rgba(255,180,80,0.1)', cast:'rgba(255,200,80,0.07)',overlay:'rgba(0,0,0,0.02)',  leaf: '#5a8048', stars: 0 },
  { h: 10, skyTop: '#5a9ec8', skyBottom: '#9acce8', orb: '#fff4a0', glow: 'rgba(255,240,140,0.4)',horizon:'rgba(255,200,80,0)',   cast:'rgba(255,220,100,0.05)',overlay:'rgba(0,0,0,0)',    leaf: '#5e8850', stars: 0 },
  { h: 12, skyTop: '#3a88c8', skyBottom: '#7ab8e0', orb: '#fff8c0', glow: 'rgba(255,248,180,0.5)',horizon:'rgba(255,220,100,0)',  cast:'rgba(255,240,120,0.1)',overlay:'rgba(0,0,0,0)',     leaf: '#64904e', stars: 0 },
  { h: 14, skyTop: '#4898cc', skyBottom: '#88c4e0', orb: '#fff8b8', glow: 'rgba(255,245,160,0.45)',horizon:'rgba(255,220,80,0)',  cast:'rgba(255,230,100,0.08)',overlay:'rgba(0,0,0,0)',   leaf: '#628c4c', stars: 0 },
  { h: 16, skyTop: '#5090c0', skyBottom: '#90c0e0', orb: '#ffe880', glow: 'rgba(255,220,80,0.5)', horizon:'rgba(255,180,60,0.1)',cast:'rgba(255,180,60,0.08)',overlay:'rgba(0,0,0,0)',     leaf: '#5a8448', stars: 0 },
  { h: 17, skyTop: '#c06828', skyBottom: '#e09050', orb: '#ffc040', glow: 'rgba(255,180,40,0.7)', horizon:'rgba(255,140,40,0.5)',cast:'rgba(255,130,30,0.2)', overlay:'rgba(30,10,5,0.08)', leaf: '#4a6e38', stars: 0 },
  { h: 18, skyTop: '#a04020', skyBottom: '#d07040', orb: '#ff9820', glow: 'rgba(255,140,20,0.7)', horizon:'rgba(255,100,20,0.6)',cast:'rgba(255,100,20,0.28)',overlay:'rgba(40,15,5,0.15)', leaf: '#405830', stars: 0 },
  { h: 19, skyTop: '#602818', skyBottom: '#a05030', orb: '#e07010', glow: 'rgba(220,100,10,0.6)', horizon:'rgba(200,70,10,0.6)', cast:'rgba(200,70,10,0.2)', overlay:'rgba(30,10,5,0.25)', leaf: '#384e2a', stars: 0 },
  { h: 20, skyTop: '#2a1830', skyBottom: '#4a2840', orb: '#c06080', glow: 'rgba(180,80,100,0.4)', horizon:'rgba(100,40,60,0.3)', cast:'rgba(60,20,40,0.1)',  overlay:'rgba(20,8,25,0.35)', leaf: '#2e4024', stars: 0.3 },
  { h: 21, skyTop: '#180e28', skyBottom: '#281838', orb: '#b8a0e0', glow: 'rgba(160,140,220,0.3)',horizon:'rgba(40,20,60,0.1)',  cast:'rgba(0,0,0,0)',        overlay:'rgba(12,6,20,0.45)', leaf: '#263620', stars: 0.7 },
  { h: 22, skyTop: '#0e0a1e', skyBottom: '#160e28', orb: '#c0c0f0', glow: 'rgba(170,170,240,0.25)',horizon:'rgba(20,10,40,0)',  cast:'rgba(0,0,0,0)',        overlay:'rgba(6,4,16,0.55)', leaf: '#243020', stars: 0.9 },
  { h: 23, skyTop: '#0a0814', skyBottom: '#0e0c1e', orb: '#c8c8f8', glow: 'rgba(180,180,255,0.22)',horizon:'rgba(10,8,25,0)',   cast:'rgba(0,0,0,0)',        overlay:'rgba(5,3,14,0.6)',  leaf: '#223020', stars: 1 },
];

// Linear interpolation helper
function lerp(a, b, t) { return a + (b - a) * t; }

// Parse rgba string to object {r,g,b,a}
function parseRGBA(str) {
  const m = str.match(/[\d.]+/g);
  return m ? { r: +m[0], g: +m[1], b: +m[2], a: m[3] !== undefined ? +m[3] : 1 } : { r:0,g:0,b:0,a:0 };
}

// Parse hex to rgb object
function parseHex(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function hexLerp(hexA, hexB, t) {
  const a = parseHex(hexA), b = parseHex(hexB);
  const r = Math.round(lerp(a.r, b.r, t));
  const g = Math.round(lerp(a.g, b.g, t));
  const bl = Math.round(lerp(a.b, b.b, t));
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${bl.toString(16).padStart(2,'0')}`;
}

function rgbaLerp(strA, strB, t) {
  const a = parseRGBA(strA), b = parseRGBA(strB);
  const r = Math.round(lerp(a.r, b.r, t));
  const g = Math.round(lerp(a.g, b.g, t));
  const bl = Math.round(lerp(a.b, b.b, t));
  const al = parseFloat(lerp(a.a, b.a, t).toFixed(3));
  return `rgba(${r},${g},${bl},${al})`;
}

// Get interpolated sky state for a given decimal hour (e.g. 14.5)
function getSkyState(decimalHour) {
  const keys = SKY_KEYFRAMES;
  let lo = keys[keys.length - 1], hi = keys[0];

  for (let i = 0; i < keys.length; i++) {
    if (keys[i].h <= decimalHour) lo = keys[i];
    if (keys[i].h > decimalHour) { hi = keys[i]; break; }
  }

  if (lo === hi) return lo;
  const range = (hi.h - lo.h + 24) % 24 || 1;
  const t = (decimalHour - lo.h + 24) % 24 / range;

  return {
    skyTop:   hexLerp(lo.skyTop, hi.skyTop, t),
    skyBottom:hexLerp(lo.skyBottom, hi.skyBottom, t),
    orb:      hexLerp(lo.orb, hi.orb, t),
    glow:     rgbaLerp(lo.glow, hi.glow, t),
    horizon:  rgbaLerp(lo.horizon, hi.horizon, t),
    cast:     rgbaLerp(lo.cast, hi.cast, t),
    overlay:  rgbaLerp(lo.overlay, hi.overlay, t),
    leaf:     hexLerp(lo.leaf, hi.leaf, t),
    stars:    lerp(lo.stars, hi.stars, t),
  };
}

// Calculate sun/moon orb position on an arc across the scene
// At sunrise (~6h) → left edge low; noon → center top; sunset (~18h) → right edge low
// Night: moon arcs gently
function getOrbPosition(decimalHour) {
  // Map 6h–18h (day arc) onto progress 0→1
  let progress, isNight = false;

  if (decimalHour >= 5.5 && decimalHour <= 19) {
    progress = (decimalHour - 5.5) / (19 - 5.5); // 0 (dawn) → 1 (dusk)
  } else {
    // Night arc 19h→5.5h next day
    const nightTotal = (5.5 + 24 - 19);
    const nightProgress = decimalHour >= 19
      ? (decimalHour - 19) / nightTotal
      : (decimalHour + 24 - 19) / nightTotal;
    progress = nightProgress;
    isNight = true;
  }

  // Parabolic arc: x goes 5%→95%, y peaks at ~10% (top)
  const x = 5 + progress * 90; // percent across scene width
  // Arc: y = 80 - 70 * sin(π * progress) meaning 80% at edges, 10% at peak
  const y = isNight
    ? 75 - 35 * Math.sin(Math.PI * progress) // shallower night arc
    : 80 - 68 * Math.sin(Math.PI * progress);

  return { x, y };
}

let manualThemeOverride = false;
let currentMode = 'light';

function applyTimeOfDay(decimalHour) {
  const state = getSkyState(decimalHour);
  const orbPos = getOrbPosition(decimalHour);
  const root = document.documentElement;

  // Sky
  root.style.setProperty('--sky-top', state.skyTop);
  root.style.setProperty('--sky-bottom', state.skyBottom);
  root.style.setProperty('--orb-color', state.orb);
  root.style.setProperty('--orb-glow', state.glow);
  root.style.setProperty('--horizon-color', state.horizon);
  root.style.setProperty('--cast-color', state.cast);
  root.style.setProperty('--leaf-color', state.leaf);

  // Stars
  const starsEl = document.querySelector('.stars-layer');
  if (starsEl) starsEl.style.opacity = state.stars;

  // Cloud visibility (less visible at night)
  document.querySelectorAll('.cloud').forEach(c => {
    c.style.opacity = state.stars > 0.5 ? 0.15 : 0.7;
  });

  // Orb position
  const orbEl = document.querySelector('.sun-moon-orb');
  if (orbEl) {
    orbEl.style.left = `${orbPos.x}%`;
    orbEl.style.top  = `${orbPos.y}%`;
  }

  // Time overlay on scene
  const overlayEl = document.getElementById('timeOverlay');
  if (overlayEl) overlayEl.style.background = state.overlay;

  // Auto dark/light mode (unless user overrode)
  if (!manualThemeOverride) {
    const shouldBeDark = decimalHour < 6.5 || decimalHour > 20;
    setTheme(shouldBeDark ? 'dark' : 'light', false);
  }
}

function setTheme(mode, isManual) {
  if (isManual) manualThemeOverride = true;
  currentMode = mode;
  document.body.classList.toggle('dark-mode', mode === 'dark');
  const icon  = document.getElementById('toggleIcon');
  const label = document.getElementById('toggleLabel');
  if (icon)  icon.textContent  = mode === 'dark' ? '☽' : '☀';
  if (label) label.textContent = mode === 'dark' ? 'Night' : 'Day';
}

// Real-time update loop
function initTimeEngine() {
  function tick() {
    const now = new Date();
    const decimalHour = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
    applyTimeOfDay(decimalHour);
  }
  tick(); // immediate first run
  setInterval(tick, 60000); // update every minute
}

// Theme toggle button
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    setTheme(newMode, true);
  });
}


/* ──────────────────────────────────────────────
   2. SKILLS TAB SYSTEM
   Accessible tab switching with keyboard nav
────────────────────────────────────────────── */
function initTabs() {
  const tabs    = document.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.tab-panel');

  if (!tabs.length) return;

  function activateTab(btn) {
    const target = btn.dataset.tab;

    // Update buttons
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    // Update panels with animation
    panels.forEach(p => {
      if (p.id === `tab-${target}`) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn));

    // Keyboard navigation
    btn.addEventListener('keydown', e => {
      const list = Array.from(tabs);
      const idx  = list.indexOf(btn);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        list[(idx + 1) % list.length].focus();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        list[(idx - 1 + list.length) % list.length].focus();
      }
    });
  });
}


/* ──────────────────────────────────────────────
   3. SCROLL-TRIGGERED REVEALS
   Elements fade + slide in when entering viewport
────────────────────────────────────────────── */
function initScrollReveals() {
  const targets = document.querySelectorAll(
    '.project-card, .pub-card, .book-card, .skill-chip, .section-title, .header-text'
  );

  // Apply initial hidden state via inline style
  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.55s ease ${(i % 8) * 0.06}s, transform 0.55s ease ${(i % 8) * 0.06}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}


/* ──────────────────────────────────────────────
   4. SMOOTH NAV HIGHLIGHT
   Active section tracking via IntersectionObserver
────────────────────────────────────────────── */
function initNavHighlight() {
  const navLinks = document.querySelectorAll('.header-nav a');
  const sections = document.querySelectorAll('section[id], footer[id]');

  if (!navLinks.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--accent-gold)'
            : '';
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}


/* ──────────────────────────────────────────────
   5. CARD TILT EFFECT (subtle 3D on hover)
   Tracks mouse within each project card
────────────────────────────────────────────── */
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotY   = dx * 5;   // ±5deg
      const rotX   = dy * -5;
      card.style.transform = `translateY(-4px) perspective(600px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


/* ──────────────────────────────────────────────
   6. DYNAMIC SHADOW CASTER
   A faint directional shadow overlay on content
   area that shifts based on the sun position
   (supplements the CSS window scene)
────────────────────────────────────────────── */
function initDynamicShadow() {
  // We inject a pseudo-shadow via a fixed element behind content
  const shadowEl = document.createElement('div');
  shadowEl.id = 'dynamicShadow';
  Object.assign(shadowEl.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '0',
    inset: '0',
    transition: 'background 2s ease',
  });
  document.body.insertBefore(shadowEl, document.body.firstChild);

  function updateShadow() {
    const now = new Date();
    const h   = now.getHours() + now.getMinutes() / 60;
    const state = getSkyState(h);
    const orbPos = getOrbPosition(h);

    // Shadow comes from opposite direction of sun
    const shadowAngle = orbPos.x / 100; // 0–1 (left to right sun)
    // Cast a very subtle radial from the sun direction
    const opacity = h >= 6 && h <= 19 ? 0.04 : 0;
    const px = orbPos.x;
    const py = orbPos.y * 0.4; // scaled since scene is partial width
    shadowEl.style.background = `radial-gradient(ellipse at ${px}% ${py}%, rgba(255,200,80,${opacity * 0.6}) 0%, transparent 60%)`;
  }

  updateShadow();
  setInterval(updateShadow, 60000);
}


/* ──────────────────────────────────────────────
   7. WINDOW SCENE PARALLAX (on desktop only)
────────────────────────────────────────────── */
function initParallax() {
  if (window.innerWidth < 900) return;

  const scene  = document.querySelector('.window-scene');
  const plant  = document.querySelector('.plant-pot');
  const clouds = document.querySelectorAll('.cloud');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scene) {
      scene.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
    clouds.forEach((c, i) => {
      c.style.transform = `translateX(${Math.sin(scrollY * 0.005 + i) * 6}px)`;
    });
  }, { passive: true });
}


/* ──────────────────────────────────────────────
   8. SKILL CHIP RIPPLE
   Subtle ripple animation on click
────────────────────────────────────────────── */
function initChipRipple() {
  document.querySelectorAll('.skill-chip').forEach(chip => {
    chip.addEventListener('click', function(e) {
      const rect   = this.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const ripple = document.createElement('span');
      Object.assign(ripple.style, {
        position: 'absolute',
        left: `${x}px`,
        top:  `${y}px`,
        width: '0',
        height: '0',
        background: 'rgba(200, 150, 60, 0.25)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'rippleOut 0.5s ease-out forwards',
        pointerEvents: 'none',
      });
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Inject ripple keyframe if not present
  if (!document.getElementById('rippleStyle')) {
    const style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent = `
      @keyframes rippleOut {
        to { width: 150px; height: 150px; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}


/* ──────────────────────────────────────────────
   9. FOOTER COPY-EMAIL
   Click the contact button → copies email to clipboard
   (while still navigating via mailto)
────────────────────────────────────────────── */
function initContactCopy() {
  const btn = document.querySelector('.contact-btn');
  if (!btn) return;

  const email = btn.getAttribute('href').replace('mailto:', '');

  btn.addEventListener('click', e => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    // Flash feedback
    const orig = btn.textContent;
    btn.textContent = '✓ Email copied!';
    btn.style.background = 'var(--accent-sage)';
    setTimeout(() => {
      btn.innerHTML = '<span>✉</span> Get in touch';
      btn.style.background = '';
    }, 2000);
  });
}


/* ──────────────────────────────────────────────
   10. READING CARDS — hover glow matching spine
────────────────────────────────────────────── */
function initBookGlow() {
  document.querySelectorAll('.book-card').forEach(card => {
    const spine  = card.querySelector('.book-spine');
    if (!spine) return;
    const color = getComputedStyle(spine).getPropertyValue('--spine-color').trim();
    if (!color) return;

    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = `0 8px 32px ${color}30, 0 2px 8px ${color}20`;
      card.style.borderColor = `${color}50`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
      card.style.borderColor = '';
    });
  });
}


/* ──────────────────────────────────────────────
   INIT — Wire everything up on DOMContentLoaded
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTimeEngine();
  initThemeToggle();
  initTabs();
  initScrollReveals();
  initNavHighlight();
  initCardTilt();
  initDynamicShadow();
  initParallax();
  initChipRipple();
  initContactCopy();
  initBookGlow();

  // Debug helper: expose time override in console for testing
  // Usage: setDebugHour(18.5) → simulates 6:30 PM sunset
  window.setDebugHour = function(h) {
    manualThemeOverride = false;
    applyTimeOfDay(h);
    console.log(`[Shadow Engine] Simulating ${h}h`);
  };

  console.log(
    '%c🌅 Shadow Engine Active',
    'color: #c8963c; font-size: 13px; font-weight: 600;'
  );
  console.log(
    '%cTip: setDebugHour(6) to test dawn · setDebugHour(18) for sunset · setDebugHour(0) for midnight',
    'color: #8a8078; font-size: 11px;'
  );
});
