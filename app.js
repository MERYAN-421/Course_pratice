/**
 * Ryan's Personal Page & Live Precision Clock Application
 * DIC-1 Coursework - National Chung Hsing University Electrical Engineering
 */

(function () {
  'use strict';

  // DOM Elements
  const elements = {
    // Top Navigation
    navLinks: document.querySelectorAll('.nav-link'),
    sections: document.querySelectorAll('section[id]'),

    // Clock
    hours: document.getElementById('clock-hours'),
    minutes: document.getElementById('clock-minutes'),
    seconds: document.getElementById('clock-seconds'),
    colonSeconds: document.getElementById('colon-seconds'),
    secondsWrapper: document.getElementById('seconds-wrapper'),
    ampm: document.getElementById('clock-ampm'),
    secondProgressBar: document.getElementById('second-progress-bar'),
    dateDisplay: document.getElementById('date-display'),
    timezoneDisplay: document.getElementById('timezone-display'),
    greetingText: document.getElementById('greeting-text'),

    // Profile
    userName: document.getElementById('user-name'),
    userBio: document.getElementById('user-bio'),
    avatarInitials: document.getElementById('avatar-initials'),
    editNameBtn: document.getElementById('edit-name-btn'),
    avatarBadgeBtn: document.getElementById('avatar-badge-btn'),

    // Clock Toolbar
    toggleFormatBtn: document.getElementById('toggle-format-btn'),
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
  };

  // State Management with LocalStorage
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

  // Toast Notification Helper
  let toastTimeout = null;
  function showToast(message) {
    if (!elements.toast) return;
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 2600);
  }

  // Calculate initials from name
  function getInitials(name) {
    if (!name) return 'RY';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // Update Profile DOM
  function updateProfileDOM() {
    if (elements.userName) elements.userName.textContent = state.name;
    if (elements.userBio) elements.userBio.textContent = state.bio;
    if (elements.avatarInitials) elements.avatarInitials.textContent = getInitials(state.name);
    document.title = `${state.name} • 中興電機 | Personal Page & Live Clock`;
  }

  // Update Greeting based on time and name
  function updateGreeting(now) {
    const hours = now.getHours();
    let greeting = 'Good day';
    if (hours >= 5 && hours < 12) {
      greeting = '🌅 Good morning';
    } else if (hours >= 12 && hours < 17) {
      greeting = '☀️ Good afternoon';
    } else if (hours >= 17 && hours < 22) {
      greeting = '🌆 Good evening';
    } else {
      greeting = '🌙 Good night';
    }
    if (elements.greetingText) {
      elements.greetingText.textContent = `${greeting}, ${state.name}`;
    }
  }

  // Get Formatted UTC Offset & Timezone
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

  // Precision Real-Time Clock Update Loop
  let lastSecond = -1;
  function tickClock() {
    const now = new Date();
    const currentSeconds = now.getSeconds();
    const currentMs = now.getMilliseconds();

    // Smooth second progress bar
    if (elements.secondProgressBar) {
      const progressPercent = ((currentSeconds + currentMs / 1000) / 60) * 100;
      elements.secondProgressBar.style.width = `${progressPercent.toFixed(2)}%`;
    }

    // Update text content when second ticks
    if (currentSeconds !== lastSecond) {
      lastSecond = currentSeconds;

      let rawHours = now.getHours();
      const minutes = now.getMinutes();

      let displayHours = rawHours;
      let ampmText = '';

      if (!state.is24Hour) {
        ampmText = rawHours >= 12 ? 'PM' : 'AM';
        displayHours = rawHours % 12;
        if (displayHours === 0) displayHours = 12;
      }

      if (elements.hours) {
        elements.hours.textContent = displayHours.toString().padStart(2, '0');
      }
      if (elements.minutes) {
        elements.minutes.textContent = minutes.toString().padStart(2, '0');
      }
      if (elements.seconds) {
        elements.seconds.textContent = currentSeconds.toString().padStart(2, '0');
      }

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

      // Greeting update
      updateGreeting(now);
    }

    // Request next animation frame
    requestAnimationFrame(tickClock);
  }

  // Theme Management
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
  }

  // Seconds Visibility Toggle
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

  // 12h / 24h Toggle
  function applyFormat() {
    if (elements.formatLabel) {
      elements.formatLabel.textContent = state.is24Hour ? '24-Hour' : '12-Hour';
    }
    lastSecond = -1;
  }

  // Scrollspy for Navigation Bar
  function initScrollSpy() {
    window.addEventListener('scroll', () => {
      let currentSectionId = 'about';
      const scrollY = window.pageYOffset + 120;

      elements.sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      elements.navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }, { passive: true });
  }

  // Modal Handlers
  function openModal() {
    if (elements.inputName) elements.inputName.value = state.name;
    if (elements.inputBio) elements.inputBio.value = state.bio;
    if (elements.modal) {
      elements.modal.classList.add('open');
      elements.modal.setAttribute('aria-hidden', 'false');
      setTimeout(() => elements.inputName.focus(), 100);
    }
  }

  function closeModal() {
    if (elements.modal) {
      elements.modal.classList.remove('open');
      elements.modal.setAttribute('aria-hidden', 'true');
    }
  }

  // Initialize Event Listeners
  function initEvents() {
    // 12h/24h toggle
    if (elements.toggleFormatBtn) {
      elements.toggleFormatBtn.addEventListener('click', () => {
        state.is24Hour = !state.is24Hour;
        localStorage.setItem('personal_page_is24h', state.is24Hour);
        applyFormat();
        showToast(`已切換為 ${state.is24Hour ? '24 小時制' : '12 小時制'}`);
      });
    }

    // Toggle Seconds
    if (elements.toggleSecondsBtn) {
      elements.toggleSecondsBtn.addEventListener('click', () => {
        state.showSeconds = !state.showSeconds;
        localStorage.setItem('personal_page_show_seconds', state.showSeconds);
        applySecondsVisibility();
        showToast(`秒數顯示：${state.showSeconds ? '開啟' : '關閉'}`);
      });
    }

    // Copy Time button
    if (elements.copyTimeBtn) {
      elements.copyTimeBtn.addEventListener('click', () => {
        const now = new Date();
        const timeStr = state.is24Hour
          ? now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
          : now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        const fullStamp = `${timeStr} (${dateStr})`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(fullStamp).then(() => {
            showToast(`已複製時間戳記：${fullStamp}`);
          }).catch(() => {
            showToast(`時間戳記：${fullStamp}`);
          });
        } else {
          showToast(`時間戳記：${fullStamp}`);
        }
      });
    }

    // Theme Picker
    if (elements.themeButtons) {
      elements.themeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const selectedTheme = btn.getAttribute('data-theme');
          applyTheme(selectedTheme);
          const themeNames = {
            aurora: 'Aurora 極光紫',
            cyan: 'Cyber 賽博藍',
            emerald: 'Emerald 翡翠綠',
            rose: 'Sunset 暮光玫',
            amber: 'Amber 曜石金'
          };
          showToast(`已切換主題：${themeNames[selectedTheme] || selectedTheme}`);
        });
      });
    }

    // Edit Modal Triggers
    const editTriggers = [elements.userName, elements.userBio, elements.editNameBtn, elements.avatarBadgeBtn];
    editTriggers.forEach((trigger) => {
      if (trigger) {
        trigger.addEventListener('click', openModal);
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
          }
        });
      }
    });

    // Close Modal
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

    // Save Profile Form
    if (elements.profileForm) {
      elements.profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = elements.inputName.value.trim();
        const newBio = elements.inputBio.value.trim();

        if (newName) {
          state.name = newName;
          state.bio = newBio || defaultBio;

          localStorage.setItem('personal_page_name', state.name);
          localStorage.setItem('personal_page_bio', state.bio);

          updateProfileDOM();
          updateGreeting(new Date());
          closeModal();
          showToast(`個人資料已更新！歡迎，${state.name}`);
        }
      });
    }
  }

  // Startup initialization
  function init() {
    updateProfileDOM();
    applyTheme(state.theme);
    applyFormat();
    applySecondsVisibility();

    if (elements.timezoneDisplay) {
      elements.timezoneDisplay.textContent = getFormattedTimezone();
    }

    initEvents();
    initScrollSpy();

    // Start precision clock loop
    tickClock();
  }

  // Launch when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
