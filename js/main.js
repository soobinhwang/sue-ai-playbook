/* ============================================
   Sue Hwang — AI Design Explorer
   Main JavaScript
   ============================================ */

// --- Theme Toggle ---
(function initTheme() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const html = document.documentElement;

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// --- Mobile Nav Toggle ---
(function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
    });
  });
})();

// --- Scroll Fade-In Animation ---
(function initScrollAnimations() {
  // Animate individual fade-in elements
  const fadeEls = document.querySelectorAll('.fade-in');

  // Animate stagger children (card grid)
  const staggerContainers = document.querySelectorAll('.stagger');
  const staggerChildren = [];

  staggerContainers.forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
      staggerChildren.push(child);
    });
  });

  const allAnimated = [...fadeEls, ...staggerChildren];
  if (allAnimated.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  allAnimated.forEach(el => observer.observe(el));
})();

// --- Custom Cursor ---
(function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  if (!cursor) return;

  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) {
    cursor.style.display = 'none';
    return;
  }

  let x = 0;
  let y = 0;
  let rafId = null;

  const render = () => {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    rafId = null;
  };

  window.addEventListener('mousemove', (event) => {
    x = event.clientX;
    y = event.clientY;
    cursor.classList.remove('is-hidden');
    if (!rafId) rafId = requestAnimationFrame(render);
  });

  window.addEventListener('mouseleave', () => {
    cursor.classList.add('is-hidden');
  });

  const hoverSelector = 'a, button, [role="button"], input, textarea, select, label';
  const hoverTargets = document.querySelectorAll(hoverSelector);

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hover');
    });
  });
})();

// --- Code Block Copy ---
function copyCode(button) {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock.querySelector('code');
  const text = code.textContent;

  navigator.clipboard.writeText(text).then(() => {
    const original = button.textContent;
    button.textContent = 'copied!';
    button.style.color = '#7b6fff';
    setTimeout(() => {
      button.textContent = original;
      button.style.color = '';
    }, 2000);
  });
}
