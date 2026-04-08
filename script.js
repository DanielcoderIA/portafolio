// ==========================================
// [01] CURSOR LOGIC (Desktop only)
// ==========================================
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// Detect touch device
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Adjust cursor for touch devices
if (isTouch) {
  if (cursor) cursor.style.display = 'none';
  document.documentElement.style.setProperty('cursor', 'auto');
  const styleTag = document.createElement('style');
  styleTag.textContent = '* { cursor: auto !important; }';
  document.head.appendChild(styleTag);
}

if (!isTouch && cursor) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Interaction hover states
  document.querySelectorAll('.interactable').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

// ==========================================
// [02] MONITOR PREVIEW
// ==========================================
const monitor = document.getElementById('monitor');
const monitorImg = document.getElementById('monitorImg');
const monitorClose = document.getElementById('monitorClose');
const projectRows = document.querySelectorAll('.project-row');

let autoHideTimer = null;

function showMonitor(imgUrl) {
  if (monitorImg && monitorImg.getAttribute('src') !== imgUrl) {
    monitorImg.setAttribute('src', imgUrl);
  }
  if (monitor) monitor.classList.add('active');
}

function hideMonitor() {
  if (monitor) monitor.classList.remove('active');
  clearTimeout(autoHideTimer);
}

// ── DESKTOP: hover events ──
if (!isTouch) {
  projectRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const imgUrl = row.getAttribute('data-img');
      showMonitor(imgUrl);
    });
    row.addEventListener('mouseleave', hideMonitor);
  });
}

// ── MOBILE: tap events ──
if (isTouch) {
  projectRows.forEach(row => {
    row.addEventListener('touchend', (e) => {
      const imgUrl = row.getAttribute('data-img');

      // If this project's image is already shown, let the link follow normally
      if (monitor && monitor.classList.contains('active') && monitorImg.getAttribute('src') === imgUrl) {
        return; 
      }

      // First tap -> show preview, stop navigation
      e.preventDefault();
      showMonitor(imgUrl);

      // Auto-dismiss after 3 seconds
      clearTimeout(autoHideTimer);
      autoHideTimer = setTimeout(hideMonitor, 3000);
    }, { passive: false });
  });

  // Close button handler (for mobile)
  if (monitorClose) {
    monitorClose.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      hideMonitor();
    });
    monitorClose.addEventListener('click', (e) => {
      e.preventDefault();
      hideMonitor();
    });
  }

  // Tapping outside monitor closes it
  document.addEventListener('touchstart', (e) => {
    if (monitor && monitor.classList.contains('active') && !monitor.contains(e.target)) {
      // Check if target is a project row - if so, let its own listener handle it
      let isProjectRow = false;
      projectRows.forEach(row => { if (row.contains(e.target)) isProjectRow = true; });
      if (!isProjectRow) hideMonitor();
    }
  });
}

// ==========================================
// [03] THEME TOGGLE
// ==========================================
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  });
}