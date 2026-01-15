/**
 * Personal Website Scripts
 * 2026 Sustainable Design Implementation
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initForm();
  initAnimations();
});

/**
 * Theme Management
 * Handles toggle between Dark (default for sustainability) and Light mode.
 * Uses local storage to remember preference.
 */
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = toggleBtn.querySelector("i");
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;
  const storedTheme = localStorage.getItem("theme");

  // Default to dark unless user strictly prefers light or has saved light
  let isLight = storedTheme === "light" || (!storedTheme && prefersLight);

  function updateTheme() {
    document.body.setAttribute("data-theme", isLight ? "light" : "dark");
    icon.className = isLight ? "fas fa-sun" : "fas fa-moon";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }

  // Initial Set
  updateTheme();

  // Toggle Handler
  toggleBtn.addEventListener("click", () => {
    isLight = !isLight;
    updateTheme();
  });
}

/**
 * Form Validation & Interaction
 * Prevents default submission for demo purposes and shows success message.
 */
function initForm() {
  const form = document.getElementById("contact-form");
  const msgDiv = document.getElementById("form-message");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic Validation (HTML5 handles most, checking non-empty logic just in case)
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
      // Simulate sending
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = "Sending...";
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = "Message Sent!";
        btn.style.backgroundColor = "#4CAF50";
        btn.style.color = "white";

        msgDiv.style.display = "block";
        msgDiv.style.color = "var(--color-accent)";
        msgDiv.textContent = `Thanks ${name}, I'll get back to you shortly.`;

        form.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.backgroundColor = ""; // Reset to default CSS
          btn.style.color = "";
          msgDiv.style.display = "none";
        }, 3000);
      }, 1500);
    }
  });
}

/**
 * Simple Intersection Observer for scroll animations
 * Adds 'visible' class to elements when they scroll into view
 */
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  // Select elements to animate
  const animatedElements = document.querySelectorAll(
    ".skill-card, .hobby-item, .section-label, h1, h2, p"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}
