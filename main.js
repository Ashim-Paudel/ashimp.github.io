/* =============================================
   main.js — Ashim Paudel Portfolio
   All interactive behaviour lives here.
============================================= */

'use strict';

// =============================================
// 1. NAVIGATION — hamburger toggle
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is tapped (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// =============================================
// 2. ACTIVE NAV HIGHLIGHT on scroll
// =============================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// =============================================
// 3. SCROLL REVEAL
// =============================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =============================================
// 4. SKILL RINGS — build + animate on scroll
// =============================================
const SKILLS = [
  { label: 'Python',    pct: 95, color: '#2dd4bf' },
  { label: 'OpenSees',  pct: 80, color: '#38bdf8' },
  { label: 'ETABS',     pct: 95, color: '#2dd4bf' },
  { label: 'MS Office', pct: 85, color: '#818cf8' },
  { label: 'AutoCAD',   pct: 95, color: '#38bdf8' },
  { label: 'LaTeX',     pct: 99, color: '#2dd4bf' },
];

const CIRCUMFERENCE = 2 * Math.PI * 36; // r = 36 → ≈ 226.19

function buildSkillRings() {
  const container = document.getElementById('skillRings');
  if (!container) return;

  SKILLS.forEach(skill => {
    const offset = CIRCUMFERENCE - (skill.pct / 100) * CIRCUMFERENCE;

    // Build DOM
    const item = document.createElement('div');
    item.className = 'ring-item reveal';

    item.innerHTML = `
      <div class="ring-wrap">
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <circle class="ring-bg" cx="40" cy="40" r="36"/>
          <circle
            class="ring-fill"
            cx="40" cy="40" r="36"
            stroke="${skill.color}"
            data-offset="${offset}"
          />
        </svg>
        <div class="ring-percent">${skill.pct}%</div>
      </div>
      <div class="ring-label">${skill.label}</div>
    `;

    container.appendChild(item);

    // Observe for reveal
    revealObserver.observe(item);
  });

  // Separate observer that triggers the fill animation
  const ringAnimObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.ring-fill');
          if (fill) {
            const targetOffset = parseFloat(fill.getAttribute('data-offset'));
            setTimeout(() => {
              fill.style.strokeDashoffset = targetOffset;
            }, 200);
          }
          ringAnimObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.4 }
  );

  container.querySelectorAll('.ring-item').forEach(el => ringAnimObserver.observe(el));
}

buildSkillRings();

// =============================================
// 5. PROJECT FILTER
// =============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards  = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    // Update active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show / hide cards
    projectCards.forEach(card => {
      const cats = card.getAttribute('data-cat') || '';
      const visible = filter === 'all' || cats.split(' ').includes(filter);
      card.setAttribute('data-hidden', visible ? 'false' : 'true');
      card.style.display = visible ? '' : 'none';
    });
  });
});

// =============================================
// TERMINAL ANIMATION
// =============================================
const terminalLines = [
  { prompt: '$ ', text: 'ashim --whoami', delay: 400 },
  { prompt: '',   text: '', delay: 200 },
  { prompt: '',   key: 'Name        ', val: ': Ashim Paudel', delay: 100 },
  { prompt: '',   key: 'Degree      ', val: ': B.E. Civil Engineering, IOE', delay: 100 },
  { prompt: '',   key: 'Aggregate   ', val: ': 84.60% — Rank 6', delay: 100 },
  { prompt: '',   key: 'PSC Federal ', val: ': Rank #1 (2026)', delay: 100 },
  { prompt: '',   key: 'PSC Gandaki ', val: ': Rank #1 (2026)', delay: 100 },
  { prompt: '',   text: '', delay: 200 },
  { prompt: '$ ', text: 'ashim --skills', delay: 400 },
  { prompt: '',   text: '', delay: 200 },
  { prompt: '',   key: 'Engineering ', val: ': ETABS, OpenSees, Plaxis, Autocad', delay: 100 },
  { prompt: '',   key: 'Programming ', val: ': Python, C, HTML/CSS', delay: 100 },
  { prompt: '',   key: 'Passions    ', val: ': Structures, Code, Community', delay: 100 },
  { prompt: '',   text: '', delay: 300 },
  { prompt: '$ ', text: '█', delay: 0, cursor: true },
];

function renderTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  let i = 0;

  function addLine() {
    if (i >= terminalLines.length) return;
    const item = terminalLines[i];
    const span = document.createElement('span');
    span.className = 't-line';

    if (item.cursor) {
      span.innerHTML = `<span class="t-prompt">${item.prompt}</span><span class="t-cursor"></span>`;
    } else if (item.key) {
      span.innerHTML = `<span class="t-key">${item.key}</span><span class="t-val">${item.val}</span>`;
    } else {
      span.innerHTML = `<span class="t-prompt">${item.prompt}</span><span class="t-dim">${item.text}</span>`;
    }

    body.appendChild(span);
    body.scrollTop = body.scrollHeight;
    i++;
    setTimeout(addLine, item.delay);
  }

  // Start after hero loads
  setTimeout(addLine, 1200);
}

renderTerminal();

// =============================================
// GITHUB STARS — dynamic fetch
// =============================================
const GITHUB_REPOS = [
  { selector: '.stars-beam',    repo: 'Ashim-Paudel/Python-Beam-Analysis' },
  { selector: '.stars-opensees', repo: 'Ashim-Paudel/OpenSees-Resources-for-Beginners' },
];

async function fetchGithubStars() {
  for (const item of GITHUB_REPOS) {
    try {
      const res  = await fetch(`https://api.github.com/repos/${item.repo}`);
      const data = await res.json();
      const el   = document.querySelector(item.selector);
      if (el && data.stargazers_count !== undefined) {
        el.textContent = data.stargazers_count;
      }
    } catch (e) {
      // silently fail — static number stays as fallback
    }
  }
}

fetchGithubStars();