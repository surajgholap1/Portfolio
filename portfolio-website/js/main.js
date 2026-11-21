// Main Application Controller
// Orchestrates interactivity, animations, modals, data rendering & theme switches

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Subsystems
  initThemeAndAccents();
  renderPersonalDetails();
  renderSkills();
  renderCertifications();
  renderProjects();
  renderExperience();
  renderTestimonials();
  initTypewriter();
  initScrollAnimations();
  initTiltCards();
  initProjectModals();
  initResumeModal();
  initContactForm();
  initMobileNav();
  initSoundToggle();
  initQuickCopy();

  // Refresh Lucide SVGs
  if (window.lucide) {
    lucide.createIcons();
  }
});

/* ==========================================================================
   1. Theme & Accent Color Controller
   ========================================================================== */
function initThemeAndAccents() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const accentPickerBtns = document.querySelectorAll('[data-set-accent]');
  const currentTheme = localStorage.getItem('portfolio_theme') || 'dark';
  const currentAccent = localStorage.getItem('portfolio_accent') || 'cyan';

  document.documentElement.setAttribute('data-theme', currentTheme);
  document.documentElement.setAttribute('data-accent', currentAccent);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
      if (window.soundFX) soundFX.playToggle();
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  accentPickerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const accent = btn.getAttribute('data-set-accent');
      document.documentElement.setAttribute('data-accent', accent);
      localStorage.setItem('portfolio_accent', accent);
      if (window.soundFX) soundFX.playClick();
      showToast(`Accent set to ${accent}`);
    });
  });
}

function updateThemeIcon(theme) {
  const iconContainer = document.getElementById('theme-icon');
  if (!iconContainer) return;
  iconContainer.innerHTML = theme === 'dark'
    ? '<i data-lucide="sun" class="w-5 h-5"></i>'
    : '<i data-lucide="moon" class="w-5 h-5"></i>';
  if (window.lucide) lucide.createIcons();
}

/* ==========================================================================
   2. Render Personal Information & Hero Details
   ========================================================================== */
function renderPersonalDetails() {
  const { personal } = portfolioData;

  // Name & Titles
  const nameEls = document.querySelectorAll('.bind-name');
  nameEls.forEach(el => el.textContent = personal.name);

  const taglineEl = document.getElementById('bind-tagline');
  if (taglineEl) taglineEl.textContent = personal.tagline;

  const locationEl = document.getElementById('bind-location');
  if (locationEl) locationEl.textContent = personal.location;

  const statusEl = document.getElementById('bind-status');
  if (statusEl) statusEl.textContent = personal.status;

  const emailEls = document.querySelectorAll('.bind-email');
  emailEls.forEach(el => {
    el.textContent = personal.email;
    if (el.tagName === 'A') el.href = `mailto:${personal.email}`;
  });

  const phoneEls = document.querySelectorAll('.bind-phone');
  phoneEls.forEach(el => {
    el.textContent = personal.phone;
    if (el.tagName === 'A') el.href = `tel:${personal.phone.replace(/[^0-9+]/g, '')}`;
  });

  // Social Links
  const githubLink = document.getElementById('bind-github');
  if (githubLink) githubLink.href = personal.github;
  const linkedinLink = document.getElementById('bind-linkedin');
  if (linkedinLink) linkedinLink.href = personal.linkedin;
  const twitterLink = document.getElementById('bind-twitter');
  if (twitterLink) twitterLink.href = personal.twitter;

  // Bio Paragraphs
  const bioContainer = document.getElementById('bind-bio-container');
  if (bioContainer) {
    bioContainer.innerHTML = personal.bio
      .map(p => `<p class="text-base sm:text-lg leading-relaxed text-secondary mb-4">${p}</p>`)
      .join('');
  }

  // Live Stats Grid
  const statsContainer = document.getElementById('bind-stats-grid');
  if (statsContainer) {
    statsContainer.innerHTML = personal.stats.map(stat => `
      <div class="glass-panel p-5 rounded-2xl text-center group hover:scale-[1.03] transition-transform">
        <div class="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">
          <span class="counter-number" data-target="${stat.value}">0</span>${stat.suffix}
        </div>
        <div class="text-xs sm:text-sm font-medium text-secondary uppercase tracking-wider">${stat.label}</div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   3. Typewriter Animation in Hero
   ========================================================================== */
function initTypewriter() {
  const textTarget = document.getElementById('typewriter-text');
  if (!textTarget) return;

  const roles = portfolioData.roles;
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 120;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      textTarget.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 60;
    } else {
      textTarget.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 110;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      delay = 2200; // Pause at full word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400; // Pause before next word
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   4. Render Skills Matrix with Animated Progress
   ========================================================================== */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = portfolioData.skills.map((category, idx) => `
    <div class="glass-panel p-6 sm:p-8 rounded-2xl reveal-fade-up delay-${(idx + 1) * 100}">
      <div class="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
        <div class="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
          <i data-lucide="${getCategoryIcon(category.category)}" class="w-5 h-5"></i>
        </div>
        <h3 class="text-xl font-bold text-primary">${category.category}</h3>
      </div>
      <div class="space-y-5">
        ${category.items.map(skill => `
          <div>
            <div class="flex justify-between items-center mb-1.5 text-sm">
              <span class="font-medium flex items-center gap-2">
                <i data-lucide="${skill.icon}" class="w-4 h-4 text-accent"></i>
                ${skill.name}
              </span>
              <span class="text-xs font-mono text-secondary">${skill.level}%</span>
            </div>
            <div class="skill-bar-bg">
              <div class="skill-bar-fill" data-level="${skill.level}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function getCategoryIcon(cat) {
  if (cat.includes('Master Data') || cat.includes('SAP')) return 'layers';
  if (cat.includes('Analytics') || cat.includes('Excel')) return 'bar-chart-3';
  return 'cpu';
}

function renderCertifications() {
  const container = document.getElementById('certifications-container');
  if (!container || !portfolioData.certifications) return;

  container.innerHTML = portfolioData.certifications.map((cert, idx) => `
    <div class="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-accent/40 transition-all reveal-fade-up delay-${(idx + 1) * 100}">
      <div class="w-12 h-12 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent shrink-0">
        <i data-lucide="${cert.icon || 'award'}" class="w-6 h-6"></i>
      </div>
      <div>
        <h4 class="font-bold text-sm sm:text-base text-primary leading-snug">${cert.title}</h4>
        <p class="text-xs font-mono text-accent-light mt-1">${cert.issuer}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   5. Render Projects Showcase with Filtering
   ========================================================================== */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((proj, idx) => `
    <div class="tilt-card glass-panel rounded-2xl overflow-hidden flex flex-col group reveal-fade-up delay-${(idx % 3 + 1) * 100}" data-project-id="${proj.id}">
      <!-- Project Card Header & Visual Gradient -->
      <div class="h-48 sm:h-52 w-full relative bg-gradient-to-br ${proj.gradient} p-6 flex flex-col justify-between overflow-hidden border-b border-white/5">
        <!-- Abstract Tech Pattern Circles -->
        <div class="absolute -right-10 -bottom-10 w-40 h-40 rounded-full border border-white/10 pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
        <div class="absolute right-12 bottom-6 w-24 h-24 rounded-full border border-white/15 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
        
        <div class="flex justify-between items-start z-10">
          <span class="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white">
            ${proj.categoryLabel}
          </span>
          ${proj.featured ? `
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <i data-lucide="star" class="w-3 h-3 fill-amber-300"></i> Featured
            </span>
          ` : ''}
        </div>

        <div class="z-10">
          <div class="text-xs font-mono text-white/70 mb-1 flex items-center gap-1.5">
            <i data-lucide="activity" class="w-3.5 h-3.5 text-accent"></i> ${proj.stats}
          </div>
          <h4 class="text-xl font-bold text-white tracking-wide group-hover:text-accent-light transition-colors">
            ${proj.title}
          </h4>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <p class="text-sm text-secondary leading-relaxed mb-5">
          ${proj.shortDescription}
        </p>

        <div>
          <!-- Tech Tags -->
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${proj.technologies.slice(0, 4).map(t => `
              <span class="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-secondary">
                ${t}
              </span>
            `).join('')}
            ${proj.technologies.length > 4 ? `
              <span class="text-xs font-mono px-2 py-1 rounded-md bg-white/5 text-muted">
                +${proj.technologies.length - 4}
              </span>
            ` : ''}
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-3 border-t border-white/5">
            <button class="btn-open-project text-xs font-semibold text-accent hover:text-white flex items-center gap-1 transition-colors cursor-pointer" data-id="${proj.id}">
              View Case Study <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
            <div class="flex items-center gap-2">
              <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-secondary hover:text-white transition-colors" title="View Source">
                <i data-lucide="github" class="w-4 h-4"></i>
              </a>
              <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent hover:text-white transition-colors" title="Live Preview">
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
  initTiltCards();
}

// Setup Category Filter buttons
document.querySelectorAll('.filter-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.getAttribute('data-filter');
    renderProjects(category);
    if (window.soundFX) soundFX.playClick();
  });
});

/* ==========================================================================
   6. Render Work & Education Experience Timeline
   ========================================================================== */
function renderExperience() {
  const container = document.getElementById('experience-timeline');
  if (!container) return;

  container.innerHTML = portfolioData.experience.map((exp, idx) => `
    <div class="relative pl-10 md:pl-0 mb-12 md:flex md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} group">
      <!-- Center Milestone Dot -->
      <div class="timeline-dot top-1 md:top-auto"></div>

      <!-- Content Box -->
      <div class="md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}">
        <div class="glass-panel p-6 sm:p-7 rounded-2xl hover:border-accent/40 transition-all">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/25">
              ${exp.period}
            </span>
            <span class="text-xs text-muted flex items-center gap-1 font-mono">
              <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${exp.location}
            </span>
          </div>

          <h4 class="text-lg font-bold text-primary mb-0.5">${exp.role}</h4>
          <h5 class="text-sm font-medium text-accent-light mb-4">${exp.company}</h5>

          <ul class="space-y-2 text-sm text-secondary">
            ${exp.highlights.map(h => `
              <li class="flex items-start gap-2">
                <i data-lucide="chevron-right" class="w-4 h-4 text-accent shrink-0 mt-0.5"></i>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   7. Render Testimonials Carousel / Grid
   ========================================================================== */
function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  container.innerHTML = portfolioData.testimonials.map((t, idx) => `
    <div class="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col justify-between group hover:border-accent/40 transition-all reveal-fade-up delay-${(idx + 1) * 100}">
      <div>
        <div class="text-accent mb-4 opacity-75">
          <i data-lucide="quote" class="w-8 h-8"></i>
        </div>
        <p class="text-sm sm:text-base text-secondary italic leading-relaxed mb-6">
          "${t.quote}"
        </p>
      </div>

      <div class="flex items-center gap-3.5 pt-4 border-t border-white/5">
        <img src="${t.avatar}" alt="${t.author}" class="w-12 h-12 rounded-full object-cover border-2 border-accent/40" />
        <div>
          <h5 class="font-bold text-primary text-sm">${t.author}</h5>
          <p class="text-xs text-muted">${t.role} • <span class="text-accent">${t.company}</span></p>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   8. 3D Card Tilt Physics
   ========================================================================== */
function initTiltCards() {
  // Only enable 3D tilt on devices with hovering pointer
  if (window.matchMedia('(hover: hover)').matches) {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });

      card.addEventListener('mouseenter', () => {
        if (window.soundFX) soundFX.playHover();
      });
    });
  }
}

/* ==========================================================================
   9. Scroll Trigger Animations & Stats Counter
   ========================================================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Animate child skill bars if inside
        const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        skillBars.forEach(bar => {
          const level = bar.getAttribute('data-level');
          bar.style.width = `${level}%`;
        });

        // Animate counter numbers
        const counters = entry.target.querySelectorAll('.counter-number');
        counters.forEach(counter => animateCounter(counter));

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  const duration = 1400;
  const start = 0;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quad
    const easeOut = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(easeOut * target);

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(updateCount);
}

/* ==========================================================================
   10. Project Case Study Modal
   ========================================================================== */
function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-body');
  const closeBtn = document.getElementById('close-project-modal');

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.btn-open-project');
    if (!trigger) return;

    const projectId = trigger.getAttribute('data-id');
    const project = portfolioData.projects.find(p => p.id === projectId);
    if (!project) return;

    if (window.soundFX) soundFX.playClick();

    modalContent.innerHTML = `
      <div class="h-44 sm:h-56 bg-gradient-to-br ${project.gradient} p-8 flex flex-col justify-end relative rounded-t-2xl border-b border-white/10">
        <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 self-start mb-2">
          ${project.categoryLabel}
        </span>
        <h3 class="text-2xl sm:text-3xl font-extrabold text-white">${project.title}</h3>
      </div>

      <div class="p-6 sm:p-8 space-y-6">
        <div>
          <h5 class="text-xs font-mono uppercase tracking-wider text-accent mb-2">Project Overview</h5>
          <p class="text-secondary leading-relaxed">${project.fullDescription}</p>
        </div>

        <div>
          <h5 class="text-xs font-mono uppercase tracking-wider text-accent mb-2">Key Metric & Impact</h5>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/25 text-accent-light text-sm font-semibold">
            <i data-lucide="check-circle" class="w-4 h-4"></i> ${project.stats}
          </div>
        </div>

        <div>
          <h5 class="text-xs font-mono uppercase tracking-wider text-accent mb-2">Technologies Used</h5>
          <div class="flex flex-wrap gap-2">
            ${project.technologies.map(t => `
              <span class="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-primary">
                ${t}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="flex items-center gap-4 pt-4 border-t border-white/10">
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary flex-1 justify-center text-sm">
            <i data-lucide="external-link" class="w-4 h-4"></i> Launch Live Project
          </a>
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary text-sm">
            <i data-lucide="github" class="w-4 h-4"></i> Source Code
          </a>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
}

/* ==========================================================================
   11. Printable Resume Modal
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openBtn = document.getElementById('btn-open-resume');
  const closeBtn = document.getElementById('close-resume-modal');
  const printBtn = document.getElementById('btn-print-resume');

  if (openBtn && resumeModal) {
    openBtn.addEventListener('click', () => {
      populateResumeModal();
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.soundFX) soundFX.playClick();
    });
  }

  function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal?.classList.contains('active')) closeResume();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function populateResumeModal() {
  const container = document.getElementById('resume-printable');
  if (!container) return;
  const { personal, experience, education, skills, certifications } = portfolioData;

  container.innerHTML = `
    <!-- Resume Header with Profile Photo -->
    <div class="border-b-2 border-gray-800 pb-4 mb-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
      <div class="text-center sm:text-left">
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-wide uppercase mb-1">${personal.name}</h2>
        <p class="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Data Administrator & Master Data Management (MDM) Specialist</p>
        <div class="text-xs text-gray-700 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 font-mono">
          <a href="tel:${personal.phone.replace(/[^0-9+]/g, '')}" class="text-gray-800 hover:text-blue-600">📞 ${personal.phone}</a>
          <a href="mailto:${personal.email}" class="text-gray-800 hover:text-blue-600">✉️ ${personal.email}</a>
          <a href="${personal.linkedin}" target="_blank" rel="noopener noreferrer" class="text-blue-700 hover:underline">🔗 linkedin.com/in/surajmohangholap</a>
          <a href="${personal.github}" target="_blank" rel="noopener noreferrer" class="text-blue-700 hover:underline">💻 github.com/surajgholap1</a>
        </div>
      </div>
      <img src="assets/profile.jpg" alt="${personal.name}" class="w-20 h-24 sm:w-22 sm:h-28 rounded-lg object-cover object-top border border-gray-300 shadow-sm shrink-0" />
    </div>

    <!-- Summary -->
    <div class="mb-5">
      <h4 class="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1 mb-2 font-mono">Summary</h4>
      <p class="text-xs sm:text-sm text-gray-800 leading-relaxed text-justify">
        Data professional with experience in enterprise data quality, master data management, migration, validation, and reporting across oil & gas and AI/LLM environments. Skilled in transforming complex data into accurate, analysis-ready datasets and actionable reports. Seeking Data Analyst roles focused on reporting, insights, KPI analysis, and data-driven decision support.
      </p>
    </div>

    <!-- Skills -->
    <div class="mb-5">
      <h4 class="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1 mb-2 font-mono">Skills</h4>
      <div class="space-y-1 text-xs text-gray-800">
        <p><strong class="font-semibold text-gray-900">Programming & Querying:</strong> Python, SQL, C/C++</p>
        <p><strong class="font-semibold text-gray-900">Analytics, Data & BI:</strong> Data Analysis, Data Quality, Data Validation, Data Visualization, KPI Reporting, Dashboard Development, Master Data Management (MDM), Data Migration, Data Governance, Data Cleansing, Process Optimization</p>
        <p><strong class="font-semibold text-gray-900">Tools & Platforms:</strong> SAP ECC, SAP MDG, SAP S/4HANA, SAP Ariba, SAP Fiori, Microsoft Excel, Power BI, Tableau, MySQL, Git/GitHub, Power Automate, AWS, Google Cloud, RPA, Generative AI</p>
      </div>
    </div>

    <!-- Experience -->
    <div class="mb-5">
      <h4 class="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1 mb-3 font-mono">Experience</h4>
      <div class="space-y-4">
        ${experience.map(e => `
          <div>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-0.5">
              <span class="font-bold text-sm text-gray-900">${e.company}</span>
              <span class="text-xs font-mono font-semibold text-gray-600">${e.period}</span>
            </div>
            <div class="text-xs font-semibold italic text-blue-700 mb-1.5">${e.role}</div>
            <ul class="list-disc list-outside ml-4 space-y-1 text-xs text-gray-800 leading-normal">
              ${e.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Projects -->
    <div class="mb-5">
      <h4 class="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1 mb-2 font-mono">Projects</h4>
      <div>
        <div class="flex justify-between items-baseline mb-0.5">
          <span class="font-bold text-xs sm:text-sm text-gray-900">Deepfake Detection using NLP and Machine Learning</span>
          <span class="text-xs font-mono text-gray-600">2024</span>
        </div>
        <div class="text-[11px] font-mono text-gray-600 mb-1">Python, TensorFlow, OpenCV, Scikit-learn</div>
        <ul class="list-disc list-outside ml-4 space-y-1 text-xs text-gray-800 leading-normal">
          <li>Developed an AI-powered deepfake detection system using Python, OpenCV, TensorFlow, Keras, Scikit-learn, NLTK, NumPy, and Pandas for feature extraction, preprocessing, and classification.</li>
          <li>Built a machine-learning pipeline to classify manipulated videos using NLP and ML techniques for automated detection.</li>
        </ul>
      </div>
    </div>

    <!-- Awards & Certifications -->
    <div class="mb-5">
      <h4 class="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1 mb-2 font-mono">Awards & Certifications</h4>
      <ul class="list-disc list-outside ml-4 space-y-1 text-xs text-gray-800">
        <li><strong>Google Cloud Skills Boost</strong> – Introduction to Large Language Models (LLMs) and Generative AI</li>
        <li><strong>Oracle Cloud Infrastructure (OCI)</strong> AI Foundations Certification</li>
        <li><strong>Robotic Process Automation (RPA)</strong> using UiPath</li>
        <li><strong>Google Cloud Compute Fundamentals</strong> – Google Cloud Skills Boost</li>
      </ul>
    </div>

    <!-- Education -->
    <div>
      <h4 class="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1 mb-2 font-mono">Education</h4>
      ${education.map(ed => `
        <div class="flex justify-between items-baseline text-xs text-gray-900">
          <span class="font-bold">${ed.institution}</span>
          <span class="font-mono text-gray-600">${ed.period}</span>
        </div>
        <p class="text-xs italic text-gray-700">${ed.degree}</p>
      `).join('')}
    </div>
  `;
}

/* ==========================================================================
   12. Interactive Contact Form with Validation & Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all fields before sending.', 'warning');
      return;
    }

    // Email pattern check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }

    // Simulate sending state
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
      <span>Transmitting...</span>
    `;
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      if (window.lucide) lucide.createIcons();
      form.reset();

      if (window.soundFX) soundFX.playSuccess();
      showToast('Message transmitted successfully! I will respond shortly.', 'success');
    }, 1200);
  });
}

/* ==========================================================================
   13. Mobile Drawer Navigation
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeDrawerBtn = document.getElementById('close-mobile-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer.classList.remove('hidden');
    setTimeout(() => mobileDrawer.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
    if (window.soundFX) soundFX.playClick();
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    setTimeout(() => mobileDrawer.classList.add('hidden'), 300);
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  navLinks.forEach(l => l.addEventListener('click', closeDrawer));
}

/* ==========================================================================
   14. Audio Toggle Control
   ========================================================================== */
function initSoundToggle() {
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  if (!soundToggleBtn) return;

  function updateSoundUI(isEnabled) {
    soundToggleBtn.innerHTML = isEnabled
      ? '<i data-lucide="volume-2" class="w-5 h-5 text-accent"></i>'
      : '<i data-lucide="volume-x" class="w-5 h-5 text-muted"></i>';
    if (window.lucide) lucide.createIcons();
  }

  updateSoundUI(window.soundFX.enabled);

  soundToggleBtn.addEventListener('click', () => {
    const newState = window.soundFX.toggle();
    updateSoundUI(newState);
    showToast(newState ? 'SFX Audio feedback enabled' : 'SFX Audio muted');
  });
}

/* ==========================================================================
   15. Quick Email Copy to Clipboard
   ========================================================================== */
function initQuickCopy() {
  const copyBtn = document.getElementById('btn-copy-email');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = portfolioData.personal.email;
    navigator.clipboard.writeText(email).then(() => {
      if (window.soundFX) soundFX.playSuccess();
      showToast('Email address copied to clipboard!');
    }).catch(() => {
      showToast(email);
    });
  });
}

/* ==========================================================================
   16. Modern Toast Notification
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  const iconName = type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-triangle' : 'info';
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-4 h-4 text-accent"></i>
    <span class="text-xs sm:text-sm font-medium">${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px) scale(0.95)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
