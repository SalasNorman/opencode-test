# AGENTS.md - Retro Portfolio Website

## Project Overview

- **Project name**: Retro Programmer Portfolio
- **Type**: Static website (HTML, CSS, JavaScript)
- **Core functionality**: Single-page portfolio with retro game aesthetic showcasing experience, projects, and contact info
- **Target users**: Recruiters, potential clients, fellow developers

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript (ES6+)
- Google Fonts: Press Start 2P (pixel font)

---

## Build & Development Commands

### Development
```bash
# Open in browser (simple HTTP server)
python3 -m http.server 8000

# Or with Node.js
npx serve .
```

### No build step required
This is a static site - no transpilation, bundling, or build process needed.

### Testing
```bash
# No automated tests for this static site
# Manual testing: open index.html in browser
```

### Code Quality
```bash
# HTML validation
npx html-validate index.html

# CSS linting
npx stylelint styles.css

# JavaScript linting
npx eslint script.js
```

---

## Code Style Guidelines

### General Principles
- Keep it simple and minimal
- No external frameworks or libraries (except Google Fonts)
- Semantic HTML elements
- Mobile-first responsive design

### HTML Conventions
- Use semantic tags: `<header>`, `<nav>`, `<section>`, `<main>`, `<footer>`
- All attributes in double quotes
- Self-closing tags for void elements: `<img />`, `<br />`
- Indent with 2 spaces
- One attribute per line for readability

```html
<a 
  href="https://github.com/username"
  target="_blank"
  rel="noopener noreferrer"
>
  GitHub
</a>
```

### CSS Conventions
- Use CSS custom properties for colors
- Mobile-first media queries (min-width)
- Group related styles together
- Use flexbox and grid appropriately
- No border-radius (keep edges sharp for retro look)
- No box-shadows
- No gradients

```css
:root {
  --color-bg: #0a0a0a;
  --color-primary: #4169e1;
  --color-secondary: #ff4444;
  --color-text: #e0e0e0;
  --border-width: 2px;
}

.section {
  min-height: 100vh;
  border: var(--border-width) solid var(--color-primary);
}
```

### JavaScript Conventions
- Use const/let, avoid var
- Prefer template literals over concatenation
- Use arrow functions for callbacks
- Add event listeners, not inline handlers
- Keep functions small and focused
- Use module pattern with IIFE for organization
- Fetch data from JSON, render to DOM

```javascript
const App = (() => {
  const init = async () => {
    const data = await fetch('data.json').then(r => r.json());
    Renderer.init(data);
    Navigation.init();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
```

### Naming Conventions
- **Files**: lowercase with hyphens: `index.html`, `styles.css`, `script.js`
- **Classes**: lowercase with hyphens: `.nav-link`, `.project-card`
- **IDs**: camelCase (reserved for JS hooks): `heroContainer`, `projectsContainer`
- **Variables**: camelCase: `currentSection`, `touchStartY`
- **Constants**: UPPER_SNAKE_CASE within IIFE: `SCROLL_THRESHOLD`

### Color Palette (Dark Mode - Retro Game)
| Name | Hex | Usage |
|------|-----|-------|
| Background | `#0a0a0a` | Page background |
| Primary | `#4169e1` | Borders, links, accents (blue) |
| Secondary | `#ff4444` | Hover states, highlights (red) |
| Text | `#e0e0e0` | Body text |
| Text Muted | `#888888` | Secondary text |

### Section Layout
Each section is `100vh` (full viewport height):
- Hero: Centered profile pic, name, role, tagline
- Experience: Timeline with job entries
- Projects: Grid of project cards (3 columns on desktop, 1 on mobile)
- Contact: Centered contact links

### Accessibility
- All images must have alt text
- Links must have discernible text
- Minimum contrast ratio 4.5:1
- Focus states for keyboard navigation
- Skip to main content link

### Error Handling
- JavaScript: Use try/catch for potentially failing operations
- Console errors should be informative

---

## Project Structure

```
/home/salasnorman/Documents/codeplayground/opencode-test/
├── index.html          # Main HTML file (containers only, content via JS)
├── styles.css         # All styles
├── script.js          # JavaScript (module pattern, fetches JSON)
├── data.json          # All content (hero, experience, projects, contact)
├── AGENTS.md          # This file
├── profile-pic.png    # Profile image
└── project_img_holder.png  # Placeholder project image
```

---

## Data Schema (data.json)

All content is stored in `data.json`. Edit this file to change any text.

```json
{
  "hero": {
    "profilePic": "profile-pic.png",
    "profileAlt": "John Developer profile",
    "name": "John Developer",
    "role": "Full Stack Engineer",
    "tagline": "Ready to play? Let's build something awesome."
  },
  "experience": [
    {
      "title": "Senior Developer",
      "company": "Tech Corp",
      "period": "2022 - Present",
      "description": ["Led development of main product", "Mentored junior developers"]
    }
  ],
  "projects": [
    {
      "title": "Project Alpha",
      "description": "A full-stack web application...",
      "tech": ["React", "Node.js", "MongoDB"],
      "codeUrl": "https://github.com/...",
      "demoUrl": "https://demo...",
      "image": "project_img_holder.png",
      "imageAlt": "Project Alpha preview"
    }
  ],
  "contact": {
    "email": "hello@example.com",
    "github": "https://github.com",
    "linkedin": "https://linkedin.com"
  }
}
```

### HTML Container IDs
- Hero: `id="hero-container"`
- Timeline: `id="timeline-container"`
- Projects: `id="projects-container"`
- Contact: `id="contact-container"`
- Footer: `id="footer-text"`

---

## Implementation Checklist

### Before Writing Code
- [ ] Check existing files to understand current state
- [ ] Review data.json structure if adding new sections

### While Writing Code
- [ ] Use semantic HTML
- [ ] Follow naming conventions
- [ ] Test in browser after changes
- [ ] Verify responsive on mobile
- [ ] Update AGENTS.md if new files or structure added

### After Writing Code
- [ ] Validate HTML
- [ ] Check CSS for errors
- [ ] Verify JavaScript runs without console errors
- [ ] Test all navigation links work

---

## Notes for Agents

1. **No animations or effects** - Keep it static and retro
2. **Hard edges only** - No border-radius anywhere
3. **Solid borders** - 2-4px, no shadows
4. **ASCII art** - Use for decorative elements where appropriate
5. **Press Start 2P font** - Load from Google Fonts
6. **Dark theme** - Blue (#4169e1) and Red (#ff4444) on dark (#0a0a0a) background
7. **Content in JSON** - All text content is in data.json, not hardcoded in HTML
8. **Update AGENTS.md** - Document any new files or structural changes
