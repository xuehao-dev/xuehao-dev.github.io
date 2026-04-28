# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio and blog website for a backend developer (xuehao). The site features a terminal/CLI-inspired design aesthetic and showcases technical articles about Java, Spring Boot, MySQL, Redis, Docker, etc.

## Architecture

- **Static site** - Vanilla HTML, CSS, and JavaScript (no build tools or frameworks)
- **Terminal UI theme** - The entire site mimics a terminal interface with command blocks, prompts, and cursor animations
- **Multi-page structure**:
  - `index.html` - Homepage with hero section, skills, and recent articles
  - `blog.html` - Article listing page
  - `article.html` - Individual article detail page (dynamic via URL parameter `?id=N`)
  - `skills.html` - Skills showcase page

## Directory Structure

```
├── index.html          # Homepage
├── blog.html           # Blog listing
├── article.html        # Article detail (reads ?id= from URL)
├── skills.html         # Skills page
├── css/
│   └── style.css       # All styles (terminal theme, animations, responsive)
├── js/
│   ├── main.js         # Homepage interactions
│   ├── article.js      # Article data (articles object) + interactions
│   ├── blog.js         # Blog listing logic
│   └── skills.js       # Skills page logic
└── articles/
    └── README.md       # Article storage documentation
```

## Key Implementation Details

### Article System
- Articles are stored as JavaScript objects in `js/article.js` (the `articles` dictionary keyed by ID)
- `article.html` renders content dynamically based on `?id=N` URL parameter
- Code blocks have copy-to-clipboard functionality

### Styling
- CSS custom properties for theming (colors, fonts, spacing)
- Terminal window chrome (close/minimize/maximize buttons)
- Command line animation effects with staggered fades

## Development

This is a static site - no build commands needed. To preview:
- Open `index.html` directly in a browser
- Or serve via any static server (e.g., `npx serve`, `python -m http.server`)

## Adding New Articles

1. Add article data to the `articles` object in `js/article.js` with a new numeric ID
2. Update the article list in `blog.html` and `index.html` to link to the new article
