// Interactive Canvas Particles & Constellation Background
// Lightweight, responsive, zero-dependencies, 60fps canvas animation

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let particles = [];
  let burstParticles = [];
  let mouse = { x: null, y: null, radius: 140, isHovering: false };
  let animId = null;

  // Particle configuration
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 38 : 85;
  const connectionDistance = isMobile ? 85 : 125;

  function initDimensions() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.baseRadius = this.radius;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.hue = Math.random() * 40 + 190; // Cyan to blue hues
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce at canvas edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 2;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force;
          this.y -= Math.sin(angle) * force;
          this.radius = this.baseRadius * 1.5;
        } else {
          this.radius = this.baseRadius;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 85%, 65%, ${this.alpha})`;
      ctx.fill();
    }
  }

  class SparkParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = Math.random() * 2.5 + 1;
      this.alpha = 1;
      this.decay = Math.random() * 0.03 + 0.015;
      this.hue = Math.random() * 60 + 180;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 75%, ${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, ${this.alpha})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function spawnBurst(x, y) {
    const count = 14;
    for (let i = 0; i < count; i++) {
      burstParticles.push(new SparkParticle(x, y));
    }
  }

  function setupParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    drawConnections();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Update and draw burst sparks
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      burstParticles[i].update();
      burstParticles[i].draw();
      if (burstParticles[i].alpha <= 0) {
        burstParticles.splice(i, 1);
      }
    }

    animId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    initDimensions();
    setupParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isHovering = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
    mouse.isHovering = false;
  });

  window.addEventListener('click', (e) => {
    // Check if clicked element isn't an interactive input
    if (!['INPUT', 'BUTTON', 'A', 'TEXTAREA'].includes(e.target.tagName)) {
      spawnBurst(e.clientX, e.clientY);
    }
  });

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
      spawnBurst(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    setTimeout(() => {
      mouse.x = null;
      mouse.y = null;
    }, 400);
  });

  // Init
  initDimensions();
  setupParticles();
  animate();
})();
