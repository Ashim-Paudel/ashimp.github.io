/* =============================================
   main.js — Ashim Paudel Portfolio
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
document.addEventListener('DOMContentLoaded', () => {
    const SKILLS = [
      { label: 'Python',     pct: 85, icon: 'fab fa-python' },            // Standard Brand
      { label: 'OpenSees',   pct: 80, icon: 'fas fa-project-diagram' },      // Computational Nodes
      { label: 'ETABS',      pct: 85, icon: 'fas fa-city' },               // High-rise analysis
      { label: 'AutoCAD',    pct: 95, icon: 'fas fa-drafting-compass' },     // Drafting precision
      { label: 'MS Office',  pct: 90, icon: 'fas fa-chart-line' },         // Analytics/VBA
      { label: 'LaTeX',      pct: 95, icon: 'fas fa-subscript' },          // Math typesetting
    ];

    const CIRCUMFERENCE = 2 * Math.PI * 36; 

    function buildSkillRings() {
        const container = document.getElementById('skillRings');
        if (!container) {
            console.error("Could not find element with id 'skillRings'");
            return;
        }

        container.innerHTML = ''; // Clear any existing content

        SKILLS.forEach((skill, index) => {
            const offset = CIRCUMFERENCE - (skill.pct / 100) * CIRCUMFERENCE;

            // Gradient: Teal (170) to Indigo (240)
            const currentHue = 170 + ((240 - 170) * (index / (SKILLS.length - 1)));
            const dynamicColor = `hsl(${currentHue}, 70%, 55%)`; 

            const item = document.createElement('div');
            // Removed 'reveal' class temporarily to ensure visibility
            item.className = 'ring-item'; 
            item.style.marginBottom = '20px';

            item.innerHTML = `
                <div class="ring-wrap" style="position: relative; width: 80px; height: 80px; margin: 0 auto;">
                    <svg viewBox="0 0 80 80" style="transform: rotate(-90deg); width: 80px; height: 80px; display: block;">
                        <circle class="ring-bg" cx="40" cy="40" r="36" fill="transparent" stroke="#262626" stroke-width="4"/>
                        <circle
                            class="ring-fill"
                            cx="40" cy="40" r="36"
                            fill="transparent"
                            stroke="${dynamicColor}"
                            stroke-width="4"
                            stroke-linecap="round"
                            style="stroke-dasharray: ${CIRCUMFERENCE}; stroke-dashoffset: ${CIRCUMFERENCE}; transition: stroke-dashoffset 1.5s ease-in-out;"
                            data-offset="${offset}"
                        />
                    </svg>
                    <div class="ring-icon-center" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; display: flex; align-items: center; justify-content: center;">
                        <i class="${skill.icon}" style="color: ${dynamicColor}"></i>
                    </div>
                </div>
                <div class="ring-label" style="margin-top: 10px; text-align: center; color: white; font-family: sans-serif; font-size: 0.9rem;">${skill.label}</div>
            `;

            container.appendChild(item);
        });

        // Simplified Animation Trigger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target.querySelector('.ring-fill');
                    if (fill) {
                        fill.style.strokeDashoffset = fill.getAttribute('data-offset');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.ring-item').forEach(el => observer.observe(el));
    }

    buildSkillRings();
});

// =============================================
// 5. PROJECT FILTER
// =============================================
const filterButtons = document.querySelectorAll('.projects-filter .filter-btn');
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
  { prompt: '',   key: 'Aka        ', val: ': theCuriousAshim', delay: 100 },
  { prompt: '',   key: 'Degree      ', val: ': B.E. Civil Engineering, IOE Pulchowk Campus', delay: 100 },
  { prompt: '',   key: 'Aggregate   ', val: ': 84.60% — Rank 6', delay: 100 },
  { prompt: '',   key: 'PSC Federal ', val: ': Rank #1 (2026)', delay: 100 },
  { prompt: '',   key: 'PSC Madhesh ', val: ': Rank #1 (2026)', delay: 100 },
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

// =============================================
// ACHIEVEMENTS FILTER
// =============================================
const achFilterBtns = document.querySelectorAll('.achievements-filter button');
const achCards      = document.querySelectorAll('.ach-card');

achFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    achFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    achCards.forEach(card => {
      const cat = card.getAttribute('data-cat') || '';
      const visible = filter === 'all' || cat === filter;
      card.setAttribute('data-hidden', visible ? 'false' : 'true');
      card.style.display = visible ? '' : 'none';
    });
  });
});

document.querySelector('.footer-left').innerHTML = 
  `<i class="fas fa-copyright"></i> ${new Date().getFullYear()} Ashim Paudel · Designed & Built by Ashim Paudel`;



// Function to fetch and update view count
async function updateViewCount() {
    const counterElement = document.getElementById('view-count');
    
    // Safety check to make sure the element exists on the current page
    if (!counterElement) return;

    // We use window.location.pathname as the ID so you can track different pages (home, blog, etc.)
    const pageId = encodeURIComponent(window.location.pathname);
    const workerUrl = `https://view-counter.paudelashim111.workers.dev/?page=${pageId}`;

    try {
        const response = await fetch(workerUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // Update the HTML element with the number from Cloudflare
        counterElement.innerText = data.views.toLocaleString(); 
    } catch (error) {
        console.error('Failed to update view count:', error);
        counterElement.innerText = "—"; // Fallback if the API is down
    }
}

// Call the function when the script loads
updateViewCount();