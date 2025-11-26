# Project Constitution

## About This Project

A simple todo list web application demonstrating the 4DC workflow using vanilla JavaScript and Tailwind CSS. Designed as an educational example with zero build complexity and immediate browser execution.

---

## Core Principles

### 1. Zero Build Complexity

**Statement:** No build tools, bundlers, or compilation steps - all code runs directly in the browser without preprocessing.

**Rationale:** Educational clarity is paramount. Learners should see exactly what executes without hidden transformation steps. Build tools add cognitive overhead that obscures fundamentals.

**In Practice:**
- HTML files reference JavaScript modules directly via `<script type="module">`
- Tailwind CSS loaded via CDN link, not compiled/purged
- No package.json, no npm install, no build scripts
- Clone and open in browser - that's it

### 2. Ship Working Examples Fast

**Statement:** Each example feature should be completable in one sitting (< 2 hours) and immediately runnable without setup.

**Rationale:** Lower barrier for contributors and learners. Fast iteration demonstrates 4DC workflow value without project complexity getting in the way.

**In Practice:**
- Single HTML file when possible, minimal file count
- Clear acceptance criteria that can be verified by opening index.html
- No authentication, databases, or server setup required
- LocalStorage for persistence - no backend needed

### 3. Browser-Native First

**Statement:** Use modern browser APIs and vanilla JavaScript before adding any library or framework.

**Rationale:** Teach fundamentals and reduce dependency surface area. If the browser can do it natively, prefer that over third-party code.

**In Practice:**
- `localStorage` for data persistence instead of database libraries
- `fetch` API for any HTTP requests instead of axios/similar
- ES6 modules instead of module bundlers
- Native form validation instead of validation libraries
- CSS Grid/Flexbox instead of layout frameworks (Tailwind is styling only)

---

## Technical Decisions

### Languages
- **Vanilla JavaScript (ES6+):** No TypeScript compilation. Modern features (modules, async/await, destructuring) are fine since we target current browsers only.
- **HTML5:** Semantic markup, no templating languages.
- **CSS via Tailwind CDN:** Utility-first styling without build step. No custom CSS compilation.

### Frameworks
- **None for JavaScript logic:** Pure vanilla JS to keep examples transparent.
- **Tailwind CSS (CDN only):** Styling framework loaded via CDN link. No PostCSS, no purging, no build.

### Deployment
- **Static file serving:** Any web server or file:// protocol works.
- **GitHub Pages compatible:** Should be deployable by simply pushing to gh-pages branch.
- **No server-side logic:** Everything happens client-side.

---

**Last Updated:** 2025-11-26
