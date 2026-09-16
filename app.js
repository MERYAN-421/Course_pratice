/**
 * Ryan's Cyber-Luxe Personal Page & Live Precision Chrono
 * National Chung Hsing University - Electrical Engineering (NCHU EE)
 */

(function () {
  'use strict';

  // --- DOM Elements ---
  const elements = {
    // Clock
    hours: document.getElementById('clock-hours'),
    minutes: document.getElementById('clock-minutes'),
    seconds: document.getElementById('clock-seconds'),
    colonSeconds: document.getElementById('colon-seconds'),
    secondsWrapper: document.getElementById('seconds-wrapper'),
    ampm: document.getElementById('clock-ampm'),
    secondProgressBar: document.getElementById('second-progress-bar'),
    dayProgressVal: document.getElementById('day-progress-val'),
    dayProgressFill: document.getElementById('day-progress-fill'),
    dateDisplay: document.getElementById('date-display'),
    timezoneDisplay: document.getElementById('timezone-display'),

    // Greeting & Status
    greetingText: document.getElementById('greeting-text'),
    greetingIcon: document.getElementById('greeting-icon'),
    telemetryLatency: document.getElementById('telemetry-latency'),

    // Profile
    userName: document.getElementById('user-name'),
    userBio: document.getElementById('user-bio'),
    avatarInitials: document.getElementById('avatar-initials'),
    quickEditBtn: document.getElementById('quick-edit-btn'),

    // Controls
    formatToggleBtn: document.getElementById('format-toggle-btn'),
    formatLabel: document.getElementById('format-label'),
    toggleSecondsBtn: document.getElementById('toggle-seconds-btn'),
    secondsLabel: document.getElementById('seconds-label'),
    copyTimeBtn: document.getElementById('copy-time-btn'),
    copyIcon: document.getElementById('copy-icon'),
    copyLabel: document.getElementById('copy-label'),

    // Theme Picker
    themeButtons: document.querySelectorAll('.theme-btn'),

    // Modal
    modal: document.getElementById('edit-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalCancelBtn: document.getElementById('modal-cancel-btn'),
    profileForm: document.getElementById('edit-profile-form'),
    inputName: document.getElementById('input-name'),
    inputBio: document.getElementById('input-bio'),

    // Toast
    toast: document.getElementById('toast'),
    bgCanvas: document.getElementById('bg-canvas'),
  };

  // --- State ---
  const defaultBio = '國立中興大學電機工程學系。專注於強化式學習演算法與智慧系統，球場上熱血的進攻核心 ⚽。老師教很好，感謝～！';

  let storedName = localStorage.getItem('personal_page_name');
  if (!storedName || storedName === 'Alex Morgan') {
    storedName = 'Ryan';
    localStorage.setItem('personal_page_name', 'Ryan');
  }

  let storedBio = localStorage.getItem('personal_page_bio');
  if (!storedBio || storedBio.includes('Exploring ideas')) {
    storedBio = defaultBio;
    localStorage.setItem('personal_page_bio', defaultBio);
  }

  const state = {
    name: storedName,
    bio: storedBio,
    is24Hour: localStorage.getItem('personal_page_is24h') !== 'false',
    showSeconds: localStorage.getItem('personal_page_show_seconds') !== 'false',
    theme: localStorage.getItem('personal_page_theme') || 'aurora',
  };

  // --- Toast Notification ---
  let toastTimer = null;
  function showToast(msg) {
    if (!elements.toast) return;
    elements.toast.textContent = msg;
    elements.toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 2500);
  }

  // --- Initials Generator ---
  function getInitials(name) {
    if (!name) return 'RY';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // --- Profile Render ---
  function updateProfileDOM() {
    if (elements.userName) elements.userName.textContent = state.name;
    if (elements.userBio) elements.userBio.textContent = state.bio;
    if (elements.avatarInitials) elements.avatarInitials.textContent = getInitials(state.name);
    document.title = `${state.name} • 中興電機 | Cyber-Luxe Personal Page`;
  }

  // --- Dynamic Greeting Engine ---
  function updateGreeting(now) {
    const hours = now.getHours();
    let greeting = 'GOOD DAY';
    let icon = '✨';

    if (hours >= 5 && hours < 12) {
      greeting = 'GOOD MORNING';
      icon = '🌅';
    } else if (hours >= 12 && hours < 17) {
      greeting = 'GOOD AFTERNOON';
      icon = '☀️';
    } else if (hours >= 17 && hours < 22) {
      greeting = 'GOOD EVENING';
      icon = '🌆';
    } else {
      greeting = 'GOOD NIGHT';
      icon = '🌙';
    }

    if (elements.greetingText) {
      elements.greetingText.textContent = `${greeting}, ${state.name.toUpperCase()}`;
    }
    if (elements.greetingIcon) {
      elements.greetingIcon.textContent = icon;
    }
  }

  // --- Formatted Timezone ---
  function getFormattedTimezone() {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offsetMinutes = -new Date().getTimezoneOffset();
      const sign = offsetMinutes >= 0 ? '+' : '-';
      const hours = Math.floor(Math.abs(offsetMinutes) / 60);
      const mins = Math.abs(offsetMinutes) % 60;
      const offsetStr = `UTC${sign}${hours}${mins > 0 ? ':' + mins.toString().padStart(2, '0') : ''}`;
      return `${offsetStr} • ${timeZone.replace('_', ' ')}`;
    } catch {
      return 'UTC+8 • Taipei Standard Time';
    }
  }

  // --- Precision Clock Engine ---
  let lastSecond = -1;
  function tickClock() {
    const now = new Date();
    const currentSeconds = now.getSeconds();
    const currentMs = now.getMilliseconds();
    const rawHours = now.getHours();
    const minutes = now.getMinutes();

    // Smooth Second Progress Bar
    if (elements.secondProgressBar) {
      const progressPercent = ((currentSeconds + currentMs / 1000) / 60) * 100;
      elements.secondProgressBar.style.width = `${progressPercent.toFixed(2)}%`;
    }

    // Update digits & day completion when second ticks
    if (currentSeconds !== lastSecond) {
      lastSecond = currentSeconds;

      // Day Completion Calculation (out of 86400 seconds)
      const totalDaySeconds = rawHours * 3600 + minutes * 60 + currentSeconds;
      const dayPct = ((totalDaySeconds / 86400) * 100).toFixed(1);
      if (elements.dayProgressVal) elements.dayProgressVal.textContent = `${dayPct}%`;
      if (elements.dayProgressFill) elements.dayProgressFill.style.width = `${dayPct}%`;

      // 12H vs 24H formatting
      let displayHours = rawHours;
      let ampmText = '';

      if (!state.is24Hour) {
        ampmText = rawHours >= 12 ? 'PM' : 'AM';
        displayHours = rawHours % 12;
        if (displayHours === 0) displayHours = 12;
      }

      if (elements.hours) elements.hours.textContent = displayHours.toString().padStart(2, '0');
      if (elements.minutes) elements.minutes.textContent = minutes.toString().padStart(2, '0');
      if (elements.seconds) elements.seconds.textContent = currentSeconds.toString().padStart(2, '0');

      if (elements.ampm) {
        if (state.is24Hour) {
          elements.ampm.classList.add('hidden');
        } else {
          elements.ampm.classList.remove('hidden');
          elements.ampm.textContent = ampmText;
        }
      }

      // Date Display
      if (elements.dateDisplay) {
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        elements.dateDisplay.textContent = now.toLocaleDateString('en-US', dateOptions);
      }

      updateGreeting(now);
    }

    requestAnimationFrame(tickClock);
  }

  // --- Telemetry Jitter Simulation ---
  function initTelemetry() {
    setInterval(() => {
      if (elements.telemetryLatency) {
        const latency = Math.floor(Math.random() * 6) + 11; // 11ms ~ 16ms
        elements.telemetryLatency.textContent = `${latency}ms`;
      }
    }, 4500);
  }

  // --- Theme Management ---
  function applyTheme(themeName) {
    state.theme = themeName;
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('personal_page_theme', themeName);

    elements.themeButtons.forEach((btn) => {
      if (btn.getAttribute('data-theme') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    updateParticleColor();
  }

  // --- Seconds Display Toggle ---
  function applySecondsVisibility() {
    if (state.showSeconds) {
      if (elements.colonSeconds) elements.colonSeconds.style.display = '';
      if (elements.secondsWrapper) elements.secondsWrapper.style.display = '';
      if (elements.secondsLabel) elements.secondsLabel.textContent = 'Seconds: ON';
    } else {
      if (elements.colonSeconds) elements.colonSeconds.style.display = 'none';
      if (elements.secondsWrapper) elements.secondsWrapper.style.display = 'none';
      if (elements.secondsLabel) elements.secondsLabel.textContent = 'Seconds: OFF';
    }
  }

  // --- Format Toggle ---
  function applyFormat() {
    if (elements.formatLabel) {
      elements.formatLabel.textContent = state.is24Hour ? '24H' : '12H';
    }
    lastSecond = -1;
  }

  // --- Modal Logic ---
  function openModal() {
    if (elements.inputName) elements.inputName.value = state.name;
    if (elements.inputBio) elements.inputBio.value = state.bio;
    if (elements.modal) {
      elements.modal.classList.add('open');
      elements.modal.setAttribute('aria-hidden', 'false');
      setTimeout(() => elements.inputName.focus(), 80);
    }
  }

  function closeModal() {
    if (elements.modal) {
      elements.modal.classList.remove('open');
      elements.modal.setAttribute('aria-hidden', 'true');
    }
  }

  // --- Interactive Constellation Particle Canvas ---
  let particles = [];
  let particleColor = '0, 240, 255';
  let mouse = { x: null, y: null, radius: 140 };

  function updateParticleColor() {
    const colors = {
      aurora: '0, 240, 255',
      cyan: '56, 189, 248',
      emerald: '0, 255, 157',
      rose: '251, 113, 133',
      amber: '251, 191, 36'
    };
    particleColor = colors[state.theme] || '0, 240, 255';
  }

  function initParticleCanvas() {
    const canvas = elements.bgCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    }, { passive: true });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 20 + 5;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
      }

      draw() {
        ctx.fillStyle = `rgba(${particleColor}, 0.7)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = (dx / distance) * force * 2;
            const directionY = (dy / distance) * force * 2;
            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }
    }

    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 75);
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();

        // Connect neighboring particles
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const opacity = 1 - dist / 110;
            ctx.strokeStyle = `rgba(${particleColor}, ${opacity * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // --- Event Listeners ---
  function initEvents() {
    // 12h/24h toggle
    if (elements.formatToggleBtn) {
      elements.formatToggleBtn.addEventListener('click', () => {
        state.is24Hour = !state.is24Hour;
        localStorage.setItem('personal_page_is24h', state.is24Hour);
        applyFormat();
        showToast(`CHRONO FORMAT: ${state.is24Hour ? '24-HOUR' : '12-HOUR'}`);
      });
    }

    // Toggle Seconds
    if (elements.toggleSecondsBtn) {
      elements.toggleSecondsBtn.addEventListener('click', () => {
        state.showSeconds = !state.showSeconds;
        localStorage.setItem('personal_page_show_seconds', state.showSeconds);
        applySecondsVisibility();
        showToast(`SECONDS DISPLAY: ${state.showSeconds ? 'ACTIVE' : 'MUTED'}`);
      });
    }

    // Copy Time
    if (elements.copyTimeBtn) {
      elements.copyTimeBtn.addEventListener('click', () => {
        const now = new Date();
        const timeStr = state.is24Hour
          ? now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
          : now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        const stamp = `${timeStr} (${dateStr})`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(stamp).then(() => {
            showToast(`COPIED TIMESTAMP: ${stamp}`);
          }).catch(() => {
            showToast(`TIMESTAMP: ${stamp}`);
          });
        } else {
          showToast(`TIMESTAMP: ${stamp}`);
        }
      });
    }

    // Themes
    if (elements.themeButtons) {
      elements.themeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const t = btn.getAttribute('data-theme');
          applyTheme(t);
          showToast(`THEME ACCENT: ${t.toUpperCase()}`);
        });
      });
    }

    // Quick Edit & Triggers
    const editTriggers = [elements.userName, elements.userBio, elements.quickEditBtn];
    editTriggers.forEach((trig) => {
      if (trig) {
        trig.addEventListener('click', openModal);
        trig.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
          }
        });
      }
    });

    if (elements.modalCloseBtn) elements.modalCloseBtn.addEventListener('click', closeModal);
    if (elements.modalCancelBtn) elements.modalCancelBtn.addEventListener('click', closeModal);
    if (elements.modal) {
      elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) closeModal();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.modal.classList.contains('open')) {
        closeModal();
      }
    });

    if (elements.profileForm) {
      elements.profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const n = elements.inputName.value.trim();
        const b = elements.inputBio.value.trim();
        if (n) {
          state.name = n;
          state.bio = b || defaultBio;
          localStorage.setItem('personal_page_name', state.name);
          localStorage.setItem('personal_page_bio', state.bio);
          updateProfileDOM();
          updateGreeting(new Date());
          closeModal();
          showToast(`PROFILE UPDATED: ${state.name}`);
        }
      });
    }
  }

  // --- Startup ---
  function init() {
    updateProfileDOM();
    applyTheme(state.theme);
    applyFormat();
    applySecondsVisibility();

    if (elements.timezoneDisplay) {
      elements.timezoneDisplay.textContent = getFormattedTimezone();
    }

    initEvents();
    initTelemetry();
    initParticleCanvas();
    tickClock();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
