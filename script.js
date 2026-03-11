const App = (() => {
  const SCROLL_THRESHOLD = 50;
  let touchStartY = 0;

  const getSections = () => document.querySelectorAll('.section');

  const getCurrentSection = () => {
    const sections = getSections();
    return sections.find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom > 100;
    });
  };

  const scrollToSection = (targetIndex) => {
    const sections = getSections();
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
  };

  const setActiveNav = (sectionId) => {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
    });
  };

  const Navigation = {
    init() {
      this.setupObserver();
      this.setupClickHandlers();
      this.setupKeyboardNav();
      this.setupSwipeNav();
      this.setupScrollSync();
    },

    setupObserver() {
      const observer = new IntersectionObserver(
        entries => entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        }),
        { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
      );
      getSections().forEach(section => observer.observe(section));
    },

    setupClickHandlers() {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const targetSection = document.getElementById(link.getAttribute('href').slice(1));
          targetSection?.scrollIntoView({ behavior: 'smooth' });
        });
      });
    },

    setupKeyboardNav() {
      document.addEventListener('keydown', e => {
        if (e.key === 'Tab') return;
        const sections = getSections();
        const currentIndex = sections.indexOf(getCurrentSection());
        let targetIndex = currentIndex;

        if (e.key === 'ArrowDown' || e.key === 'j') {
          e.preventDefault();
          targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else if (e.key === 'ArrowUp' || e.key === 'k') {
          e.preventDefault();
          targetIndex = Math.max(currentIndex - 1, 0);
        }

        if (targetIndex !== currentIndex) scrollToSection(targetIndex);
      });
    },

    setupSwipeNav() {
      document.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      document.addEventListener('touchend', e => {
        const diff = touchStartY - e.changedTouches[0].screenY;
        if (Math.abs(diff) < SCROLL_THRESHOLD) return;

        const sections = getSections();
        const currentIndex = sections.indexOf(getCurrentSection());
        const targetIndex = diff > 0
          ? Math.min(currentIndex + 1, sections.length - 1)
          : Math.max(currentIndex - 1, 0);

        if (targetIndex !== currentIndex) scrollToSection(targetIndex);
      }, { passive: true });
    },

    setupScrollSync() {
      document.addEventListener('scroll', () => {
        const current = getCurrentSection();
        if (current) setActiveNav(current.id);
      }, { passive: true });
    }
  };

  const Renderer = {
    init(data) {
      this.renderHero(data.hero);
      this.renderTimeline(data.experience);
      this.renderProjects(data.projects);
      this.renderContact(data.contact);
      this.renderFooter(data.hero.name);
    },

    renderHero(hero) {
      document.getElementById('hero-container').innerHTML = `
        <img src="${hero.profilePic}" alt="${hero.profileAlt}" class="profile-pic" />
        <h1 class="hero-title">${hero.name}</h1>
        <p class="hero-role">${hero.role}</p>
        <p class="hero-tagline">${hero.tagline}</p>
        <div class="scroll-indicator">▼</div>
      `;
    },

    renderTimeline(experience) {
      document.getElementById('timeline-container').innerHTML = experience.map(job => `
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3 class="job-title">${job.title}</h3>
            <p class="job-company">${job.company}</p>
            <p class="job-period">${job.period}</p>
            <ul class="job-description">${job.description.map(d => `<li>${d}</li>`).join('')}</ul>
          </div>
        </div>
      `).join('');
    },

    renderProjects(projects) {
      document.getElementById('projects-container').innerHTML = projects.map(p => `
        <article class="project-card">
          <img src="${p.image}" alt="${p.imageAlt}" class="project-image" />
          <div class="project-info">
            <h3 class="project-title">${p.title}</h3>
            <p class="project-description">${p.description}</p>
            <div class="project-tech">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
            <div class="project-links">
              <a href="${p.codeUrl}" target="_blank" rel="noopener noreferrer" class="project-link">Show Code</a>
              <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>
            </div>
          </div>
        </article>
      `).join('');
    },

    renderContact(contact) {
      document.getElementById('contact-container').innerHTML = `
        <p class="contact-text">Drop me a message!</p>
        <div class="contact-links">
          <a href="mailto:${contact.email}" class="contact-link">${contact.email}</a>
          <a href="${contact.github}" target="_blank" rel="noopener noreferrer" class="contact-link">GitHub</a>
          <a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-link">LinkedIn</a>
        </div>
      `;
    },

    renderFooter(name) {
      document.getElementById('footer-text').textContent = `© ${new Date().getFullYear()} ${name.toUpperCase()} - GAME OVER`;
    }
  };

  const init = async () => {
    try {
      const data = await fetch('data.json').then(r => r.json());
      Renderer.init(data);
      Navigation.init();
      setActiveNav(getCurrentSection()?.id);
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
