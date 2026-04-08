// ==========================================
// [01] CURSOR LOGIC
// ==========================================
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

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

// Interaction States
document.querySelectorAll('.interactable').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// ==========================================
// [02] MONITOR PREVIEW
// ==========================================
const monitor = document.getElementById('monitor');
const monitorImg = document.getElementById('monitorImg');
const projectRows = document.querySelectorAll('.project-row');

// Disable monitor on touch devices
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouch) {
  projectRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const imgUrl = row.getAttribute('data-img');
      if (monitorImg.src !== imgUrl) monitorImg.src = imgUrl;
      monitor.classList.add('active');
    });
    row.addEventListener('mouseleave', () => {
      monitor.classList.remove('active');
    });
  });
}

// ==========================================
// [03] THEME TOGGLE
// ==========================================
document.getElementById('themeToggle').addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});