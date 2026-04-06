---
title: I am currently working on my new portfolio website
date: Apr 2026
tag: [Hobby, HTML/CSS, Python, Automation]
description: A deep dive into why I rebuilt my professional presence from scratch and how I used AI-driven automation to do it.
---
Transitioning to a Modern Engineering Portfolio: A Journey of Code and Design

## Introduction
I already had a minimalistic and well-explaining website which I built back in 2021 during my 1st semester vacation. It served its purpose for years, but after completing my Public Service Commission (PSC) exams and entering a new chapter of my career, I felt the necessity to create a more robust, professional platform to showcase my skills and experience.

In this blog, I’ll walk through the process of building [ashimp.com.np](https://ashimp.com.np) and the automation logic that makes it tick.

## The Necessity for Change
My previous website had not been updated in four years. While it was functional, it lacked the professional edge required for a Civil Engineer in 2025. I needed a site that wasn't just a static resume, but a living resource hub with:
* **Project Showcases:** To detail my work in structural analysis and water treatment.
* **Student Resources:** A dedicated space for engineering students in Nepal to find guidance.
* **Technical Documentation:** A blog system that could handle complex equations and code snippets.

## The Process: From Brainstorming to Automation
The rebuild started with a clear vision for design. I wanted a modern, dark-themed aesthetic with teal accents (`#2dd4bf`) to signify a blend of engineering and technology.

### Design & Layout Planning
I collaborated with Claude AI to decide on the design structure. To maximize efficiency and manage prompt limits, I used very short, targeted chat sessions. This allowed us to quickly finalize a modular "partial-based" layout without unnecessary token usage.

### Building the "Engine" with Gemini
The most exciting part of this project was working with **Gemini** to build a semi-automated blog builder. Instead of manually editing HTML files, I developed a Python script that handles the heavy lifting:
1. **Markdown Conversion:** It takes files like this one and converts them to HTML.
2. **Automatic Listing:** It re-scans all posts and updates the main blog index page automatically.
3. **Dynamic Tagging:** It generates individual tag pills with a gentle color gradient.

```python
# A look at the core builder logic
def build_blog():
    # Load HTML partials to keep the design modular
    nav = load_partial("nav")
    skeleton = load_partial("post-skeleton")
    
    # Process metadata and convert Markdown content
    html_content = markdown.markdown(md_body, extensions=['extra', 'codehilite', 'toc'])
```

## Tools Used
Building a modern site from scratch required a blend of design and logic tools:

| Category | Tools |
| :--- | :--- |
| **Languages** | HTML5, CSS3, JavaScript (ES6), Python |
| **Libraries** | MathJax (for Engineering formulas), FontAwesome |
| **AI Assistants** | Claude (Design/Layout), Gemini (Automation/Logic) |
| **Deployment** | GitHub Pages & Custom Domain Management |

## Website Summary & Unique Features
The new portfolio is more than just a resume; it is a semi-automated engine designed for growth:
* **Math-Ready Articles:** Integrated MathJax support allows me to display complex structural engineering formulas perfectly.
* **Zero-Maintenance Indexing:** The blog listing page updates itself every time I run the script.
* **Responsive Navigation:** The navigation bar intelligently updates its links depending on whether I'm on the main portfolio or the blog section.


## Conclusions
The journey of building this website has been incredibly rewarding. It wasn't just about writing code; it was about refining how I present my work as a Civil Engineer. Seeing the transition from a simple 2021 site to a semi-automated 2025 platform is a testament to the power of combining engineering principles with modern AI tools.

I hope this new home serves as an inspiration and a valuable resource for others in the field. The journey was beautiful, and I am excited to see where this new platform takes me.