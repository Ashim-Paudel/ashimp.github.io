---
title: "Building My Portfolio from Scratch — And Getting Hacked on Day One"
date: 2026-05-01
tag: Web, Security, AI Assisted Coding
description: A full account of building ashimp.com.np from pure HTML/CSS/JS, automating a blog pipeline, and surviving a Cloudflare credential breach on the day I went live.
---

## Why I Rebuilt My Portfolio

My old portfolio at [(Archived Portfolio)](https://ashim-paudel.github.io/First-Personal-Portfolio-Website-Files/) was built in 2021 — my first real web project. Pure HTML, CSS, and JavaScript. No frameworks, no tutorials, just Stack Overflow and trial and error. I'm still proud of it for what it was.

But by 2026, it no longer reflected who I am. The design was dated, the content was incomplete, and it felt like a student project rather than a professional's portfolio. I had grown — my work, research, and experience had grown — and my portfolio needed to catch up.

So I decided to rebuild it from scratch. Same rules as before: **no frameworks, no templates, but with AI-Assisted Coding**. Pure HTML, CSS, and JavaScript. Separate files only — `index.html`, `style.css`, `main.js`. The discipline of doing it this way forces you to understand every line.

---

## Design Philosophy

The guiding principle was: **dark, bold, and clean — but never aggressive.**

I built a full design system using CSS custom properties in `:root`. Every color, font, and spacing value is a variable — which means the entire site's look can be changed from one place. This also makes future light/dark theme toggling straightforward.

**Color palette:**
- Background: `#0a0a0f` — near black
- Primary accent: `#2dd4bf` — teal
- Secondary: `#38bdf8` — sky blue
- Tertiary: `#818cf8` — soft violet
- Emerald: `#34d399` — for community/Leo sections

**Typography:**
- Headings: *Plus Jakarta Sans* — geometric, modern, confident
- Body: *Inter* — clean, readable
- Monospace: *JetBrains Mono* — for tags, labels, terminal

The background uses a subtle teal grid (`60px × 60px`) with animated gradient blobs in the hero section — all in pure CSS. No canvas, no libraries.

---

## What I Built — Section by Section

### Hero
Two-column layout: left side has my name, motto, tagline, and rank badges. Right side has a macOS-style terminal window with a typewriter animation — showing `ashim --whoami` and `ashim --skills` output line by line. The terminal is built entirely in vanilla JS with delays and DOM manipulation. No libraries.

### About
A simple two-column section — profile photo with a dual offset border frame (teal top-left, violet bottom-right), and a short personal bio alongside an interest icon strip (Coding, Drawing, Hiking, Movies, Music, Geopolitics).

### Timeline
This is the section I'm most satisfied with. A two-column sticky layout with chapter labels on the left (sticky on scroll) and timeline cards on the right. Three chapters: **Education** (teal), **Professional Experience** (violet), and **Community & Leadership** (emerald). Each card has a dot sitting on a gradient border-left line, connected by a horizontal `::before` pseudo-element.

The Leo Club journey lives here too — five roles from General Member to Constitution & Bye-Laws Chief — along with a Key Initiatives strip showing six community projects I organized as Club President.

### Skills
Left side: six animated SVG proficiency rings that fill on scroll (built in JS using `IntersectionObserver` and `stroke-dashoffset` transitions). Right side: categorized tool tags (Civil Engineering, Programming, Documentation, Platforms) with color-coded pills.

### Projects
A filterable card grid — filter tabs for Structural Design, Python, OpenSource, Web, and C. Each card has a Font Awesome icon, status badge (Ongoing/Completed/Archived), tech stack, and GitHub stars (fetched dynamically via the GitHub API with static fallback).

### Research
Academic publication-style layout. Poster presentations use one card design; journal papers use a different layout with journal name and citation link. An "In Progress" dimmed card acts as a placeholder for papers under review. A contribution strip highlights my GeoMandu 2024 technical team role.

### Achievements
Uniform card grid with filter tabs (Exams, Competitions, Scholarships, Awards). Featured achievements (PSC Rank #1) get a glowing teal border automatically via `data-featured="true"`. Adding a new achievement in the future is just copy-paste — no layout decisions needed.

### Contact
Two-column layout. Left: availability tags and contact channels. Right: a Formspree-powered contact form. Simple, functional, no backend needed.

---

## Blog Automation

One of the more satisfying parts of this build was the blog pipeline.

I wrote a Python script — `build_blog.py` — that reads Markdown files from `blogs/src/`, parses YAML frontmatter, converts Markdown to HTML using the `markdown` library, and injects everything into HTML skeletons using a partials system.

The partials (`nav.html`, `footer.html`, `post-skeleton.html`, etc.) are small reusable HTML fragments. The script assembles them like building blocks. The result: I write a `.md` file, run one command, and a fully styled blog post appears in `blogs/posts/`.

The blog index page is also auto-generated — posts are sorted by date, newest first, and rendered as cards with category tags and descriptions.

```bash
python build_blog.py
```

That's it. One command. No CMS, no database, no dependencies beyond `markdown` and `PyYAML`.

---

## Going Live — And Getting Hacked

This is the part I didn't plan for.

I deployed the site to GitHub Pages under a custom domain — `ashimp.com.np` — managed through Cloudflare. To make this work, I set up a GitHub Actions workflow that would automatically run `build_blog.py` and deploy the site on every push to `main`.

To configure the workflow, I needed my Cloudflare credentials. I added them to a config file — and then, in a moment of carelessness, I toggled my repository from **private to public**.

What happened next took less than a minute.

### The Breach

Automated bots constantly scan GitHub for leaked secrets. The moment my repo went public, a bot scraped my Cloudflare Global API Key from the repository. Using these credentials, an attacker — identified by an unauthorized Macintosh/macOS session originating from the United States in my Cloudflare dashboard — bypassed my GitHub code entirely.

They installed a **Cloudflare Worker** named `worker-holy-meadow-ef26` and mapped it to the route `*ashimp.com.np/*`. This allowed them to intercept every single visitor to my domain at the network edge — before my actual site even loaded. They injected a **ClearFake** layer: a fake browser verification window that hijacked the user's clipboard with a malicious `rundll32.exe` command.

My portfolio was serving malware. On day one.

### How I Fixed It

The fix required systematically dismantling everything the attacker had built, from the outside in:

1. **Severed the automation.** I deleted the `.github/workflows` directory entirely and switched to a manual deployment process. This removed any automated path the attacker could use to overwrite the site.

2. **Wiped the infection point.** I deleted the `gh-pages` branch and cleared all local build files, ensuring no malicious code remained on GitHub's servers.

3. **Neutralized the Worker.** The most critical step — identifying and deleting the Cloudflare Worker `worker-holy-meadow-ef26` and its associated route. This stopped the real-time malware injection at the network edge.

4. **Secured the perimeter.** I identified the unauthorized US-based session in my Cloudflare account and revoked it. Rotated all credentials.

5. **Purged the cache.** Forced Cloudflare's global servers to drop the stored malicious version of my site and reload from the clean GitHub source.

The site was clean within a few hours of discovering the breach.

### What I Learned

- **API keys never belong in code files.** Ever. They belong in GitHub Secrets or environment variables — never committed to a repository, even a private one.
- **Toggling a repo from private to public is irreversible in practice.** Bots scrape within seconds. If a secret was ever in a commit, assume it's compromised.
- **Cloudflare Workers are powerful — and dangerous in the wrong hands.** A single Worker mapped to `*yourdomain.com/*` gives an attacker full control over every HTTP response your visitors receive.
- **GitHub Actions adds attack surface.** Useful, but requires careful credential management. I now deploy manually until I set up a properly secured pipeline.

---

## Current State

The site is live at [ashimp.com.np](https://ashimp.com.np). Deployment is currently manual — I build locally, commit the generated blog files, and push to `main`. GitHub Pages serves directly from the `main` branch. Simple, clean, secure.

The GitHub Actions automation will return — but only with credentials properly stored in GitHub Secrets and never touching a code file.

---

## Reflections

Building this site taught me more than I expected — not just about web development, but about security, infrastructure, and what it means to ship something real. The hack was stressful. But understanding exactly what happened, why it happened, and how to fix it was one of the most valuable learning experiences I've had outside of a classroom.

The portfolio is a living project. Sections I still want to add: a gallery of fieldwork photos, IOE student resources, and eventually a proper light/dark theme toggle. The design system is already built for it — it'll be straightforward when the time comes.

If you're building your own portfolio from scratch — do it. Skip the templates. The struggle is the point.

---

*Built with pure HTML, CSS, and JavaScript. No frameworks. No shortcuts.*
*Domain: [ashimp.com.np](https://ashimp.com.np)*